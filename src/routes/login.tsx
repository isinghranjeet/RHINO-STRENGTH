import { createFileRoute } from "@tanstack/react-router";

import { AuthPage } from "@/components/member/AuthPage";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Member Login — RHINO STRENGTH GYM" },
      { name: "description", content: "Sign in to your Rhino Strength Gym member dashboard." },
      { property: "og:title", content: "Member Login — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Sign in to your Rhino Strength Gym member dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <AuthPage isRegister={false} />,
});
