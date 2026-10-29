"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Add01Icon, ArrowDown01Icon } from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

const TIME_OPTIONS = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
];

const fieldBase =
  "w-full rounded-lg border border-transparent bg-muted/60 px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background";

export function HeroBookingSplit() {
  const { openBookingWithDraft } = useBooking();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Smooth scroll parallax depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const bookingServices = siteConfig.forms.bookingServices;
  const selectedService = bookingServices[0]?.value || "general";

  const specialists = siteConfig.doctors.slice(0, 3);
  const patientAvatars = [
    images.testimonials.patients[1],
    images.testimonials.patients[2],
  ];

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const isValid =
    fullName.trim() && phone.trim() && date && time && message.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    // Details are handed to the appointment form via in-memory state;
    // the appointment page's validation still applies before submit.
    openBookingWithDraft({
      service: selectedService,
      timeWindow: time,
      fullName,
      phone,
      preferredDate: date,
      message,
    });
  };

  return (
    <section ref={sectionRef} className="relative flex min-h-[720px] overflow-hidden bg-slate-950 text-white lg:min-h-[760px]">
      {/* Full-bleed photo with subtle parallax */}
      <motion.div
        style={{
          y: reduceMotion ? 0 : backgroundY,
          scale: reduceMotion ? 1 : backgroundScale,
        }}
        className="absolute inset-0 z-0 select-none will-change-transform"
      >
        <Image
          src={images.heroCinematic}
          alt="Caring clinician comforting a patient"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "65% 30%" }}
          draggable={false}
        />
      </motion.div>

      {/* Left-side tint so the headline stays legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-0 h-48 bg-gradient-to-t from-slate-950/50 to-transparent"
      />

      <div className="shell relative z-10 flex w-full flex-col justify-center pb-24 pt-20 sm:pb-16 sm:pt-28 lg:pb-14 lg:pt-40">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[1fr_420px] lg:items-stretch lg:gap-16">
          {/* Left column: top group + bottom group */}
          <div className="flex flex-col justify-between gap-10 sm:gap-16">
            <div>
              {/* Backed by */}
              <div className="mb-3 flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {specialists.map((d) => (
                    <div
                      key={d.id}
                      className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white/90 bg-muted"
                    >
                      <Image
                        src={d.image}
                        alt={d.name}
                        fill
                        sizes="36px"
                        className="object-cover object-top"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm leading-tight text-white/90">
                  Backed by
                  <br />
                  {siteConfig.doctors.length} Specialists
                </p>
              </div>

              {/* Headline */}
              <h1 className="max-w-[620px] font-sans text-3xl xs:text-4xl sm:text-6xl lg:text-[76px] font-medium leading-[1.04] tracking-[-0.03em] text-white">
                Where every{" "}
                <span className="inline-block rounded-md bg-white/20 text-white px-2 py-0.5 font-normal">
                  smile
                </span>{" "}
                matters.
              </h1>

              {/* Description */}
              <p className="mt-4 sm:mt-6 max-w-[460px] text-sm xs:text-base leading-[1.55] text-white/90 lg:text-lg">
                Comprehensive dental and cosmetic care focused on comfort,
                quality, patient wellbeing and lasting results.
              </p>
            </div>

            {/* Rating + patient proof */}
            <div>
              <p className="font-sans text-4xl sm:text-6xl lg:text-7xl font-medium leading-none tracking-[-0.04em]">
                {siteConfig.clinic.stats.rating.toFixed(1)}*
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {patientAvatars.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/90 bg-muted"
                    >
                      <Image
                        src={src}
                        alt="Verified patient"
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/90 bg-background text-foreground">
                    <Add01Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="max-w-[210px] text-sm leading-snug text-white/90">
                  Patients value our caring, quality care!
                </p>
              </div>
            </div>
          </div>

          {/* Right column: booking card */}
          <div className="w-full lg:justify-self-end">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl sm:rounded-[20px] bg-card p-4 xs:p-6 sm:p-7 text-card-foreground shadow-xl"
            >
              <h2 className="mb-4 sm:mb-5 font-heading text-xl sm:text-2xl font-medium tracking-tight text-primary">
                Book appointment
              </h2>

              <div className="space-y-3.5 sm:space-y-4">
                <div>
                  <label htmlFor="hb-name" className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-foreground/80">
                    Full Name*
                  </label>
                  <input
                    id="hb-name"
                    type="text"
                    required
                    placeholder="Jordan Feliz"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`${fieldBase} h-11`}
                  />
                </div>

                <div>
                  <label htmlFor="hb-phone" className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-foreground/80">
                    Phone*
                  </label>
                  <input
                    id="hb-phone"
                    type="tel"
                    inputMode="tel"
                    required
                    placeholder="+44 501 255 001"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`${fieldBase} h-11`}
                  />
                </div>

                <div>
                  <label htmlFor="hb-date" className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium text-foreground/80">
                    Date &amp; Time*
                  </label>
                  <div className="grid grid-cols-1 xs:grid-cols-[1.05fr_1fr] gap-2.5 sm:gap-3">
                    <input
                      id="hb-date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`${fieldBase} h-11 px-3 ${date ? "" : "text-muted-foreground/70"}`}
                    />
                    <div className="relative">
                      <select
                        aria-label="Select time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={`${fieldBase} h-11 cursor-pointer appearance-none pr-9 ${time ? "" : "text-muted-foreground/70"}`}
                      >
                        <option value="" disabled>
                          Select Time
                        </option>
                        {TIME_OPTIONS.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                      <ArrowDown01Icon
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="hb-message" className="mb-2 block text-sm font-medium text-foreground/80">
                    Message*
                  </label>
                  <textarea
                    id="hb-message"
                    required
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${fieldBase} h-[108px] resize-none py-3`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className="mt-5 h-12 w-full cursor-pointer rounded-full bg-primary text-sm font-medium text-primary-foreground transition hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-primary/40 disabled:hover:bg-primary/40"
              >
                Send message
              </button>

              <p className="mt-3 text-center text-[11px] leading-snug text-muted-foreground">
                {siteConfig.clinic.compliance.formPrivacyNotice}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}