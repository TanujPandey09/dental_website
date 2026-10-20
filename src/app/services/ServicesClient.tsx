"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon } from "hugeicons-react";
import { ServicesGrid } from "@/components/services/templates/ServicesGrid";
import { ServicesList } from "@/components/services/templates/ServicesList";
import { ServicesBento } from "@/components/services/templates/ServicesBento";
import { TemplatePillSwitcher, TemplateVariantOption } from "@/components/ui/TemplatePillSwitcher";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";

export type ServicesView = "grid" | "list" | "bento";

const allServices = siteConfig.services;

const categories = ["All", "Cosmetic", "Restorative", "Orthodontics", "Preventive"];

const VIEW_OPTIONS: TemplateVariantOption[] = [
  { id: "grid", title: "Visual Cards", num: "01" },
  { id: "list", title: "Directory", num: "02" },
  { id: "bento", title: "Bento Architecture", num: "03" },
];

function ServicesClientContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");

  const param = searchParams.get("view");
  const viewStyle: ServicesView = VIEW_OPTIONS.some((o) => o.id === param)
    ? (param as ServicesView)
    : "grid";

  const handleViewChange = (v: ServicesView) => {
    const url = new URL(window.location.href);
    if (v === "grid") {
      url.searchParams.delete("view");
    } else {
      url.searchParams.set("view", v);
    }
    window.history.pushState({}, "", url.toString());
  };

  const filteredServices = activeCategory === "All"
    ? allServices
    : allServices.filter((service) => {
        if (activeCategory === "Cosmetic") return service.category === "Cosmetic";
        if (activeCategory === "Restorative") return service.category === "Restorative";
        if (activeCategory === "Orthodontics") return service.id === "orthodontics";
        if (activeCategory === "Preventive") return service.category === "General" || service.id === "general-dentistry";
        return service.category === activeCategory;
      });

  return (
    <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 bg-[#FAFAFA] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Top Control Bar: Eyebrow Badge left, Floating Template Switcher right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold bg-teal-50 text-teal-800 border border-teal-200/60 font-sans w-fit">
            <SparklesIcon className="w-3.5 h-3.5 text-teal-600" />
            Clinical Care
          </span>

          {siteConfig.ui.showTemplateSwitchers && (
            <TemplatePillSwitcher
              label="SERVICES"
              variants={VIEW_OPTIONS}
              activeId={viewStyle}
              onSelect={(id) => handleViewChange(id as ServicesView)}
              isDarkTheme={false}
            />
          )}
        </div>

        {/* Editorial Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-6 sm:pb-8 border-b border-slate-200">
          {/* Left Title & Subtitle */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-slate-900 tracking-tight leading-[1.12]">
              Treatment, <br />
              <span className="italic text-teal-700 font-serif">thought through.</span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5 max-w-xl">
              Six core areas of care, each starting with an assessment and a conversation. Explore the approach, the process, and what a consultation can tell you.
            </p>
          </div>

          {/* Right Clinical Disclaimer Card */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-3">
                Treatment suitability is individual. Nothing on this page is a diagnosis or guarantee, or a substitute for clinical assessment.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 text-[10px] font-mono text-teal-700 font-semibold tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                  IN-PERSON ASSESSMENT
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                  CLEAR WRITTEN PLAN
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Visible for all views to match reference screenshots) */}
        <div className="flex flex-wrap gap-2 py-4 sm:py-5">
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={cn(
                  "px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm",
                  active
                    ? "bg-slate-900 text-white shadow-slate-900/10"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-900 hover:text-slate-900"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Dynamic Template Switcher */}
        <div>
          <AnimatePresence mode="wait">
            {viewStyle === "grid" && (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ServicesGrid services={filteredServices} />
              </motion.div>
            )}

            {viewStyle === "list" && (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ServicesList services={filteredServices} />
              </motion.div>
            )}

            {viewStyle === "bento" && (
              <motion.div
                key="bento"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ServicesBento services={allServices} activeCategory={activeCategory} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

export function ServicesClient() {
  return (
    <Suspense fallback={<div className="min-h-screen py-24 flex items-center justify-center">Loading services...</div>}>
      <ServicesClientContent />
    </Suspense>
  );
}
