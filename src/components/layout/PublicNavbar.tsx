// Sticky top navigation for the public website.
import { useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Shield, X, User, Menu } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useGo, type AppPath } from "@/hooks/use-go";
import { RhinoLogo } from "@/components/brand/RhinoLogo";

export function PublicNavbar() {
  const navigate = useGo();
  const currentPath = useLocation({ select: (l) => l.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const { adminSession, memberSession } = useApp();

  const navLinks: { label: string; path: AppPath }[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Programs', path: '/programs' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Membership', path: '/membership' },
    { label: 'Trainers', path: '/trainers' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Branding */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <RhinoLogo className="w-11 h-11 transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-wider text-white flex items-center gap-1.5">
              RHINO <span className="text-gold">STRENGTH</span>
            </span>
            <span className="text-[10px] tracking-widest text-zinc-400 font-semibold uppercase">
              GYM • LAKHIMPUR
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center space-x-5 text-sm font-medium">
          {navLinks.map((link) => {
            const active = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`transition-colors py-1 ${
                  active ? 'text-gold border-b-2 border-gold' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* User / Admin Shortcut CTA */}
        <div className="hidden md:flex items-center space-x-3">
          {adminSession ? (
            <button
              onClick={() => navigate('/admin')}
              className="bg-graphite hover:bg-zinc-800 text-gold px-3.5 py-2 rounded-md text-xs font-bold border border-gold/40 flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" /> ADMIN CMS
            </button>
          ) : (
            <button
              onClick={() => navigate('/admin/login')}
              className="text-zinc-400 hover:text-white text-xs font-medium px-2 py-1"
            >
              Admin Login
            </button>
          )}

          {memberSession ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-ember hover:bg-ember-deep text-white px-4 py-2 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <User className="w-3.5 h-3.5" /> DASHBOARD
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-gold hover:bg-gold-deep text-black font-extrabold px-4 py-2 rounded-md text-xs tracking-wider uppercase transition-colors"
            >
              MEMBER LOGIN
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex xl:hidden items-center space-x-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-card border-b border-zinc-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setMobileOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${
                currentPath === link.path ? 'bg-zinc-800 text-gold' : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
            {memberSession ? (
              <button
                onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}
                className="w-full bg-ember text-white py-2.5 rounded-md font-bold text-center text-sm"
              >
                MEMBER DASHBOARD
              </button>
            ) : (
              <button
                onClick={() => { navigate('/login'); setMobileOpen(false); }}
                className="w-full bg-gold text-black font-extrabold py-2.5 rounded-md text-center text-sm"
              >
                MEMBER LOGIN / REGISTER
              </button>
            )}
            <button
              onClick={() => { navigate('/admin/login'); setMobileOpen(false); }}
              className="w-full bg-zinc-800 text-zinc-300 py-2 rounded-md text-center text-xs"
            >
              Admin CMS Access
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
