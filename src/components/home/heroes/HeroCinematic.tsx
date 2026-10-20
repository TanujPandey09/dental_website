"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, Call02Icon, SparklesIcon } from "hugeicons-react";
import Image from "next/image";
import { motion, Variants, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

export function HeroCinematic() {
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
      {/* Full-bleed clinic photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src={images.heroCinematic || images.hero}
          alt="Lumina Dental Private Operatory Suite"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-100"
        />
        {/* Cinematic multi-stop dark scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#07142A]/85 via-[#07142A]/70 to-[#07142A]/92 pointer-events-none"
        />
        {/* Soft radial focus glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/15 rounded-full blur-[140px] pointer-events-none"
        />
      </div>

      {/* Main Centered Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center relative z-10 my-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Private Dental Suites • Upper East Side
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.06] tracking-tight mb-6 text-balance max-w-4xl mx-auto"
          >
            Quietly extraordinary <br />
            <span className="italic font-normal text-accent font-serif">
              dentistry.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto font-normal"
          >
            Precision without pressure. Technology without noise. A private practice designed to make you feel completely at ease.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Button
              size="xl"
              onClick={openBooking}
              className="w-full sm:w-auto rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold shadow-xl shadow-black/25 px-8 h-13"
            >
              <span>Request Appointment</span>
              <ArrowRight01Icon className="size-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>

            <Button
              asChild
              size="xl"
              variant="outline"
              className="w-full sm:w-auto rounded-full border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white px-7 h-13 font-semibold"
            >
              <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}>
                <Call02Icon className="size-4 mr-1 text-accent" aria-hidden="true" />
                <span>{siteConfig.contact.phone}</span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Floating Stats & Emergency Dock */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 pt-12">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="bg-slate-950/75 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
        >
          {/* Trust Metrics */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 flex-1">
            <div>
              <p className="text-xl sm:text-2xl font-heading font-bold text-white">
                <CountUp end={siteConfig.clinic.yearsExperience} duration={2} enableScrollSpy scrollSpyOnce />+
              </p>
              <p className="text-[10px] sm:text-[11px] text-white/55 font-medium uppercase tracking-wider mt-1">
                Years in Practice
              </p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-heading font-bold text-white">
                25<span className="text-accent font-serif italic">k+</span>
              </p>
              <p className="text-[10px] sm:text-[11px] text-white/55 font-medium uppercase tracking-wider mt-1">
                Smiles Transformed
              </p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-heading font-bold text-white">
                99.4<span className="text-accent">%</span>
              </p>
              <p className="text-[10px] sm:text-[11px] text-white/55 font-medium uppercase tracking-wider mt-1">
                Comfort Score
              </p>
            </div>
          </div>

          {/* 24/7 Emergency Card */}
          <a
            href={`tel:${siteConfig.contact.emergencyPhone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center text-accent shrink-0">
              <SparklesIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-white/55 uppercase tracking-wider font-semibold">
                24/7 Emergency Line
              </p>
              <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-accent transition-colors">
                Call the office
              </p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
