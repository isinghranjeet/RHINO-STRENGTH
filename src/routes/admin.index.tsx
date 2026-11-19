import { createFileRoute } from "@tanstack/react-router";

import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin CMS — RHINO STRENGTH GYM" },
      { name: "description", content: "Manage website content, enquiries and media for Rhino Strength Gym." },
      { property: "og:title", content: "Admin CMS — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Manage website content, enquiries and media for Rhino Strength Gym." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});
