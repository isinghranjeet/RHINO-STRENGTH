import { createFileRoute } from "@tanstack/react-router";

import { FacilitiesPage } from "@/components/pages/FacilitiesPage";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities & Equipment — RHINO STRENGTH GYM" },
      { name: "description", content: "Power racks, lifting platforms, machine zone, cardio deck, turf and PT studio." },
      { property: "og:title", content: "Facilities & Equipment — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Power racks, lifting platforms, machine zone, cardio deck, turf and PT studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FacilitiesPage,
});
