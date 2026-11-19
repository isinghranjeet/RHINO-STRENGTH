import { createFileRoute } from "@tanstack/react-router";

import { TrainersPage } from "@/components/pages/TrainersPage";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Coaches & Trainers — RHINO STRENGTH GYM" },
      { name: "description", content: "Meet our certified strength, hypertrophy and conditioning coaches." },
      { property: "og:title", content: "Coaches & Trainers — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Meet our certified strength, hypertrophy and conditioning coaches." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrainersPage,
});
