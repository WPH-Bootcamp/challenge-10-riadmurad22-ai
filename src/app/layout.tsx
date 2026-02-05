import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-ignore
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog. - Personal Story",
  description: "Temukan wawasan terbaru tentang teknologi dan desain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Kita tambahkan class antialiased dan transition untuk kenyamanan mata */}
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}