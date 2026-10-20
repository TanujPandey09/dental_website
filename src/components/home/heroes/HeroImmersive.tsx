"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight01Icon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { images } from "@/config/images";

export function HeroImmersive() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.65, ease: [0.32, 0.72, 0, 1] },
    },
  };

  return (
    <section className="relative min-h-[100dvh] pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 flex flex-col justify-between overflow-hidden bg-[#07142A] text-white">
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
          className="absolute inset-0 bg-gradient-to-r from-[#07142A]/92 via-[#07142A]/70 to-[#07142A]/30 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#07142A]/90 via-transparent to-[#07142A]/60 pointer-events-none"
        />
      </div>

      {/* Left-Aligned Confident Editorial Typography */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 my-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-2xl text-left"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              A Private Practice, Designed for Calm
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.08] tracking-tight mb-6 text-balance"
          >
            Space to breathe. <br />
            <span className="italic font-normal text-accent font-serif">
              Care to remember.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-xl font-normal"
          >
            Natural light, acoustic suites, and a team that treats the person before the tooth. Welcome to dentistry without the clinical edge.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Floating Hospitality Dock */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 pt-8">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="inline-flex flex-wrap items-center gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Book a visit CTA button */}
          <Button
            size="lg"
            onClick={openBooking}
            className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold px-6 h-11 shadow-md shadow-primary/25 cursor-pointer"
          >
            <span>Book a visit</span>
            <ArrowRight01Icon className="size-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>

          {/* Live Clinic Open Status */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-medium text-white/85">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/50 font-semibold">
              Open Today
            </span>
            <span className="font-semibold text-white/90">Until 7:00 PM</span>
          </div>

          <div className="hidden sm:block w-px h-6 bg-white/15" aria-hidden="true" />

          {/* Interactive 360 Virtual Tour pill */}
          <Link
            href="/about"
            className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left group"
          >
            <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0">
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-white/55 font-semibold leading-tight">
                Take a 360° Tour
              </p>
              <p className="text-xs font-semibold text-white group-hover:text-accent transition-colors leading-tight">
                Virtual clinic tour
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
