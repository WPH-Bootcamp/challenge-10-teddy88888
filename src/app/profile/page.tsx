"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile, getMyBlogs } from "@/services/api";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import { BlogPost } from "@/types/blog";

export default function ProfilePage() {
  // Ambil data profil
  const { data: user, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  // Ambil daftar blog milik user sendiri
  const { data: myBlogs, isLoading: blogsLoading } = useQuery({
    queryKey: ["my-blogs"],
    queryFn: getMyBlogs,
  });

  if (profileLoading)
    return <div className="text-center mt-20">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* HEADER PROFIL - Sesuai Profile (1).jpg */}
        <section className="flex flex-col items-center text-center mb-16">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-50 shadow-lg mb-4">
            <Image
              src={user?.avatar || "/avatar-placeholder.png"}
              alt="Profile Picture"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {user?.username || "User Name"}
          </h1>
          <p className="text-gray-500 mt-1">{user?.email}</p>

          <div className="flex gap-8 mt-6">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">
                {myBlogs?.length || 0}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Posts
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">1.2k</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Followers
              </p>
            </div>
          </div>

          <button className="mt-8 px-6 py-2 border border-gray-200 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all">
            Edit Profile
          </button>
        </section>

        {/* TAB NAVIGATION */}
        <div className="border-b border-gray-100 mb-10">
          <nav className="flex gap-8">
            <button className="border-b-2 border-blue-600 pb-4 text-sm font-bold text-gray-900">
              My Posts
            </button>
            <button className="pb-4 text-sm font-medium text-gray-400 hover:text-gray-600">
              Saved
            </button>
          </nav>
        </div>

        {/* DAFTAR POSTINGAN USER */}
        <div className="space-y-12">
          {blogsLoading ? (
            <p>Loading your stories...</p>
          ) : myBlogs?.length > 0 ? (
            myBlogs.map((blog: BlogPost) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400">
                You haven&apos;t written any stories yet.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
