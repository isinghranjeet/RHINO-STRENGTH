import { X } from "lucide-react";
import { useGo } from "@/hooks/use-go";
import type { Trainer } from "@/lib/gym/types";

/** Pop-up with a coach's bio and qualifications. */
export function TrainerDetailsModal({ trainer, onClose }: { trainer: Trainer; onClose: () => void }) {
  const navigate = useGo();
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-zinc-800 rounded-xl max-w-lg w-full p-6 space-y-4 relative">
        <button onClick={() => onClose()} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4">
          <img src={trainer.image} alt={trainer.name} className="w-20 h-20 rounded-full object-cover border border-gold" />
          <div>
            <h3 className="text-xl font-bold text-white uppercase">{trainer.name}</h3>
            <p className="text-xs text-gold font-bold">{trainer.designation}</p>
            <p className="text-[11px] text-zinc-400">{trainer.experience}</p>
          </div>
        </div>
        <div className="space-y-2 text-xs text-zinc-300">
          <h4 className="font-bold text-white uppercase">Biography & Background:</h4>
          <p className="text-zinc-400 leading-relaxed">{trainer.bio}</p>
        </div>
        {trainer.qualifications && (
          <div className="space-y-2 text-xs text-zinc-300">
            <h4 className="font-bold text-gold uppercase">Certifications & Qualifications:</h4>
            <ul className="list-disc list-inside text-zinc-400 space-y-1">
              {trainer.qualifications.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </div>
        )}
        <button
          onClick={() => { onClose(); navigate('/contact'); }}
          className="w-full bg-gold text-black font-extrabold py-3 rounded text-xs uppercase tracking-wider"
        >
          BOOK 1-ON-1 COACHING ENQUIRY
        </button>
      </div>
    </div>
  );
}
