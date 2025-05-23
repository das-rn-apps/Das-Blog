// backend/src/routes/blogRoutes.ts
import express, { Request, Response } from "express";
import BlogPost from "../models/BlogPost";
import { protect, admin } from "../middleware/authMiddleware";
import { IUser } from "../models/User"; // Import IUser interface

// Extend the Request interface to include the user
interface AuthRequest extends Request {
  user?: IUser;
}

const router = express.Router();

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
router.get("/", async (req: Request, res: Response) => {
  try {
    const blogPosts = await BlogPost.find({}).populate(
      "author",
      "username email"
    ); // Populate author details
    res.json(blogPosts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single blog post by ID
// @route   GET /api/blog/:id
// @access  Public
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate(
      "author",
      "username email"
    );

    if (blogPost) {
      res.json(blogPost);
    } else {
      res.status(404).json({ message: "Blog post not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new blog post
// @route   POST /api/blog
// @access  Private/Admin
router.post("/", protect, admin, async (req: AuthRequest, res: Response) => {
  const { title, content, imageUrl, tags } = req.body;

  try {
    if (!req.user || !req.user._id) {
      res
        .status(401)
        .json({ message: "Not authorized, user not found in request" });
      return;
    }

    const blogPost = new BlogPost({
      title,
      content,
      author: req.user._id, // Assign the authenticated user as the author
      imageUrl,
      tags,
    });

    const createdBlogPost = await blogPost.save();
    res.status(201).json(createdBlogPost);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req: AuthRequest, res: Response) => {
  const { title, content, imageUrl, tags } = req.body;

  try {
    const blogPost = await BlogPost.findById(req.params.id);

    if (blogPost) {
      // Ensure only the author or an admin can update
      if (
        blogPost.author.toString() !== req.user?._id.toString() &&
        !req.user?.isAdmin
      ) {
        res.status(403).json({ message: "Not authorized to update this post" });
        return;
      }

      blogPost.title = title || blogPost.title;
      blogPost.content = content || blogPost.content;
      blogPost.imageUrl = imageUrl || blogPost.imageUrl;
      blogPost.tags = tags || blogPost.tags;

      const updatedBlogPost = await blogPost.save();
      res.json(updatedBlogPost);
    } else {
      res.status(404).json({ message: "Blog post not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
router.delete(
  "/:id",
  protect,
  admin,
  async (req: AuthRequest, res: Response) => {
    try {
      const blogPost = await BlogPost.findById(req.params.id);

      if (blogPost) {
        // Ensure only the author or an admin can delete
        if (
          blogPost.author.toString() !== req.user?._id.toString() &&
          !req.user?.isAdmin
        ) {
          res
            .status(403)
            .json({ message: "Not authorized to delete this post" });
          return;
        }

        await BlogPost.deleteOne({ _id: req.params.id }); // Use deleteOne
        res.json({ message: "Blog post removed" });
      } else {
        res.status(404).json({ message: "Blog post not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
