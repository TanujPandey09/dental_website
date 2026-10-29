"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  StarIcon,
  QuoteUpIcon,
  FilterIcon,
  Shield01Icon,
  CheckmarkBadge01Icon,
  Exchange01Icon,
  PlayIcon,
  PauseIcon,
  Search01Icon,
  ThumbsUpIcon,
  PlusSignIcon,
  Cancel01Icon,
  Location01Icon,
  SparklesIcon,
  ArrowRight01Icon,
  Calendar01Icon,
} from "hugeicons-react";
import siteConfig from "@/config/site";
import { images } from "@/config/images";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TransformationCase {
  id: string;
  patientName: string;
  treatment: string;
  doctorName: string;
  doctorSlug: string;
  shade: string;
  prep: string;
  duration: string;
  quote: string;
  beforeImage: string;
  afterImage: string;
}

const TRANSFORMATION_CASES: TransformationCase[] = [
  {
    id: "case-veneers",
    patientName: "Claire M.",
    treatment: "8 Porcelain Veneers",
    doctorName: "Dr. Sarah Jenkins",
    doctorSlug: "dr-sarah-jenkins",
    shade: "OM3 Natural Bleach",
    prep: "0.3mm Ultra-Thin",
    duration: "2 Visits · 14 Days",
    quote: "Dr. Jenkins matched my natural translucency so well that nobody suspects I have veneers. I can finally laugh openly in photos.",
    beforeImage: images.testimonials.before,
    afterImage: images.testimonials.after,
  },
  {
    id: "case-implants",
    patientName: "Michael R.",
    treatment: "Guided Ceramic Implant",
    doctorName: "Dr. Michael Chen",
    doctorSlug: "dr-michael-chen",
    shade: "Custom Zirconia Match",
    prep: "3D CBCT Surgical Stent",
    duration: "Single Visit Surgery",
    quote: "The 3D computer guidance eliminated any guesswork. Chewing feels 100% natural and strong again.",
    beforeImage: images.testimonials.before,
    afterImage: images.testimonials.after,
  },
  {
    id: "case-whitening",
    patientName: "Emma T.",
    treatment: "In-Office Laser Whitening",
    doctorName: "Dr. Emily Rodriguez",
    doctorSlug: "dr-emily-rodriguez",
    shade: "6 Shades Brighter",
    prep: "Enamel Safe Gel",
    duration: "45-Minute Session",
    quote: "Booked two weeks before my wedding day. Lifted all my coffee stains with completely zero sensitivity afterwards.",
    beforeImage: images.testimonials.before,
    afterImage: images.testimonials.after,
  },
];

const CLINICAL_PILLARS = [
  { label: "Unhurried Clinician Pacing", score: "99.4%", desc: "Dedicated 1-on-1 chair time with zero rushed consults" },
  { label: "100% Upfront Written Ledger", score: "98.8%", desc: "Zero surprise out-of-pocket bills before clinical work starts" },
  { label: "Acoustic Suite Calm (<32 dB)", score: "99.2%", desc: "Private insulated rooms with noise-cancelling comfort audio" },
  { label: "Sub-Millimeter Aesthetic Precision", score: "99.5%", desc: "Swiss biocompatible ceramics characterized to your facial lines" },
];

const RATING_DISTRIBUTION = [
  { stars: 5, percent: 96, count: "768" },
  { stars: 4, percent: 4, count: "32" },
  { stars: 3, percent: 0, count: "0" },
];

