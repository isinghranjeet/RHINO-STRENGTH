import type { Program } from "@/lib/gym/types";

/** One program in the programs grid. */
export function ProgramCard({ prog, onOpen }: { prog: Program; onOpen: () => void }) {
  return (
      <div className="bg-card rounded-xl border border-zinc-800 overflow-hidden flex flex-col justify-between">
        <div>
          <img src={prog.image} alt={prog.title} className="w-full h-48 object-cover" />
          <div className="p-6 space-y-3">
            <span className="text-[10px] font-extrabold uppercase bg-gold/10 text-gold px-2.5 py-1 rounded border border-gold/20">
              {prog.category}
            </span>
            <h3 className="text-xl font-bold text-white uppercase">{prog.title}</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">{prog.shortDesc}</p>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button
            onClick={() => onOpen()}
            className="w-full bg-zinc-800 hover:bg-gold text-white hover:text-black font-bold py-2.5 rounded text-xs uppercase tracking-wider transition-colors"
          >
            VIEW FULL PROGRAM DETAILS
          </button>
        </div>
      </div>
  );
}
