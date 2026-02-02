import { fetchAPI } from "@/lib/api";
import { BlogResponse } from "@/types/blog";

/**
 * Mengambil daftar artikel blog dari API.
 * Disertai fallback data (mock data) jika API belum terhubung/error.
 */
export async function getBlogPosts(): Promise<BlogResponse> {
  try {
    // Mencoba mengambil data dari endpoint /blog sesuai Swagger
    return await fetchAPI<BlogResponse>("/blog");
  } catch (error) {
    console.warn("API Error, menggunakan mock data:", error);

    // Data contoh yang sudah dilengkapi agar tidak error TypeScript
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
          author: {
            id: 1,
            username: "John Doe",
            email: "john@example.com", // Menambahkan email agar error ts(2739) hilang
          },
        },
        {
          id: 2,
          title: "Mastering Design Systems with Figma",
          content:
            "Consistency is key in UI/UX design. Learn how to build a scalable design system that your development team will love to use...",
          category: "Design",
          image:
            "https://images.unsplash.com/photo-1541461984930-9f17002d0225?q=80&w=800",
          createdAt: "2026-01-28T14:30:00Z",
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
    return await fetchAPI(`/blog/${id}`);
  } catch (error) {
    console.error(`Gagal mengambil post dengan id ${id}:`, error);
    throw error;
  }
}
