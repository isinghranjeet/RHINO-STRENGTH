import { Plus, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

/** Admin tab: Programs CMS. */
export function ProgramsCmsTab() {
  const { draftData, setDraftData, showToast } = useApp();
  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-gold uppercase">PROGRAMS MANAGER (CRUD)</h3>
        <button
          onClick={() => {
            const newP = {
              id: 'prog-' + Date.now(),
              title: 'New Strength Program',
              category: 'Strength',
              shortDesc: 'Program description preview text...',
              published: true,
              image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
            };
            setDraftData(prev => ({ ...prev, programs: [newP, ...prev.programs] }));
            showToast('New draft program added.');
          }}
          className="bg-gold text-black font-extrabold px-3 py-1.5 rounded flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> ADD PROGRAM
        </button>
      </div>

      <div className="space-y-4">
        {draftData.programs.map((p, idx) => (
          <div key={p.id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white uppercase">{p.title}</span>
              <button
                onClick={() => {
                  setDraftData(prev => ({ ...prev, programs: prev.programs.filter(item => item.id !== p.id) }));
                  showToast('Program removed from draft.');
                }}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={p.title}
                onChange={(e) => {
                  const updated = [...draftData.programs];
                  updated[idx] = { ...p, title: e.target.value };
                  setDraftData(prev => ({ ...prev, programs: updated }));
                }}
                className="bg-black border border-zinc-800 p-2 rounded text-white"
                placeholder="Title"
              />
              <input
                type="text"
                value={p.category}
                onChange={(e) => {
                  const updated = [...draftData.programs];
                  updated[idx] = { ...p, category: e.target.value };
                  setDraftData(prev => ({ ...prev, programs: updated }));
                }}
                className="bg-black border border-zinc-800 p-2 rounded text-white"
                placeholder="Category"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
