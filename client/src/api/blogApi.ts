// frontend/src/api/blogApi.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("userInfo") || "null");
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Auth Endpoints ---
export const loginUser = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  isAdmin: boolean
) => {
  const { data } = await api.post("/auth/register", {
    username,
    email,
    password,
    isAdmin,
  });
  return data;
};

// --- Blog Post Endpoints ---
export const getBlogPosts = async () => {
  const { data } = await api.get("/blog");
  return data;
};

export const getBlogPostById = async (id: string) => {
  const { data } = await api.get(`/blog/${id}`);
  return data;
};

export const createBlogPost = async (postData: {
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
}) => {
  const { data } = await api.post("/blog", postData);
  return data;
};

export const updateBlogPost = async (
  id: string,
  postData: {
    title: string;
    content: string;
    imageUrl?: string;
    tags?: string[];
  }
) => {
  const { data } = await api.put(`/blog/${id}`, postData);
  return data;
};

export const deleteBlogPost = async (id: string) => {
  const { data } = await api.delete(`/blog/${id}`);
  return data;
};

export default api;
