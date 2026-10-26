"use client";

import { useRef } from "react";
import { ArrowRight01Icon } from "hugeicons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import siteConfig from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_TAGS: Record<string, string> = {
  "cosmetic-dentistry": "Same-Day CEREC",
  "dental-implants": "Computer-Guided 3D",
  "teeth-whitening": "In-Office Laser",
  orthodontics: "Clear Aligners",
  "general-dentistry": "Ultrasonic Gentle",
  "root-canal": "Precision Rotary",
  "pediatric-dentistry": "Kid-Friendly Care",
  "oral-surgery": "Sedation Options",
};

export function ServicesPreview() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".service-card", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
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

  // Show top 4 flagship services on the landing page for a clean, balanced single row
  const serviceLinks = siteConfig.services.slice(0, 4).map((service) => ({
    ...service,
    slug: service.id,
  }));

  return (
    <section ref={container} className="py-16 sm:py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground leading-tight">
              Advanced Dental Solutions.
            </h2>
            <p className="text-muted-foreground mt-3 sm:mt-4 text-base sm:text-lg max-w-xl leading-relaxed">
              From preventive hygiene to full-mouth reconstruction, delivered by specialists using sub-millimeter digital technology.
            </p>
          </div>

          {/* Header Action */}
          <Button
            asChild
            variant="outline"
            size="lg"
          >
            <Link href="/services">
              <span>View All Services</span>
              <ArrowRight01Icon className="size-4 transition-transform duration-150 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        {/* Double-Bezel Card Showcase: Horizontal Swipe Slider on Mobile, 4-Col Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 no-scrollbar">
          {serviceLinks.map((service) => (
            <div
              key={service.id}
              className="service-card w-[82vw] max-w-[320px] shrink-0 snap-center sm:w-auto sm:max-w-none p-1.5 sm:p-2 rounded-3xl bg-muted/40 border border-border/70 shadow-sm flex flex-col group hover:-translate-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <Link
                href={`/services/${service.slug}`}
                className="relative h-[360px] sm:h-[420px] md:h-[440px] rounded-[calc(1.5rem-2px)] overflow-hidden cursor-pointer shadow-sm flex flex-col justify-end p-5 sm:p-7 block"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {/* Natural Dark Photographic Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                </div>

                {/* Floating Category & Spec Pills */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <div className="backdrop-blur-md bg-white/15 border border-white/20 text-white text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {service.category}
                  </div>
                  <div className="backdrop-blur-md bg-slate-950/60 border border-white/15 text-white/90 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    {SERVICE_TAGS[service.id] || "Advanced Protocol"}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white mb-4 border border-white/20 group-hover:scale-105 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 leading-snug drop-shadow-sm">
                    {service.title}
                  </h3>

                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 font-normal">
                    {service.description}
                  </p>

                  {/* Trailing Action */}
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-emerald-300 transition-colors pt-2">
                    <span>Explore Treatment</span>
                    <span className="w-6 h-6 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300 group-hover:bg-emerald-400 group-hover:text-slate-950 group-hover:border-emerald-400">
                      <ArrowRight01Icon className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-6" aria-hidden="true" />
                      <ArrowRight01Icon className="w-3.5 h-3.5 absolute -translate-x-6 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                {/* Focus/Hover Outer Highlight */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-[calc(1.5rem-2px)] transition-colors duration-300 pointer-events-none" />
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-3 text-[11px] font-medium text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>Swipe to explore all flagship services →</span>
        </div>
      </div>
    </section>
  );
}
