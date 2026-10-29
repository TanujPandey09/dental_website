"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import siteConfig from "@/config/site";
import { images } from "@/config/images";
import {
  Shield01Icon,
  HealthIcon,
  DentalToothIcon,
  MicroscopeIcon,
  Certificate01Icon,
  Calendar01Icon,
  CheckmarkCircle01Icon,
  CheckmarkBadge01Icon,
  ArrowRight01Icon,
  Call02Icon,
  StarIcon,
} from "hugeicons-react";

interface DigitalToolItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  badge: string;
  specs: { label: string; value: string }[];
  clinicalBenefit: string;
}

const DIGITAL_TOOLS: DigitalToolItem[] = [
  {
    id: "3d-scanner",
    num: "01",
    title: "Intraoral 3D Optical Scanner",
    tagline: "Instant 3D digital impressions in under 60 seconds — zero goop or gag reflex.",
    description:
      "Emits harmless optical light pulses to capture 1,000,000 data points per second. Constructs an exact, interactive 3D digital replica of your teeth and bite with sub-millimeter precision, entirely eliminating outdated putty trays.",
    image: images.about.dentalTechnology,
    imageAlt: "Intraoral 3D dental scanner in operation",
    badge: "0.02 mm Margin Tolerance",
    specs: [
      { label: "Capture Speed", value: "< 60 seconds" },
      { label: "Optical Margin", value: "0.02 mm accuracy" },
      { label: "Patient Comfort", value: "100% Tray-Free" },
      { label: "Radiation", value: "Zero (Pure Light)" },
    ],
    clinicalBenefit: "Eliminates fitting inaccuracies, gagging, and repeat impressions for crowns and clear aligners.",
  },
  {
    id: "cbct-imaging",
    num: "02",
    title: "Low-Dose 3D Cone Beam CT (CBCT)",
    tagline: "Ultra-low radiation volumetric mapping of bone, nerve canals, and sinus floors.",
    description:
      "Provides true 3D anatomical insight for computer-guided implant planning and complex root analysis. Adheres strictly to ALARA (As Low As Reasonably Achievable) radiation protocols, reducing exposure by up to 80% compared to hospital CT scanners.",
    image: images.about.details,
    imageAlt: "High-resolution 3D diagnostic imaging station",
    badge: "ALARA Ultra-Low Dose",
    specs: [
      { label: "Voxel Resolution", value: "75 µm ultra-fine" },
      { label: "Radiation Reduction", value: "80% below standard CT" },
      { label: "Field of View", value: "Focused targeted scan" },
      { label: "Scan Duration", value: "8.9 seconds" },
    ],
    clinicalBenefit: "Guarantees micron-precise implant placement with zero risk of nerve or sinus encroachment.",
  },
  {
    id: "quiet-micromotors",
    num: "03",
    title: "Whisper-Quiet Electric Micromotors & Laser",
    tagline: "42 dB quiet ceramic-bearing handpieces with zero vibration and needle-free diode laser.",
    description:
      "Replaces the high-pitched drill whine and jaw vibration with silent, consistent electric torque. Paired with soft-tissue diode lasers that contour gums with instantaneous coagulation, eliminating sutures and postoperative soreness.",
    image: images.services["cosmetic-dentistry"],
    imageAlt: "Precision ergonomic dental handpiece and laser unit",
    badge: "42 dB Whisper Sound",
    specs: [
      { label: "Acoustic Level", value: "42 dB (Library Quiet)" },
      { label: "Vibration Profile", value: "Zero Bone Resonance" },
      { label: "Tissue Sculpting", value: "Micro Diode Laser" },
      { label: "Healing Time", value: "2x Faster Recovery" },
    ],
    clinicalBenefit: "Completely removes the sensory triggers of dental anxiety while preserving natural tooth structure.",
  },
  {
    id: "class-b-autoclave",
    num: "04",
    title: "Hospital-Grade Class-B Vacuum Autoclave",
    tagline: "Triple-pulse fractionated vacuum sterilization meeting strict European EN 13060 standards.",
    description:
      "Draws a deep fractional vacuum to remove 100% of trapped air, forcing saturated steam at 134°C into every microscopic hollow channel of surgical instruments. All tools are sealed in tamper-evident barrier pouches opened only at your chairside.",
    image: images.about.clinicInterior,
    imageAlt: "Sterilization lab with Class-B autoclaves",
    badge: "EN 13060 Certified",
    specs: [
      { label: "Cycle Protocol", value: "EN 13060 Class-B" },
      { label: "Temperature", value: "134°C Superheated Steam" },
      { label: "Spore Monitoring", value: "Weekly Independent Lab" },
      { label: "Chain of Custody", value: "Chairside Pouch Unsealed" },
    ],
    clinicalBenefit: "Guarantees hospital cleanroom sterility and complete peace of mind for you and your family.",
  },
];

