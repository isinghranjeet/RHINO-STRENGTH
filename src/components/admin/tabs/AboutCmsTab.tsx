import { useApp } from "@/context/AppContext";
import { useCmsActions } from "@/components/admin/useCmsActions";

/** Admin tab: About CMS. */
export function AboutCmsTab() {
  const { draftData } = useApp();
  const { updateDraftSection } = useCmsActions();
  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-4 text-xs">
      <h3 className="text-lg font-black text-gold uppercase">ABOUT PAGE CONTENT CMS</h3>

      <div>
        <label className="block font-bold text-zinc-300 mb-1">About Main Headline</label>
        <input
          type="text"
          value={draftData.about.headline}
          onChange={(e) => updateDraftSection('about', 'headline', e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:outline-none focus:border-gold"
        />
      </div>

      <div>
        <label className="block font-bold text-zinc-300 mb-1">Rhino Mission Statement</label>
        <textarea
          rows={3}
          value={draftData.about.mission}
          onChange={(e) => updateDraftSection('about', 'mission', e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:outline-none focus:border-gold"
        />
      </div>

      <div>
        <label className="block font-bold text-zinc-300 mb-1">Rhino Vision Statement</label>
        <textarea
          rows={3}
          value={draftData.about.vision}
          onChange={(e) => updateDraftSection('about', 'vision', e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:outline-none focus:border-gold"
        />
      </div>
    </div>
  );
}
