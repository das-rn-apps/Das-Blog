// frontend/src/store/authStore.ts
import { create } from "zustand";
import {
  loginUser as apiLogin,
  registerUser as apiRegister,
} from "../api/blogApi";
import type { AuthState, UserInfo } from "../types";

const loadUserInfo = (): UserInfo | null => {
  try {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  } catch (e) {
    console.error("Failed to parse userInfo from localStorage", e);
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  userInfo: loadUserInfo(),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await apiLogin(email, password);
      localStorage.setItem("userInfo", JSON.stringify(data)); // Persist to localStorage
      set({ userInfo: data, loading: false });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed";
      set({ error: errorMessage, userInfo: null, loading: false });
      localStorage.removeItem("userInfo"); // Clear invalid data
    }
  },

  register: async (username, email, password, isAdmin = false) => {
    set({ loading: true, error: null });
    try {
      const data = await apiRegister(username, email, password, isAdmin);
      localStorage.setItem("userInfo", JSON.stringify(data)); // Persist to localStorage
      set({ userInfo: data, loading: false });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      set({ error: errorMessage, userInfo: null, loading: false });
      localStorage.removeItem("userInfo"); // Clear invalid data
    }
  },

  logout: () => {
    set({ userInfo: null, loading: false, error: null });
    localStorage.removeItem("userInfo"); // Clear from localStorage
  },

  clearError: () => {
    set({ error: null });
  },
}));

window.addEventListener("storage", (event) => {
  if (event.key === "userInfo") {
    useAuthStore.setState({ userInfo: loadUserInfo() });
  }
});
