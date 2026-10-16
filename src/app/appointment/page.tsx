import { BookingForm } from "@/components/appointment/BookingForm";
import { CheckmarkBadge01Icon, Shield01Icon, StarIcon } from "hugeicons-react";
import siteConfig from "@/config/site";

export const metadata = {
  title: "Book Appointment | Premium Dental Care",
  description: "Schedule your premium dental consultation today.",
};

export default function AppointmentPage() {
  const { lat, lng } = siteConfig.contact.mapCenter;
  const dLat = 0.008;
  const dLng = 0.011;
  const bbox = `${lng - dLng},${lat - dLat},${lng + dLng},${lat + dLat}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="bg-background min-h-screen">
      <div className="pt-24 sm:pt-32 pb-8 sm:pb-12 border-b border-border/50 bg-card">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 tracking-tight">
            Request an Appointment
          </h1>
          <p className="text-lg text-muted-foreground">
            Take the first step towards your perfect smile. Our team will review your request and confirm your appointment shortly.
          </p>
        </div>
      </div>

      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
            
            {/* Left: Trust Factors */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="text-xl font-heading font-bold text-primary mb-6">Why Choose {siteConfig.clinic.name}?</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <StarIcon className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Trusted by Patients</h4>
                      <p className="text-sm text-muted-foreground mt-1">{siteConfig.clinic.happyPatients.toLocaleString()}+ happy patients treated with care.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Shield01Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Advanced Technology</h4>
                      <p className="text-sm text-muted-foreground mt-1">We utilize 3D imaging and comfortable, minimally invasive treatments.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <CheckmarkBadge01Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Expert Specialists</h4>
                      <p className="text-sm text-muted-foreground mt-1">Board-certified doctors from the world&apos;s top institutions.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-8 rounded-3xl text-secondary-foreground">
                <h3 className="text-xl font-heading font-bold text-white mb-4">Need Immediate Help?</h3>
                <p className="text-secondary-foreground/80 text-sm mb-6">
                  If you are experiencing a dental emergency, please call us directly for priority booking.
                </p>
                <a href={`tel:${siteConfig.contact.emergencyPhone}`} className="inline-flex items-center justify-center w-full h-12 rounded-xl bg-white text-secondary font-bold hover:bg-white/90 transition-colors">
                  Call {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-card p-5 sm:p-8 md:p-10 rounded-3xl border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-4 sm:mb-6">Patient Details</h2>
                <BookingForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Location & Map */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5">
              <div className="bg-card p-8 rounded-3xl border border-border shadow-sm h-full">
                <h3 className="text-xl font-heading font-bold text-primary mb-6">Visit Our Clinic</h3>
                <div className="space-y-5">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Address</div>
                    <p className="text-foreground whitespace-pre-line leading-relaxed">{siteConfig.contact.address}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Hours</div>
                    <p className="text-foreground whitespace-pre-line leading-relaxed">{siteConfig.contact.hours}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Phone</div>
                    <a href={`tel:${siteConfig.contact.phone}`} className="text-primary font-semibold hover:underline">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden border border-border shadow-sm h-full min-h-[360px]">
                <iframe
                  title={`Map to ${siteConfig.clinic.name}`}
                  src={mapSrc}
                  className="w-full h-full min-h-[360px] border-0 block"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
