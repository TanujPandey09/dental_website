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
    <section className="relative min-h-[80vh] lg:min-h-[85vh] pt-16 sm:pt-28 pb-24 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-background text-foreground border-b border-border/60 flex flex-col justify-center">
      {/* Subtle ambient lighting orbs */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="shell relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Clinical Credentials & Authority */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span>FELLOWSHIP-TRAINED CLINICAL FACULTY</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[52px] font-sans font-medium text-foreground leading-[1.1] tracking-[-0.03em] mb-3 text-balance"
            >
              The standard of care,{" "}
              <span className="inline-block rounded-md bg-primary/20 text-foreground px-2 py-0.5 font-normal">
                quietly redefined.
              </span>
            </motion.h1>

            {/* Subtitle - Short, Clear, Outcome-Driven */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-lg font-normal"
            >
              Board-certified specialists with 15+ years of practice. Unhurried 60-minute consultations with zero sales pressure.
            </motion.p>

            {/* 3-Metrics Row with Generous Spatial Breathing Room */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-6 py-4 border-y border-border/80 mb-6 max-w-xl w-full"
            >
              <div>
                <p className="text-xl sm:text-2xl font-sans font-semibold text-foreground tracking-tight">
                  <CountUp end={siteConfig.clinic.stats.yearsExperience} duration={2} enableScrollSpy scrollSpyOnce />+
                </p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5 leading-snug">
                  Years Exp.
                </p>
              </div>
              <div className="border-l border-border/80 pl-3 sm:pl-4">
                <p className="text-xl sm:text-2xl font-sans font-semibold text-foreground tracking-tight">
                  {siteConfig.clinic.stats.patientsTreated}
                </p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5 leading-snug">
                  Restored
                </p>
              </div>
              <div className="border-l border-border/80 pl-3 sm:pl-4">
                <p className="text-xl sm:text-2xl font-sans font-semibold text-foreground tracking-tight">
                  {siteConfig.clinic.stats.satisfactionScore}<span className="text-primary">%</span>
                </p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5 leading-snug">
                  Comfort
                </p>
              </div>
            </motion.div>

            {/* Dual CTAs — In a row */}
            <motion.div variants={itemVariants} className="flex flex-row items-center gap-2.5 sm:gap-3">
              <Button
                asChild
                size="default"
                className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-xs px-4 sm:px-5 h-10 sm:h-11 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer group text-xs sm:text-sm shrink-0"
              >
                <Link href="/doctors">
                  <span>View Specialists</span>
                  <ArrowRight01Icon className="size-3.5 sm:size-4 shrink-0 transition-transform group-hover:translate-x-0.5 text-primary-foreground" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                size="default"
                variant="outline"
                onClick={openBooking}
                className="rounded-lg border-border/80 bg-background hover:bg-muted text-foreground px-4 sm:px-5 h-10 sm:h-11 font-semibold cursor-pointer text-xs sm:text-sm justify-center shrink-0 shadow-2xs"
              >
                <span>Book Visit</span>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Interactive Specialist Showcase (Single Crisp Card) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top Interactive Doctor Selector Tabs */}
            <div className="flex items-center gap-1.5 mb-2.5 p-1 rounded-xl bg-muted/80 border border-border/70">
              {SPECIALISTS.map((doc) => {
                const isActive = doc.id === activeDoctorId;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setActiveDoctorId(doc.id)}
                    className={`relative overflow-hidden flex-1 min-h-[36px] sm:min-h-[38px] py-1 px-1 sm:px-2 text-[9px] xs:text-[10px] sm:text-[11px] font-mono font-bold tracking-tight sm:tracking-wider uppercase rounded-lg transition-all cursor-pointer text-center touch-manipulation flex items-center justify-center ${
                      isActive
                        ? "bg-background text-foreground shadow-xs font-extrabold"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }`}
                  >
                    <span className="relative z-10 truncate">{doc.tabLabel}</span>
                    {isActive && !isPaused && !reduceMotion && (
                      <motion.div
                        key={doc.id}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-[2px] bg-primary"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Clean Single-Frame Container */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] max-h-[440px] rounded-2xl overflow-hidden bg-muted border border-border/80 shadow-xl group mx-auto w-full">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Top-Right Verified Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold uppercase tracking-wider shadow-xs z-10">
                    <CheckmarkBadge01Icon className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                    <span>{currentDoctor.badge}</span>
                  </div>

                  {/* Floating Doctor Credential Glass Dock */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-xl border border-white/20 rounded-xl p-3 flex items-center gap-3 shadow-xl z-10 text-white">
                    <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
                      <Shield01Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-sans font-semibold text-white truncate">
                        {currentDoctor.name}
                      </h3>
                      <p className="text-xs text-white/80 font-medium truncate">{currentDoctor.role}</p>
                      <p className="text-[10px] text-teal-300 font-mono uppercase tracking-wider font-semibold truncate mt-0.5">
                        {currentDoctor.highlight}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

