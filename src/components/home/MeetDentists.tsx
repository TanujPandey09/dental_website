"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  StarIcon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Calendar01Icon,
  Shield01Icon,
} from "hugeicons-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";

export function MeetDentists() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();

  // Pick top 4 featured specialists directly from siteConfig (100% customizable from config)
  const specialists = siteConfig.doctors.slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeDoctor = specialists[activeIndex] ?? specialists[0];

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-background border-t border-border/40 overflow-hidden">
      <div className="shell">
        {/* Top Header Row with Action Pill */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
          <div>
            <span className="text-muted-foreground/80 text-xs sm:text-sm font-medium tracking-tight block mb-1">
              Specialists /
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.12] text-balance">
              Experienced hands, <br className="hidden sm:inline" />
              unhurried appointments
            </h2>
          </div>

          <button
            type="button"
            onClick={openBooking}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/80 bg-background hover:bg-muted/70 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 cursor-pointer shadow-xs active:scale-95 shrink-0 self-start sm:self-end touch-manipulation"
          >
            <span>Book with a specialist</span>
            <ArrowRight01Icon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
          </button>
        </div>

        {/* ======================================================================= */}
        {/* 1. MOBILE & TABLET VIEW (< lg): Cohesive, Compact & Touch-Friendly      */}
        {/* ======================================================================= */}
        <div className="block lg:hidden">
          {/* Segmented Doctor Selector Pill Bar */}
          <div
            className="flex items-center gap-1 p-1 rounded-full bg-muted/60 border border-border/60 overflow-x-auto no-scrollbar mb-4"
            role="tablist"
            aria-label="Select specialist"
          >
            {specialists.map((doc, idx) => {
              const isActive = idx === activeIndex;
              const firstName = doc.name.split(" ")[1] || doc.name;
              return (
                <button
                  key={doc.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex-1 min-w-[76px] py-1.5 px-2.5 rounded-full text-xs transition-all duration-200 cursor-pointer touch-manipulation whitespace-nowrap text-center ${
                    isActive
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground font-medium"
                  }`}
                >
                  0{idx + 1} {firstName}
                </button>
              );
            })}
          </div>

          {/* Unified Active Doctor Card */}
          <div className="rounded-2xl sm:rounded-3xl bg-card border border-border/80 p-4 xs:p-5 sm:p-6 shadow-xs">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDoctor.id}
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
                className="space-y-3.5 sm:space-y-4"
              >
                {/* Doctor Portrait Header */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-muted border border-border/50">
                  <Image
                    src={activeDoctor.image}
                    alt={activeDoctor.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Rating Pill (bottom-left) */}
                  <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/95 backdrop-blur-md shadow-xs border border-border/60 text-xs font-semibold text-foreground z-10">
                    <StarIcon className="w-3.5 h-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
                    <span>{activeDoctor.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground font-normal ml-0.5">
                      ({activeDoctor.reviews})
                    </span>
                  </div>

                  {/* Availability Pill (top-right) */}
                  {activeDoctor.nextAvailable && (
                    <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-xs z-10">
                      <Calendar01Icon className="w-3 h-3 text-primary" aria-hidden="true" />
                      <span>{activeDoctor.nextAvailable}</span>
                    </div>
                  )}
                </div>

                {/* Doctor Name & Role */}
                <div>
                  <h3 className="text-lg xs:text-xl font-sans font-medium text-foreground tracking-tight">
                    {activeDoctor.name}
                  </h3>
                  <p className="text-xs xs:text-sm font-semibold text-primary mt-0.5">
                    {activeDoctor.role || activeDoctor.specialty}
                  </p>
                </div>

                {/* Doctor Philosophy / Bio */}
                <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {activeDoctor.philosophy || activeDoctor.heroDescription}
                </p>

                {/* 3 Metric Chips */}
                <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-border/60 text-center">
                  <div className="bg-muted/40 rounded-lg p-2">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
                      Experience
                    </p>
                    <p className="text-xs font-bold text-foreground mt-0.5 truncate">
                      {activeDoctor.experience}
                    </p>
                  </div>
                  <div className="bg-muted/40 rounded-lg p-2">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
                      Focus
                    </p>
                    <p className="text-xs font-bold text-foreground mt-0.5 truncate">
                      {activeDoctor.specializations?.[0] || activeDoctor.specialty}
                    </p>
                  </div>
                  <div className="bg-muted/40 rounded-lg p-2">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
                      Care Pacing
                    </p>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 truncate">
                      Unhurried
                    </p>
                  </div>
                </div>

                {/* Sleek Action Row: Buttons in a ROW */}
                <div className="flex flex-row items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={openBooking}
                    className="inline-flex items-center justify-center gap-1.5 h-10 px-4 xs:px-5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs xs:text-sm font-semibold shadow-xs transition-all active:scale-95 cursor-pointer touch-manipulation shrink-0"
                  >
                    <span>Book consultation</span>
                    <ArrowRight01Icon className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/doctors/${activeDoctor.id}`}
                    className="inline-flex items-center justify-center gap-1.5 h-10 px-3.5 xs:px-4 rounded-full border border-border/80 bg-background hover:bg-muted text-foreground text-xs xs:text-sm font-medium transition-all active:scale-95 touch-manipulation shrink-0"
                  >
                    <span>Profile</span>
                    <ArrowUpRight01Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 2. DESKTOP VIEW (lg+): Editorial Two-Column Interactive Row & Portrait  */}
        {/* ======================================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Portrait Card of Active Specialist */}
          <div className="col-span-5 w-full">
            <div className="relative aspect-[4/4.8] w-full rounded-[28px] overflow-hidden bg-muted shadow-md border border-border/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDoctor.id}
                  initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: reduceMotion ? 1 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeDoctor.image}
                    alt={activeDoctor.name}
                    fill
                    sizes="42vw"
                    priority
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Rating Pill: bottom-left */}
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-background/95 backdrop-blur-md shadow-md border border-border/50 text-xs font-semibold text-foreground z-10">
                <StarIcon className="w-3.5 h-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
                <span>{activeDoctor.rating.toFixed(1)}</span>
                <span className="text-muted-foreground font-normal font-sans ml-0.5">
                  {activeDoctor.reviews} reviews
                </span>
              </div>

              {/* Floating Availability Pill: top-right */}
              {activeDoctor.nextAvailable && (
                <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-sm z-10">
                  <Calendar01Icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  <span>{activeDoctor.nextAvailable}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Doctor List & Active Details */}
          <div className="col-span-7 flex flex-col justify-between h-full pt-1">
            {/* Numbered Row List */}
            <div className="border-t border-border/80 divide-y divide-border/80">
              {specialists.map((doc, idx) => {
                const isActive = idx === activeIndex;
                const num = `0${idx + 1}`;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full flex items-center justify-between py-4 sm:py-5 text-left transition-all duration-200 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm ${
                      isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    {/* Left: Number + Doctor Name */}
                    <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                      <span
                        className={`font-mono text-xs sm:text-sm transition-colors ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-muted-foreground/60 group-hover:text-foreground/70"
                        }`}
                      >
                        {num}
                      </span>
                      <span
                        className={`text-base sm:text-lg lg:text-xl tracking-tight transition-colors truncate ${
                          isActive
                            ? "text-foreground font-semibold"
                            : "text-foreground/80 group-hover:text-foreground font-medium"
                        }`}
                      >
                        {doc.name}
                      </span>
                    </div>

                    {/* Right: Specialty */}
                    <span
                      className={`text-xs sm:text-sm font-normal text-right shrink-0 ml-4 transition-colors ${
                        isActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground/75 group-hover:text-foreground/90"
                      }`}
                    >
                      {doc.role || doc.specialty}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Doctor Bio, Metrics & CTAs */}
            <div className="mt-8 pt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDoctor.id}
                  initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
                >
                  {/* Bio Paragraph */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl font-normal">
                    {activeDoctor.philosophy || activeDoctor.heroDescription}
                  </p>

                  {/* 3-Column Metrics: Experience, Focus, Location */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 mt-6 border-t border-border/60">
                    <div>
                      <p className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-tight">
                        Experience
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-foreground mt-1">
                        {activeDoctor.experience}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-tight">
                        Specialization
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-foreground mt-1 truncate">
                        {activeDoctor.specializations?.slice(0, 2).join(", ") || activeDoctor.specialty}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] sm:text-xs text-muted-foreground font-medium tracking-tight">
                        Suite Location
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-foreground mt-1 truncate">
                        {activeDoctor.clinicLocation || siteConfig.clinic.name}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Action Row in a ROW */}
                  <div className="flex flex-row items-center gap-3 mt-6 pt-4">
                    <button
                      type="button"
                      onClick={openBooking}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-xs transition-all active:scale-95 cursor-pointer touch-manipulation shrink-0"
                    >
                      <span>Book consultation</span>
                      <ArrowRight01Icon className="w-4 h-4" />
                    </button>

                    <Link
                      href={`/doctors/${activeDoctor.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors shrink-0"
                    >
                      <span>View full biography</span>
                      <ArrowUpRight01Icon className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}