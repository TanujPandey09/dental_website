"use client";

import { useRef } from "react";
import { ArrowRight01Icon, ArrowUpRight01Icon, StarIcon, Location01Icon, Calendar01Icon, SparklesIcon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

export function MeetDentists() {
  const container = useRef<HTMLElement>(null);
  const { openBooking } = useBooking();

  // Show top 4 featured specialists on the landing page for UI consistency with Services
  const doctorLinks = siteConfig.doctors.slice(0, 4).map((doctor) => ({
    ...doctor,
    slug: doctor.id,
  }));

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".doctor-card", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".doctor-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
    <section ref={container} className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 sm:mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
              <SparklesIcon className="w-3.5 h-3.5" />
              Clinical Leadership
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground leading-tight">
              World-Class Specialists.
            </h2>
            <p className="text-muted-foreground mt-3 sm:mt-4 text-base sm:text-lg max-w-xl leading-relaxed">
              Board-certified clinicians across every dental discipline, each dedicated to a focused area of restorative and aesthetic expertise.
            </p>
          </div>

          {/* Header Action */}
          <Button
            asChild
            variant="outline"
            size="lg"
          >
            <Link href="/doctors">
              <span>Meet Entire Team</span>
              <ArrowRight01Icon className="size-4 transition-transform duration-150 group-hover/button:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        {/* Double-Bezel Doctor Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {doctorLinks.map((doctor) => (
            <div
              key={doctor.id}
              className="doctor-card p-1.5 sm:p-2 rounded-3xl bg-muted/40 border border-border/70 shadow-sm flex flex-col group hover:-translate-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] relative"
            >
              <div className="rounded-[calc(1.5rem-2px)] bg-card border border-border/60 overflow-hidden flex flex-col flex-1 hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                <Link
                  href={`/doctors/${doctor.slug}`}
                  aria-label={`View details for ${doctor.name}`}
                  tabIndex={-1}
                  className="absolute inset-0 z-10"
                />

                {/* Portrait Header */}
                <div className="relative h-[270px] md:h-[300px] overflow-hidden bg-muted">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

                  {/* Rating Pill Top-Right */}
                  <div className="absolute top-3.5 right-3.5 backdrop-blur-md bg-white/95 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/20">
                    <StarIcon className="w-3.5 h-3.5 fill-rating text-rating" aria-hidden="true" />
                    <span className="text-xs font-bold text-slate-950">{doctor.rating}</span>
                    <span className="text-[10px] text-muted-foreground font-medium">({doctor.reviews})</span>
                  </div>

                  {/* Sample profile notice if preview */}
                  {siteConfig.ui.showSampleContentNotices && doctor.demo && (
                    <div className="absolute top-3.5 left-3.5 backdrop-blur-md bg-slate-950/70 border border-white/20 text-white px-2.5 py-0.5 rounded-full shadow-sm text-[10px] font-bold">
                      Sample Profile
                    </div>
                  )}

                  {/* Name & Role (Overlaid on bottom of photo) */}
                  <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 text-white">
                    <h3 className="text-lg md:text-xl font-heading font-bold mb-0.5 leading-snug drop-shadow-sm">
                      {doctor.name}
                    </h3>
                    <p className="text-white/85 text-xs sm:text-sm font-medium">{doctor.role}</p>
                  </div>
                </div>

                {/* Info & Spec Section */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Location01Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                        <span className="truncate">{doctor.qualifications}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar01Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                        <span>{doctor.experience} Clinical Practice</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {doctor.specializations.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="text-[10px] font-medium px-2.5 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/15"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 relative z-20 pt-2 border-t border-border/60">
                    <Button
                      size="sm"
                      variant="cta"
                      onClick={() => openBooking()}
                      className="flex-1"
                    >
                      <Calendar01Icon className="size-3.5 shrink-0" aria-hidden="true" />
                      <span>Book</span>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Link href={`/doctors/${doctor.slug}`}>
                        <span>Profile</span>
                        <ArrowUpRight01Icon className="size-3.5 transition-transform duration-150 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}