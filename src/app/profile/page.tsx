"use client";

import { useEffect, useState } from "react";
import { getBlogPosts } from "@/services/blogService";
import BlogCard from "@/app/blog/BlogCard";
import { BlogPost } from "@/types/blog";

export default function ProfilePage() {
  const [myPosts, setMyPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Data User sesuai dengan yang kamu input di Register
  const user = {
    name: "Riad Murad",
    email: "riadmurad22@gmail.com",
    avatar:
      "https://ui-avatars.com/api/?name=Riad+Murad&background=0066FF&color=fff&size=128",
    bio: "Tech Enthusiast & Blogger. Suka mengeksplorasi teknologi web terbaru.",
  };

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await getBlogPosts();
        // Simulasi: Kita ambil 2 artikel teratas sebagai artikel milik Riad
        setMyPosts(response.data.slice(0, 2));
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, []);

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Header Profil - Background abu-abu halus agar kontras */}
      <section className="bg-gray-50/50 border-b border-gray-100 pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-10">
          {/* Avatar dengan shadow yang dalam sesuai gaya Figma */}
          <div className="relative group">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-40 h-40 rounded-[2.5rem] shadow-2xl border-4 border-white transition-transform group-hover:scale-105 duration-300"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-600 p-3 rounded-2xl shadow-lg text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
              {user.name}
            </h1>
            <p className="text-blue-600 font-semibold text-lg mb-4">
              {user.email}
            </p>
            <p className="text-gray-500 leading-relaxed max-w-xl text-lg">
              {user.bio}
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-8 py-4 bg-white border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm">
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Konten Artikel */}
      <section className="container mx-auto px-6 mt-20 max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-900">My Stories</h2>
            <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">
              {myPosts.length}
            </span>
          </div>
          <a
            href="/write"
            className="text-blue-600 font-bold hover:underline flex items-center gap-2"
          >
            Write New{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading your amazing stories...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {myPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}

            {/* Slot Kosong untuk Menambah Artikel */}
            <a
              href="/write"
              className="group border-2 border-dashed border-gray-200 rounded-[3rem] flex flex-col items-center justify-center p-12 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 min-h-100"
            >
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-900">New Story</span>
              <p className="text-gray-400 text-center mt-2 max-w-37.5">
                Bagikan pemikiranmu hari ini.
              </p>
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
