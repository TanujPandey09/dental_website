"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TemplatePillSwitcher, TemplateVariantOption } from "@/components/ui/TemplatePillSwitcher";
import { DoctorsLumaView } from "@/components/doctors/templates/DoctorsLumaView";
import { DoctorsDentixView } from "@/components/doctors/templates/DoctorsDentixView";

export type DoctorView = "luma" | "dentix";

const DOCTOR_VARIANTS: TemplateVariantOption[] = [
  { id: "luma", title: "Luma Clinicians", num: "01" },
  { id: "dentix", title: "Dentix Team", num: "02" },
];

export function DoctorsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const param = searchParams.get("view");
  const currentView: DoctorView = DOCTOR_VARIANTS.some((v) => v.id === param)
    ? (param as DoctorView)
    : "luma";

  const handleViewChange = (newView: DoctorView) => {
    const target = newView === "luma" ? "/doctors" : `/doctors?view=${newView}`;
    router.replace(target, { scroll: false });
  };

  return (
    <section className="bg-background pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-20">
      <div className="shell">
        {/* Prominent Template Switcher Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3.5 px-4 rounded-2xl bg-card border border-border/80 shadow-xs mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Doctor Layout Template:
            </span>
            <span className="text-xs font-bold text-foreground">
              {currentView === "luma" ? "01 Luma Clinicians" : "02 Dentix Team"}
            </span>
          </div>

          <TemplatePillSwitcher
            label="DOCTORS"
            variants={DOCTOR_VARIANTS}
            activeId={currentView}
            onSelect={(id) => handleViewChange(id as DoctorView)}
            isDarkTheme={false}
          />
        </div>

        {/* Dynamic Template Switcher with Smooth Transition */}
        <AnimatePresence mode="wait">
          {currentView === "luma" && (
            <motion.div
              key="luma"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            >
              <DoctorsLumaView />
            </motion.div>
          )}

          {currentView === "dentix" && (
            <motion.div
              key="dentix"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            >
              <DoctorsDentixView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
