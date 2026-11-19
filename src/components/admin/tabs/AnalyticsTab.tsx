import { useApp } from "@/context/AppContext";

/** Admin tab: Analytics. */
export function AnalyticsTab() {
  const { analytics } = useApp();
  return (
    <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-6 text-xs">
      <h3 className="text-lg font-black text-gold uppercase">LOCAL WEBSITE ANALYTICS</h3>
      <p className="text-zinc-400">Recorded using safe local browser tracking (same-device storage disclaimer).</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-2">
          <span className="text-zinc-400 font-bold block">Page Visit Breakdown by Route:</span>
          <ul className="space-y-1 text-zinc-300">
            {Object.entries(analytics.routeHits || {}).map(([r, count]) => (
              <li key={r} className="flex justify-between border-b border-zinc-800/50 py-1">
                <span>{r}</span>
                <span className="font-mono text-gold">{count} visits</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-2">
          <span className="text-zinc-400 font-bold block">Visitor Demographics:</span>
          <div>Unique Browser IDs: <span className="font-mono text-white">{analytics.uniqueVisitors.length}</span></div>
          <div>Total Lifetime Views: <span className="font-mono text-gold">{analytics.pageViews}</span></div>
        </div>
      </div>
    </div>
  );
}
