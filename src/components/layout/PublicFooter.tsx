// Site-wide footer with contact details and quick links.
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useGo, type AppPath } from "@/hooks/use-go";
import { BRAND } from "@/lib/gym/brand";
import { RhinoLogo } from "@/components/brand/RhinoLogo";

export function PublicFooter() {
  const navigate = useGo();
  const { publishedData } = useApp();
  const info = publishedData.contactInfo;
  const cleanWaNumber = (info.whatsapp || BRAND.phoneRaw).replace(/[^\d]/g, '') || BRAND.phoneRaw;
  const waHref = (info.whatsapp || '').startsWith('http') ? info.whatsapp : `https://wa.me/${cleanWaNumber}`;
  const igHref = info.instagramUrl || BRAND.instagramUrl;

  return (
    <footer className="bg-background border-t border-zinc-800 text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <RhinoLogo className="w-10 h-10" />
            <span className="font-black text-xl text-white tracking-wider">
              RHINO <span className="text-gold">STRENGTH</span>
            </span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Lakhimpur’s premier strength and conditioning studio. Equipped for heavy lifting, bodybuilding, conditioning, and sustainable transformation.
          </p>
          <div className="pt-2 flex items-center space-x-3">
            <a href={igHref} target="_blank" rel="noreferrer" className="bg-zinc-900 p-2.5 rounded-full text-zinc-300 hover:text-gold transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={waHref} target="_blank" rel="noreferrer" className="bg-zinc-900 p-2.5 rounded-full text-zinc-300 hover:text-green-500 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-gold pl-2">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-sm">
            {(['/', '/about', '/programs', '/facilities', '/membership', '/schedule', '/gallery', '/faq', '/contact'] as AppPath[]).map((path) => {
              const label = path === '/' ? 'Home' : path.replace('/', '').toUpperCase();
              return (
                <li key={path}>
                  <button onClick={() => navigate(path)} className="hover:text-gold transition-colors">
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Gym Address & Contact */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-ember pl-2">
            Gym Location & Contact
          </h4>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>{info.address}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a href={`tel:${(info.phone || '').replace(/[^\d+]/g, '')}`} className="hover:text-white">{info.phone}</a>
            </div>
            {info.email && (
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${info.email}`} className="hover:text-white">{info.email}</a>
              </div>
            )}
            <div className="flex items-center space-x-2.5">
              <Instagram className="w-4 h-4 text-gold shrink-0" />
              <a href={igHref} target="_blank" rel="noreferrer" className="hover:text-white">{info.instagram}</a>
            </div>
          </div>
        </div>

        {/* Hours & Enquiries */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-gold pl-2">
            Operating Hours
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
            {info.hours}
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/membership')}
              className="w-full bg-gold hover:bg-gold-deep text-black font-extrabold py-2.5 rounded text-xs tracking-wider uppercase transition-colors"
            >
              ENQUIRE MEMBERSHIP
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mt-10 border-t border-zinc-800/80 text-xs text-center text-zinc-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} RHINO STRENGTH GYM. All Rights Reserved. Lakhimpur, Assam.</p>
        <div className="flex gap-4">
          <button onClick={() => navigate('/admin/login')} className="hover:text-zinc-300">Admin Portal</button>
          <button onClick={() => navigate('/faq')} className="hover:text-zinc-300">FAQs</button>
          <button onClick={() => navigate('/contact')} className="hover:text-zinc-300">Contact</button>
        </div>
      </div>
    </footer>
  );
}
