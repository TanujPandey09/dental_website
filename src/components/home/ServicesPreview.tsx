"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
} from "hugeicons-react";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

interface TreatmentCard {
  id: string;
  titleLine1: string;
  titleLine2: string;
  meta: string;
  image: string;
  href: string;
}

const SIGNATURE_TREATMENTS: TreatmentCard[] = [
  {
    id: "general-dentistry",
    titleLine1: "Check-up",
    titleLine2: "& cleaning",
    meta: "45 min · from $85",
    image: images.services["general-dentistry"],
    href: "/services/general-dentistry",
  },
  {
    id: "teeth-whitening",
    titleLine1: "Teeth",
    titleLine2: "whitening",
    meta: "60 min · from $290",
    image: images.services["teeth-whitening"],
    href: "/services/teeth-whitening",
  },
  {
    id: "orthodontics",
    titleLine1: "Clear",
    titleLine2: "aligners",
    meta: "6-18 months · from $2,900",
    image: images.services["orthodontics"],
    href: "/services/orthodontics",
  },
  {
    id: "dental-implants",
    titleLine1: "Dental",
    titleLine2: "implants",
    meta: "2-3 visits · from $1,800",
    image: images.services["dental-implants"],
    href: "/services/dental-implants",
  },
  {
    id: "cosmetic-dentistry",
    titleLine1: "Cosmetic",
    titleLine2: "veneers",
    meta: "2 visits · from $950",
    image: images.services["cosmetic-dentistry"],
    href: "/services/cosmetic-dentistry",
  },
  {
    id: "root-canal",
    titleLine1: "Root canal",
    titleLine2: "therapy",
    meta: "60 min · from $650",
    image: images.services["root-canal"],
    href: "/services/root-canal",
  },
];

export function ServicesPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 300;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const patientAvatars = [
    images.testimonials.patients[1],
    images.testimonials.patients[2],
    images.testimonials.patients[3],
  ];

  return (
    <section className="py-16 sm:py-24 bg-background border-t border-border/40 overflow-hidden">
      <div className="shell">
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <span className="text-muted-foreground/80 text-sm font-medium tracking-tight">
              Treatments /
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.12] mt-1 text-balance">
              Discover our signature <br className="hidden sm:inline" />
              dental treatments
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg lg:ml-auto">
              Every treatment starts with a digital check-up and a written plan
              with costs up front. Our studio is calm and quiet, designed to
              make every visit feel unhurried.
            </p>
          </div>
        </div>

        {/* Content Body: Left Social/Nav block + Right Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Avatars, Rating, Copy & Arrow Controls */}
          <div className="lg:col-span-3 flex flex-col justify-between py-1">
            <div>
              {/* Overlapping Patient Avatars + 750+ Reviews */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {patientAvatars.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-background bg-muted shrink-0 shadow-xs"
                    >
                      <Image
                        src={src}
                        alt="Patient review"
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="leading-tight">
                  <p className="text-base font-bold text-foreground">
                    {siteConfig.clinic.stats.patientsTreated || "750+"}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    Five-star reviews
                  </p>
                </div>
              </div>

              {/* Persuasive Subtext */}
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mt-6 max-w-[260px]">
                Patients describe their visits as comfortable and clearly
                explained. Swipe through what we do most often.
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2.5 mt-8 sm:mt-10">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous treatments"
                className="h-11 w-11 rounded-full border border-border/80 bg-background text-foreground/80 hover:bg-muted/80 hover:text-foreground flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft01Icon className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next treatments"
                className="h-11 w-11 rounded-full bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowRight01Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Column: Horizontal Scrollable Cards */}
          <div className="lg:col-span-9 min-w-0">
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 -mx-5 px-5 sm:mx-0 sm:px-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {SIGNATURE_TREATMENTS.map((treatment) => (
                <Link
                  key={treatment.id}
                  href={treatment.href}
                  className="group relative w-[240px] sm:w-[260px] md:w-[275px] h-[370px] sm:h-[400px] shrink-0 snap-start rounded-[26px] overflow-hidden bg-slate-900 border border-border/40 shadow-xs hover:shadow-xl transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {/* Full-bleed photo with zoom on card hover */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={treatment.image}
                      alt={`${treatment.titleLine1} ${treatment.titleLine2}`}
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 260px, 275px"
                      className="object-cover scale-100 group-hover:scale-106 transition-transform duration-700 ease-out"
                    />
                    {/* Editorial photo scrim gradient for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                  </div>

                  {/* Bottom Text & Icon Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex items-end justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Meta badge: duration and transparent pricing */}
                      <p className="font-mono text-[11px] sm:text-xs text-white/80 tracking-wide font-normal mb-1.5">
                        {treatment.meta}
                      </p>
                      {/* Treatment Title on 2 lines */}
                      <h3 className="text-lg sm:text-xl font-sans font-medium text-white tracking-tight leading-[1.2] group-hover:text-primary-foreground transition-colors">
                        {treatment.titleLine1}
                        <br />
                        {treatment.titleLine2}
                      </h3>
                    </div>

                    {/* Circular Translucent Arrow Up-Right Action Pill */}
                    <div
                      aria-hidden="true"
                      className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground shadow-sm"
                    >
                      <ArrowUpRight01Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
