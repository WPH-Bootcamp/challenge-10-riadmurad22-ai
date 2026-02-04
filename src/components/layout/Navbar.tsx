"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [displayName, setDisplayName] = useState("Riad Murad");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Mengecek apakah ada profil tersimpan untuk menentukan status login
    const savedData = localStorage.getItem("user_profile");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setDisplayName(parsed.name);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      // 1. Hapus data dari penyimpanan browser
      localStorage.removeItem("user_profile");

      // 2. Update state secara instan
      setIsLoggedIn(false);

      // 3. Paksa pindah ke halaman Home dan refresh total
      // Ini memastikan sisa-sisa data di memory hilang sepenuhnya
      window.location.replace("/");
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black italic tracking-tighter text-gray-900"
        >
          BLOG<span className="text-blue-600">.</span>
        </Link>

        {/* Menu Navigasi */}
        <div className="flex items-center gap-8 font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>

          {/* Menu Profile hanya muncul jika sedang login */}
          {isLoggedIn && (
            <Link
              href="/profile"
              className="hover:text-blue-600 transition-colors"
            >
              Profile
            </Link>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-400 hidden md:inline font-medium">
                Hi, <span className="text-gray-900">{displayName}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-8 py-2.5 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
