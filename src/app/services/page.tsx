import { PageHero } from "@/components/layout/PageHero";
import { ServicesClient } from "./ServicesClient";
import { CTA } from "@/components/home/CTA";
import { CheckmarkCircle02Icon } from "hugeicons-react";
import Image from "next/image";
import { images } from "@/config/images";

export const metadata = {
  title: "Our Services | Lumina Dental Care",
  description: "Comprehensive dental services including cosmetic dentistry, implants, and orthodontics.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesClient />

      <section className="py-16 sm:py-24 bg-card border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src={images.servicesTechnology}
                alt="Dental Technology"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground mb-6">
                Advanced Technology for Superior Results
              </h2>
              <p className="text-muted-foreground mb-6">
                We continually invest in the latest dental technology to make your visits faster, more comfortable, and highly effective. Our 3D imaging and laser dentistry ensure precise diagnostics and treatments.
              </p>
              <ul className="space-y-4">
                {[
                  "Low-Dose Digital X-Rays",
                  "3D Cone Beam Imaging",
                  "Intraoral Digital Cameras",
                  "Gentle Laser Dentistry",
                  "Comfort-Focused Anesthesia Delivery"
                ].map((tech, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <CheckmarkCircle02Icon className="w-4 h-4" aria-hidden="true" />
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
