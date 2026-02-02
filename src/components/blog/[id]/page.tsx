import { getBlogPosts } from "@/services/blogService";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Next.js 15 wajib menggunakan await untuk params
  const { id } = await params;

  // 2. Karena kita pakai mock data, kita ambil dari getBlogPosts lalu filter
  const response = await getBlogPosts();
  const post = response.data.find((item) => item.id.toString() === id);

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-6 pt-10">
        <Link
          href="/"
          className="text-blue-600 hover:underline flex items-center gap-2 mb-8 font-semibold"
        >
          ← Kembali ke Beranda
        </Link>
      </div>

      <header className="container mx-auto px-6 max-w-4xl text-center">
        <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-[#1E1E1E] mt-6 mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-center gap-4 mb-12 border-b border-gray-100 pb-8">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
            {post.author.username.charAt(0)}
          </div>
          <div className="text-left">
            <p className="font-bold text-[#1E1E1E]">{post.author.username}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("id-ID", {
                dateStyle: "long",
              })}
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 max-w-5xl mb-16">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-125 object-cover rounded-3xl shadow-xl"
        />
      </div>

      <article className="container mx-auto px-6 max-w-3xl">
        <div className="text-xl text-gray-800 leading-loose space-y-6">
          {post.content}
        </div>
      </article>
    </main>
  );
}
