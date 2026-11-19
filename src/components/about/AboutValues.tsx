import type { AboutCms } from "@/lib/gym/types";

/** Mission, vision and philosophy cards. */
export function AboutValues({ about }: { about: AboutCms }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-3">
        <div className="w-10 h-10 rounded bg-gold/10 text-gold flex items-center justify-center font-bold">01</div>
        <h3 className="text-lg font-bold text-white uppercase">OUR MISSION</h3>
        <p className="text-zinc-400 text-xs leading-relaxed">{about.mission}</p>
      </div>

      <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-3">
        <div className="w-10 h-10 rounded bg-ember/10 text-ember flex items-center justify-center font-bold">02</div>
        <h3 className="text-lg font-bold text-white uppercase">OUR VISION</h3>
        <p className="text-zinc-400 text-xs leading-relaxed">{about.vision}</p>
      </div>

      <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-3">
        <div className="w-10 h-10 rounded bg-white/10 text-white flex items-center justify-center font-bold">03</div>
        <h3 className="text-lg font-bold text-white uppercase">TRAINING PHILOSOPHY</h3>
        <p className="text-zinc-400 text-xs leading-relaxed">{about.philosophy}</p>
      </div>
    </div>
  );
}