export function TestimonialsClient() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();

  // Testimonials state (allows optimistic addition of new user reviews)
  const [reviewsList, setReviewsList] = useState(siteConfig.testimonials);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [only5Stars, setOnly5Stars] = useState(false);
  const [onlyPhotos, setOnlyPhotos] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "helpful">("helpful");

  // Helpful click tracker (simulated state)
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, number>>({
    1: 42,
    2: 38,
    3: 29,
    4: 19,
    5: 31,
    6: 24,
  });
  const [votedMap, setVotedMap] = useState<Record<number, boolean>>({});

  // Interactive Transformation Spotlight Slider state
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Audio Voice Note Simulation state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(42);

  // "Share Your Experience" Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [newAuthor, setNewAuthor] = useState("");
  const [newTreatment, setNewTreatment] = useState("Cosmetic Dentistry");
  const [newText, setNewText] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const categories = useMemo(() => [
    "All",
    ...Array.from(new Set(reviewsList.map((t) => t.treatment))),
  ], [reviewsList]);

  // Handle Dragging on the Before/After spotlight
  const handlePointerMove = useCallback((clientX: number) => {
    if (!spotlightRef.current) return;
    const rect = spotlightRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    handlePointerMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  // Toggle helpful upvote
  const handleToggleHelpful = (id: number) => {
    if (votedMap[id]) return;
    setHelpfulVotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setVotedMap((prev) => ({ ...prev, [id]: true }));
  };

  // Filtered & sorted reviews
  const filteredReviews = useMemo(() => {
    return reviewsList
      .filter((review) => {
        if (activeCategory !== "All" && review.treatment !== activeCategory) return false;
        if (selectedPlatform !== "All" && review.platform !== selectedPlatform) return false;
        if (only5Stars && review.rating < 5) return false;
        if (onlyPhotos && (!review.beforeImage || !review.afterImage)) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = review.name.toLowerCase().includes(q);
          const matchesTreatment = review.treatment.toLowerCase().includes(q);
          const matchesText = review.text.toLowerCase().includes(q);
          if (!matchesName && !matchesTreatment && !matchesText) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "helpful") return (helpfulVotes[b.id] || 0) - (helpfulVotes[a.id] || 0);
        return b.id - a.id;
      });
  }, [reviewsList, activeCategory, selectedPlatform, only5Stars, onlyPhotos, searchQuery, sortBy, helpfulVotes]);

  // Handle submission of user review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const createdReview = {
      id: Date.now(),
      name: newAuthor.trim(),
      treatment: newTreatment,
      text: newText.trim(),
      rating: newRating,
      patientImage: images.testimonials.patients[1],
      platform: "Verified Patient",
      demo: false,
    };

    setReviewsList((prev) => [createdReview, ...prev]);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setIsModalOpen(false);
      setNewAuthor("");
      setNewText("");
    }, 1800);
  };

  const currentCase = TRANSFORMATION_CASES[activeCaseIndex];

  return (
    <div className="bg-background text-foreground overflow-x-clip">
      {/* ============================================================== */}
      {/* 1. AGGREGATE CLINICAL SATISFACTION BENTO (Distinctive Hub)     */}
      {/* ============================================================== */}
      <section className="pt-10 sm:pt-14 pb-12 sm:pb-16 bg-muted/30 border-b border-border/60">
        <div className="shell">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-primary mb-3">
              Audited Patient Metrics /
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.12]">
              Real feedback,{" "}
              <span className="inline-block rounded-md bg-primary/20 text-foreground px-2 py-0.5 font-normal">
                unfiltered.
              </span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mt-3">
              Independent reviews aggregated across Google, Yelp, and Healthgrades. Every score reflects verified in-clinic treatment at our Austin locations.
            </p>
          </div>

          {/* 3-Column Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Bento Card 1: Score & Star Distribution */}
            <div className="lg:col-span-4 rounded-3xl bg-card border border-border/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    Overall Satisfaction
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Data
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl sm:text-6xl font-sans font-medium tracking-tight text-foreground">
                    4.9
                  </span>
                  <span className="text-muted-foreground text-lg font-medium">/ 5.0</span>
                </div>

                <div className="flex items-center gap-1 text-rating mb-2" role="img" aria-label="4.9 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mb-6">
                  Based on 800+ audited patient surveys across 15 years.
                </p>

                {/* Rating Distribution Bars */}
                <div className="space-y-2 pt-4 border-t border-border/60">
                  {RATING_DISTRIBUTION.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3 text-xs">
                      <span className="w-10 text-muted-foreground font-mono font-medium shrink-0">
                        {item.stars} ★
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-700"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                      <span className="w-12 text-right text-muted-foreground font-mono text-[11px] shrink-0">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Badges */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/60 text-[11px] font-medium text-muted-foreground">
                <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedPlatform("Google")}>Google 4.9 ★</span>
                <span className="text-border">|</span>
                <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedPlatform("Yelp")}>Yelp 4.8 ★</span>
                <span className="text-border">|</span>
                <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedPlatform("Healthgrades")}>Healthgrades 5.0 ★</span>
              </div>
            </div>

            {/* Bento Card 2: 4 Clinical Governance Commitments */}
            <div className="lg:col-span-5 rounded-3xl bg-card border border-border/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    Governance Standards
                  </span>
                  <span className="text-xs font-semibold text-primary">Austin Operatory Audit</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {CLINICAL_PILLARS.map((pillar) => (
                    <div
                      key={pillar.label}
                      className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex flex-col justify-between group hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl sm:text-2xl font-sans font-medium text-primary tracking-tight">
                          {pillar.score}
                        </span>
                        <CheckmarkBadge01Icon className="w-4 h-4 text-primary/70" />
                      </div>
                      <h4 className="text-xs sm:text-[13px] font-medium text-foreground leading-snug mb-1">
                        {pillar.label}
                      </h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                        {pillar.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Shield01Icon className="w-4 h-4 text-primary" />
                  <span>Verified Texas Dental Board Standards</span>
                </span>
                <Link href="/about?view=clinical" className="text-primary font-semibold hover:underline text-xs">
                  Read protocols →
                </Link>
              </div>
            </div>

            {/* Bento Card 3: "Share Your Story" Invitation Box */}
            <div className="lg:col-span-3 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-sans font-medium text-foreground tracking-tight mb-2">
                  Have You Visited Lumina?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Your feedback helps continuous patient advocacy. Share your consultation or treatment journey with our clinical team.
                </p>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full h-11 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 touch-manipulation"
                >
                  <PlusSignIcon className="w-4 h-4" />
                  <span>Leave a Review</span>
                </button>
                <p className="text-[11px] text-center text-muted-foreground/80 mt-2.5">
                  Takes less than 60 seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. DISTINCTIVE CLINICAL TRANSFORMATION SPOTLIGHT (Slider)      */}
      {/* ============================================================== */}
      <section className="py-14 sm:py-20 bg-background border-b border-border/60">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Case Selector & Detailed File */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-primary mb-3">
                  Case Studies &amp; Results /
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-foreground tracking-[-0.03em] leading-tight mb-3">
                  Inspect the Before &amp; After{" "}
                  <span className="inline-block rounded-md bg-primary/20 text-foreground px-2 py-0.5 font-normal">
                    Precision
                  </span>
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Drag the interactive center slider to inspect tooth edge contours, ceramic shade gradient, and gingival margins.
                </p>
              </div>

              {/* Case switcher tabs */}
              <div className="flex flex-wrap gap-2 pt-1">
                {TRANSFORMATION_CASES.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setActiveCaseIndex(i);
                      setSliderPosition(50);
                    }}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer touch-manipulation",
                      activeCaseIndex === i
                        ? "bg-foreground text-background shadow-xs font-bold"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"
                    )}
                  >
                    {c.patientName} · {c.treatment}
                  </button>
                ))}
              </div>

              {/* Detailed Spec Ledger Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{currentCase.patientName}</h4>
                    <p className="text-xs text-muted-foreground">{currentCase.treatment}</p>
                  </div>
                  <Link
                    href={`/doctors/${currentCase.doctorSlug}`}
                    className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>{currentCase.doctorName}</span>
                    <ArrowRight01Icon className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60">
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block mb-0.5">Shade</span>
                    <span className="font-semibold text-foreground truncate block">{currentCase.shade}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60">
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block mb-0.5">Prep</span>
                    <span className="font-semibold text-foreground truncate block">{currentCase.prep}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60">
                    <span className="text-[10px] text-muted-foreground uppercase font-mono block mb-0.5">Visits</span>
                    <span className="font-semibold text-foreground truncate block">{currentCase.duration}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground italic leading-relaxed pt-2">
                  &ldquo;{currentCase.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Draggable Scrubber */}
            <div className="lg:col-span-7">
              <div className="p-2 rounded-3xl bg-muted/40 border border-border/80 shadow-sm">
                <div
                  ref={spotlightRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={(e) => isDragging && handlePointerMove(e.clientX)}
                  onPointerUp={handlePointerUp}
                  className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none touch-pan-y bg-muted border border-border/60"
                  role="region"
                  aria-label="Before and after transformation slider"
                >
                  {/* Base: AFTER Image */}
                  <Image
                    src={currentCase.afterImage}
                    alt={`${currentCase.treatment} After`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover pointer-events-none"
                    priority
                  />

                  {/* Clipped: BEFORE Image */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <Image
                      src={currentCase.beforeImage}
                      alt={`${currentCase.treatment} Before`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Interactive Divider Line with Central Handle */}
                  <div
                    className="absolute inset-y-0 z-20 flex items-center justify-center -translate-x-1/2 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="h-full w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.6)]" />
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full bg-white text-slate-900 border-2 border-primary shadow-xl flex items-center justify-center transition-transform",
                        isDragging ? "scale-110" : ""
                      )}
                    >
                      <Exchange01Icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* Corner Pills */}
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-white z-10 border border-white/20">
                    PRE-OP
                  </div>
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-bold z-10 shadow-xs">
                    FINAL SMILE
                  </div>

                  {/* Bottom Slider Instruction */}
                  <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/90 font-medium">
                      Drag left / right to compare
                    </span>
                  </div>
                </div>

                {/* Quick Switch Buttons for Accessibility */}
                <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => setSliderPosition(100)}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    ← 100% Pre-Op
                  </button>
                  <button
                    type="button"
                    onClick={() => setSliderPosition(50)}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Center Split (50/50)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSliderPosition(0)}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    100% Final Smile →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. DISTINCTIVE AUDIO PATIENT STORY PLAYER (Voice Experience)   */}
      {/* ============================================================== */}
      <section className="py-8 bg-card border-b border-border/60">
        <div className="shell">
          <div className="p-5 sm:p-6 rounded-2xl bg-muted/40 border border-border/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shrink-0 shadow-md transition-all active:scale-95 cursor-pointer touch-manipulation"
                aria-label={isPlayingAudio ? "Pause audio story" : "Play audio story"}
              >
                {isPlayingAudio ? (
                  <PauseIcon className="w-5 h-5 fill-current" />
                ) : (
                  <PlayIcon className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                    PATIENT VOICE NOTE · 0:42
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground truncate">
                  Claire Montgomery on Her Veneer Design in South Congress
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-1 italic">
                  &ldquo;I felt 100% heard. No sales pressure, just clear 3D preview and total gentleness.&rdquo;
                </p>
              </div>
            </div>

            {/* Audio Waveform Equalizer Bars */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-end gap-1 h-7">
                {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75].map((h, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-1 rounded-full transition-all duration-300",
                      isPlayingAudio ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
                    )}
                    style={{
                      height: isPlayingAudio ? `${Math.max(15, (h * (i % 2 === 0 ? 1 : 0.7)))}%` : "30%",
                      animationDelay: `${i * 70}ms`,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-muted-foreground">0:42 / 1:15</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. MULTI-FACETED FILTERS & SEARCH CONTROLS                     */}
      {/* ============================================================== */}
      <section className="py-12 sm:py-16 bg-muted/20">
        <div className="shell">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search01Icon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reviews by treatment, doctor, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border/80 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setOnly5Stars(!only5Stars)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer touch-manipulation",
                  only5Stars
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40"
                    : "bg-card text-muted-foreground border-border/70 hover:border-foreground"
                )}
              >
                ★ 5 Stars Only
              </button>

              <button
                type="button"
                onClick={() => setOnlyPhotos(!onlyPhotos)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer touch-manipulation",
                  onlyPhotos
                    ? "bg-primary/15 text-primary border-primary/40"
                    : "bg-card text-muted-foreground border-border/70 hover:border-foreground"
                )}
              >
                📸 With Photos
              </button>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-9 px-3 rounded-lg bg-card border border-border/70 text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer shadow-xs"
              >
                <option value="helpful">Sort: Most Helpful</option>
                <option value="rating">Sort: Highest Rated</option>
                <option value="recent">Sort: Most Recent</option>
              </select>
            </div>
          </div>

          {/* Treatment Category Pills (Horizontal Scroll on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((category) => {
              const active = activeCategory === category;
              const count = category === "All"
                ? reviewsList.length
                : reviewsList.filter((r) => r.treatment === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer touch-manipulation flex items-center gap-2 shadow-xs",
                    active
                      ? "bg-foreground text-background"
                      : "bg-card text-muted-foreground border border-border/80 hover:border-foreground hover:text-foreground"
                  )}
                >
                  <span>{category}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-mono",
                      active ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ============================================================== */}
          {/* 5. DISTINCTIVE REVIEWS MASONRY / GRID                          */}
          {/* ============================================================== */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review) => {
                const isVoted = votedMap[review.id];
                const voteCount = helpfulVotes[review.id] || 18;

                return (
                  <motion.div
                    layout={reduceMotion ? false : true}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3 }}
                    key={review.id}
                    className="break-inside-avoid"
                  >
                    <div className="rounded-3xl bg-card border border-border/80 p-6 sm:p-7 shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between">
                      <QuoteUpIcon className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors pointer-events-none" />

                      <div>
                        {/* Top Metadata Header */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {review.treatment}
                          </span>

                          <span className="text-[11px] font-mono text-muted-foreground font-medium">
                            via {review.platform}
                          </span>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 text-rating mb-3" role="img" aria-label={`${review.rating} stars`}>
                          {[...Array(Math.floor(review.rating))].map((_, i) => (
                            <StarIcon key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>

                        {/* Review Content */}
                        <p className="text-muted-foreground text-xs sm:text-[13px] leading-relaxed italic mb-5">
                          &ldquo;{review.text}&rdquo;
                        </p>

                        {/* Optional Before/After preview on review card */}
                        {review.beforeImage && review.afterImage && (
                          <div className="flex gap-2 mb-5 rounded-2xl overflow-hidden h-28 border border-border/70 bg-muted/40 p-1">
                            <div className="relative w-1/2 rounded-xl overflow-hidden">
                              <Image src={review.beforeImage} alt="Pre-Op" fill sizes="200px" className="object-cover" />
                              <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                                BEFORE
                              </span>
                            </div>
                            <div className="relative w-1/2 rounded-xl overflow-hidden">
                              <Image src={review.afterImage} alt="Final" fill sizes="200px" className="object-cover" />
                              <span className="absolute bottom-1.5 left-1.5 bg-primary text-primary-foreground text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                                AFTER
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Author & Helpful Action Footer */}
                      <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3 mt-auto">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-muted border border-border/70 shrink-0">
                            <Image
                              src={review.patientImage || images.testimonials.patients[1]}
                              alt={review.name}
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate">
                              {review.name}
                            </h4>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Location01Icon className="w-3 h-3 text-primary" />
                              <span>Austin Suite</span>
                            </span>
                          </div>
                        </div>

                        {/* Helpful Upvote Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleHelpful(review.id)}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer touch-manipulation",
                            isVoted
                              ? "bg-primary/15 text-primary font-semibold"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                          title="Mark this review as helpful"
                        >
                          <ThumbsUpIcon className={cn("w-3.5 h-3.5", isVoted ? "text-primary" : "")} />
                          <span>{voteCount}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-20 rounded-3xl bg-card border border-border/70 p-8 my-6">
              <Search01Icon className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-1">No reviews match your filters</h3>
              <p className="text-xs text-muted-foreground mb-4">Try clearing the search query or selecting a different treatment.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setSelectedPlatform("All");
                  setOnly5Stars(false);
                  setOnlyPhotos(false);
                }}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. "SHARE YOUR EXPERIENCE" INTERACTIVE MODAL DIALOG            */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border/70 mb-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold block mb-0.5">
                    PATIENT VOICE
                  </span>
                  <h3 className="text-xl font-sans font-medium text-foreground tracking-tight">
                    Share Your Dental Experience
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <Cancel01Icon className="w-5 h-5" />
                </button>
              </div>

              {submittedFeedback ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                    <CheckmarkBadge01Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-sans font-medium text-foreground">
                    Thank You for Your Feedback!
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                    Your verified review has been recorded and added to our community wall.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Interactive Star Rating */}
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">
                      Overall Rating
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setNewRating(star)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                        >
                          <StarIcon
                            className={cn(
                              "w-6 h-6 transition-colors",
                              (hoverRating !== null ? star <= hoverRating : star <= newRating)
                                ? "text-amber-500 fill-amber-500"
                                : "text-muted-foreground/30"
                            )}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-medium text-muted-foreground ml-2">
                        {newRating === 5 && "5 Stars · Outstanding Care"}
                        {newRating === 4 && "4 Stars · Great Experience"}
                        {newRating === 3 && "3 Stars · Good"}
                        {newRating === 2 && "2 Stars · Fair"}
                        {newRating === 1 && "1 Star · Needs Improvement"}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">
                      Your Name or Initials
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rachel K."
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Treatment Category */}
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">
                      Procedure Completed
                    </label>
                    <select
                      value={newTreatment}
                      onChange={(e) => setNewTreatment(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="Cosmetic Dentistry">Cosmetic Dentistry (Veneers / Bonding)</option>
                      <option value="Dental Implants">Dental Implants &amp; Restorations</option>
                      <option value="Teeth Whitening">Teeth Whitening</option>
                      <option value="Orthodontics">Orthodontics &amp; Clear Aligners</option>
                      <option value="General Dentistry">General &amp; Preventative Checkup</option>
                      <option value="Root Canal">Gentle Endodontic Care</option>
                    </select>
                  </div>

                  {/* Review Text */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-foreground">
                        Your Clinical Experience
                      </label>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {newText.length} / 500
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      maxLength={500}
                      placeholder="Describe the pacing, staff empathy, comfort, and results..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-11 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer active:scale-95 touch-manipulation"
                    >
                      Submit Verified Review
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
