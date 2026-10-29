"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  SparklesIcon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  UserIcon,
  Exchange01Icon,
} from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/BookingContext";
import { images } from "@/config/images";

interface CaseStudy {
  id: string;
  patientName: string;
  age: number;
  treatment: string;
  category: string;
  beforeDescription: string;
  afterDescription: string;
  timeline: string;
  doctor: string;
  license: string;
  quote: string;
  beforeImage: string;
  afterImage: string;
  metrics: { label: string; value: string }[];
}

const CASES: CaseStudy[] = [
  {
    id: "case-veneers",
    patientName: "Roberto C.",
    age: 34,
    treatment: "8 Hand-Layered Porcelain Veneers",
    category: "Cosmetic Restoration",
    beforeDescription: "Worn incisal edges, micro-fractures, and uneven tetracycline shading.",
    afterDescription: "Ultra-thin ceramic veneers matching natural translucency and facial symmetry.",
    timeline: "2 visits · 14 days",
    doctor: "Dr. Sarah Jenkins",
    license: "DDS · TX LIC. 21844",
    quote:
      "I used to instinctively cover my mouth when laughing in photos. Two visits later, I smiled openly with complete confidence. It feels 100% natural.",
    beforeImage: images.testimonials.before,
    afterImage: images.testimonials.after,
    metrics: [
      { label: "Visits", value: "2 Appointments" },
      { label: "Shade", value: "OM3 Natural" },
      { label: "Tooth Prep", value: "0.3mm Ultra-thin" },
    ],
  },
  {
    id: "case-implants",
    patientName: "Margaret S.",
    age: 61,
    treatment: "Computer-Guided Ceramic Implants",
    category: "Implant Reconstruction",
    beforeDescription: "Missing posterior molars, bite collapse, and chronic chewing discomfort.",
    afterDescription: "Digitally-guided titanium implants with monolithic zirconia screw-retained bridges.",
    timeline: "3 visits · Fully integrated",
    doctor: "Dr. Michael Chen",
    license: "DMD · TX LIC. 24983",
    quote:
      "I can eat crisp apples and enjoy family dinners again without hesitation. Even my jawline looks rejuvenated.",
    beforeImage: images.testimonials.before,
    afterImage: images.testimonials.after,
    metrics: [
      { label: "Guidance", value: "3D CBCT Stent" },
      { label: "Stability", value: "Lifelong Anchor" },
      { label: "Healing", value: "Fast-Track Protocol" },
    ],
  },
  {
    id: "case-aligners",
    patientName: "Elena D.",
    age: 28,
    treatment: "Clear Aligners & Esthetic Contouring",
    category: "Digital Orthodontics",
    beforeDescription: "Severe lower anterior crowding and asymmetrical midline shift.",
    afterDescription: "Full dental arch alignment with micro-laser gingival contouring.",
    timeline: "7 months · Virtual check-ins",
    doctor: "Dr. Emily Rodriguez",
    license: "DDS, MS · TX LIC. 28410",
    quote:
      "Nobody at work realized I was wearing aligners. The digital progress updates kept me motivated the whole way through.",
    beforeImage: images.testimonials.before,
    afterImage: images.testimonials.after,
    metrics: [
      { label: "Trays", value: "22 Aligners" },
      { label: "Wear time", value: "21.5 hrs/day" },
      { label: "Check-ins", value: "Virtual + 3 In-Clinic" },
    ],
  },
];

