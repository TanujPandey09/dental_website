"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowRight01Icon,
  ArrowDown01Icon,
  StarIcon,
  Calendar01Icon,
  Shield01Icon,
} from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { images } from "@/config/images";

const STATS = [
  { value: "4.9", suffix: "/5", label: "Google Rating" },
  { value: "800", suffix: "+", label: "Patient Reviews" },
  { value: "100", suffix: "%", label: "Pain-Free Pacing" },
  { value: "24", suffix: " Hrs", label: "Emergency Relief" },
];

export function HeroLuma() {
  const { openBooking } = useBooking();
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.06]);
  const badgeComfortY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -26]);
  const badgeAvailY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 22]);

  const patientAvatars = [
    images.testimonials.patients[1],
    images.testimonials.patients[2],
    images.testimonials.patients[3],
  ];

  return (
    <section ref={heroRef} className="bg-background pb-20 pt-16 text-foreground sm:pb-16 sm:pt-24 lg:pb-16 lg:pt-24">
      <div className="shell">
        {/* Two equal columns, 56px gap */}
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: copy */}
          <div>
            {/* Eyebrow pill */}
            <div className="mb-4 sm:mb-5 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1">
              <span className="h-1 w-1 rounded-full bg-foreground" />
              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-foreground">
                Modern Dental Care, Made Human
              </span>
            </div>

            {/* Headline: light weight, highlighted block on "smile." */}
            <h1 className="font-sans text-3xl xs:text-4xl sm:text-5xl lg:text-[84px] font-light leading-[1.08] tracking-[-0.03em] text-foreground">
              Feel good about <br />
              your{" "}
              <span className="inline-block rounded-md bg-primary/30 px-1 py-0.5 font-normal">
                smile.
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-3.5 text-sm xs:text-base sm:text-lg lg:text-[20px] leading-[1.5] text-muted-foreground">
              Gentle, modern dentistry in Austin—clear guidance, honest pricing,
              and a calmer visit from hello to healthy.
            </p>

            {/* Buttons */}
            <div className="mt-5 flex flex-row items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex h-10 xs:h-11 sm:h-12 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-primary px-3.5 xs:px-5 py-2 text-xs xs:text-sm sm:text-base font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-95 touch-manipulation shrink-0"
              >
                <span>Book appointment</span>
                <ArrowRight01Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
              <Link
                href="/services"
                className="bg-background border-border/80 text-foreground py-2 px-3.5 xs:px-5 inline-flex h-10 xs:h-11 sm:h-12 items-center justify-center rounded-md border text-xs xs:text-sm sm:text-base font-semibold transition hover:bg-foreground/5 active:scale-95 touch-manipulation shrink-0"
              >
                Explore services
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-7 flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                {patientAvatars.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-[22px] w-[22px] overflow-hidden rounded-full border border-background bg-muted"
                  >
                    <Image
                      src={src}
                      alt="Verified patient"
                      fill
                      sizes="22px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="leading-tight">
                <div className="flex items-center gap-1 text-xs text-foreground">
                  <span>4.9</span>
                  <StarIcon className="h-3 w-3" />
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  from 800+ Google reviews
                </p>
              </div>
            </div>
          </div>

          {/* Right: portrait with multi-layer floating badges (Dentry-style Parallax) */}
          <div className="relative mx-auto aspect-[9/10] w-full max-w-[480px] overflow-hidden rounded-2xl bg-muted lg:max-w-none shadow-xl border border-border/60">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <Image
                src={images.heroLuma}
                alt="Friendly welcoming dentist at Lumina Dental"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </motion.div>

            {/* Right badge: comfort-first care with differential scroll parallax */}
            <motion.div
              style={{ y: badgeComfortY }}
              whileHover={reduceMotion ? undefined : { scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="absolute right-4 top-[57%] flex items-center gap-2 rounded-lg bg-card/95 backdrop-blur-md px-2.5 py-2 text-card-foreground shadow-md border border-border/40 will-change-transform z-10"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/20 text-foreground">
                <Shield01Icon className="h-3 w-3" />
              </span>
              <div className="leading-tight">
                <p className="text-[11px] font-medium">Comfort-first care</p>
                <p className="text-[9px] text-muted-foreground">
                  Nitrous oxide available
                </p>
              </div>
            </motion.div>

            {/* Left badge: next availability with counter scroll parallax */}
            <motion.div
              style={{ y: badgeAvailY }}
              whileHover={reduceMotion ? undefined : { scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="absolute bottom-9 left-4 flex items-center gap-2 rounded-lg bg-card/95 backdrop-blur-md px-2.5 py-2 text-card-foreground shadow-md border border-border/40 will-change-transform z-10"
            >
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-primary/20 text-foreground">
                <Calendar01Icon className="h-3 w-3" />
              </span>
              <div className="leading-tight">
                <p className="text-[9px] text-muted-foreground">
                  Next availability
                </p>
                <p className="text-[11px] font-medium">Today, 2:30 PM</p>
              </div>
              <ArrowDown01Icon className="ml-1 h-3 w-3 text-muted-foreground" />
            </motion.div>
          </div>
        </div>

        {/* Stats: 4 cards, 8px gap, 48px below the hero row */}
        <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border/60 bg-muted/50 px-4 py-8 text-center"
            >
              <p className="text-3xl font-light leading-none tracking-tight text-foreground sm:text-4xl">
                {s.value}
                <span className="text-primary">{s.suffix}</span>
              </p>
              <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}