import type { HomepageCms } from "@/lib/gym/types";

/** Three-step "your journey starts with a plan" cards. */
export function JourneySection({ hp }: { hp: HomepageCms }) {
  return (
    <section className="bg-card py-20 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-ember tracking-widest uppercase">STRATEGIC APPROACH</div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase">{hp.journeyTitle}</h2>
          <p className="text-zinc-400 text-sm">
            Sustainable physical evolution requires a structured plan, not random efforts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Define Specific Goals', text: 'Whether your target is absolute strength, muscle mass gain, or fat conditioning, identify your focal metrics.' },
            { step: '02', title: 'Pick Program & Approach', text: 'Match your current lifestyle with a periodized training blueprint tailored for long-term consistency.' },
            { step: '03', title: 'Track & Adapt Progress', text: 'Document workload increases, body re-composition progress, and joint health regularly with expert guidance.' }
          ].map((card, idx) => (
            <div key={idx} className="bg-background p-6 rounded-xl border border-zinc-800 space-y-3 relative">
              <div className="text-4xl font-black text-gold/40">{card.step}</div>
              <h3 className="text-lg font-bold text-white uppercase">{card.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
