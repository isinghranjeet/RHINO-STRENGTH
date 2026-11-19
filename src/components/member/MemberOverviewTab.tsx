import type { Member } from "@/lib/gym/types";

/** Member profile and membership summary. */
export function MemberOverviewTab({ member }: { member: Member }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-4">
        <h3 className="text-base font-bold text-white uppercase border-l-4 border-gold pl-2">
          PROFILE SUMMARY
        </h3>
        <div className="space-y-2 text-xs text-zinc-300">
          <div><span className="text-zinc-500">Name:</span> {member.name}</div>
          <div><span className="text-zinc-500">Email:</span> {member.email}</div>
          <div><span className="text-zinc-500">Fitness Target:</span> {member.goal || 'Strength & Conditioning'}</div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-4">
        <h3 className="text-base font-bold text-white uppercase border-l-4 border-ember pl-2">
          MEMBERSHIP STATUS
        </h3>
        <div className="text-xs text-zinc-300 space-y-2">
          <div>Current Tier: <span className="font-bold text-gold">{member.activePlan || 'Quarterly Commitment'}</span></div>
          <div className="text-zinc-500">Status: Active Member (Demo)</div>
        </div>
      </div>
    </div>
  );
}
