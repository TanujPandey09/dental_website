"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import {
  CheckmarkBadge01Icon,
  Shield01Icon,
  Call02Icon,
  PlusSignIcon,
  MinusSignIcon,
  ArrowRight01Icon,
  Clock01Icon,
  MicroscopeIcon,
  Sofa01Icon,
  Invoice01Icon,
  Calendar01Icon,
} from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { images } from "@/config/images";
import siteConfig, { type DoctorConfig } from "@/config/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const defaultProcessSteps = [
  { title: "Consultation", desc: "Discuss your goals and assess your needs in an unhurried setting." },
  { title: "3D Digital Imaging", desc: "Low-dose digital optical scanning for exact sub-millimeter modeling." },
  { title: "Itemized Co-Diagnosis", desc: "Review options, transparent timing, and itemized costs together." },
  { title: "Precision Treatment", desc: "Your procedure delivered with gentle comfort protocols and local anesthesia." },
  { title: "Follow-Up & Warranty", desc: "Check progress, answer questions, and protect your restorative warranty." }
];

const PROCESS_STEP_ICONS = [
  Calendar01Icon,
  MicroscopeIcon,
  Invoice01Icon,
  CheckmarkBadge01Icon,
  Shield01Icon,
];

const defaultBullets = [
  "Clear explanation of each clinical step",
  "Treatment plan tailored to your facial anatomy",
  "Low-dose 3D optical imaging for maximum precision",
  "Unhurried consultations with dedicated time for questions"
];

const defaultBenefits = [
  { title: "Modern Digital Technology", desc: "Digital intraoral scanners and computer-guided placement eliminate messy impressions.", icon: <MicroscopeIcon className="w-6 h-6" /> },
  { title: "Comfort-First Sanctuary", desc: "Private acoustic suites, noise-canceling headphones, and unhurried doctor pacing.", icon: <Sofa01Icon className="w-6 h-6" /> },
  { title: "100% Upfront Transparency", desc: "Every step and fee explained in plain English before any clinical work commences.", icon: <Invoice01Icon className="w-6 h-6" /> }
];

const defaultFaqs = [
  { q: "What happens at my first consultation?", a: "We sit down to listen to your goals, perform a low-dose digital scan, and review your options with zero pressure before scheduling any procedure." },
  { q: "How do I know which treatment approach is best for me?", a: "Your specialist will show you high-resolution 3D models of your teeth and discuss conservative vs. restorative paths so you make an empowered choice." },
  { q: "Can I review itemized costs before deciding?", a: "Always. We provide transparent, itemized estimates with all payment and insurance options reviewed upfront with no hidden fees." },
  { q: "What anesthesia or comfort amenities are available?", a: "We offer local anesthesia, gentle nitrous sedation, noise-canceling audio, and warm comfort blankets to ensure total physical ease." }
];

const SERVICE_SPECIALTY: Record<string, DoctorConfig["specialty"][]> = {
  "cosmetic-dentistry": ["Cosmetic"],
  "teeth-whitening": ["Cosmetic"],
  "dental-implants": ["Implants"],
  "root-canal": ["Endodontics"],
  orthodontics: ["Orthodontics"],
  "pediatric-dentistry": ["Pediatric"],
  "oral-surgery": ["General", "Implants"],
  "general-dentistry": ["General"]
};

const PROTOCOL_SPECS: Record<
  string,
  { duration: string; comfort: string; material: string; recovery: string }
> = {
  "cosmetic-dentistry": {
    duration: "60 - 90 mins",
    comfort: "Local / Light Sedation",
    material: "Swiss Ceramic Zirconia",
    recovery: "Immediate Normal Routine",
  },
  "dental-implants": {
    duration: "45 - 60 mins per tooth",
    comfort: "Computer-Guided Local",
    material: "Grade-5 Titanium & Ceramic",
    recovery: "Tailored Post-Op Plan",
  },
  "teeth-whitening": {
    duration: "45 mins single session",
    comfort: "Enamel-Safe Cold Laser",
    material: "Professional Bleaching Gel",
    recovery: "Immediate Results",
  },
  orthodontics: {
    duration: "30 mins check-in visits",
    comfort: "Custom-Fit Aligners",
    material: "Medical-Grade Thermoplastic",
    recovery: "Zero Disruption",
  },
  "general-dentistry": {
    duration: "45 mins full cleaning",
    comfort: "Ultrasonic Gentle Scaling",
    material: "BPA-Free Fluoride Sealants",
    recovery: "Routine Preventive Care",
  },
  "root-canal": {
    duration: "60 mins single appointment",
    comfort: "Precision Rotary System",
    material: "Biocompatible Gutta-Percha",
    recovery: "Monitored Healing",
  },
  "pediatric-dentistry": {
    duration: "30 - 45 mins kid-friendly",
    comfort: "Child-Friendly Gentle Care",
    material: "Non-Toxic Restorations",
    recovery: "Immediate Play",
  },
  "oral-surgery": {
    duration: "45 - 75 mins",
    comfort: "Sedation Options Available",
    material: "Medical Collagen Barriers",
    recovery: "Guided Post-Op Protocol",
  },
};

