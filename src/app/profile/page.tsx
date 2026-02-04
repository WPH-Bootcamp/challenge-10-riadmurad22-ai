"use client";

import { useEffect, useState } from "react";
import { getBlogPosts } from "@/services/blogService";
import BlogCard from "@/app/blog/BlogCard";
import { BlogPost } from "@/types/blog";
import Link from "next/link";

export default function ProfilePage() {
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    name: "Riad Murad",
    email: "riadmurad22@gmail.com",
    avatar:
      "https://ui-avatars.com/api/?name=Riad+Murad&background=0066FF&color=fff&size=128",
    bio: "Tech Enthusiast & Blogger.",
  });

  useEffect(() => {
    // Muat data Profil
    const savedProfile = localStorage.getItem("user_profile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setUser((prev) => ({
        ...prev,
        name: parsed.name,
        bio: parsed.bio,
        avatar: `https://ui-avatars.com/api/?name=${parsed.name.replace(/\s/g, "+")}&background=0066FF&color=fff&size=128`,
      }));
    }

    // Muat data Artikel
    const savedStories = localStorage.getItem("my_stories");
    if (savedStories) {
      setMyPosts(JSON.parse(savedStories));
      setLoading(false);
    } else {
      const fetchMyPosts = async () => {
        try {
          const response = await getBlogPosts();
          setMyPosts(response.data.slice(0, 2));
        } finally {
          setLoading(false);
        }
      };
      fetchMyPosts();
    }
  }, []);

  // FUNGSI BARU: Menghapus Artikel
  const deletePost = (id: number) => {
    if (confirm("Yakin ingin menghapus cerita ini?")) {
      const updatedPosts = myPosts.filter((post) => post.id !== id);
      setMyPosts(updatedPosts);
      localStorage.setItem("my_stories", JSON.stringify(updatedPosts));
    }
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      <section className="bg-gray-50/50 border-b border-gray-100 pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-40 h-40 rounded-[2.5rem] shadow-2xl border-4 border-white transition-transform group-hover:scale-105 duration-300"
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-2 tracking-tighter">
              {user.name}
            </h1>
            <p className="text-blue-600 font-semibold text-lg mb-4">
              {user.email}
            </p>
            <p className="text-gray-500 leading-relaxed max-w-xl text-lg">
              {user.bio}
            </p>
          </div>
          <Link
            href="/profile/edit"
            className="px-8 py-4 bg-white border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm"
          >
            Edit Profile
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-6 mt-20 max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            My Stories{" "}
            <span className="ml-2 text-blue-600 opacity-30">
              {myPosts.length}
            </span>
          </h2>
          <Link
            href="/write"
            className="text-blue-600 font-bold hover:underline flex items-center gap-2"
          >
            Write New +
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {myPosts.map((post) => (
              <div key={post.id} className="relative group">
                {/* Tombol Hapus (Hanya muncul saat hover di desktop atau terlihat di mobile) */}
                <button
                  onClick={() => deletePost(post.id)}
                  className="absolute top-4 right-4 z-10 bg-red-500 text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Delete story"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <BlogCard post={post} />
              </div>
            ))}

            <Link
              href="/write"
              className="group border-2 border-dashed border-gray-200 rounded-[3rem] flex flex-col items-center justify-center p-12 hover:border-blue-400 hover:bg-blue-50/50 transition-all min-h-100"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor font-bold"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span className="font-bold text-gray-900">New Story</span>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
