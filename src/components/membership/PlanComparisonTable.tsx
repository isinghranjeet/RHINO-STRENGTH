import { Check } from "lucide-react";

/** Feature comparison across plans. */
export function PlanComparisonTable() {
  return (
    <div className="bg-card rounded-xl border border-zinc-800 p-6 space-y-4 overflow-x-auto">
      <h3 className="text-xl font-black text-white uppercase">PLAN COMPARISON AT A GLANCE</h3>
      <table className="w-full text-left text-xs text-zinc-300 min-w-[600px]">
        <thead>
          <tr className="border-b border-zinc-800 text-white uppercase">
            <th className="py-3">Feature</th>
            <th className="py-3">Monthly</th>
            <th className="py-3">Quarterly</th>
            <th className="py-3">Half-Yearly</th>
            <th className="py-3">Annual VIP</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60">
          <tr>
            <td className="py-3 font-semibold text-white">Full Gym Floor Access</td>
            <td><Check className="w-4 h-4 text-green-500" /></td>
            <td><Check className="w-4 h-4 text-green-500" /></td>
            <td><Check className="w-4 h-4 text-green-500" /></td>
            <td><Check className="w-4 h-4 text-green-500" /></td>
          </tr>
          <tr>
            <td className="py-3 font-semibold text-white">Locker & Hydration access</td>
            <td><Check className="w-4 h-4 text-green-500" /></td>
            <td><Check className="w-4 h-4 text-green-500" /></td>
            <td><Check className="w-4 h-4 text-green-500" /></td>
            <td><Check className="w-4 h-4 text-green-500" /></td>
          </tr>
          <tr>
            <td className="py-3 font-semibold text-white">Free PT Sessions</td>
            <td className="text-zinc-500">-</td>
            <td>1 Session</td>
            <td>2 Sessions</td>
            <td className="font-bold text-gold">4 Sessions</td>
          </tr>
          <tr>
            <td className="py-3 font-semibold text-white">Rhino Official T-Shirt</td>
            <td className="text-zinc-500">-</td>
            <td className="text-zinc-500">-</td>
            <td className="text-zinc-500">-</td>
            <td><Check className="w-4 h-4 text-gold" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
