"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SparklesIcon, CheckmarkBadge01Icon } from "hugeicons-react";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

gsap.registerPlugin(ScrollTrigger);

const FEATURE_SPECS = [
  "Board-Certified Specialists",
  "Sub-Millimeter 3D CBCT Scans",
  "100% Upfront Written Quotes",
  "Same-Day Reserved Slots",
  "Acoustic Noise-Canceling Suites",
  "Full Clinical Warranty",
];

export function WhyChooseUs() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".feature-card", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="py-16 sm:py-24 bg-background relative overflow-x-clip">
      {/* Soft Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Sticky Left Content */}
          <div className="lg:w-1/2 lg:sticky lg:top-32 space-y-6 lg:space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
                <SparklesIcon className="w-3.5 h-3.5" />
                Clinical Distinctions
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
                Excellence in <br className="hidden sm:inline" />
                Every Detail.
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg">
                Every part of your visit — from the calm room you wait in to the hands that treat you — is engineered around comfort, clinical precision, and lasting results.
              </p>
            </div>

            {/* Double-Bezel Architectural Image Showcase */}
            <div className="p-2 rounded-[2.5rem] bg-muted/40 border border-border/80 shadow-md hidden lg:block group">
              <div className="relative h-[420px] rounded-[calc(2.5rem-0.5rem)] overflow-hidden">
                <Image
                  src={images.clinicInterior}
                  alt="Lumina Dental Modern Clinic Operatory"
                  fill
                  sizes="50vw"
                  className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-card/85 p-5 rounded-2xl border border-border/60 text-card-foreground shadow-lg">
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
                    <CheckmarkBadge01Icon className="w-4 h-4" />
                    <span>State of the Art Facility</span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-foreground mb-1">
                    Designed for Tranquility &amp; Precision
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Operatory suites sound-engineered with private acoustic glass, HEPA-14 medical filtration, and hospital-grade sterilization.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards Grid (Double-Bezel Architecture) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:w-1/2">
            {siteConfig.features.map((feature, index) => (
              <div
                key={index}
                className="feature-card p-1.5 sm:p-2 rounded-3xl bg-muted/40 border border-border/70 shadow-sm flex flex-col group hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                <div className="rounded-[calc(1.5rem-2px)] bg-card p-5 sm:p-6 flex flex-col justify-between flex-1 border border-border/60 hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-heading font-bold text-foreground mb-2 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                  </div>

                  {/* Clean Single-Line Clinical Specification */}
                  <div className="pt-3.5 border-t border-border/60 flex items-center gap-2 text-xs font-semibold text-primary">
                    <CheckmarkBadge01Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                    <span className="truncate">{FEATURE_SPECS[index] || "Clinical Standard"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
