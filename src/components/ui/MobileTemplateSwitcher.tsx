"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
} from "hugeicons-react";
import { useHeroStyle, HeroStyle } from "@/components/HeroStyleContext";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";

type SectionTab = "hero" | "services" | "about";

interface VariantItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  href?: string;
}

const HERO_VARIANTS: VariantItem[] = [
  {
    id: "cinematic",
    num: "01",
    title: "Cinematic Film",
    subtitle: "Anamorphic 2.39:1 widescreen aesthetic with ambient reel and film metadata",
  },
  {
    id: "minimal",
    num: "02",
    title: "Minimal Swiss",
    subtitle: "International Typographic Style, hairline grid matrix & CAD/CAM rigor",
  },
  {
    id: "booking",
    num: "03",
    title: "Booking Concierge",
    subtitle: "Live suite availability indicator and instant consultation reservation form",
  },
  {
    id: "specialist",
    num: "04",
    title: "Specialist Editorial",
    subtitle: "Prestige surgeon portrait, board-certified pedigree & clinical authority",
  },
  {
    id: "immersive",
    num: "05",
    title: "Spatial Sanctuary",
    subtitle: "Full-bleed experiential architectural suite with sensory ambient calm",
  },
];

const SERVICES_VARIANTS: VariantItem[] = [
  {
    id: "grid",
    num: "01",
    title: "Visual Cards",
    subtitle: "Card catalogue with procedure filtering and clinical previews",
    href: "/services",
  },
  {
    id: "list",
    num: "02",
    title: "Treatment Directory",
    subtitle: "Numbered index with clinical descriptions & consult guides",
    href: "/services?view=list",
  },
  {
    id: "bento",
    num: "03",
    title: "Bento Architecture",
    subtitle: "Modern high-density editorial Bento grid with visual anchors",
    href: "/services?view=bento",
  },
];

const ABOUT_VARIANTS: VariantItem[] = [
  {
    id: "story",
    num: "01",
    title: "Story & Vision",
    subtitle: "Founder narrative, practice philosophy, and patient ethos",
    href: "/about",
  },
  {
    id: "clinical",
    num: "02",
    title: "Clinical Practice",
    subtitle: "Air filtration, low-dose digital diagnostics & surgical safety",
    href: "/about?view=clinical",
  },
  {
    id: "timeline",
    num: "03",
    title: "Milestone Timeline",
    subtitle: "Interactive 2011–2026 practice evolution and milestones",
    href: "/about?view=timeline",
  },
];

