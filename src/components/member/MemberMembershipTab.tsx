import { Check } from "lucide-react";

import { useApp } from "@/context/AppContext";
import { useGo } from "@/hooks/use-go";
import type { Member } from "@/lib/gym/types";

/** The member's current plan and what it includes. */
export function MemberMembershipTab({ member }: { member: Member }) {
  const navigate = useGo();
  const { publishedData } = useApp();
  const planName = member.activePlan || "None";
  const plan = publishedData.memberships.find((m) => m.name === planName);

  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-4">
      <h3 className="text-base font-bold text-white uppercase border-l-4 border-gold pl-2">MY MEMBERSHIP</h3>
      {plan ? (
        <div className="space-y-3 text-xs text-zinc-300">
          <div>
            Current Tier: <span className="font-bold text-gold">{plan.name}</span>{" "}
            <span className="text-zinc-500">({plan.duration})</span>
          </div>
          <ul className="space-y-2">
            {plan.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="space-y-3 text-xs text-zinc-400">
          <p>You don't have an active membership plan yet.</p>
          <button
            onClick={() => navigate("/membership")}
            className="bg-gold hover:bg-gold-deep text-black font-extrabold px-4 py-2 rounded uppercase tracking-wider"
          >
            View Membership Plans
          </button>
        </div>
      )}
    </div>
  );
}
