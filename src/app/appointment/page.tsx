import { BookingForm } from "@/components/appointment/BookingForm";
import { PageHero } from "@/components/layout/PageHero";
import { CheckmarkBadge01Icon, Shield01Icon, StarIcon, Location01Icon, Clock01Icon, ArrowRight01Icon, SparklesIcon, Call02Icon } from "hugeicons-react";
import siteConfig from "@/config/site";

export const metadata = {
  title: "Schedule Consultation | Lumina Dental Care",
  description: "Reserve your private dental suite and consultation with board-certified dental specialists in Manhattan.",
};

export default function AppointmentPage() {
  const { lat, lng } = siteConfig.contact.mapCenter;
  const dLat = 0.008;
  const dLng = 0.011;
  const bbox = `${lng - dLng},${lat - dLat},${lng + dLng},${lat + dLat}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address.replace(/\n/g, ", "))}`;

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        title="Schedule Your Visit"
        subtitle="Select your procedure, choose a convenient date and time slot, and our clinical concierge team will confirm your private suite."
        badge="Direct Reservation"
      />

      <section className="pt-8 pb-16 sm:pt-10 sm:pb-24 relative overflow-hidden">
        {/* Soft Ambient Radial Accents */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: SaaS Concierge & Trust Panel */}
            <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              
              {/* Double Bezel Trust Card */}
              <div className="p-1.5 rounded-3xl bg-muted/40 border border-border/70 shadow-sm">
                <div className="rounded-2xl bg-card border border-border/60 p-6 sm:p-7 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                      <SparklesIcon className="w-3.5 h-3.5" />
                      <span>The Lumina Standard</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground tracking-tight">
                      Why Choose {siteConfig.clinic.name}?
                    </h3>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <StarIcon className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground">Verified Clinical Excellence</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          Over {siteConfig.clinic.happyPatients.toLocaleString()}+ verified patient smiles treated with zero-compromise biocompatible materials.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Shield01Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground">Guided 3D Precision</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          Low-dose digital CBCT imaging, AI margin scanning & intraoral HD cameras for maximum patient comfort.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <CheckmarkBadge01Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground">Board-Certified Specialists</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          Ivy-league trained prosthodontists, periodontists, and aesthetic dentists under one clinical roof.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Double Bezel Emergency Callout */}
              <div className="p-1.5 rounded-3xl bg-secondary/15 border border-secondary/20 shadow-sm">
                <div className="rounded-2xl bg-secondary p-6 sm:p-7 text-secondary-foreground space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs uppercase tracking-wider font-bold text-accent">Same-Day Priority Triage</span>
                  </div>
                  <h4 className="text-lg font-heading font-bold text-white">
                    Need Immediate Dental Care?
                  </h4>
                  <p className="text-secondary-foreground/80 text-xs leading-relaxed">
                    If you are experiencing acute pain, swelling, or dental trauma, call our clinician dispatch line for priority intake.
                  </p>
                  <a
                    href={`tel:${siteConfig.contact.emergencyPhone}`}
                    className="inline-flex items-center justify-center gap-2.5 w-full h-12 px-5 rounded-full bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-hover shadow-md transition-all group cursor-pointer"
                  >
                    <Call02Icon className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <span className="text-white">Direct Call: {siteConfig.contact.emergencyPhone}</span>
                  </a>
                </div>
              </div>

              {/* Clinic Access Card */}
              <div className="p-1.5 rounded-3xl bg-muted/40 border border-border/70 shadow-sm">
                <div className="rounded-2xl bg-card border border-border/60 p-6 space-y-4 text-xs">
                  <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                    <Location01Icon className="w-4 h-4 text-primary" />
                    <span>Manhattan Clinic Location</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                    {siteConfig.contact.address}
                  </p>
                  <div className="pt-2 border-t border-border/50 flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock01Icon className="w-3.5 h-3.5 text-primary" />
                      <span>{siteConfig.contact.hours.split("\n")[0]}</span>
                    </span>
                    <span className="font-semibold text-primary">Valet Available</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: SaaS Booking Form Container */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="p-1.5 sm:p-2 rounded-3xl bg-muted/30 border border-border/70 shadow-sm">
                <div className="rounded-[calc(1.5rem-2px)] sm:rounded-[calc(1.5rem-4px)] bg-card border border-border/60 p-6 sm:p-10 shadow-xl">
                  <BookingForm />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Location & Map Section */}
      <section className="py-12 sm:py-16 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
                <Location01Icon className="w-3.5 h-3.5" />
                <span>Directions & Transit</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
                Finding Our Practice
              </h2>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline"
            >
              <span>Open in Google Maps</span>
              <ArrowRight01Icon className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-1.5 sm:p-2 rounded-3xl bg-muted/40 border border-border/70 shadow-sm">
            <div className="rounded-[calc(1.5rem-2px)] sm:rounded-[calc(1.5rem-4px)] overflow-hidden h-[360px] sm:h-[420px] relative">
              <iframe
                title={`Map to ${siteConfig.clinic.name}`}
                src={mapSrc}
                className="w-full h-full border-0 block"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
