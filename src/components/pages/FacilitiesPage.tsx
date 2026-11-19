import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PageBanner } from "@/components/layout/PageBanner";

export function FacilitiesPage() {
  const { publishedData, trackPageView } = useApp();
  const facilities = publishedData.facilities.filter(f => f.published);

  useEffect(() => trackPageView('/facilities'), []);

  return (
    <div className="bg-background text-white min-h-screen">
      <PageBanner title="FACILITIES & LIFTING ENVIRONMENT" subtitle="Heavy-duty power racks, cardio deck, free weights floor, and climate control." breadcrumb="FACILITIES" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((fac) => (
            <div key={fac.id} className="bg-card rounded-xl border border-zinc-800 overflow-hidden space-y-4 p-5">
              <img src={fac.image} alt={fac.name} className="w-full h-52 object-cover rounded-lg" />
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase bg-zinc-800 text-gold px-2 py-0.5 rounded">
                  {fac.category}
                </span>
                <h3 className="text-lg font-bold text-white uppercase">{fac.name}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{fac.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Guidance Rules */}
        <div className="bg-card p-8 rounded-xl border border-zinc-800 space-y-4">
          <h3 className="text-xl font-bold text-white uppercase border-l-4 border-ember pl-3">
            EQUIPMENT USAGE & GYM FLOOR ETIQUETTE
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Re-rack all dumbbells, plates, and accessories after your set.</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Wipe down equipment benches after intense training sessions.</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Always use collar clips on Olympic barbells for safety.</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Non-marking athletic shoes required on the lifting floor.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
