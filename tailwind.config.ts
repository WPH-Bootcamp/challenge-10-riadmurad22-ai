import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Ini bagian penting untuk Design System Figma kamu
      fontSize: {
        "display-3xl": [
          "4.5rem",
          { lineHeight: "5.625rem", fontWeight: "700" },
        ],
        "display-2xl": ["3.75rem", { lineHeight: "4.5rem", fontWeight: "700" }],
        "display-xl": ["3rem", { lineHeight: "3.75rem", fontWeight: "700" }],
        "text-lg": ["1.125rem", { lineHeight: "1.75rem" }],
      },
      colors: {
        "blog-dark": "#1E1E1E", // Warna background 1E1E1E dari Figma kamu
      },
    },
  },
  plugins: [],
};
export default config;
