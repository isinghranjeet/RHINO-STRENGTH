import type { Facility } from "@/lib/gym/types";

/** Facilities and equipment highlight cards. */
export function FacilitiesShowcase({ facilities }: { facilities: Facility[] }) {
  return (
    <section className="bg-card py-20 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold text-gold tracking-widest uppercase">WORLD-CLASS INFRASTRUCTURE</div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase">FACILITIES & EQUIPMENT</h2>
          <p className="text-zinc-400 text-sm">Designed specifically for safety, biomechanics, and uninterrupted workouts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilities.map((fac) => (
            <div key={fac.id} className="bg-background rounded-xl border border-zinc-800 overflow-hidden space-y-3 p-4">
              <img src={fac.image} alt={fac.name} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-base font-bold text-white uppercase">{fac.name}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">{fac.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
