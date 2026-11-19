import type { Enquiry } from "@/lib/gym/types";

/** Enquiries this member has submitted. */
export function MemberEnquiriesTab({ myEnquiries }: { myEnquiries: Enquiry[] }) {
  return (
      <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-4">
        <h3 className="text-base font-bold text-white uppercase">MY SUBMITTED ENQUIRIES</h3>
        <div className="space-y-3">
          {myEnquiries.length > 0 ? (
            myEnquiries.map(e => (
              <div key={e.id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 text-xs space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>{e.type} ({e.planName})</span>
                  <span className="text-gold">{e.status}</span>
                </div>
                <p className="text-zinc-400">{e.message}</p>
                <div className="text-[10px] text-zinc-500">{e.createdAt}</div>
              </div>
            ))
          ) : (
            <p className="text-xs text-zinc-500">No enquiries submitted under this account yet.</p>
          )}
        </div>
      </div>
  );
}
