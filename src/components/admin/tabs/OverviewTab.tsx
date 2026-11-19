import { useApp } from "@/context/AppContext";

/** Admin tab: Overview. */
export function OverviewTab({ onOpenEnquiries }: { onOpenEnquiries: () => void }) {
  const { publishedData, enquiries, mediaLibrary, analytics } = useApp();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-5 rounded-xl border border-zinc-800 space-y-2">
          <div className="text-xs text-zinc-400 font-bold uppercase">Total Page Views</div>
          <div className="text-3xl font-black text-gold">{analytics.pageViews}</div>
          <div className="text-[10px] text-zinc-500">Tracked locally in browser</div>
        </div>

        <div className="bg-card p-5 rounded-xl border border-zinc-800 space-y-2">
          <div className="text-xs text-zinc-400 font-bold uppercase">Recorded Enquiries</div>
          <div className="text-3xl font-black text-ember">{enquiries.length}</div>
          <div className="text-[10px] text-zinc-500">Pending & Contacted</div>
        </div>

        <div className="bg-card p-5 rounded-xl border border-zinc-800 space-y-2">
          <div className="text-xs text-zinc-400 font-bold uppercase">Active Programs</div>
          <div className="text-3xl font-black text-white">{publishedData.programs.length}</div>
          <div className="text-[10px] text-zinc-500">Published to website</div>
        </div>

        <div className="bg-card p-5 rounded-xl border border-zinc-800 space-y-2">
          <div className="text-xs text-zinc-400 font-bold uppercase">Media Library Items</div>
          <div className="text-3xl font-black text-white">{mediaLibrary.length}</div>
          <div className="text-[10px] text-zinc-500">Image URLs stored</div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-4">
        <h3 className="text-base font-bold text-white uppercase">RECENT CUSTOMER ENQUIRIES</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead>
              <tr className="border-b border-zinc-800 text-white uppercase">
                <th className="py-2.5">Name</th>
                <th className="py-2.5">Type</th>
                <th className="py-2.5">Phone</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {enquiries.slice(0, 5).map(e => (
                <tr key={e.id}>
                  <td className="py-3 font-semibold text-white">{e.name}</td>
                  <td className="py-3 text-zinc-400">{e.type}</td>
                  <td className="py-3 font-mono">{e.phone}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      e.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-green-500/10 text-green-400'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button onClick={() => onOpenEnquiries()} className="text-gold hover:underline">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
