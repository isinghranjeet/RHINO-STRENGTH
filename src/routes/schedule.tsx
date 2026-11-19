import { createFileRoute } from "@tanstack/react-router";

import { SchedulePage } from "@/components/pages/SchedulePage";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Weekly Class Schedule — RHINO STRENGTH GYM" },
      { name: "description", content: "Morning and evening coached sessions, Monday to Sunday." },
      { property: "og:title", content: "Weekly Class Schedule — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Morning and evening coached sessions, Monday to Sunday." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SchedulePage,
});