export function MobileTemplateSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SectionTab>("hero");
  const { heroStyle, setHeroStyle } = useHeroStyle();
  const router = useRouter();
  const pathname = usePathname();

  const openWithCurrentTab = () => {
    if (pathname.startsWith("/services")) {
      setActiveTab("services");
    } else if (pathname.startsWith("/about")) {
      setActiveTab("about");
    } else {
      setActiveTab("hero");
    }
    setIsOpen(true);
  };

  // Listen for open-template-switcher event dispatched from Navbar
  useEffect(() => {
    const handleOpen = () => {
      if (pathname.startsWith("/services")) {
        setActiveTab("services");
      } else if (pathname.startsWith("/about")) {
        setActiveTab("about");
      } else {
        setActiveTab("hero");
      }
      setIsOpen(true);
    };
    window.addEventListener("open-template-switcher", handleOpen);
    return () => window.removeEventListener("open-template-switcher", handleOpen);
  }, [pathname]);

  // Close sheet on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Lock body scroll when sheet is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!siteConfig.ui.showTemplateSwitchers) {
    return null;
  }

  const currentServiceView =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("view") || "grid"
      : "grid";

  const currentAboutView =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("view") || "story"
      : "story";

  const handleSelectHero = (id: string) => {
    setHeroStyle(id as HeroStyle);
    setIsOpen(false);
    if (pathname !== "/") {
      router.push(id === "cinematic" ? "/" : `/?hero=${id}`);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSelectPageVariant = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Floating Trigger Pill on Mobile — Clean glass pill */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          className="fixed bottom-5 right-4 z-40 sm:hidden pointer-events-auto"
        >
          <button
            type="button"
            onClick={openWithCurrentTab}
            aria-label="Open template variations preview"
            aria-expanded={isOpen}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 text-white border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Layers01Icon className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="text-xs font-mono font-medium tracking-wide">11 Layouts</span>
            <ArrowUp01Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>
        </motion.div>
      )}

      {/* Slide-Up Bottom Sheet Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] sm:hidden"
            />

            {/* Bottom Drawer Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-h-[82vh] bg-white border-t border-slate-200 shadow-2xl z-[70] rounded-t-3xl flex flex-col sm:hidden overflow-hidden"
            >
              {/* Drag Pill Handle */}
              <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1 shrink-0" />

              {/* Sheet Header */}
              <div className="flex items-center justify-between px-5 pt-2 pb-3.5 border-b border-slate-100 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-teal-700 font-bold">
                      <Layers01Icon className="w-3 h-3 text-teal-600" />
                      PREVIEW
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200/60 text-teal-800 font-semibold">
                      11 Layouts
                    </span>
                  </div>
                  <h2 className="font-serif text-lg font-medium text-slate-900 tracking-tight">
                    Template Variations
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                  aria-label="Close template variations preview"
                >
                  <Cancel01Icon className="w-4 h-4" />
                </button>
              </div>

              {/* Segmented Section Tabs */}
              <div className="px-5 pt-3 pb-2 shrink-0">
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setActiveTab("hero")}
                    className={cn(
                      "py-1.5 text-xs font-mono font-medium rounded-lg transition-all",
                      activeTab === "hero"
                        ? "bg-white text-teal-800 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    Hero (5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("services")}
                    className={cn(
                      "py-1.5 text-xs font-mono font-medium rounded-lg transition-all",
                      activeTab === "services"
                        ? "bg-white text-teal-800 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    Services (3)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("about")}
                    className={cn(
                      "py-1.5 text-xs font-mono font-medium rounded-lg transition-all",
                      activeTab === "about"
                        ? "bg-white text-teal-800 font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    About (3)
                  </button>
                </div>
              </div>

              {/* Variant Items List */}
              <div className="flex-1 overflow-y-auto px-5 py-2.5 space-y-2 no-scrollbar">
                {activeTab === "hero" && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Home Page · 5 Hero Layouts
                    </p>
                    {HERO_VARIANTS.map((variant) => {
                      const isActive = heroStyle === variant.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => handleSelectHero(variant.id)}
                          className={cn(
                            "w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer",
                            isActive
                              ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                              : "bg-slate-50/80 border-slate-200/90 text-slate-800 hover:border-teal-600/40 hover:bg-slate-100"
                          )}
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-teal-50 text-teal-800 border border-teal-200/60"
                                )}
                              >
                                {variant.num}
                              </span>
                              <span className="font-serif text-sm font-medium tracking-tight">
                                {variant.title}
                              </span>
                            </div>
                            <p
                              className={cn(
                                "text-xs leading-relaxed line-clamp-1",
                                isActive ? "text-white/85" : "text-slate-500"
                              )}
                            >
                              {variant.subtitle}
                            </p>
                          </div>

                          <div className="shrink-0 mt-0.5">
                            {isActive ? (
                              <CheckmarkCircle02Icon className="w-5 h-5 text-white" />
                            ) : (
                              <ArrowRight01Icon className="w-4 h-4 text-slate-400 opacity-60" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {activeTab === "services" && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Services Page · 3 Architectural Views
                    </p>
                    {SERVICES_VARIANTS.map((variant) => {
                      const isActive = pathname.startsWith("/services") && currentServiceView === variant.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => handleSelectPageVariant(variant.href!)}
                          className={cn(
                            "w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer",
                            isActive
                              ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                              : "bg-slate-50/80 border-slate-200/90 text-slate-800 hover:border-teal-600/40 hover:bg-slate-100"
                          )}
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-teal-50 text-teal-800 border border-teal-200/60"
                                )}
                              >
                                {variant.num}
                              </span>
                              <span className="font-serif text-sm font-medium tracking-tight">
                                {variant.title}
                              </span>
                            </div>
                            <p
                              className={cn(
                                "text-xs leading-relaxed line-clamp-1",
                                isActive ? "text-white/85" : "text-slate-500"
                              )}
                            >
                              {variant.subtitle}
                            </p>
                          </div>
                          <div className="shrink-0 mt-0.5">
                            {isActive ? (
                              <CheckmarkCircle02Icon className="w-5 h-5 text-white" />
                            ) : (
                              <ArrowRight01Icon className="w-4 h-4 text-slate-400 opacity-60" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {activeTab === "about" && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      About Page · 3 Story &amp; Clinic Views
                    </p>
                    {ABOUT_VARIANTS.map((variant) => {
                      const isActive = pathname.startsWith("/about") && currentAboutView === variant.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => handleSelectPageVariant(variant.href!)}
                          className={cn(
                            "w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer",
                            isActive
                              ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                              : "bg-slate-50/80 border-slate-200/90 text-slate-800 hover:border-teal-600/40 hover:bg-slate-100"
                          )}
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-teal-50 text-teal-800 border border-teal-200/60"
                                )}
                              >
                                {variant.num}
                              </span>
                              <span className="font-serif text-sm font-medium tracking-tight">
                                {variant.title}
                              </span>
                            </div>
                            <p
                              className={cn(
                                "text-xs leading-relaxed line-clamp-1",
                                isActive ? "text-white/85" : "text-slate-500"
                              )}
                            >
                              {variant.subtitle}
                            </p>
                          </div>
                          <div className="shrink-0 mt-0.5">
                            {isActive ? (
                              <CheckmarkCircle02Icon className="w-5 h-5 text-white" />
                            ) : (
                              <ArrowRight01Icon className="w-4 h-4 text-slate-400 opacity-60" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sheet Footer Note */}
              <div className="px-5 py-3 pb-6 bg-slate-50/80 border-t border-slate-100 shrink-0">
                <p className="text-[11px] text-slate-500 text-center font-mono">
                  11 custom templates · Lumina Dental
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
