import { PageHero } from "@/components/layout/PageHero";
import { BookingForm } from "@/components/appointment/BookingForm";
import { CheckmarkBadge01Icon, Shield01Icon, StarIcon } from "hugeicons-react";

export const metadata = {
  title: "Book Appointment | Premium Dental Care",
  description: "Schedule your premium dental consultation today.",
};

export default function AppointmentPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="pt-32 pb-12 border-b border-border/50 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 tracking-tight">
            Request an Appointment
          </h1>
          <p className="text-lg text-muted-foreground">
            Take the first step towards your perfect smile. Our team will review your request and confirm your appointment shortly.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            
            {/* Left: Trust Factors */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="text-xl font-heading font-bold text-primary mb-6">Why Choose Premium Dental?</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <StarIcon className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Top Rated in NYC</h4>
                      <p className="text-sm text-muted-foreground mt-1">Over 5000+ happy patients with a 4.9/5 star average rating.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <Shield01Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Advanced Technology</h4>
                      <p className="text-sm text-muted-foreground mt-1">We utilize 3D imaging and pain-free laser dentistry.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <CheckmarkBadge01Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Expert Specialists</h4>
                      <p className="text-sm text-muted-foreground mt-1">Board-certified doctors from the world's top institutions.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-8 rounded-3xl text-secondary-foreground">
                <h3 className="text-xl font-heading font-bold text-white mb-4">Need Immediate Help?</h3>
                <p className="text-secondary-foreground/80 text-sm mb-6">
                  If you are experiencing a dental emergency, please call us directly for priority booking.
                </p>
                <a href="tel:+1234567890" className="inline-flex items-center justify-center w-full h-12 rounded-xl bg-white text-secondary font-bold hover:bg-white/90 transition-colors">
                  Call (555) 123-4567
                </a>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Patient Details</h2>
                <BookingForm />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
