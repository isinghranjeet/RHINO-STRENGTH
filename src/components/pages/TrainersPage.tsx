import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { PageBanner } from "@/components/layout/PageBanner";
import { TrainerDetailsModal } from "@/components/trainers/TrainerDetailsModal";
import type { Trainer } from "@/lib/gym/types";

export function TrainersPage() {
  const { publishedData, trackPageView } = useApp();
  const trainers = publishedData.trainers.filter(t => t.published);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  useEffect(() => trackPageView('/trainers'), []);

  return (
    <div className="bg-background text-white min-h-screen">
      <PageBanner title="RHINO STRENGTH COACHES" subtitle="Certified strength specialists, powerlifters, and fitness educators." breadcrumb="TRAINERS" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((t) => (
            <div key={t.id} className="bg-card rounded-xl border border-zinc-800 overflow-hidden space-y-4 p-5 flex flex-col justify-between">
              <div className="space-y-4">
                <img src={t.image} alt={t.name} className="w-full h-64 object-cover rounded-lg" />
                <div>
                  <span className="text-[10px] font-extrabold text-gold uppercase bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20">
                    {t.spec}
                  </span>
                  <h3 className="text-xl font-bold text-white uppercase mt-2">{t.name}</h3>
                  <p className="text-xs text-zinc-400 font-medium">{t.designation}</p>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">{t.bio}</p>
              </div>

              <button
                onClick={() => setSelectedTrainer(t)}
                className="w-full bg-zinc-800 hover:bg-gold text-white hover:text-black font-bold py-2.5 rounded text-xs uppercase tracking-wider transition-colors"
              >
                VIEW QUALIFICATIONS & BIO
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedTrainer && <TrainerDetailsModal trainer={selectedTrainer} onClose={() => setSelectedTrainer(null)} />}
    </div>
  );
}
