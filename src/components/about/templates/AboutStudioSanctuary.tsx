"use client";

import Image from "next/image";
import Link from "next/link";
import {
  StarIcon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Call02Icon,
  Calendar01Icon,
} from "hugeicons-react";
import siteConfig from "@/config/site";
import { images } from "@/config/images";
import { useBooking } from "@/components/BookingContext";

interface TechItem {
  number: string;
  title: string;
  description: string;
}

const TECH_EQUIPMENT: TechItem[] = [
  {
    number: "01",
    title: "iTero Element 5D 3D Scanner",
    description:
      "No messy putty impression trays. 6,000 frames/sec instant 3D color model with NIRI early cavity detection.",
  },
  {
    number: "02",
    title: "CEREC In-Office CAD/CAM Milling",
    description:
      "Custom hand-characterized porcelain crowns designed, precision-milled, and bonded in a single unhurried visit.",
  },
  {
    number: "03",
    title: "Gentle Dental Diode Laser",
    description:
      "Painless soft-tissue contouring and accelerated periodontal healing with minimal to zero recovery time.",
  },
  {
    number: "04",
    title: "Low-Dose Cone Beam 3D CT",
    description:
      "Sub-millimeter anatomical precision for computer-guided implants with up to 80% lower radiation exposure.",
  },
];

const CORE_VALUES = [
  {
    title: "Unhurried visits",
    description:
      "Every appointment begins on time with dedicated 1-on-1 clinician pacing and zero rushed chair time.",
  },
  {
    title: "Clear pricing",
    description:
      "Full written cost estimates before any procedure begins. In-network with major PPO insurance plans.",
  },
  {
    title: "Acoustic calm",
    description:
      "Under-32 dB private treatment suites with noise-canceling headphones and warm, indirect ambient lighting.",
  },
  {
    title: "Modern tech",
    description:
      "Sub-millimeter 3D optical scans, gentle laser dentistry, and low-dose digital diagnostics.",
  },
];

