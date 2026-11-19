import { useApp } from "@/context/AppContext";
import { useCmsActions } from "@/components/admin/useCmsActions";

/** Admin tab: Homepage CMS. */
export function HomepageCmsTab() {
  const { draftData } = useApp();
  const { updateDraftSection } = useCmsActions();
  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <h3 className="text-lg font-black text-gold uppercase">HOMEPAGE HERO & SECTIONS CMS EDITOR</h3>
      <p className="text-zinc-400">Edits are saved to CMS Draft. Click "PUBLISH DRAFT LIVE" when ready.</p>

      <div className="space-y-4">
        <div>
          <label className="block font-bold text-zinc-300 mb-1">Hero Main Heading</label>
          <input
            type="text"
            value={draftData.homepage.heroHeading}
            onChange={(e) => updateDraftSection('homepage', 'heroHeading', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:outline-none focus:border-gold"
          />
        </div>

        <div>
          <label className="block font-bold text-zinc-300 mb-1">Hero Subtitle Text</label>
          <textarea
            rows={3}
            value={draftData.homepage.heroSubtitle}
            onChange={(e) => updateDraftSection('homepage', 'heroSubtitle', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:outline-none focus:border-gold"
          />
        </div>

        <div>
          <label className="block font-bold text-zinc-300 mb-1">Hero Backdrop Image URL</label>
          <input
            type="text"
            value={draftData.homepage.heroImage}
            onChange={(e) => updateDraftSection('homepage', 'heroImage', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:outline-none focus:border-gold"
          />
        </div>

        <div>
          <label className="block font-bold text-zinc-300 mb-1">Brand Manifesto Text Banner</label>
          <input
            type="text"
            value={draftData.homepage.manifestoText}
            onChange={(e) => updateDraftSection('homepage', 'manifestoText', e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:outline-none focus:border-gold"
          />
        </div>
      </div>
    </div>
  );
}
