import type { HomepageCms } from "@/lib/gym/types";

/** Gold strip with the brand manifesto. */
export function ManifestoBanner({ hp }: { hp: HomepageCms }) {
  return (
    <section className="bg-gold text-black py-4 font-black text-center tracking-widest text-sm sm:text-base uppercase shadow-inner">
      {hp.manifestoText}
    </section>
  );
}
