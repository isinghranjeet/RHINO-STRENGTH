// Starting content for the site. Admin edits are layered on top of this in the browser.
import { BRAND } from "./brand";
import type {
  AboutCms, Analytics, Enquiry, Facility, Faq, GalleryItem, HomepageCms, MediaItem, Member,
  MembershipPlan, Program, ScheduleItem, SiteContent, Testimonial, Trainer,
} from "./types";

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    title: 'Strength Training',
    category: 'Strength',
    shortDesc: 'Build foundational strength with classic compound movements and progressive overload principles.',
    fullDesc: 'Our Strength Training program is engineered for athletes and fitness enthusiasts who want to maximize absolute raw power, muscular density, and skeletal strength. Rooted in proven powerlifting and strongman methodologies, this curriculum focuses on the big three movements (squat, bench, deadlift) along with overhead pressing and functional accessory work.',
    purpose: 'Systematically increase max strength, neuromuscular efficiency, and joint stability.',
    whoItSuits: 'Beginners learning barbell mechanics up to competitive powerlifters.',
    approach: 'Periodized linear progression with strict coaching on form and bar path execution.',
    benefits: ['Increased bone density', 'Maximal power output', 'Improved posture and core stability', 'High metabolic demand'],
    considerations: 'Requires disciplined warmup routines and adequate recovery intervals.',
    beginnerAdvice: 'Start with technique-only barbell sessions before adding velocity or weight load.',
    published: true,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-2',
    title: 'Weight Training',
    category: 'Muscle',
    shortDesc: 'Hypertrophy-focused resistance workouts tailored for optimal muscle isolation and aesthetic development.',
    fullDesc: 'Transform your physique with targeted multi-angle isolation exercises and mechanical tension principles. Designed to target specific muscle groups per session to foster symmetry, muscle hypertrophy, and body sculpting.',
    purpose: 'Stimulate muscular hypertrophy, physique symmetry, and localized muscle endurance.',
    whoItSuits: 'Individuals striving for aesthetic physique transformation, bodybuilding, or tone.',
    approach: 'Targeted split routines utilizing dumbbells, heavy cables, and specialized plate-loaded machinery.',
    benefits: ['Symmetrical muscle development', 'Enhanced metabolic rate', 'Targeted muscle sculpting'],
    considerations: 'High volume output requires consistent protein nutrition and sleep schedule.',
    beginnerAdvice: 'Focus on time under tension rather than ego-lifting heavy weights.',
    published: true,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-3',
    title: 'Cardio Training',
    category: 'Cardio',
    shortDesc: 'High-energy cardiovascular conditioning to enhance lung capacity, stamina, and fat oxidation.',
    fullDesc: 'Elevate your heart rate and build unbreakable aerobic endurance. Combining steady-state Zone 2 training with high-intensity interval sprints on commercial treadmills, air bikes, and rowing ergs.',
    purpose: 'Optimize cardiovascular wellness, resting heart rate, and aerobic endurance capacity.',
    whoItSuits: 'Anyone seeking endurance improvement, cardiovascular health, or rapid calorie burn.',
    approach: 'Scientific heart-rate zone tracking paired with variable speed and incline intervals.',
    benefits: ['Enhanced stamina', 'Lower resting heart rate', 'High calorie output per hour'],
    considerations: 'Proper footwear and hydration are essential to protect joint impact.',
    beginnerAdvice: 'Begin with 20-minute steady state walks on inclined treadmills.',
    published: true,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-4',
    title: 'Muscle Building',
    category: 'Muscle',
    shortDesc: 'Advanced hypertrophy programming for maximum lean mass retention and structural size gain.',
    fullDesc: 'A rigorous blueprint for dedicated lifters looking to break past plateaus and pack on high-quality lean muscle tissue through metabolic stress, muscle damage, and mechanical strain.',
    purpose: 'Accelerated lean muscle volume and physical stature expansion.',
    whoItSuits: 'Intermediate to advanced lifters looking for structured hypertrophy cycles.',
    approach: 'High-volume hypertrophy protocols with controlled eccentric tempos and drop sets.',
    benefits: ['Maximum muscle mass', 'Greater strength capacity', 'Increased joint resilience'],
    considerations: 'Requires strict caloric surplus and protein intake management.',
    beginnerAdvice: 'Master basic compound mechanics first before introducing drop-sets.',
    published: true,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-5',
    title: 'Fat Loss & Conditioning',
    category: 'Fat Loss',
    shortDesc: 'Metabolic circuit training engineered to burn body fat while preserving hard-earned lean muscle mass.',
    fullDesc: 'Combines kettlebell complexes, bodyweight calisthenics, sled pulls, and short intense cardio spurts. Designed to keep excess post-exercise oxygen consumption (EPOC) burning long after your workout ends.',
    purpose: 'Maximize body re-composition by shedding fat store reserves while protecting lean tissue.',
    whoItSuits: 'Goal-driven members looking for effective fat loss and metabolic efficiency.',
    approach: 'Metabolic conditioning circuits with minimal rest periods and dynamic functional movements.',
    benefits: ['Rapid fat oxidation', 'Enhanced work capacity', 'Boosted metabolic baseline'],
    considerations: 'Can be demanding; monitor recovery and nutrition closely.',
    beginnerAdvice: 'Pace yourself through the circuits; speed comes with improved conditioning.',
    published: true,
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-6',
    title: 'Personal Training',
    category: 'Personal',
    shortDesc: '1-on-1 customized coaching, form corrections, nutritional guidance, and direct accountability.',
    fullDesc: 'Work side-by-side with Lakhimpurs elite strength coaches. Every single rep, set, nutrition target, and mobility drills are personalized specifically for your biomechanics and individual goals.',
    purpose: 'Accelerate results through bespoke program design and real-time elite coaching guidance.',
    whoItSuits: 'Busy professionals, total beginners, or lifters needing specialized corrective coaching.',
    approach: 'Comprehensive mobility, strength testing, customized plan execution, and weekly check-ins.',
    benefits: ['100% custom plan', 'Form error elimination', 'Maximum accountability and safety'],
    considerations: 'Requires commitment to scheduled coach sessions.',
    beginnerAdvice: 'Be honest about your routine and history so your coach can build the perfect starter routine.',
    published: true,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-7',
    title: 'Functional Fitness',
    category: 'Functional',
    shortDesc: 'Movement-based athletic training using kettlebells, medicine balls, rings, and turf sleds.',
    fullDesc: 'Develop real-world athleticism, core rotation power, balance, and agility. Build a bulletproof body capable of handling physical challenges inside and outside the gym environment.',
    purpose: 'Improve athletic mobility, balance, unilateral strength, and multi-planar movement.',
    whoItSuits: 'Recreational athletes, active adults, and individuals seeking balanced physical longevity.',
    approach: 'Unilateral movements, core stabilization work, plyometrics, and functional carry patterns.',
    benefits: ['Reduced risk of injury in daily life', 'Enhanced agility', 'Balanced posture and core power'],
    considerations: 'Emphasizes coordination and mobility alongside pure strength.',
    beginnerAdvice: 'Focus on balance and rotational core control before increasing velocity.',
    published: true,
    image: 'https://images.unsplash.com/photo-1517931524326-bdd55a541177?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prog-8',
    title: 'General Fitness & Longevity',
    category: 'General',
    shortDesc: 'A holistic workout discipline built for overall health maintenance, joint mobility, and energy.',
    fullDesc: 'A balanced blend of moderate resistance, mobility work, light cardio, and joint rehabilitation exercises designed for continuous lifelong vitality and energy management.',
    purpose: 'Sustain long-term vitality, joint flexibility, energy levels, and stress relief.',
    whoItSuits: 'Anyone desiring a sustainable, low-friction fitness habit without extreme fatigue.',
    approach: 'Full-body split routines 3 to 4 days per week with moderate intensity and core mobility work.',
    benefits: ['Consistent daily energy', 'Reduced joint stiffness', 'Stress relief and mental wellness'],
    considerations: 'Consistency matters more than intensity in this program.',
    beginnerAdvice: 'Aim for 3 consistent days every single week to build a lifelong habit.',
    published: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    name: 'Heavy Duty Strength Floor',
    category: 'Strength',
    desc: 'Equipped with heavy power racks, Olympic competition lifting platforms, rubber bumper plates, specialized barbells (Trap bar, Safety Squat bar), and heavy dumbbell racks up to 50kg.',
    published: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-2',
    name: 'Precision Machine Zone',
    category: 'Equipment',
    desc: 'Commercial-grade pin-loaded and plate-loaded isolation machines for targeted lat pull-downs, chest presses, hack squats, leg extensions, and seated rows.',
    published: true,
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-3',
    name: 'Cardiovascular Deck',
    category: 'Cardio',
    desc: 'Air-conditioned cardio suite featuring heavy-duty commercial treadmills, elliptical trainers, spin bikes, and Concept2 rowing machines with dynamic monitors.',
    published: true,
    image: 'https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-4',
    name: 'Functional Turf & Kettlebell Arena',
    category: 'Functional',
    desc: 'High-density artificial turf strip dedicated to sled pushes/pulls, kettlebell complexes, plyometric box jumps, battle ropes, and mobility dynamic warmups.',
    published: true,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-5',
    name: 'Private Personal Training Studio',
    category: 'Personal',
    desc: 'Dedicated private coaching space for 1-on-1 client assessment, body composition measurement, mobility screening, and focused coaching sessions.',
    published: true,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-6',
    name: 'Locker Rooms & Hydration Bar',
    category: 'Amenities',
    desc: 'Clean, sanitized changing rooms with secure key lockers, modern shower stalls, filtered water hydration stations, and member resting lounge.',
    published: true,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_MEMBERSHIPS: MembershipPlan[] = [
  {
    id: 'mem-1',
    name: 'Monthly Pass',
    duration: '1 Month',
    price: 'PRICE ON REQUEST',
    isCustomPrice: true,
    recommended: false,
    published: true,
    benefits: [
      'Full Gym Floor & Strength Zone Access',
      'Locker & Hydration Access',
      'Initial Fitness Assessment',
      'Standard Member Support'
    ]
  },
  {
    id: 'mem-2',
    name: 'Quarterly Commitment',
    duration: '3 Months',
    price: 'PRICE ON REQUEST',
    isCustomPrice: true,
    recommended: true,
    published: true,
    benefits: [
      'Full Gym Floor & Strength Zone Access',
      'Customized Starter Workout Plan',
      '1 Free Personal Coaching Session',
      'Locker & Hydration Access',
      'Priority Member Support'
    ]
  },
  {
    id: 'mem-3',
    name: 'Half-Yearly Pass',
    duration: '6 Months',
    price: 'PRICE ON REQUEST',
    isCustomPrice: true,
    recommended: false,
    published: true,
    benefits: [
      'Unrestricted Access 7 Days / Week',
      'Full Customized Workout Blueprint',
      '2 Free Personal Coaching Sessions',
      'Nutrition Guidance Consultation',
      'Guest Pass Privilege (1/month)'
    ]
  },
  {
    id: 'mem-4',
    name: 'Annual Champion Membership',
    duration: '12 Months',
    price: 'PRICE ON REQUEST',
    isCustomPrice: true,
    recommended: false,
    published: true,
    benefits: [
      'Unrestricted VIP Access All Year',
      'Complete Personalized Training Blueprint',
      'Monthly Body Composition Assessments',
      '4 Free Personal Coaching Sessions',
      'Free Rhino Gym Official Merch T-Shirt',
      'Priority Trainer Consultation'
    ]
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'tr-1',
    name: 'Vikram Sharma',
    designation: 'Head Strength & Powerlifting Coach',
    spec: 'Powerlifting & Barbell Strength',
    experience: '8+ Years Experience',
    bio: 'Certified strength and conditioning specialist with years of competition experience in powerlifting. Specializes in barbell technique refinement, periodization, and building absolute strength.',
    qualifications: ['NSCA Certified Strength Specialist', 'State Powerlifting Gold Medalist', 'CPR/AED Certified'],
    published: true,
    isDemo: true,
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tr-2',
    name: 'Ananya Dutta',
    designation: 'Senior Hypertrophy & Body Recomp Specialist',
    spec: 'Muscle Building & Fat Loss',
    experience: '6+ Years Experience',
    bio: 'Dedicated to helping members achieve lean body transformations through metric-driven hypertrophic training and sustainable lifestyle modifications.',
    qualifications: ['ACE Certified Personal Trainer', 'Sports Nutrition Certified', 'Functional Fitness Level 2'],
    published: true,
    isDemo: true,
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tr-3',
    name: 'Rahul Baruah',
    designation: 'Functional Conditioning Coach',
    spec: 'Athletic Conditioning & Mobility',
    experience: '5+ Years Experience',
    bio: 'Focuses on functional movement screens, rotational core strength, agility, and joint longevity so members perform at their peak inside and outside the gym.',
    qualifications: ['Kettlebell Master Instructor', 'Functional Movement Screen (FMS) L1', 'Rehab Mobility Coach'],
    published: true,
    isDemo: true,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  { id: 'sch-1', day: 'Monday', time: '06:00 AM - 07:30 AM', title: 'Heavy Barbell Strength', category: 'Strength', trainer: 'Vikram Sharma', sessionType: 'Morning Session', published: true },
  { id: 'sch-2', day: 'Monday', time: '05:30 PM - 07:00 PM', title: 'Hypertrophy Upper Body', category: 'Muscle', trainer: 'Ananya Dutta', sessionType: 'Evening Session', published: true },
  { id: 'sch-3', day: 'Tuesday', time: '06:30 AM - 07:30 AM', title: 'HIIT & Fat Loss Conditioning', category: 'Cardio', trainer: 'Rahul Baruah', sessionType: 'Morning Session', published: true },
  { id: 'sch-4', day: 'Tuesday', time: '06:00 PM - 07:30 PM', title: 'Legs & Core Sculpting', category: 'Muscle', trainer: 'Ananya Dutta', sessionType: 'Evening Session', published: true },
  { id: 'sch-5', day: 'Wednesday', time: '06:00 AM - 07:30 AM', title: 'Deadlift & Posterior Chain', category: 'Strength', trainer: 'Vikram Sharma', sessionType: 'Morning Session', published: true },
  { id: 'sch-6', day: 'Wednesday', time: '05:30 PM - 07:00 PM', title: 'Functional Turf Circuit', category: 'Functional', trainer: 'Rahul Baruah', sessionType: 'Evening Session', published: true },
  { id: 'sch-7', day: 'Thursday', time: '06:30 AM - 07:30 AM', title: 'Cardio & Stamina Blast', category: 'Cardio', trainer: 'Rahul Baruah', sessionType: 'Morning Session', published: true },
  { id: 'sch-8', day: 'Thursday', time: '06:00 PM - 07:30 PM', title: 'Push / Pull Hypertrophy', category: 'Muscle', trainer: 'Ananya Dutta', sessionType: 'Evening Session', published: true },
  { id: 'sch-9', day: 'Friday', time: '06:00 AM - 07:30 AM', title: 'Bench Press & Chest Power', category: 'Strength', trainer: 'Vikram Sharma', sessionType: 'Morning Session', published: true },
  { id: 'sch-10', day: 'Friday', time: '05:30 PM - 07:00 PM', title: 'Metabolic Fat Burn', category: 'Fat Loss', trainer: 'Rahul Baruah', sessionType: 'Evening Session', published: true },
  { id: 'sch-11', day: 'Saturday', time: '07:00 AM - 09:00 AM', title: 'Weekend Heavy Open Lifting', category: 'Strength', trainer: 'Vikram Sharma', sessionType: 'Morning Session', published: true },
  { id: 'sch-12', day: 'Sunday', time: '07:00 AM - 10:00 AM', title: 'Active Recovery & Mobility', category: 'General', trainer: 'Rahul Baruah', sessionType: 'Morning Session', published: true }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  { id: 'gal-1', title: 'Lakhimpur Gym Main Floor', category: 'Interior', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', caption: 'Spacious, high-ventilation training floor with professional rubber matting.', published: true },
  { id: 'gal-2', title: 'Heavy Barbell Racks', category: 'Equipment', image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80', caption: 'Heavy-duty commercial power racks and Olympic bars.', published: true },
  { id: 'gal-3', title: 'Deadlift Platform Action', category: 'Strength', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80', caption: 'Dedicated deadlifting platforms designed for high impact load.', published: true },
  { id: 'gal-4', title: 'Cardio Treadmill Section', category: 'Cardio', image: 'https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=800&q=80', caption: 'State of the art cardio deck with heart-rate tracking.', published: true },
  { id: 'gal-5', title: 'Dumbbell Rack Lineup', category: 'Equipment', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80', caption: 'Solid steel dumbbells ranging from 2.5kg to 50kg.', published: true },
  { id: 'gal-6', title: 'Rhino Athletic Environment', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=800&q=80', caption: 'Empowering atmosphere where discipline meets performance.', published: true }
];

export const INITIAL_FAQS: Faq[] = [
  { id: 'faq-1', category: 'Membership', q: 'What are the gym operating hours at Lakhimpur?', a: 'RHINO STRENGTH GYM is open Monday through Saturday from 5:30 AM to 10:00 PM, and on Sundays for morning open sessions from 7:00 AM to 12:00 PM.', published: true },
  { id: 'faq-2', category: 'Membership', q: 'How do I enquire about membership pricing?', a: 'Membership fees are provided on request to match individual training requirements. You can submit an enquiry form on our Membership page or message us directly on WhatsApp (+91 93958 27174).', published: true },
  { id: 'faq-3', category: 'Beginners', q: 'I am a complete beginner to barbell training. Is Rhino Gym suitable for me?', a: 'Absolutely. We pride ourselves on welcoming lifters of all experience levels. Our coaches guide you through proper biomechanics, warmups, and progressive resistance from day one.', published: true },
  { id: 'faq-4', category: 'Training', q: 'Do you provide customized workout plans?', a: 'Yes. Every continuous membership tier includes an initial fitness consultation and starter workout guidance tailored to your specific physical objectives.', published: true },
  { id: 'faq-5', category: 'Personal Training', q: 'Is 1-on-1 Personal Training available?', a: 'Yes, we offer dedicated 1-on-1 personal coaching with certified trainers for focused form correction, customized split plans, and direct accountability.', published: true },
  { id: 'faq-6', category: 'Facilities', q: 'Where is RHINO STRENGTH GYM located?', a: 'We are located on the 1st Floor of the PD Enterprise Building, KB Road, Lakhimpur, Assam – 787001, India.', published: true },
  { id: 'faq-7', category: 'Facilities', q: 'Are there locker facilities and showers available?', a: 'Yes, we provide safe storage lockers, sanitized changing rooms, and clean shower facilities for all active members.', published: true },
  { id: 'faq-8', category: 'Membership', q: 'Can I pause or transfer my membership if I travel?', a: 'Membership pause options are available for quarterly, half-yearly, and yearly passes with advance notice to gym management.', published: true },
  { id: 'faq-9', category: 'Training', q: 'What gear or footwear should I bring for strength training?', a: 'Wear comfortable athletic attire and flat-soled non-marking training shoes (or flat sneakers) which are optimal for heavy squats and deadlifts.', published: true },
  { id: 'faq-10', category: 'Beginners', q: 'Will weight lifting make me bulky?', a: 'No. Muscle hypertrophy is a gradual process controlled by nutrition and targeted volume. Weight lifting primarily builds strong lean muscle, improves joint stability, and boosts fat burn.', published: true },
  { id: 'faq-11', category: 'Schedule', q: 'Do I need to pre-book workout slots?', a: 'No advance booking is required for standard gym floor training during operating hours. Personal coaching sessions are scheduled directly with your trainer.', published: true },
  { id: 'faq-12', category: 'Facilities', q: 'Is parking available at the building?', a: 'Yes, dedicated parking spaces for 2-wheelers and 4-wheelers are available near the PD Enterprise Building.', published: true },
  { id: 'faq-13', category: 'Membership', q: 'What payment modes are accepted for membership?', a: 'We accept UPI (GPay, PhonePe, Paytm), cash, bank transfers, and major credit/debit cards.', published: true },
  { id: 'faq-14', category: 'Personal Training', q: 'Can two friends train together in a personal training session?', a: 'Yes, we offer small group / dual coaching sessions for training partners at optimized packages.', published: true },
  { id: 'faq-15', category: 'Training', q: 'Are diet and nutrition plans included?', a: 'Basic macronutrient guidance and meal tips are included in standard memberships. Detailed custom sports diet plans are available through our Personal Training packages.', published: true },
  { id: 'faq-16', category: 'Beginners', q: 'What if I have a prior joint injury or medical condition?', a: 'We perform an initial mobility screening. Always inform our head coaches prior to lifting so movements can be modified safely.', published: true },
  { id: 'faq-17', category: 'Schedule', q: 'Are peak hours crowded?', a: 'Peak hours are typically 6:30 AM – 8:30 AM and 6:00 PM – 8:30 PM. Our floor layout is optimized with multi-rack stations to ensure minimal waiting time for equipment.', published: true },
  { id: 'faq-18', category: 'Facilities', q: 'Is the gym air-conditioned?', a: 'Yes, the main training zones, cardio deck, and studio are climate-controlled for optimal comfort year-round.', published: true },
  { id: 'faq-19', category: 'Contact', q: 'How can I contact gym management directly?', a: 'You can call or WhatsApp us directly at +91 93958 27174 or visit us on KB Road during open hours.', published: true },
  { id: 'faq-20', category: 'Contact', q: 'Where can I see social media updates and photos?', a: 'Follow our official Instagram handle @rhino_strength_gym for regular workout tips, member highlights, and facility announcements.', published: true }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  { id: 't-1', name: 'Rohan Saikia', role: 'Rhino Member (1.5 Years)', rating: 5, text: 'Rhino Strength Gym completely changed my perception of fitness. The coaches do not compromise on bar path or biomechanics. I went from struggling with a 60kg squat to repping 140kg safely!', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', published: true, isDemo: true },
  { id: 't-2', name: 'Priya Gogoi', role: 'Rhino Member (8 Months)', rating: 5, text: 'The environment here is so respectful, focused, and motivating. No unnecessary distractions—just serious lifters and super supportive coaches who genuinely care about your safety.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', published: true, isDemo: true },
  { id: 't-3', name: 'Debajit Kalita', role: 'Rhino Member (2 Years)', rating: 5, text: 'Best gym facility in Lakhimpur hands down. Heavy-duty equipment, clean platforms, top cardio gear, and an energy that makes you want to lift heavier every single day.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', published: true, isDemo: true }
];

export const INITIAL_HOMEPAGE_CMS: HomepageCms = {
  heroHeading: 'BUILT. NOT. BORN.',
  heroSubtitle: 'Lakhimpurs premier strength and conditioning facility. Dedicated to hard work, raw strength, progressive discipline, and continuous physical evolution.',
  heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80',
  ctaPrimaryText: 'EXPLORE MEMBERSHIP',
  ctaSecondaryText: 'OUR PROGRAMS',
  manifestoText: 'NO SHORTCUTS. NO EXCUSES. JUST STRENGTH.',
  aboutHeadline: 'WHERE DISCIPLINE MEETS REAL RESULTS',
  aboutBody: 'RHINO STRENGTH GYM was founded with a singular purpose: to provide the serious lifting community in Lakhimpur with world-class strength equipment, knowledgeable coaching, and an environment free of fluff.',
  journeyTitle: 'YOUR FITNESS JOURNEY STARTS WITH A PLAN',
  showJourneySection: true,
  showFacilitiesSection: true,
  showTrainersSection: true,
  showTestimonialsSection: true
};

export const INITIAL_ABOUT_CMS: AboutCms = {
  headline: 'MORE THAN TRAINING. A WAY OF LIFE.',
  subheadline: 'We exist to help you build resilient physical strength, mental grit, and sustainable physical habits.',
  mission: 'To empower individuals in Lakhimpur and surrounding regions with scientific training methods, heavy-duty facility standards, and authentic fitness education.',
  vision: 'To be the benchmark strength and conditioning center in Assam, recognized for authentic athletic development and inclusive community support.',
  philosophy: 'Strength is earned repetition by repetition. We focus on master fundamentals, progressive overload, proper recovery, and consistent discipline above empty shortcuts.'
};

export const INITIAL_ENQUIRIES: Enquiry[] = [
  { id: 'enq-101', type: 'Membership Enquiry', planName: 'Quarterly Commitment', name: 'Arjun Das', phone: '+91 98765 43210', email: 'arjun.das@example.com', message: 'Interested in joining for 3 months. Would like a quick tour of the barbell floor.', status: 'Pending', createdAt: '2026-11-18 10:30 AM', notes: 'Call in the evening' },
  { id: 'enq-102', type: 'General Enquiry', planName: '-', name: 'Sneha Borgohain', phone: '+91 91234 56789', email: 'sneha.b@example.com', message: 'Do you offer morning personal training sessions between 6 AM and 7 AM?', status: 'Contacted', createdAt: '2026-11-17 04:15 PM', notes: 'Explained PT slots with Ananya' }
];

export const INITIAL_MEDIA: MediaItem[] = [
  { id: 'med-1', title: 'Strength Platform', category: 'Gym Floor', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80', alt: 'Powerlifting squat rack' },
  { id: 'med-2', title: 'Cardio Suite', category: 'Cardio', url: 'https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&w=800&q=80', alt: 'Commercial treadmills' },
  { id: 'med-3', title: 'Dumbbell Zone', category: 'Equipment', url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80', alt: 'Heavy dumbbells rack' }
];

export const DEFAULT_MEMBERS: Member[] = [
  { id: 'mem-user-1', name: 'Demo Member', email: 'member@rhinostrengthgym.com', phone: '+91 98765 00000', goal: 'Muscle Building & Strength', activePlan: 'Quarterly Commitment', joinedDate: '2026-10-01' },
];

export function createDefaultContent(): SiteContent {
  return structuredClone({
    programs: INITIAL_PROGRAMS,
    facilities: INITIAL_FACILITIES,
    memberships: INITIAL_MEMBERSHIPS,
    trainers: INITIAL_TRAINERS,
    schedule: INITIAL_SCHEDULE,
    gallery: INITIAL_GALLERY,
    faqs: INITIAL_FAQS,
    testimonials: INITIAL_TESTIMONIALS,
    homepage: INITIAL_HOMEPAGE_CMS,
    about: INITIAL_ABOUT_CMS,
    contactInfo: {
      address: BRAND.address,
      phone: BRAND.phone,
      whatsapp: BRAND.whatsapp,
      instagram: BRAND.instagram,
      instagramUrl: BRAND.instagramUrl,
      email: 'contact@rhinostrengthgym.com',
      hours: 'Mon-Sat: 5:30 AM - 10:00 PM | Sun: 7:00 AM - 12:00 PM',
      mapLat: BRAND.mapLat,
      mapLng: BRAND.mapLng,
      mapsLink: '',
    },
  });
}

export function createDefaultAnalytics(): Analytics {
  return {
    pageViews: 142,
    uniqueVisitors: [],
    routeHits: { '/': 65, '/programs': 28, '/membership': 25, '/about': 14, '/contact': 10 },
    dailyVisits: [
      { date: 'Nov 14', views: 18 },
      { date: 'Nov 15', views: 24 },
      { date: 'Nov 16', views: 19 },
      { date: 'Nov 17', views: 31 },
      { date: 'Nov 18', views: 22 },
      { date: 'Nov 19', views: 28 },
    ],
  };
}
