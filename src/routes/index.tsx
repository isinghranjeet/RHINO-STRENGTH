import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/components/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RHINO STRENGTH GYM — Lakhimpur Strength & Conditioning" },
      { name: "description", content: "Lakhimpur's premier strength gym on KB Road: heavy lifting, coaching, programs and memberships." },
      { property: "og:title", content: "RHINO STRENGTH GYM — Lakhimpur Strength & Conditioning" },
      { property: "og:description", content: "Lakhimpur's premier strength gym on KB Road: heavy lifting, coaching, programs and memberships." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});
