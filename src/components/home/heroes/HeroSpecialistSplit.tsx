"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, Shield01Icon, CheckmarkBadge01Icon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";

const SPECIALISTS = siteConfig.doctors.slice(0, 3).map((doctor, index) => ({
  id: doctor.id,
  tabLabel: `0${index + 1} / ${doctor.specialty.toUpperCase()}`,
  name: doctor.name,
  role: doctor.role,
  credentials: doctor.qualifications,
  highlight: `${doctor.specializations.slice(0, 2).join(" · ")} · ${doctor.experience}`,
  image: doctor.image,
  badge: "Board-Certified",
}));

export function HeroSpecialistSplit() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();
  const [activeDoctorId, setActiveDoctorId] = useState<string>(SPECIALISTS[0]?.id || "");
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Smooth 4-second auto-cycle across specialist profiles (pauses on hover)
  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const interval = setInterval(() => {
      setActiveDoctorId((prev) => {
        const currentIndex = SPECIALISTS.findIndex((d) => d.id === prev);
        const nextIndex = (currentIndex + 1) % SPECIALISTS.length;
        return SPECIALISTS[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, reduceMotion]);

  const currentDoctor =
    SPECIALISTS.find((d) => d.id === activeDoctorId) || SPECIALISTS[0];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.05,
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
    <section className="relative min-h-[82vh] lg:min-h-[85vh] pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-32 lg:pb-24 overflow-hidden bg-[#07142A] text-white flex flex-col justify-center">
      {/* Subtle technical grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
      />

      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Clinical Credentials & Authority */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span>FELLOWSHIP-TRAINED CLINICAL FACULTY</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-heading font-bold text-white leading-[1.08] tracking-tight mb-4 text-balance"
            >
              The standard <br />
              of care,{" "}
              <span className="italic font-normal text-accent font-serif">
                quietly redefined.
              </span>
            </motion.h1>

            {/* Subtitle - Short, Clear, Outcome-Driven */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 max-w-lg font-normal"
            >
              Board-certified specialists with 15+ years of practice. Unhurried 60-minute consultations with zero sales pressure.
            </motion.p>

            {/* 3-Metrics Row with Generous Spatial Breathing Room */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 sm:gap-6 py-4 border-y border-white/10 mb-7 max-w-xl w-full"
            >
              <div>
                <p className="text-xl sm:text-2xl font-heading font-bold text-white">
                  <CountUp end={siteConfig.clinic.stats.yearsExperience} duration={2} enableScrollSpy scrollSpyOnce />+
                </p>
                <p className="text-[10px] sm:text-[11px] text-white/55 font-medium uppercase tracking-wider mt-1 leading-snug">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-heading font-bold text-white">
                  {siteConfig.clinic.stats.patientsTreated}
                </p>
                <p className="text-[10px] sm:text-[11px] text-white/55 font-medium uppercase tracking-wider mt-1 leading-snug">
                  Smiles Transformed
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-heading font-bold text-white">
                  {siteConfig.clinic.stats.satisfactionScore}<span className="text-accent">%</span>
                </p>
                <p className="text-[10px] sm:text-[11px] text-white/55 font-medium uppercase tracking-wider mt-1 leading-snug">
                  Comfort Score
                </p>
              </div>
            </motion.div>

            {/* Dual CTAs with Button-in-Button Trailing Icon */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold shadow-xl shadow-black/25 px-6 h-12 flex items-center gap-2.5 cursor-pointer group"
              >
                <Link href="/doctors">
                  <span>Meet the Specialists</span>
                  <span className="w-6 h-6 rounded-full bg-slate-950/10 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight01Icon className="size-3.5 text-slate-950" aria-hidden="true" />
                  </span>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={openBooking}
                className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white px-6 h-12 font-semibold cursor-pointer"
              >
                <span>Book a consultation</span>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Interactive Double-Bezel Specialist Showcase (Auto-cycles, pauses on hover) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top Interactive Doctor Selector Tabs */}
            <div className="flex items-center gap-1.5 mb-3 p-1 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-md">
              {SPECIALISTS.map((doc) => {
                const isActive = doc.id === activeDoctorId;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setActiveDoctorId(doc.id)}
                    className={`relative overflow-hidden flex-1 py-1.5 px-2 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase rounded-lg transition-all cursor-pointer text-center ${
                      isActive
                        ? "bg-white text-slate-950 shadow-md"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="relative z-10">{doc.tabLabel}</span>
                    {isActive && !isPaused && !reduceMotion && (
                      <motion.div
                        key={doc.id}
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

            {/* Double-Bezel Machined Outer Frame */}
            <div className="p-2 sm:p-2.5 rounded-[2rem] bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
              {/* Inner Core Container */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] max-h-[460px] rounded-[calc(2rem-0.625rem)] overflow-hidden bg-slate-900 group mx-auto w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDoctor.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentDoctor.image}
                      alt={currentDoctor.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent pointer-events-none" />

                    {/* Top-Right Verified Badge Pill */}
                    <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold uppercase tracking-wider shadow-sm z-10">
                      <CheckmarkBadge01Icon className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                      <span>{currentDoctor.badge}</span>
                    </div>

                    {/* Floating Doctor Credential Glass Dock */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-slate-950/80 backdrop-blur-xl border border-white/20 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-2xl z-10">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
                        <Shield01Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-heading font-bold text-white truncate">
                          {currentDoctor.name}
                        </h3>
                        <p className="text-xs text-white/85 font-medium truncate">{currentDoctor.role}</p>
                        <p className="text-[10px] text-accent font-mono uppercase tracking-wider font-semibold truncate mt-0.5">
                          {currentDoctor.highlight}
                        </p>
                      </div>
                    </div>
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

