// backend/src/models/BlogPost.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId; // Reference to User model
  imageUrl?: string;
  tags?: string[];
  publishedAt: Date;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // Reference to User model
    imageUrl: { type: String },
    tags: [{ type: String }],
    publishedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const BlogPost = mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
