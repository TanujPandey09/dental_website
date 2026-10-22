"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  SparklesIcon,
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
    id: "booking",
    num: "01",
    title: "Booking Split",
    subtitle: "Dual-column layout with instant consultation appointment form",
  },
  {
    id: "specialist",
    num: "02",
    title: "Specialist Split",
    subtitle: "Editorial split showcasing specialist team & clinical pillars",
  },
  {
    id: "cinematic",
    num: "03",
    title: "Cinematic Impact",
    subtitle: "Dark prestige aesthetic with atmospheric photography & metrics",
  },
  {
    id: "immersive",
    num: "04",
    title: "Immersive Suite",
    subtitle: "Full-bleed experiential clinic showcase with video & ambient cues",
  },
  {
    id: "minimal",
    num: "05",
    title: "Minimal Swiss",
    subtitle: "Clean typography-led clinical precision and patient care focus",
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
      {/* Floating Trigger Pill on Mobile — Never blocks headline, neatly positioned bottom-right */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-5 right-4 z-40 sm:hidden pointer-events-auto"
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open template variations preview"
            aria-expanded={isOpen}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-card/95 backdrop-blur-md border border-primary/30 shadow-[0_10px_30px_rgba(30,77,64,0.18)] text-foreground hover:border-primary transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <SparklesIcon className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="text-xs font-mono font-medium tracking-wide">11 Layouts</span>
            <ArrowUp01Icon className="w-3 h-3 text-muted-foreground shrink-0" />
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
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] sm:hidden"
            />

            {/* Bottom Drawer Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed bottom-0 left-0 right-0 max-h-[88vh] bg-card border-t border-border shadow-2xl z-[70] rounded-t-3xl flex flex-col sm:hidden overflow-hidden"
            >
              {/* Drag Pill Handle */}
              <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mt-3 mb-1 shrink-0" />

              {/* Sheet Header */}
              <div className="flex items-start justify-between px-5 pt-2 pb-3 border-b border-border/70 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                      <SparklesIcon className="w-3 h-3 text-accent" />
                      Buyer Preview
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                      11 Layouts
                    </span>
                  </div>
                  <h2 className="font-serif text-lg font-medium text-foreground tracking-tight">
                    Template Variations
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Tap any option to switch page or hero style instantly.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-1 text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted rounded-full transition-colors cursor-pointer"
                  aria-label="Close template variations preview"
                >
                  <Cancel01Icon className="w-5 h-5" />
                </button>
              </div>

              {/* Segmented Section Tabs */}
              <div className="px-5 pt-3 pb-2 shrink-0">
                <div className="grid grid-cols-3 gap-1 p-1 bg-muted/60 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setActiveTab("hero")}
                    className={cn(
                      "py-1.5 text-xs font-mono font-medium rounded-lg transition-all",
                      activeTab === "hero"
                        ? "bg-card text-primary font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
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
                        ? "bg-card text-primary font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
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
                        ? "bg-card text-primary font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    About (3)
                  </button>
                </div>
              </div>

              {/* Variant Items List */}
              <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2.5">
                {activeTab === "hero" && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
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
                            "w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 cursor-pointer",
                            isActive
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-muted/30 border-border/80 text-foreground hover:border-primary/50 hover:bg-muted/60"
                          )}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-primary/10 text-primary"
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
                                "text-xs leading-relaxed",
                                isActive ? "text-white/85" : "text-muted-foreground"
                              )}
                            >
                              {variant.subtitle}
                            </p>
                          </div>

                          <div className="shrink-0 mt-0.5">
                            {isActive ? (
                              <CheckmarkCircle02Icon className="w-5 h-5 text-white" />
                            ) : (
                              <ArrowRight01Icon className="w-4 h-4 text-muted-foreground opacity-60" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {activeTab === "services" && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
                      Services Page · 3 Architectural Views
                    </p>
                    {SERVICES_VARIANTS.map((variant) => {
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => handleSelectPageVariant(variant.href!)}
                          className="w-full text-left p-3.5 rounded-2xl border border-border/80 bg-muted/30 hover:border-primary/50 hover:bg-muted/60 transition-all flex items-start justify-between gap-3 cursor-pointer"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                                {variant.num}
                              </span>
                              <span className="font-serif text-sm font-medium text-foreground tracking-tight">
                                {variant.title}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {variant.subtitle}
                            </p>
                          </div>
                          <ArrowRight01Icon className="w-4 h-4 text-muted-foreground shrink-0 mt-1 opacity-60" />
                        </button>
                      );
                    })}
                  </div>
                )}

                {activeTab === "about" && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
                      About Page · 3 Story & Clinic Views
                    </p>
                    {ABOUT_VARIANTS.map((variant) => {
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => handleSelectPageVariant(variant.href!)}
                          className="w-full text-left p-3.5 rounded-2xl border border-border/80 bg-muted/30 hover:border-primary/50 hover:bg-muted/60 transition-all flex items-start justify-between gap-3 cursor-pointer"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                                {variant.num}
                              </span>
                              <span className="font-serif text-sm font-medium text-foreground tracking-tight">
                                {variant.title}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {variant.subtitle}
                            </p>
                          </div>
                          <ArrowRight01Icon className="w-4 h-4 text-muted-foreground shrink-0 mt-1 opacity-60" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sheet Footer Note */}
              <div className="px-5 py-3 bg-muted/40 border-t border-border/70 shrink-0">
                <p className="text-[11px] text-muted-foreground text-center">
                  Production ready: disable switchers anytime in <code className="font-mono text-[10px] bg-background px-1 py-0.5 rounded border border-border">siteConfig.ui.showTemplateSwitchers</code>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
