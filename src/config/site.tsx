import { images } from "./images";
import {
  Shield01Icon,
  SmileIcon,
  UserGroupIcon,
  CheckmarkBadge01Icon,
  Award01Icon,
  MicroscopeIcon,
  Hospital01Icon,
  Sofa01Icon,
  DentalToothIcon,
  DentalBracesIcon,
  DentalCareIcon,
  Sun01Icon,
  Calendar01Icon,
  Doctor01Icon,
  Invoice01Icon,
} from "hugeicons-react";


// =============================================================================
// Types
// =============================================================================

export interface ImageConfig {
  src: string;
  alt: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
}

export interface ClinicStatsConfig {
  yearsExperience: number;
  patientsTreated: string;
  patientsCount: number;
  satisfactionScore: number;
  rating: number;
  reviewsCount: number;
  certifiedDentists: number;
  treatmentsCompleted: number;
}

export interface ClinicComplianceConfig {
  footerBadge: string;
  formPrivacyNotice: string;
  formSecurityBadge: string;
  encryptionNotice: string;
}

export interface AccreditationConfig {
  id: string;
  name: string;
  code: string;
  credential: string;
  badgeType: "shield" | "diamond" | "align" | "implant" | "swiss" | "globe" | "nodes" | "zeiss";
  desc: string;
}

export interface MilestoneConfig {
  year: string;
  badge: string;
  title: string;
  desc: string;
  outcome: string;
  image: string;
  imageAlt: string;
}

export interface ClinicalPillarConfig {
  title: string;
  badge: string;
  desc: string;
  image: string;
  imageAlt: string;
  specs: { label: string; value: string }[];
}

export interface ArchitecturalPillarConfig {
  id: string;
  tabLabel: string;
  title: string;
  stat: string;
  desc: string;
  tag: string;
}

export interface ClinicConfig {
  name: string;
  tagline: string;
  logoLight: string;
  logoDark: string;
  favicon: string;
  ogImage: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
  yearsExperience: number;
  happyPatients: number;
  certifiedDentists: number;
  treatmentsCompleted: number;
  stats: ClinicStatsConfig;
  compliance: ClinicComplianceConfig;
  milestones?: MilestoneConfig[];
  clinicalPillars?: ClinicalPillarConfig[];
}

export interface ContactConfig {
  phone: string;
  email: string;
  address: string;
  hours: string;
  emergencyPhone: string;
  landmark: string;
  locationBadge: string;
  transitInfo: string;
  cityArea: string;
  /** Map pin coordinates used by the embedded location map. */
  mapCenter: { lat: number; lng: number };
  /** Optional custom map embed URL (e.g. from Google Maps embed). Defaults to dynamic OpenStreetMap. */
  mapEmbedUrl?: string;
}

export interface SocialConfig {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}

export interface HeroSlide {
  id: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  image: string;
  imageAlt: string;
  categoryName: string;
}

export interface HeroConfig {
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  specialistDescription?: string;
  ctaText: string;
  ctaTextPlain: string;
  secondaryCtaText: string;
  valuePoints?: string[];
  architecturalPillars?: ArchitecturalPillarConfig[];
}

export interface ServiceConfig {
  id: string;
  title: string;
  description: string;
  category: "Cosmetic" | "Restorative" | "Specialty" | "General";
  icon: React.ReactNode;
  image: string;
  detailTitle?: string;
  detailSubtitle?: string;
  detailBullets?: string[];
  processSteps?: { title: string; desc: string }[];
  faq?: { q: string; a: string }[];
  heroImage?: string;
  benefits?: { title: string; desc: string; icon: React.ReactNode }[];
  testimonials?: { id: number; text: string; author: string; rating: number; platform: string }[];
}

export interface DoctorConfig {
  id: string;
  name: string;
  role: string;
  image: string;
  qualifications: string;
  experience: string;
  specialty:
  | "Cosmetic"
  | "Implants"
  | "Orthodontics"
  | "Endodontics"
  | "Pediatric"
  | "General";
  specializations: string[];
  rating: number;
  reviews: number;
  heroImage?: string;
  philosophy?: string;
  credentials?: { year: string; title: string; desc: string }[];
  expertise?: { name: string; percent: number }[];
  testimonials?: { id: number; text: string; author: string; rating: number; platform: string }[];
  heroDescription?: string;
  demo: boolean;
}

export interface TestimonialConfig {
  id: number;
  name: string;
  treatment: string;
  text: string;
  rating: number;
  patientImage: string;
  beforeImage?: string;
  afterImage?: string;
  platform: string;
  demo: boolean;
}

export interface NavigationLink {
  name: string;
  href: string;
  newTab?: boolean;
}

export interface FooterNavigation {
  quickLinks: NavigationLink[];
  services: string[];
  contact: NavigationLink[];
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    type: "website" | "profile" | "article";
    url?: string;
    images: string[];
    siteName?: string;
  };
  twitter: {
    card: "summary" | "summary_large_image";
    title: string;
    description: string;
    images: string[];
  };
  canonical?: string;
  metadataBase?: string;
}

export interface FeatureConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface FormOption {
  value: string;
  label: string;
}

export interface FormConfig {
  bookingServices: FormOption[];
  contactInquiryTypes: FormOption[];
}

export interface JourneyStep {
  step?: string;
  title: string;
  description: string;
  note?: string;
  icon?: React.ReactNode;
}

