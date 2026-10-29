"use client";

import Image from "next/image";
import Link from "next/link";
import { Location01Icon, ArrowRight01Icon } from "hugeicons-react";
import siteConfig from "@/config/site";
import { useBooking } from "@/components/BookingContext";

export function DoctorsLumaView() {
  const { openBooking } = useBooking();
  const doctors = siteConfig.doctors;

  return (
    <div className="pb-12 sm:pb-20">
      {/* 1. Header Section matching Screenshot 1 */}
      <div className="pt-2 sm:pt-4 pb-12 sm:pb-16 text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-primary font-semibold mb-6 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
          <span>OUR CLINICIANS</span>
        </div>

        {/* Main Headline with Highlighted "people" */}
        <h1 className="font-sans text-4xl sm:text-5xl lg:text-[58px] font-light leading-[1.08] tracking-[-0.03em] text-foreground max-w-3xl mx-auto">
          The{" "}
          <span className="inline-block rounded-xl bg-primary/20 text-foreground px-3 py-0.5 font-normal">
            people
          </span>{" "}
          who'll <br className="hidden sm:inline" />
          actually be in the room.
        </h1>

        {/* Subhead */}
        <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto font-normal">
          Dentists, specialists and hygienists across our Austin clinics. You'll see the
          same person every visit—and every Texas license number here is public and verifiable.
        </p>
      </div>

      {/* 2. Clinicians Grid (3 columns, 2 rows matching Screenshot 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mb-16 sm:mb-20">
        {doctors.map((doctor) => (
          <Link
            key={doctor.id}
            href={`/doctors/${doctor.id}`}
            className="rounded-2xl sm:rounded-3xl overflow-hidden bg-card border border-border/80 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Top Portrait Photo */}
            <div className="relative aspect-[4/4.1] overflow-hidden bg-muted">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top scale-100 group-hover:scale-104 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Bottom Info Card */}
            <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-card">
              <div>
                <h2 className="text-lg sm:text-xl font-heading font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {doctor.name}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
                  {doctor.role}
                </p>
              </div>

              {/* Bottom Divider Row: Location & Texas License Number */}
              <div className="pt-4 mt-5 border-t border-border/60 flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-1.5 truncate pr-2">
                  <Location01Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                  <span className="truncate">{doctor.clinicLocation || "South Congress"}</span>
                </div>
                <span className="shrink-0 text-muted-foreground/80 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                  {doctor.licenseNumber || "DDS · TX LIC. 21844"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 3. Bottom CTA Banner (Luma Style) */}
      <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-primary/10 via-muted/40 to-accent/10 border border-border/70 relative overflow-hidden shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Soft Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-primary/15 rounded-full blur-3xl"
        />

        {/* Left Copy */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/15 text-[10px] font-mono uppercase tracking-widest text-primary font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span>READY WHEN YOU ARE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-foreground tracking-tight leading-tight max-w-lg">
            Your healthiest smile <br className="hidden sm:inline" />
            starts with one easy visit.
          </h2>
        </div>

        {/* Right Action & Reassurance */}
        <div className="relative z-10 flex flex-col sm:items-start lg:items-end">
          <button
            type="button"
            onClick={openBooking}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Book an appointment</span>
            <ArrowRight01Icon className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          <p className="text-xs text-muted-foreground mt-3 max-w-xs leading-relaxed text-left lg:text-right">
            New patients welcome. Most PPO plans accepted, and we'll verify your benefits before you arrive.
          </p>
        </div>
      </div>
    </div>
  );
}
