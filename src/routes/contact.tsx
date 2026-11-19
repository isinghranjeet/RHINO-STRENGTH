import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/pages/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location — RHINO STRENGTH GYM" },
      { name: "description", content: "Visit us on KB Road, Lakhimpur, call +91 93958 27174 or send an enquiry." },
      { property: "og:title", content: "Contact & Location — RHINO STRENGTH GYM" },
      { property: "og:description", content: "Visit us on KB Road, Lakhimpur, call +91 93958 27174 or send an enquiry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});
