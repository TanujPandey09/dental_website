"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar01Icon,
  Clock01Icon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  Invoice01Icon,
  Shield01Icon,
  SparklesIcon,
  DentalBracesIcon,
} from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

export function PatientCareBento() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();
  const [selectedTreatmentIndex, setSelectedTreatmentIndex] = useState(0);

  const treatments = [
    { title: "Check-up & 3D scan", duration: "45 min", price: "From $85", note: "Diagnostic digital preview" },
    { title: "In-office laser whitening", duration: "60 min", price: "From $290", note: "Up to 8 shades brighter" },
    { title: "Clear aligner consultation", duration: "30 min", price: "Complimentary", note: "Includes 3D scan simulation" },
    { title: "Implant suitability triage", duration: "45 min", price: "From $120", note: "CBCT bone density analysis" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-background border-t border-border/60 relative overflow-hidden">
      {/* Background ambient blur */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="shell relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="uppercase tracking-wider font-mono text-[11px]">Patient Care &amp; Transparency</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.12] tracking-tight mb-3">
            Care you can follow, from <br className="hidden sm:inline" />
            <span className="text-primary italic font-serif font-normal">first visit to follow-up.</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Every procedure explained beforehand, itemized pricing without surprise copays, and digital progress tracking you can check right from your phone.
          </p>
        </div>

        {/* Bento Grid (Replicates Aveline Reference Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">

          {/* CARD 1: Book A Visit Interactive Selector (Span 4) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.4 }}
            className="lg:col-span-4 rounded-2xl sm:rounded-3xl bg-card border border-border/70 p-5 sm:p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-primary block">
                    Instant Suite Access
                  </span>
                  <h3 className="text-lg font-heading font-bold text-foreground">Book a Visit</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live availability
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Pick a treatment, then reserve your preferred day &amp; operatory suite. You&apos;ll receive an instant confirmation text.
              </p>

              {/* Treatment Options */}
              <div className="space-y-2">
                {treatments.map((item, idx) => {
                  const isSelected = selectedTreatmentIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTreatmentIndex(idx)}
                      className={`w-full p-3 rounded-xl text-left border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-primary/5 border-primary ring-1 ring-primary/25 shadow-xs"
                          : "bg-muted/30 border-border/60 hover:bg-muted/60 hover:border-border"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <p className={`text-xs font-semibold truncate ${isSelected ? "text-primary font-bold" : "text-foreground"}`}>
                          {item.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {item.duration} · {item.note}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-foreground shrink-0 px-2 py-0.5 rounded bg-background border border-border/60">
                        {item.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-5 border-t border-border/60 mt-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5">
                  <Clock01Icon className="w-3.5 h-3.5 text-primary" />
                  <span>Next: Today, 2:30 PM</span>
                </span>
                <span>Dr. Jenkins suite</span>
              </div>
              <Button
                size="default"
                variant="cta"
                onClick={openBooking}
                className="w-full h-11 rounded-lg text-xs font-semibold shadow-xs"
              >
                <span>Reserve Selected Suite</span>
                <ArrowRight01Icon className="size-4 shrink-0" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>

          {/* MIDDLE COLUMN: Aligner Progress Tracker + Itemized Written Estimate (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6">

            {/* CARD 2: Clear Aligner Plan Progress Tracker */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.08 }}
              className="rounded-2xl sm:rounded-3xl bg-card border border-border/70 p-5 sm:p-6 shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <DentalBracesIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Clear Aligner Plan</h4>
                    <p className="text-[10px] text-muted-foreground">Patient Portal Sync</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                  On Track
                </span>
              </div>

              {/* Big Stage Number */}
              <div className="flex items-baseline justify-between mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-heading font-extrabold text-foreground">14</span>
                  <span className="text-sm font-semibold text-muted-foreground">/ 22 aligners</span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">
                  Next check-in: <strong className="text-foreground">Fri, 24 Oct</strong>
                </span>
              </div>

              {/* 22 Aligner Progress Bar Segments */}
              <div className="grid grid-cols-11 gap-1 mb-3">
                {Array.from({ length: 22 }).map((_, i) => {
                  const isCompleted = i < 14;
                  return (
                    <div
                      key={i}
                      className={`h-5 rounded-xs transition-colors ${
                        isCompleted ? "bg-primary" : "bg-muted border border-border/60"
                      }`}
                      title={`Aligner tray #${i + 1}`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-border/50 text-muted-foreground">
                <span>Wear time today: <strong className="text-foreground font-semibold">21h 10m</strong></span>
                <span>Movement achieved: <strong className="text-primary font-semibold">64%</strong></span>
              </div>
            </motion.div>

            {/* CARD 3: Itemized Written Estimate Slip (No Surprises) */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.16 }}
              className="rounded-2xl sm:rounded-3xl bg-card border border-border/70 p-5 sm:p-6 shadow-xs flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-700 flex items-center justify-center shrink-0">
                      <Invoice01Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Written Estimate</h4>
                      <p className="text-[10px] text-muted-foreground">Zero surprise fees</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Verified In-Network
                  </span>
                </div>

                {/* Itemized Line Items */}
                <div className="space-y-1.5 text-xs py-2 border-y border-border/60">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Porcelain veneers × 4</span>
                    <span className="font-mono text-foreground font-medium">$2,600</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>3D Digital smile design scan</span>
                    <span className="font-mono text-foreground font-medium">$180</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Insurance estimated allowance</span>
                    <span className="font-mono">-$780</span>
                  </div>
                </div>
              </div>

              {/* Net Patient Responsibility */}
              <div className="pt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                    Patient Responsibility
                  </span>
                  <span className="text-2xl font-heading font-extrabold text-foreground">$2,000</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary font-mono block mb-0.5">
                    0% APR for 12 mos
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">$167 / month</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* CARD 4: Stay Committed to Dental Wellness Banner (Span 4) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.24 }}
            className="lg:col-span-4 rounded-2xl sm:rounded-3xl bg-secondary text-secondary-foreground border border-border/60 p-6 sm:p-7 shadow-md flex flex-col justify-between relative overflow-hidden group min-h-[360px]"
          >
            {/* Ambient soft glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold px-2.5 py-1 rounded-full bg-accent/15 border border-accent/25 inline-block mb-4">
                Preventive Concierge
              </span>

              <h3 className="text-xl sm:text-2xl font-heading font-bold text-secondary-foreground leading-snug mb-3">
                Stay committed to your lifelong dental wellness.
              </h3>

              <p className="text-xs sm:text-sm text-secondary-foreground/80 leading-relaxed mb-6 font-normal">
                Unhurried cleanings, aligner tracking check-ins, and gentle digital reminders. Healthy smiles are built on consistent, stress-free maintenance.
              </p>

              {/* Micro-Features */}
              <ul className="space-y-2.5 mb-6 text-xs text-secondary-foreground/90">
                <li className="flex items-center gap-2">
                  <CheckmarkCircle01Icon className="w-4 h-4 text-accent shrink-0" />
                  <span>24/7 direct doctor messaging for treatment questions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckmarkCircle01Icon className="w-4 h-4 text-accent shrink-0" />
                  <span>Zero fee cancellation with 24h digital rescheduling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckmarkCircle01Icon className="w-4 h-4 text-accent shrink-0" />
                  <span>Annual preventive imaging &amp; oral cancer screenings</span>
                </li>
              </ul>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10">
              <Button
                size="default"
                variant="glass"
                onClick={openBooking}
                className="w-full h-11 rounded-lg text-xs font-semibold text-secondary-foreground hover:text-white"
              >
                <span>Explore Our Membership Plans</span>
                <ArrowRight01Icon className="size-4 shrink-0" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
