import { ArrowRight, Sparkles } from "lucide-react";
import { useGo } from "@/hooks/use-go";
import type { HomepageCms } from "@/lib/gym/types";

/** Full-height hero with headline and main calls to action. */
export function HeroSection({ hp }: { hp: HomepageCms }) {
  const navigate = useGo();
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-zinc-800">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('${hp.heroImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 py-20">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-3 py-1 rounded-full text-xs font-extrabold text-gold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" /> LAKHIMPUR ASSAM
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-none text-white drop-shadow-lg">
          {hp.heroHeading}
        </h1>

        <p className="text-zinc-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
          {hp.heroSubtitle}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/membership')}
            className="w-full sm:w-auto bg-gold hover:bg-gold-deep text-black font-extrabold px-8 py-4 rounded-md text-sm tracking-wider uppercase transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            {hp.ctaPrimaryText} <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/programs')}
            className="w-full sm:w-auto bg-graphite hover:bg-zinc-800 text-white font-extrabold px-8 py-4 rounded-md text-sm tracking-wider uppercase border border-zinc-700 transition-colors"
          >
            {hp.ctaSecondaryText}
          </button>
        </div>
      </div>
    </section>
  );
}
