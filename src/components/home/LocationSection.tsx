import { useEffect, useState } from "react";
import { Bike, Check, Clock, Copy, ExternalLink, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { useApp } from "@/context/AppContext";
import { telHref, whatsappHref } from "@/lib/gym/links";
import { RAPIDO_URL, appleMapsUrl, copyText, googleDirectionsUrl, googleEmbedUrl } from "@/lib/gym/location";

const MAP_TIMEOUT_MS = 15000;

/** "Find Our Gym" — interactive Google Map with the gym pin plus navigation options. */
export function LocationSection() {
  const { publishedData, showToast } = useApp();
  const info = publishedData.contactInfo;
  const embedUrl = googleEmbedUrl(info);
  const directionsUrl = googleDirectionsUrl(info);
  const hours = (info.hours || "").split("|").map((h) => h.trim()).filter(Boolean);

  const [mapState, setMapState] = useState<"loading" | "ready" | "failed">("loading");
  const [copied, setCopied] = useState(false);

  // Reset when the pin changes; show the fallback if the map never loads.
  useEffect(() => {
    setMapState("loading");
    const t = setTimeout(() => setMapState((s) => (s === "loading" ? "failed" : s)), MAP_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [embedUrl]);

  const fullAddress = `Rhino Strength Gym, ${info.address}`;

  const handleCopy = async () => {
    const ok = await copyText(fullAddress);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast("Gym address copied!");
    } else {
      showToast("Couldn't copy automatically — please select the address and copy it.", "error");
    }
  };

  const handleRapido = async () => {
    const ok = await copyText(fullAddress);
    showToast(ok ? "Address copied — paste it as your drop location in Rapido." : "Opening Rapido — enter Rhino Strength Gym, KB Road as your drop.", "info");
    window.open(RAPIDO_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="find-us" aria-labelledby="find-us-title" className="relative overflow-hidden border-t border-border bg-background py-20">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold">Find our gym</span>
            </div>
            <h2 id="find-us-title" className="text-3xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
              Location &amp; Directions
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            1st floor, PD Enterprise Building on KB Road. Tap Get Directions and your maps app will guide you straight to our door.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Map */}
          <div className="group relative h-[340px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-colors hover:border-gold/50 sm:h-[440px] lg:col-span-3 lg:h-auto lg:min-h-[480px]">
            {mapState !== "failed" && (
              <iframe
                key={embedUrl}
                title="Map showing Rhino Strength Gym, KB Road, Lakhimpur"
                src={embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                onLoad={() => setMapState("ready")}
              />
            )}

            {mapState === "loading" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card">
                <div className="relative flex h-14 w-14 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-gold/40 animate-pin-ring" />
                  <MapPin className="relative h-9 w-9 text-gold" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Loading map…</p>
              </div>
            )}

            {mapState === "failed" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card p-6 text-center">
                <MapPin className="h-10 w-10 text-gold" />
                <div className="space-y-1">
                  <p className="font-bold text-foreground">The map couldn't load right now.</p>
                  <p className="text-sm text-muted-foreground">You can still open our exact location in Google Maps.</p>
                </div>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-primary-foreground hover:bg-gold-deep"
                >
                  <Navigation className="h-4 w-4" /> Open in Google Maps
                </a>
              </div>
            )}

            {/* Brand pin label */}
            {mapState === "ready" && (
              <div className="pointer-events-none absolute left-3 top-3 flex max-w-[85%] items-center gap-3 rounded-xl border border-gold/40 bg-background/90 px-3 py-2 shadow-xl backdrop-blur">
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold">
                  <span className="absolute inset-0 rounded-full bg-gold/50 animate-pin-ring" />
                  <MapPin className="relative h-4 w-4 text-primary-foreground" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-black uppercase tracking-wide text-foreground">Rhino Strength Gym</span>
                  <span className="block truncate text-[11px] text-muted-foreground">1st Floor, PD Enterprise Bldg, KB Road</span>
                </span>
              </div>
            )}

            {mapState === "ready" && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-widest text-primary-foreground shadow-gold-glow transition-transform hover:-translate-y-0.5 hover:bg-gold-deep"
              >
                <Navigation className="h-3.5 w-3.5" /> Directions
              </a>
            )}
          </div>

          {/* Info card */}
          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl lg:col-span-2">
            <div aria-hidden className="h-1 w-full bg-gold-ember" />
            <div className="flex flex-1 flex-col gap-6 p-6">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-gold">Visit us</div>
                <h3 className="mt-1 text-2xl font-black uppercase tracking-wide text-foreground">Rhino Strength Gym</h3>
              </div>

              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="leading-relaxed text-muted-foreground">{info.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  <a href={telHref(info.phone)} className="font-bold text-foreground transition-colors hover:text-gold">{info.phone}</a>
                </li>
                {hours.length > 0 && (
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="text-muted-foreground">
                      {hours.map((h) => (
                        <span key={h} className="block">{h}</span>
                      ))}
                    </span>
                  </li>
                )}
              </ul>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-3.5 text-xs font-extrabold uppercase tracking-widest text-primary-foreground shadow-gold-glow transition-all hover:-translate-y-0.5 hover:bg-gold-deep sm:col-span-2"
                >
                  <Navigation className="h-4 w-4" /> Get Directions
                </a>
                <a
                  href={whatsappHref(info)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-whatsapp/40 bg-whatsapp/10 px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-foreground transition-all hover:border-whatsapp hover:bg-whatsapp/20"
                >
                  <MessageCircle className="h-4 w-4 text-whatsapp" /> WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-4 py-3 text-xs font-extrabold uppercase tracking-wider text-foreground transition-all hover:border-gold hover:text-gold"
                >
                  {copied ? <Check className="h-4 w-4 text-gold" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy address"}
                </button>
              </div>

              <div className="mt-auto space-y-3 border-t border-border pt-5">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-muted-foreground">Navigate with</div>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-background/60 px-2 py-3 text-[11px] font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                  >
                    <MapPin className="h-4 w-4 text-gold" /> Google Maps
                  </a>
                  <a
                    href={appleMapsUrl(info)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-background/60 px-2 py-3 text-[11px] font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                  >
                    <ExternalLink className="h-4 w-4 text-gold" /> Apple Maps
                  </a>
                  <button
                    type="button"
                    onClick={handleRapido}
                    className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-background/60 px-2 py-3 text-[11px] font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                  >
                    <Bike className="h-4 w-4 text-gold" /> Rapido
                  </button>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Rapido: we copy the gym address for you — paste it as your drop location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
