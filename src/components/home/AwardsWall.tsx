"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Shield01Icon,
  CheckmarkBadge01Icon,
  MicroscopeIcon,
  Award01Icon,
} from "hugeicons-react";
import siteConfig, { type AccreditationConfig } from "@/config/site";

function AccreditationIcon({ type }: { type?: AccreditationConfig["badgeType"] }) {
  switch (type) {
    case "diamond":
      // AACD Cosmetic Diamond Facet
      return (
        <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" aria-hidden="true">
          <polygon
            points="20,5 34,14 20,35 6,14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="6" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="1.5" />
          <line x1="20" y1="5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.4" />
          <line x1="20" y1="5" x2="26" y2="14" stroke="currentColor" strokeWidth="1.4" />
          <line x1="14" y1="14" x2="20" y2="35" stroke="currentColor" strokeWidth="1.4" />
          <line x1="26" y1="14" x2="20" y2="35" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "align":
      // Invisalign Diamond Apex Crystal
      return (
        <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500" aria-hidden="true">
          <path
            d="M20 3L35 12V28L20 37L5 28V12L20 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M20 3V37" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
          <path d="M5 12L20 20L35 12" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 28L20 20L35 28" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "implant":
      // AAID Implant Fixture & Precision Compass
      return (
        <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" aria-hidden="true">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.6" />
          <path d="M20 9L25 12V17L20 20L15 17V12L20 9Z" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="23" x2="24" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="17" y1="27" x2="23" y2="27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="18" y1="31" x2="22" y2="31" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "swiss":
      // Swiss Dental Precision Bezel & Cross
      return (
        <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" aria-hidden="true">
          <rect x="5" y="5" width="30" height="30" rx="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M17 11H23V17H29V23H23V29H17V23H11V17H17V11Z" fill="currentColor" />
        </svg>
      );
    case "globe":
      // ICOI Global Mastership Laurel
      return (
        <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" aria-hidden="true">
          <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.6" />
          <ellipse cx="20" cy="20" rx="7" ry="14" stroke="currentColor" strokeWidth="1.4" />
          <line x1="6" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="10" cy="9" r="1.5" fill="currentColor" />
          <circle cx="30" cy="9" r="1.5" fill="currentColor" />
          <circle cx="20" cy="5" r="1.5" fill="currentColor" />
        </svg>
      );
    case "nodes":
      // ITI Research Network Tri-Node
      return (
        <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" aria-hidden="true">
          <circle cx="20" cy="11" r="5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="11" cy="27" r="5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="29" cy="27" r="5" stroke="currentColor" strokeWidth="1.8" />
          <line x1="17" y1="15" x2="13" y2="23" stroke="currentColor" strokeWidth="1.6" />
          <line x1="23" y1="15" x2="27" y2="23" stroke="currentColor" strokeWidth="1.6" />
          <line x1="16" y1="27" x2="24" y2="27" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "zeiss":
      // Zeiss Optical Aperture Blade Lens
      return (
        <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" aria-hidden="true">
          <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 5L28 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M33 13L25 27" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M33 27L18 29" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M20 35L12 23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M7 27L15 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M7 13L22 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="20" cy="20" r="3" fill="currentColor" />
        </svg>
      );
    case "shield":
    default:
      // ADA Heraldic Crest: Shield with Rod of Asclepius & Laurel
      return (
        <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true">
          <path
            d="M20 4L7 9V18C7 26.5 12.5 34.3 20 36.5C27.5 34.3 33 26.5 33 18V9L20 4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="20" y1="11" x2="20" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M17 14C19 13 22 14 22 17C22 20 18 19 18 22C18 24 21 25 23 25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function AwardsWall() {
  const shouldReduceMotion = useReducedMotion();

  // Accreditations dynamically derived from siteConfig.accreditations
  const accreditations = siteConfig.accreditations || [];
  const carouselItems = [...accreditations, ...accreditations, ...accreditations];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-muted/20 dark:bg-slate-950/40 border-y border-border/60 overflow-hidden relative">
      {/* Background Architectural Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/[0.03] dark:bg-primary/[0.05] rounded-full blur-[120px] pointer-events-none"
      />

      {/* Top Editorial Authority Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-8 sm:mb-12 text-center relative z-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            <span>Clinical Governance &amp; Medical Board Alliances</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground tracking-tight leading-tight mb-3">
            Accredited Excellence.{" "}
            <span className="text-primary italic font-serif font-normal">Globally Governed.</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
            Every clinical procedure adheres to the strict ethical protocols, sub-millimeter tolerances, and biological material certifications of premier global dental authorities.
          </p>
        </motion.div>
      </div>

      {/* Infinite Accreditations Carousel Track with Hover Pause */}
      <div className="relative flex overflow-x-hidden group mb-10 sm:mb-14">
        <div className="animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap flex items-center gap-4 sm:gap-6 py-2">
          {carouselItems.map((item, index) => (
            <div
              key={`${item.id || item.name}-${index}`}
              className="inline-flex items-center gap-3.5 p-1 rounded-2xl bg-muted/40 border border-border/70 hover:border-primary/50 shadow-xs hover:shadow-md transition-all duration-300 cursor-default select-none group/card"
            >
              <div className="px-4 py-3 rounded-[calc(1rem-2px)] bg-card border border-border/50 flex items-center gap-3.5">
                {/* Emblem Container */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center shrink-0 group-hover/card:scale-105 transition-transform duration-300">
                  <AccreditationIcon type={item.badgeType} />
                </div>

                {/* Text Hierarchy */}
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-xs sm:text-sm tracking-tight text-foreground group-hover/card:text-primary transition-colors">
                      {item.name}
                    </span>
                    {item.code && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-primary/10 text-primary border border-primary/20">
                        {item.code}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium tracking-wide mt-0.5 max-w-[280px] truncate">
                    {item.credential || item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left / Right Seamless Vignette Gradients */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-24 sm:w-48 h-full bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none z-10"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-24 sm:w-48 h-full bg-gradient-to-l from-background via-background/90 to-transparent pointer-events-none z-10"
        />
      </div>

      {/* Bottom Trust & Verification Guarantee Bar (Driven by siteConfig) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
          {/* Pillar 1: Certified Faculty */}
          <div className="p-1.5 rounded-2xl bg-muted/40 border border-border/70 shadow-xs hover:border-primary/40 transition-all duration-300">
            <div className="p-4 sm:p-5 rounded-[calc(1rem-2px)] bg-card border border-border/40 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Award01Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-[9px] font-mono font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                  FACULTY
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground font-heading">
                  {siteConfig.clinic.stats.certifiedDentists} Board-Certified Specialists
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                  Accredited fellowship clinicians with an average of {siteConfig.clinic.stats.yearsExperience}+ years of surgical experience.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 2: Micro-Precision */}
          <div className="p-1.5 rounded-2xl bg-muted/40 border border-border/70 shadow-xs hover:border-primary/40 transition-all duration-300">
            <div className="p-4 sm:p-5 rounded-[calc(1rem-2px)] bg-card border border-border/40 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MicroscopeIcon className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-[9px] font-mono font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                  0.02MM
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground font-heading">
                  Sub-Millimeter CAD/CAM
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                  Low-dose CBCT 3D volumetric scans delivering microscopic margin fit without putty trays.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 3: Asepsis & Clean Air */}
          <div className="p-1.5 rounded-2xl bg-muted/40 border border-border/70 shadow-xs hover:border-primary/40 transition-all duration-300">
            <div className="p-4 sm:p-5 rounded-[calc(1rem-2px)] bg-card border border-border/40 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Shield01Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-[9px] font-mono font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                  CLASS-B
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground font-heading">
                  Hospital-Grade Asepsis
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                  Continuous HEPA-14 air turnover every 8 minutes and 100% single-use sterile barrier protocol.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar 4: Verified Patient Outcomes */}
          <div className="p-1.5 rounded-2xl bg-muted/40 border border-border/70 shadow-xs hover:border-primary/40 transition-all duration-300">
            <div className="p-4 sm:p-5 rounded-[calc(1rem-2px)] bg-card border border-border/40 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <CheckmarkBadge01Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-[9px] font-mono font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                  VERIFIED
                </span>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground font-heading">
                  {siteConfig.clinic.stats.rating.toFixed(2)} / 5.0 Star Rating
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                  Validated across {siteConfig.clinic.stats.reviewsCount}+ patient reviews and {siteConfig.clinic.stats.patientsTreated} smiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
