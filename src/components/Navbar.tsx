"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  // Simulasi status login (nanti ini akan diganti dengan logic Auth asli)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      setIsLoggedIn(false);
      router.push("/login"); // Setelah logout, arahkan ke halaman Login
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo sesuai screenshot kamu */}
        <Link href="/" className="text-2xl font-black italic tracking-tighter">
          BLOG<span className="text-blue-600">.</span>
        </Link>

        <div className="flex items-center gap-8 font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-all">
            Home
          </Link>
          <Link href="/search" className="hover:text-blue-600 transition-all">
            Search
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <Link
                href="/profile"
                className="text-gray-900 hover:text-blue-600 font-bold"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all border border-red-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
