"use client"; // 1. Tambahkan ini di baris paling atas

import { useEffect, useState } from "react"; // 2. Tambah import hooks
import { getBlogPosts } from "@/services/blogService";
import BlogCard from "@/app/blog/BlogCard"; // Tetap gunakan path lama Anda
import { BlogPost } from "@/types/blog";

export default function HomePage() {
  // 3. Ubah menjadi state agar bisa difilter
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // 4. Ambil data saat halaman pertama kali dibuka
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

  // 5. Logika Filter: Membandingkan judul artikel dengan ketikan di search bar
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blog-dark text-white py-28 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-display-3xl font-bold mb-8 tracking-tighter italic">
            The Art of <span className="text-blue-500">Blogging</span>
          </h1>
          <p className="text-lg md:text-text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Temukan wawasan terbaru tentang teknologi, desain, dan pengembangan
            web langsung dari para ahli di bidangnya.
          </p>

          {/* 6. Tambahkan Input Search di Sini */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Cari judul artikel..."
              className="w-full px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-2xl backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="container mx-auto py-24 px-6 md:px-12">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold text-blog-dark">
              Latest Stories
            </h2>
            <div className="h-1.5 w-24 bg-blue-600 mt-4"></div>
          </div>
          <p className="text-gray-500 font-medium">
            Menampilkan {filteredPosts.length} artikel
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 italic">
            Memuat artikel...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-400 text-xl italic">
              Artikel "{searchQuery}" tidak ditemukan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