export function ServiceClient({ slug }: { slug: string }) {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();

  const heroImageRef = useRef(null);
  const timelineRef = useRef(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const service = siteConfig.services.find((s) => s.id === slug);
  const derivedTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const title = service?.title ?? derivedTitle;
  const bullets = service?.detailBullets?.length ? service.detailBullets : defaultBullets;
  const processSteps = service?.processSteps?.length ? service.processSteps : defaultProcessSteps;
  const benefits = service?.benefits?.length ? service.benefits : defaultBenefits;
  const faqs = service?.faq?.length ? service.faq : defaultFaqs;
  const relatedServices = siteConfig.services.filter((s) => s.id !== slug).slice(0, 3);
  const specialties = SERVICE_SPECIALTY[slug] ?? [];
  const careTeam = siteConfig.doctors
    .filter((doctor) => specialties.includes(doctor.specialty))
    .slice(0, 3);
  const heroImage =
    service?.heroImage ?? images.services[slug] ?? images.services["general-dentistry"];
  const protocol = PROTOCOL_SPECS[slug] || {
    duration: "45 - 60 mins",
    comfort: "Local Anesthesia",
    material: "Biocompatible Ceramic",
    recovery: "Standard Care Plan",
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      stepsRef.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
      return;
    }

    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        yPercent: 9,
        ease: "none",
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    if (timelineRef.current && stepsRef.current.length > 0) {
      gsap.fromTo(
        stepsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [slug]);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  return (
    <div className="bg-background min-h-screen pt-20 sm:pt-24 pb-0 overflow-x-clip">

      {/* 1. Hero Section with Double-Bezel Image Framing */}
      <section className="container mx-auto px-4 md:px-8 pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold mb-2">
                {service?.category ?? "Specialist Care"}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground leading-tight">
                {service?.detailTitle ? `${service.detailTitle} — ` : "Advanced "}
                <span className="text-primary">{title}</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {service?.detailSubtitle
                  ? `${service.detailSubtitle} — delivered with our signature unhurried comfort.`
                  : `Carefully planned ${title.toLowerCase()} procedures tailored to your anatomy, personal comfort goals, and long-term oral health.`}
              </p>
            </div>

            <ul className="space-y-2.5 sm:space-y-3">
              {bullets.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/90 font-medium text-xs sm:text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <CheckmarkBadge01Icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Button Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                variant="cta"
                onClick={openBooking}
                className="w-full sm:w-auto"
              >
                <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{siteConfig.hero.ctaTextPlain}</span>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <a href={`tel:${siteConfig.contact.phone}`}>
                  <Call02Icon className="size-4" aria-hidden="true" />
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Double-Bezel Image Showcase */}
          <div className="p-2 sm:p-2.5 rounded-[2.5rem] bg-muted/40 border border-border/80 shadow-2xl">
            <div className="relative h-[340px] sm:h-[460px] lg:h-[520px] rounded-[calc(2.5rem-0.5rem)] overflow-hidden shadow-lg">
              <div className="absolute inset-0 z-0 bg-muted" ref={heroImageRef}>
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
              </div>

              {/* Bottom Metrics Bar */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 backdrop-blur-md bg-card/90 border border-border/80 p-3 sm:p-5 rounded-2xl shadow-xl z-10 grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-border">
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold font-heading text-foreground">
                    {reduceMotion ? `${siteConfig.clinic.happyPatients}+` : <CountUp end={siteConfig.clinic.happyPatients} duration={2} separator="," suffix="+" enableScrollSpy />}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold font-heading text-foreground">
                    {reduceMotion ? `${siteConfig.clinic.treatmentsCompleted}+` : <CountUp end={siteConfig.clinic.treatmentsCompleted} duration={2} suffix="+" enableScrollSpy />}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">Procedures</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold font-heading text-foreground">
                    {reduceMotion ? `${siteConfig.clinic.yearsExperience}+` : <CountUp end={siteConfig.clinic.yearsExperience} duration={2} suffix="+" enableScrollSpy />}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">Years Practice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tactile Clinical Protocol Specification Bar */}
      <section className="border-y border-border/60 bg-card py-6 sm:py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-3 sm:p-4 rounded-2xl bg-muted/40 border border-border/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Clock01Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Duration</p>
                <p className="text-xs sm:text-sm font-bold text-foreground truncate">{protocol.duration}</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-muted/40 border border-border/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Shield01Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Comfort Standard</p>
                <p className="text-xs sm:text-sm font-bold text-foreground truncate">{protocol.comfort}</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-muted/40 border border-border/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Shield01Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Biocompatibility</p>
                <p className="text-xs sm:text-sm font-bold text-foreground truncate">{protocol.material}</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-muted/40 border border-border/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <CheckmarkBadge01Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Recovery Pace</p>
                <p className="text-xs sm:text-sm font-bold text-foreground truncate">{protocol.recovery}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Treatment Process Timeline (Consistent Stepper Architecture) */}
      <section className="py-14 sm:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-foreground mb-3 leading-tight">
              Your Treatment Process<span className="italic font-serif text-primary">.</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Five clear stages designed to ensure predictable, unhurried, and comfortable clinical care.
            </p>
          </div>

          {/* Desktop 5-Column Stepper with Connected Lines Matching Patient Journey */}
          <div className="relative pt-4 sm:pt-6" ref={timelineRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 relative z-10">
              {processSteps.map((step, index) => {
                const isFilled = index <= activeProcessStep;
                const isCurrent = index === activeProcessStep;
                const StepIcon = PROCESS_STEP_ICONS[index % PROCESS_STEP_ICONS.length];

                return (
                  <div
                    key={step.title}
                    onMouseEnter={() => setActiveProcessStep(index)}
                    onFocus={() => setActiveProcessStep(index)}
                    onClick={() => setActiveProcessStep(index)}
                    tabIndex={0}
                    className="group relative flex flex-col justify-between focus:outline-none cursor-pointer p-1 rounded-xl"
                  >
                    <div>
                      {/* Node Circle & Stepper Line that starts directly from this circle */}
                      <div className="relative flex items-center mb-6">
                        <motion.div
                          animate={{
                            scale: isCurrent ? 1.08 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 22 }}
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 z-10 relative ring-4 ring-background",
                            isFilled
                              ? "bg-primary text-white shadow-lg shadow-primary/30"
                              : "bg-card text-muted-foreground border border-border/80 shadow-sm group-hover:ring-primary/30 group-hover:border-primary/50"
                          )}
                        >
                          <StepIcon
                            className={cn(
                              "w-5 h-5 transition-colors",
                              isFilled ? "text-white" : "text-slate-700 dark:text-slate-300"
                            )}
                          />
                        </motion.div>

                        {/* Stepper line: Starts directly from the right edge of this circle to the next circle */}
                        {index < processSteps.length - 1 && (
                          <div
                            className="hidden lg:block absolute left-12 right-[-1.5rem] lg:right-[-2rem] top-1/2 -translate-y-1/2 h-[2px] bg-border/70 pointer-events-none"
                            aria-hidden="true"
                          >
                            <div
                              className={cn(
                                "h-full bg-primary shadow-[0_0_8px_rgba(15,118,110,0.5)] transition-all duration-300 ease-out",
                                index < activeProcessStep ? "w-full" : "w-0"
                              )}
                            />
                          </div>
                        )}
                      </div>

                      {/* Step Title */}
                      <h3
                        className={cn(
                          "font-serif text-lg lg:text-xl font-medium tracking-tight mb-2 transition-colors duration-200",
                          isCurrent ? "text-primary font-semibold" : "text-foreground group-hover:text-primary"
                        )}
                      >
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-muted-foreground text-xs sm:text-[13px] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Micro-protocol tag at bottom */}
                    <span className="text-[10px] text-muted-foreground/80 font-mono tracking-wider uppercase mt-5 block font-semibold">
                      Phase {index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefits Section (Double-Bezel Architecture) */}
      <section className="py-14 sm:py-24 bg-card relative overflow-hidden border-t border-border/60">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-3 leading-tight">
              Why Choose Us for {title}?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Specialist clinicians, advanced digital technology, and a dedicated comfort-first environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-2 rounded-3xl bg-muted/40 border border-border/70 shadow-sm flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <div className="p-6 sm:p-8 rounded-[calc(1.5rem-2px)] bg-background border border-border/60 flex flex-col justify-between flex-1">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Section (Double-Bezel Accordion) */}
      <section className="py-14 sm:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-foreground mb-3 leading-tight">
              Frequently Asked Questions.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">Everything you need to know about {title.toLowerCase()} before your visit.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-1 rounded-2xl bg-muted/40 border border-border/60 shadow-sm overflow-hidden">
                <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    aria-expanded={activeFaq === i}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    <span className="text-base sm:text-lg font-bold text-foreground leading-snug">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ml-4 ${activeFaq === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`} aria-hidden="true">
                      {activeFaq === i ? <MinusSignIcon className="w-4 h-4" /> : <PlusSignIcon className="w-4 h-4" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 sm:p-6 pt-0 text-muted-foreground leading-relaxed text-xs sm:text-sm border-t border-border/40 mt-1">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Related Services */}
      <section className="py-12 sm:py-24 bg-card border-t border-border/60">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold font-heading text-foreground mb-3 leading-tight">Explore Related Care</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Complementary treatments often considered alongside {title}.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {relatedServices.map((related) => (
              <div key={related.id} className="p-1.5 sm:p-2 rounded-3xl bg-muted/40 border border-border/70 shadow-sm flex flex-col group hover:-translate-y-1 transition-all duration-300">
                <Link
                  href={`/services/${related.id}`}
                  className="rounded-[calc(1.5rem-2px)] p-6 bg-background border border-border/60 hover:shadow-lg flex flex-col justify-between flex-1"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {related.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">{related.category}</span>
                    <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{related.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{related.description}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary mt-auto inline-flex items-center gap-1.5">
                    <span>View details</span>
                    <ArrowRight01Icon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Clinician Tie-in */}
      {careTeam.length > 0 && (
        <section className="py-12 sm:py-24 bg-background border-t border-border/60">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-3 leading-tight">Meet Your Care Team</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Specialist clinicians dedicated to {title.toLowerCase()} and related restorative care.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {careTeam.map((doctor) => (
                <div key={doctor.id} className="p-1.5 sm:p-2 rounded-3xl bg-muted/40 border border-border/70 shadow-sm flex flex-col group hover:-translate-y-1 transition-all duration-300">
                  <Link
                    href={`/doctors/${doctor.id}`}
                    className="rounded-[calc(1.5rem-2px)] p-4 bg-card border border-border/60 hover:shadow-lg flex items-center gap-4 relative"
                  >
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-muted">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-0.5">{doctor.specialty}</p>
                      <h3 className="text-base font-heading font-bold text-foreground truncate group-hover:text-primary transition-colors">{doctor.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{doctor.role}</p>
                      <span className="text-xs font-semibold text-primary mt-1 inline-flex items-center gap-1">
                        View profile
                        <ArrowRight01Icon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Bottom CTA Banner */}
      <section className="relative py-16 sm:py-24 bg-secondary overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-secondary-foreground mb-4 sm:mb-6 leading-tight">
            Ready To Begin Your Care?
          </h2>
          <p className="text-base sm:text-lg text-secondary-foreground/80 mb-8 sm:mb-10 leading-relaxed font-normal">
            Schedule an unhurried consultation with our specialists to discuss your personalized treatment plan and transparent financing options.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              size="lg"
              variant="cta"
              onClick={openBooking}
              className="w-full sm:w-auto"
            >
              <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
              <span>{siteConfig.hero.ctaTextPlain}</span>
            </Button>
            <Button
              asChild
              variant="onDark"
              size="lg"
              className="w-full sm:w-auto"
            >
              <a href={`tel:${siteConfig.contact.phone}`}>
                <Call02Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>Call Clinic ({siteConfig.contact.phone})</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
