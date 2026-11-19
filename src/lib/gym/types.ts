export interface Program {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc?: string;
  purpose?: string;
  whoItSuits?: string;
  approach?: string;
  benefits?: string[];
  considerations?: string;
  beginnerAdvice?: string;
  published: boolean;
  image: string;
}

export interface Facility {
  id: string;
  name: string;
  category: string;
  desc: string;
  published: boolean;
  image: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  duration: string;
  price: string;
  isCustomPrice?: boolean;
  recommended: boolean;
  published: boolean;
  benefits: string[];
}

export interface Trainer {
  id: string;
  name: string;
  designation: string;
  spec: string;
  experience: string;
  bio: string;
  qualifications: string[];
  published: boolean;
  isDemo?: boolean;
  image: string;
}

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  title: string;
  category: string;
  trainer: string;
  sessionType: string;
  description?: string;
  published: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
  published: boolean;
}

export interface Faq {
  id: string;
  category: string;
  q: string;
  a: string;
  published: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  image: string;
  published: boolean;
  isDemo?: boolean;
}

export interface HomepageCms {
  heroHeading: string;
  heroSubtitle: string;
  heroImage: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  manifestoText: string;
  aboutHeadline: string;
  aboutBody: string;
  journeyTitle: string;
  showJourneySection: boolean;
  showFacilitiesSection: boolean;
  showTrainersSection: boolean;
  showTestimonialsSection: boolean;
}

export interface AboutCms {
  headline: string;
  subheadline: string;
  mission: string;
  vision: string;
  philosophy: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
  email: string;
  hours: string;
  /** Map pin latitude (decimal degrees, as text so the admin form can edit it). */
  mapLat?: string;
  /** Map pin longitude (decimal degrees). */
  mapLng?: string;
  /** Optional Google Maps link (e.g. the gym's Google listing). When set, "Get Directions" opens it. */
  mapsLink?: string;
}

export interface SiteContent {
  programs: Program[];
  facilities: Facility[];
  memberships: MembershipPlan[];
  trainers: Trainer[];
  schedule: ScheduleItem[];
  gallery: GalleryItem[];
  faqs: Faq[];
  testimonials: Testimonial[];
  homepage: HomepageCms;
  about: AboutCms;
  contactInfo: ContactInfo;
}

/** Collections inside SiteContent that are arrays (editable lists in the admin). */
export type CollectionKey =
  | "programs"
  | "facilities"
  | "memberships"
  | "trainers"
  | "schedule"
  | "gallery"
  | "faqs"
  | "testimonials";

export interface Enquiry {
  id: string;
  type: string;
  planName: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
  notes: string;
}

export type NewEnquiry = Pick<Enquiry, "type" | "planName" | "name" | "phone" | "email" | "message">;

export interface MediaItem {
  id: string;
  title: string;
  category: string;
  url: string;
  alt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  goal?: string;
  activePlan?: string;
  joinedDate?: string;
}

export interface Analytics {
  pageViews: number;
  uniqueVisitors: string[];
  routeHits: Record<string, number>;
  dailyVisits: { date: string; views: number }[];
}

export interface AdminSession {
  email: string;
  role: string;
  token: string;
}

export interface Toast {
  message: string;
  type: "success" | "error" | "info";
}
