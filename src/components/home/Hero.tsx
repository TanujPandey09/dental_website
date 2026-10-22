"use client";

import { useState, useEffect } from "react";
import { useHeroStyle, HeroStyle } from "@/components/HeroStyleContext";
import { HeroCinematic } from "@/components/home/heroes/HeroCinematic";
import { HeroBookingSplit } from "@/components/home/heroes/HeroBookingSplit";
import { HeroSpecialistSplit } from "@/components/home/heroes/HeroSpecialistSplit";
import { HeroMinimal } from "@/components/home/heroes/HeroMinimal";
import { HeroImmersive } from "@/components/home/heroes/HeroImmersive";
import { TemplatePillSwitcher, TemplateVariantOption } from "@/components/ui/TemplatePillSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";

const HERO_COMPONENTS = {
  booking: HeroBookingSplit,
  specialist: HeroSpecialistSplit,
  minimal: HeroMinimal,
  immersive: HeroImmersive,
  cinematic: HeroCinematic,
} as const;

const HERO_OPTIONS: TemplateVariantOption[] = [
  { id: "booking", title: "Booking Split", num: "01" },
  { id: "specialist", title: "Specialist Split", num: "02" },
  { id: "cinematic", title: "Cinematic Impact", num: "03" },
  { id: "immersive", title: "Immersive Suite", num: "04" },
  { id: "minimal", title: "Minimal Swiss", num: "05" },
];

const DARK_HEROES: HeroStyle[] = ["cinematic", "specialist", "immersive"];

export function Hero() {
  const { heroStyle, setHeroStyle } = useHeroStyle();
  const [inHeroView, setInHeroView] = useState(true);

  const CurrentHero = HERO_COMPONENTS[heroStyle];
  const isDark = DARK_HEROES.includes(heroStyle);

  useEffect(() => {
    const handleScroll = () => {
      // On mobile, smoothly hide the floating bottom switcher when scrolled past the hero section
      setInHeroView(window.scrollY < 520);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {siteConfig.ui.showTemplateSwitchers && (
        <div
          className={cn(
            "pointer-events-auto transition-all duration-300",
            // Desktop (sm: and up): Elegant top-right floating pill, clear of hero text
            "sm:absolute sm:top-24 sm:right-6 lg:right-12 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:opacity-100 sm:pointer-events-auto",
            // Mobile (< sm): Bottom dock in the thumb zone — NEVER obscures headline, badge, or hero text
            "fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[94vw]",
            inHeroView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none sm:opacity-100 sm:translate-y-0 sm:pointer-events-auto"
          )}
        >
          <TemplatePillSwitcher
            label="HERO"
            variants={HERO_OPTIONS}
            activeId={heroStyle}
            onSelect={(id) => setHeroStyle(id as HeroStyle)}
            isDarkTheme={isDark}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={heroStyle}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <CurrentHero />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
