import { ArrowRight, Clock, Instagram, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { useApp } from "@/context/AppContext";
import { useGo } from "@/hooks/use-go";
import { instagramHref, telHref, whatsappHref } from "@/lib/gym/links";
import { googleDirectionsUrl } from "@/lib/gym/location";

const CTA_PHOTO = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80";
const CARD_PHOTO = "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80";

/** Closing call to action above the footer: headline, three actions and a visit card. */
export function FinalCta() {
  const navigate = useGo();
  const { publishedData } = useApp();
  const info = publishedData.contactInfo;
  const hours = (info.hours || "").split("|").map((h) => h.trim()).filter(Boolean);

  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden border-t border-border bg-background">
      {/* Photo + dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center grayscale"
        style={{ backgroundImage: `url('${CTA_PHOTO}')` }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-cta-overlay" />
      {/* Decorative accents */}
      <div aria-hidden className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-ember/30 blur-3xl animate-glow-drift" />
      <div aria-hidden className="absolute left-0 top-0 h-1 w-full bg-gold-ember" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-24">
        {/* Message + actions */}
        <div className="space-y-7 lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold sm:text-[11px] sm:tracking-[0.3em]">
              Strong Mind. Strong Body. Strong Life.
            </span>
          </div>

          <h2 id="final-cta-title" className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl">
            Your transformation
            <span className="block bg-gold-ember bg-clip-text text-transparent">starts here.</span>
          </h2>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            More than a gym. A place to build strength, discipline and confidence. Take the first step towards becoming stronger.
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => navigate("/membership")}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-gold px-7 py-4 text-xs font-extrabold uppercase tracking-widest text-primary-foreground shadow-gold-glow transition-all hover:-translate-y-0.5 hover:bg-gold-deep active:translate-y-0"
            >
              Join Rhino Strength Gym
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={whatsappHref(info)}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-whatsapp/40 bg-whatsapp/10 px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-foreground transition-all hover:-translate-y-0.5 hover:border-whatsapp hover:bg-whatsapp/20"
            >
              <MessageCircle className="h-4 w-4 text-whatsapp" />
              Chat with us on WhatsApp
            </a>
            <a
              href={googleDirectionsUrl(info)}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card/60 px-6 py-4 text-xs font-extrabold uppercase tracking-widest text-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              <Navigation className="h-4 w-4 text-gold" />
              Get Directions
            </a>
          </div>
        </div>

        {/* Visit card */}
        <aside className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl backdrop-blur-md transition-colors hover:border-gold/60">
            <div className="relative h-36 overflow-hidden">
              <img src={CARD_PHOTO} alt="Training floor at Rhino Strength Gym" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute bottom-3 left-5">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-gold">Visit us</div>
                <div className="text-lg font-black uppercase tracking-wide text-foreground">Rhino Strength Gym</div>
              </div>
            </div>

            <ul className="space-y-4 p-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="leading-relaxed text-muted-foreground">{info.address}</span>
              </li>
              {hours.length > 0 && (
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="space-y-0.5 text-muted-foreground">
                    {hours.map((h) => (
                      <span key={h} className="block">{h}</span>
                    ))}
                  </span>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={telHref(info.phone)} className="font-bold text-foreground transition-colors hover:text-gold">{info.phone}</a>
              </li>
              {info.instagram && (
                <li className="flex items-center gap-3">
                  <Instagram className="h-4 w-4 shrink-0 text-gold" />
                  <a href={instagramHref(info)} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-gold">{info.instagram}</a>
                </li>
              )}
            </ul>
            <div aria-hidden className="h-1 w-full bg-gold-ember" />
          </div>
        </aside>
      </div>
    </section>
  );
}
