"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, SparklesIcon, Cancel01Icon } from "hugeicons-react";
import Image from "next/image";
import { motion, AnimatePresence, Variants, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";
import { cn } from "@/lib/utils";

export function HeroCinematic() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const cinematicSlide = siteConfig.heroSlides?.find((s) => s.id === "cinematic");

  // Keep ambient video playing / paused according to state
  useEffect(() => {
    if (!videoRef.current) return;
    if (isAmbientPlaying) {
      videoRef.current.play().catch(() => {
        // Browser autoplay restrictions fallback
      });
    } else {
      videoRef.current.pause();
    }
  }, [isAmbientPlaying]);

  // Toggle ambient audio
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Toggle ambient play/pause
  const toggleAmbientPlay = () => {
    setIsAmbientPlaying(!isAmbientPlaying);
  };

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
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.55, ease: [0.32, 0.72, 0, 1] },
    },
  };

  return (
    <>
      <section className="relative min-h-[92vh] pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-24 flex flex-col justify-center overflow-hidden bg-[#07142A] text-white">
        {/* Full-bleed clinic cinematic background with crisp video presentation & calibrated lighting mask */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none">
          {/* Base High-Resolution Fallback Poster */}
          <Image
            src={images.heroCinematic || images.hero}
            alt="Lumina Dental Private Operatory Suite"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-100"
          />

          {/* Ambient 4K Looping Practice Video — Crisp & Clearly Visible */}
          {!reduceMotion && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              poster={images.heroCinematic || images.hero}
              onLoadedData={() => setIsVideoLoaded(true)}
              className={cn(
                "absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 pointer-events-none",
                isVideoLoaded ? "opacity-100" : "opacity-0"
              )}
            >
              <source src={images.heroVideo} type="video/mp4" />
            </video>
          )}

          {/* Calibrated Directional Lighting Masks — Gives text 100% contrast while letting video shine */}
          {/* 1. Top Navbar Fade */}
          <div
            aria-hidden="true"
            className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#07142A]/85 via-[#07142A]/40 to-transparent pointer-events-none"
          />

          {/* 2. Soft horizontal center scrim (30% opacity vs previous 90% blackout) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#07142A]/70 via-[#07142A]/25 to-[#07142A]/70 pointer-events-none"
          />

          {/* 3. Subtle center focus radial mask */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(7,20,42,0.2)_0%,_rgba(7,20,42,0.65)_100%)] pointer-events-none"
          />

          {/* 4. Bottom Grounding Fade to Next Section */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-[#07142A] via-[#07142A]/70 to-transparent pointer-events-none"
          />
        </div>

        {/* Ambient Video Control Pill (Top Right on Desktop) */}
        {!reduceMotion && (
          <div className="absolute top-5 right-4 sm:top-8 sm:right-8 z-20 flex items-center gap-2">
            {/* Live 4K Tag with pulsing beacon */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 border border-white/15 backdrop-blur-md text-[11px] font-mono text-white/80 shadow-lg">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>4K CLINIC CAM</span>
            </div>

            {/* Mute / Unmute Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute ambient clinic sound" : "Mute ambient clinic sound"}
              className="w-9 h-9 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-lg hover:border-teal-400/50"
            >
              {isMuted ? (
                // Muted speaker SVG
                <svg className="w-4 h-4 text-white/75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                // Sound on speaker SVG
                <svg className="w-4 h-4 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>

            {/* Ambient Video Play / Pause Toggle */}
            <button
              type="button"
              onClick={toggleAmbientPlay}
              aria-label={isAmbientPlaying ? "Pause ambient video" : "Resume ambient video"}
              className="w-9 h-9 rounded-full bg-slate-950/60 hover:bg-slate-900 border border-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-lg hover:border-teal-400/50"
            >
              {isAmbientPlaying ? (
                // Pause SVG
                <svg className="w-3.5 h-3.5 text-white/80 fill-current" viewBox="0 0 24 24">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                // Play SVG
                <svg className="w-3.5 h-3.5 text-white/80 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M7 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 7 5.5z" />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Main Centered Content — Scaled & Grand Cinematic Presence */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center relative z-10 py-4 my-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            {/* Cinematic Eyebrow Badge with Pulsing Live Status */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-xl text-white/95 text-xs font-semibold mb-6 shadow-xl"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
              <span className="tracking-widest uppercase text-[11px] font-mono text-teal-200">
                4K CLINIC TOUR &amp; PRACTICE FILM · DIRECTORS CUT
              </span>
            </motion.div>

            {/* Headline — Grand, Cinematic Film Scale with Drop Shadow for Contrast */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.75rem] font-heading font-extrabold text-white leading-[1.04] tracking-tight mb-5 text-balance max-w-4xl mx-auto drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
            >
              {cinematicSlide?.headline || "Quietly extraordinary"} <br />
              <span className="italic font-normal text-teal-300 font-serif">
                {cinematicSlide?.headlineAccent || "dentistry."}
              </span>
            </motion.h1>

            {/* Subtitle — Cinematic Outcome Line with High-Legibility Shadow */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-100/90 leading-relaxed mb-9 max-w-2xl mx-auto font-normal drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]"
            >
              {cinematicSlide?.description || siteConfig.hero.description}
            </motion.p>

            {/* Dual CTAs with Button-in-Button Trailing Icon & Video Trigger */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10 sm:mb-12"
            >
              <Button
                size="lg"
                onClick={openBooking}
                className="w-full sm:w-auto rounded-full bg-teal-600 hover:bg-teal-500 text-white font-semibold shadow-[0_10px_35px_rgba(20,184,166,0.4)] hover:shadow-[0_14px_45px_rgba(20,184,166,0.6)] px-8 h-13 sm:h-14 flex items-center justify-center gap-3 cursor-pointer group text-sm sm:text-base transition-all active:scale-95 border border-teal-400/40"
              >
                <span>{cinematicSlide?.primaryCtaText || "Request Consultation"}</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight01Icon className="size-3.5 text-white" aria-hidden="true" />
                </span>
              </Button>

              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="w-full sm:w-auto rounded-full border border-white/25 bg-slate-950/45 hover:bg-slate-900/75 backdrop-blur-xl text-white px-7 h-13 sm:h-14 font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer group active:scale-95 shadow-2xl text-sm sm:text-base hover:border-teal-400/50"
              >
                <span className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 group-hover:scale-110 group-hover:bg-teal-500/30 transition-all shadow-sm">
                  <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 7 5.5z" />
                  </svg>
                </span>
                <span>{cinematicSlide?.secondaryCtaText || "Watch 60s Practice Film"}</span>
              </button>
            </motion.div>

            {/* Bottom Floating Double-Bezel Stats & Emergency Dock */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-4xl p-1.5 rounded-[26px] bg-white/[0.08] border border-white/20 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.65)]"
            >
              <div className="rounded-[20px] bg-slate-950/80 border border-white/10 px-6 py-4 sm:px-8 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-5">
                {/* Trust Metrics */}
                <div className="grid grid-cols-3 gap-6 sm:gap-10 flex-1 text-left w-full sm:w-auto">
                  <div className="relative">
                    <p className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                      <CountUp end={siteConfig.clinic.stats.yearsExperience} duration={2} enableScrollSpy scrollSpyOnce />+
                    </p>
                    <p className="text-[11px] text-teal-200/80 font-mono font-medium uppercase tracking-wider mt-1">
                      Years in Practice
                    </p>
                  </div>
                  <div className="relative border-l border-white/10 pl-4 sm:pl-6">
                    <p className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                      {siteConfig.clinic.stats.patientsTreated}
                    </p>
                    <p className="text-[11px] text-teal-200/80 font-mono font-medium uppercase tracking-wider mt-1">
                      Smiles Restored
                    </p>
                  </div>
                  <div className="relative border-l border-white/10 pl-4 sm:pl-6">
                    <p className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                      {siteConfig.clinic.stats.satisfactionScore}<span className="text-teal-400">%</span>
                    </p>
                    <p className="text-[11px] text-teal-200/80 font-mono font-medium uppercase tracking-wider mt-1">
                      Comfort Score
                    </p>
                  </div>
                </div>

                {/* 24/7 Priority Emergency Hotline */}
                <a
                  href={`tel:${siteConfig.contact.emergencyPhone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 hover:border-teal-400/40 transition-all group shrink-0 w-full sm:w-auto justify-center cursor-pointer active:scale-95"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0 group-hover:scale-105 transition-transform">
                    <SparklesIcon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-white/60 uppercase tracking-widest font-mono font-semibold">
                      24/7 Priority Care
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                      {siteConfig.contact.emergencyPhone}
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cinematic Practice Film Lightbox Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                aria-label="Close practice film"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Cancel01Icon className="w-5 h-5" />
              </button>

              {/* High Definition Practice Film Video Player */}
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <video
                  controls
                  autoPlay
                  playsInline
                  poster={images.heroCinematic || images.hero}
                  className="w-full h-full object-cover"
                >
                  <source src={images.heroVideo} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
