import { X } from "lucide-react";
import { useGo } from "@/hooks/use-go";
import type { Program } from "@/lib/gym/types";

/** Pop-up with the full details of one program. */
export function ProgramDetailsModal({ program, onClose }: { program: Program; onClose: () => void }) {
  const navigate = useGo();
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card border border-zinc-800 rounded-xl max-w-2xl w-full p-6 space-y-6 relative my-8">
        <button onClick={() => onClose()} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <div className="space-y-2">
          <span className="text-xs font-extrabold text-gold uppercase tracking-wider">{program.category} CURRICULUM</span>
          <h2 className="text-3xl font-black text-white uppercase">{program.title}</h2>
        </div>
        <img src={program.image} alt={program.title} className="w-full h-56 object-cover rounded-lg border border-zinc-800" />
        <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
          <p className="text-sm text-zinc-200">{program.fullDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-900 p-4 rounded-lg border border-zinc-800">
            <div>
              <span className="text-white font-bold block mb-1 uppercase">Purpose:</span>
              <span className="text-zinc-400">{program.purpose}</span>
            </div>
            <div>
              <span className="text-white font-bold block mb-1 uppercase">Who It Suits:</span>
              <span className="text-zinc-400">{program.whoItSuits}</span>
            </div>
          </div>
          {program.benefits && (
            <div>
              <span className="text-gold font-bold block mb-1 uppercase">Key Program Benefits:</span>
              <ul className="list-disc list-inside space-y-1 text-zinc-400">
                {program.benefits.map((b, idx) => <li key={idx}>{b}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div className="pt-4 flex gap-3 border-t border-zinc-800">
          <button
            onClick={() => { onClose(); navigate('/membership'); }}
            className="flex-1 bg-gold hover:bg-gold-deep text-black font-extrabold py-3 rounded text-xs uppercase tracking-wider"
          >
            ENQUIRE ABOUT THIS PROGRAM
          </button>
        </div>
      </div>
    </div>
  );
}
