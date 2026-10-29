"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import siteConfig from "@/config/site";

/**
 * High-End Studio Screen Loader & Page Transition Curtain
 * Inspired by Aveline Framer Template (aveline-visuvate.framer.website)
 *
 * 1. First Visit Screen Loader:
 *    - Fullscreen architectural curtain in deep studio obsidian (#0A1417)
 *    - Ambient radial lighting matching clinic primary palette (#0F766E)
 *    - Animated clinic logo entrance with gentle glow
 *    - Real-time digital progress counter (0 -> 100%) with clinical status milestones
 *    - Smooth theatrical curtain reveal sliding UP with cubic-bezier(0.87, 0, 0.13, 1)
 *
 * 2. Page Navigation Transitions:
 *    - Triggers on route changes (pathname updates)
 *    - Sleek vertical curtain wipe with centered brand emblem
 *    - Ultra-fast, responsive, and silk-smooth (450ms total)
 */
export function ScreenLoader() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Calibrating 3D diagnostic suite...");
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const reduceMotion = useReducedMotion();
  const hasMounted = useRef(false);

  // 1. Initial First-Visit Screen Loader
  useEffect(() => {
    // If reduced motion is preferred, dismiss immediately
    if (reduceMotion) {
      setInitialLoading(false);
      return;
    }

    // Check if the user has already seen the initial loader in this session
    const hasSeenLoader = sessionStorage.getItem("lumina_screen_loader_seen");
    if (hasSeenLoader) {
      setInitialLoading(false);
      return;
    }

    // Lock body scroll while initial preloader is active
    document.body.style.overflow = "hidden";

    // Progress counter animation from 0% to 100%
    const duration = 1500; // 1.5 seconds for refined luxury pace
    const startTime = performance.now();

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth ease-out quad curve for natural feel
      const easedProgress = Math.floor(rawProgress * 100);
      setProgress(easedProgress);

      if (easedProgress < 35) {
        setStatusText("Calibrating 3D diagnostic suite...");
      } else if (easedProgress < 70) {
        setStatusText("Sanitizing operatory air (HEPA-14)...");
      } else if (easedProgress < 95) {
        setStatusText("Preparing private acoustic suite...");
      } else {
        setStatusText("Studio ready. Welcome to Lumina.");
      }

      if (rawProgress < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        // Hold briefly at 100% before sliding curtain up
        setTimeout(() => {
          setInitialLoading(false);
          document.body.style.overflow = "";
          sessionStorage.setItem("lumina_screen_loader_seen", "true");
        }, 220);
      }
    };

    const frameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  // 2. Page Navigation Curtain Transition
  useEffect(() => {
    // Skip on initial mount
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    // Detect actual pathname change
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;

      if (!reduceMotion) {
        setIsNavigating(true);
        const timer = setTimeout(() => {
          setIsNavigating(false);
        }, 550);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, reduceMotion]);

  return (
    <>
      {/* =====================================================================
          1. FIRST-VISIT CINEMATIC SCREEN LOADER
         ===================================================================== */}
      <AnimatePresence mode="wait">
        {initialLoading && (
          <motion.div
            key="initial-screen-loader"
            initial={{ y: 0 }}
            exit={{
              y: "-100%",
              transition: {
                duration: 0.85,
                ease: [0.87, 0, 0.13, 1], // Exact Framer / Aveline bezier
              },
            }}
            className="fixed inset-0 z-[9999] bg-[#0A1417] text-white flex flex-col justify-between p-6 sm:p-12 lg:p-16 select-none overflow-hidden"
            aria-live="polite"
            aria-busy={initialLoading}
          >
            {/* Ambient Radial Lighting in Center */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(15, 118, 110, 0.22) 0%, rgba(10, 20, 23, 0.95) 65%, #0A1417 100%)",
              }}
            />

            {/* Subtle Grid Accent Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

            {/* Top Bar: Clinic Location & Status */}
            <div className="relative z-10 flex items-center justify-between text-[11px] sm:text-xs font-mono tracking-wider uppercase text-white/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>{siteConfig.clinic.name}</span>
              </div>
              <div className="hidden sm:block text-white/40">
                AUSTIN FLAGSHIP STUDIO · EST. 2011
              </div>
            </div>

            {/* Center Display: Logo + Tagline */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
              {/* Logo Emblem Container with Gentle Glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative mb-6"
              >
                <div className="absolute -inset-4 rounded-full bg-teal-500/20 blur-xl pointer-events-none" />
                <div className="relative w-44 sm:w-56 h-12 sm:h-14 flex items-center justify-center">
                  <Image
                    src={siteConfig.clinic.logoLight}
                    alt={siteConfig.clinic.name}
                    width={220}
                    height={72}
                    className="w-auto h-10 sm:h-12 brightness-0 invert object-contain"
                    priority
                  />
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-xs sm:text-sm font-sans tracking-wide text-white/70 max-w-xs sm:max-w-sm leading-relaxed"
              >
                Modern dentistry with a gentle touch.
              </motion.p>
            </div>

            {/* Bottom Bar: Percentage Counter & Progress Line */}
            <div className="relative z-10 max-w-xl mx-auto w-full">
              <div className="flex items-end justify-between mb-3 text-xs font-mono text-white/70">
                <span className="text-[11px] sm:text-xs tracking-wider text-teal-400">
                  {statusText}
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
                  {progress}
                  <span className="text-teal-400 text-sm font-normal">%</span>
                </span>
              </div>

              {/* Progress Line Track */}
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-300 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>ACOUSTIC SANCTUARY</span>
                <span>SUB-MILLIMETER PRECISION</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          2. PAGE ROUTE NAVIGATION TRANSITION CURTAIN
          Runs on page change like Framer templates
         ===================================================================== */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            key="page-transition-curtain"
            initial={{ y: "100%" }}
            animate={{
              y: "0%",
              transition: {
                duration: 0.35,
                ease: [0.87, 0, 0.13, 1],
              },
            }}
            exit={{
              y: "-100%",
              transition: {
                duration: 0.4,
                ease: [0.87, 0, 0.13, 1],
                delay: 0.05,
              },
            }}
            className="fixed inset-0 z-[9998] bg-[#0A1417] text-white flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            {/* Center Logo Flash during page wipe */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center shadow-lg">
                <span className="text-teal-400 font-bold text-lg font-mono">✦</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/70">
                {siteConfig.clinic.name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
