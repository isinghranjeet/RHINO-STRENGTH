// Browser-only persistence helpers. Only call these after the app has mounted.

export const STORAGE_KEYS = {
  published: "rhino_published_content_v2",
  draft: "rhino_draft_content_v2",
  enquiries: "rhino_enquiries_v2",
  media: "rhino_media_v2",
  members: "rhino_members_v2",
  analytics: "rhino_analytics_v2",
  adminSession: "rhino_admin_session",
  memberSession: "rhino_member_session",
  visitorId: "rhino_visitor_id",
} as const;

export function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (err) {
    console.warn(`Error loading localStorage key "${key}":`, err);
    return fallback;
  }
}

export function saveStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error saving localStorage key "${key}":`, err);
  }
}

export function getOrCreateVisitorId() {
  let id = localStorage.getItem(STORAGE_KEYS.visitorId);
  if (!id) {
    id = "vis-" + Math.random().toString(36).substring(2, 9) + "-" + Date.now();
    localStorage.setItem(STORAGE_KEYS.visitorId, id);
  }
  return id;
}
