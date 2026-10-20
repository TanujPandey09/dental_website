"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { Button, ButtonBadge } from "@/components/ui/button";
import siteConfig from "@/config/site";
import { images } from "@/config/images";
import {
  Shield01Icon,
  HealthIcon,
  DentalToothIcon,
  MicroscopeIcon,
  Certificate01Icon,
  ArrowRight01Icon,
  Calendar01Icon,
} from "hugeicons-react";

interface ClinicalPillar {
  title: string;
  badge: string;
  desc: string;
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
  specs: { label: string; value: string }[];
}

const CLINICAL_PILLARS: ClinicalPillar[] = [
  {
    title: "Class-B Vacuum Autoclave Sterilization",
    badge: "Sterilization Standard",
    desc: "Every reusable instrument undergoes multi-stage ultrasonic scrubbing followed by hospital-standard vacuum autoclave sterilization with chemical and biological spore indicators.",
    image: images.about.details,
    imageAlt: "Sterilized clinical instrument tray",
    icon: <Shield01Icon className="w-4 h-4" />,
    specs: [
      { label: "Cycle Protocol", value: "EN 13060 Class-B" },
      { label: "Barrier Protocol", value: "100% Single-Use Sterile Pouches" },
    ],
  },
  {
    title: "Surgical-Air Filtration & Exchange",
    badge: "Continuous Turnover",
    desc: "Continuous operatory air exchange every 8 minutes via medical-grade HEPA-14 filtration paired with in-duct airborne UV-C neutralization units.",
    image: images.about.treatmentRoom,
    imageAlt: "Operatory suite with air purification",
    icon: <HealthIcon className="w-4 h-4" />,
    specs: [
      { label: "Air Cleanliness", value: "HEPA-14 Medical Filtration" },
      { label: "Disinfection Cycle", value: "Continuous 8-Min Exchange" },
    ],
  },
  {
    title: "Biocompatible European Ceramics",
    badge: "Material Purity",
    desc: "We exclusively utilize Swiss ceramic zirconia and American Grade-5 titanium implants with complete biocompatibility verification for long-term health.",
    image: images.about.clinicInterior,
    imageAlt: "Luxury clinical operatory suite",
    icon: <DentalToothIcon className="w-4 h-4" />,
    specs: [
      { label: "Restoration Origin", value: "Swiss Zirconia Ceramics" },
      { label: "Safety Standard", value: "100% BPA & Nickel Free" },
    ],
  },
  {
    title: "Low-Dose 3D Cone Beam Imaging",
    badge: "Sub-Millimeter Accuracy",
    desc: "Ultra-precise 3D CBCT scanners capture jaw anatomy with low-dose radiation protocols, providing instantaneous diagnostic clarity for computer-guided procedures.",
    image: images.about.dentalTechnology,
    imageAlt: "3D Cone beam diagnostic scanner",
    icon: <MicroscopeIcon className="w-4 h-4" />,
    specs: [
      { label: "Scan Precision", value: "0.02mm Optical Tolerance" },
      { label: "Radiation Protocol", value: "Ultra-Low Dose (ALARA)" },
    ],
  },
];

const ACCREDITATIONS = [
  {
    name: "American Dental Association (ADA)",
    desc: "Full active member clinic in continuous standing since 2012, adhering to ADA ethics and standards.",
  },
  {
    name: "American Academy of Cosmetic Dentistry (AACD)",
    desc: "Sustaining member dedicated to natural aesthetics, bio-emulation, and precision smile design.",
  },
  {
    name: "International Congress of Oral Implantologists (ICOI)",
    desc: "Fellowship certified in computer-guided 3D implant placement and tissue regeneration.",
  },
  {
    name: "Occupational Safety & Health (OSHA / CDC)",
    desc: "Adheres to all recommended infection control guidelines and cross-contamination safeguards.",
  },
];

export function AboutClinical() {
  const { openBooking } = useBooking();

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Header with Eyebrow */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <Shield01Icon className="w-4 h-4 text-primary" />
          <span>Clinical Safety &amp; Technology Standards</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
          Our Four Pillars of Clinical Safety.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Our practice operates under rigorous medical cleanliness, instrument sterilization, and air-purity protocols, giving you and your family complete peace of mind at every visit.
        </p>
      </div>

      {/* 2. Tactile Visual Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {CLINICAL_PILLARS.map((pillar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
            className="p-2 sm:p-2.5 rounded-3xl bg-muted/40 border border-border/80 shadow-sm flex flex-col group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="rounded-[calc(1.5rem-2px)] bg-card p-6 sm:p-7 flex flex-col justify-between flex-1 border border-border/60 hover:shadow-xl hover:border-primary/40 transition-all duration-300">
              <div>
                {/* Photographic Header with Floating Glass Badges */}
                <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden mb-6 border border-border/50">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 backdrop-blur-md bg-card/85 text-foreground text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-border/60 shadow-sm">
                    {pillar.badge}
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    {pillar.icon}
                  </div>
                </div>

                {/* Pillar Title & Description */}
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-3 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                  {pillar.desc}
                </p>
              </div>

              {/* Dual Specification Metrics */}
              <div className="pt-4 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {pillar.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="p-2.5 rounded-xl bg-muted/40 border border-border/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">
                      {spec.label}
                    </span>
                    <span className="font-semibold text-primary">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Accreditations & Medical Governance (Double-Bezel Architecture) */}
      <div className="p-2 sm:p-3 rounded-[2.5rem] bg-muted/30 border border-border/70 shadow-sm">
        <div className="rounded-[calc(2.5rem-0.75rem)] bg-card p-6 sm:p-12 border border-border/40">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-border/60">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Medical Governance
                </span>
                {siteConfig.ui.showSampleContentNotices && (
                  <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    Sample Standards
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                Professional Affiliations &amp; Compliance
              </h3>
            </div>
            <Button
              size="lg"
              variant="cta"
              onClick={() => openBooking()}
              className="self-start md:self-auto"
            >
              <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
              <span>Schedule Clinical Consultation</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {ACCREDITATIONS.map((acc, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/60 flex items-start gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Certificate01Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{acc.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{acc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
