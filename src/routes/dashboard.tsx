import { createFileRoute } from "@tanstack/react-router";

import { MemberDashboard } from "@/components/member/MemberDashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Member Dashboard — RHINO STRENGTH GYM" },
      { name: "description", content: "Your membership, enquiries and account activity." },
      { property: "og:title", content: "Member Dashboard — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Your membership, enquiries and account activity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MemberDashboard,
});
