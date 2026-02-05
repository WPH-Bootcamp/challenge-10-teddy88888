/**
 * Blog Types
 *
 * TODO: Define types sesuai dengan response dari API
 * Contoh structure (sesuaikan dengan API response yang sebenarnya):
 */

export interface BlogPost {
  id: number; // Berdasarkan log, id berupa number
  title: string;
  content: string;
  imageUrl: string; // Ganti dari image menjadi imageUrl
  author?: {
    name: string;
    avatar: string;
  };
  createdAt: string;
}

export interface BlogPostListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  // ... tambahkan fields lainnya
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterUserData {
  email: string;
  password: string;
  username: string;
}

export interface CreateBlogData {
  title: string;
  content: string;
  category: string[];
  image: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
}
