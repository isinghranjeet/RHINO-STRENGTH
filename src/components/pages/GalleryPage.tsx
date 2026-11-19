import { useState, useEffect, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { PageBanner } from "@/components/layout/PageBanner";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import type { GalleryItem } from "@/lib/gym/types";

export function GalleryPage() {
  const { publishedData, trackPageView } = useApp();
  const gallery = publishedData.gallery.filter(g => g.published !== false);
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => trackPageView('/gallery'), []);

  const categories = ['All', 'Interior', 'Equipment', 'Strength', 'Cardio', 'Lifestyle'];

  const filteredGallery = useMemo(() => {
    return selectedCat === 'All' ? gallery : gallery.filter(g => g.category === selectedCat);
  }, [gallery, selectedCat]);

  return (
    <div className="bg-background text-white min-h-screen">
      <PageBanner title="RHINO GYM GALLERY" subtitle="Explore the interior floor, heavy dumbbell lines, power racks, and workout vibe." breadcrumb="GALLERY" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-1.5 rounded text-xs font-bold uppercase transition-colors ${
                selectedCat === cat ? 'bg-gold text-black' : 'bg-card border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveLightbox(item)}
              className="group bg-card rounded-xl border border-zinc-800 overflow-hidden cursor-pointer relative"
            >
              <img src={item.image} alt={item.title} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 space-y-1">
                <span className="text-[10px] font-bold text-gold uppercase">{item.category}</span>
                <h3 className="text-sm font-bold text-white uppercase">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {activeLightbox && <GalleryLightbox item={activeLightbox} onClose={() => setActiveLightbox(null)} />}
    </div>
  );
}
