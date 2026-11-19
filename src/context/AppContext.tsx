import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type Context,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import {
  DEFAULT_MEMBERS,
  INITIAL_ENQUIRIES,
  INITIAL_MEDIA,
  createDefaultAnalytics,
  createDefaultContent,
} from "@/lib/gym/seed-data";
import { STORAGE_KEYS, getOrCreateVisitorId, loadStorage, saveStorage } from "@/lib/gym/storage";
import type {
  AdminSession,
  Analytics,
  CollectionKey,
  ContactInfo,
  Enquiry,
  MediaItem,
  Member,
  NewEnquiry,
  SiteContent,
  Toast,
} from "@/lib/gym/types";

interface AppContextValue {
  /** True once saved browser data has been loaded (always false during server render). */
  hydrated: boolean;
  publishedData: SiteContent;
  draftData: SiteContent;
  setDraftData: Dispatch<SetStateAction<SiteContent>>;
  publishDraftToPublic: () => void;
  publishCollection: <K extends CollectionKey>(key: K, items: SiteContent[K]) => void;
  publishContactInfo: (info: ContactInfo) => void;
  resetToDefaultSeed: () => void;
  enquiries: Enquiry[];
  addEnquiry: (enquiry: NewEnquiry) => Enquiry;
  updateEnquiryStatus: (id: string, status: string, notes?: string) => void;
  deleteEnquiry: (id: string) => void;
  mediaLibrary: MediaItem[];
  setMediaLibrary: Dispatch<SetStateAction<MediaItem[]>>;
  members: Member[];
  setMembers: Dispatch<SetStateAction<Member[]>>;
  analytics: Analytics;
  trackPageView: (path: string) => void;
  adminSession: AdminSession | null;
  setAdminSession: Dispatch<SetStateAction<AdminSession | null>>;
  memberSession: Member | null;
  setMemberSession: Dispatch<SetStateAction<Member | null>>;
  exportBackupJSON: () => void;
  importBackupJSON: (json: string) => boolean;
  toast: Toast | null;
  showToast: (message: string, type?: Toast["type"]) => void;
}

// Keep one context object across hot reloads: when this file (or the seed data it imports) is
// edited, the module re-runs; a fresh createContext() would no longer match the provider already
// mounted in the root layout and every useApp() call would throw.
const globalStore = globalThis as typeof globalThis & {
  __rhinoAppContext?: Context<AppContextValue | null>;
};
const AppContext = (globalStore.__rhinoAppContext ??= createContext<AppContextValue | null>(null));

