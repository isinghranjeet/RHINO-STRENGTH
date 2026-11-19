import { createFileRoute } from "@tanstack/react-router";

import { AboutPage } from "@/components/pages/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — RHINO STRENGTH GYM Lakhimpur" },
      { name: "description", content: "Our mission, vision and training philosophy at Rhino Strength Gym, Lakhimpur, Assam." },
      { property: "og:title", content: "About Us — RHINO STRENGTH GYM Lakhimpur" },
      { property: "og:description", content: "Our mission, vision and training philosophy at Rhino Strength Gym, Lakhimpur, Assam." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});
