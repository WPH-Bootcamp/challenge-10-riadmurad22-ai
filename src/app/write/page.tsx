"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [content, setContent] = useState("");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Buat objek artikel baru
    const newPost = {
      id: Date.now(), // ID unik berdasarkan waktu
      title,
      category,
      description: content.substring(0, 100) + "...", // Ambil sedikit isi untuk ringkasan
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop", // Gambar default
    };

    // 2. Ambil data artikel yang sudah ada di storage
    const existingPosts = JSON.parse(
      localStorage.getItem("my_stories") || "[]",
    );

    // 3. Tambahkan artikel baru ke baris paling atas
    const updatedPosts = [newPost, ...existingPosts];

    // 4. Simpan kembali ke storage
    localStorage.setItem("my_stories", JSON.stringify(updatedPosts));

    alert("Story Published Successfully!");
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <form onSubmit={handlePublish} className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            className="w-full text-5xl font-black outline-none placeholder:text-gray-200 tracking-tighter"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <select
            className="px-4 py-2 rounded-full border border-gray-100 bg-gray-50 text-sm font-bold text-blue-600 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Technology</option>
            <option>Lifestyle</option>
            <option>Design</option>
          </select>

          <textarea
            placeholder="Tell your story..."
            className="w-full min-h-100 text-xl leading-relaxed outline-none placeholder:text-gray-200 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <div className="fixed bottom-10 right-10 flex gap-4">
            <button
              type="submit"
              className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold shadow-2xl shadow-blue-500/40 hover:bg-blue-700 transition-all hover:-translate-y-1"
            >
              Publish Now
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
