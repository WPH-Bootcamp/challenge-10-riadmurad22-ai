import { getBlogPosts } from "@/services/blogService";
import BlogCard from "@/components/blog/BlogCard";
import { BlogPost } from "@/types/blog"; // Import tipe data

export default async function HomePage() {
  let posts: BlogPost[] = []; // Berikan tipe data array agar tidak error

  try {
    const response = await getBlogPosts();
    posts = response.data || [];
  } catch (error) {
    console.error("Gagal mengambil data blog:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blog-dark text-white py-28 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-display-3xl font-bold mb-8 tracking-tighter italic">
            The Art of <span className="text-blue-500">Blogging</span>
          </h1>
          <p className="text-lg md:text-text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Temukan wawasan terbaru tentang teknologi, desain, dan pengembangan
            web langsung dari para ahli di bidangnya.
          </p>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="container mx-auto py-24 px-6 md:px-12">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold text-blog-dark">
              Latest Stories
            </h2>
            <div className="h-1.5 w-24 bg-blue-600 mt-4"></div>
          </div>
          <p className="text-gray-500 font-medium">
            Menampilkan {posts.length} artikel terbaru
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-32 border-2 border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-400 text-xl italic">
              Belum ada artikel yang tersedia di API.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
