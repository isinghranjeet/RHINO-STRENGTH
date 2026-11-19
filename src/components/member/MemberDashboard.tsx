import { useState } from "react";

import { useApp } from "@/context/AppContext";
import { useGo } from "@/hooks/use-go";
import { MemberActivityTab } from "./MemberActivityTab";
import { MemberEnquiriesTab } from "./MemberEnquiriesTab";
import { MemberMembershipTab } from "./MemberMembershipTab";
import { MemberOverviewTab } from "./MemberOverviewTab";
import { MemberSidebar } from "./MemberSidebar";

/** Member portal: sidebar + the selected tab. */
export function MemberDashboard() {
  const navigate = useGo();
  const { hydrated, memberSession, setMemberSession, enquiries, showToast } = useApp();
  const [activeTab, setActiveTab] = useState("Overview");

  if (!hydrated) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!memberSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-red-400 text-sm font-bold">Member Session Required.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-gold text-black font-extrabold px-6 py-2.5 rounded text-xs"
          >
            Go to Member Login
          </button>
        </div>
      </div>
    );
  }

  const member = memberSession;
  const myEnquiries = enquiries.filter((e) => e.email === member.email || e.name === member.name);

  const handleLogout = () => {
    setMemberSession(null);
    showToast("Logged out.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col lg:flex-row">
      <MemberSidebar member={member} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 p-6 space-y-6">
        <div className="bg-card p-6 rounded-xl border border-zinc-800 space-y-2">
          <h1 className="text-2xl font-black text-white uppercase">WELCOME BACK, {member.name.toUpperCase()}</h1>
          <p className="text-xs text-zinc-400">Rhino Strength Gym Member Portal • Lakhimpur</p>
        </div>

        {activeTab === "Overview" && <MemberOverviewTab member={member} />}
        {activeTab === "Membership" && <MemberMembershipTab member={member} />}
        {activeTab === "Enquiries" && <MemberEnquiriesTab myEnquiries={myEnquiries} />}
        {activeTab === "Activity" && <MemberActivityTab member={member} myEnquiries={myEnquiries} />}
      </main>
    </div>
  );
}
