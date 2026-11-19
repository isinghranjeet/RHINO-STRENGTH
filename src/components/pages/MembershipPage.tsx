import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { PageBanner } from "@/components/layout/PageBanner";
import { MembershipPlanCard } from "@/components/membership/MembershipPlanCard";
import { PlanComparisonTable } from "@/components/membership/PlanComparisonTable";
import { MembershipEnquiryModal } from "@/components/membership/MembershipEnquiryModal";
import type { MembershipPlan } from "@/lib/gym/types";

export function MembershipPage() {
  const { publishedData, trackPageView } = useApp();
  const plans = publishedData.memberships.filter(m => m.published);
  const [selectedPlanForEnquiry, setSelectedPlanForEnquiry] = useState<MembershipPlan | null>(null);

  useEffect(() => trackPageView('/membership'), []);

  return (
    <div className="bg-background text-white min-h-screen">
      <PageBanner title="MEMBERSHIP PLANS" subtitle="YOUR NEXT CHAPTER STARTS HERE. Pick your duration commitment." breadcrumb="MEMBERSHIP" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <MembershipPlanCard key={plan.id} plan={plan} onEnquire={() => setSelectedPlanForEnquiry(plan)} />
          ))}
        </div>

        <PlanComparisonTable />
      </section>

      {selectedPlanForEnquiry && (
        <MembershipEnquiryModal plan={selectedPlanForEnquiry} onClose={() => setSelectedPlanForEnquiry(null)} />
      )}
    </div>
  );
}