function addView(prev: Analytics, path: string, visitorId: string): Analytics {
  const uniqueSet = new Set(prev.uniqueVisitors || []);
  uniqueSet.add(visitorId);
  return {
    ...prev,
    pageViews: prev.pageViews + 1,
    uniqueVisitors: Array.from(uniqueSet),
    routeHits: { ...prev.routeHits, [path]: (prev.routeHits[path] || 0) + 1 },
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const hydratedRef = useRef(false);
  const pendingViews = useRef<string[]>([]);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [publishedData, setPublishedData] = useState<SiteContent>(createDefaultContent);
  const [draftData, setDraftData] = useState<SiteContent>(createDefaultContent);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [members, setMembers] = useState<Member[]>(DEFAULT_MEMBERS);
  const [analytics, setAnalytics] = useState<Analytics>(createDefaultAnalytics);
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [memberSession, setMemberSession] = useState<Member | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  // Load saved browser data once, after the page has mounted.
  useEffect(() => {
    const published = loadStorage(STORAGE_KEYS.published, createDefaultContent());
    setPublishedData(published);
    setDraftData(loadStorage(STORAGE_KEYS.draft, published));
    setEnquiries(loadStorage(STORAGE_KEYS.enquiries, INITIAL_ENQUIRIES));
    setMediaLibrary(loadStorage(STORAGE_KEYS.media, INITIAL_MEDIA));
    setMembers(loadStorage(STORAGE_KEYS.members, DEFAULT_MEMBERS));
    setAdminSession(loadStorage<AdminSession | null>(STORAGE_KEYS.adminSession, null));
    setMemberSession(loadStorage<Member | null>(STORAGE_KEYS.memberSession, null));

    const visitorId = getOrCreateVisitorId();
    let stats = loadStorage(STORAGE_KEYS.analytics, createDefaultAnalytics());
    stats = { ...stats, uniqueVisitors: Array.from(new Set([...(stats.uniqueVisitors || []), visitorId])) };
    for (const path of pendingViews.current) stats = addView(stats, path, visitorId);
    pendingViews.current = [];
    setAnalytics(stats);

    hydratedRef.current = true;
    setHydrated(true);
  }, []);

  // Save each piece of data whenever it changes (only after the first load).
  useEffect(() => { if (hydrated) saveStorage(STORAGE_KEYS.published, publishedData); }, [hydrated, publishedData]);
  useEffect(() => { if (hydrated) saveStorage(STORAGE_KEYS.draft, draftData); }, [hydrated, draftData]);
  useEffect(() => { if (hydrated) saveStorage(STORAGE_KEYS.enquiries, enquiries); }, [hydrated, enquiries]);
  useEffect(() => { if (hydrated) saveStorage(STORAGE_KEYS.media, mediaLibrary); }, [hydrated, mediaLibrary]);
  useEffect(() => { if (hydrated) saveStorage(STORAGE_KEYS.members, members); }, [hydrated, members]);
  useEffect(() => { if (hydrated) saveStorage(STORAGE_KEYS.analytics, analytics); }, [hydrated, analytics]);
  useEffect(() => { if (hydrated) saveStorage(STORAGE_KEYS.adminSession, adminSession); }, [hydrated, adminSession]);
  useEffect(() => { if (hydrated) saveStorage(STORAGE_KEYS.memberSession, memberSession); }, [hydrated, memberSession]);

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    setToast({ message, type });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  const trackPageView = useCallback((path: string) => {
    if (!hydratedRef.current) {
      pendingViews.current.push(path);
      return;
    }
    const visitorId = getOrCreateVisitorId();
    setAnalytics((prev) => addView(prev, path, visitorId));
  }, []);

  const publishDraftToPublic = () => {
    setPublishedData(structuredClone(draftData));
    showToast("CMS changes published live to public website!");
  };

  const publishCollection = <K extends CollectionKey>(key: K, items: SiteContent[K]) => {
    setDraftData((prev) => ({ ...prev, [key]: items }));
    setPublishedData((prev) => ({ ...prev, [key]: items }));
  };

  const publishContactInfo = (info: ContactInfo) => {
    setDraftData((prev) => ({ ...prev, contactInfo: { ...info } }));
    setPublishedData((prev) => ({ ...prev, contactInfo: { ...info } }));
  };

  const resetToDefaultSeed = () => {
    setDraftData(createDefaultContent());
    setPublishedData(createDefaultContent());
    showToast("All CMS content reset to factory seed data!", "info");
  };

  const addEnquiry = (newEnq: NewEnquiry) => {
    const item: Enquiry = {
      id: "enq-" + Date.now(),
      createdAt: new Date().toLocaleString(),
      status: "Pending",
      notes: "",
      ...newEnq,
    };
    setEnquiries((prev) => [item, ...prev]);
    showToast("Your enquiry has been successfully logged!");
    return item;
  };

  const updateEnquiryStatus = (id: string, status: string, notes?: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status, notes: notes !== undefined ? notes : e.notes } : e)),
    );
    showToast(`Enquiry ${id} updated.`);
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    showToast("Enquiry record removed.");
  };

  const exportBackupJSON = () => {
    const backup = { publishedData, draftData, enquiries, members, mediaLibrary, exportedAt: new Date().toISOString() };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", jsonStr);
    a.setAttribute("download", `rhino_gym_backup_${Date.now()}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Backup JSON downloaded successfully!");
  };

  const importBackupJSON = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.publishedData) setPublishedData(data.publishedData);
      if (data.draftData) setDraftData(data.draftData);
      if (data.enquiries) setEnquiries(data.enquiries);
      if (data.members) setMembers(data.members);
      if (data.mediaLibrary) setMediaLibrary(data.mediaLibrary);
      showToast("Data imported and restored successfully!");
      return true;
    } catch {
      showToast("Failed to import JSON: Invalid file format.", "error");
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        hydrated,
        publishedData,
        draftData,
        setDraftData,
        publishDraftToPublic,
        publishCollection,
        publishContactInfo,
        resetToDefaultSeed,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        mediaLibrary,
        setMediaLibrary,
        members,
        setMembers,
        analytics,
        trackPageView,
        adminSession,
        setAdminSession,
        memberSession,
        setMemberSession,
        exportBackupJSON,
        importBackupJSON,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
