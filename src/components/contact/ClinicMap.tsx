"use client";

import siteConfig from "@/config/site";
import { Location01Icon, Call02Icon, ArrowRight01Icon, Clock01Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";

export function ClinicMap() {
  const { address, mapCenter, mapEmbedUrl, phone, hours } = siteConfig.contact;
  const clinicName = siteConfig.clinic.name;

  // Generate dynamic OpenStreetMap embed URL centered on mapCenter coordinates
  const lat = mapCenter?.lat ?? 40.758;
  const lng = mapCenter?.lng ?? -73.9855;
  const delta = 0.008;
  const bbox = `${lng - delta * 1.5}%2C${lat - delta}%2C${lng + delta * 1.5}%2C${lat + delta}`;
  const defaultEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  const embedSrc = mapEmbedUrl || defaultEmbedUrl;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replace(/\n/g, ", "))}`;

  return (
    <section aria-label="Clinic location and directions" className="py-16 sm:py-24 bg-background border-t border-border/40 relative">
      <div className="shell">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-foreground tracking-tight">
              Visit Our {siteConfig.contact.cityArea || "Clinic"} Sanctuary
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open for scheduled consultations</span>
          </div>
        </div>

        {/* Double-Bezel Map Container */}
        <div className="p-1.5 sm:p-2 rounded-3xl bg-muted/40 border border-border/70 shadow-sm relative overflow-hidden">
          <div className="h-[440px] md:h-[520px] w-full rounded-[calc(1.5rem-2px)] sm:rounded-[calc(1.5rem-4px)] overflow-hidden relative">
            <iframe
              title={`${clinicName} location map`}
              src={embedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />

            {/* Floating Clinic Location Card - Double Bezel Glass */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto sm:left-6 sm:top-6 max-w-sm z-10 pointer-events-auto">
              <div className="p-1 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/80 shadow-2xl">
                <div className="rounded-xl bg-card/95 border border-border/60 p-5 md:p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Location01Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-foreground text-base sm:text-lg leading-tight">
                        {clinicName}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mt-1 whitespace-pre-line font-medium">
                        {address}
                      </p>
                    </div>
                  </div>

                  {/* Transit & Parking Badges */}
                  <div className="flex items-center gap-2 flex-wrap text-[11px] font-semibold text-muted-foreground pt-1">
                    <span className="px-2 py-0.5 rounded-full bg-muted border border-border/60">
                      Subway: B/D/F/M
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-muted border border-border/60">
                      Valet Parking
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
                    <Clock01Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                    <span className="truncate">{hours.split("\n")[0]}</span>
                  </div>

                  {/* Action Group */}
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      asChild
                      size="default"
                      variant="cta"
                      className="flex-1"
                    >
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Get directions to ${clinicName} on Google Maps`}
                      >
                        <span className="text-xs sm:text-sm">Get Directions</span>
                        <ArrowRight01Icon className="size-4 transition-transform duration-150 group-hover/button:translate-x-0.5" aria-hidden="true" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="shrink-0"
                    >
                      <a href={`tel:${phone}`} aria-label={`Call ${clinicName} at ${phone}`}>
                        <Call02Icon className="size-4 text-primary" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

