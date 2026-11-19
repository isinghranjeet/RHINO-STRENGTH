// Home page: assembled from existing sections + 10 enhanced homepage sections.
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Award,
  Clock,
  Dumbbell,
  Flame,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useGo } from "@/hooks/use-go";
import { HeroSection } from "@/components/home/HeroSection";
import { ManifestoBanner } from "@/components/home/ManifestoBanner";
import { AboutSnippet } from "@/components/home/AboutSnippet";
import { JourneySection } from "@/components/home/JourneySection";
import { ProgramsPreview } from "@/components/home/ProgramsPreview";
import { FacilitiesShowcase } from "@/components/home/FacilitiesShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LocationSection } from "@/components/home/LocationSection";
import { FinalCta } from "@/components/home/FinalCta";

interface TransformationStory {
  id: string;
  memberName: string;
  program: string;
  duration: string;
  resultSummary: string;
  quote: string;
  image?: string;
}

interface EquipmentZone {
  id: string;
  zone: string;
  subtitle: string;
  gear: string[];
  image?: string;
}

interface FitnessTip {
  id: string;
  category: "Strength" | "Nutrition" | "Recovery";
  title: string;
  advice: string;
}

interface HomepageExtras {
  whyChoose: { stat: string; title: string; detail: string }[];
  philosophyPillars: { step: string; title: string; description: string }[];
  transformations: TransformationStory[];
  membershipBenefits: {
    group: "Training & Floor Access" | "Coaching & Recovery Perks";
    points: string[];
  }[];
  workoutOfWeek: {
    title: string;
    focus: string;
    duration: string;
    level: string;
    drills: string[];
    coachNote: string;
  };
  equipmentZones: EquipmentZone[];
  fitnessTips: FitnessTip[];
  visitingHours: {
    schedule: string;
    bestWindow: string;
    peakWindow: string;
    visitAdvice: string;
  };
  communityHighlights: {
    tag: string;
    headline: string;
    description: string;
  }[];
  ctaBanner: {
    badge: string;
    heading: string;
    description: string;
  };
}

