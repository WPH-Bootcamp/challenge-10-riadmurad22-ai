import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";

// 1. Import Navbar yang baru saja kita buat
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App Challenge",
  description: "Blog Application Challenge - Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 2. Letakkan Navbar di sini agar muncul di semua halaman */}
        <Navbar />

        {/* 3. Main content (halaman-halaman kamu) akan muncul di sini */}
        <main>{children}</main>

        {/* 4. (Opsional) Kamu bisa tambah Footer di sini nanti */}
      </body>
    </html>
  );
}
