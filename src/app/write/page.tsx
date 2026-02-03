"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi simpan data
    console.log("Publishing:", { title, category, content });
    alert("Story successfully published!");
    router.push("/"); // Kembali ke Home setelah posting
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Action */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">
              Write New Story
            </h1>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
            >
              Publish Now
            </button>
          </div>

          {/* Judul Artikel */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Title of your story..."
              className="w-full text-4xl md:text-5xl font-bold placeholder:text-gray-200 outline-none border-none focus:ring-0 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Pilihan Kategori */}
          <div className="flex flex-wrap gap-3 py-4 border-y border-gray-50">
            {["Technology", "Design", "Development", "Startup"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  category === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Area Konten Utama */}
          <div className="space-y-2">
            <textarea
              placeholder="Tell your story here..."
              className="w-full min-h-100 text-xl leading-relaxed placeholder:text-gray-200 outline-none border-none focus:ring-0 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
    </main>
  );
}