const DEFAULT_EXTRAS: HomepageExtras = {
  whyChoose: [
    {
      stat: "1-on-1 Form",
      title: "1. Why Choose Rhino Strength Gym",
      detail:
        "Dedicated strength floor in Lakhimpur built around safe biomechanics, honest coaching, and measurable weekly progression rather than crowded gym chaos.",
    },
    {
      stat: "Heavy Iron",
      title: "Purpose-Built Training Floor",
      detail:
        "Calibrated plates, solid power racks, free weights, and conditioning space designed so beginners and serious lifters can train without waiting endlessly.",
    },
    {
      stat: "Zero Fluff",
      title: "Focused, Disciplined Environment",
      detail:
        "Clean layout, structured batch timings, and a supportive lifting crowd that keeps you accountable long after New Year motivation fades.",
    },
  ],
  philosophyPillars: [
    {
      step: "01",
      title: "Progressive Overload First",
      description:
        "Sustainable strength and muscle come from tracking volume, load, and technique week after week—not random exhaustion.",
    },
    {
      step: "02",
      title: "Technique Before Ego Weights",
      description:
        "Full range of motion, braced core, and controlled eccentrics protect your joints and unlock real strength transfer.",
    },
    {
      step: "03",
      title: "Consistency Beats Intensity Spikes",
      description:
        "Showing up three to five days a week with a realistic plan outperforms extreme crash routines every single time.",
    },
    {
      step: "04",
      title: "Recovery Is Part of Training",
      description:
        "Sleep, hydration, and protein intake turn gym stress into adaptation—we coach recovery alongside every workout block.",
    },
  ],
  transformations: [
    {
      id: "story-1",
      memberName: "Aarav Bora",
      program: "Strength & Body Recomposition",
      duration: "16 Weeks",
      resultSummary: "-7.5 kg Fat · +45 kg Deadlift",
      quote:
        "Earlier I used to quit gyms within a month. At Rhino Strength, tracking every lift and getting real form cues changed my routine completely.",
    },
    {
      id: "story-2",
      memberName: "Nandini Gogoi",
      program: "Athletic Conditioning & Core",
      duration: "12 Weeks",
      resultSummary: "Stamina Up 2x · Stronger Posture",
      quote:
        "Long desk hours had left me stiff and low on energy. The structured conditioning and strength sessions helped me move pain-free all day.",
    },
    {
      id: "story-3",
      memberName: "Rohan Saikia",
      program: "Hypertrophy & Foundational Lifts",
      duration: "20 Weeks",
      resultSummary: "+5.2 kg Lean Mass · Consistent 4x/wk",
      quote:
        "No loud ego lifting or confusing fads—just clear targets, supportive trainers, and steady progress you can actually measure.",
    },
  ],
  membershipBenefits: [
    {
      group: "Training & Floor Access",
      points: [
        "Full access to strength racks, free weights, and conditioning zones",
        "Structured starter onboarding and baseline movement check",
        "Flexible morning and evening training windows",
        "Clear session planning so you never walk in without a goal",
      ],
    },
    {
      group: "Coaching & Recovery Perks",
      points: [
        "Practical guidance on warm-ups, mobility, and injury prevention",
        "Nutrition & hydration habits aligned with vegetarian and local diets",
        "Periodic progress check-ins to adjust intensity safely",
        "Member-only community sessions and milestone challenges",
      ],
    },
  ],
  workoutOfWeek: {
    title: "Lakhimpur Iron Gauntlet — Strength & Metcon",
    focus: "Posterior Chain + Upper Push + Conditioning",
    duration: "45 Mins",
    level: "Intermediate (Scalable)",
    drills: [
      "A1. Barbell or Trap-Bar Deadlift — 4 × 5 (RPE 7.5)",
      "A2. Incline Dumbbell Press — 4 × 8–10",
      "B1. Weighted Pull-Ups / Lat Pulldown — 3 × 10",
      "B2. 12-Min AMRAP: 12 Kettlebell Swings + 10 Push-Ups + 200m Jog",
    ],
    coachNote:
      "Rest 90–120s on heavy sets; keep crisp form on every rep during the conditioning AMRAP.",
  },
  equipmentZones: [
    {
      id: "strength-zone",
      zone: "Strength & Power Zone",
      subtitle:
        "Built for compound lifts, barbell mechanics, and progressive strength blocks.",
      gear: [
        "Heavy Squat & Power Racks",
        "Olympic Barbells & Calibrated Plates",
        "Adjustable Bench Stations",
        "Deadlift & Lifting Platform",
      ],
    },
    {
      id: "dumbbell-zone",
      zone: "Free Weights & Hypertrophy",
      subtitle:
        "Versatile dumbbell and cable setups for unilateral balance and targeted muscle work.",
      gear: [
        "Full Dumbbell Rack Lineup",
        "Cable Crossover & Pulley Stations",
        "Chest, Back & Leg Isolation Machines",
        "EZ Curl & Tricep Attachments",
      ],
    },
    {
      id: "conditioning-zone",
      zone: "Conditioning & Functional Floor",
      subtitle:
        "High-output cardio and athletic movement space for stamina, agility, and core.",
      gear: [
        "Treadmills & Air/Spin Bikes",
        "Kettlebells & Medicine Balls",
        "Battle Ropes & Plyo / Mobility Space",
        "Dynamic Warm-Up & Core Area",
      ],
    },
  ],
  fitnessTips: [
    {
      id: "tip-1",
      category: "Strength",
      title: "Leave 1–2 Reps in Reserve (RIR)",
      advice:
        "Stopping just shy of technical failure lets you accumulate high-quality sets across the week without burning out your joints or central nervous system.",
    },
    {
      id: "tip-2",
      category: "Nutrition",
      title: "Anchor Every Meal With Protein & Fiber",
      advice:
        "Pair quality protein sources (paneer, curd, lentils, soy, tofu, or shakes as needed) with whole grains and vegetables to stay full and support muscle repair.",
    },
    {
      id: "tip-3",
      category: "Recovery",
      title: "Prioritize 7–8 Hours of Sleep & Hydration",
      advice:
        "Dehydration and short sleep mimic poor strength and high effort. Start mornings with water and keep sleep timings consistent.",
    },
  ],
  visitingHours: {
    schedule: "Mon–Sat: 5:30 AM – 10:00 PM · Sun: 7:00 AM – 12:00 PM",
    bestWindow: "Mid-Morning (9:30 AM – 12:00 PM) & Afternoon (1:00 PM – 4:30 PM)",
    peakWindow: "Early Morning (6:30 AM – 8:30 AM) & Evening (6:00 PM – 8:30 PM)",
    visitAdvice:
      "First time visiting? Drop in during non-peak hours for a relaxed floor walkthrough and a quick chat with our team.",
  },
  communityHighlights: [
    {
      tag: "Lifting Brotherhood & Sisterhood",
      headline: "Respect on Every Rack",
      description:
        "Re-racking weights, wiping benches, and spotting a fellow lifter when needed—small habits that keep the floor welcoming for everyone.",
    },
    {
      tag: "Weekly Accountability",
      headline: "Train Alongside Driven Locals",
      description:
        "Students, working professionals, and fitness enthusiasts training side by side with shared focus and zero judgment.",
    },
    {
      tag: "Milestone Culture",
      headline: "Celebrating Every PR & Habit Streak",
      description:
        "Whether it is your first unassisted pull-up, a new personal best, or 30 days of showing up, every step counts here.",
    },
  ],
  ctaBanner: {
    badge: "RHINO STRENGTH GYM · LAKHIMPUR",
    heading: "Ready to Build Real Strength & Lasting Discipline?",
    description:
      "Choose a membership plan that fits your routine or reach out to book a gym visit and personal guidance.",
  },
};

