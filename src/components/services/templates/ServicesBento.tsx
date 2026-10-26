"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { ArrowRight01Icon, ArrowUpRight01Icon, DentalToothIcon, DentalBracesIcon, Sun01Icon, Shield01Icon, MicroscopeIcon } from "hugeicons-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  image: string;
}

interface ServicesBentoProps {
  services: ServiceItem[];
  activeCategory?: string;
}

export function ServicesBento({ services, activeCategory = "All" }: ServicesBentoProps) {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();

  // Match key services
  const cosmetic = services.find((s) => s.id === "cosmetic-dentistry") || services[0];
  const implants = services.find((s) => s.id === "dental-implants") || services[1];
  const whitening = services.find((s) => s.id === "teeth-whitening") || services[2];
  const ortho = services.find((s) => s.id === "orthodontics") || services[3];
  const surgery = services.find((s) => s.id === "oral-surgery") || services[7] || services[4];
  const preventive = services.find((s) => s.id === "general-dentistry") || services[4];

  // Helper to determine if a service matches the active filter
  const isMatch = (item: ServiceItem) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Cosmetic") return item.category === "Cosmetic";
    if (activeCategory === "Restorative") return item.category === "Restorative";
    if (activeCategory === "Orthodontics") return item.id === "orthodontics";
    if (activeCategory === "Preventive") return item.category === "General" || item.id === "general-dentistry";
    return item.category === activeCategory;
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Bento Grid: Two scale levels, asymmetric layout, one light "not sure" card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">

        {/* =========================================================================
            ROW 1: ASYMMETRIC FLAGS
            Scale 1: Cosmetic Dentistry (5 cols)
            Scale 2: Dental Implants (4 cols)
            Stack: Teeth Whitening + Orthodontics (3 cols)
            ========================================================================= */}

        {/* 01. Flagship Scale 1: Cosmetic Dentistry (5 cols) */}
        {cosmetic && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: isMatch(cosmetic) ? 1 : 0.35, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
            className="lg:col-span-5 bg-gradient-to-br from-[#1E293B] via-[#131D2E] to-[#0A0F1D] text-white rounded-3xl p-6 sm:p-9 border border-slate-800 shadow-md hover:border-teal-500/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[380px] sm:min-h-[420px]"
          >
            {/* Delicate Wireframe Contour Rings */}
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-teal-500/10 pointer-events-none group-hover:scale-105 transition-transform duration-700 z-0"
            />
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 w-44 h-44 rounded-full border border-teal-500/10 pointer-events-none z-0"
            />
            <div
              aria-hidden="true"
              className="absolute right-8 top-12 w-40 h-40 rounded-full bg-teal-500/5 blur-2xl pointer-events-none z-0"
            />

            {/* Top Eyebrow */}
            <div className="relative z-10 flex items-center justify-between">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-teal-300 font-semibold">
                Featured · {cosmetic.category}
              </p>
            </div>

            {/* Content & Action */}
            <div className="relative z-10 mt-auto pt-12">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight leading-[1.1] mb-3 group-hover:text-teal-200 transition-colors">
                {cosmetic.title}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mb-6">
                Veneers, bonding, and smile design planned around your face — not a template.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <Link
                  href={`/services/${cosmetic.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
                >
                  <span>Explore Treatment</span>
                  <ArrowRight01Icon className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => openBooking()}
                  className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer border border-white/20 relative z-20"
                >
                  Book
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 02. Dental Implants (4 cols) */}
        {implants && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: isMatch(implants) ? 1 : 0.35, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.05 }}
            className="lg:col-span-4 bg-gradient-to-br from-[#182232] via-[#0F172A] to-[#0A0E1A] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md hover:border-teal-500/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[380px] sm:min-h-[420px]"
          >
            {/* Center Tooth Wireframe Illustration */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 z-0"
            >
              <DentalToothIcon className="w-40 h-40 text-teal-400" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-teal-300 bg-white/10 border border-white/10 leading-normal">
                {implants.category}
              </span>
            </div>

            {/* Content & Action */}
            <div className="relative z-10 mt-auto pt-10">
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white mb-2 leading-snug group-hover:text-teal-200 transition-colors">
                {implants.title}
              </h3>

              <p className="text-slate-300 text-xs leading-relaxed max-w-sm mb-6">
                Permanent, natural-looking tooth replacements using state-of-the-art titanium implants.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <Link
                  href={`/services/${implants.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight01Icon className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => openBooking()}
                  className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer border border-white/20 relative z-20"
                >
                  Book
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 03 & 04. Stack: Teeth Whitening + Orthodontics (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6 justify-between">

          {/* Teeth Whitening */}
          {whitening && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: isMatch(whitening) ? 1 : 0.35, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.1 }}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-md hover:border-teal-500/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between flex-1 min-h-[180px]"
            >
              <div
                aria-hidden="true"
                className="absolute -right-6 -top-6 w-28 h-28 rounded-full border border-teal-500/10 pointer-events-none group-hover:scale-110 transition-transform z-0"
              />

              <div className="flex items-center justify-between relative z-10">
                <Sun01Icon className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-mono text-slate-400">45 Mins</span>
              </div>

              <div className="relative z-10 mt-auto pt-4">
                <h3 className="text-xl font-serif font-normal text-white group-hover:text-teal-200 transition-colors mb-3">
                  {whitening.title}
                </h3>

                <Link
                  href={`/services/${whitening.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
                >
                  <span>Explore</span>
                  <ArrowUpRight01Icon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Orthodontics */}
          {ortho && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: isMatch(ortho) ? 1 : 0.35, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.15 }}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-md hover:border-teal-500/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between flex-1 min-h-[180px]"
            >
              <div
                aria-hidden="true"
                className="absolute -right-6 -top-6 w-28 h-28 rounded-full border border-teal-500/10 pointer-events-none group-hover:scale-110 transition-transform z-0"
              />

              <div className="flex items-center justify-between relative z-10">
                <DentalBracesIcon className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-mono text-slate-400">Clear Aligners</span>
              </div>

              <div className="relative z-10 mt-auto pt-4">
                <h3 className="text-xl font-serif font-normal text-white group-hover:text-teal-200 transition-colors mb-3">
                  {ortho.title}
                </h3>

                <Link
                  href={`/services/${ortho.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
                >
                  <span>Explore</span>
                  <ArrowUpRight01Icon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* =========================================================================
            ROW 2: BALANCED BOTTOM TRIO
            Oral Surgery (4 cols, dark)
            Preventive Dentistry (4 cols, dark)
            Start with a conversation (4 cols, LIGHT CARD)
            ========================================================================= */}

        {/* 05. Oral Surgery (4 cols) */}
        {surgery && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: isMatch(surgery) ? 1 : 0.35, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.2 }}
            className="lg:col-span-4 bg-gradient-to-br from-[#1A2333] to-[#0F172A] text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-md hover:border-teal-500/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[220px]"
          >
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 w-36 h-36 rounded-full border border-teal-500/10 pointer-events-none group-hover:scale-110 transition-transform z-0"
            />

            <div className="flex items-center justify-between relative z-10">
              <Shield01Icon className="w-4 h-4 text-teal-400" />
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-slate-300 bg-white/10 border border-white/10 leading-normal">Specialty</span>
            </div>

            <div className="relative z-10 mt-auto pt-6">
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-white group-hover:text-teal-200 transition-colors mb-2">
                {surgery.title}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-4">
                {surgery.description}
              </p>

              <Link
                href={`/services/${surgery.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
              >
                <span>Explore</span>
                <ArrowRight01Icon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* 06. Preventive / General Dentistry (4 cols) */}
        {preventive && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: isMatch(preventive) ? 1 : 0.35, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.25 }}
            className="lg:col-span-4 bg-gradient-to-br from-[#1A2333] to-[#0F172A] text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-md hover:border-teal-500/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[220px]"
          >
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 w-36 h-36 rounded-full border border-teal-500/10 pointer-events-none group-hover:scale-110 transition-transform z-0"
            />

            <div className="flex items-center justify-between relative z-10">
              <MicroscopeIcon className="w-4 h-4 text-teal-400" />
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-slate-300 bg-white/10 border border-white/10 leading-normal">Preventive Care</span>
            </div>

            <div className="relative z-10 mt-auto pt-6">
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-white group-hover:text-teal-200 transition-colors mb-2">
                {preventive.title}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-4">
                {preventive.description}
              </p>

              <Link
                href={`/services/${preventive.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
              >
                <span>Explore</span>
                <ArrowRight01Icon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* 07. The Light "Not Sure" Card (4 cols) - Matches Mockup 03 perfectly */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.3 }}
          className="lg:col-span-4 bg-white border border-slate-200/90 text-slate-900 rounded-3xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-teal-600/40 transition-all duration-300 flex flex-col justify-between min-h-[220px] group"
        >
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-teal-700 font-semibold bg-teal-50 border border-teal-200/60 leading-normal mb-3">
              Not sure where to start?
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 leading-snug group-hover:text-teal-800 transition-colors">
              Start with a conversation.
            </h3>

            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-2.5">
              Explore the approach, the process, and what a consultation can tell you.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => openBooking()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm relative z-20"
            >
              <span>Book a visit</span>
              <ArrowRight01Icon className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] font-mono text-slate-400">Zero pressure</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
