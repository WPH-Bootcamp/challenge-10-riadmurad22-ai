"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogCard from "@/app/blog/BlogCard";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activeUser = localStorage.getItem("user_profile");

    // JIKA DATA KOSONG, JANGAN LOADING TERUS, TAPI PINDAH KE LOGIN
    if (!activeUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(activeUser);
    setUser(parsedUser);

    // Filter cerita spesifik milik user yang login
    const allStories = JSON.parse(localStorage.getItem("my_stories") || "[]");
    const userStories = allStories.filter(
      (post: any) => post.authorEmail === parsedUser.email,
    );

    setMyPosts(userStories);
    setLoading(false);
  }, [router]);

  const deletePost = (id: number) => {
    if (confirm("Hapus cerita ini?")) {
      const allStories = JSON.parse(localStorage.getItem("my_stories") || "[]");
      const updatedAll = allStories.filter((p: any) => p.id !== id);
      localStorage.setItem("my_stories", JSON.stringify(updatedAll));
      setMyPosts(myPosts.filter((p) => p.id !== id));
    }
  };

  // TAMPILAN LOADING YANG AMAN
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-bold animate-pulse">Menyiapkan profil...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header Profil Dinamis */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 p-8 bg-gray-50 rounded-[3rem]">
          <div className="w-32 h-32 bg-blue-100 rounded-4xl flex items-center justify-center text-4xl shadow-inner">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tighter">
              {user.name}
            </h1>
            <p className="text-gray-500 mt-2">
              {user.bio || "Blogger Enthusiast"}
            </p>
          </div>
          <Link
            href="/profile/edit"
            className="px-6 py-3 border border-gray-200 rounded-2xl font-bold hover:bg-white transition-all"
          >
            Edit Profile
          </Link>
        </div>

        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Cerita Saya ({myPosts.length})</h2>
          <Link href="/write" className="text-blue-600 font-bold italic">
            Write New +
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myPosts.map((post) => (
            <div key={post.id} className="relative group">
              <button
                onClick={() => deletePost(post.id)}
                className="absolute top-4 right-4 z-20 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
              >
                🗑️
              </button>
              <BlogCard post={post} />
            </div>
          ))}

          <Link
            href="/write"
            className="border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center p-10 hover:border-blue-400 transition-all min-h-87.5"
          >
            <span className="text-4xl mb-2">➕</span>
            <span className="font-bold text-gray-400 text-center">
              Tulis Cerita Pertama Anda
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
