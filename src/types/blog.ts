/**
 * Blog Types
 *
 * TODO: Define types sesuai dengan response dari API
 * Contoh structure (sesuaikan dengan API response yang sebenarnya):
 */

// export interface BlogPost {
//   id: string;
//   title: string;
//   content: string;
//   author: string;
//   createdAt: string;
//   image?: string;
//   category?: string;
//   // ... tambahkan fields lainnya sesuai API
// }

// export interface BlogPostListResponse {
//   posts: BlogPost[];
//   total: number;
//   page: number;
//   // ... tambahkan fields lainnya
// }

/**
 * Blog Types
 * Berdasarkan eksplorasi API dan kebutuhan design Figma
 */

export interface Author {
  id: number;
  username: string;
  email: string;
  avatar?: string; // Sesuai design Figma yang ada foto profil
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  description?: string; // TAMBAHKAN BARIS INI
  createdAt: string;
  updatedAt: string;
  authorId: number;
  author: Author; // Relasi ke data penulis
}

// Interface untuk response list (Pagination)
export interface BlogResponse {
  data: BlogPost[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Interface untuk detail artikel tunggal
export interface BlogDetailResponse {
  data: BlogPost;
}
