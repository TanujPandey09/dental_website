"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight01Icon,
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
  StarIcon,
} from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

const AUTOPLAY_MS = 8000;
const CHIPS = ["Dental check-ups", "Teeth whitening", "Clear aligners", "Implants", "Veneers", "Kids' dentistry"];

export function HeroCinematic() {
  const { openBooking } = useBooking();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth scroll parallax depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Only the doctors rotate. Everything else in the hero is static.
  const doctors = siteConfig.doctors.slice(0, 3);

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);

  const doctor = doctors[active] ?? doctors[0];

  const go = (next: number, dir: number) => {
    setDirection(dir);
    setActive((next + doctors.length) % doctors.length);
  };

  useEffect(() => {
    if (paused || reduced || doctors.length < 2) return;
    const t = setInterval(() => {
      setDirection(1);
      setActive((p) => (p + 1) % doctors.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, reduced, active, doctors.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchX(e.touches[0].clientX);
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    setPaused(false);
    if (touchX === null) return;
    const delta = e.changedTouches[0].clientX - touchX;
    if (Math.abs(delta) > 48) go(active + (delta < 0 ? 1 : -1), delta < 0 ? 1 : -1);
    setTouchX(null);
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Parallax background */}
      <motion.div
        style={{
          y: reduced ? 0 : backgroundY,
          scale: reduced ? 1 : backgroundScale,
        }}
        className="absolute inset-0 z-0 select-none will-change-transform"
      >
        <Image
          src={images.heroAveline}
          alt="Dentist showing a patient her smile in a hand mirror"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "70% 50%" }}
          draggable={false}
        />
      </motion.div>

      {/* Legibility overlays */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/70 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-slate-950/80 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1800px] flex-1 flex-col px-4 xs:px-5 pb-24 sm:pb-16 lg:pb-12 pt-20 sm:pt-24 lg:pt-32">
        {/* Headline (static) */}
        <div className="flex flex-1 items-center py-4 sm:py-0">
          <h1 className="text-[clamp(1.95rem,6.5vw,5rem)] font-medium leading-[1.02] sm:leading-[0.98] tracking-[-0.04em] sm:tracking-[-0.045em] text-balance">
            Modern dentistry
            <br />
            with a gentle touch.
          </h1>
        </div>

        {/* Description + CTAs (static) */}
        <div className="flex flex-col gap-5 sm:gap-6 pb-6 sm:pb-8 lg:flex-row lg:items-end lg:gap-14">
          <p className="max-w-[560px] text-sm xs:text-base leading-[1.5] text-white/90 lg:text-lg">
            Expert care for healthy, confident smiles at every age. Delivered with comfort,
            precision and a team that explains every step before it happens.
          </p>

          <div className="flex flex-row items-center gap-2.5 sm:gap-3.5">
            <button
              type="button"
              onClick={openBooking}
              className="group inline-flex h-11 xs:h-12 sm:h-[58px] cursor-pointer items-center gap-2 xs:gap-3 rounded-full bg-white pl-4 xs:pl-5 sm:pl-6 pr-1.5 xs:pr-2 text-xs xs:text-sm sm:text-base font-semibold text-slate-900 transition active:scale-95 touch-manipulation shadow-md shrink-0"
            >
              <span>Book an appointment</span>
              <span className="flex h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-sky-100 text-slate-800 transition-transform group-hover:translate-x-0.5 shrink-0">
                <ArrowRight01Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
            </button>

            <Link
              href="/services"
              className="inline-flex h-11 xs:h-12 sm:h-[58px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-3.5 xs:px-5 sm:px-6 text-xs xs:text-sm sm:text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 touch-manipulation shrink-0"
            >
              Explore treatments
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/20" />

        {/* Bottom row: chips (left) + slider controls & doctor card (right) */}
        <div className="flex flex-col gap-6 sm:gap-8 pt-6 sm:pt-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Chips */}
          <div className="flex max-w-[640px] flex-wrap gap-2 sm:gap-3">
            {CHIPS.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={openBooking}
                className={`h-[38px] sm:h-[46px] cursor-pointer rounded-full border px-3.5 sm:px-5 text-xs sm:text-[15px] font-medium transition active:scale-95 touch-manipulation ${i === 0
                  ? "border-white bg-white text-slate-900"
                  : "border-white/30 bg-slate-950/20 text-white backdrop-blur-md hover:bg-white/15"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right column */}
          <div className="w-full max-w-[488px] select-none lg:ml-auto">
            {/* Controls */}
            <div className="mb-4 flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous doctor"
                onClick={() => go(active - 1, -1)}
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/40 transition hover:bg-white/15 active:scale-95"
              >
                <ArrowLeft01Icon className="h-4 w-4" />
              </button>

              <span className="font-mono text-xs font-semibold">{String(active + 1).padStart(2, "0")}</span>

              <div className="flex flex-1 items-center gap-2">
                {doctors.map((d, i) => (
                  <div key={d.id} className="h-px flex-1 bg-white/30">
                    {i === active && (
                      <motion.div
                        key={`${active}-${paused}`}
                        className="h-[2px] -translate-y-px bg-white"
                        initial={{ width: paused || reduced ? "100%" : "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: paused || reduced ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <span className="font-mono text-xs font-semibold">{String(doctors.length).padStart(2, "0")}</span>

              <button
                type="button"
                aria-label="Next doctor"
                onClick={() => go(active + 1, 1)}
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/40 transition hover:bg-white/15 active:scale-95"
              >
                <ArrowRight01Icon className="h-4 w-4" />
              </button>
            </div>

            {/* Doctor card (only thing that changes) */}
            <div className="overflow-hidden rounded-[28px] bg-white p-2.5 text-slate-900 shadow-xl">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={doctor.id}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 24 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: d * -24 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="flex items-stretch gap-4"
                >
                  <div className="relative h-[90px] w-[106px] shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="106px"
                      className="object-cover object-top"
                      draggable={false}
                    />
                  </div>

                  <div className="relative flex min-w-0 flex-1 flex-col justify-between py-0.5 pr-1">
                    <div>
                      <p className="truncate pr-12 text-xl font-medium leading-tight">{doctor.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{doctor.specialty}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-700">
                      <span>{doctor.experience} years experience</span>
                      <span className="inline-flex items-center gap-1">
                        <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {doctor.rating}
                      </span>
                    </div>

                    <Link
                      href="/doctors"
                      aria-label={`View ${doctor.name}`}
                      className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-100"
                    >
                      <ArrowUpRight01Icon className="h-4 w-4" />
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