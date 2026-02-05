/**
 * Home Page
 *
 * TODO: Implement homepage sesuai dengan design Figma
 * - Tampilkan daftar artikel blog
 * - Implement search/filter jika diperlukan
 * - Handle loading dan error states
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/services/api";
import { BlogPost } from "@/types/blog";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import SidebarCard from "@/components/SidebarCard";

export default function HomePage() {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs", 1],
    queryFn: () => getBlogs(1, 10),
  });

  // Normalisasi data: Memastikan kita selalu bekerja dengan Array
  // Backend https://be-blg-production.up.railway.app/posts/recommended
  // mengembalikan data di dalam properti .data
  const blogList: BlogPost[] = Array.isArray(blogs)
    ? blogs
    : (blogs as any)?.data || [];

  if (isLoading)
    return <div className="p-10 text-center">Loading articles...</div>;
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">Gagal memuat artikel.</div>
    );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* SISI KIRI: RECOMMEND FOR YOU */}
          <div className="lg:col-span-2 lg:pr-12 lg:border-r-4 lg:border-double lg:border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
              Recommend For You
            </h2>

            <div className="flex flex-col gap-10">
              {blogList.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
         
          {/* SISI KANAN: MOST LIKED */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
              Most Liked
            </h2>
            <div className="flex flex-col gap-6">
              {blogList.slice(0, 5).map((blog, index) => (
                <SidebarCard key={blog.id} blog={blog} rank={index + 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}