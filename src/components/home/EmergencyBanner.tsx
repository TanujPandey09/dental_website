"use client";

import { useBooking } from "@/components/BookingContext";
import { ArrowRight01Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import siteConfig from "@/config/site";

export function EmergencyBanner() {
  const { openBooking } = useBooking();

  return (
    <section className="py-4 sm:py-6 bg-emerald-50 border-b border-emerald-100/50">
      <div className="shell">
        <div className="rounded-2xl bg-emerald-500/5 border border-emerald-200 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 shadow-sm">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
              <ArrowRight01Icon className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-emerald-700">
                Dental Emergency?
              </p>
              <p className="text-sm sm:text-base font-semibold text-emerald-900 leading-tight">
                Same-day priority slots available. Call now for immediate relief.
              </p>
            </div>
          </div>
          <Button
            size="default"
            variant="cta"
            onClick={openBooking}
            className="rounded-full text-xs sm:text-sm shadow-xs"
          >
            <span>Book Emergency Visit</span>
            <ArrowRight01Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Button>
          <a
            href={`tel:${siteConfig.contact.emergencyPhone}`}
            className="text-sm sm:text-base font-semibold text-emerald-900 hover:text-emerald-700 transition-colors whitespace-nowrap"
          >
            {siteConfig.contact.emergencyPhone}
          </a>
        </div>
      </div>
    </section>
  );
}
