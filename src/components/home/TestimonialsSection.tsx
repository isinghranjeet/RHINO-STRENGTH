import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/gym/types";

/** Member testimonial cards. */
export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="text-xs font-bold text-ember tracking-widest uppercase">MEMBER EXPERIENCES</div>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase">COMMUNITY TESTIMONIALS</h2>
        <p className="text-xs text-zinc-500 font-mono">* Verified demo experience stories from early Rhino lifters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-card p-6 rounded-xl border border-zinc-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-gold gap-1">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold" />)}
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed">"{t.text}"</p>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-zinc-800/80">
              <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-zinc-700" />
              <div>
                <div className="text-sm font-bold text-white uppercase">{t.name}</div>
                <div className="text-[11px] text-gold">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
