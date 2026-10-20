"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { Button, ButtonBadge } from "@/components/ui/button";
import {
  Time01Icon,
  ArrowRight01Icon,
  SparklesIcon,
  Calendar01Icon,
} from "hugeicons-react";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

interface Milestone {
  year: string;
  badge: string;
  title: string;
  desc: string;
  outcome: string;
  image: string;
  imageAlt: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2011",
    badge: "The Founding",
    title: "The Founding Boutique Practice",
    desc: "Started as an intimate two-chair clinic with one clear promise: eliminate dental fear through radical empathy and unhurried care.",
    outcome: "2 Treatment Suites · 1 Founding Doctor",
    image: images.about.details,
    imageAlt: "Original boutique dental instruments",
  },
  {
    year: "2016",
    badge: "Expansion",
    title: "Multi-Specialty Healthcare Facility",
    desc: "Expanded to our current modern facility, bringing board-certified prosthodontists, periodontists, and orthodontists under one roof.",
    outcome: "Expanded to 12 Multi-Specialty Suites",
    image: images.about.lobby,
    imageAlt: "Expanded Lumina dental facility lounge",
  },
  {
    year: "2020",
    badge: "Digital Precision",
    title: "In-House Digital 3D Laboratory",
    desc: "Invested in on-site 3D milling units and intraoral digital scanners, enabling precision same-day porcelain restorations and virtual smile mockups.",
    outcome: "Sub-Millimeter Same-Day Porcelain Milling",
    image: images.about.dentalTechnology,
    imageAlt: "In-house 3D dental lab equipment",
  },
  {
    year: "2024",
    badge: "Patient Governance",
    title: "Patient-Led Care Model",
    desc: "Formalized our patient advisory feedback system so every treatment protocol, follow-up call, and comfort amenity is shaped by direct patient insight.",
    outcome: "Formalized Patient Advisory Council",
    image: images.about.consultation,
    imageAlt: "Patient-doctor consultation suite",
  },
  {
    year: "Today",
    badge: "Living Heritage",
    title: `${siteConfig.clinic.happyPatients.toLocaleString()}+ Patients Cared For`,
    desc: "Serving families across every stage of life with gentle, unhurried dentistry in an architecturally stunning, calm clinic.",
    outcome: `${siteConfig.clinic.happyPatients.toLocaleString()}+ Smiles Transformed`,
    image: images.about.clinicInterior,
    imageAlt: "Current flagship clinic operatory suite",
  },
];

export function AboutTimeline() {
  const { openBooking } = useBooking();
  const founder = siteConfig.doctors[0];
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Header with Eyebrow */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <Time01Icon className="w-4 h-4 text-primary" />
          <span>Our Journey &amp; Milestones</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
          A Decade of Patient-Centered Care.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Follow the journey that transformed an ambitious vision into one of the most respected, patient-centered dental practices in the country.
        </p>
      </div>

      {/* 2. Visual Milestone Stepper */}
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Continuous Connecting Line */}
        <div className="absolute left-6 sm:left-1/2 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-border to-primary/40 -translate-x-1/2" />

        <div className="space-y-10 sm:space-y-14">
          {MILESTONES.map((m, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={m.year}
                initial={reduceMotion ? false : { opacity: 0.85, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "120px 0px" }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : idx * 0.06, ease: [0.32, 0.72, 0, 1] }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center ${isEven ? "sm:flex-row-reverse" : ""
                  }`}
              >
                {/* Illuminated Stepper Node */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center ring-4 ring-primary/20 shadow-lg shadow-primary/25 z-10 shrink-0">
                  {m.year === "Today" ? (
                    <SparklesIcon className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <span>{m.year}</span>
                  )}
                </div>

                {/* Double-Bezel Visual Card */}
                <div
                  className={`ml-14 sm:ml-0 w-[calc(100%-3.5rem)] sm:w-[calc(50%-2.5rem)] ${isEven ? "sm:text-left" : "sm:text-left"
                    }`}
                >
                  <div className="p-1.5 sm:p-2 rounded-2xl bg-muted/40 border border-border/80 shadow-sm group hover:-translate-y-0.5 transition-transform duration-300">
                    <div className="rounded-xl bg-card p-5 border border-border/60 hover:shadow-lg transition-shadow">
                      {/* Photo Thumbnail */}
                      <div className="relative h-32 sm:h-36 w-full rounded-lg overflow-hidden mb-4 border border-border/40">
                        <Image
                          src={m.image}
                          alt={m.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, 35vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 backdrop-blur-md bg-card/85 text-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-border/60">
                          {m.badge}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-primary">{m.year}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mb-2 leading-snug">
                        {m.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal mb-4">
                        {m.desc}
                      </p>

                      {/* Quantifiable Outcome Pill */}
                      <div className="pt-3 border-t border-border/60 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-[11px] font-semibold text-primary">
                          {m.outcome}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Founder's Signed Commitment Note (Double-Bezel Architecture) */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-2 sm:p-3 rounded-[2.5rem] bg-muted/30 border border-border/70 shadow-sm">
          <div className="rounded-[calc(2.5rem-0.75rem)] bg-card p-6 sm:p-12 border border-border/40 flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shrink-0 ring-4 ring-primary/20 shadow-md">
              <Image
                src={founder.image}
                alt={`${founder.name} - Founder`}
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="space-y-4 text-center sm:text-left flex-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold bg-primary/10 text-primary border border-primary/20">
                Founder&apos;s Pledge
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground leading-snug">
                &ldquo;We measure success in genuine smiles, not procedure volume.&rdquo;
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every patient who walks into our suites is treated with unhurried dignity, total clinical transparency, and gentle human care. That was our founding promise in 2011, and it remains our guiding compass today.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-heading font-bold text-foreground text-base">{founder.name}</p>
                  <p className="text-xs text-muted-foreground">{founder.role}</p>
                </div>
                <Button
                  size="lg"
                  variant="cta"
                  onClick={() => openBooking()}
                  className="self-center sm:self-auto"
                >
                  <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>Schedule Your Visit</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