export function HomePage() {
  const { publishedData, trackPageView } = useApp();
  const navigate = useGo();

  const hp = publishedData.homepage;
  const programs = publishedData.programs.filter((p) => p.published).slice(0, 8);
  const facilities = publishedData.facilities.filter((f) => f.published).slice(0, 6);
  const trainers = publishedData.trainers.filter((t) => t.published);
  const testimonials = publishedData.testimonials.filter((t) => t.published);

  // Pull optional CMS-managed extras if present on publishedData.homepage, else fallback cleanly
  const rawExtras = (
    publishedData.homepage as unknown as { extras?: Partial<HomepageExtras> }
  ).extras;

  const extras: HomepageExtras = {
    ...DEFAULT_EXTRAS,
    ...rawExtras,
    workoutOfWeek: {
      ...DEFAULT_EXTRAS.workoutOfWeek,
      ...rawExtras?.workoutOfWeek,
    },
    visitingHours: {
      ...DEFAULT_EXTRAS.visitingHours,
      ...rawExtras?.visitingHours,
      schedule:
        rawExtras?.visitingHours?.schedule ||
        publishedData.contact?.hours ||
        DEFAULT_EXTRAS.visitingHours.schedule,
    },
    ctaBanner: {
      ...DEFAULT_EXTRAS.ctaBanner,
      ...rawExtras?.ctaBanner,
    },
  };

  const [selectedStoryId, setSelectedStoryId] = useState(
    extras.transformations[0]?.id ?? ""
  );
  const [selectedZoneId, setSelectedZoneId] = useState(
    extras.equipmentZones[0]?.id ?? ""
  );
  const [selectedTipCategory, setSelectedTipCategory] = useState<
    "All" | "Strength" | "Nutrition" | "Recovery"
  >("All");

  useEffect(() => trackPageView("/"), [trackPageView]);

  const activeStory =
    extras.transformations.find((s) => s.id === selectedStoryId) ??
    extras.transformations[0];

  const activeZone =
    extras.equipmentZones.find((z) => z.id === selectedZoneId) ??
    extras.equipmentZones[0];

  const filteredTips =
    selectedTipCategory === "All"
      ? extras.fitnessTips
      : extras.fitnessTips.filter((t) => t.category === selectedTipCategory);

  return (
    <div className="bg-background text-white min-h-screen">
      {/* Existing Hero & Manifesto */}
      <HeroSection hp={hp} />
      <ManifestoBanner hp={hp} />

      {/* 1. Why Choose Rhino Strength Gym */}
      <section className="py-16 border-t border-zinc-900 bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                WHY CHOOSE RHINO STRENGTH
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                Built for Serious Training &amp; Real Results
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              Active coaching floor with {trainers.length} published coaches and
              structured programs tailored for sustainable progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extras.whyChoose.map((item, index) => (
              <div
                key={item.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-amber-500/50 transition-all duration-300 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-orange-400">
                    0{index + 1}
                  </span>
                  <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    {item.stat}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-white uppercase">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing About, Journey & Programs */}
      <AboutSnippet hp={hp} />
      {hp.showJourneySection && <JourneySection hp={hp} />}
      <ProgramsPreview programs={programs} />

      {/* 2. Our Training Philosophy (Editorial Numbered Rows — distinct from card grids) */}
      <section className="py-16 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500">
                OUR TRAINING PHILOSOPHY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Strength, Discipline &amp; Long-Term Progression
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                We coach fundamentals that compound over months and years—never
                short-lived fitness gimmicks.
              </p>
            </div>

            <div className="divide-y divide-zinc-800 border-t border-b border-zinc-800">
              {extras.philosophyPillars.map((pillar) => (
                <div
                  key={pillar.step}
                  className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
                >
                  <span className="md:col-span-2 text-sm font-black text-amber-400">
                    {pillar.step}
                  </span>
                  <h3 className="md:col-span-4 text-sm sm:text-base font-extrabold uppercase text-white">
                    {pillar.title}
                  </h3>
                  <p className="md:col-span-6 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Workout of the Week (Featured Challenge Strip) */}
      <section className="py-14 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-500/35 bg-gradient-to-r from-zinc-900 via-zinc-950 to-orange-950/20 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-400">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>WORKOUT OF THE WEEK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
                {extras.workoutOfWeek.title}
              </h2>
              <div className="flex flex-wrap gap-3 text-xs text-zinc-300">
                <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800">
                  Focus: <strong className="text-amber-400">{extras.workoutOfWeek.focus}</strong>
                </span>
                <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800">
                  Time: <strong>{extras.workoutOfWeek.duration}</strong>
                </span>
                <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800">
                  Level: <strong className="text-orange-400">{extras.workoutOfWeek.level}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {extras.workoutOfWeek.drills.map((drill) => (
                  <div
                    key={drill}
                    className="rounded-lg bg-black/50 border border-zinc-800/90 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200"
                  >
                    {drill}
                  </div>
                ))}
              </div>

              <p className="text-xs text-zinc-400">
                <strong className="text-zinc-200">Coach Note:</strong>{" "}
                {extras.workoutOfWeek.coachNote}
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => navigate("/schedule")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>View Weekly Schedule</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Facilities Showcase */}
      {hp.showFacilitiesSection && <FacilitiesShowcase facilities={facilities} />}

      {/* 6. Gym Equipment Showcase (Interactive Zone Switcher) */}
      {activeZone && (
        <section className="py-16 border-t border-zinc-900 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                  GYM EQUIPMENT SHOWCASE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
                  Training Zones &amp; Floor Gear
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {extras.equipmentZones.map((zone) => {
                  const active = zone.id === activeZone.id;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer ${
                        active
                          ? "bg-orange-500 text-white"
                          : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      {zone.zone}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 items-center">
              <div
                className={`${
                  activeZone.image ? "lg:col-span-7" : "lg:col-span-12"
                } space-y-4`}
              >
                <div className="inline-flex items-center gap-2 text-amber-400 font-extrabold uppercase text-sm">
                  <Dumbbell className="w-4 h-4 text-orange-400" />
                  <span>{activeZone.zone}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {activeZone.subtitle}
                </p>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {activeZone.gear.map((piece) => (
                    <span
                      key={piece}
                      className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100"
                    >
                      {piece}
                    </span>
                  ))}
                </div>
              </div>

              {activeZone.image && (
                <div className="lg:col-span-5 h-56 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                  <img
                    src={activeZone.image}
                    alt={activeZone.zone}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. Membership Benefits (Two-Column Split Matrix) */}
      <section className="py-16 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400">
              MEMBERSHIP BENEFITS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
              Everything Included With Your Membership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {extras.membershipBenefits.map((col) => (
              <div
                key={col.group}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-7 space-y-4"
              >
                <div className="flex items-center gap-2 text-amber-400 font-extrabold uppercase text-sm">
                  <Award className="w-4 h-4 text-orange-400" />
                  <span>{col.group}</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  {col.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Gym Transformation / Success Stories (Interactive Member Switcher) */}
      {activeStory && (
        <section className="py-16 border-t border-zinc-900 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                  TRANSFORMATION &amp; SUCCESS STORIES
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
                  Member Progress in Action
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {extras.transformations.map((story) => {
                  const isSelected = story.id === activeStory.id;
                  return (
                    <button
                      key={story.id}
                      type="button"
                      onClick={() => setSelectedStoryId(story.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-amber-500 text-black"
                          : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      {story.memberName}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {activeStory.image && (
                <div className="lg:col-span-4 h-60 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                  <img
                    src={activeStory.image}
                    alt={activeStory.memberName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={`${
                  activeStory.image ? "lg:col-span-8" : "lg:col-span-12"
                } space-y-4`}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30 font-bold">
                    {activeStory.program}
                  </span>
                  <span className="text-zinc-400 font-semibold">
                    {activeStory.duration}
                  </span>
                  <span className="text-amber-400 font-extrabold">
                    {activeStory.resultSummary}
                  </span>
                </div>

                <blockquote className="text-base sm:text-xl font-medium text-zinc-100 leading-relaxed">
                  “{activeStory.quote}”
                </blockquote>

                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                  — {activeStory.memberName}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Existing Testimonials */}
      {hp.showTestimonialsSection && (
        <TestimonialsSection testimonials={testimonials} />
      )}

      {/* 7. Fitness Tips & Expert Advice (Category Filter) */}
      <section className="py-16 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400">
                FITNESS TIPS &amp; EXPERT ADVICE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
                Smart Habits Outside &amp; Inside the Gym
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Strength", "Nutrition", "Recovery"] as const).map(
                (category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedTipCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors cursor-pointer ${
                      selectedTipCategory === category
                        ? "bg-amber-500 text-black"
                        : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-2.5"
              >
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-amber-400">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>{tip.category}</span>
                </div>
                <h3 className="text-base font-bold text-white">{tip.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {tip.advice}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Opening Hours & Best Time to Visit */}
      <section className="py-14 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-400">
                <Clock className="w-4 h-4" />
                <span>OPENING HOURS</span>
              </div>
              <h3 className="text-lg font-black uppercase text-white">
                Facility Timings
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {extras.visitingHours.schedule}
              </p>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-orange-400">
                <Activity className="w-4 h-4" />
                <span>BEST TIME TO VISIT</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Quiet / Steady Floor:</strong>{" "}
                {extras.visitingHours.bestWindow}
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">High-Energy Rush:</strong>{" "}
                {extras.visitingHours.peakWindow}
              </p>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>VISITOR GUIDANCE</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {extras.visitingHours.visitAdvice}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Community & Gym Lifestyle */}
      <section className="py-16 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              COMMUNITY &amp; GYM LIFESTYLE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
              Atmosphere, Drive &amp; Everyday Culture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extras.communityHighlights.map((item) => (
              <div
                key={item.headline}
                className="rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-black p-6 space-y-2.5"
              >
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-orange-400">
                  <Users className="w-3.5 h-3.5" />
                  <span>{item.tag}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {item.headline}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing Location & 10. Strong Call-to-Action Section */}
      <LocationSection />

      <section className="py-12 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-zinc-900 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                {extras.ctaBanner.badge}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {extras.ctaBanner.heading}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {extras.ctaBanner.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigate("/membership")}
                className="px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Join / View Plans
              </button>
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="px-6 py-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Visit or Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </div>
  );
}