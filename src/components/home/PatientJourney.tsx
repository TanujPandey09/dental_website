"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight01Icon, Calendar01Icon, SparklesIcon } from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";

// Custom tailored SVG icons matching the reference screenshot precisely
function StageIcon({ index, className }: { index: number; className?: string }) {
  if (index === 0) {
    return <Calendar01Icon className={cn("w-5 h-5", className)} />;
  }
  if (index === 1) {
    return (
      <svg className={cn("w-5 h-5", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg className={cn("w-5 h-5", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg className={cn("w-5 h-5", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    );
  }
  return (
    <svg className={cn("w-5 h-5", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function PatientJourney() {
  const { openBooking } = useBooking();
  const [activeStep, setActiveStep] = useState(0);

  const steps = siteConfig.journey;

  return (
    <section
      className="py-20 sm:py-28 lg:py-32 bg-[#07142A] text-white relative overflow-hidden"
      aria-labelledby="patient-journey-heading"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-10 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Row: Left Eyebrow & Title, Right Editorial Subtext */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-12 sm:pb-16 border-b border-white/10">
          <div className="max-w-2xl">
            {/* The Patient Journey Eyebrow Badge */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold bg-accent/15 text-accent border border-accent/25 mb-4">
              <SparklesIcon className="w-3.5 h-3.5 text-accent" />
              The Patient Journey
            </span>

            {/* From first question to aftercare. */}
            <h2
              id="patient-journey-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight leading-[1.15]"
            >
              From first question{" "}
              <span className="italic text-accent font-serif">to aftercare.</span>
            </h2>
          </div>

          {/* Right Subtext */}
          <div className="lg:max-w-md">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Five clear stages, designed to remove uncertainty without hiding the clinical detail
              <span className="text-amber-500 font-bold ml-0.5">.</span>
            </p>
          </div>
        </div>

        {/* Desktop 5-Column Timeline with Stepper Line Starting Directly from Each Step */}
        <div className="hidden md:block relative pt-12 lg:pt-16">
          <div className="grid grid-cols-5 gap-6 lg:gap-8 relative z-10">
            {steps.map((step, index) => {
              const isFilled = index <= activeStep;
              const isCurrent = index === activeStep;

              return (
                <div
                  key={step.title}
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  tabIndex={0}
                  className="group relative flex flex-col justify-between focus:outline-none cursor-pointer p-1 rounded-xl"
                >
                  <div>
                    {/* Node Circle & Stepper Line that starts directly from this circle */}
                    <div className="relative flex items-center mb-6">
                      <motion.div
                        animate={{
                          scale: isCurrent ? 1.08 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 z-10 relative ring-4 ring-[#07142A]",
                          isFilled
                            ? "bg-primary text-primary-foreground shadow-lg shadow-emerald-950/30"
                            : "bg-card text-foreground shadow-sm group-hover:ring-primary/40"
                        )}
                      >
                        <StageIcon
                          index={index}
                          className={isFilled ? "text-white" : "text-slate-800"}
                        />
                      </motion.div>

                      {/* Stepper line: Starts directly from the right edge of this circle (left-12) to the next circle */}
                      {index < steps.length - 1 && (
                        <div
                          className="hidden md:block absolute left-12 right-[-1.5rem] lg:right-[-2rem] top-1/2 -translate-y-1/2 h-[2px] bg-white/15 pointer-events-none"
                          aria-hidden="true"
                        >
                          <div
                            className={cn(
                              "h-full bg-accent shadow-[0_0_10px_rgba(196,130,63,0.5)] transition-all duration-300 ease-out",
                              index < activeStep
                                ? "w-full"
                                : index === 0 && activeStep === 0
                                  ? "w-10 sm:w-14"
                                  : "w-0"
                            )}
                          />
                        </div>
                      )}
                    </div>

                    {/* Step Title */}
                    <h3
                      className={cn(
                        "font-serif text-lg lg:text-xl font-medium tracking-tight mt-1 mb-2.5 transition-colors duration-200",
                        isCurrent ? "text-white" : "text-white/85 group-hover:text-white"
                      )}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Micro-footnote / Tag at bottom */}
                  {step.note && (
                    <span className="text-[11px] text-slate-500 font-mono tracking-wider uppercase mt-6 block">
                      {step.note}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Sequence with Animated Height Rail */}
        <div className="md:hidden pt-8">
          <div className="relative space-y-8">
            {/* Vertical background rail */}
            <div
              className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-white/15 pointer-events-none"
              aria-hidden="true"
            >
              {/* Active animated vertical fill */}
              <div
                className="w-full bg-accent shadow-[0_0_10px_rgba(196,130,63,0.5)] transition-[height] duration-300 ease-out"
                style={{
                  height: activeStep === 0 ? "24px" : `${(activeStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            {steps.map((step, index) => {
              const isFilled = index <= activeStep;
              return (
                <div
                  key={step.title}
                  onClick={() => setActiveStep(index)}
                  className="relative pl-12 group cursor-pointer"
                >
                  {/* Floating Circle centered on the vertical rail (left: 0, w: 32px -> center at 16px) */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm z-10 ring-4 ring-[#07142A]",
                      isFilled
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-card text-foreground"
                    )}
                  >
                    <StageIcon
                      index={index}
                      className={cn("w-4 h-4", isFilled ? "text-white" : "text-slate-800")}
                    />
                  </div>

                  {/* Step Info */}
                  <h3 className="font-serif text-lg font-medium text-white tracking-tight mt-0.5 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {step.description}
                  </p>
                  {step.note && (
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mt-2.5 block">
                      {step.note}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Helper Note & White CTA Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 mt-16 sm:mt-20 pt-8 border-t border-white/10">


          <button
            type="button"
            onClick={openBooking}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#07142A] hover:bg-slate-100 font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <span>Start with a request</span>
            <ArrowRight01Icon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
