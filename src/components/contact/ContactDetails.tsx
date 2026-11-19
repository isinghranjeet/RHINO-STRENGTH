import { useState } from "react";
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  Instagram,
  Mail,
  Map,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { whatsappHref, instagramHref, telHref } from "@/lib/gym/links";
import type { ContactInfo } from "@/lib/gym/types";

type CopyKey = "address" | "phone" | "whatsapp" | "email" | "instagram";

/** Address, phone, WhatsApp, email, Instagram, hours and map directions. */
export function ContactDetails({ info }: { info: ContactInfo }) {
  const [copiedKey, setCopiedKey] = useState<CopyKey | null>(null);
  const [showEmbeddedMap, setShowEmbeddedMap] = useState(false);

  const waHref = info.whatsapp ? whatsappHref(info) : undefined;
  const igHref = info.instagram ? instagramHref(info) : undefined;
  const phoneHref = info.phone ? telHref(info.phone) : undefined;
  const mapsQueryUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    info.address
  )}`;
  const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    info.address
  )}&output=embed`;

  const handleCopy = async (key: CopyKey, text?: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 1800);
    } catch {
      // Fallback ignored if clipboard permissions are restricted
    }
  };

  const renderCopyButton = (key: CopyKey, value?: string, label?: string) => {
    if (!value) return null;
    const isCopied = copiedKey === key;

    return (
      <button
        type="button"
        onClick={() => handleCopy(key, value)}
        aria-label={isCopied ? `${label ?? key} copied` : `Copy ${label ?? key}`}
        title={isCopied ? "Copied!" : `Copy ${label ?? key}`}
        className="ml-auto shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
      >
        {isCopied ? (
          <>
            <Check className="w-3 h-3 text-green-400" />
            <span className="text-green-400 font-semibold">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span className="hidden sm:inline">Copy</span>
          </>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <span className="inline-block text-xs font-bold text-gold uppercase tracking-widest">
          GET IN TOUCH
        </span>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">
          LAKHIMPUR GYM HQ
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Have questions regarding personal training slots, custom memberships, or
          visiting our heavy lifting zone? Reach out to our management team directly.
        </p>

        {/* Quick Action Pills */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          {phoneHref && (
            <a
              href={phoneHref}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              Call Now
            </a>
          )}
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 text-xs font-bold text-green-400 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Chat
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <a
            href={mapsQueryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-gold transition-colors"
          >
            Directions
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="space-y-3.5 text-sm">
        {/* Address */}
        <div className="bg-card p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors flex items-start gap-4">
          <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="font-bold text-white uppercase text-xs tracking-wide block">
              Facility Address
            </span>
            <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
              {info.address}
            </p>
          </div>
          {renderCopyButton("address", info.address, "address")}
        </div>

        {/* Phone */}
        {info.phone && phoneHref && (
          <div className="bg-card p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors flex items-center gap-4">
            <Phone className="w-5 h-5 text-gold shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-bold text-white uppercase text-xs tracking-wide block">
                Phone
              </span>
              <a
                href={phoneHref}
                className="text-zinc-300 text-xs hover:text-gold transition-colors mt-0.5 inline-block"
              >
                {info.phone}
              </a>
            </div>
            {renderCopyButton("phone", info.phone, "phone number")}
          </div>
        )}

        {/* WhatsApp */}
        {info.whatsapp && waHref && (
          <div className="bg-card p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors flex items-center gap-4">
            <MessageSquare className="w-5 h-5 text-green-500 shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-bold text-white uppercase text-xs tracking-wide block">
                WhatsApp Direct
              </span>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 text-xs hover:text-green-400 transition-colors mt-0.5 inline-flex items-center gap-1"
              >
                <span>{info.whatsapp}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
            {renderCopyButton("whatsapp", info.whatsapp, "WhatsApp number")}
          </div>
        )}

        {/* Email */}
        {info.email && (
          <div className="bg-card p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors flex items-center gap-4">
            <Mail className="w-5 h-5 text-gold shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-bold text-white uppercase text-xs tracking-wide block">
                Email
              </span>
              <a
                href={`mailto:${info.email}`}
                className="text-zinc-300 text-xs hover:text-gold transition-colors mt-0.5 inline-block break-all"
              >
                {info.email}
              </a>
            </div>
            {renderCopyButton("email", info.email, "email address")}
          </div>
        )}

        {/* Instagram */}
        {info.instagram && igHref && (
          <div className="bg-card p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors flex items-center gap-4">
            <Instagram className="w-5 h-5 text-gold shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-bold text-white uppercase text-xs tracking-wide block">
                Official Instagram
              </span>
              <a
                href={igHref}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-300 text-xs hover:text-gold transition-colors mt-0.5 inline-flex items-center gap-1"
              >
                <span>{info.instagram}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
            {renderCopyButton("instagram", info.instagram, "Instagram handle")}
          </div>
        )}

        {/* Opening Hours */}
        {info.hours && (
          <div className="bg-card p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors flex items-start gap-4">
            <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <span className="font-bold text-white uppercase text-xs tracking-wide block">
                Opening Hours
              </span>
              <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                {info.hours}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Location / Google Maps Card */}
      <div className="bg-card rounded-xl border border-zinc-800 p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-white uppercase tracking-wide">
            Google Maps Location
          </span>
          <button
            type="button"
            onClick={() => setShowEmbeddedMap((prev) => !prev)}
            className="text-[11px] font-semibold text-gold hover:underline cursor-pointer"
          >
            {showEmbeddedMap ? "Hide Map Preview" : "Load Map Preview"}
          </button>
        </div>

        {showEmbeddedMap ? (
          <div className="space-y-2">
            <div className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 h-52">
              <iframe
                title={`${info.address} Map`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1">
              <span className="truncate">{info.address}</span>
              <a
                href={mapsQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:underline font-bold shrink-0 ml-2 inline-flex items-center gap-1"
              >
                OPEN IN MAPS
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900 min-h-40 rounded-lg border border-zinc-800 flex flex-col items-center justify-center text-center text-zinc-400 text-xs p-4 space-y-2">
            <MapPin className="w-8 h-8 text-gold" />
            <span className="max-w-xs leading-relaxed">{info.address}</span>
            <div className="flex items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => setShowEmbeddedMap(true)}
                className="text-zinc-300 hover:text-white underline font-semibold text-[11px] cursor-pointer"
              >
                Preview Map
              </button>
              <a
                href={mapsQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gold hover:underline font-bold text-[11px] inline-flex items-center gap-1"
              >
                OPEN MAP DIRECTIONS
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}