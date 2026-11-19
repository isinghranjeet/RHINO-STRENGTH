import { createFileRoute } from "@tanstack/react-router";

import { GalleryPage } from "@/components/pages/GalleryPage";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — RHINO STRENGTH GYM" },
      { name: "description", content: "Photos of our training floor, equipment and lifting environment." },
      { property: "og:title", content: "Gallery — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Photos of our training floor, equipment and lifting environment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});
