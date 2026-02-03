"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login dengan:", { email, password });
    // Nantinya kita akan hubungkan ke API Auth di sini
    alert("Fitur Login sedang disiapkan!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 italic">
            BLOG<span className="text-blue-600">.</span>
          </h1>
          <p className="text-gray-500">
            Selamat datang kembali! Silakan masuk ke akun Anda.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-bold hover:underline"
            >
              Daftar Gratis
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
