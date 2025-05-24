// frontend/src/store/blogStore.ts
import { create } from "zustand";
import {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../api/blogApi"; // Import your API functions
import type { BlogState } from "../types";

// Define the shape of the blog store state

export const useBlogStore = create<BlogState>((set, get) => ({
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getBlogPosts();
      set({ posts: data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch posts",
        loading: false,
      });
    }
  },

  fetchSinglePost: async (id: string) => {
    const { posts } = get(); // Get current posts from store
    set({ loading: true, error: null, selectedPost: null });

    // Try to find the post locally
    const existingPost = posts?.find((post) => post._id === id);

    if (existingPost) {
      set({ selectedPost: existingPost, loading: false });
      return;
    }

    // If not found, fetch from API
    try {
      const data = await getBlogPostById(id);
      set({ selectedPost: data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch post",
        loading: false,
      });
    }
  },

  addPost: async (postData) => {
    set({ loading: true, error: null });
    try {
      const newPost = await createBlogPost(postData);
      set((state) => ({
        posts: [...state.posts, newPost],
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create post",
        loading: false,
      });
      throw err; // Re-throw to allow component to catch and display specific error
    }
  },

  editPost: async (id, postData) => {
    set({ loading: true, error: null });
    try {
      const updatedPost = await updateBlogPost(id, postData);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === id ? updatedPost : post
        ),
        selectedPost:
          state.selectedPost?._id === id ? updatedPost : state.selectedPost, // Update selected if it's the same
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update post",
        loading: false,
      });
      throw err; // Re-throw
    }
  },

  deletePost: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await deleteBlogPost(id);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to delete post",
        loading: false,
      });
      throw err; // Re-throw
    }
  },

  clearError: () => {
    set({ error: null });
  },

  clearSelectedPost: () => {
    set({ selectedPost: null });
  },
}));
