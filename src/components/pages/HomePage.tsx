// Home page: assembled from the sections in src/components/home.
import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { HeroSection } from "@/components/home/HeroSection";
import { ManifestoBanner } from "@/components/home/ManifestoBanner";
import { AboutSnippet } from "@/components/home/AboutSnippet";
import { JourneySection } from "@/components/home/JourneySection";
import { ProgramsPreview } from "@/components/home/ProgramsPreview";
import { FacilitiesShowcase } from "@/components/home/FacilitiesShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LocationSection } from "@/components/home/LocationSection";
import { FinalCta } from "@/components/home/FinalCta";

export function HomePage() {
  const { publishedData, trackPageView } = useApp();
  const hp = publishedData.homepage;
  const programs = publishedData.programs.filter(p => p.published).slice(0, 8);
  const facilities = publishedData.facilities.filter(f => f.published).slice(0, 6);
  const trainers = publishedData.trainers.filter(t => t.published);
  const testimonials = publishedData.testimonials.filter(t => t.published);

  useEffect(() => trackPageView('/'), []);


  return (
    <div className="bg-background text-white min-h-screen">
      <HeroSection hp={hp} />
      <ManifestoBanner hp={hp} />
      <AboutSnippet hp={hp} />
      {hp.showJourneySection && <JourneySection hp={hp} />}
      <ProgramsPreview programs={programs} />
      {hp.showFacilitiesSection && <FacilitiesShowcase facilities={facilities} />}
      {hp.showTestimonialsSection && <TestimonialsSection testimonials={testimonials} />}
      <LocationSection />
      <FinalCta />
    </div>
  );
}
