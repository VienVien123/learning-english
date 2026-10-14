import type { MetadataRoute } from "next";

// Lets browsers install TV-English as an app (home screen / desktop).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TV-English — Learn English vocabulary",
    short_name: "TV-English",
    description: "Học từ vựng tiếng Anh cùng các bé bồ hóng: học từ mới, flashcard, game và lịch ôn tập.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#eef4ff",
    theme_color: "#5b8ed8",
    lang: "vi",
    categories: ["education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
