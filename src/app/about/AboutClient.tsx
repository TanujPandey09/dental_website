"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { AboutStory } from "@/components/about/templates/AboutStory";
import { AboutClinical } from "@/components/about/templates/AboutClinical";
import { AboutTimeline } from "@/components/about/templates/AboutTimeline";
import { PageHero } from "@/components/layout/PageHero";
import { TemplatePillSwitcher, TemplateVariantOption } from "@/components/ui/TemplatePillSwitcher";
import siteConfig from "@/config/site";

export type AboutView = "story" | "clinical" | "timeline";

const VIEW_OPTIONS: TemplateVariantOption[] = [
  { id: "story", title: "Brand Story", num: "01" },
  { id: "clinical", title: "Clinical Standards", num: "02" },
  { id: "timeline", title: "Practice Timeline", num: "03" },
];

const ABOUT_HERO_CONTENT: Record<AboutView, { badge: string; title: string; subtitle: string }> = {
  story: {
    badge: "Our Story & Philosophy",
    title: "Meet The Experts Behind Your Smile",
    subtitle: "We started with a simple mission: to make visiting the dentist an experience you actually look forward to with warmth, luxury, and empathy.",
  },
  clinical: {
    badge: "Clinical Standards & Safety",
    title: "Precision Healthcare. Uncompromising Safety.",
    subtitle: "Explore our rigorous sterilization standards, continuous air purification, and low-dose digital diagnostic technology.",
  },
  timeline: {
    badge: "Our Heritage & Milestones",
    title: "15 Years of Patient-Centered Care",
    subtitle: "From a boutique founding clinic in 2011 to a premier multi-specialty dental destination caring for thousands of patients.",
  },
};

function AboutClientContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const param = searchParams.get("view");
  const viewStyle: AboutView = VIEW_OPTIONS.some((o) => o.id === param)
    ? (param as AboutView)
    : "story";
  const reduceMotion = useReducedMotion();

  const handleViewChange = (v: AboutView) => {
    const target = v === "story" ? "/about" : `/about?view=${v}`;
    router.replace(target, { scroll: false });
  };

  const currentHero = ABOUT_HERO_CONTENT[viewStyle];

  return (
    <>
      <PageHero
        badge={currentHero.badge}
        title={currentHero.title}
        subtitle={currentHero.subtitle}
        trustItems={[
          `${siteConfig.clinic.stats.yearsExperience}+ Years Clinical Excellence`,
          "Patient-Led Clinical Care",
          `${siteConfig.clinic.stats.patientsTreated} Smiles Treated`,
        ]}
      />

      <section className="pt-6 pb-16 sm:pt-8 sm:pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Floating Template Pill Switcher — buyer preview control */}
          {siteConfig.ui.showTemplateSwitchers && (
            <div className="flex justify-end mb-5 sm:mb-6">
              <TemplatePillSwitcher
                label="ABOUT"
                variants={VIEW_OPTIONS}
                activeId={viewStyle}
                onSelect={(id) => handleViewChange(id as AboutView)}
                isDarkTheme={false}
              />
            </div>
          )}

          {/* Dynamic Template Switcher */}
          <AnimatePresence mode="wait">
            {viewStyle === "story" && (
              <motion.div
                key="story"
                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
              >
                <AboutStory />
              </motion.div>
            )}

            {viewStyle === "clinical" && (
              <motion.div
                key="clinical"
                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
              >
                <AboutClinical />
              </motion.div>
            )}

            {viewStyle === "timeline" && (
              <motion.div
                key="timeline"
                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
              >
                <AboutTimeline />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

export function AboutClient() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading About Page...</div>}>
      <AboutClientContent />
    </Suspense>
  );
}
