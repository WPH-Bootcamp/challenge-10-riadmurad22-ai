"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getBlogPosts } from "@/services/blogService";

export default function BlogDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const id = params.id as string;

      // 1. Cek dulu di LocalStorage (Artikel buatan Riad)
      const savedStories = JSON.parse(
        localStorage.getItem("my_stories") || "[]",
      );
      const localPost = savedStories.find((p: any) => p.id.toString() === id);

      if (localPost) {
        // Jika ketemu di storage, gunakan data tersebut
        setPost({
          ...localPost,
          authorName: "M Riad Murad", // Karena ini artikel kamu
          content: localPost.description, // Mapping field
        });
        setLoading(false);
      } else {
        // 2. Jika tidak ada di storage, cari di API (Artikel contoh)
        try {
          const response = await getBlogPosts();
          const apiPost = response.data.find(
            (item: any) => item.id.toString() === id,
          );

          if (apiPost) {
            setPost({
              ...apiPost,
              authorName: apiPost.author.username,
              content: apiPost.content,
            });
          }
        } catch (error) {
          console.error("Gagal mengambil data API", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading story...
      </div>
    );
  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Story not found.
      </div>
    );

  return (
    <main className="min-h-screen bg-white pb-20 pt-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <nav className="mb-10">
          <Link
            href="/profile"
            className="text-blue-600 font-bold flex items-center gap-2 hover:underline"
          >
            ← Back to Profile
          </Link>
        </nav>

        <article>
          <header className="mb-12">
            <span className="bg-blue-100 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black mt-6 mb-6 text-gray-900 leading-[1.1] tracking-tighter">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-gray-500 font-medium">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {post.authorName.substring(0, 2).toUpperCase()}
              </div>
              <span>{post.authorName}</span>
              <span>•</span>
              <span>
                {post.date || new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </header>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-125 object-cover rounded-[3rem] shadow-2xl mb-6"
          />

          <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed font-serif">
            {post.content}
          </div>
        </article>
      </div>
    </main>
  );
}