const FOUR_SAFETY_PILLARS = [
  {
    title: "Class-B Vacuum Autoclave Sterilization",
    badge: "Sterilization Standard",
    desc: "Every reusable instrument undergoes multi-stage ultrasonic scrubbing followed by hospital-standard vacuum autoclave sterilization with chemical and biological spore indicators.",
    image: images.about.details,
    imageAlt: "Sterilized clinical instrument tray",
    icon: <Shield01Icon className="w-5 h-5 text-primary" />,
    specs: [
      { label: "Cycle Protocol", value: "EN 13060 Class-B" },
      { label: "Barrier Protocol", value: "100% Single-Use Sterile Pouches" },
    ],
    highlights: [
      "Weekly biological spore culture testing",
      "Tamper-evident pouches unsealed at chairside",
      "Digital batch traceability for all surgical kits",
    ],
  },
  {
    title: "Surgical-Air Filtration & Exchange",
    badge: "Continuous Turnover",
    desc: "Continuous operatory air exchange every 8 minutes via medical-grade HEPA-14 filtration paired with in-duct airborne UV-C neutralization units.",
    image: images.about.treatmentRoom,
    imageAlt: "Operatory suite with air purification",
    icon: <HealthIcon className="w-5 h-5 text-primary" />,
    specs: [
      { label: "Air Cleanliness", value: "HEPA-14 Medical Filtration" },
      { label: "Disinfection Cycle", value: "Continuous 8-Min Exchange" },
    ],
    highlights: [
      "Filters 99.97% of airborne aerosols to 0.1 µm",
      "Continuous germicidal UV-C in-duct sterilization",
      "Negative pressure air currents protect patient zones",
    ],
  },
  {
    title: "Biocompatible European Ceramics",
    badge: "Material Purity",
    desc: "We exclusively utilize Swiss ceramic zirconia and American Grade-5 titanium implants with complete biocompatibility verification for long-term health.",
    image: images.about.clinicInterior,
    imageAlt: "Luxury clinical operatory suite",
    icon: <DentalToothIcon className="w-5 h-5 text-primary" />,
    specs: [
      { label: "Restoration Origin", value: "Swiss Zirconia Ceramics" },
      { label: "Safety Standard", value: "100% BPA & Nickel Free" },
    ],
    highlights: [
      "Zero toxic cytotoxic monomers or heavy metals",
      "Biologically inert with gum tissue harmony",
      "Hand-polished surfaces prevent plaque adherence",
    ],
  },
  {
    title: "Low-Dose 3D Cone Beam Imaging",
    badge: "Sub-Millimeter Accuracy",
    desc: "Ultra-precise 3D CBCT scanners capture jaw anatomy with low-dose radiation protocols, providing instantaneous diagnostic clarity for computer-guided procedures.",
    image: images.about.dentalTechnology,
    imageAlt: "3D Cone beam diagnostic scanner",
    icon: <MicroscopeIcon className="w-5 h-5 text-primary" />,
    specs: [
      { label: "Scan Precision", value: "0.02mm Optical Tolerance" },
      { label: "Radiation Protocol", value: "Ultra-Low Dose (ALARA)" },
    ],
    highlights: [
      "Immediate chairside 3D diagnostic review",
      "Sub-millimeter nerve canal and bone mapping",
      "Up to 80% lower radiation than hospital CTs",
    ],
  },
];