export function BeforeAfterGallery() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const current = CASES[activeIndex];

  const selectCase = (index: number) => {
    setActiveIndex(index);
    setSliderPosition(50);
  };

  const updatePosition = useCallback((clientX: number) => {
    const el = canvasRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) updatePosition(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <section className="overflow-hidden border-t border-border/60 bg-muted/20 py-16 sm:py-20 lg:py-24">
      <div className="shell">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <span className="text-muted-foreground/80 text-xs sm:text-sm font-medium tracking-tight block mb-2">
            Smile Transformations /
          </span>

          <h2 className="mb-3 text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.12]">
            Your smile is worth a{" "}
            <span className="inline-block rounded-md bg-primary/20 text-foreground px-2 py-0.5 font-normal">
              thousand words.
            </span>
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base max-w-xl mx-auto">
            Real patient transformations documented in our operatory suites. Drag
            the divider to compare the preoperative state with the final bonded
            ceramic restoration.
          </p>

          {/* Case tabs */}
          <div
            role="tablist"
            aria-label="Patient cases"
            className="no-scrollbar mt-6 flex justify-start gap-2 overflow-x-auto sm:justify-center"
          >
            {CASES.map((item, i) => {
              const active = i === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectCase(i)}
                  className={`flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border px-4 py-2 text-xs font-semibold transition-colors ${active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/70 bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <span className="font-mono text-[11px] opacity-75">0{i + 1}</span>
                  <span>{item.patientName}</span>
                  <span className="hidden opacity-60 md:inline">· {item.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewer + case file */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: comparison slider */}
          <motion.div
            key={current.id}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
            className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-card p-3 lg:col-span-7"
          >
            <div
              ref={canvasRef}
              role="group"
              aria-label={`Before and after comparison for ${current.treatment}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-muted sm:aspect-[16/11] lg:aspect-auto lg:min-h-[420px] lg:flex-1"
            >
              {/* After (base) */}
              <Image
                src={current.afterImage}
                alt={`After ${current.treatment}, ${current.patientName}`}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="pointer-events-none object-cover"
                draggable={false}
              />

              {/* Before (clipped) */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src={current.beforeImage}
                  alt={`Before ${current.treatment}, ${current.patientName}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                  draggable={false}
                />
              </div>

              {/* Keyboard control (must come before the handle for peer styles) */}
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(sliderPosition)}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label="Comparison slider position"
                className="peer sr-only"
              />

              {/* Divider + handle */}
              <div
                className="pointer-events-none absolute inset-y-0 z-20 flex -translate-x-1/2 items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="h-full w-0.5 bg-background shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                <div
                  className={`absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-lg transition-transform ${isDragging ? "scale-110" : ""
                    }`}
                >
                  <Exchange01Icon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>

              {/* Labels */}
              <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-foreground/80 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-background backdrop-blur-md">
                Before
              </span>
              <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-md bg-primary/90 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-md">
                After
              </span>

              <span className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground/70 px-3 py-1 text-[10px] font-medium tracking-wide text-background backdrop-blur-sm">
                Drag slider horizontally to compare
              </span>
            </div>

            {/* Summary bar */}
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-2 pb-1 text-xs">
              <span className="font-semibold text-foreground">
                Case 0{activeIndex + 1} · {current.category}
              </span>
              <span className="font-mono text-[11px] text-primary">
                Unretouched clinical operatory imagery
              </span>
            </div>
          </motion.div>

          {/* RIGHT: case file */}
          <motion.div
            key={`info-${current.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.08 }}
            className="flex flex-col gap-5 rounded-3xl border border-border/70 bg-card p-6 sm:p-7 lg:col-span-5"
          >
            {/* File header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  Verified Patient File
                </span>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                Age {current.age}
              </span>
            </div>

            {/* Title + description */}
            <div>
              <h3 className="mb-2 font-heading text-xl font-bold leading-snug text-foreground sm:text-2xl">
                {current.treatment}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {current.afterDescription}
              </p>
            </div>

            {/* Metrics */}
            <dl className="grid grid-cols-3 gap-2.5 rounded-xl border border-border/60 bg-muted/40 p-3 text-center">
              {current.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[10px] uppercase text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="mt-0.5 text-xs font-bold text-foreground">{m.value}</dd>
                </div>
              ))}
            </dl>

            {/* Complaint / outcome */}
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Initial Complaint:</strong>{" "}
                  {current.beforeDescription}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckmarkCircle01Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <strong className="text-foreground">Clinical Outcome:</strong>{" "}
                  Restored masticatory function and micro-esthetic harmony.
                </span>
              </li>
            </ul>

            {/* Quote */}
            <figure className="rounded-xl border border-primary/15 bg-primary/5 p-3.5">
              <blockquote className="text-xs italic leading-relaxed text-foreground/90">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-[11px] font-semibold text-primary">
                — {current.patientName}, Verified Patient
              </figcaption>
            </figure>

            {/* Clinician + timeline */}
            <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs">
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-foreground">{current.doctor}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{current.license}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Clock01Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span>{current.timeline}</span>
              </div>
            </div>

            {/* CTA pinned to the bottom so both cards end on the same line */}
            <div className="mt-auto border-t border-border/60 pt-4">
              <Button
                size="default"
                variant="cta"
                onClick={openBooking}
                className="h-11 w-full rounded-lg text-xs font-semibold"
              >
                <span>Book a Consultation for This Procedure</span>
                <ArrowRight01Icon className="size-4 shrink-0" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}