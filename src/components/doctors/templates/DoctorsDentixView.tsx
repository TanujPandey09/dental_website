"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight01Icon, StarIcon } from "hugeicons-react";
import siteConfig from "@/config/site";
import { images } from "@/config/images";
import { useBooking } from "@/components/BookingContext";

export function DoctorsDentixView() {
  const { openBooking } = useBooking();
  const doctors = siteConfig.doctors;

  const patientAvatars = [
    images.testimonials.patients[1],
    images.testimonials.patients[2],
    images.testimonials.patients[3],
  ];

  return (
    <div className="pb-12 sm:pb-20">
      {/* 1. Dentix Top Hero Banner with Atmospheric Dark Teal Tone */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 lg:p-16 mb-14 sm:mb-18 border border-white/10 shadow-2xl mt-4 sm:mt-6">
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/4 top-0 h-[450px] w-[550px] rounded-full bg-primary/25 blur-[140px]"
        />

        {/* Ambient Background Image with Scrim */}
        <div className="absolute inset-0 z-0 select-none opacity-20">
          <Image
            src={images.heroAveline}
            alt="Dental clinical team"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-emerald-400 font-semibold mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span>Our Dentists</span>
          </div>

          <h1 className="font-sans text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            Meet The Team That Shapes Smiles
          </h1>
        </div>
      </div>

      {/* 2. Main Section Header matching Screenshot 2 */}
      <div className="text-center mb-12 sm:mb-16">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-primary mb-3">
          Our Dentists /
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium tracking-[-0.03em] text-foreground leading-tight">
          Meet The Hands That{" "}
          <span className="inline-block rounded-md bg-primary/20 text-foreground px-2 py-0.5 font-normal">
            Transform Smiles
          </span>
        </h2>
      </div>

      {/* 3. 6 Dentist Cards Grid matching Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mb-16 sm:mb-20">
        {doctors.map((doctor) => (
          <Link
            key={doctor.id}
            href={`/doctors/${doctor.id}`}
            className="rounded-2xl sm:rounded-3xl overflow-hidden bg-card border border-border/80 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Soft Gray Card Image Area */}
            <div className="relative aspect-[4/4.3] overflow-hidden bg-muted/60">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top scale-100 group-hover:scale-104 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Bottom Bar: Name, Role and Circular Arrow Button ↗ */}
            <div className="p-5 sm:p-6 bg-card flex items-center justify-between border-t border-border/60">
              <div className="min-w-0 pr-3">
                <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors truncate">
                  {doctor.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 truncate font-medium">
                  {doctor.role}
                </p>
              </div>

              {/* Circular Action Pill */}
              <div
                aria-hidden="true"
                className="h-9 w-9 rounded-full border border-border bg-background text-foreground/80 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary flex items-center justify-center transition-all duration-200 shrink-0 shadow-xs"
              >
                <ArrowUpRight01Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 4. Bottom Split CTA Banner matching Screenshot 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Left Macro Photo Block */}
        <div className="lg:col-span-4 rounded-3xl overflow-hidden relative min-h-[220px] shadow-md border border-border/60">
          <Image
            src={images.about.details}
            alt="Dental clinical craftsmanship"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Right Solid Green/Primary Card */}
        <div className="lg:col-span-8 rounded-3xl p-8 sm:p-10 lg:p-12 bg-primary text-primary-foreground shadow-lg flex flex-col justify-between">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold leading-tight max-w-xl text-balance">
            We'll give you a reason to smile more. Sign up today.
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 sm:pt-8 border-t border-white/20 mt-6 sm:mt-8">
            {/* Reviews Stack */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {patientAvatars.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-primary bg-muted shrink-0"
                  >
                    <Image
                      src={src}
                      alt="Verified patient"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white">
                    {siteConfig.clinic.stats.rating.toFixed(1)}
                  </span>
                  <div className="flex text-amber-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="w-3 h-3 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-white/80 mt-0.5">
                  Over {siteConfig.clinic.stats.patientsTreated} happy patients
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={openBooking}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-slate-950 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
            >
              <span>Book Online</span>
              <ArrowUpRight01Icon className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
