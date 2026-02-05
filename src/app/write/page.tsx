"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createBlog } from "@/services/api";
import Navbar from "@/components/Navbar";

export default function WritePostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "", // Opsional: URL gambar
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      alert("Post berhasil dibuat!");
      router.push("/");
      router.refresh();
    },
    onError: (error: Error) => {
      alert("Gagal membuat post: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mengubah string kategori menjadi array agar sesuai format API biasanya
    const payload = {
      ...formData,
      category: formData.category.split(",").map((c) => c.trim()),
    };
    mutate(payload);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Write a New Story
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-lg font-medium"
                placeholder="Enter a catchy title..."
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Kategori & Image URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category (comma separated)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Tech, Lifestyle, Code"
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="https://image-url.com/photo.jpg"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Konten */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <textarea
                required
                rows={12}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none leading-relaxed"
                placeholder="Tell your story..."
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl shadow-lg shadow-blue-100 transition-all transform active:scale-95"
              >
                {isPending ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
