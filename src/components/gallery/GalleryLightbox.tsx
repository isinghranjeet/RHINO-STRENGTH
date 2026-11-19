import { X } from "lucide-react";
import type { GalleryItem } from "@/lib/gym/types";

/** Full-screen view of one gallery photo. */
export function GalleryLightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <button onClick={() => onClose()} className="absolute top-4 right-4 text-white hover:text-gold">
        <X className="w-8 h-8" />
      </button>
      <div className="max-w-4xl w-full space-y-3 text-center">
        <img src={item.image} alt={item.title} className="max-h-[75vh] mx-auto rounded-lg border border-zinc-800 object-contain" />
        <h3 className="text-xl font-bold text-white uppercase">{item.title}</h3>
        <p className="text-xs text-zinc-400">{item.caption}</p>
      </div>
    </div>
  );
}
