import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { PageBanner } from "@/components/layout/PageBanner";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutPillars } from "@/components/about/AboutPillars";

export function AboutPage() {
  const { publishedData, trackPageView } = useApp();
  const ab = publishedData.about;

  useEffect(() => trackPageView('/about'), []);

  return (
    <div className="bg-background text-white min-h-screen">
      <PageBanner title="ABOUT RHINO STRENGTH" subtitle={ab.headline} breadcrumb="ABOUT" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <AboutStory about={ab} />
        <AboutValues about={ab} />
        <AboutPillars about={ab} />
      </section>
    </div>
  );
}
