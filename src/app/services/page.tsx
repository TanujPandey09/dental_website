import { ServicesClient } from "./ServicesClient";
import { PatientCareBento } from "@/components/home/PatientCareBento";
import { CTA } from "@/components/home/CTA";
import { CheckmarkCircle02Icon } from "hugeicons-react";
import Image from "next/image";
import { images } from "@/config/images";
import siteConfig from "@/config/site";

export const metadata = {
  title: `Our Services | ${siteConfig.clinic.name}`,
  description: "Comprehensive dental services including cosmetic dentistry, implants, and orthodontics.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesClient />

      <section className="py-16 sm:py-24 bg-card border-y border-border/50">
        <div className="shell">
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
              <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-primary mb-3">
                Digital Diagnostics /
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.15] mb-5">
                Clinical Technology Grounded in{" "}
                <span className="inline-block rounded-md bg-primary/20 text-foreground px-2 py-0.5 font-normal">
                  Patient Comfort
                </span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We replace outdated dental equipment with whisper-quiet, low-radiation digital systems designed to eliminate discomfort, eliminate impression goop, and give you clear visual co-diagnosis before any treatment begins.
              </p>
              <ul className="space-y-4">
                {[
                  "Low-Dose Digital X-Rays (80% less radiation)",
                  "3D Cone Beam Volumetric Imaging (Sub-millimeter mapping)",
                  "Digital Intraoral Cameras (You see what your doctor sees)",
                  "Computerized Gentle Anesthesia (Pain-free delivery)",
                  "Precision Soft-Tissue Laser (Rapid healing, zero stitches)"
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

      <PatientCareBento />

      <CTA />
    </>
  );
}
