import { images } from "./images";
import {
  SparklesIcon,
  Shield01Icon,
  SmileIcon,
  StethoscopeIcon,
  HealthIcon,
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
  CustomerSupportIcon,
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
}

export interface ContactConfig {
  phone: string;
  email: string;
  address: string;
  hours: string;
  emergencyPhone: string;
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

export interface HeroConfig {
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  ctaText: string;
  ctaTextPlain: string;
  secondaryCtaText: string;
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
    happyPatients: 5000,
    certifiedDentists: 12,
    treatmentsCompleted: 25000,
  },
  contact: {
    phone: "(555) 123-4567",
    email: "care@luminadental.com",
    address: "1234 Healthcare Ave, Suite 100\nNew York, NY 10001",
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
      "Experience world-class healthcare where luxury hospitality meets advanced medical expertise. We believe your smile is your greatest asset.",
    ctaText: "Request Appointment",
    ctaTextPlain: "Request Appointment",
    secondaryCtaText: "Meet Our Specialists",
  },
  services: [
    {
      id: "cosmetic-dentistry",
      title: "Cosmetic Dentistry",
      description:
        "Transform your smile with premium veneers, bonding, and total smile makeovers.",
      category: "Cosmetic",
      icon: <SparklesIcon className="w-7 h-7" />,
      image: images.services["cosmetic-dentistry"],
      detailTitle: "Transform Your Smile",
      detailSubtitle: "Premium veneers, bonding, and total smile makeovers",
      detailBullets: [
        "Premium veneers for natural-looking results",
        "Tooth bonding for minor imperfections",
        "Total smile makeovers tailored to your face",
      ],
    },
    {
      id: "dental-implants",
      title: "Dental Implants",
      description:
        "Permanent, natural-looking tooth replacements using state-of-the-art titanium implants.",
      category: "Restorative",
      icon: <DentalToothIcon className="w-7 h-7" />,
      image: images.services["dental-implants"],
      detailTitle: "Permanent Tooth Replacement",
      detailSubtitle: "State-of-the-art titanium implants",
      detailBullets: [
        "Natural-looking and permanent results",
        "State-of-the-art titanium implants",
        "Designed to last a lifetime",
      ],
    },
    {
      id: "teeth-whitening",
      title: "Teeth Whitening",
      description:
        "Professional whitening treatments for a brilliantly bright smile in just one visit.",
      category: "Cosmetic",
      icon: <Sun01Icon className="w-7 h-7" />,
      image: images.services["teeth-whitening"],
      detailTitle: "Brighten Your Smile",
      detailSubtitle: "One-visit professional whitening",
      detailBullets: [
        "Immediate results in one visit",
        "Professional-grade whitening agents",
        "Safe and supervised treatment",
      ],
    },
    {
      id: "orthodontics",
      title: "Orthodontics",
      description:
        "Clear aligners and modern braces for perfectly straight teeth without the metal look.",
      category: "Specialty",
      icon: <DentalBracesIcon className="w-7 h-7" />,
      image: images.services["orthodontics"],
      detailTitle: "Straighten Your Teeth",
      detailSubtitle: "Clear aligners and modern braces",
      detailBullets: [
        "Clear aligners (Invisalign® available)",
        "Modern braces without the metal look",
        "Predictable treatment timeline",
      ],
    },
    {
      id: "general-dentistry",
      title: "General Dentistry",
      description:
        "Comprehensive exams, cleanings, and preventative care to keep your smile healthy.",
      category: "General",
      icon: <DentalCareIcon className="w-7 h-7" />,
      image: images.services["general-dentistry"],
    },
    {
      id: "root-canal",
      title: "Root Canal Therapy",
      description:
        "Painless endodontic treatments to save infected teeth and relieve pain instantly.",
      category: "Restorative",
      icon: <Shield01Icon className="w-7 h-7" />,
      image: images.services["root-canal"],
      detailTitle: "Painless Root Canal",
      detailSubtitle: "Save infected teeth instantly",
      detailBullets: [
        "Painless endodontic treatments",
        "Advanced technology for comfort",
        "Save your natural tooth",
      ],
    },
    {
      id: "pediatric-dentistry",
      title: "Pediatric Dentistry",
      description:
        "Gentle, fun, and educational dental care specialized for children of all ages.",
      category: "Specialty",
      icon: <UserGroupIcon className="w-7 h-7" />,
      image: images.services["pediatric-dentistry"],
    },
    {
      id: "oral-surgery",
      title: "Oral Surgery",
      description:
        "Expert extractions, wisdom teeth removal, and advanced surgical procedures.",
      category: "Specialty",
      icon: <CheckmarkBadge01Icon className="w-7 h-7" />,
      image: images.services["oral-surgery"],
    },
  ],
  doctors: [
    {
      id: "dr-sarah-jenkins",
      name: "Dr. Sarah Jenkins",
      role: "Lead Cosmetic Dentist",
      image:
        images.doctors["dr-sarah-jenkins"],
      qualifications: "DDS, NYU College of Dentistry",
      experience: "15+ Years",
      specialty: "Cosmetic",
      specializations: ["Veneers", "Smile Makeovers", "Bonding"],
      rating: 5.0,
      reviews: 124,
      heroImage:
        images.doctors["dr-sarah-jenkins"],
      heroDescription: "Transform your smile with the latest cosmetic dentistry techniques.",
      demo: false,
      philosophy:
        "My approach to dentistry is rooted in the belief that a healthy smile is the foundation of overall well-being. I strive to provide care that is not only clinically exceptional but also incredibly compassionate.",
      credentials: [
        { year: "2010", title: "DDS, NYU College of Dentistry", desc: "Graduated with honors, focusing on restorative dentistry." },
        { year: "2013", title: "Specialization in Prosthodontics", desc: "Completed residency at Mayo Clinic." },
        { year: "2015", title: "Board Certification", desc: "American Board of Prosthodontics." },
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
            "The team here completely transformed my smile. From the consultation to the final result, the level of professionalism and care was unmatched. I finally have the confidence to smile in photos.",
          author: "Michael T.",
          rating: 5,
          platform: "Google",
        },
        {
          id: 2,
          text:
            "I was extremely nervous about getting an implant, but Dr. Chen made the entire process painless and comfortable. The facility feels more like a luxury spa than a dental clinic.",
          author: "Sarah W.",
          rating: 5,
          platform: "Yelp",
        },
        {
          id: 3,
          text:
            "Explains every step of the process clearly and makes you feel completely at ease.",
          author: "James L.",
          rating: 5,
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
      qualifications: "DMD, Harvard",
      experience: "12+ Years",
      specialty: "Implants",
      specializations: ["Dental Implants", "Oral Surgery", "Bone Grafting"],
      rating: 4.9,
      reviews: 89,
heroImage:
        images.doctors["dr-michael-chen"],
      heroDescription: "Transform your smile with the latest cosmetic dentistry techniques.",
      demo: false,
      philosophy:
        "I believe in continuous education to bring you the best care possible. My team and I are dedicated to providing exceptional implant dentistry in a comfortable, spa-like environment.",
      credentials: [
        { year: "2010", title: "DMD, Harvard School of Dental Medicine", desc: "Graduated with honors, focusing on restorative dentistry." },
        { year: "2013", title: "Specialization in Prosthodontics", desc: "Completed residency at Mayo Clinic." },
        { year: "2015", title: "Board Certification", desc: "American Board of Prosthodontics." },
      ],
      expertise: [
        { name: "Dental Implants", percent: 98 },
        { name: "Cosmetic Dentistry", percent: 95 },
        { name: "Full Mouth Reconstruction", percent: 92 },
      ],
      testimonials: [
        {
          id: 1,
          text: "The most painless and professional dental experience I've ever had. Truly exceptional care.",
          author: "Michael T.",
          rating: 5,
          platform: "Google",
        },
        {
          id: 2,
          text: "My smile makeover completely changed my life. I can't stop smiling now!",
          author: "Sarah W.",
          rating: 5,
          platform: "Yelp",
        },
        {
          id: 3,
          text:
            "Explains every step of the process clearly and makes you feel completely at ease.",
          author: "James L.",
          rating: 5,
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
      qualifications: "DDS, UCLA",
      experience: "10+ Years",
      specialty: "Orthodontics",
      specializations: ["Invisalign", "Clear Braces", "TMJ Treatment"],
      rating: 5.0,
      reviews: 156,
      heroImage:
        images.doctors["dr-emily-rodriguez"],
      philosophy:
        "Every patient is unique, and I take the time to deeply understand your goals, concerns, and history before designing a personalized treatment plan that perfectly fits your life.",
      demo: false,
      credentials: [
        { year: "2010", title: "DDS, UCLA School of Dentistry", desc: "Graduated with honors, focusing on orthodontics." },
        { year: "2013", title: "Specialization in Orthodontics", desc: "Completed residency at Mayo Clinic." },
        { year: "2015", title: "Board Certification", desc: "American Board of Orthodontics." },
      ],
      expertise: [
        { name: "Invisalign", percent: 95 },
        { name: "Clear Braces", percent: 90 },
        { name: "TMJ Treatment", percent: 85 },
      ],
      testimonials: [
        {
          id: 1,
          text: "The most painless and professional dental experience I've ever had. Truly exceptional care.",
          author: "Michael T.",
          rating: 5,
          platform: "Google",
        },
        {
          id: 2,
          text: "My smile makeover completely changed my life. I can't stop smiling now!",
          author: "Sarah W.",
          rating: 5,
          platform: "Yelp",
        },
        {
          id: 3,
          text:
            "Explains every step of the process clearly and makes you feel completely at ease.",
          author: "James L.",
          rating: 5,
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
      qualifications: "DMD, UPenn",
      experience: "8+ Years",
      specialty: "Endodontics",
      specializations: ["Root Canals", "Apicoectomy", "Dental Trauma"],
      rating: 4.8,
      reviews: 72,
      heroImage:
        images.doctors["dr-james-wilson"],
      philosophy:
        "I believe in preserving natural teeth whenever possible. Root canal therapy has evolved to be comfortable and effective with modern techniques.",
      demo: false,
      credentials: [
        { year: "2012", title: "DMD, University of Pennsylvania", desc: "Endodontics residency training." },
        { year: "2015", title: "Board Certification", desc: "American Board of Endodontics." },
      ],
      expertise: [
        { name: "Root Canals", percent: 95 },
        { name: "Apicoectomy", percent: 90 },
        { name: "Dental Trauma", percent: 85 },
      ],
      testimonials: [
        {
          id: 1,
          text: "The most painless and professional dental experience I've ever had. Truly exceptional care.",
          author: "Michael T.",
          rating: 5,
          platform: "Google",
        },
        {
          id: 2,
          text: "My smile makeover completely changed my life. I can't stop smiling now!",
          author: "Sarah W.",
          rating: 5,
          platform: "Healthgrades",
        },
        {
          id: 3,
          text:
            "Explains every step of the process clearly and makes you feel completely at ease.",
          author: "James L.",
          rating: 5,
          platform: "Yelp",
        },
      ],
    },
    {
      id: "dr-amanda-lee",
      name: "Dr. Amanda Lee",
      role: "Pediatric Dentist",
      image:
        images.doctors["dr-amanda-lee"],
      qualifications: "DDS, Columbia",
      experience: "11+ Years",
      specialty: "Pediatric",
      specializations: ["Child Care", "Preventive", "Special Needs"],
      rating: 4.9,
      reviews: 204,
      heroImage:
        images.doctors["dr-amanda-lee"],
      philosophy:
        "Dental visits should be fun and educational for children. We create a positive experience that sets the foundation for a lifetime of oral health.",
      demo: false,
      credentials: [
        { year: "2010", title: "DDS, Columbia University", desc: "Graduated with honors, focusing on pediatric dentistry." },
        { year: "2013", title: "Board Certification", desc: "American Board of Pediatric Dentistry." },
      ],
      expertise: [
        { name: "Child Care", percent: 97 },
        { name: "Preventive", percent: 95 },
        { name: "Special Needs", percent: 90 },
      ],
      testimonials: [
        {
          id: 1,
          text: "The most painless and professional dental experience I've ever had. Truly exceptional care.",
          author: "Michael T.",
          rating: 5,
          platform: "Google",
        },
        {
          id: 2,
          text: "My smile makeover completely changed my life. I can't stop smiling now!",
          author: "Sarah W.",
          rating: 5,
          platform: "Yelp",
        },
        {
          id: 3,
          text:
            "Explains every step of the process clearly and makes you feel completely at ease.",
          author: "James L.",
          rating: 5,
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
      qualifications: "DDS, Michigan",
      experience: "20+ Years",
      specialty: "General",
      specializations: ["Checkups", "Fillings", "Crowns"],
      rating: 4.9,
      reviews: 312,
      heroImage:
        images.doctors["dr-robert-taylor"],
      philosophy:
        "A visit to the dentist should be comfortable and stress-free. I focus on preventive care and building long-term relationships with my patients.",
      demo: false,
      credentials: [
        { year: "2003", title: "DDS, University of Michigan", desc: "Graduated top of my class." },
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
          text: "The most painless and professional dental experience I've ever had. Truly exceptional care.",
          author: "Michael T.",
          rating: 5,
          platform: "Google",
        },
        {
          id: 2,
          text: "My smile makeover completely changed my life. I can't stop smiling now!",
          author: "Sarah W.",
          rating: 5,
          platform: "Yelp",
        },
        {
          id: 3,
          text:
            "Explains every step of the process clearly and makes you feel completely at ease.",
          author: "James L.",
          rating: 5,
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
        "The team here completely transformed my smile. From the consultation to the final result, the level of professionalism and care was unmatched. I finally have the confidence to smile in photos.",
      rating: 5,
      patientImage: images.testimonials.patients[1],
      platform: "Google",
      demo: true,
    },
    {
      id: 2,
      name: "Michael R.",
      treatment: "Dental Implants",
      text:
        "I was anxious about getting an implant, but the team made the entire procedure calm and comfortable. The facility feels peaceful and reassuring throughout every visit.",
      rating: 5,
      patientImage: images.testimonials.patients[2],
      platform: "Yelp",
      demo: true,
    },
    {
      id: 3,
      name: "Emma T.",
      treatment: "Teeth Whitening",
      text:
        "I came in for a whitening session before my wedding. The results were natural and immediate. The staff went above and beyond to ensure I felt comfortable throughout.",
      rating: 5,
      patientImage: images.testimonials.patients[3],
      platform: "Healthgrades",
      demo: true,
    },
    {
      id: 4,
      name: "David K.",
      treatment: "General Dentistry",
      text:
        "Thorough, gentle, and the hygienist explained everything she was doing clearly. I feel confident and well cared for at every regular checkup.",
      rating: 5,
      patientImage: images.testimonials.patients[4],
      platform: "Healthgrades",
      demo: true,
    },
    {
      id: 5,
      name: "Robert B.",
      treatment: "Orthodontics",
      text:
        "Finished my clear aligner treatment last week and couldn't be happier with the outcome. The digital monitoring app made scheduling visits seamless and convenient.",
      rating: 5,
      patientImage: images.testimonials.patients[5],
      platform: "Google",
      demo: true,
    },
    {
      id: 6,
      name: "Jessica M.",
      treatment: "Restorative Dentistry",
      text:
        "After needing restorative work on a damaged molar, the 3D scanning and computer-guided placement felt precise and painless. The tooth feels completely natural.",
      rating: 5,
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
      title: "Book your visit",
      description:
        "Choose a service and a preferred time. We confirm the appointment with you — a request is not a confirmed reservation.",
      note: "Online request or phone",
      icon: <Calendar01Icon className="w-5 h-5" />,
    },
    {
      step: "02",
      title: "Meet your dentist",
      description:
        "A conversation about your goals, concerns, and history, followed by an examination and any appropriate imaging.",
      note: "Assessment first",
      icon: <Doctor01Icon className="w-5 h-5" />,
    },
    {
      step: "03",
      title: "Understand the plan",
      description:
        "We explain findings, options, alternatives, and costs in writing before treatment begins.",
      note: "No pressure to proceed",
      icon: <Invoice01Icon className="w-5 h-5" />,
    },
    {
      step: "04",
      title: "Receive treatment",
      description:
        "Your dentist confirms the agreed plan with you at the visit and checks in on your comfort throughout.",
      note: "Paced to your needs",
      icon: <DentalCareIcon className="w-5 h-5" />,
    },
    {
      step: "05",
      title: "Aftercare & follow-up",
      description:
        "You leave with clear aftercare information and a review plan matched to the treatment.",
      note: "Written guidance",
      icon: <CheckmarkBadge01Icon className="w-5 h-5" />,
    },
  ],
  features: [
    {
      title: "Certified Specialists",
      description:
        "Our doctors are board-certified and trained at the world's most prestigious institutions.",
      icon: <Award01Icon className="w-6 h-6" />,
    },
    {
      title: "Advanced Equipment",
      description:
        "We utilize 3D imaging, laser dentistry, and AI-driven diagnostics for unmatched precision.",
      icon: <MicroscopeIcon className="w-6 h-6" />,
    },
    {
      title: "Transparent Pricing",
      description:
        "No hidden fees. We provide clear, upfront treatment plans and accept major insurance.",
      icon: <Invoice01Icon className="w-6 h-6" />,
    },
    {
      title: "Emergency Support",
      description:
        "Dental emergencies don't wait. We offer same-day priority appointments for urgent dental care.",
      icon: <Hospital01Icon className="w-6 h-6" />,
    },
    {
      title: "Comfortable Environment",
      description:
        "Relax in our spa-like clinic designed to reduce anxiety and make you feel at home.",
      icon: <Sofa01Icon className="w-6 h-6" />,
    },
    {
      title: "Clinical Guarantee",
      description:
        "We stand behind our work with comprehensive clinical warranties on restorative treatments.",
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
    "American Dental Association",
    "Academy of General Dentistry",
    "Invisalign Certified Provider",
    "American Academy of Cosmetic Dentistry",
    "International Congress of Oral Implantologists",
  ],
};

export default defaultSiteConfig;