export function AboutStudioSanctuary() {
  const { openBooking } = useBooking();
  const doctors = siteConfig.doctors.slice(0, 4);

  const testimonials = [
    {
      quote:
        "The calmest dental experience I've ever had. No loud drills, no sales pressure, just incredibly thoughtful and gentle care.",
      author: "Claire Montgomery",
      tag: "Veneers & Whitening",
      avatar: images.testimonials.patients[1],
    },
    {
      quote:
        "From the quiet reception lounge to the 3D digital scan, everything felt like a luxury hospitality visit rather than a dental clinic.",
      author: "Marcus Vance",
      tag: "Routine Care & Checkup",
      avatar: images.testimonials.patients[2],
    },
    {
      quote:
        "Completely transparent pricing before we started. Dr. Chen explained every step with complete clarity and reassurance.",
      author: "Elena Rostova",
      tag: "Dental Implant",
      avatar: images.testimonials.patients[3],
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-12 sm:pb-20">
      {/* 1. Header / Hero Section matching Screenshot 1 */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-8 sm:mb-12">
          <div className="lg:col-span-7">
            <span className="text-muted-foreground/80 text-sm font-medium tracking-tight">
              About Us /
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.08] mt-1 text-balance">
              A calm dental studio in Austin
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg lg:ml-auto">
              We started with a simple belief: healthcare should feel calm, restorative,
              and unhurried. From private acoustic suites to transparent cost estimates before
              treatment begins, every detail is engineered around your comfort.
            </p>
          </div>
        </div>

        {/* Large Full-Width Hero Studio Photo */}
        <div className="relative w-full h-[320px] xs:h-[380px] sm:h-[500px] lg:h-[620px] rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-xl border border-border/60">
          <Image
            src={images.about.lobby}
            alt="Lumina calm reception studio lounge"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* 2. Milestone Origin Stories (Two Rows matching Screenshot 1) */}
      <div className="space-y-14 sm:space-y-20">
        {/* Milestone 1: 2011 Founding */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-muted shadow-sm border border-border/70">
              <Image
                src={images.about.consultation}
                alt="South Congress clinic suite"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-2.5">
              South Congress Flagship · Est. 2011
            </p>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-sans font-medium text-foreground leading-[1.18] tracking-tight mb-5">
              We opened in 2011 to slow down dental care and make people feel safe and heard.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                For decades, visiting the dentist meant clinical intimidation, sterile smells,
                and rushed appointments. We founded Lumina to prove there is a better way—pairing
                world-class clinical expertise with warmth, luxury, and radical empathy.
              </p>
              <p>
                Every operatory suite was acoustically insulated below 32 dB. We eliminated
                waiting rooms entirely through punctual scheduling, ensuring your clinician is
                prepared the moment you arrive.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone 2: 2018 Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-muted shadow-sm border border-border/70">
              <Image
                src={images.about.treatmentRoom}
                alt="Westlake treatment suite"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="font-mono text-xs text-muted-foreground mt-2.5">
              Westlake Surgical Suite · 2018
            </p>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-sans font-medium text-foreground leading-[1.18] tracking-tight mb-5">
              Expanding our disciplines without losing our 1-on-1 personal touch.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                As our patient family grew across Austin, we brought together fellowship-trained
                specialists across restorative aesthetics, computer-guided implantology, and
                orthodontics under one unified standard.
              </p>
              <p>
                Even across multiple locations, our core promise remains unchanged: you see the
                same dedicated clinician every visit, with full written pricing and zero
                high-pressure sales tactics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Principles / Commitments (Horizontal 4-Col Grid) */}
      <div className="pt-10 sm:pt-14 border-t border-border/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_VALUES.map((val) => (
            <div key={val.title} className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-medium text-foreground tracking-tight">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Equipment & Technology Section matching Screenshot 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 border-t border-border/60">
        {/* Left Column: Numbered Equipment Directory */}
        <div className="lg:col-span-6">
          <span className="text-muted-foreground/80 text-sm font-medium tracking-tight">
            Technology /
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.12] mt-1 mb-4">
            Equipment chosen for comfort and precision
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-8 max-w-lg">
            We invest in hospital-standard digital diagnostics and laboratory equipment that
            drastically reduces chair time, eliminates messy impression goop, and makes treatments
            noticeably gentler.
          </p>

          <div className="space-y-5">
            {TECH_EQUIPMENT.map((item) => (
              <div key={item.number} className="flex items-start gap-4 pb-5 border-b border-border/60 last:border-0 last:pb-0">
                <span className="font-mono text-xs sm:text-sm text-primary font-bold pt-0.5">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Tall Digital Craft Photo */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/4.8] w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-muted shadow-xl border border-border/60">
            <Image
              src={images.about.dentalTechnology}
              alt="Digital CAD/CAM dental milling precision"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 5. The Space ("Four rooms, one quiet lounge") */}
      <div className="space-y-6 sm:space-y-8 pt-8 border-t border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-muted-foreground/80 text-sm font-medium tracking-tight">
              The Space /
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.12] mt-1">
              Private suites, one quiet lounge
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed sm:text-right">
            Natural European oak, acoustic wall insulation, and hospital-grade HEPA-14 air
            filtration cycling clean air every 8 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
          <div>
            <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-muted shadow-md border border-border/70">
              <Image
                src={images.about.treatmentRoom}
                alt="Private acoustic treatment suite"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-foreground mt-3">
              Private Treatment Suite
            </p>
          </div>

          <div>
            <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-muted shadow-md border border-border/70">
              <Image
                src={images.about.clinicInterior}
                alt="Quiet reception lounge"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-foreground mt-3">
              Quiet Reception Lounge
            </p>
          </div>
        </div>
      </div>

      {/* 6. The Dentists Preview matching Screenshot 1 */}
      <div className="space-y-6 sm:space-y-8 pt-8 border-t border-border/60">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-muted-foreground/80 text-sm font-medium tracking-tight">
              The Team /
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.12] mt-1">
              The dentists you will meet
            </h2>
          </div>

          <Link
            href="/doctors"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            <span>Meet the whole team</span>
            <ArrowRight01Icon className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {doctors.map((doctor) => (
            <Link
              key={doctor.id}
              href={`/doctors/${doctor.id}`}
              className="rounded-2xl sm:rounded-3xl overflow-hidden bg-card border border-border/80 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[4/4.3] overflow-hidden bg-muted">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top scale-100 group-hover:scale-104 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-4 sm:p-5 bg-card flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {doctor.role}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-border/50 text-[10px] font-mono text-muted-foreground truncate uppercase tracking-wider">
                  {doctor.licenseNumber || "State Licensed"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 7. Patient Testimonials ("What patients say") */}
      <div className="space-y-6 sm:space-y-8 pt-8 border-t border-border/60">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-muted-foreground/80 text-sm font-medium tracking-tight">
              Reviews /
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.12] mt-1">
              What patients say
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground shrink-0">
            <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" aria-hidden="true" />
            <span>4.9 · 800+ Verified Reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="relative h-9 w-9 rounded-full overflow-hidden border border-border/60 shrink-0">
                  <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    {t.author}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    {t.tag}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Bottom Studio CTA Banner matching Screenshot 1 */}
      <div className="rounded-3xl sm:rounded-[2.5rem] bg-muted/40 border border-border/80 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-primary mb-3">
              Ready for a healthier smile? /
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-foreground leading-[1.12] tracking-[-0.03em] mb-4">
              Book your{" "}
              <span className="inline-block rounded-md bg-primary/20 text-foreground px-2 py-0.5 font-normal">
                visit today
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Our team will help you choose the right treatment, and your first consultation includes a full 3D scan.
            </p>
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-95 cursor-pointer touch-manipulation group"
              >
                <span>Book an appointment</span>
                <ArrowRight01Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-colors py-2"
              >
                <Call02Icon className="w-4 h-4 text-primary" />
                <span>{siteConfig.contact.phone}</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-[420px] w-full overflow-hidden">
            <Image
              src={images.about.lobby}
              alt="Calm dental studio reception and lounge"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* 9. Giant Watermark Branding Typography matching Screenshot 1 */}
      <div className="text-center select-none pt-4 pb-2 overflow-hidden opacity-10">
        <span className="font-heading text-[15vw] sm:text-[14vw] font-bold tracking-tighter text-foreground leading-none block">
          {siteConfig.clinic.name.split(" ")[0] || "LUMINA"}
        </span>
      </div>
    </div>
  );
}
