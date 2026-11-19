import { createFileRoute } from "@tanstack/react-router";

import { FAQPage } from "@/components/pages/FAQPage";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — RHINO STRENGTH GYM" },
      { name: "description", content: "Answers about membership, beginners, training, facilities and schedules." },
      { property: "og:title", content: "FAQ — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Answers about membership, beginners, training, facilities and schedules." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FAQPage,
});
