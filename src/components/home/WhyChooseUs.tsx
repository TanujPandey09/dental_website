"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
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
import { cn } from "@/lib/utils";

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
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion) {
        gsap.set(".distinction-card", { opacity: 1, y: 0, scale: 1 });
        return;
      }
      gsap.fromTo(
        ".distinction-card",
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border/50"
    >
      {/* Ambient gradient blobs */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-primary/4 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/5 w-[600px] h-[350px] bg-accent/4 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Editorial authority + premium image */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <div>
              <span className="text-muted-foreground/80 text-xs sm:text-sm font-medium tracking-tight block mb-2">
                Clinical Excellence /
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.12]">
                Excellence in every{" "}
                <span className="inline-block rounded-md bg-primary/20 text-foreground px-2 py-0.5 font-normal">
                  detail.
                </span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md">
              Every dimension of our practice — from private acoustic suites to
              low-radiation 3D imaging — is engineered around comfort, clinical
              precision, and lasting results.
            </p>

            {/* Premium operatory showcase */}
            <div className="relative w-full shrink-0 group">
              <div className="relative aspect-video rounded-[32px] overflow-hidden bg-muted shadow-2xl border border-border/70">
                <Image
                  src={images.clinicInterior}
                  alt={`${siteConfig.clinic.name} Luxury Private Operatory`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
                  priority={false}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold tracking-wider uppercase shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Private Suite · Natural Light
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h4 className="text-sm font-sans font-medium drop-shadow-sm">Acoustic Isolation &amp; Clean Air</h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Engineered for absolute tranquility during every procedure.
                  </p>
                </div>
              </div>
              {/* Tilt shadow */}
              <div className="absolute -bottom-6 -left-6 w-full h-full rounded-[32px] bg-black/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="pt-2">
              <Button
                size="default"
                variant="cta"
                onClick={openBooking}
                className="rounded-full shadow-[0_8px_24px_color-mix(in_oklch,var(--primary)_25%,transparent)] hover:shadow-[0_12px_32px_color-mix(in_oklch,var(--primary)_35%,transparent)] transition-all duration-300"
              >
                <span>Request Consultation</span>
                <ArrowRight01Icon className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Right: 4-pillar grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {DISTINCTIONS.map((item, index) => {
              const isHovered = hoverIndex === index;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className="distinction-card relative rounded-[24px] p-5 sm:p-6 bg-card border border-border/60 shadow-sm flex flex-col group transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                >
                  {/* Glow accent on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-[24px] padding-[1px] bg-gradient-to-r from-primary to-accent -mask px-0.5 py-0.5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none",
                      isHovered ? "opacity-100" : "opacity-0"
                    )}
                    aria-hidden="true"
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        {item.icon}
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/15">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-serif font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-auto">
                      {item.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-border/50 flex items-center gap-2">
                      <CheckmarkBadge01Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                      <span className="text-[10px] font-mono font-semibold text-foreground/70 truncate">
                        {item.spec}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
