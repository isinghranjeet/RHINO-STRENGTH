import { X } from "lucide-react";
import { useApp } from "@/context/AppContext";

/** Pick an image from the media library for a form. */
export function MediaPickerModal({ target, onClose, onSelect }: { target: string | null; onClose: () => void; onSelect: (url: string) => void }) {
  const { mediaLibrary } = useApp();
  if (!target) return null;
  return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-card border border-zinc-800 rounded-xl max-w-3xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <h3 className="text-base font-black text-gold uppercase">SELECT IMAGE FROM MEDIA LIBRARY</h3>
              <p className="text-xs text-zinc-400">Click any image below to attach it to your {target}.</p>
            </div>
            <button onClick={() => onClose()} className="text-zinc-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {mediaLibrary.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.url)}
                className="bg-zinc-900 border border-zinc-800 hover:border-gold rounded-lg overflow-hidden text-left transition-all group"
              >
                <img src={item.url} alt={item.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />
                <div className="p-2">
                  <div className="text-[10px] text-gold font-bold uppercase">{item.category}</div>
                  <div className="text-xs font-bold text-white truncate">{item.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
  );
}
