import type { AboutCms } from "@/lib/gym/types";

/** Story text with an image. */
export function AboutStory({ about }: { about: AboutCms }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl font-black text-gold uppercase">{about.subheadline}</h2>
        <p className="text-zinc-300 leading-relaxed text-base">
          RHINO STRENGTH GYM is built on the core belief that physical strength is fundamental to human confidence and health. Located on the 1st Floor of PD Enterprise Building in Lakhimpur, we provide an environment stripped of gimmicks, designed purely for results.
        </p>
        <p className="text-zinc-400 leading-relaxed text-sm">
          Whether you are gripping a barbell for the first time or training to hit a personal record, our facility welcomes athletes who respect progressive effort and consistency.
        </p>
      </div>
      <div className="rounded-xl overflow-hidden border border-zinc-800 shadow-2xl">
        <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80" alt="Rhino Training" className="w-full h-80 object-cover" />
      </div>
    </div>
  );
}
