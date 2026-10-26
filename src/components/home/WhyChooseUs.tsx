"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckmarkBadge01Icon,
  ArrowRight01Icon,
} from "hugeicons-react";
import siteConfig from "@/config/site";
import { images } from "@/config/images";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const DISTINCTION_SPECS = [
  `${siteConfig.clinic.stats.certifiedDentists} Dedicated Clinicians`,
  "0.05mm Micro-Tolerance",
  "100% Written Ledger",
  "Same-Day Priority Slots",
];
const DISTINCTION_BADGES = ["Faculty-Led", "Diagnostics", "No Hidden Fees", "Urgent Relief"];

const DISTINCTIONS = siteConfig.features.slice(0, 4).map((f, i) => ({
  icon: f.icon,
  badge: DISTINCTION_BADGES[i] || "Clinical Standard",
  title: f.title,
  description: f.description,
  spec: DISTINCTION_SPECS[i] || "Verified Protocol",
}));

export function WhyChooseUs() {
  const container = useRef<HTMLElement>(null);
  const { openBooking } = useBooking();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".distinction-card", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".distinction-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="py-14 sm:py-18 lg:py-20 bg-background relative overflow-hidden border-t border-border/50"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(45%_35%_at_50%_0%,color-mix(in_oklab,var(--primary)_6%,transparent),transparent_75%)]"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Focused Editorial Authority & Compact Operatory Image */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.12] tracking-tight mb-3.5">
                Excellence in <br className="hidden sm:inline" />
                Every Detail.
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md">
                Every dimension of our practice — from private acoustic suites to low-radiation 3D imaging — is engineered around comfort, clinical precision, and lasting results.
              </p>
            </div>

            {/* Compact Luxury Operatory Showcase Card */}
            <div className="w-full p-1.5 rounded-2xl bg-muted/40 border border-border/80 shadow-sm group">
              <div className="relative h-44 sm:h-52 w-full rounded-[calc(1rem-2px)] overflow-hidden bg-muted">
                <Image
                  src={images.clinicInterior}
                  alt={`${siteConfig.clinic.name} Luxury Private Operatory`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <div className="absolute top-2.5 left-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Private Suite 01 · Natural Light
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <p className="text-xs font-semibold drop-shadow-sm">Acoustic Isolation &amp; Clean Air Protocol</p>
                  <p className="text-[10px] text-white/70">Engineered for absolute tranquility during procedures.</p>
                </div>
              </div>
            </div>

            {/* Direct Consultation Trigger */}
            <div className="pt-1">
              <Button
                size="default"
                variant="cta"
                onClick={openBooking}
                className="rounded-full shadow-sm"
              >
                <span>Request Consultation</span>
                <ArrowRight01Icon className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Right Column: 4-Pillar High-Precision Grid (Compact & Legible) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {DISTINCTIONS.map((item, index) => (
              <div
                key={index}
                className="distinction-card p-1.5 rounded-2xl bg-muted/30 border border-border/70 hover:border-primary/40 transition-all duration-300 hover:shadow-md flex flex-col group"
              >
                <div className="rounded-[calc(1rem-2px)] bg-card p-5 sm:p-5 flex flex-col justify-between flex-1 border border-border/50">
                  <div>
                    {/* Header Row: Icon + Pill Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/15">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-heading font-bold text-foreground mb-1.5 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Micro Clinical Spec Highlight */}
                  <div className="pt-3 border-t border-border/60 flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
                    <CheckmarkBadge01Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.spec}</span>
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
