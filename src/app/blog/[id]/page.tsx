import { getBlogPosts } from "@/services/blogService";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params karena ini Next.js 15
  const { id } = await params;

  // Ambil data dari service
  const response = await getBlogPosts();

  // Cari artikel berdasarkan ID
  const post = response.data.find((item) => item.id.toString() === id);

  // Jika tidak ditemukan, tampilkan 404
  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <nav className="container mx-auto px-6 py-8">
        <Link href="/" className="text-blue-600 font-medium">
          ← Back to Home
        </Link>
      </nav>

      <article className="container mx-auto px-6 max-w-4xl">
        <header className="text-center mb-10">
          <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-gray-900 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-500">
            By {post.author.username} •{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </header>

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-125 object-cover rounded-3xl shadow-xl mb-12"
        />

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          <p className="text-xl mb-6 font-light italic text-gray-600">
            "{post.content.substring(0, 100)}..."
          </p>
          <p>{post.content}</p>
        </div>
      </article>
    </div>
  );
}
