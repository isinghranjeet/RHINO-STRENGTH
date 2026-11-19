import { createFileRoute } from "@tanstack/react-router";

import { AuthPage } from "@/components/member/AuthPage";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Join — RHINO STRENGTH GYM" },
      { name: "description", content: "Create your Rhino Strength Gym member account." },
      { property: "og:title", content: "Join — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Create your Rhino Strength Gym member account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <AuthPage isRegister />,
});
