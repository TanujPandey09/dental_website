"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight01Icon, Call02Icon } from "hugeicons-react";
import Image from "next/image";
import Link from "next/link";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";
import { cn } from "@/lib/utils";

export interface CTAProps {
  className?: string;
  variant?: "split" | "dark";
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  phoneText?: string;
  image?: string;
  imageAlt?: string;
  onPrimaryClick?: () => void;
  showLocationInfo?: boolean;
}

/**
 * Universal CTA Component
 * Supports two distinct, high-converting agency reference styles:
 * 1. "split" (Default) - Aveline Scandinavian split card: Pale mint background, eyebrow with slash,
 *    bold title, description, pill button, phone link, and flush reception lounge photo on the right.
 * 2. "dark" - High-contrast obsidian card with oversized top-right asterisk watermark,
 *    bold title, description, and vibrant accent pill with star circle badge.
 */
export function CTA({
  className,
  variant = "split",
  eyebrow = "Ready for a healthier smile? /",
  title,
  description,
  primaryButtonText,
  phoneText,
  image = images.about.lobby || images.clinicInterior,
  imageAlt = "Aveline calm studio reception and lounge",
  onPrimaryClick,
  showLocationInfo = false,
}: CTAProps) {
  const { openBooking } = useBooking();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth scroll parallax depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoParallaxY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  const handleBooking = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      openBooking();
    }
  };

  const resolvedPhone = phoneText || siteConfig.contact.phone;
  const cleanPhone = resolvedPhone.replace(/[^0-9+]/g, "");

  // ===========================================================================
  // VARIANT 1: Aveline Style Split Studio CTA (Screenshot 1)
  // ===========================================================================
  if (variant === "split") {
    const resolvedTitle = title || "Book your visit today";
    const resolvedDesc =
      description ||
      "Our team will help you choose the right treatment, and your first consultation includes a full 3D scan.";
    const resolvedBtnText = primaryButtonText || "Book an appointment";

    return (
      <section ref={sectionRef} className={cn("py-12 sm:py-20 bg-background", className)}>
        <div className="shell">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="rounded-3xl sm:rounded-[2.5rem] bg-[#EAF2EF] dark:bg-card/90 border border-[#D4E4DE] dark:border-border/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column: Text & Actions (7 cols on lg) */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                {/* Eyebrow with Trailing Slash */}
                <p className="text-xs sm:text-sm font-sans font-medium text-[#0A4E53] dark:text-primary mb-4 tracking-normal">
                  {eyebrow}
                </p>

                {/* Big Clean Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-foreground leading-[1.12] tracking-[-0.03em] mb-4">
                  {resolvedTitle}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  {resolvedDesc}
                </p>

                {/* Action Row: Pill Button + Phone Link */}
                <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                  <button
                    type="button"
                    onClick={handleBooking}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0A4E53] hover:bg-[#07393D] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer touch-manipulation group"
                  >
                    <span>{resolvedBtnText}</span>
                    <ArrowRight01Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <a
                    href={`tel:${cleanPhone}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-colors py-2"
                  >
                    <Call02Icon className="w-4 h-4 text-[#0A4E53] dark:text-primary" />
                    <span>{resolvedPhone}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Seamless Flush Studio Photo with Parallax (5 cols on lg) */}
              <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-[420px] w-full overflow-hidden">
                <motion.div
                  style={{ y: reduce ? 0 : photoParallaxY }}
                  className="absolute inset-0 will-change-transform scale-105"
                >
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                    priority={false}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
          {showLocationInfo && (
            <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-[#D4E4DE] dark:border-border/80">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A4E53] mb-2">
                    Location
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {siteConfig.contact.address}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A4E53] mb-2">
                    Hours
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {siteConfig.contact.hours}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A4E53] mb-2">
                    Emergency
                  </p>
                  <a
                    href={`tel:${siteConfig.contact.emergencyPhone}`}
                    className="text-sm sm:text-base font-semibold text-[#0A4E53] hover:text-[#07393D] transition-colors"
                  >
                    {siteConfig.contact.emergencyPhone}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // ===========================================================================
  // VARIANT 2: Dark High-Contrast Advisory CTA (Screenshot 2)
  // ===========================================================================
  const resolvedTitle = title || "Not Sure Which Service You Need?";
  const resolvedDesc =
    description ||
    "Tell us what is bothering you and our team will help you plan the right next step.";
  const resolvedBtnText = primaryButtonText || "Contact Our Team";

  return (
    <section className={cn("py-12 sm:py-20 bg-background", className)}>
      <div className="shell">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#0D282C] via-[#081B1E] to-[#040E10] text-white p-8 sm:p-14 lg:p-16 overflow-hidden border border-teal-500/25 shadow-xl"
        >
          {/* Ambient Radial Glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none select-none opacity-30"
            style={{
              background: "radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.4) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Bespoke Geometric Dental Diamond & Alignment Ring Motif (Original Lumina Watermark) */}
          <div
            className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-48 h-48 sm:w-72 sm:h-72 pointer-events-none select-none text-teal-400/15 group-hover:text-teal-400/25 transition-all duration-700"
            aria-hidden="true"
          >
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-full h-full">
              <circle cx="100" cy="100" r="86" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="64" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="42" strokeWidth="1" strokeDasharray="2 3" />
              <path
                d="M 100,60 L 108,92 L 140,100 L 108,108 L 100,140 L 92,108 L 60,100 L 92,92 Z"
                fill="currentColor"
                strokeWidth="0"
                opacity="0.8"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-[11px] font-mono uppercase tracking-wider text-teal-300 font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span>Clinical Consultation</span>
            </div>

            {/* Bold Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-white leading-[1.12] tracking-[-0.03em] mb-4">
              {resolvedTitle}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-lg">
              {resolvedDesc}
            </p>

            {/* Action Row: Lumina Teal Pill with Circle Badge */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleBooking}
                className="inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer touch-manipulation group"
              >
                <span>{resolvedBtnText}</span>
                <span className="w-8 h-8 rounded-full bg-slate-950 text-teal-400 flex items-center justify-center font-bold text-sm transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-white/90 hover:text-white border border-teal-500/30 hover:border-teal-500/60 bg-teal-950/20 transition-colors"
              >
                <Call02Icon className="w-4 h-4 text-teal-400" />
                <span>Call Us Directly</span>
              </Link>
              </div>
            </div>
          </motion.div>
          {showLocationInfo && (
            <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent mb-2">
                    Location
                  </p>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                    {siteConfig.contact.address}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent mb-2">
                    Hours
                  </p>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                    {siteConfig.contact.hours}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent mb-2">
                    Emergency
                  </p>
                  <a
                    href={`tel:${siteConfig.contact.emergencyPhone}`}
                    className="text-sm sm:text-base font-semibold text-white hover:text-accent transition-colors"
                  >
                    {siteConfig.contact.emergencyPhone}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

/**
 * Convenient shorthand for the dark high-contrast advisory CTA.
 */
export function DarkAdvisoryCTA(props: Omit<CTAProps, "variant">) {
  return <CTA variant="dark" {...props} />;
}