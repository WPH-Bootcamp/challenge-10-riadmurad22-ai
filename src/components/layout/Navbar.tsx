"use client"; // Wajib karena ada interaksi tombol

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  // Status simulasi: set ke 'true' agar tombol Logout langsung muncul
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    // Memberikan konfirmasi sebelum logout
    const confirmLogout = confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      setIsLoggedIn(false);
      router.push("/login"); // Arahkan ke halaman login setelah keluar
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo BLOG. */}
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
          <Link
            href="/profile"
            className="hover:text-blue-600 transition-colors"
          >
            Profile
          </Link>

          {isLoggedIn ? (
            /* TAMPILAN JIKA SUDAH LOGIN */
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-400 hidden md:inline">
                Hi, Riad Murad
              </span>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            /* TAMPILAN JIKA BELUM LOGIN */
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
