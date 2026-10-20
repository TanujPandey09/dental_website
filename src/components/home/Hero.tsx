"use client";

import { useHeroStyle, HeroStyle } from "@/components/HeroStyleContext";
import { HeroCinematic } from "@/components/home/heroes/HeroCinematic";
import { HeroBookingSplit } from "@/components/home/heroes/HeroBookingSplit";
import { HeroSpecialistSplit } from "@/components/home/heroes/HeroSpecialistSplit";
import { HeroMinimal } from "@/components/home/heroes/HeroMinimal";
import { HeroImmersive } from "@/components/home/heroes/HeroImmersive";
import { TemplatePillSwitcher, TemplateVariantOption } from "@/components/ui/TemplatePillSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import siteConfig from "@/config/site";

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

  const CurrentHero = HERO_COMPONENTS[heroStyle];
  const isDark = DARK_HEROES.includes(heroStyle);

  return (
    <div className="relative">
      {siteConfig.ui.showTemplateSwitchers && (
        <div className="absolute top-20 sm:top-22 right-4 sm:right-8 lg:right-12 z-30 pointer-events-auto">
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
