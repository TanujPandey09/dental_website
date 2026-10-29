"use client";

import siteConfig from "@/config/site";

export function TrustBar() {
  const rating = siteConfig.clinic.stats.rating;
  const years = siteConfig.clinic.stats.yearsExperience;

  return (
    <section className="py-4 sm:py-6 bg-background border-b border-border/50">
      <div className="shell">
        <div className="flex flex-wrap gap-6 sm:gap-8 items-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
              {rating.toFixed(2)}★ Google Rating
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
              {years}+ Years in Practice
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
              Insurance Accepted
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
              Same-Day Appointments
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
