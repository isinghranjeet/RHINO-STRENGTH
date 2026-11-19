import { useApp } from "@/context/AppContext";

/** Admin tab: Membership CMS. */
export function MembershipCmsTab() {
  const { draftData, setDraftData } = useApp();
  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <h3 className="text-lg font-black text-gold uppercase">MEMBERSHIP PLANS & PRICING CMS</h3>
      <div className="space-y-4">
        {draftData.memberships.map((m, idx) => (
          <div key={m.id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-3">
            <div className="font-bold text-white uppercase">{m.name}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 mb-1">Display Price text</label>
                <input
                  type="text"
                  value={m.price}
                  onChange={(e) => {
                    const updated = [...draftData.memberships];
                    updated[idx] = { ...m, price: e.target.value };
                    setDraftData(prev => ({ ...prev, memberships: updated }));
                  }}
                  className="w-full bg-black border border-zinc-800 p-2 rounded text-white"
                />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">Duration text</label>
                <input
                  type="text"
                  value={m.duration}
                  onChange={(e) => {
                    const updated = [...draftData.memberships];
                    updated[idx] = { ...m, duration: e.target.value };
                    setDraftData(prev => ({ ...prev, memberships: updated }));
                  }}
                  className="w-full bg-black border border-zinc-800 p-2 rounded text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
