import { createFileRoute } from "@tanstack/react-router";

import { ProgramsPage } from "@/components/pages/ProgramsPage";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Training Programs — RHINO STRENGTH GYM" },
      { name: "description", content: "Strength, muscle building, cardio, fat loss, functional and personal training programs." },
      { property: "og:title", content: "Training Programs — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Strength, muscle building, cardio, fat loss, functional and personal training programs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramsPage,
});
