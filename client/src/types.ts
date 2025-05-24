export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  publishedAt: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostCardProps {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: {
    username: string;
  };
  publishedAt: string;
  tags?: string[];
}

export interface BlogPostFormState {
  title: string;
  content: string;
  imageUrl: string;
  tags: string;
}

export interface BlogState {
  posts: BlogPost[];
  selectedPost: BlogPost | null;
  loading: boolean;
  error: string | null;
  // Actions
  fetchPosts: () => Promise<void>;
  fetchSinglePost: (id: string) => Promise<void>;
  addPost: (postData: {
    title: string;
    content: string;
    imageUrl?: string;
    tags?: string[];
  }) => Promise<void>;
  editPost: (
    id: string,
    postData: {
      title: string;
      content: string;
      imageUrl?: string;
      tags?: string[];
    }
  ) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  clearError: () => void;
  clearSelectedPost: () => void; // Added for clearing selected post state on navigation
}

export interface UserInfo {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface AuthState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    isAdmin?: boolean
  ) => Promise<void>;
  logout: () => void;
  // New action to clear error
  clearError: () => void;
}