const ACCREDITATIONS = siteConfig.accreditations || [];

export function AboutClinical() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();
  const [selectedToolIndex, setSelectedToolIndex] = useState(0);

  const activeTool = DIGITAL_TOOLS[selectedToolIndex];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* =========================================================================
          SECTION 1: "Results That Truly Matter" (High-Impact Bento Metrics)
          Directly inspired by Reference 2, rendered with custom design tokens.
         ========================================================================= */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Documented Clinical Results
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-tight">
              Results That Truly Matter
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Measurable clinical benchmarks engineered to eliminate patient anxiety, minimize tissue disruption, and deliver lasting structural health.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-muted-foreground bg-muted/40 px-4 py-2 rounded-xl border border-border/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>CLINICAL BENCHMARKS VERIFIED 2026</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Card A: 99.4% Sterility Score (lg:col-span-4) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Shield01Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  EN 13060 Class-B
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-heading font-bold text-foreground tracking-tight mb-2">
                99.4<span className="text-primary">%</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                Sterility &amp; Bio-Compatibility Rating
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Hospital-grade vacuum autoclave cycle validated with independent biological spore ampoules and chemical integrators on every single run.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-primary font-semibold">
              <CheckmarkBadge01Icon className="w-4 h-4" />
              <span>Zero cross-contamination incident record</span>
            </div>
          </motion.div>

          {/* Card B: High-Res Technology Spotlight with 0.02mm Badge (lg:col-span-5) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="lg:col-span-5 relative min-h-[300px] sm:min-h-[340px] rounded-3xl overflow-hidden border border-border/80 shadow-xs group"
          >
            <Image
              src={images.about.dentalTechnology}
              alt="Digital precision dental operatory technology"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="backdrop-blur-md bg-white/15 text-white border border-white/20 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                Live 3D CAD/CAM System
              </div>
              <div className="backdrop-blur-md bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Precision Fit
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="text-3xl sm:text-4xl font-heading font-bold text-white mb-1">
                0.02 <span className="text-primary-foreground font-sans text-xl">mm</span>
              </div>
              <h4 className="text-base font-bold text-white">Sub-Millimeter Optical Margin Accuracy</h4>
              <p className="text-xs text-white/80 mt-1 max-w-sm leading-relaxed">
                CEREC 3D digital impressions eliminate gaps, micro-leakage, and unpleasant impression putty.
              </p>
            </div>
          </motion.div>

          {/* Card C: 5k+ Procedures Completed (lg:col-span-3) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <StarIcon className="w-6 h-6 fill-amber-500" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-muted text-foreground">
                  15+ Years
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-heading font-bold text-foreground tracking-tight mb-2">
                5k<span className="text-primary">+</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                Guided Procedures Completed
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Computer-guided implant placements and custom porcelain restorations completed with an exceptional 98.7% five-year survival rate.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border/60 text-xs font-semibold text-muted-foreground">
              Across Austin &amp; Central Texas
            </div>
          </motion.div>

          {/* Card D: 97% First-Visit Comfort Score (lg:col-span-6) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-muted/40 border border-border/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Patient Experience Index</span>
              </div>
              <div className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-1">
                97<span className="text-primary">%</span> <span className="text-base font-sans font-normal text-muted-foreground">Comfort Rating</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                First-visit patients reporting complete absence of discomfort thanks to whisper-quiet 42 dB electric micromotors and needle-free surface numbing.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center shrink-0">
              <div className="p-3 rounded-2xl bg-card border border-border/60">
                <div className="text-lg font-bold text-foreground">42 dB</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Quiet Handpiece</div>
              </div>
              <div className="p-3 rounded-2xl bg-card border border-border/60">
                <div className="text-lg font-bold text-primary">0</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Bone Vibration</div>
              </div>
            </div>
          </motion.div>

          {/* Card E: 8-Min Surgical Air Turnover (lg:col-span-6) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="lg:col-span-6 p-6 sm:p-7 rounded-3xl bg-muted/40 border border-border/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Air Purity Architecture</span>
              </div>
              <div className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-1">
                8 <span className="text-base font-sans font-normal text-muted-foreground">Min Complete Air Turnover</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Continuous operatory air exchange with medical HEPA-14 scrubbers capturing 99.97% of aerosols down to 0.1 µm, paired with in-duct germicidal UV-C.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center shrink-0">
              <div className="p-3 rounded-2xl bg-card border border-border/60">
                <div className="text-lg font-bold text-foreground">HEPA-14</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Hospital Grade</div>
              </div>
              <div className="p-3 rounded-2xl bg-card border border-border/60">
                <div className="text-lg font-bold text-primary">UV-C</div>
                <div className="text-[10px] text-muted-foreground font-semibold">In-Duct Sterilized</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: "Digital Tools For Dentistry" (Reference 1 & 2 Fusion)
          Combines Reference 1's numbered precision list with Reference 2's high-tech preview.
         ========================================================================= */}
      <section className="pt-4">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Digital Tools For Dentistry
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-tight">
            Equipment Chosen for Comfort and Precision
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Key clinical hardware we use that saves you time, enhances diagnostic accuracy, and keeps you comfortable throughout your treatment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Numbered Hardware List (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            {DIGITAL_TOOLS.map((tool, idx) => {
              const isSelected = selectedToolIndex === idx;
              return (
                <div
                  key={tool.id}
                  onClick={() => setSelectedToolIndex(idx)}
                  className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl cursor-pointer border transition-all duration-300 ${
                    isSelected
                      ? "bg-card border-primary/60 shadow-md ring-1 ring-primary/20"
                      : "bg-muted/20 border-border/70 hover:bg-card hover:border-border"
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Number Badge */}
                    <div
                      className={`text-sm sm:text-base font-mono font-bold w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tool.num}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-base sm:text-lg font-heading font-bold text-foreground">
                          {tool.title}
                        </h3>
                        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {tool.badge}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-foreground/80 font-medium mb-2 leading-snug">
                        {tool.tagline}
                      </p>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        {tool.description}
                      </p>

                      {/* Specs Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-border/60">
                        {tool.specs.map((sp, sIdx) => (
                          <div key={sIdx} className="bg-muted/40 p-2 rounded-lg border border-border/40">
                            <span className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground block">
                              {sp.label}
                            </span>
                            <span className="text-[11px] font-bold text-foreground block truncate">
                              {sp.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Showcase (lg:col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-3xl bg-card border border-border/80 shadow-md p-6 overflow-hidden">
              {/* Photo Showcase */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 border border-border/60">
                <Image
                  src={activeTool.image}
                  alt={activeTool.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 backdrop-blur-md bg-card/90 text-foreground text-xs font-bold px-3 py-1.5 rounded-full border border-border/60 shadow-sm">
                  Hardware Showcase #{activeTool.num}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary-foreground/90 mb-0.5">
                    Active Clinical Protocol
                  </div>
                  <div className="text-sm font-bold truncate">
                    {activeTool.title}
                  </div>
                </div>
              </div>

              {/* Clinical Benefit Highlight */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wide mb-1">
                    <CheckmarkCircle01Icon className="w-4 h-4" />
                    <span>Direct Patient Benefit</span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed font-medium">
                    &ldquo;{activeTool.clinicalBenefit}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                  <span>Standard at every appointment</span>
                  <span className="font-semibold text-primary">In-Network Covered</span>
                </div>

                <Button
                  size="lg"
                  variant="cta"
                  onClick={() => openBooking()}
                  className="w-full h-11 rounded-xl text-sm font-semibold touch-manipulation shadow-sm"
                >
                  <Calendar01Icon className="w-4 h-4 mr-2" />
                  <span>Experience This In Your First Visit</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "Hospital Cleanroom & Infection Prevention Architecture"
          The core four safety pillars upgraded with verified specifications.
         ========================================================================= */}
      <section className="pt-4">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Cleanroom Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight leading-tight">
            Four Pillars of Clinical Safety
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Our practice operates under rigorous medical cleanliness, instrument sterilization, and air-purity protocols, giving you and your family complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {FOUR_SAFETY_PILLARS.map((pillar, index) => (
            <motion.div
              key={index}
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.08 }}
              className="flex flex-col group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="rounded-3xl bg-card p-6 sm:p-7 flex flex-col justify-between flex-1 border border-border/80 shadow-xs hover:shadow-lg hover:border-primary/40 transition-all duration-300">
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
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                    {pillar.desc}
                  </p>

                  {/* High-Impact Highlights List */}
                  <div className="space-y-1.5 mb-6">
                    {pillar.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-foreground/90 font-medium">
                        <CheckmarkBadge01Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
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
      </section>

      {/* =========================================================================
          SECTION 4: "Medical Governance, Affiliations & Clinician Safety Pledge"
          Trust badges, board certifications, and lead doctor commitment.
         ========================================================================= */}
      <section className="rounded-3xl bg-muted/30 p-6 sm:p-10 lg:p-12 border border-border/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 pb-6 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Medical Governance
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full border border-border/50">
                Board Certified
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground">
              Professional Affiliations &amp; Accreditations
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl">
              Our clinical faculty holds ongoing fellowships and active board credentials with premier dental authorities.
            </p>
          </div>
          <Button
            size="lg"
            variant="cta"
            onClick={() => openBooking()}
            className="w-full md:w-auto h-11 rounded-xl text-sm font-semibold touch-manipulation shadow-sm"
          >
            <Calendar01Icon className="size-4 shrink-0 mr-2" aria-hidden="true" />
            <span>Schedule Clinical Consultation</span>
          </Button>
        </div>

        {/* Accreditations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {ACCREDITATIONS.map((acc, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-card border border-border/70 flex flex-col justify-between hover:border-primary/50 transition-all shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Certificate01Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                    {acc.code}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {acc.name}
                </h4>
                <div className="text-[11px] font-medium text-primary mb-2">
                  {acc.credential}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {acc.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Verified Active</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckmarkCircle01Icon className="w-3.5 h-3.5" /> Good Standing
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Clinician Safety Pledge Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-xs flex flex-col lg:flex-row items-center gap-6">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-primary/20 shadow-md">
            <Image
              src={images.doctors["dr-sarah-jenkins"]}
              alt="Dr. Sarah Jenkins - Lead Clinical Director"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-2">
              <Shield01Icon className="w-3.5 h-3.5" />
              Lead Clinician Safety Pledge
            </div>
            <p className="text-sm sm:text-base text-foreground font-medium italic leading-relaxed mb-3">
              &ldquo;Our clinical philosophy is simple: we never compromise on safety, sterility, or biocompatible materials. Every protocol here is designed to the same rigorous standard we demand for our own families.&rdquo;
            </p>
            <div className="text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Dr. Sarah Jenkins</span> · DDS, TX LIC. 21844 · Lead Cosmetic &amp; Restorative Clinician
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl text-xs font-semibold border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
            >
              <Call02Icon className="w-4 h-4 text-primary" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <Button
              size="lg"
              variant="cta"
              onClick={() => openBooking()}
              className="w-full sm:w-auto h-11 rounded-xl text-xs font-semibold shadow-xs"
            >
              <span>Book Appointment</span>
              <ArrowRight01Icon className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