export interface UIConfig {
  /**
   * Shows or hides the built-in template preview controls: the hero-style
   * dropdown and layout switchers inside the navbar (desktop and mobile
   * drawer), and the switcher bars on the About and Services pages.
   *
   * - `false` (default) — normal clinic presentation: visitors never see
   *   template-selection UI. All variants stay reachable by URL
   *   (`/?hero=booking`, `/about?view=timeline`, `/services?view=bento`).
   * - `true` — buyer/developer preview: the switcher controls appear so the
   *   available variants can be compared side by side.
   *
   * This is a plain content setting, not a security feature.
   */
  showTemplateSwitchers: boolean;
  /**
   * Shows a "Sample content" notice on testimonials flagged `demo: true`
   * (homepage and /testimonials).
   *
   * - `false` (default) — normal clinic presentation: no per-item badges, so
   *   placeholder reviews never look like intrusive warnings to real
   *   visitors. Sample content is identified in the documentation and,
   *   once real reviews are added, set their `demo` field to `false`.
   * - `true` — buyer/developer preview: every `demo: true` item is clearly
   *   marked so placeholder content is obvious while reviewing the template.
   *
   * This is a plain content setting, not a security feature.
   */
  showSampleContentNotices: boolean;
}

export interface SiteConfig {
  clinic: ClinicConfig;
  contact: ContactConfig;
  social: SocialConfig;
  hero: HeroConfig;
  services: ServiceConfig[];
  doctors: DoctorConfig[];
  testimonials: TestimonialConfig[];
  navigation: {
    header: NavigationLink[];
    footer: FooterNavigation;
  };
  seo: SEOConfig;
  features: FeatureConfig[];
  journey: JourneyStep[];
  forms: FormConfig;
  ui: UIConfig;
  awards: string[];
  accreditations: AccreditationConfig[];
  heroSlides: HeroSlide[];
}

// =============================================================================
// Default Values (extracted from current hardcoded components)
// =============================================================================

