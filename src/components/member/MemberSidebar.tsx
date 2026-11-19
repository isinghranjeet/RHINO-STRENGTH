import { Trophy, Activity, User, MessageSquare } from "lucide-react";
import { useGo } from "@/hooks/use-go";
import { RhinoLogo } from "@/components/brand/RhinoLogo";
import type { Member } from "@/lib/gym/types";

/** Member portal navigation and logout. */
export function MemberSidebar({ member, activeTab, setActiveTab, onLogout }: { member: Member; activeTab: string; setActiveTab: (tab: string) => void; onLogout: () => void }) {
  const navigate = useGo();
  return (
    <aside className="w-full lg:w-64 bg-card border-r border-zinc-800 p-4 space-y-6 shrink-0">
      <div className="flex items-center space-x-3 pb-4 border-b border-zinc-800">
        <RhinoLogo className="w-8 h-8" />
        <div>
          <div className="font-extrabold text-sm text-white">{member.name}</div>
          <span className="text-[10px] text-ember font-mono">MEMBER DASHBOARD</span>
        </div>
      </div>

      <nav className="space-y-1 text-xs">
        {[
          { id: 'Overview', icon: User, label: 'Overview' },
          { id: 'Membership', icon: Trophy, label: 'My Membership' },
          { id: 'Enquiries', icon: MessageSquare, label: 'My Enquiries' },
          { id: 'Activity', icon: Activity, label: 'Account Activity' }
        ].map(item => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-md font-medium transition-colors ${
                active ? 'bg-ember text-white font-bold' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-zinc-800 space-y-2">
        <button onClick={() => navigate('/')} className="w-full bg-zinc-900 text-zinc-300 py-2 rounded text-xs font-bold">
          Public Website
        </button>
        <button
          onClick={onLogout}
          className="w-full bg-red-500/10 text-red-400 py-2 rounded text-xs font-bold"
        >
          Log Out Member
        </button>
      </div>
    </aside>
  );
}
