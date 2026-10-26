"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckmarkCircle02Icon } from "hugeicons-react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  trustItems?: string[];
  hideTrust?: boolean;
}

const DEFAULT_TRUST_ITEMS = [
  "Board Certified Specialists",
  "Same-Day Appointments",
  "Comfort-First Philosophy",
];

export function PageHero({
  title,
  subtitle,
  badge,
  trustItems = DEFAULT_TRUST_ITEMS,
  hideTrust = false,
}: PageHeroProps) {
  const reduce = useReducedMotion();

  return (
    <section className="pt-20 pb-6 sm:pt-28 sm:pb-10 bg-background relative overflow-hidden border-b border-border/40">

      {/* Abstract Background System: Soft Ambient Radial Gradients (No Grid) */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Soft top-right primary/teal ambient wash */}
        <div className="absolute top-0 right-0 w-[55vw] max-w-[800px] h-[380px] sm:h-[460px] bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_70%)]" />

        {/* Soft bottom-left mint/accent ambient wash */}
        <div className="absolute bottom-0 left-0 w-[50vw] max-w-[700px] h-[340px] sm:h-[420px] bg-[radial-gradient(ellipse_at_20%_80%,color-mix(in_oklab,var(--accent)_9%,transparent),transparent_65%)]" />

        {/* Subtle warm center-top atmospheric glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_4%,transparent),transparent_70%)]" />

        {/* Top-Right Restrained Organic Vector Blob */}
        <svg
          className="absolute -top-12 -right-12 sm:-top-20 sm:-right-20 w-56 h-56 sm:w-80 sm:h-80 lg:w-[440px] lg:h-[440px] opacity-75 sm:opacity-85"
          viewBox="0 0 440 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pagehero-tr-grad" x1="120" y1="40" x2="380" y2="340" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
              <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.04" />
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="pagehero-tr-stroke" x1="160" y1="60" x2="360" y2="320" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path
            d="M340 70C390 120 420 190 410 260C400 330 350 390 280 405C210 420 140 380 90 330C40 280 20 200 45 140C70 80 130 40 200 25C270 10 290 20 340 70Z"
            fill="url(#pagehero-tr-grad)"
          />
          <path
            d="M315 95C355 135 380 190 372 245C364 300 325 350 270 362C215 374 160 340 120 300C80 260 65 195 85 148C105 100 152 70 208 58C264 46 275 55 315 95Z"
            stroke="url(#pagehero-tr-stroke)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>

        {/* Bottom-Left Restrained Organic Vector Blob */}
        <svg
          className="absolute -bottom-16 -left-16 sm:-bottom-24 sm:-left-24 w-52 h-52 sm:w-72 sm:h-72 lg:w-[400px] lg:h-[400px] opacity-70 sm:opacity-80"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pagehero-bl-grad" x1="40" y1="360" x2="320" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.09" />
              <stop offset="55%" stopColor="var(--primary)" stopOpacity="0.04" />
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="pagehero-bl-stroke" x1="60" y1="340" x2="300" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <path
            d="M80 340C30 295 10 220 25 155C40 90 95 45 160 30C225 15 295 40 335 90C375 140 380 215 355 275C330 335 265 375 200 385C135 395 130 385 80 340Z"
            fill="url(#pagehero-bl-grad)"
          />
          <path
            d="M105 315C65 278 50 218 62 165C74 112 118 75 170 62C222 50 278 70 310 110C342 150 346 210 325 258C305 306 252 338 200 346C148 354 145 352 105 315Z"
            stroke="url(#pagehero-bl-stroke)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">

        {badge && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-mono uppercase tracking-[0.22em] text-primary font-semibold mb-3"
          >
            {badge}
          </motion.p>
        )}

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-foreground mb-4 sm:mb-5 tracking-tight leading-[1.1] text-balance"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal mb-5 sm:mb-6"
        >
          {subtitle}
        </motion.p>

        {/* Sleek, Single Unified Trust Bar (Responsive on Mobile & Desktop) */}
        {!hideTrust && trustItems && trustItems.length > 0 && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 px-3.5 sm:px-6 py-1.5 sm:py-2.5 rounded-xl sm:rounded-full bg-muted/40 border border-border/70 text-[11px] sm:text-xs md:text-sm font-medium text-foreground/80 shadow-xs"
          >
            {trustItems.map((item, idx) => (
              <div key={item} className="inline-flex items-center gap-2">
                {idx > 0 && (
                  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-border" aria-hidden="true" />
                )}
                <span className="inline-flex items-center gap-1.5">
                  <CheckmarkCircle02Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </span>
              </div>
            ))}
          </motion.div>
        )}

      </div>

      {/* Bottom hairline */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
