"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, CheckmarkCircle01Icon, StarIcon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

const TREATMENT_TABS = [
  {
    id: "cosmetic",
    label: "Cosmetic",
    tag: "SMILE DESIGN",
    title: "Veneers & bonding",
    desc: "A considered approach to proportion, shade, and natural translucency.",
    image: images.heroSwissOperatory || images.services["cosmetic-dentistry"],
    code: "01 — COSMETIC DENTISTRY",
    href: "/services/cosmetic-dentistry",
  },
  {
    id: "implants",
    label: "Implants",
    tag: "RESTORATIVE",
    title: "Guided 3D Implants",
    desc: "Computer-guided ceramic implants engineered for life-long natural function.",
    image: images.services["dental-implants"],
    code: "02 — DENTAL IMPLANTS",
    href: "/services/dental-implants",
  },
  {
    id: "whitening",
    label: "Whitening",
    tag: "PREVENTIVE",
    title: "Laser Enamel Whitening",
    desc: "Gentle multi-frequency activation lifting deep stain with zero sensitivity.",
    image: images.services["teeth-whitening"],
    code: "03 — TEETH WHITENING",
    href: "/services/teeth-whitening",
  },
  {
    id: "ortho",
    label: "Orthodontics",
    tag: "ALIGNMENT",
    title: "Clear Aligners",
    desc: "Discreet orthodontic engineering planned with high-precision digital scans.",
    image: images.services["orthodontics"],
    code: "04 — ORTHODONTICS",
    href: "/services/orthodontics",
  },
] as const;

export function HeroMinimal() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<string>("cosmetic");

  const activeTreatment =
    TREATMENT_TABS.find((t) => t.id === activeTab) || TREATMENT_TABS[0];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, ease: [0.32, 0.72, 0, 1] },
    },
  };

  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left Column: Swiss Editorial Authority */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                The Lumina Standard
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.08] tracking-tight mb-6 text-balance"
            >
              Dentistry, <br />
              <span className="italic font-normal text-primary font-serif">
                minus the noise.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg font-normal"
            >
              Unhurried consultations. Itemized plans. Acoustic suites. Everything you need to feel informed—and nothing you don&apos;t.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
              <Button
                size="xl"
                onClick={openBooking}
                className="rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-md shadow-primary/20 px-8 h-13 cursor-pointer"
              >
                <span>Request Appointment</span>
                <ArrowRight01Icon className="size-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>

              <Button
                asChild
                size="xl"
                variant="outline"
                className="rounded-full border-border/80 bg-card hover:bg-muted font-semibold px-8 h-13"
              >
                <Link href="/about">
                  <span>Our approach</span>
                </Link>
              </Button>
            </motion.div>

            {/* Value checklist strip */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <CheckmarkCircle01Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                <span>Same-Day Reserved Slots</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckmarkCircle01Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                <span>Itemized Price Lock</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckmarkCircle01Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                <span>Zero Judgment Protocol</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Swiss Treatment Preview */}
          <motion.div variants={itemVariants} className="lg:col-span-6 w-full">
            <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              {/* Header row */}
              <div className="flex items-center justify-between mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                <span>Treatment Preview</span>
                <span className="text-primary font-semibold">Quick 3D Focus</span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 select-none">
                {TREATMENT_TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-[background-color,color,box-shadow] duration-200 cursor-pointer ${
                        isActive
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Treatment Image Card with Overlay */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border/70 group">
                <Image
                  src={activeTreatment.image}
                  alt={activeTreatment.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-[0.16em] block mb-1">
                    {activeTreatment.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold leading-snug">
                    {activeTreatment.title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1 font-normal">
                    {activeTreatment.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Link Row */}
              <div className="flex items-center justify-between pt-4 mt-1 border-t border-border/60 text-xs">
                <span className="font-mono text-[11px] text-muted-foreground font-medium">
                  {activeTreatment.code}
                </span>
                <Link
                  href={activeTreatment.href}
                  className="font-semibold text-primary hover:underline flex items-center gap-1 group"
                >
                  <span>Explore all treatments</span>
                  <ArrowRight01Icon className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Swiss Trust Metrics Full-Width Row */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-border/80 w-full"
        >
          <div>
            <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              <CountUp end={siteConfig.clinic.yearsExperience} duration={2} enableScrollSpy scrollSpyOnce />+
            </p>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
              Years of Specialist Experience
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              25<span className="text-primary font-serif italic">k+</span>
            </p>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
              Smiles Transformed
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
              99.4<span className="text-primary">%</span>
            </p>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
              Patient Comfort Score
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground flex items-center gap-1.5">
              4.9 <StarIcon className="w-5 h-5 text-primary fill-current" aria-hidden="true" />
            </p>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-1">
              From 1,200+ Verified Reviews
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
