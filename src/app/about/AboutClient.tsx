"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { AboutStudioSanctuary } from "@/components/about/templates/AboutStudioSanctuary";
import { AboutClinical } from "@/components/about/templates/AboutClinical";
import { AboutTimeline } from "@/components/about/templates/AboutTimeline";
import { PageHero } from "@/components/layout/PageHero";
import { TemplatePillSwitcher, TemplateVariantOption } from "@/components/ui/TemplatePillSwitcher";
import siteConfig from "@/config/site";

export type AboutView = "story" | "clinical" | "timeline";

const VIEW_OPTIONS: TemplateVariantOption[] = [
  { id: "story", title: "Studio Sanctuary", num: "01" },
  { id: "clinical", title: "Clinical Standards", num: "02" },
  { id: "timeline", title: "Practice Timeline", num: "03" },
];

const ABOUT_HERO_CONTENT: Record<AboutView, { badge: string; title: string; subtitle: string }> = {
  story: {
    badge: "About Us",
    title: "A Calm Dental Studio in Austin",
    subtitle: "Healthcare designed around comfort, acoustic quiet, and unhurried clinical excellence.",
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
  const activeOption = VIEW_OPTIONS.find((o) => o.id === viewStyle) || VIEW_OPTIONS[0];

  return (
    <div className="bg-background">
      {/* For clinical & timeline, render the PageHero banner */}
      {viewStyle !== "story" && (
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
      )}

      <section className={viewStyle === "story" ? "pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-20" : "pt-6 pb-16 sm:pt-8 sm:pb-20"}>
        <div className="shell">
          {/* Prominent Template Switcher Control Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3 px-4 rounded-2xl bg-card border border-border/80 shadow-xs mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                About Layout Template:
              </span>
              <span className="text-xs font-bold text-foreground">
                {activeOption.num} {activeOption.title}
              </span>
            </div>

            <TemplatePillSwitcher
              label="ABOUT"
              variants={VIEW_OPTIONS}
              activeId={viewStyle}
              onSelect={(id) => handleViewChange(id as AboutView)}
              isDarkTheme={false}
            />
          </div>

          {/* Dynamic Template Switcher with Smooth Transition */}
          <AnimatePresence mode="wait">
            {viewStyle === "story" && (
              <motion.div
                key="story"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
              >
                <AboutStudioSanctuary />
              </motion.div>
            )}

            {viewStyle === "clinical" && (
              <motion.div
                key="clinical"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
              >
                <AboutClinical />
              </motion.div>
            )}

            {viewStyle === "timeline" && (
              <motion.div
                key="timeline"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
              >
                <AboutTimeline />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

export function AboutClient() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-muted-foreground">Loading About Page...</div>}>
      <AboutClientContent />
    </Suspense>
  );
}
