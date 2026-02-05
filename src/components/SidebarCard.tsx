"use client";

import { BlogPost } from "@/types/blog";
import Link from "next/link";
import { ThumbsUp, MessageSquare } from "lucide-react";

interface SidebarCardProps {
  blog: BlogPost;
  rank: number;
}

export default function SidebarCard({ blog, rank }: SidebarCardProps) {
  const BASE_URL = "https://be-blg-production.up.railway.app";

  const authorImg = blog.author?.avatar
    ? blog.author.avatar.startsWith("http")
      ? blog.author.avatar
      : `${BASE_URL}${blog.author.avatar}`
    : `https://ui-avatars.com/api/?name=${blog.author?.name || "User"}`;

  // ... sisa kode ...
  const formattedRank = rank < 10 ? `0${rank}` : rank;

  // Fungsi pembersih tag HTML agar konten tidak berantakan
  const getPlainText = (html: string) => {
    return html ? html.replace(/<[^>]*>/g, "") : "";
  };

  return (
    <div className="flex gap-4 items-start group py-4 border-b border-gray-500 last:border-0">
      {/* Nomor Urut Besar */}
      <span className="text-2xl font-bold text-gray-200 group-hover:text-blue-200 transition-colors flex-shrink-0 min-w-[35px]">
        {formattedRank}
      </span>

      <div className="flex flex-col gap-2 flex-1">
        {/* Judul Artikel */}
        <Link href={`/blog/${blog.id}`}>
          <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {blog.title}
          </h4>
        </Link>

        {/* TAMBAHKAN INI: Konten Ringkas */}
        <p className="text-[14px] text-gray-500 line-clamp-2 leading-relaxed">
          {getPlainText(blog.content)}
        </p>

        {/* Metadata Penulis & Interaksi */}
        {/* Metadata Penulis & Interaksi */}
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
