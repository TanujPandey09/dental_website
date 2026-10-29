"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, CheckmarkBadge01Icon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants, useReducedMotion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

const DEFAULT_ARCHITECTURAL_PILLARS = [
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
];

export function HeroImmersive() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();
  const immersiveSlide = siteConfig.heroSlides?.find((s) => s.id === "immersive");
  const architecturalPillars = siteConfig.hero.architecturalPillars || DEFAULT_ARCHITECTURAL_PILLARS;
  const [activePillarId, setActivePillarId] = useState<string>(architecturalPillars[0]?.id || "acoustics");
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Smooth 4-second auto-cycle across architectural engineering pillars (pauses on hover)
  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const interval = setInterval(() => {
      setActivePillarId((prev) => {
        const currentIndex = architecturalPillars.findIndex((p) => p.id === prev);
        const nextIndex = (currentIndex + 1) % architecturalPillars.length;
        return architecturalPillars[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, reduceMotion, architecturalPillars]);

  const currentPillar =
    architecturalPillars.find((p) => p.id === activePillarId) || architecturalPillars[0];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.06,
        delayChildren: 0,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.45, ease: [0.32, 0.72, 0, 1] },
    },
  };

  return (
    <section className="relative min-h-[80vh] lg:min-h-[85vh] pt-16 sm:pt-28 pb-24 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-[#07142A] text-white flex flex-col justify-center">
      {/* Full-bleed Architectural Clinic Photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images.heroArchitectural || images.clinicInterior}
          alt="Lumina Dental Architectural Treatment Suite"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-100"
        />
        {/* Architectural Left-Anchor Gradient Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#07142A]/95 via-[#07142A]/80 to-[#07142A]/40 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#07142A]/90 via-transparent to-[#07142A]/60 pointer-events-none"
        />
      </div>

      <div className="shell relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Architectural Manifesto & Booking */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Architectural Eyebrow Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 backdrop-blur-md text-white/90 text-xs font-semibold mb-3 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="tracking-wide uppercase text-[10px] sm:text-[11px] font-mono">
                {immersiveSlide?.badge || "ACOUSTIC SANCTUARY ARCHITECTURE"}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.85rem] font-heading font-bold text-white leading-[1.12] tracking-tight mb-3 text-balance"
            >
              {immersiveSlide?.headline || "Space to breathe."} <br />
              <span className="italic font-normal text-accent font-serif">
                {immersiveSlide?.headlineAccent || "Care to remember."}
              </span>
            </motion.h1>

            {/* Subtitle - Short, Scannable Outcome Line */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-white/80 leading-relaxed mb-5 max-w-lg font-normal"
            >
              {immersiveSlide?.description ||
                "Hospital-grade HEPA-14 air filtration, natural daylight operatory suites, and acoustic wall dampening designed around nervous patients."}
            </motion.p>

            {/* Dual CTAs — Rectangular rounded-lg with inline pixel-perfect icons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-row items-center gap-2.5 sm:gap-3 mb-5"
            >
              <Button
                size="default"
                onClick={openBooking}
                className="rounded-lg bg-white text-slate-950 hover:bg-slate-100 font-semibold shadow-md px-3.5 sm:px-5 h-10 sm:h-11 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer group touch-manipulation text-xs sm:text-sm shrink-0"
              >
                <span>{immersiveSlide?.primaryCtaText || "Reserve Suite"}</span>
                <ArrowRight01Icon className="size-3.5 sm:size-4 shrink-0 text-slate-950 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>

              <Button
                asChild
                size="default"
                variant="outline"
                className="rounded-lg border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-3.5 sm:px-5 h-10 sm:h-11 font-semibold cursor-pointer touch-manipulation text-xs sm:text-sm justify-center shrink-0"
              >
                <Link href={immersiveSlide?.secondaryCtaHref || "/about"}>
                  <span>Virtual Tour</span>
                </Link>
              </Button>
            </motion.div>

            {/* Live Clinic Open Status */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 backdrop-blur-md text-xs text-white/80"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span className="text-white font-semibold">Open Today</span> Until 7:00 PM
              </span>
              <span className="w-px h-3 bg-white/20" aria-hidden="true" />
              <span className="text-[10px] text-accent font-mono uppercase tracking-wider">
                Suites Available Today
              </span>
            </motion.div>
          </div>

          {/* Right Column: Architectural Suite Engineering Matrix (Clean Single Frame) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top Interactive Feature Selector Tabs */}
            <div className="flex items-center gap-1.5 mb-2.5 p-1 rounded-lg bg-white/[0.06] border border-white/10 backdrop-blur-md">
              {architecturalPillars.map((pillar) => {
                const isActive = pillar.id === activePillarId;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillarId(pillar.id)}
                    className={`relative overflow-hidden flex-1 min-h-[36px] sm:min-h-[38px] py-1 px-1 sm:px-2 text-[9px] xs:text-[10px] sm:text-[11px] font-mono font-bold tracking-tight sm:tracking-wider uppercase rounded-md transition-all cursor-pointer text-center touch-manipulation flex items-center justify-center ${
                      isActive
                        ? "bg-white text-slate-950 shadow-xs font-extrabold"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="relative z-10 truncate">{pillar.tabLabel}</span>
                    {isActive && !isPaused && !reduceMotion && (
                      <motion.div
                        key={pillar.id}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-[2px] bg-accent"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Clean Single Frame */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] max-h-[440px] rounded-xl overflow-hidden bg-slate-900 border border-white/15 shadow-2xl group mx-auto w-full">
              <Image
                src={images.heroArchitectural || images.clinicInterior}
                alt="Architectural Suite Interior"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent pointer-events-none" />

              {/* Top-Right Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold uppercase tracking-wider shadow-xs z-10">
                <CheckmarkBadge01Icon className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                <span>Hospital-Grade</span>
              </div>

              {/* Bottom Floating Engineering Spec Card */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-xl border border-white/20 rounded-lg p-3 sm:p-3.5 shadow-xl z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPillar.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-semibold">
                        {currentPillar.tag}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {currentPillar.stat}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-heading font-bold text-white mb-0.5">
                      {currentPillar.title}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed font-normal">
                      {currentPillar.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
