import { Check } from "lucide-react";
import type { MembershipPlan } from "@/lib/gym/types";

/** One membership plan with its benefits. */
export function MembershipPlanCard({ plan, onEnquire }: { plan: MembershipPlan; onEnquire: () => void }) {
  return (
      <div 
        className={`bg-card rounded-xl border p-6 flex flex-col justify-between relative ${
          plan.recommended ? 'border-gold shadow-lg scale-105 z-10' : 'border-zinc-800'
        }`}
      >
        {plan.recommended && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
            MOST POPULAR
          </span>
        )}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white uppercase">{plan.name}</h3>
            <span className="text-xs text-zinc-400 font-medium">{plan.duration} Commitment</span>
          </div>

          <div className="py-2 border-y border-zinc-800">
            <span className="text-lg font-extrabold text-gold uppercase tracking-wide">
              {plan.price}
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-zinc-300">
            {plan.benefits.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6">
          <button
            onClick={() => onEnquire()}
            className={`w-full py-3 rounded font-extrabold text-xs uppercase tracking-wider transition-colors ${
              plan.recommended ? 'bg-gold hover:bg-gold-deep text-black' : 'bg-zinc-800 hover:bg-zinc-700 text-white'
            }`}
          >
            REQUEST PRICE & DETAILS
          </button>
        </div>
      </div>
  );
}
