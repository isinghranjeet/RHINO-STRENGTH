import type { Enquiry, Member } from "@/lib/gym/types";

/** Simple account timeline for the member. */
export function MemberActivityTab({ member, myEnquiries }: { member: Member; myEnquiries: Enquiry[] }) {
  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-4">
      <h3 className="text-base font-bold text-white uppercase border-l-4 border-ember pl-2">ACCOUNT ACTIVITY</h3>
      <ul className="space-y-3 text-xs">
        {myEnquiries.map((e) => (
          <li key={e.id} className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 flex justify-between gap-4">
            <span className="text-zinc-300">Submitted {e.type}</span>
            <span className="text-zinc-500">{e.createdAt}</span>
          </li>
        ))}
        <li className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 flex justify-between gap-4">
          <span className="text-zinc-300">Joined Rhino Strength Gym</span>
          <span className="text-zinc-500">{member.joinedDate || "—"}</span>
        </li>
      </ul>
    </div>
  );
}
