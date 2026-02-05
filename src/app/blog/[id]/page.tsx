"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBlogDetail } from "@/services/api"; // Pastikan fungsi ini ada di api.ts
import Navbar from "@/components/Navbar";

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id; // Mengambil '6' dari URL /blog/6

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogDetail(id as string),
    enabled: !!id, // Hanya jalan jika id ada
  });

  if (isLoading) return <div className="p-20 text-center">Loading...</div>;
  if (isError || !blog)
    return <div className="p-20 text-center">Artikel tidak ditemukan.</div>;

  return (
    <main>
      <Navbar />
      <article className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full rounded-2xl mb-8"
          />
        )}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </main>
  );
}
