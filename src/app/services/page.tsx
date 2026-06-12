import { PageHero } from "@/components/layout/PageHero";
import { ServicesClient } from "./ServicesClient";
import { CTA } from "@/components/home/CTA";

export const metadata = {
  title: "Our Services | Lumina Dental Care",
  description: "Comprehensive dental services including cosmetic dentistry, implants, and orthodontics.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero 
        title="Advanced Dental Solutions" 
        subtitle="From routine cleanings to advanced cosmetic procedures, we offer a full spectrum of dental care under one roof. Our state-of-the-art facility ensures you receive the highest standard of treatment."
        badge="Services"
      />

      <ServicesClient />
      
      <section className="py-24 bg-white border-y border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200&auto=format&fit=crop" 
                alt="Dental Technology"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                Advanced Technology for Superior Results
              </h2>
              <p className="text-muted-foreground mb-6">
                We continually invest in the latest dental technology to make your visits faster, more comfortable, and highly effective. Our 3D imaging and laser dentistry ensure precise diagnostics and treatments.
              </p>
              <ul className="space-y-4">
                {[
                  "Digital X-Rays (90% less radiation)",
                  "3D Cone Beam Imaging",
                  "Intraoral Cameras",
                  "Laser Dentistry",
                  "Pain-Free Anesthesia Systems"
                ].map((tech, i) => (
                  <li key={i} className="flex items-center gap-3 text-primary font-medium">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      ✓
                    </div>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
