"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight01Icon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants, useReducedMotion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";

const TREATMENT_TABS = siteConfig.services.slice(0, 4).map((service, index) => ({
  id: service.id,
  label: `0${index + 1} / ${service.category.toUpperCase()}`,
  tag: service.category.toUpperCase(),
  title: service.title,
  desc: service.description,
  image: service.image,
  spec: service.detailBullets?.[0] ? `STANDARD: ${service.detailBullets[0].toUpperCase()}` : "TOLERANCE: 0.02MM · PRECISION CERAMIC",
  href: `/services/${service.id}`,
}));

export function HeroMinimal() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<string>(TREATMENT_TABS[0]?.id || "");
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Smooth 4-second auto-cycle across Swiss treatment protocols (pauses on hover)
  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = TREATMENT_TABS.findIndex((t) => t.id === prev);
        const nextIndex = (currentIndex + 1) % TREATMENT_TABS.length;
        return TREATMENT_TABS[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, reduceMotion]);

  const activeTreatment =
    TREATMENT_TABS.find((t) => t.id === activeTab) || TREATMENT_TABS[0];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, ease: [0.32, 0.72, 0, 1] },
    },
  };

  return (
    <section className="relative min-h-[82vh] lg:min-h-[85vh] pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-32 lg:pb-24 overflow-hidden bg-[#FBFBFC] dark:bg-[#0B0F17] text-foreground border-b border-border/80 flex flex-col justify-center">
      {/* Swiss Hairline Grid Matrix Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Top Swiss System Index Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-2 mb-5 text-[11px] font-mono tracking-widest uppercase text-muted-foreground">
          <div className="flex items-center gap-2.5">
            {/* Iconic Swiss Red Badge */}
            <span className="w-4 h-4 bg-[#E30613] text-white flex items-center justify-center font-bold text-[10px] leading-none shrink-0 rounded-[2px]" aria-label="Swiss Standard">
              +
            </span>
            <span className="font-semibold text-foreground tracking-widest">SWISS CLINICAL RIGOR</span>
            <span className="text-border">/</span>
            <span>STANDARD 8001</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">15+ YRS · 4.9★ RATING · 0.02MM CAD/CAM</span>
            <span className="text-border hidden sm:inline">/</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SUITES AVAILABLE TODAY
            </span>
          </div>
        </div>

        {/* Main Swiss Asymmetric Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Swiss Typographic Authority & Manifesto */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start">
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-black text-foreground leading-[1.08] tracking-tight mb-3 text-balance"
            >
              Dentistry, <br />
              <span className="text-primary font-serif font-normal italic">
                minus the noise.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 max-w-lg font-normal"
            >
              Unhurried consultations. 3D itemized digital plans. Acoustic operatory suites. Everything engineered to inform your decisions with zero sales pressure.
            </motion.p>

            {/* Swiss 3-Pillar Specifications Strip */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5 font-mono text-xs w-full"
            >
              <div className="p-2.5 sm:p-3 rounded-lg bg-card border border-border/70 shadow-sm">
                <span className="text-[10px] text-muted-foreground block mb-0.5">01 / RESOLUTION</span>
                <p className="font-bold text-foreground">0.02mm Digital</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg bg-card border border-border/70 shadow-sm">
                <span className="text-[10px] text-muted-foreground block mb-0.5">02 / MATERIALS</span>
                <p className="font-bold text-foreground">100% Bio-Ceramic</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg bg-card border border-border/70 shadow-sm">
                <span className="text-[10px] text-muted-foreground block mb-0.5">03 / TIME PACE</span>
                <p className="font-bold text-foreground">Unhurried Care</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={openBooking}
                className="rounded-none bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold tracking-wide uppercase text-xs px-7 h-11 sm:h-12 cursor-pointer shadow-sm"
              >
                <span>Reserve Consultation</span>
                <ArrowRight01Icon className="size-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none border-border/90 bg-card hover:bg-muted font-bold tracking-wide uppercase text-xs px-7 h-11 sm:h-12"
              >
                <Link href="/about">
                  <span>Clinical Standard</span>
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Swiss Interactive Treatment Matrix (Auto-cycles, pauses on hover) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 flex flex-col justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="bg-card border border-border/80 shadow-[0_15px_35px_rgba(15,23,42,0.05)] p-4 sm:p-5">
              {/* Top Matrix Navigation Tabs */}
              <div className="border-b border-border/70 pb-3 mb-3.5">
                <div className="flex items-center justify-between mb-2 text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                  <span>TREATMENT SELECTOR MATRIX</span>
                  <span className="text-primary font-bold">CLICK OR HOVER TO PAUSE</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {TREATMENT_TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative overflow-hidden px-2 py-1.5 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase transition-colors text-left cursor-pointer border ${
                          isActive
                            ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-sm"
                            : "bg-muted/40 text-muted-foreground border-border/60 hover:text-foreground hover:bg-muted/80"
                        }`}
                      >
                        <span className="relative z-10">{tab.label}</span>
                        {isActive && !isPaused && !reduceMotion && (
                          <motion.div
                            key={tab.id}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 4, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-[2px] bg-primary dark:bg-slate-900"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Treatment Focus Screen */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-border/70 bg-muted mb-3.5 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTreatment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeTreatment.image}
                      alt={activeTreatment.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                    {/* Swiss Top-Right Coordinate Tag */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-slate-950/80 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] uppercase tracking-widest">
                      {activeTreatment.tag}
                    </div>

                    {/* Bottom Spec Details */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-lg sm:text-xl font-heading font-bold leading-tight mb-1">
                        {activeTreatment.title}
                      </h3>
                      <p className="text-xs text-white/80 line-clamp-2 font-normal mb-1.5">
                        {activeTreatment.desc}
                      </p>
                      <p className="text-[10px] font-mono text-emerald-300 tracking-wider">
                        {activeTreatment.spec}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Link Row with Monospaced Coordinates */}
              <div className="flex items-center justify-between pt-2.5 border-t border-border/60 text-xs">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  DOC: 8001-{activeTreatment.id.toUpperCase()}
                </span>
                <Link
                  href={activeTreatment.href}
                  className="font-bold text-primary hover:underline flex items-center gap-1.5 group text-xs uppercase tracking-wide font-mono"
                >
                  <span>Inspect Protocol</span>
                  <ArrowRight01Icon className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
