"use client";

import { BlogPost } from "@/types/blog";
import Link from "next/link";
import { ThumbsUp, MessageSquare } from "lucide-react";

export default function BlogCard({ blog }: { blog: BlogPost }) {
  const BASE_URL = "https://be-blg-production.up.railway.app";

  // Pastikan fungsi ini memiliki tutup kurung kurawal yang benar
  const getImageUrl = () => {
    if (!blog.image)
      return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80";

    if (blog.image.startsWith("http")) return blog.image;

    const cleanPath = blog.image.startsWith("/")
      ? blog.image
      : `/${blog.image}`;
    return `${BASE_URL}${cleanPath}`;
  }; // <--- BARIS INI HARUS ADA SEBELUM RETURN

  const imgSrc = getImageUrl();

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start group py-8 border-b border-gray-700 last:border-0">
      <div className="relative w-full md:w-72 h-48 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-200 border border-gray-100 shadow-sm">
        <img
          src={imgSrc}
          alt={blog.title}
          className="object-cover w-full h-full transition-opacity duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (
              target.src !== "https://placehold.co/800x400?text=Image+Not+Found"
            ) {
              target.src = "https://placehold.co/800x400?text=Image+Not+Found";
            }
          }}
        />
      </div>

      <div className="flex flex-col flex-1 space-y-3">
        <Link href={`/blog/${blog.id}`}>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
            {blog.title}
          </h2>
        </Link>
        <p className="text-gray-500 line-clamp-3">
          {blog.content ? blog.content.replace(/<[^>]*>/g, "") : ""}
        </p>

        <div className="flex items-center gap-4 pt-2">
          {/* Metadata author bisa kamu tambahkan di sini */}
        </div>
        <div className="flex items-center gap-3 pt-1">
          {/* Avatar Kecil */}
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
            <img
              src={blog.author?.avatar || "https://via.placeholder.com/100"}
              alt={blog.author?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Vertikal: Nama -> Tanggal -> Likes/Comments */}
          <div className="flex flex-col gap-1">
            {/* Baris 1: Nama Penulis */}
            <span className="text-[11px] font-bold text-gray-800 leading-none">
              {blog.author?.name || "Anonymous"}
            </span>

            {/* Baris 2: Tanggal */}
            <span className="text-[9px] text-gray-400 leading-none">
              {new Date(blog.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })}
            </span>

            {/* Baris 3: Likes & Comments (Sekarang di bawah tanggal) */}
            <div className="flex items-center gap-2 text-gray-400 pt-0.5">
              <div className="flex items-center gap-1">
                <ThumbsUp size={10} />
                <span className="text-[9px] font-medium">
                  {(blog as any).likesCount || 0}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare size={10} />
                <span className="text-[9px] font-medium">
                  {(blog as any).commentsCount || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
