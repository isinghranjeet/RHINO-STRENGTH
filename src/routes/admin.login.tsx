import { createFileRoute } from "@tanstack/react-router";

import { AdminLoginPage } from "@/components/admin/AdminLoginPage";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — RHINO STRENGTH GYM" },
      { name: "description", content: "Sign in to manage the Rhino Strength Gym website." },
      { property: "og:title", content: "Admin Login — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Sign in to manage the Rhino Strength Gym website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLoginPage,
});
