import type { AboutCms } from "@/lib/gym/types";

/** What makes the Rhino experience different. */
export function AboutPillars({ about }: { about: AboutCms }) {
  return (
    <div className="bg-card p-8 rounded-xl border border-zinc-800 space-y-6">
      <h3 className="text-2xl font-black text-white uppercase border-l-4 border-gold pl-3">
        WHAT MAKES THE RHINO EXPERIENCE DIFFERENT
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="space-y-2">
          <h4 className="font-bold text-gold uppercase">1. Serious Lifting Equipment</h4>
          <p className="text-zinc-400 text-xs">Calibrated plates, heavy power racks, specialized bars, and smooth commercial cables built to handle high volume.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-gold uppercase">2. Knowledgeable Coaching</h4>
          <p className="text-zinc-400 text-xs">Certified trainers who focus on safe biomechanics, lifting technique, and structured progression.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-gold uppercase">3. Community & Culture</h4>
          <p className="text-zinc-400 text-xs">A friendly, ego-free atmosphere where members encourage each other to stay consistent.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-gold uppercase">4. Transparent Communication</h4>
          <p className="text-zinc-400 text-xs">No hidden tricks or fake claims. Honest fitness coaching tailored for real human lives.</p>
        </div>
      </div>
    </div>
  );
}
