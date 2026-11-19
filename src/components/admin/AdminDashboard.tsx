import { useState } from "react";

import { useApp } from "@/context/AppContext";
import { useGo } from "@/hooks/use-go";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import { AboutCmsTab } from "./tabs/AboutCmsTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { ContactSettingsTab } from "./tabs/ContactSettingsTab";
import { EnquiriesTab } from "./tabs/EnquiriesTab";
import { FacilitiesCmsTab } from "./tabs/FacilitiesCmsTab";
import { FaqCmsTab } from "./tabs/FaqCmsTab";
import { GalleryCmsTab } from "./tabs/GalleryCmsTab";
import { HomepageCmsTab } from "./tabs/HomepageCmsTab";
import { MediaLibraryTab } from "./tabs/MediaLibraryTab";
import { MembershipCmsTab } from "./tabs/MembershipCmsTab";
import { OverviewTab } from "./tabs/OverviewTab";
import { ProgramsCmsTab } from "./tabs/ProgramsCmsTab";
import { ScheduleCmsTab } from "./tabs/ScheduleCmsTab";
import { SettingsBackupTab } from "./tabs/SettingsBackupTab";
import { TrainersCmsTab } from "./tabs/TrainersCmsTab";

/** Admin CMS workspace: sidebar + the selected tab. */
export function AdminDashboard() {
  const navigate = useGo();
  const { hydrated, adminSession, setAdminSession, showToast } = useApp();
  const [activeTab, setActiveTab] = useState("Overview");

  if (!hydrated) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!adminSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-red-400 text-sm font-bold">Unauthorized Admin Access.</p>
          <button
            onClick={() => navigate("/admin/login")}
            className="bg-gold text-black font-extrabold px-6 py-2.5 rounded text-xs"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    setAdminSession(null);
    showToast("Logged out from Admin CMS.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col lg:flex-row">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <AdminHeader activeTab={activeTab} />

        {activeTab === "Overview" && <OverviewTab onOpenEnquiries={() => setActiveTab("Enquiries")} />}
        {activeTab === "Homepage CMS" && <HomepageCmsTab />}
        {activeTab === "About CMS" && <AboutCmsTab />}
        {activeTab === "Programs CMS" && <ProgramsCmsTab />}
        {activeTab === "Facilities CMS" && <FacilitiesCmsTab />}
        {activeTab === "Membership CMS" && <MembershipCmsTab />}
        {activeTab === "Trainers CMS" && <TrainersCmsTab />}
        {activeTab === "Schedule CMS" && <ScheduleCmsTab />}
        {activeTab === "Gallery CMS" && <GalleryCmsTab />}
        {activeTab === "FAQ CMS" && <FaqCmsTab />}
        {activeTab === "Contact Settings" && <ContactSettingsTab />}
        {activeTab === "Enquiries" && <EnquiriesTab />}
        {activeTab === "Analytics" && <AnalyticsTab />}
        {activeTab === "Media Library" && <MediaLibraryTab />}
        {activeTab === "Settings Backup" && <SettingsBackupTab />}
      </main>
    </div>
  );
}
