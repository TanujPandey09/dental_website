"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import siteConfig from "@/config/site";

export function PatientJourney() {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll-linked progress for the connecting rail
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "end 0.55"],
  });
  const railProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.3,
  });
  const progress = reduceMotion ? 1 : railProgress;

  const steps = siteConfig.journey;

  return (
    <section
      className="py-12 sm:py-28 bg-background relative overflow-hidden"
      aria-labelledby="patient-journey-heading"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-32 w-[480px] h-[480px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-20">
          <h2
            id="patient-journey-heading"
            className="text-3xl md:text-5xl font-heading font-bold text-foreground text-balance"
          >
            The Patient Journey
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-base sm:text-lg text-pretty">
            A seamless, step-by-step process designed around your comfort and health.
          </p>
        </div>

        <div ref={container} className="relative max-w-6xl mx-auto">
          {/* Mobile: vertical rail */}
          <div
            aria-hidden="true"
            className="hidden absolute left-[27px] top-7 bottom-7 w-0.5 rounded-full bg-border"
          >
            <motion.div
              style={{ scaleY: progress }}
              className="origin-top w-full h-full rounded-full bg-gradient-to-b from-primary to-accent"
            />
          </div>

          {/* Desktop: horizontal rail */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[27px] left-[10%] right-[10%] h-0.5 rounded-full bg-border"
          >
            <motion.div
              style={{ scaleX: progress }}
              className="origin-left w-full h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>

          <ol className="no-scrollbar relative -mx-4 px-4 pb-2 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:mx-0 sm:px-0 lg:pb-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible">
            {steps.map((step, index) => (
              <motion.li
                key={step.title}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-[78vw] max-w-[300px] shrink-0 snap-start lg:w-auto lg:max-w-none lg:shrink lg:pt-[84px]"
              >
                {/* Step node */}
                <motion.div
                  initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: reduceMotion ? 0 : index * 0.08 + 0.05 }}
                  className="relative mb-3 lg:mb-0 lg:absolute lg:left-1/2 lg:top-0 lg:-translate-x-1/2 flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-4 ring-background"
                >
                  {step.icon}
                </motion.div>

                {/* Card */}
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[0_10px_40px_-14px_rgba(15,23,42,0.08)] transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_60px_-18px_color-mix(in_oklab,var(--primary)_30%,transparent)]">
                  {/* Large watermark number */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 right-4 select-none font-heading text-7xl font-bold leading-none text-primary/[0.07] transition-colors duration-300 group-hover:text-primary/15"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="relative mt-2 mb-2 text-lg sm:text-xl font-heading font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="relative text-muted-foreground leading-relaxed text-[15px]">
                    {step.description}
                  </p>

                  {/* Accent underline on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-full"
                  />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
