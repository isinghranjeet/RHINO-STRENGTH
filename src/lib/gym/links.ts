import { BRAND } from "./brand";
import type { ContactInfo } from "./types";

/** Digits-only WhatsApp number taken from the saved contact settings. */
export function whatsappNumber(info: ContactInfo) {
  return (info.whatsapp || BRAND.phoneRaw).replace(/[^\d]/g, "") || BRAND.phoneRaw;
}

export function whatsappHref(info: ContactInfo) {
  return (info.whatsapp || "").startsWith("http") ? info.whatsapp : `https://wa.me/${whatsappNumber(info)}`;
}

export function instagramHref(info: ContactInfo) {
  return info.instagramUrl || BRAND.instagramUrl;
}

export function telHref(phone: string) {
  return `tel:${(phone || "").replace(/[^\d+]/g, "")}`;
}
