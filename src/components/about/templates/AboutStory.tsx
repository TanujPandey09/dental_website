"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  SmileIcon,
  Shield01Icon,
  SparklesIcon,
  StarIcon,
  ArrowRight01Icon,
  CheckmarkBadge01Icon,
  Invoice01Icon,
  Calendar01Icon,
} from "hugeicons-react";
import { images } from "@/config/images";
import siteConfig from "@/config/site";
import { Button, ButtonBadge } from "@/components/ui/button";
import { useBooking } from "@/components/BookingContext";

export function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const reduceMotion = useReducedMotion();
  const yRaw = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2Raw = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const y = reduceMotion ? 0 : yRaw;
  const y2 = reduceMotion ? 0 : y2Raw;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. The Vision & Story Section */}
      <div className="overflow-x-clip relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Storytelling Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
                <SmileIcon className="w-3.5 h-3.5" />
                Our Philosophy &amp; Sanctuary
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground leading-tight">
                Dentistry, <br />
                Reimagined.
              </h2>
            </div>

            <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                For decades, visiting the dentist was synonymous with sterile smells, harsh fluorescent lights, and dreaded waiting rooms. We decided it was time to replace that paradigm with warmth, luxury, and world-class healthcare.
              </p>
              <p>
                {siteConfig.clinic.name} was founded by a collective of board-certified specialists who shared a radical vision: what if a dental clinic felt like a luxury hospitality experience? What if clinical precision was paired with radical empathy?
              </p>
              <p>
                Today, we serve thousands of patients who actually look forward to their visits. From curated acoustic playlists to gentle laser technology, every detail is meticulously designed around your smile.
              </p>
            </div>

            <div className="pt-6 border-t border-border/60 flex items-center gap-8">
              <div>
                <div className="text-3xl font-heading font-bold text-foreground mb-1">
                  {siteConfig.clinic.yearsExperience}+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Years of experience
                </div>
              </div>
              <div className="h-10 w-px bg-border/60" />
              <div>
                <div className="text-3xl font-heading font-bold text-foreground mb-1">
                  {Math.round(siteConfig.clinic.happyPatients / 1000)}k+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Smiles transformed
                </div>
              </div>
              <div className="h-10 w-px bg-border/60 hidden sm:block" />
              <div className="hidden sm:block">
                <div className="text-3xl font-heading font-bold text-foreground mb-1">
                  99.4%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Patient comfort index
                </div>
              </div>
            </div>
          </motion.div>

          {/* Parallax Image Grid */}
          <div className="relative h-[320px] sm:h-[460px] lg:h-[620px] w-full" ref={containerRef}>
            <motion.div
              style={{ y }}
              className="absolute top-0 right-0 w-[72%] h-[62%] rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/20"
            >
              <Image
                src={images.about.clinicInterior}
                alt="Clinic Interior"
                fill
                sizes="(max-width: 1024px) 70vw, 35vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              style={{ y: y2 }}
              className="absolute bottom-6 left-0 w-[62%] h-[52%] rounded-3xl overflow-hidden shadow-xl z-20 border border-white/20"
            >
              <Image
                src={images.about.dentalTechnology}
                alt="Dental Technology"
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. Asymmetrical Bento Grid — Core Philosophy & Standards */}
      <div className="p-2 sm:p-3 rounded-[2.5rem] bg-muted/30 border border-border/70 shadow-sm">
        <div className="rounded-[calc(2.5rem-0.75rem)] bg-card/60 p-6 sm:p-10 lg:p-12 border border-border/40">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
              <SparklesIcon className="w-3.5 h-3.5" />
              Award-Winning Healthcare Philosophy
            </span>
            <h3 className="text-2xl sm:text-4xl font-heading font-bold text-foreground mb-3">
              Our Core Philosophy &amp; Ethos
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              The foundational principles that guide every interaction, clinical protocol, and unhurried appointment we deliver.
            </p>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Card 1: Anchor Hero Card (Span 8 on desktop, span 12 on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="col-span-1 md:col-span-12 lg:col-span-8 p-2 rounded-3xl bg-muted/60 border border-border/80 shadow-sm flex flex-col group"
            >
              <div className="relative rounded-[calc(1.5rem-2px)] overflow-hidden min-h-[360px] sm:min-h-[420px] p-6 sm:p-10 flex flex-col justify-between flex-1 text-white">
                <Image
                  src={images.about.clinicInterior}
                  alt="Flagship Operatory Architecture"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-slate-950/30 z-10" />

                {/* Top Badge Row */}
                <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
                  <div className="backdrop-blur-md bg-white/15 border border-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm">
                    <StarIcon className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span>Flagship Operatory Philosophy</span>
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full backdrop-blur-sm">
                    Radical Empathy
                  </span>
                </div>

                {/* Bottom Story Content */}
                <div className="relative z-20 pt-16">
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white leading-snug mb-3">
                    Radical Empathy Meets Architectural Serenity.
                  </h4>
                  <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl mb-6 font-normal">
                    We designed every square foot of {siteConfig.clinic.name} around human nervous systems—replacing clinical intimidation with unhurried doctor consultations, acoustic privacy, and compassionate specialist care.
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white/90 text-xs font-medium px-3 py-1 rounded-full">
                      99.4% Comfort Score
                    </span>
                    <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white/90 text-xs font-medium px-3 py-1 rounded-full">
                      Unhurried Consultations
                    </span>
                    <span className="backdrop-blur-md bg-white/10 border border-white/20 text-white/90 text-xs font-medium px-3 py-1 rounded-full">
                      Private Acoustic Suites
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Micro-Precision 3D Diagnostics (Span 4 on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
              className="col-span-1 md:col-span-6 lg:col-span-4 p-2 rounded-3xl bg-muted/60 border border-border/80 shadow-sm flex flex-col"
            >
              <div className="rounded-[calc(1.5rem-2px)] bg-card p-6 flex flex-col justify-between flex-1 border border-border/60 hover:shadow-lg transition-all duration-300 group">
                <div>
                  <div className="relative h-36 sm:h-40 w-full rounded-2xl overflow-hidden mb-5 border border-border/50">
                    <Image
                      src={images.about.dentalTechnology}
                      alt="Digital 3D Intraoral Technology"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 right-2.5 backdrop-blur-md bg-background/90 text-foreground text-[10px] font-bold px-2.5 py-1 rounded-full border border-border/60">
                      0.02mm Accuracy
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1 block">
                    Diagnostic Standard
                  </span>
                  <h4 className="text-xl font-heading font-bold text-foreground mb-2">
                    Micro-Precision 3D Scans
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Sub-millimeter optical scanning eliminates uncomfortable putty impressions while providing instantaneous 3D digital simulations of your smile.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Diagnostic Spec</span>
                  <span className="bg-primary/10 px-2.5 py-0.5 rounded-full">Cone Beam 3D</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Spa-Grade Sanctuary Amenities (Span 4) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.32, 0.72, 0, 1] }}
              className="col-span-1 md:col-span-6 lg:col-span-4 p-2 rounded-3xl bg-muted/60 border border-border/80 shadow-sm flex flex-col"
            >
              <div className="rounded-[calc(1.5rem-2px)] bg-card p-6 flex flex-col justify-between flex-1 border border-border/60 hover:shadow-lg transition-all duration-300 group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <SparklesIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1 block">
                    Sensory Protocol
                  </span>
                  <h4 className="text-xl font-heading font-bold text-foreground mb-2">
                    Spa-Grade Hospitality
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Aromatherapy lounge suites, noise-canceling headphones with curated playlists, and warm lavender towels designed to neutralize appointment tension.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Sensory Metric</span>
                  <span className="bg-primary/10 px-2.5 py-0.5 rounded-full">Zero Clinical Odor</span>
                </div>
              </div>
            </motion.div>

            {/* Card 4: 100% Biocompatible Materials (Span 4) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.32, 0.72, 0, 1] }}
              className="col-span-1 md:col-span-6 lg:col-span-4 p-2 rounded-3xl bg-muted/60 border border-border/80 shadow-sm flex flex-col"
            >
              <div className="rounded-[calc(1.5rem-2px)] bg-card p-6 flex flex-col justify-between flex-1 border border-border/60 hover:shadow-lg transition-all duration-300 group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Shield01Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1 block">
                    Material Purity
                  </span>
                  <h4 className="text-xl font-heading font-bold text-foreground mb-2">
                    Biocompatible Materials
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    We strictly utilize metal-free Swiss zirconia ceramics, BPA-free composite resins, and medical Grade-5 titanium engineered for lifetime biocompatibility.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Safety Testing</span>
                  <span className="bg-primary/10 px-2.5 py-0.5 rounded-full">Swiss Ceramic Pure</span>
                </div>
              </div>
            </motion.div>

            {/* Card 5: Radical Ethics & Transparency (Span 4) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.32, ease: [0.32, 0.72, 0, 1] }}
              className="col-span-1 md:col-span-6 lg:col-span-4 p-2 rounded-3xl bg-muted/60 border border-border/80 shadow-sm flex flex-col"
            >
              <div className="rounded-[calc(1.5rem-2px)] bg-card p-6 flex flex-col justify-between flex-1 border border-border/60 hover:shadow-lg transition-all duration-300 group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Invoice01Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1 block">
                    Patient Bill of Rights
                  </span>
                  <h4 className="text-xl font-heading font-bold text-foreground mb-2">
                    Zero-Surprise Pricing
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    High-resolution intraoral photos accompany every treatment plan. You see what we see, with clear itemized pricing reviewed before any procedure begins.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Billing Ethics</span>
                  <span className="bg-primary/10 px-2.5 py-0.5 rounded-full">100% Upfront Estimates</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Sanctuary Clinic Tour Gallery */}
      <div className="p-2 sm:p-3 rounded-[2.5rem] bg-secondary/80 text-secondary-foreground border border-border/60 shadow-lg relative overflow-hidden">
        <div className="rounded-[calc(2.5rem-0.75rem)] bg-secondary p-6 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-accent/20 text-accent border border-accent/30">
                Architectural Sanctuary
              </span>
              <h3 className="text-2xl sm:text-4xl font-heading font-bold text-secondary-foreground leading-tight">
                Designed for Peace of Mind &amp; Clinical Precision.
              </h3>
              <p className="text-secondary-foreground/80 text-sm sm:text-base leading-relaxed">
                Step into a sanctuary of wellness. From the moment you walk through our doors, you are immersed in a calming, architecturally stunning environment designed to melt away clinical anxiety.
              </p>
              <ul className="space-y-3">
                {[
                  "Aromatherapy infused waiting lounge and beverage bar",
                  "Noise-canceling headphones with curated acoustic playlists",
                  "Heated neck pillows and plush blankets during treatment",
                  "Private, sound-proofed doctor consultation suites",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-secondary-foreground text-sm">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Button
                  size="lg"
                  variant="cta"
                  onClick={() => openBooking()}
                >
                  <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>Experience The Practice</span>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                <div className="space-y-3 sm:space-y-5 mt-4 sm:mt-10">
                  <div className="relative h-[160px] sm:h-[240px] rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
                    <Image
                      src={images.about.lobby}
                      alt="Lumina Reception Lounge"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-medium">Reception Lounge</span>
                    </div>
                  </div>
                  <div className="relative h-[130px] sm:h-[190px] rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
                    <Image
                      src={images.about.treatmentRoom}
                      alt="Private Operatory Suite"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-medium">Private Operatory</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-5">
                  <div className="relative h-[130px] sm:h-[190px] rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
                    <Image
                      src={images.about.consultation}
                      alt="Specialist Consultation Room"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-medium">Doctor Consultation</span>
                    </div>
                  </div>
                  <div className="relative h-[160px] sm:h-[240px] rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
                    <Image
                      src={images.about.details}
                      alt="Sterilization & Clinical Instruments"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-medium">Precision Instrument Suite</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
