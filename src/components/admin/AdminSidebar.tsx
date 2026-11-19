import { Shield, Dumbbell, Trophy, Users, Calendar, Mail, Copy, RefreshCw, Eye, Activity, BarChart2, Settings, LogOut, HelpCircle, Layers, Globe, MessageSquare } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useGo } from "@/hooks/use-go";
import { RhinoLogo } from "@/components/brand/RhinoLogo";

/** Admin navigation, publish tools and logout. */
export function AdminSidebar({ activeTab, setActiveTab, onLogout }: { activeTab: string; setActiveTab: (tab: string) => void; onLogout: () => void }) {
  const navigate = useGo();
  const { publishDraftToPublic, resetToDefaultSeed } = useApp();
  return (
    <aside className="w-full lg:w-64 bg-card border-r border-zinc-800 shrink-0 p-4 space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-zinc-800">
        <RhinoLogo className="w-8 h-8" />
        <div>
          <div className="font-extrabold text-sm text-white">RHINO CMS</div>
          <span className="text-[10px] text-gold font-mono">ADMIN PANEL</span>
        </div>
      </div>

      {/* CMS Live Actions Header Banner */}
      <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 space-y-2">
        <div className="text-[10px] font-bold text-zinc-400 uppercase">CMS Action Tools</div>
        <button
          onClick={publishDraftToPublic}
          className="w-full bg-gold hover:bg-gold-deep text-black font-extrabold py-2 rounded text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
        >
          <Globe className="w-3.5 h-3.5" /> PUBLISH DRAFT LIVE
        </button>
        <button
          onClick={resetToDefaultSeed}
          className="w-full bg-zinc-800 hover:bg-red-900/60 text-zinc-300 font-bold py-1.5 rounded text-[10px] uppercase transition-colors flex items-center justify-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Reset Seed Data
        </button>
      </div>

      {/* Navigation Tabs */}
      <nav className="space-y-1 text-xs">
        {[
          { id: 'Overview', icon: Activity, label: 'Overview' },
          { id: 'Homepage CMS', icon: Layers, label: 'Homepage Editor' },
          { id: 'About CMS', icon: Globe, label: 'About Page Editor' },
          { id: 'Programs CMS', icon: Dumbbell, label: 'Programs Manager' },
          { id: 'Facilities CMS', icon: Shield, label: 'Facilities Manager' },
          { id: 'Membership CMS', icon: Trophy, label: 'Membership Manager' },
          { id: 'Trainers CMS', icon: Users, label: 'Trainers Manager' },
          { id: 'Schedule CMS', icon: Calendar, label: 'Schedule Manager' },
          { id: 'Gallery CMS', icon: Eye, label: 'Gallery Manager' },
          { id: 'FAQ CMS', icon: HelpCircle, label: 'FAQ Manager' },
          { id: 'Contact Settings', icon: Mail, label: 'Contact Settings' },
          { id: 'Enquiries', icon: MessageSquare, label: 'Customer Enquiries' },
          { id: 'Analytics', icon: BarChart2, label: 'Local Analytics' },
          { id: 'Media Library', icon: Copy, label: 'Media Library' },
          { id: 'Settings Backup', icon: Settings, label: 'Settings & Backup' }
        ].map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-md font-medium transition-colors ${
                active ? 'bg-gold text-black font-bold' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-zinc-800 space-y-2">
        <button
          onClick={() => navigate('/')}
          className="w-full bg-zinc-900 text-zinc-300 py-2 rounded text-xs font-bold hover:bg-zinc-800 flex items-center justify-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" /> View Public Site
        </button>
        <button
          onClick={onLogout}
          className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 py-2 rounded text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" /> Log Out Admin
        </button>
      </div>
    </aside>
  );
}
