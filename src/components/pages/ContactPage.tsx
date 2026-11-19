import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { PageBanner } from "@/components/layout/PageBanner";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactPage() {
  const { publishedData, trackPageView } = useApp();
  const info = publishedData.contactInfo;

  useEffect(() => trackPageView('/contact'), []);

  return (
    <div className="bg-background text-white min-h-screen">
      <PageBanner title="CONTACT & LOCATION" subtitle="Visit us on KB Road, Lakhimpur or send a direct enquiry message." breadcrumb="CONTACT" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactDetails info={info} />
        <ContactForm />
      </section>
    </div>
  );
}
