"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter(); // Definisikan router di sini
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Buat objek user baru
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      bio: "Blogger Enthusiast",
      avatar: `https://ui-avatars.com/api/?name=${name.replace(/\s/g, "+")}&background=0066FF&color=fff`
    };

    // 2. Ambil daftar user yang sudah ada (Database simulasi)
    const existingUsers = JSON.parse(localStorage.getItem("USER_LIST") || "[]");

    // 3. Cek apakah email sudah terdaftar
    const isEmailUsed = existingUsers.some((user: any) => user.email === email);
    if (isEmailUsed) {
      alert("Email sudah terdaftar! Gunakan email lain.");
      return;
    }

    // 4. Simpan ke USER_LIST
    existingUsers.push(newUser);
    localStorage.setItem("USER_LIST", JSON.stringify(existingUsers));

    alert("Registrasi Berhasil! Silakan masuk.");
    
    // 5. Pindah ke halaman login
    router.push("/login"); // Sekarang 'router' sudah dikenal
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl p-12">
        <div className="text-3xl font-black italic text-center mb-8 text-gray-900">
          BLOG<span className="text-blue-600">.</span>
        </div>
        
        <h1 className="text-xl font-bold text-center mb-8">Buat Akun Baru</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Full Name</label>
            <input 
              type="text" 
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all mt-6"
          >
            Daftar Sekarang
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Sudah punya akun? <Link href="/login" className="text-blue-600 font-bold">Sign In</Link>
        </p>
      </div>
    </main>
  );
}