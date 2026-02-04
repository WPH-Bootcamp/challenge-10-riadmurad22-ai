"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("riadmurad22@gmail.com");
  const [password, setPassword] = useState("******");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Simpan kembali data user ke LocalStorage agar Navbar & Profile mengenalimu
    const userData = {
      name: "M Riad Murad", 
      bio: "Tech Enthusiast & Blogger. Suka sekali tantangan untuk mengeksplorasi teknologi web terbaru dan tercanggih ooiii ...",
    };
    
    localStorage.setItem("user_profile", JSON.stringify(userData));

    // 2. Gunakan window.location.replace agar Navbar mendeteksi perubahan storage secara total
    window.location.replace("/profile");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl shadow-blue-500/10 p-12 text-center">
        
        {/* Logo */}
        <div className="text-3xl font-black italic tracking-tighter text-gray-900 mb-4">
          BLOG<span className="text-blue-600">.</span>
        </div>
        
        <h1 className="text-gray-900 text-xl font-bold mb-2">Selamat datang kembali!</h1>
        <p className="text-gray-400 text-sm mb-10">Silakan masuk ke akun Anda.</p>

        <form onSubmit={handleSignIn} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              placeholder="••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all mt-6"
          >
            Sign In
          </button>
        </form>

        <p className="mt-10 text-sm text-gray-400">
          Belum punya akun? <Link href="/register" className="text-blue-600 font-bold hover:underline">Daftar Gratis</Link>
        </p>
      </div>
    </main>
  );
}