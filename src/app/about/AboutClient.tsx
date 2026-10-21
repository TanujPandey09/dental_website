"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
    title: "A Decade of Patient-Centered Care",
    subtitle: "From a boutique two-chair founding practice in 2011 to a premier multi-specialty dental destination caring for thousands of patients.",
  },
};

function AboutClientContent() {
  const searchParams = useSearchParams();

  // URL is the single source of truth: supports deep links, refresh and
  // browser back/forward without mirroring state into an effect.
  const param = searchParams.get("view");
  const viewStyle: AboutView = VIEW_OPTIONS.some((o) => o.id === param)
    ? (param as AboutView)
    : "story";

  const handleViewChange = (v: AboutView) => {
    const url = new URL(window.location.href);
    if (v === "story") {
      url.searchParams.delete("view");
    } else {
      url.searchParams.set("view", v);
    }
    window.history.pushState({}, "", url.toString());
  };

  const currentHero = ABOUT_HERO_CONTENT[viewStyle];

  return (
    <>
      <PageHero
        badge={currentHero.badge}
        title={currentHero.title}
        subtitle={currentHero.subtitle}
        trustItems={["Founded 2011 · Manhattan", "Patient-Led Clinical Care", "15,000+ Smiles Treated"]}
      />

      <section className="pt-6 pb-16 sm:pt-8 sm:pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Floating Template Pill Switcher — buyer preview control.
              Rendered only when siteConfig.ui.showTemplateSwitchers is true. */}
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <AboutStory />
              </motion.div>
            )}

            {viewStyle === "clinical" && (
              <motion.div
                key="clinical"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <AboutClinical />
              </motion.div>
            )}

            {viewStyle === "timeline" && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
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
