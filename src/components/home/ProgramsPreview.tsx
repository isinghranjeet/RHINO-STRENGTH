import { ChevronRight } from "lucide-react";
import { useGo } from "@/hooks/use-go";
import type { Program } from "@/lib/gym/types";

/** Grid preview of training programs. */
export function ProgramsPreview({ programs }: { programs: Program[] }) {
  const navigate = useGo();
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-gold tracking-widest uppercase">SPECIALIZED CURRICULUM</div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase">TRAINING PROGRAMS</h2>
        </div>
        <button
          onClick={() => navigate('/programs')}
          className="text-gold hover:underline text-sm font-bold uppercase tracking-wider flex items-center gap-1"
        >
          VIEW ALL 8 PROGRAMS <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map((prog) => (
          <div 
            key={prog.id} 
            onClick={() => navigate('/programs')}
            className="bg-card rounded-xl border border-zinc-800 overflow-hidden group hover:border-gold/50 transition-all cursor-pointer flex flex-col"
          >
            <div className="h-44 overflow-hidden relative">
              <img src={prog.image} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-3 left-3 bg-black/80 text-gold text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider border border-zinc-700">
                {prog.category}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white uppercase group-hover:text-gold transition-colors">{prog.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed mt-1 line-clamp-3">{prog.shortDesc}</p>
              </div>
              <div className="text-ember text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                Learn Details <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
