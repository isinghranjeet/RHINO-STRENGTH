import { useApp } from "@/context/AppContext";

/** Title bar above each admin tab. */
export function AdminHeader({ activeTab }: { activeTab: string }) {
  const { publishDraftToPublic } = useApp();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border border-zinc-800">
      <div>
        <h1 className="text-xl font-extrabold text-white uppercase">{activeTab}</h1>
        <p className="text-xs text-zinc-400">RHINO Strength Gym CMS & Data Management Portal</p>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={publishDraftToPublic}
          className="bg-gold hover:bg-gold-deep text-black font-extrabold px-3 py-1.5 rounded text-[11px] uppercase tracking-wider"
        >
          Sync & Publish All
        </button>
        <span className="text-[10px] bg-green-500/10 border border-green-500/30 text-green-400 px-2.5 py-1 rounded font-mono">
          CMS Sync Active
        </span>
      </div>
    </div>
  );
}
