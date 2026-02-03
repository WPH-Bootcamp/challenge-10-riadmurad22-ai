import { fetchAPI } from "@/lib/api";
import { BlogResponse } from "@/types/blog";

/**
 * Mengambil daftar artikel blog.
 * Kita langsung arahkan ke Mock Data agar tidak muncul error 404 di browser.
 */
export async function getBlogPosts(): Promise<BlogResponse> {
  try {
    // Kita berikan komentar pada fetchAPI agar tidak memicu error merah di browser
    // return await fetchAPI<BlogResponse>("/blog");

    // Langsung lempar ke error agar catch (mock data) dijalankan tanpa mencoba fetch
    throw new Error("Mode Offline/Mock Data");
  } catch (error) {
    // console.warn ini yang memicu peringatan di konsol, biarkan saja untuk log internal
    console.warn("Menggunakan mock data...");

    return {
      data: [
        {
          id: 1,
          title: "Exploring the Future of Web Development",
          content:
            "Artificial Intelligence is changing the way we write code and build applications. In this article, we dive deep into the new tools...",
          category: "Technology",
          image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800",
          createdAt: "2026-02-01T10:00:00Z",
          updatedAt: "2026-02-01T10:00:00Z",
          authorId: 1,
          author: {
            id: 1,
            username: "John Doe",
            email: "john@example.com",
          },
        },
        {
          id: 2,
          title: "Mastering Design Systems with Figma",
          content:
            "Consistency is key in UI/UX design. Learn how to build a scalable design system that your development team will love to use...",
          category: "Design",
          image:
            "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800",
          createdAt: "2026-01-28T14:30:00Z",
          updatedAt: "2026-01-28T14:30:00Z",
          authorId: 2,
          author: {
            id: 2,
            username: "Jane Smith",
            email: "jane@example.com",
          },
        },
        {
          id: 3,
          title: "Why Next.js is the Best Choice for Startups",
          content:
            "Speed, SEO, and developer experience are the pillars of a successful digital product. Discover why most startups choose Next.js...",
          category: "Development",
          image:
            "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=800",
          createdAt: "2026-01-25T09:00:00Z",
          updatedAt: "2026-01-25T09:00:00Z",
          authorId: 3,
          author: {
            id: 3,
            username: "Alex Dev",
            email: "alex@example.com",
          },
        },
      ],
      meta: { total: 3, page: 1, limit: 10, totalPages: 1 },
    };
  }
}

/**
 * Mengambil detail satu artikel berdasarkan ID
 */
export async function getBlogPostById(id: string) {
  try {
    // Kita matikan juga di sini agar halaman detail tidak memunculkan error API 404
    // return await fetchAPI(`/blog/${id}`);

    const response = await getBlogPosts();
    const post = response.data.find((item) => item.id.toString() === id);
    return { data: post };
  } catch (error) {
    console.error(`Gagal mengambil post dengan id ${id}:`, error);
    throw error;
  }
}
