import { useState, useEffect, type FormEvent } from "react";
import { useApp } from "@/context/AppContext";
import { BRAND } from "@/lib/gym/brand";
import { googleDirectionsUrl, googleEmbedUrl } from "@/lib/gym/location";

/** Admin tab: Contact Settings. */
export function ContactSettingsTab() {
  const { draftData, showToast, publishContactInfo } = useApp();

  // 6. Contact Settings Local Form State
  const [contactForm, setContactForm] = useState(() => ({
    phone: draftData.contactInfo?.phone || BRAND.phone,
    whatsapp: draftData.contactInfo?.whatsapp || BRAND.whatsapp,
    email: draftData.contactInfo?.email || 'contact@rhinostrengthgym.com',
    address: draftData.contactInfo?.address || BRAND.address,
    hours: draftData.contactInfo?.hours || 'Mon-Sat: 5:30 AM - 10:00 PM | Sun: 7:00 AM - 12:00 PM',
    instagram: draftData.contactInfo?.instagram || BRAND.instagram,
    instagramUrl: draftData.contactInfo?.instagramUrl || BRAND.instagramUrl,
    mapLat: draftData.contactInfo?.mapLat || BRAND.mapLat,
    mapLng: draftData.contactInfo?.mapLng || BRAND.mapLng,
    mapsLink: draftData.contactInfo?.mapsLink || ''
  }));

  useEffect(() => {
    if (draftData.contactInfo) {
      setContactForm({
        phone: draftData.contactInfo.phone || '',
        whatsapp: draftData.contactInfo.whatsapp || '',
        email: draftData.contactInfo.email || '',
        address: draftData.contactInfo.address || '',
        hours: draftData.contactInfo.hours || '',
        instagram: draftData.contactInfo.instagram || '',
        instagramUrl: draftData.contactInfo.instagramUrl || '',
        mapLat: draftData.contactInfo.mapLat || BRAND.mapLat,
        mapLng: draftData.contactInfo.mapLng || BRAND.mapLng,
        mapsLink: draftData.contactInfo.mapsLink || ''
      });
    }
  }, [draftData.contactInfo]);

  // --- HANDLERS: 6. CONTACT SETTINGS ---
  const handleSaveContactSettings = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.phone.trim() || !contactForm.address.trim()) {
      showToast('Phone number and gym address are required.', 'error');
      return;
    }
    const lat = Number(contactForm.mapLat.trim());
    const lng = Number(contactForm.mapLng.trim());
    if (!contactForm.mapLat.trim() || !contactForm.mapLng.trim() || !Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      showToast('Enter a valid map latitude (-90 to 90) and longitude (-180 to 180).', 'error');
      return;
    }
    if (contactForm.mapsLink.trim() && !/^https?:\/\//i.test(contactForm.mapsLink.trim())) {
      showToast('Google Maps link must start with https://', 'error');
      return;
    }
    publishContactInfo(contactForm);
    showToast('Contact settings saved & published across the website!');
  };

  return (
    <form onSubmit={handleSaveContactSettings} className="bg-card p-6 rounded-xl border border-zinc-800 space-y-5 text-xs">
      <div>
        <h3 className="text-lg font-black text-gold uppercase">CONTACT & BUSINESS SETTINGS</h3>
        <p className="text-zinc-400">Update phone, WhatsApp, email, gym address, opening hours, and social media links across the entire site.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-zinc-300 font-bold mb-1">Phone Number *</label>
          <input
            type="text"
            required
            value={contactForm.phone}
            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-zinc-300 font-bold mb-1">WhatsApp Number / Link *</label>
          <input
            type="text"
            required
            value={contactForm.whatsapp}
            onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-zinc-300 font-bold mb-1">Business Email</label>
          <input
            type="email"
            value={contactForm.email}
            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-zinc-300 font-bold mb-1">Opening Hours</label>
          <input
            type="text"
            value={contactForm.hours}
            onChange={(e) => setContactForm({ ...contactForm, hours: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-zinc-300 font-bold mb-1">Instagram Handle</label>
          <input
            type="text"
            value={contactForm.instagram}
            onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-zinc-300 font-bold mb-1">Instagram Profile URL</label>
          <input
            type="text"
            value={contactForm.instagramUrl}
            onChange={(e) => setContactForm({ ...contactForm, instagramUrl: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-zinc-300 font-bold mb-1">Gym Full Address *</label>
        <textarea
          rows={2}
          required
          value={contactForm.address}
          onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
          className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
        />
      </div>

      <div className="space-y-4 border-t border-zinc-800 pt-5">
        <div>
          <h4 className="text-sm font-black text-gold uppercase">MAP PIN & DIRECTIONS</h4>
          <p className="text-zinc-400">Controls the homepage "Find Our Gym" map and every Get Directions button. Tip: in Google Maps, long-press the gym entrance and copy the two numbers shown.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Map Latitude *</label>
            <input
              type="text"
              inputMode="decimal"
              required
              value={contactForm.mapLat}
              onChange={(e) => setContactForm({ ...contactForm, mapLat: e.target.value })}
              placeholder="e.g. 27.224858"
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-zinc-300 font-bold mb-1">Map Longitude *</label>
            <input
              type="text"
              inputMode="decimal"
              required
              value={contactForm.mapLng}
              onChange={(e) => setContactForm({ ...contactForm, mapLng: e.target.value })}
              placeholder="e.g. 94.105446"
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-zinc-300 font-bold mb-1">Google Maps Destination Link (optional)</label>
          <input
            type="url"
            value={contactForm.mapsLink}
            onChange={(e) => setContactForm({ ...contactForm, mapsLink: e.target.value })}
            placeholder="https://maps.app.goo.gl/..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2.5 text-white focus:border-gold focus:outline-none"
          />
          <p className="text-zinc-500 mt-1">If set (e.g. your Google Business listing share link), Get Directions opens this link instead of the pin.</p>
        </div>
        <div className="rounded-lg overflow-hidden border border-zinc-800 h-56">
          <iframe
            title="Map pin preview"
            src={googleEmbedUrl(contactForm, 17)}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
        <a
          href={googleDirectionsUrl(contactForm)}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-gold font-bold hover:underline"
        >
          Test Get Directions link →
        </a>
      </div>

      <button
        type="submit"
        className="bg-gold hover:bg-gold-deep text-black font-extrabold px-6 py-3 rounded uppercase tracking-wider"
      >
        SAVE & PUBLISH CONTACT SETTINGS
      </button>
    </form>
  );
}
