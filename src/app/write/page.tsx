"use client";

import { useState, useEffect } from "react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Ambil data siapa yang sedang login secara real-time
    const session = localStorage.getItem("user_profile");
    if (session) {
      setCurrentUser(JSON.parse(session));
    }
  }, []);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Sesi habis, silakan login ulang.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      description: content.substring(0, 100) + "...",
      content,
      category: "Technology",
      date: new Date().toLocaleDateString("id-ID"),
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",

      // KUNCI: Data penulis diambil dari profil yang sedang login
      authorEmail: currentUser.email,
      author: {
        name: currentUser.name, // Pasti akan jadi 'Andry Riswana' jika Andry yang login
        avatar:
          currentUser.avatar ||
          `https://ui-avatars.com/api/?name=${currentUser.name.replace(/\s/g, "+")}`,
      },
    };

    const allStories = JSON.parse(localStorage.getItem("my_stories") || "[]");
    localStorage.setItem(
      "my_stories",
      JSON.stringify([newPost, ...allStories]),
    );

    window.location.replace("/profile");
  };

  return (
    <main className="min-h-screen bg-white pt-32 px-6">
      <form
        onSubmit={handlePublish}
        className="container mx-auto max-w-2xl space-y-6"
      >
        <input
          className="text-5xl font-black w-full outline-none text-gray-900"
          placeholder="Judul"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full min-h-100 text-xl outline-none resize-none text-gray-700"
          placeholder="Tulis ceritamu..."
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="fixed bottom-10 right-10">
          <button
            type="submit"
            className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-2xl"
          >
            Publish Story
          </button>
        </div>
      </form>
    </main>
  );
}