export const defaultSiteConfig: SiteConfig = {
  clinic: {
    name: "Lumina Dental Care",
    tagline: "Advanced Dentistry Designed Around Your Smile",
    logoLight: "/dental/Logo.png",
    logoDark: "/dental/dark-logo.png",
    favicon: "/dental/favicon.png",
    ogImage: "/dental/og-image.png",
    primaryColor: "#0F766E",
    secondaryColor: "#07142A",
    accentColor: "#14B8A6",
    backgroundColor: "#F8FAFC",
    foregroundColor: "#0F172A",
    yearsExperience: 15,
    happyPatients: 15000,
    certifiedDentists: 12,
    treatmentsCompleted: 25000,
    stats: {
      yearsExperience: 15,
      patientsTreated: "15,000+",
      patientsCount: 15000,
      satisfactionScore: 99.4,
      rating: 4.98,
      reviewsCount: 1250,
      certifiedDentists: 12,
      treatmentsCompleted: 25000,
    },
    compliance: {
      footerBadge: "Clinical Standards & Safety Compliant",
      formPrivacyNotice: "HIPAA-ready form structure. No upfront payment required.",
      formSecurityBadge: "Encrypted Form Structure",
      encryptionNotice: "256-bit SSL encrypted form structure",
    },
  },
  contact: {
    phone: "(555) 123-4567",
    email: "care@luminadental.com",
    address: "1234 Healthcare Ave, Suite 100\nMetropolitan City, MC 10001",
    landmark: "Metropolitan Medical Center, Suite 100",
    locationBadge: "Metropolitan Medical Center",
    transitInfo: "Transit: Accessible via Central Hub Station & on-site parking",
    cityArea: "Metropolitan Center",
    hours: "Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM",
    emergencyPhone: "(555) 123-4567",
    mapCenter: { lat: 40.758, lng: -73.9855 },
  },
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  },
  hero: {
    badge: "Comprehensive Multi-Specialty Dental Care",
    headline: "Advanced Dentistry.",
    headlineAccent: "Designed Around You.",
    description:
      "Advanced multi-specialty clinical care in private acoustic suites. From subtle cosmetic alignment to permanent implant restoration, experienced at your own pace with transparent written estimates.",
    specialistDescription:
      "Our specialists trained at leading accredited medical and dental institutions—and built Lumina around a different idea: that world-class dentistry should feel unhurried, human, and entirely yours.",
    ctaText: "Request Appointment",
    ctaTextPlain: "Request Appointment",
    secondaryCtaText: "Meet Our Specialists",
    valuePoints: [
      "Flexible Patient Financing & Clear Cost Estimates",
      "In-Network with Major PPO Dental Insurance Providers",
      "Digital 3D Scans & Gentle Laser Technology",
      "Same-Day Appointments Available 6 Days a Week",
    ],
    architecturalPillars: [
      {
        id: "acoustics",
        tabLabel: "01 / ACOUSTICS",
        title: "Acoustic Noise Neutralization",
        stat: "99.2% DAMPENED",
        desc: "Multi-layered acoustic soundproofing isolates drill vibration and high-pitch noise for total nervous system calm.",
        tag: "DECIBEL RATING: <32 dB",
      },
      {
        id: "air",
        tabLabel: "02 / AIR PURITY",
        title: "HEPA-14 Bi-Directional Air",
        stat: "12 AIR EXCHANGES/HR",
        desc: "Hospital-grade negative pressure filtration continuously purges aerosols and clinical scent from operatory suites.",
        tag: "AEROSOL CAPTURE: 99.97%",
      },
      {
        id: "optics",
        tabLabel: "03 / ERGONOMICS",
        title: "Zeiss 3D Microsurgical Suite",
        stat: "24X OPTICAL ZOOM",
        desc: "High-magnification surgical visualization ensures microscopic margin accuracy with minimal tissue disruption.",
        tag: "TOLERANCE: 0.02MM",
      },
    ],
  },
  heroSlides: [
    {
      id: "specialist",
      badge: "Accredited Clinical Faculty",
      headline: "The standard of care,",
      headlineAccent: "quietly redefined.",
      description:
        "Our specialists trained at leading accredited medical and dental institutions—and built Lumina around a different idea: that world-class dentistry should feel unhurried, human, and entirely yours.",
      primaryCtaText: "Book appointment",
      secondaryCtaText: "Meet the specialists",
      secondaryCtaHref: "/doctors",
      image: images.doctors["dr-sarah-jenkins"],
      imageAlt: "Dr. Sarah Jenkins and specialist team in operatory suite",
      categoryName: "Specialist Editorial",
    },
    {
      id: "cinematic",
      badge: "Precision Aesthetic Dentistry",
      headline: "Quietly extraordinary",
      headlineAccent: "dentistry.",
      description:
        "Sub-millimeter clinical precision paired with absolute nervous system calm. A private aesthetic sanctuary designed around your peace of mind and long-term oral health.",
      primaryCtaText: "Book appointment",
      secondaryCtaText: "Explore treatments",
      secondaryCtaHref: "/services",
      image: images.heroCinematic,
      imageAlt: "Lumina Dental private treatment suite with warm ambient lighting",
      categoryName: "Cinematic Film",
    },
    {
      id: "booking",
      badge: "Same-Day Suite Reservations",
      headline: "Same-day dental care.",
      headlineAccent: "Punctual & unhurried.",
      description:
        "Unhurried consultations with direct specialist review. Receive transparent itemized treatment estimates with zero sales pressure before any procedure begins.",
      primaryCtaText: "Book appointment",
      secondaryCtaText: "Call (555) 123-4567",
      secondaryCtaHref: "tel:(555) 123-4567",
      image: images.clinicInterior,
      imageAlt: "Lumina Dental consultation lounge and reception suite",
      categoryName: "Booking Concierge",
    },
    {
      id: "minimal",
      badge: "Swiss Prosthodontic Rigor",
      headline: "Dentistry, minus",
      headlineAccent: "the noise.",
      description:
        "3D intraoral digital planning with sub-millimeter 0.02mm margin tolerances. Biocompatible ceramic materials engineered for natural chewing biomechanics and lifetime resilience.",
      primaryCtaText: "Book appointment",
      secondaryCtaText: "Virtual clinic tour",
      secondaryCtaHref: "/about",
      image: images.heroSwissOperatory,
      imageAlt: "High-precision CAD/CAM dental operatory equipment",
      categoryName: "Minimal Swiss",
    },
    {
      id: "immersive",
      badge: "Acoustic Nervous System Sanctuary",
      headline: "Space to breathe.",
      headlineAccent: "Care to remember.",
      description:
        "Natural daylight, acoustic operatory suites, and a clinical team that treats the person before the tooth. Welcome to restorative dentistry without the sterile clinical edge.",
      primaryCtaText: "Book appointment",
      secondaryCtaText: "Patient stories",
      secondaryCtaHref: "/testimonials",
      image: images.heroArchitectural,
      imageAlt: "Architectural treatment suite with panoramic natural lighting",
      categoryName: "Spatial Sanctuary",
    },
  ],
  services: [
    {
      id: "cosmetic-dentistry",
      title: "Cosmetic Dentistry",
      description:
        "Transform your smile with custom porcelain veneers, cosmetic bonding, and personalized facial harmony design.",
      category: "Cosmetic",
      icon: <SmileIcon className="w-7 h-7" />,
      image: images.services["cosmetic-dentistry"],
      detailTitle: "Aesthetic Smile Transformation",
      detailSubtitle: "Ultra-thin porcelain veneers, bonding, and digital smile design",
      detailBullets: [
        "Digital preview before any treatment begins",
        "Hand-layered porcelain matched to your natural enamel",
        "Minimal preparation to protect natural tooth structure",
      ],
    },
    {
      id: "dental-implants",
      title: "Dental Implants",
      description:
        "Permanent, secure tooth replacement engineered with computer-guided surgical precision and lifelong durability.",
      category: "Restorative",
      icon: <DentalToothIcon className="w-7 h-7" />,
      image: images.services["dental-implants"],
      detailTitle: "Permanent Tooth Replacement",
      detailSubtitle: "3D-guided titanium implants with natural aesthetic crowns",
      detailBullets: [
        "Computer-guided 3D placement for minimal soreness",
        "Restores 100% natural chewing strength and stability",
        "Custom ceramic crown matched to surrounding teeth",
      ],
    },
    {
      id: "teeth-whitening",
      title: "Teeth Whitening",
      description:
        "Professional in-office laser whitening designed to lift deep stains safely without enamel sensitivity.",
      category: "Cosmetic",
      icon: <Sun01Icon className="w-7 h-7" />,
      image: images.services["teeth-whitening"],
      detailTitle: "Targeted Shade Brightening",
      detailSubtitle: "Safe, rapid lifting of tea, coffee, and age discoloration",
      detailBullets: [
        "Up to 8 shades brighter in a single 45-minute visit",
        "Desensitizing barrier gel protects gums and enamel",
        "Includes custom home touch-up trays and maintenance gel",
      ],
    },
    {
      id: "orthodontics",
      title: "Orthodontics & Clear Aligners",
      description:
        "Discreet, clear aligners and modern aesthetic orthodontics planned with digital 3D bite simulation.",
      category: "Specialty",
      icon: <DentalBracesIcon className="w-7 h-7" />,
      image: images.services["orthodontics"],
      detailTitle: "Precision Teeth Alignment",
      detailSubtitle: "Discreet clear aligners without wires or dietary restrictions",
      detailBullets: [
        "Virtually invisible aligners customized for comfortable wear",
        "Digital progress monitoring with fewer in-office visits",
        "Predictable treatment timelines tailored to your lifestyle",
      ],
    },
    {
      id: "general-dentistry",
      title: "General & Preventative Care",
      description:
        "Comprehensive health evaluations, gentle ultrasonic hygiene, and early cavity detection to protect long-term wellness.",
      category: "General",
      icon: <DentalCareIcon className="w-7 h-7" />,
      image: images.services["general-dentistry"],
      detailTitle: "Comprehensive Oral Health",
      detailSubtitle: "Gentle hygiene, digital imaging, and periodontal protection",
      detailBullets: [
        "Gentle ultrasonic cleanings that remove stubborn plaque",
        "Low-dose digital X-rays with immediate instant analysis",
        "Personalized home-care roadmap with zero judgment",
      ],
    },
    {
      id: "root-canal",
      title: "Root Canal Therapy",
      description:
        "Gentle endodontic treatment using rotary microsurgical instruments to eliminate tooth pain and save your natural tooth.",
      category: "Restorative",
      icon: <Shield01Icon className="w-7 h-7" />,
      image: images.services["root-canal"],
      detailTitle: "Gentle Endodontic Relief",
      detailSubtitle: "Same-day comfort and preservation of natural tooth root",
      detailBullets: [
        "Targeted local anesthesia for a quiet, painless visit",
        "Rotary micro-instruments ensure high-precision cleaning",
        "Protects the natural root and prevents extraction",
      ],
    },
    {
      id: "pediatric-dentistry",
      title: "Pediatric Dentistry",
      description:
        "Warm, reassuring dental visits for children and teens that build lifelong confidence and healthy oral habits.",
      category: "Specialty",
      icon: <UserGroupIcon className="w-7 h-7" />,
      image: images.services["pediatric-dentistry"],
      detailTitle: "Gentle Young Smile Care",
      detailSubtitle: "Fun, patient-paced visits for toddlers through teens",
      detailBullets: [
        "Paced to your child's comfort with friendly explanations",
        "Protective fluoride and sealant treatments against cavities",
        "Calm, welcoming suites that eliminate clinic intimidation",
      ],
    },
    {
      id: "oral-surgery",
      title: "Oral Surgery",
      description:
        "Specialist extractions, wisdom teeth care, and tissue grafting performed with sedation options and rapid-recovery protocols.",
      category: "Specialty",
      icon: <CheckmarkBadge01Icon className="w-7 h-7" />,
      image: images.services["oral-surgery"],
      detailTitle: "Specialist Surgical Procedures",
      detailSubtitle: "Comfort-first extractions and restorative surgical care",
      detailBullets: [
        "Twilight and conscious sedation options for complete calm",
        "Gentle wisdom tooth removal with minimal postoperative swelling",
        "Comprehensive written aftercare and 24/7 recovery support",
      ],
    },
  ],
  doctors: [
    {
      id: "dr-sarah-jenkins",
      name: "Dr. Sarah Jenkins",
      role: "Lead Cosmetic Dentist",
      image:
        images.doctors["dr-sarah-jenkins"],
      qualifications: "DDS, Advanced Dental Institute",
      experience: "15+ Years",
      specialty: "Cosmetic",
      specializations: ["Veneers", "Smile Makeovers", "Bonding"],
      rating: 5.0,
      reviews: 124,
      heroImage:
        images.doctors["dr-sarah-jenkins"],
      heroDescription: "Elevate your natural smile with ultra-thin porcelain veneers and facial aesthetic harmony.",
      demo: false,
      philosophy:
        "I believe aesthetic dentistry should enhance your natural facial architecture, not create artificial-looking teeth. Every veneer and smile makeover begins with listening to how you smile in real life.",
      credentials: [
        { year: "2010", title: "DDS, Advanced Dental Institute", desc: "Graduated with honors, focusing on restorative dentistry." },
        { year: "2013", title: "Specialization in Prosthodontics", desc: "Completed residency in advanced restorative clinical care." },
        { year: "2015", title: "Board Certification", desc: "National Board of Prosthodontics." },
      ],
      expertise: [
        { name: "Veneers", percent: 98 },
        { name: "Smile Makeovers", percent: 95 },
        { name: "Bonding", percent: 90 },
      ],
      testimonials: [
        {
          id: 1,
          text:
            "Dr. Jenkins designed porcelain veneers that match my natural tooth shade and translucency perfectly. I finally feel confident smiling in photos.",
          author: "Claire M.",
          rating: 5.0,
          platform: "Google",
        },
        {
          id: 2,
          text:
            "The 3D digital smile preview gave me complete peace of mind before we touched a single tooth. Truly remarkable artistry.",
          author: "Sarah W.",
          rating: 5.0,
          platform: "Yelp",
        },
        {
          id: 3,
          text:
            "Extremely gentle hand, incredible aesthetic eye, and a calm, reassuring operatory experience.",
          author: "James L.",
          rating: 5.0,
          platform: "Healthgrades",
        },
      ],
    },
    {
      id: "dr-michael-chen",
      name: "Dr. Michael Chen",
      role: "Implant Specialist",
      image:
        images.doctors["dr-michael-chen"],
      qualifications: "DMD, Premier Dental Medicine",
      experience: "12+ Years",
      specialty: "Implants",
      specializations: ["Dental Implants", "Oral Surgery", "Bone Grafting"],
      rating: 4.9,
      reviews: 89,
      heroImage:
        images.doctors["dr-michael-chen"],
      heroDescription: "Permanent, computer-guided dental implants restoring full chewing function and natural smile beauty.",
      demo: false,
      philosophy:
        "Computer-guided implantology eliminates guesswork. By mapping bone density and neural pathways in 3D prior to surgery, we minimize tissue trauma, accelerate healing, and ensure lifelong stability.",
      credentials: [
        { year: "2010", title: "DMD, Premier School of Dental Medicine", desc: "Graduated with honors, focusing on restorative dentistry." },
        { year: "2013", title: "Specialization in Prosthodontics", desc: "Completed fellowship in computer-guided surgical implantology." },
        { year: "2015", title: "Board Certification", desc: "National Board of Implantology." },
      ],
      expertise: [
        { name: "Dental Implants", percent: 98 },
        { name: "Cosmetic Dentistry", percent: 95 },
        { name: "Full Mouth Reconstruction", percent: 92 },
      ],
      testimonials: [
        {
          id: 1,
          text: "I was terrified of having an implant placed, but Dr. Chen's 3D-guided procedure was so precise I barely felt a thing during or after.",
          author: "Michael T.",
          rating: 5.0,
          platform: "Google",
        },
        {
          id: 2,
          text: "Regained my chewing strength completely. Eating steak and apples again feels like having my original teeth back.",
          author: "David K.",
          rating: 5.0,
          platform: "Yelp",
        },
        {
          id: 3,
          text:
            "Dr. Chen walked me through the 3D scan and itemized quote before starting. Zero surprise costs and flawless execution.",
          author: "Robert H.",
          rating: 5.0,
          platform: "Healthgrades",
        },
      ],
    },
    {
      id: "dr-emily-rodriguez",
      name: "Dr. Emily Rodriguez",
      role: "Orthodontist",
      image:
        images.doctors["dr-emily-rodriguez"],
      qualifications: "DDS, School of Orthodontics",
      experience: "10+ Years",
      specialty: "Orthodontics",
      specializations: ["Invisalign", "Clear Braces", "TMJ Treatment"],
      rating: 5.0,
      reviews: 156,
      heroImage:
        images.doctors["dr-emily-rodriguez"],
      heroDescription: "Discreet clear aligners and modern orthodontics for healthy alignment, balanced bites, and lifelong jaw comfort.",
      philosophy:
        "A straight smile is more than aesthetics—it protects your bite, jaw joints, and enamel wear for decades. We design discreet digital aligner paths tailored seamlessly around your professional and personal lifestyle.",
      demo: false,
      credentials: [
        { year: "2010", title: "DDS, Accredited School of Dentistry", desc: "Graduated with honors, focusing on orthodontics." },
        { year: "2013", title: "Specialization in Orthodontics", desc: "Completed specialist clinical residency." },
        { year: "2015", title: "Board Certification", desc: "National Board of Orthodontics." },
      ],
      expertise: [
        { name: "Invisalign", percent: 95 },
        { name: "Clear Braces", percent: 90 },
        { name: "TMJ Treatment", percent: 85 },
      ],
      testimonials: [
        {
          id: 1,
          text: "Finished my clear aligners in just 9 months with Dr. Rodriguez. The digital check-ins meant fewer clinic visits and total flexibility.",
          author: "Rachel B.",
          rating: 5.0,
          platform: "Google",
        },
        {
          id: 2,
          text: "Addressed my adult crowding without any noticeable braces. People didn't even realize I was wearing aligners.",
          author: "Daniel S.",
          rating: 5.0,
          platform: "Yelp",
        },
        {
          id: 3,
          text:
            "Helped relieve years of TMJ jaw clicking alongside straightening my teeth. Outstanding clinical care.",
          author: "Priya N.",
          rating: 5.0,
          platform: "Healthgrades",
        },
      ],
    },
    {
      id: "dr-james-wilson",
      name: "Dr. James Wilson",
      role: "Endodontist",
      image:
        images.doctors["dr-james-wilson"],
      qualifications: "DMD, Institute of Endodontics",
      experience: "8+ Years",
      specialty: "Endodontics",
      specializations: ["Root Canals", "Apicoectomy", "Dental Trauma"],
      rating: 4.8,
      reviews: 72,
      heroImage:
        images.doctors["dr-james-wilson"],
      heroDescription: "Painless, single-visit root canal therapy and microsurgical tooth preservation.",
      philosophy:
        "Tooth pain should never be endured. With computerized local anesthesia, acoustic suites, and rotary micro-instruments, root canal therapy is as quiet, comfortable, and routine as a simple filling.",
      demo: false,
      credentials: [
        { year: "2012", title: "DMD, Graduate Dental Center", desc: "Endodontics residency training." },
        { year: "2015", title: "Board Certification", desc: "National Board of Endodontics." },
      ],
      expertise: [
        { name: "Root Canals", percent: 95 },
        { name: "Apicoectomy", percent: 90 },
        { name: "Dental Trauma", percent: 85 },
      ],
      testimonials: [
        {
          id: 1,
          text: "Came in with excruciating toothache on a Tuesday morning. Dr. Wilson provided immediate relief, and the root canal was 100% painless.",
          author: "Marcus V.",
          rating: 5.0,
          platform: "Google",
        },
        {
          id: 2,
          text: "Saved a molar that another clinic wanted to extract. Dr. Wilson's gentle technique and bedside manner are unmatched.",
          author: "Linda P.",
          rating: 5.0,
          platform: "Yelp",
        },
        {
          id: 3,
          text:
            "I actually fell asleep during my root canal treatment! That tells you everything you need to know about his gentle touch.",
          author: "Jason R.",
          rating: 5.0,
          platform: "Healthgrades",
        },
      ],
    },
    {
      id: "dr-amanda-lee",
      name: "Dr. Amanda Lee",
      role: "Pediatric Dentist",
      image:
        images.doctors["dr-amanda-lee"],
      qualifications: "DDS, College of Dental Medicine",
      experience: "11+ Years",
      specialty: "Pediatric",
      specializations: ["Child Care", "Preventive", "Special Needs"],
      rating: 4.9,
      reviews: 204,
      heroImage:
        images.doctors["dr-amanda-lee"],
      heroDescription: "Warm, joyful, and fear-free dental visits creating lifelong healthy oral habits for children and teens.",
      philosophy:
        "Early dental experiences shape a child's relationship with healthcare for life. We use playful curiosity, patient pacing, and positive reinforcement so kids genuinely look forward to every visit.",
      demo: false,
      credentials: [
        { year: "2010", title: "DDS, College of Dental Medicine", desc: "Graduated with honors, focusing on pediatric dentistry." },
        { year: "2013", title: "Board Certification", desc: "National Board of Pediatric Dentistry." },
      ],
      expertise: [
        { name: "Child Care", percent: 97 },
        { name: "Preventive", percent: 95 },
        { name: "Special Needs", percent: 90 },
      ],
      testimonials: [
        {
          id: 1,
          text: "My 6-year-old was terrified of dentists until we met Dr. Amanda. She made the visit fun and educational, with zero tears.",
          author: "Emily W.",
          rating: 5.0,
          platform: "Google",
        },
        {
          id: 2,
          text: "Dr. Lee's gentle approach and child-friendly explanations turned dental checkups into something my twins look forward to.",
          author: "Brian G.",
          rating: 5.0,
          platform: "Yelp",
        },
        {
          id: 3,
          text:
            "Kind, patient, and exceptional with anxious young children. The whole team makes families feel welcome.",
          author: "Maria C.",
          rating: 5.0,
          platform: "Healthgrades",
        },
      ],
    },
    {
      id: "dr-robert-taylor",
      name: "Dr. Robert Taylor",
      role: "General Dentist",
      image:
        images.doctors["dr-robert-taylor"],
      qualifications: "DDS, Comprehensive Care",
      experience: "20+ Years",
      specialty: "General",
      specializations: ["Checkups", "Fillings", "Crowns"],
      rating: 4.9,
      reviews: 312,
      heroImage:
        images.doctors["dr-robert-taylor"],
      heroDescription: "Comprehensive oral wellness, gentle hygiene cleanings, and non-invasive restorative dentistry.",
      philosophy:
        "The best dental work is the work you never need. Through thorough, gentle preventive hygiene and early digital detection, we help patients preserve their natural teeth for a lifetime.",
      demo: false,
      credentials: [
        { year: "2003", title: "DDS, State Dental Academy", desc: "Graduated top of my class." },
        { year: "2010", title: "Fellowship in General Dentistry", desc: "Advanced training in comprehensive care." },
      ],
      expertise: [
        { name: "Checkups", percent: 98 },
        { name: "Fillings", percent: 95 },
        { name: "Crowns", percent: 92 },
      ],
      testimonials: [
        {
          id: 1,
          text: "Dr. Taylor has been my dentist for years. Thorough, honest, and never pushes unnecessary treatments. True integrity.",
          author: "Arthur M.",
          rating: 5.0,
          platform: "Google",
        },
        {
          id: 2,
          text: "The gentlest cleaning and exam I've ever experienced. Explained everything on the digital monitor clearly.",
          author: "Karen D.",
          rating: 5.0,
          platform: "Yelp",
        },
        {
          id: 3,
          text:
            "Comprehensive care in a serene, modern clinic. I always leave feeling well taken care of and respected.",
          author: "Thomas E.",
          rating: 5.0,
          platform: "Healthgrades",
        },
      ],
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "Sarah L.",
      treatment: "Cosmetic Dentistry",
      text:
        "After years of hiding my smile in photos, the custom porcelain veneers look completely natural. The digital smile mockup let me preview the exact result before we started.",
      rating: 5.0,
      patientImage: images.testimonials.patients[1],
      platform: "Google",
      demo: true,
    },
    {
      id: 2,
      name: "Michael R.",
      treatment: "Dental Implants",
      text:
        "I was terrified of having an implant placed. The 3D-guided surgery was fast and painless, and I was back at work the next morning. My chewing strength feels 100% restored.",
      rating: 5.0,
      patientImage: images.testimonials.patients[2],
      platform: "Yelp",
      demo: true,
    },
    {
      id: 3,
      name: "Emma T.",
      treatment: "Teeth Whitening",
      text:
        "I booked a single 45-minute laser session two weeks before my wedding. Lifted 6 shades of stubborn coffee stains with zero post-treatment sensitivity. Incredible result.",
      rating: 5.0,
      patientImage: images.testimonials.patients[3],
      platform: "Healthgrades",
      demo: true,
    },
    {
      id: 4,
      name: "David K.",
      treatment: "General Dentistry",
      text:
        "The ultrasonic cleaning was so gentle, and the intraoral photos showed me exactly what was happening without any judgment. Clear upfront pricing every single visit.",
      rating: 5.0,
      patientImage: images.testimonials.patients[4],
      platform: "Healthgrades",
      demo: true,
    },
    {
      id: 5,
      name: "Robert B.",
      treatment: "Orthodontics",
      text:
        "Completed my clear aligner program in 9 months. The remote digital check-in system meant I only needed to visit the operatory three times. Seamless experience.",
      rating: 5.0,
      patientImage: images.testimonials.patients[5],
      platform: "Google",
      demo: true,
    },
    {
      id: 6,
      name: "Jessica M.",
      treatment: "Restorative Dentistry",
      text:
        "Came in with severe toothache on a Friday afternoon. They fit me in immediately, relieved the pain within 20 minutes, and placed a ceramic crown that matches my smile flawlessly.",
      rating: 5.0,
      patientImage: images.testimonials.patients[6],
      platform: "Google",
      demo: true,
    },
  ],
  navigation: {
    header: [
      { name: "Home", href: "/" },
      { name: "Services", href: "/services" },
      { name: "Doctors", href: "/doctors" },
      { name: "About Us", href: "/about" },
      { name: "Reviews", href: "/testimonials" },
      { name: "Contact", href: "/contact" },
    ],
    footer: {
      quickLinks: [
        { name: "About Us", href: "/about" },
        { name: "Our Doctors", href: "/doctors" },
        { name: "Services", href: "/services" },
        { name: "Testimonials", href: "/testimonials" },
        { name: "Contact Us", href: "/contact" },
      ],
      services: [
        "General Dentistry",
        "Cosmetic Dentistry",
        "Dental Implants",
        "Orthodontics",
        "Teeth Whitening",
        "Root Canal",
      ],
      contact: [
        { name: "Location", href: "/contact" },
        { name: "Phone", href: "tel:+15551234567" },
        { name: "Email", href: "mailto:care@luminadental.com" },
      ],
    },
  },
  seo: {
    title: "Lumina Dental Care | Advanced Dentistry Designed Around Your Smile",
    description:
      "Modern dentistry with experienced professionals, advanced technology, and patient-first care.",
    keywords: ["dentist", "dental clinic", "cosmetic dentistry", "dental implants", "orthodontics", "premium healthcare"],
    openGraph: {
      title: "Lumina Dental Care",
      description: "Advanced Dentistry Designed Around Your Smile",
      type: "website",
      images: ["/dental/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: "Lumina Dental Care",
      description: "Advanced Dentistry Designed Around Your Smile",
      images: ["/dental/og-image.png"],
    },
    canonical: "/",
    metadataBase: "https://www.luminadental.com",
  },
  journey: [
    {
      step: "01",
      title: "Seamless Consultation Request",
      description:
        "Select your service and preferred date online or by phone. Our care concierge confirms your visit with zero upfront payment required.",
      note: "Instant digital booking",
      icon: <Calendar01Icon className="w-5 h-5" />,
    },
    {
      step: "02",
      title: "Unhurried Clinical Assessment",
      description:
        "A private conversation about your goals and dental history, followed by gentle digital imaging and 3D volumetric mapping.",
      note: "Conversation first",
      icon: <Doctor01Icon className="w-5 h-5" />,
    },
    {
      step: "03",
      title: "100% Written Price Lock",
      description:
        "Review an itemized treatment roadmap with all clinical options, timelines, and costs in writing before anything begins.",
      note: "Zero sales pressure",
      icon: <Invoice01Icon className="w-5 h-5" />,
    },
    {
      step: "04",
      title: "Gentle, Paced Treatment",
      description:
        "Relax in an acoustic private suite with computerized local anesthesia and noise-canceling audio, paced entirely to your comfort.",
      note: "Anxiety-free care",
      icon: <DentalCareIcon className="w-5 h-5" />,
    },
    {
      step: "05",
      title: "Written Aftercare & Support",
      description:
        "Leave with written post-care guidelines, 24/7 direct doctor triage contact, and scheduled follow-up wellness reviews.",
      note: "Clinical warranty included",
      icon: <CheckmarkBadge01Icon className="w-5 h-5" />,
    },
  ],
  features: [
    {
      title: "Board-Certified Specialists",
      description:
        "Our clinicians hold verified fellowships across aesthetic, implant, and restorative dentistry with an average of 15+ years of clinical practice.",
      icon: <Award01Icon className="w-6 h-6" />,
    },
    {
      title: "3D Computerized Diagnostics",
      description:
        "Low-dose CBCT 3D volumetric mapping and digital optical scans deliver micro-millimeter precision without uncomfortable impression trays.",
      icon: <MicroscopeIcon className="w-6 h-6" />,
    },
    {
      title: "100% Upfront Price Lock",
      description:
        "Full itemized written estimate before any clinical step begins. We coordinate directly with your insurance with zero surprise fees.",
      icon: <Invoice01Icon className="w-6 h-6" />,
    },
    {
      title: "Same-Day Emergency Relief",
      description:
        "Dedicated morning and afternoon slots reserved daily so urgent tooth pain, cracked teeth, or trauma are treated without delay.",
      icon: <Hospital01Icon className="w-6 h-6" />,
    },
    {
      title: "Anxiety-Free Acoustic Suites",
      description:
        "Private Scandinavian treatment suites equipped with noise-cancellation audio, ceiling visual displays, and computer-controlled gentle anesthesia.",
      icon: <Sofa01Icon className="w-6 h-6" />,
    },
    {
      title: "Written Clinical Warranty",
      description:
        "We stand firmly behind our restorative craftsmanship with comprehensive written coverage on crowns, veneers, and implant restorations.",
      icon: <Shield01Icon className="w-6 h-6" />,
    },
  ],
  forms: {
    bookingServices: [
      { value: "general", label: "General Checkup & Cleaning" },
      { value: "cosmetic", label: "Cosmetic Consultation (Veneers, Bonding)" },
      { value: "implants", label: "Dental Implants Consultation" },
      { value: "whitening", label: "Teeth Whitening" },
      { value: "emergency", label: "Emergency Dental Care" },
    ],
    contactInquiryTypes: [
      { value: "general", label: "General Inquiry" },
      { value: "appointment", label: "Schedule Appointment" },
      { value: "emergency", label: "Dental Emergency" },
      { value: "billing", label: "Billing & Insurance" },
    ],
  },
  ui: {
    showTemplateSwitchers: true,
    showSampleContentNotices: true,
  },
  awards: [
    "American Dental Association (ADA)",
    "American Academy of Cosmetic Dentistry (AACD)",
    "American Academy of Implant Dentistry (AAID)",
    "International Congress of Oral Implantologists (ICOI)",
    "Invisalign Diamond Apex Provider",
    "Swiss Dental Society Standards (SSO)",
    "International Team for Implantology (ITI)",
    "Carl Zeiss Micro-Dentistry Certified",
  ],
  accreditations: [
    {
      id: "ada",
      name: "American Dental Association",
      code: "ADA",
      credential: "Chartered Member · Continuous Good Standing",
      badgeType: "shield",
      desc: "Full chartered member practice in continuous good standing, adhering to the highest American standards of clinical safety, bioethics, and evidence-based treatment.",
    },
    {
      id: "aacd",
      name: "American Academy of Cosmetic Dentistry",
      code: "AACD",
      credential: "Aesthetic Fellowship · Bio-Emulation Standards",
      badgeType: "diamond",
      desc: "Accredited aesthetic fellowship dedicated to natural smile bio-emulation, polychromatic porcelain layered restorations, and minimally invasive cosmetics.",
    },
    {
      id: "align",
      name: "Invisalign® Diamond Apex",
      code: "ALIGN",
      credential: "Top 1% Global Clear Aligner Provider",
      badgeType: "align",
      desc: "Ranked in the top 1% of global orthodontic providers for digital clear aligner treatment, complex malocclusion cases, and teen/adult smile corrections.",
    },
    {
      id: "aaid",
      name: "American Academy of Implant Dentistry",
      code: "AAID",
      credential: "Board-Certified Implantology Fellow",
      badgeType: "implant",
      desc: "Credentialed implantologist faculty demonstrating excellence in 3D computer-guided fixture placement, sub-periosteal grafting, and immediate load biomechanics.",
    },
    {
      id: "sso",
      name: "Swiss Dental Standards (SSO)",
      code: "SSO",
      credential: "Sub-Millimeter 0.02mm Margin Protocol",
      badgeType: "swiss",
      desc: "Clinical protocol certified to Swiss sub-millimeter prosthetic margin tolerances, bioceramic bonding, and long-term biological tissue integration.",
    },
    {
      id: "icoi",
      name: "ICOI Global Mastership",
      code: "ICOI",
      credential: "Master Fellowship · Oral Surgical Implantology",
      badgeType: "globe",
      desc: "Mastership certification recognized globally for ongoing clinical contributions to surgical oral implantology and tissue preservation.",
    },
    {
      id: "iti",
      name: "ITI Straumann Research Network",
      code: "ITI",
      credential: "Global Academic Partner · Biocompatible Implants",
      badgeType: "nodes",
      desc: "Collaborative research network advancing biocompatible ceramic implant surfaces and bone regeneration.",
    },
    {
      id: "zeiss",
      name: "Carl Zeiss Optical Operatory",
      code: "ZEISS",
      credential: "Sub-Millimeter Micro-Dentistry Certified",
      badgeType: "zeiss",
      desc: "Microscopic magnification visual diagnostics enabling surgical margin accuracy down to 0.02mm.",
    },
  ],
};

export default defaultSiteConfig;
