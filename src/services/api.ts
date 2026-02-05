import axios from "axios";
import {
  LoginCredentials,
  RegisterUserData,
  CreateBlogData,
  UserProfile,
} from "@/types/blog";

export const api = axios.create({
  baseURL: "https://be-blg-production.up.railway.app",
});

// Interceptor untuk menyisipkan Token secara otomatis
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Tambahkan di src/services/api.ts jika belum ada
// src/services/api.ts

// Pastikan ada kata 'export' dan namanya 'login'
export const login = async (credentials: any) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData: RegisterUserData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};
export const getBlogs = async (page = 1, limit = 10) => {
  try {
    const response = await api.get("/posts/recommended", {
      params: { limit, page },
    });
    return response.data;
  } catch (error: any) {
    console.error("Full Error Path:", error.response?.data?.path);
    console.error("Full Error Message:", error.response?.data?.message);
    throw error;
  } // Pastikan ada penutup catch di sini
}; // Pastikan ada penutup fungsi di sini
// Tambahkan di services/api.ts

// Tambahkan di services/api.ts
export const createBlog = async (blogData: CreateBlogData) => {
  const { data } = await api.post("/blog", blogData);
  return data;
};
// Tambahkan di src/services/api.ts
export const getProfile = async () => {
  const { data } = await api.get("/auth/me"); // Asumsi endpoint profile
  return data;
};

export const getMyBlogs = async () => {
  const { data } = await api.get("/blog/me"); // Asumsi endpoint blog milik user
  return data;
};

// Tambahkan ini di src/services/api.ts jika belum ada
export const getBlogDetail = async (id: string) => {
  const { data } = await api.get(`/posts/${id}`);
  // Jika API membungkusnya lagi dalam objek 'data', gunakan data.data
  return data.data || data;
};
export const register = async (userData: any) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};