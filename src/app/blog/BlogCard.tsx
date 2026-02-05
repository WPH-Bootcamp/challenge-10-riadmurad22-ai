import { BlogPost } from "@/types/blog";
import Link from "next/link";

export default function BlogCard({ post }: { post: BlogPost }) {
  // Logika cerdas: pakai description jika ada, kalau tidak ada potong dari content
  const displayDescription = post.description || 
    (post.content ? post.content.substring(0, 100) + "..." : "No description available");

  return (
    <Link href={`/blog/${post.id}`}>
      <div className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
        
        {/* Gambar Artikel */}
        <div className="overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        </div>

        <div className="p-8 flex flex-col flex-1">
          {/* Kategori */}
          <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            {post.category}
          </span>

          {/* Judul */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
            {post.title}
          </h3>

          {/* Deskripsi Singkat */}
          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
            {displayDescription}
          </p>

          {/* Footer Kartu */}
          <div className="mt-auto flex justify-between items-center pt-6 border-t border-gray-50 dark:border-gray-700">
            <div className="flex items-center gap-2">
               <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                 By {post.author?.username || "Admin"}
               </span>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 italic">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}