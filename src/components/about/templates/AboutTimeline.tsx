"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Calendar01Icon, ArrowRight01Icon } from "hugeicons-react";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

interface TimelineStep {
  year: string;
  title: string;
  desc: string;
  image: string;
  imageAlt: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    year: "2011",
    title: "Clinic Launch",
    desc: "Founded with a vision to redefine dental healthcare by prioritizing patient comfort and introducing advanced digital dentistry in Austin.",
    image: images.about.treatmentRoom,
    imageAlt: "Original Lumina clinical operatory suite",
  },
  {
    year: "2015",
    title: "Service Expansion",
    desc: "Introduced computer-guided implant surgery and dedicated pediatric suites, expanding comprehensive multidisciplinary care under one roof.",
    image: images.about.consultation,
    imageAlt: "Patient-doctor consultation suite",
  },
  {
    year: "2019",
    title: "Growing Team",
    desc: "Welcomed fellowship-trained prosthodontists and endodontic specialists, achieving state-wide recognition for clinical precision.",
    image: images.about.clinicInterior,
    imageAlt: "Clinical specialists and clinic interior",
  },
  {
    year: "2024",
    title: "Future Innovation",
    desc: "Implemented AI-assisted 3D smile design, in-office robotic CEREC milling, and continuous HEPA-14 cleanroom air turnover.",
    image: images.about.dentalTechnology,
    imageAlt: "Digital 3D intraoral dental technology",
  },
];

export function AboutTimeline() {
  const { openBooking } = useBooking();
  const founder = siteConfig.doctors[0];
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-16 sm:space-y-24 pb-12 sm:pb-20">
      {/* 1. Timeline Section Header matching Screenshot 2 */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-primary mb-3">
          Heritage &amp; History /
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.15] mb-4">
          Fifteen Years Of{" "}
          <span className="inline-block rounded-md bg-primary/20 text-foreground px-2 py-0.5 font-normal">
            Dental Excellence
          </span>
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto font-normal">
          A journey of continuous innovation, compassionate care, and transforming smiles
          across our Austin community.
        </p>
      </div>

      {/* 2. Alternating Timeline Rows matching Screenshot 2 */}
      <div className="max-w-5xl mx-auto space-y-12 sm:space-y-18 lg:space-y-24">
        {TIMELINE_STEPS.map((step, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={step.year}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Photo Column */}
              <div
                className={`md:col-span-6 ${
                  isEven ? "md:order-1" : "md:order-2"
                }`}
              >
                <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-muted shadow-md border border-border/70 group">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover scale-100 group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Text Description Column */}
              <div
                className={`md:col-span-6 flex flex-col justify-center ${
                  isEven ? "md:order-2" : "md:order-1"
                }`}
              >
                <div>
                  {/* Year Badge Pill */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary mb-3">
                    {step.year}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground leading-snug mb-3">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Founder's Signed Commitment Note & CTA */}
      <div className="max-w-4xl mx-auto pt-6">
        <div className="rounded-2xl sm:rounded-3xl bg-card p-6 sm:p-10 lg:p-12 border border-border/80 shadow-md flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shrink-0 ring-4 ring-primary/20 shadow-md bg-muted">
            <Image
              src={founder.image}
              alt={`${founder.name} - Founder`}
              fill
              sizes="(max-width: 640px) 112px, 144px"
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-4 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/15 text-[10px] font-mono uppercase tracking-widest text-primary font-semibold mb-1">
              FOUNDER&apos;S PLEDGE
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-foreground leading-snug">
              &ldquo;We measure success in genuine smiles, not procedure volume.&rdquo;
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every patient who walks into our suites is treated with unhurried dignity, total clinical
              transparency, and gentle human care. That was our founding promise in 2011, and it remains
              our guiding compass today.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-heading font-bold text-foreground text-sm sm:text-base">
                  {founder.name}
                </p>
                <p className="text-xs text-muted-foreground">{founder.role}</p>
              </div>

              <Button
                size="default"
                variant="cta"
                onClick={openBooking}
                className="w-full sm:w-auto rounded-full h-11 px-6 text-xs sm:text-sm font-semibold touch-manipulation self-center sm:self-auto"
              >
                <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>Schedule Your Visit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
