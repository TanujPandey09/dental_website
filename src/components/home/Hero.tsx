"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useHeroStyle, HeroStyle } from "@/components/HeroStyleContext";
import { HeroCinematic } from "@/components/home/heroes/HeroCinematic";
import { HeroDentix } from "@/components/home/heroes/HeroDentix";
import { HeroLuma } from "@/components/home/heroes/HeroLuma";
import { HeroBookingSplit } from "@/components/home/heroes/HeroBookingSplit";
import { HeroSpecialistSplit } from "@/components/home/heroes/HeroSpecialistSplit";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

export interface HeroVariantItem {
  id: HeroStyle;
  title: string;
  num: string;
  component: React.ComponentType;
}

const HERO_VARIANTS: HeroVariantItem[] = [
  { id: "cinematic", title: "Cinematic Luxury", num: "01", component: HeroCinematic },
  { id: "dentix", title: "Surgical Authority", num: "02", component: HeroDentix },
  { id: "luma", title: "Boutique Practice", num: "03", component: HeroLuma },
  { id: "booking", title: "Instant Scheduling", num: "04", component: HeroBookingSplit },
  { id: "specialist", title: "Multi-Specialty Care", num: "05", component: HeroSpecialistSplit },
];

export function Hero() {
  const { heroStyle, setHeroStyle } = useHeroStyle();
  const shouldReduceMotion = useReducedMotion();

  // Find index of active hero
  const activeIndex = Math.max(
    0,
    HERO_VARIANTS.findIndex((v) => v.id === heroStyle)
  );

  const [direction, setDirection] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const totalVariants = HERO_VARIANTS.length;
  const currentVariant = HERO_VARIANTS[activeIndex] || HERO_VARIANTS[0];
  const CurrentHeroComponent = currentVariant.component;

  // Handlers for slide transitions
  const handlePrev = useCallback(() => {
    setDirection(-1);
    const prevIndex = (activeIndex - 1 + totalVariants) % totalVariants;
    setHeroStyle(HERO_VARIANTS[prevIndex].id);
  }, [activeIndex, totalVariants, setHeroStyle]);

  const handleNext = useCallback(() => {
    setDirection(1);
    const nextIndex = (activeIndex + 1) % totalVariants;
    setHeroStyle(HERO_VARIANTS[nextIndex].id);
  }, [activeIndex, totalVariants, setHeroStyle]);

  const handleJump = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setHeroStyle(HERO_VARIANTS[index].id);
  }, [activeIndex, setHeroStyle]);

  // Autoplay
  useEffect(() => {
    if (shouldReduceMotion || !isPlaying || isHovered || isFocused) {
      return;
    }
    const timer = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(timer);
  }, [shouldReduceMotion, isPlaying, isHovered, isFocused, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Dental Clinic Hero Layout Showcase"
      aria-live={isPlaying ? "off" : "polite"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden bg-background"
    >
      {/* 1. Distinct Hero Variant Carousel */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentVariant.id}
          custom={direction}
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, x: direction > 0 ? 30 : -30 }
          }
          animate={{ opacity: 1, x: 0 }}
          exit={
            shouldReduceMotion
              ? undefined
              : { opacity: 0, x: direction > 0 ? -30 : 30 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.35, ease: [0.32, 0.72, 0, 1] }
          }
          aria-label={`Slide ${activeIndex + 1} of ${totalVariants}: ${currentVariant.title}`}
        >
          <CurrentHeroComponent />
        </motion.div>
      </AnimatePresence>

      {/* 2. Sleek Floating 5-Hero Carousel Dock */}
      <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto w-max max-w-[calc(100vw-24px)] px-1">
        <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-950/90 backdrop-blur-xl border border-white/20 text-white shadow-xl select-none">

          {/* Play / Pause Toggle Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause layout carousel" : "Start layout carousel"}
            className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all cursor-pointer active:scale-90 touch-manipulation shrink-0"
          >
            {isPlaying ? (
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 7 5.5z" />
              </svg>
            )}
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous layout"
            className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer touch-manipulation shrink-0"
          >
            <ArrowLeft01Icon className="w-3.5 h-3.5" />
          </button>

          {/* Counter & Current Layout Name */}
          <div className="flex items-center gap-1.5 px-1 min-w-0">
            <span className="text-[10px] font-mono text-white/50 tracking-wider shrink-0">
              {currentVariant.num}/0{totalVariants}
            </span>
            <span className="text-white/25 shrink-0">·</span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-white truncate max-w-[110px] xs:max-w-none">
              {currentVariant.title}
            </span>
          </div>

          {/* Direct Selection Progress Dots */}
          <div className="hidden sm:flex items-center gap-1 px-1 shrink-0" role="tablist" aria-label="Select hero variant">
            {HERO_VARIANTS.map((variant, idx) => (
              <button
                key={variant.id}
                role="tab"
                type="button"
                onClick={() => handleJump(idx)}
                aria-label={`Switch to layout ${variant.num}: ${variant.title}`}
                aria-selected={idx === activeIndex}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer touch-manipulation ${idx === activeIndex
                    ? "w-4 bg-teal-400 shadow-xs"
                    : "w-1.5 bg-white/30 hover:bg-white/60"
                  }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next layout"
            className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer touch-manipulation shrink-0"
          >
            <ArrowRight01Icon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
