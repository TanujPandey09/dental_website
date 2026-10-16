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
    <section aria-label="Clinic location and directions" className="relative w-full border-y border-border/40 bg-muted overflow-hidden">
      {/* Map Embed Container */}
      <div className="h-[440px] md:h-[500px] w-full relative">
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

        {/* Floating Clinic Location Card */}
        <div className="absolute top-4 left-4 right-4 sm:right-auto sm:left-8 sm:top-8 max-w-sm z-10 pointer-events-auto">
          <div className="bg-white/95 rounded-2xl p-5 md:p-6 shadow-xl border border-border/60 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Location01Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="font-heading font-bold text-foreground text-base leading-tight">
                  {clinicName}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed mt-1 whitespace-pre-line">
                  {address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
              <Clock01Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              <span className="truncate">{hours.split("\n")[0]}</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button asChild size="sm" className="flex-1 bg-primary text-white hover:bg-primary/90 font-bold h-11">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Get directions to ${clinicName} on Google Maps`}
                >
                  Directions
                  <ArrowRight01Icon className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="sm" variant="outline" className="h-11 w-11 p-0 border-border">
                <a href={`tel:${phone}`} aria-label={`Call ${clinicName} at ${phone}`}>
                  <Call02Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
