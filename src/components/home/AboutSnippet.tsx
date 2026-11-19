import { ChevronRight } from "lucide-react";
import { useGo } from "@/hooks/use-go";
import type { HomepageCms } from "@/lib/gym/types";

/** Short introduction to the gym with key stats. */
export function AboutSnippet({ hp }: { hp: HomepageCms }) {
  const navigate = useGo();
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="text-xs font-bold text-gold tracking-widest uppercase">ABOUT RHINO STRENGTH</div>
        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase leading-tight">
          {hp.aboutHeadline}
        </h2>
        <p className="text-zinc-300 leading-relaxed text-base">
          {hp.aboutBody}
        </p>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-card p-4 rounded-lg border border-zinc-800">
            <div className="text-gold font-black text-2xl">50+</div>
            <div className="text-xs text-zinc-400 font-medium">Commercial Heavy Machines</div>
          </div>
          <div className="bg-card p-4 rounded-lg border border-zinc-800">
            <div className="text-ember font-black text-2xl">100%</div>
            <div className="text-xs text-zinc-400 font-medium">Certified Strength Coaching</div>
          </div>
        </div>
        <button
          onClick={() => navigate('/about')}
          className="inline-flex items-center gap-2 text-gold hover:text-white font-bold text-sm uppercase tracking-wider transition-colors pt-2"
        >
          Read Our Full Philosophy <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-zinc-800 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" 
          alt="Rhino Gym Interior" 
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-zinc-800 text-xs text-zinc-300">
          <span className="text-gold font-bold">Lakhimpur Center:</span> KB Road, 1st Floor PD Enterprise Building.
        </div>
      </div>
    </section>
  );
}
