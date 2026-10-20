"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, Shield01Icon, CheckmarkBadge01Icon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

export function HeroSpecialistSplit() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.04,
        delayChildren: 0,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.4, ease: [0.32, 0.72, 0, 1] },
    },
  };

  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-[#07142A] text-white">
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
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left Column: Ivy-League Credentials & Authority */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Ivy-League Trained • Board-Certified Specialists
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.08] tracking-tight mb-6 text-balance"
            >
              The standard <br />
              of care,{" "}
              <span className="italic font-normal text-accent font-serif">
                quietly redefined.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/75 leading-relaxed mb-8 max-w-xl font-normal"
            >
              Our specialists trained at Columbia, NYU, and Harvard—and built Lumina around a different idea: that world-class dentistry should feel unhurried, human, and entirely yours.
            </motion.p>

            {/* 3-Metrics Row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10 mb-9 max-w-xl w-full"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  <CountUp end={siteConfig.clinic.yearsExperience} duration={2} enableScrollSpy scrollSpyOnce />+
                </p>
                <p className="text-[10px] sm:text-[11px] text-white/55 font-medium uppercase tracking-wider mt-1 leading-snug">
                  Years of Specialist Experience
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  25<span className="text-accent font-serif italic">k+</span>
                </p>
                <p className="text-[10px] sm:text-[11px] text-white/55 font-medium uppercase tracking-wider mt-1 leading-snug">
                  Smiles Transformed
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  99.4<span className="text-accent">%</span>
                </p>
                <p className="text-[10px] sm:text-[11px] text-white/55 font-medium uppercase tracking-wider mt-1 leading-snug">
                  Patient Comfort Score
                </p>
              </div>
            </motion.div>

            {/* Dual CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                asChild
                size="xl"
                className="rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold shadow-lg shadow-black/20 px-8 h-13"
              >
                <Link href="/doctors">
                  <span>Meet the Specialists</span>
                  <ArrowRight01Icon className="size-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                size="xl"
                variant="outline"
                onClick={openBooking}
                className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white px-8 h-13 font-semibold"
              >
                <span>Book a consultation</span>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Clinician Portrait Card */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative w-full">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.6)] bg-slate-900 group">
              <Image
                src={images.doctors["dr-sarah-jenkins"]}
                alt="Dr. Sarah Jenkins, DDS - Lead Cosmetic Surgeon"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              {/* Top-Right Badges */}
              <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-semibold uppercase tracking-wider shadow-sm">
                  <CheckmarkBadge01Icon className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  <span>Board-Certified</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-semibold uppercase tracking-wider shadow-sm">
                  <span>Columbia-Trained</span>
                </div>
              </div>

              {/* Bottom Docked Surgeon Card */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-slate-950/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-2xl z-10">
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                  <Shield01Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-heading font-bold text-white truncate">
                    Dr. Sarah Jenkins, DDS
                  </h3>
                  <p className="text-xs text-white/75 font-medium">Lead Cosmetic Surgeon</p>
                  <p className="text-[10px] text-accent uppercase tracking-wider font-semibold truncate mt-0.5">
                    Columbia University College of Dental Medicine
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
