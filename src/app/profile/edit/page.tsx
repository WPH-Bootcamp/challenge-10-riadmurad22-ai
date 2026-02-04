"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditProfilePage() {
  const router = useRouter();

  // State awal (Default)
  const [name, setName] = useState("Riad Murad");
  const [bio, setBio] = useState(
    "Tech Enthusiast & Blogger. Suka mengeksplorasi teknologi web terbaru.",
  );

  // Tips Tambahan: Mengambil data lama dari storage saat halaman pertama kali dibuka
  useEffect(() => {
    const savedData = localStorage.getItem("user_profile");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setName(parsed.name);
      setBio(parsed.bio);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Proses Simpan: Mengubah objek menjadi string untuk disimpan di browser
    const userData = { name, bio };
    localStorage.setItem("user_profile", JSON.stringify(userData));

    alert("Profile updated successfully!");

    // Mengarahkan kembali ke profil dan memaksa refresh agar Navbar terupdate
    window.location.href = "/profile";
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-2xl">
        {/* Tombol Kembali */}
        <div className="mb-10 flex items-center gap-4">
          <Link
            href="/profile"
            className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Edit Profile
          </h1>
        </div>

        <form
          onSubmit={handleSave}
          className="space-y-8 bg-gray-50/50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100"
        >
          {/* Avatar Preview Section */}
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="relative">
              <img
                src={`https://ui-avatars.com/api/?name=${name.replace(/\s/g, "+")}&background=0066FF&color=fff&size=128`}
                alt="Avatar Preview"
                className="w-32 h-32 rounded-4xl shadow-xl border-4 border-white object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-xl text-white shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              Preview Avatar
            </p>
          </div>

          {/* Input Nama */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Input Bio */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Short Bio
            </label>
            <textarea
              rows={4}
              className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
            >
              Save Changes
            </button>
            <Link
              href="/profile"
              className="px-8 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
