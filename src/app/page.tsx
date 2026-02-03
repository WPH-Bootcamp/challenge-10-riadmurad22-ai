"use client";

import { useEffect, useState } from "react";
import { getBlogPosts } from "@/services/blogService";
import BlogCard from "@/app/blog/BlogCard";
import { BlogPost } from "@/types/blog";

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getBlogPosts();
        setPosts(response.data || []);
      } catch (error) {
        console.error("Gagal mengambil data blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter artikel berdasarkan apa yang diketik di Search Bar
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section dengan Judul "Blogging" Biru seperti di gambarmu */}
      <section className="bg-white pt-24 pb-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tighter italic text-blue-600">
            Blogging
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed mb-12">
            Temukan wawasan terbaru tentang teknologi, desain, dan pengembangan
            web langsung dari para ahli di bidangnya.
          </p>

          {/* Search Bar yang sudah kamu buat (image_b4cadb.png) */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search articles by title..."
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border border-gray-100 shadow-[0_20px_50px_rgba(8,112,184,0.1)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Daftar Artikel (Latest Stories) */}
      <section className="container mx-auto py-16 px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Latest Stories
          </h2>
          <p className="text-gray-500 font-medium">
            {searchQuery
              ? `Hasil: ${filteredPosts.length}`
              : `Menampilkan ${posts.length} artikel`}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 bg-gray-100 animate-pulse rounded-3xl"
              ></div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-4xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-xl italic">
              Maaf, artikel "{searchQuery}" tidak ditemukan.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
