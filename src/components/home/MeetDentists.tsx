"use client";

import { useRef } from "react";
import { ArrowRight01Icon, StarIcon, Location01Icon, Calendar01Icon } from "hugeicons-react";
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

  const doctorLinks = siteConfig.doctors.map((doctor) => ({
    ...doctor,
    slug: doctor.id,
  }));

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(".doctor-card", { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(".doctor-card",
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
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-12 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6 mb-6 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
              World-Class Specialists
            </h2>
            <p className="text-muted-foreground mt-3 sm:mt-4 text-base sm:text-lg max-w-xl">
              Board-certified clinicians across every dental discipline, each focused on a single area of expertise.
            </p>
          </div>
          <Link
            href="/doctors"
            className="group inline-flex items-center justify-center h-12 px-6 rounded-full border border-border bg-card hover:border-primary hover:bg-primary hover:text-primary-foreground transition-[color,background-color,border-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-medium text-primary"
          >
            Meet Entire Team
            <ArrowRight01Icon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="no-scrollbar -mx-4 px-4 pb-2 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible">
          {doctorLinks.map((doctor) => (
            <div
              key={doctor.id}
              className="doctor-card group w-[80vw] max-w-[320px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink bg-background rounded-3xl overflow-hidden border border-border/50 hover:shadow-2xl hover:border-primary/30 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] relative"
            >
              <Link
                href={`/doctors/${doctor.slug}`}
                aria-label={`View details for ${doctor.name}`}
                tabIndex={-1}
                className="absolute inset-0 z-10"
              />
              {/* Image Container */}
              <div className="relative h-[260px] md:h-[360px] overflow-hidden">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-60" />

                {/* Floating Rating */}
                <div className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <StarIcon className="w-4 h-4 fill-rating text-rating" aria-hidden="true" />
                  <span className="text-sm font-bold text-primary">{doctor.rating}</span>
                  <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                </div>

                {/* Name & Role (Always visible) */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-heading font-bold mb-1">{doctor.name}</h3>
                  <p className="text-white/80 font-medium">{doctor.role}</p>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-4 md:p-6 bg-card border-t border-border flex flex-col">
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Location01Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span>{doctor.qualifications}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar01Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span>{doctor.experience}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {doctor.specializations.map((spec) => (
                    <span key={spec} className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 relative z-20 mt-auto">
                  <Button asChild variant="outline" className="flex-1 h-11 border-primary text-primary hover:bg-primary/5 bg-card">
                    <Link href={`/doctors/${doctor.slug}`}>View Details</Link>
                  </Button>
                  <Button className="flex-1 h-11 shadow-md shadow-primary/20" onClick={() => openBooking()}>
                    Book
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}