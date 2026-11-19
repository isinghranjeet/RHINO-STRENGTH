// Map and navigation links for the gym. The destination is always the gym, never the visitor.
import { BRAND } from "./brand";
import type { ContactInfo } from "./types";

export interface GymCoords {
  lat: number;
  lng: number;
}

function parseCoord(value: string | undefined, min: number, max: number): number | null {
  if (!value || !value.trim()) return null;
  const n = Number(value.trim());
  return Number.isFinite(n) && n >= min && n <= max ? n : null;
}

/** Saved pin from Contact Settings, falling back to the default pin when missing or invalid. */
export function gymCoords(info: Partial<ContactInfo>): GymCoords {
  const lat = parseCoord(info.mapLat, -90, 90);
  const lng = parseCoord(info.mapLng, -180, 180);
  if (lat !== null && lng !== null) return { lat, lng };
  return { lat: Number(BRAND.mapLat), lng: Number(BRAND.mapLng) };
}

function isHttpUrl(value: string | undefined): value is string {
  return !!value && /^https?:\/\//i.test(value.trim());
}

/** Google Maps directions to the gym. A custom Google Maps link from admin wins when set. */
export function googleDirectionsUrl(info: Partial<ContactInfo>): string {
  if (isHttpUrl(info.mapsLink)) return info.mapsLink.trim();
  const { lat, lng } = gymCoords(info);
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
}

/** Apple Maps directions to the gym (opens the Maps app on iPhone/Mac, the website elsewhere). */
export function appleMapsUrl(info: Partial<ContactInfo>): string {
  const { lat, lng } = gymCoords(info);
  return `https://maps.apple.com/?daddr=${lat},${lng}&q=${encodeURIComponent("Rhino Strength Gym")}`;
}

/** Interactive Google Maps embed centred on the gym with a pin. */
export function googleEmbedUrl(info: Partial<ContactInfo>, zoom = 18): string {
  const { lat, lng } = gymCoords(info);
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=en&output=embed`;
}

/** Rapido has no public deep link, so we copy the address and open Rapido. */
export const RAPIDO_URL = "https://www.rapido.bike/";

/** Copy text to the clipboard; resolves false when the browser blocks it. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
