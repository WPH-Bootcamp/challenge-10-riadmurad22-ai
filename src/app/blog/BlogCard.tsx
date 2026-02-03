import { BlogPost } from "@/types/blog";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
      {/* 1. Bagian Gambar Utama */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
        <img
          src={
            post.image ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800"
          }
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge Kategori */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
            {post.category || "Insight"}
          </span>
        </div>
      </div>

      {/* 2. Bagian Konten Teks */}
      <div className="flex flex-col grow p-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("id-ID", {
                  dateStyle: "medium",
                })
              : "Baru Saja"}
          </span>
          <span>•</span>
          <span>5 mnt baca</span>
        </div>

        <h3 className="text-xl font-bold text-[#1E1E1E] mb-3 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.content}
        </p>

        {/* 3. Footer Kartu (Penulis & Tombol Navigasi) */}
        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar Inisial */}
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
              {post.author?.username?.charAt(0) || "W"}
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {post.author?.username || "Penulis"}
            </span>
          </div>

          {/* Link ke Halaman Detail */}
          <Link
            href={`/blog/${post.id}`}
            className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1 group/link"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
