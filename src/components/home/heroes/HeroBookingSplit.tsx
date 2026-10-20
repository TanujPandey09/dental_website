"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarIcon, CheckmarkCircle01Icon, Calendar01Icon, Call02Icon, LockIcon, UserIcon } from "hugeicons-react";
import Image from "next/image";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

export function HeroBookingSplit() {
  const { openBookingWithDraft } = useBooking();
  const reduceMotion = useReducedMotion();

  const [selectedService, setSelectedService] = useState("cosmetic");
  const [selectedTime, setSelectedTime] = useState("morning");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, ease: [0.32, 0.72, 0, 1] }
    },
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hand the entered details to the appointment form via in-memory state
    // (no query strings, no fake confirmation step). The appointment page's
    // zod validation still applies before anything can be submitted.
    openBookingWithDraft({
      service: selectedService,
      timeWindow: selectedTime,
      fullName,
      phone,
    });
  };

  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-background">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left Column: High-Impact Typography & Trust Checkmarks */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Fast-Track Dental Care • Same-Day Appointments
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.1] tracking-tight mb-5 sm:mb-6 text-balance"
            >
              Same-Day Dental Care.{" "}
              <span className="text-primary italic font-serif font-normal">Punctual &amp; Unhurried.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-xl font-normal">
              Experience comfortable, comprehensive dental care designed around your schedule. Board-certified specialists, transparent pricing, and gentle modern technology.
            </motion.p>

            {/* Value checklist */}
            <motion.div variants={itemVariants} className="space-y-3 mb-8 w-full">
              {[
                "Flexible Patient Financing & Clear Cost Estimates",
                "In-Network with Major PPO Dental Insurance Providers",
                "Digital 3D Scans & Gentle Laser Technology",
                "Same-Day Appointments Available 6 Days a Week",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <CheckmarkCircle01Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-foreground/85">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* Social Proof Card */}
            <motion.div
              variants={itemVariants}
              className="p-4 rounded-2xl bg-card border border-border/70 flex items-center gap-4 shadow-sm w-full sm:w-auto"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20">
                <Image
                  src={images.doctors["dr-sarah-jenkins"]}
                  alt="Dr. Sarah Jenkins"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  ))}
                  <span className="text-xs font-bold text-foreground ml-1">4.9/5 Rating</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Verified Patient Reviews • Over {siteConfig.clinic.happyPatients.toLocaleString()}+ patients cared for
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Fast-Booking Form */}
          <motion.div variants={itemVariants} className="lg:col-span-5 w-full">
            <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="text-xs font-semibold text-primary">Fast-Track Visit</span>
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Reserve Appointment</h2>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar01Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>

                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  {/* Service selector */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Select Service</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "cosmetic", label: "Cosmetic & Veneers" },
                        { id: "implants", label: "Dental Implants" },
                        { id: "whitening", label: "Teeth Whitening" },
                        { id: "general", label: "Checkup & Cleaning" },
                      ].map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => setSelectedService(service.id)}
                          className={`p-2.5 text-xs font-medium rounded-xl border text-left transition-[background-color,border-color,color,box-shadow] duration-200 cursor-pointer ${selectedService === service.id
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-muted/40 text-foreground/80 border-border/70 hover:border-primary/50"
                            }`}
                        >
                          {service.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Preferred Time Window</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "morning", label: "Morning" },
                        { id: "afternoon", label: "Afternoon" },
                        { id: "evening", label: "Evening" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTime(t.id)}
                          className={`py-2 text-xs font-medium rounded-xl border text-center transition-[background-color,border-color,color,box-shadow] duration-200 cursor-pointer ${selectedTime === t.id
                            ? "bg-primary/10 text-primary border-primary font-semibold"
                            : "bg-muted/40 text-foreground/75 border-border/70 hover:border-primary/50"
                            }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Your Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-11 pl-10 pr-3.5 text-sm rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      />
                      <UserIcon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="(555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-11 pl-10 pr-3.5 text-sm rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      />
                      <Call02Icon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Submit Button - Centered */}
                  <div className="flex justify-center pt-2">
                    <Button
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full sm:w-auto rounded-full"
                    >
                      <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
                      <span>Continue to Appointment</span>
                    </Button>
                  </div>

                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-center text-muted-foreground pt-1">
                    <LockIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    HIPAA compliant. No upfront payment required.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
