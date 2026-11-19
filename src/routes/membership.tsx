import { createFileRoute } from "@tanstack/react-router";

import { MembershipPage } from "@/components/pages/MembershipPage";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership Plans — RHINO STRENGTH GYM" },
      { name: "description", content: "Monthly, quarterly, half-yearly and annual plans. Request prices and details on WhatsApp." },
      { property: "og:title", content: "Membership Plans — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Monthly, quarterly, half-yearly and annual plans. Request prices and details on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MembershipPage,
});
