"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import {
  StarIcon,
  UserGroupIcon,
  Clock01Icon,
  Calendar01Icon,
  Location01Icon,
  QuoteDownIcon,
  CheckmarkBadge01Icon,
  Call02Icon,
} from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { images } from "@/config/images";
import siteConfig from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const defaultCredentials = [
  { year: "2010", title: "DDS, Accredited School of Dental Medicine", desc: "Graduated with honors, focusing on restorative and aesthetic smile design." },
  { year: "2013", title: "Specialization in Prosthodontics", desc: "Completed 3-year advanced residency in full-arch rehabilitation." },
  { year: "2015", title: "Board Certification", desc: "Diplomate of the National Board of Prosthodontics." },
  { year: "2020", title: "Fellowship Award", desc: "Fellow of the International Dental Implantology Council." }
];

const defaultExpertise = [
  { name: "Dental Implants & Guided Surgery", percent: 98 },
  { name: "Cosmetic Veneers & Smile Makeovers", percent: 96 },
  { name: "Full Mouth Bio-Reconstruction", percent: 94 },
  { name: "Preventive Care & Diagnostics", percent: 90 }
];

const defaultTestimonials = [
  { id: 1, text: "The most painless and professional dental experience I've ever had. Truly exceptional care and compassion.", author: "Michael T.", rating: 5 },
  { id: 2, text: "My smile makeover completely changed my confidence. I can't stop smiling in photos now!", author: "Sarah W.", rating: 5 },
  { id: 3, text: "Explains every single step of the process with digital 3D scans. You feel completely in control and relaxed.", author: "James L.", rating: 5 }
];

export function DoctorClient({ slug }: { slug: string }) {
  const { openBooking } = useBooking();

  const heroImageRef = useRef(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef(null);
  const credsRef = useRef<(HTMLDivElement | null)[]>([]);

  const doctor = siteConfig.doctors.find((d) => d.id === slug);
  const derivedName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const name = doctor?.name ?? derivedName;
  const role = doctor?.role ?? "Chief Specialist";
  const rating = doctor?.rating ?? 4.9;
  const reviews = doctor?.reviews ?? 150;
  const years = Number.parseInt(doctor?.experience ?? "15", 10) || 15;
  const credentials = doctor?.credentials?.length ? doctor.credentials : defaultCredentials;
  const expertise = doctor?.expertise?.length ? doctor.expertise : defaultExpertise;
  const testimonials = doctor?.testimonials?.length ? doctor.testimonials : defaultTestimonials;
  const heroImage =
    doctor?.heroImage ?? images.doctors[slug] ?? images.doctors["dr-sarah-jenkins"];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      barsRef.current.forEach((bar, i) => {
        if (bar) bar.style.width = `${expertise[i].percent}%`;
      });
      credsRef.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
      return;
    }

    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    if (barsRef.current.length > 0) {
      barsRef.current.forEach((bar, i) => {
        if (bar) {
          gsap.fromTo(bar,
            { width: "0%" },
            {
              width: `${expertise[i].percent}%`,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 85%"
              }
            }
          );
        }
      });
    }

    if (timelineRef.current && credsRef.current.length > 0) {
      gsap.fromTo(
        credsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
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
  }, [slug, expertise]);

  return (
    <div className="bg-background min-h-screen pt-20 sm:pt-28 pb-0 overflow-x-clip">

      {/* 1. Hero Section */}
      <section className="container mx-auto px-4 md:px-8 pt-4 sm:pt-8 lg:pt-16 pb-12 sm:pb-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary font-semibold mb-2">
                {role}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground leading-tight">
                {name}
              </h1>
              {siteConfig.ui.showSampleContentNotices && doctor?.demo && (
                <span className="inline-flex w-fit items-center px-2.5 py-0.5 rounded-full bg-muted border border-border text-[11px] font-bold text-muted-foreground">
                  Sample Profile
                </span>
              )}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {doctor?.heroDescription ??
                  "Specializing in advanced restorative and cosmetic dentistry, dedicated to creating perfect, healthy smiles with precision, dignity, and gentle human care."}
              </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 py-4 border-y border-border/70">
              <div className="border-r border-border/70 pr-2 sm:pr-0">
                <div className="flex items-center gap-1 sm:gap-1.5 text-foreground font-bold text-base sm:text-xl">
                  <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-rating text-rating" aria-hidden="true" />
                  <span>{rating.toFixed(1)}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5">{reviews}+ Reviews</div>
              </div>
              <div className="border-r border-border/70 pr-2 sm:pr-0 pl-1 sm:pl-0">
                <div className="flex items-center gap-1 sm:gap-1.5 text-foreground font-bold text-base sm:text-xl">
                  <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  <CountUp end={siteConfig.clinic.happyPatients} duration={2} suffix="+" />
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5">Patients</div>
              </div>
              <div className="pl-1 sm:pl-0">
                <div className="flex items-center gap-1 sm:gap-1.5 text-foreground font-bold text-base sm:text-xl">
                  <Clock01Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  <CountUp end={years} duration={2} suffix="+" />
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5">{years} Yrs Exp</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                variant="cta"
                onClick={openBooking}
                className="w-full sm:w-auto"
              >
                <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>Book Appointment</span>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/contact">
                  <Call02Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span>Contact Office</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Double-Bezel Portrait Showcase */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="p-2 sm:p-2.5 rounded-[2.5rem] bg-muted/40 border border-border/80 shadow-2xl">
              <div className="relative h-[360px] sm:h-[480px] lg:h-[620px] rounded-[calc(2.5rem-0.5rem)] overflow-hidden bg-muted shadow-lg">
                <div className="absolute inset-0 z-0" ref={heroImageRef}>
                  <Image
                    src={heroImage}
                    alt={name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-top scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Philosophy & Credentials Section */}
      <section className="py-14 sm:py-24 bg-card border-y border-border/60">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Philosophy & Skill Bars */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-5xl font-bold font-heading text-foreground mb-4 leading-tight">
                  Care Philosophy.
                </h2>
                <div className="text-muted-foreground leading-relaxed text-sm sm:text-base space-y-4">
                  <p className="italic text-foreground/90 font-medium">
                    &ldquo;{doctor?.philosophy ??
                      "My approach to dentistry is rooted in the conviction that a healthy smile is foundational to human dignity and nervous system peace. I strive to provide care that pairs surgical micro-precision with radical empathy."}&rdquo;
                  </p>
                  <p>
                    Every patient has a unique anatomical journey. We take all the time needed to review 3D digital imaging together, discuss conservative options, and craft a personalized treatment plan with zero pressure.
                  </p>
                </div>
              </div>

              {/* Clinical Expertise Skill Bars */}
              <div className="pt-6 border-t border-border/60">
                <h3 className="text-xl font-bold font-heading text-foreground mb-6">Specialist Expertise</h3>
                <div className="space-y-5">
                  {expertise.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-xs sm:text-sm font-semibold text-foreground/90 mb-2">
                        <span>{skill.name}</span>
                        <span className="text-primary">{skill.percent}% Clinical Focus</span>
                      </div>
                      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                        <div
                          ref={el => { if (el) barsRef.current[index] = el; }}
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Credentials Stepper (Double-Bezel Architecture) */}
            <div className="p-2 sm:p-2.5 rounded-[2.5rem] bg-muted/40 border border-border/80 shadow-sm">
              <div className="rounded-[calc(2.5rem-0.5rem)] bg-card p-6 sm:p-10 border border-border/60">
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8">
                  Education &amp; Credentials
                </h3>

                <div className="relative space-y-8" ref={timelineRef}>
                  {/* Continuous Vertical Connecting Line */}
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-primary/25 -translate-x-1/2" aria-hidden="true" />

                  {credentials.map((cred, index) => (
                    <div key={index} className="relative flex items-start gap-4 sm:gap-5 group" ref={el => { if (el) credsRef.current[index] = el; }}>
                      {/* Stepper node centered directly on the line */}
                      <div className="w-8 h-8 rounded-full bg-card border-2 border-primary text-primary flex items-center justify-center ring-4 ring-card shadow-sm shrink-0 z-10 transition-transform duration-200 group-hover:scale-110">
                        <CheckmarkBadge01Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <span className="text-xs font-mono font-bold text-primary tracking-wider uppercase block mb-1">{cred.year}</span>
                        <h4 className="text-base sm:text-lg font-bold font-heading text-foreground mb-1 leading-snug">{cred.title}</h4>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{cred.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Testimonials & Double-Bezel Sticky Booking Card */}
      <section className="py-14 sm:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Reviews Grid */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">Direct Feedback</span>
                  <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground">Patient Experiences</h2>
                </div>
                {siteConfig.ui.showSampleContentNotices && doctor?.demo && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground">
                    Sample Reviews
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-1.5 rounded-3xl bg-muted/40 border border-border/70 shadow-sm flex flex-col group hover:-translate-y-1 transition-all duration-300">
                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-card rounded-[calc(1.5rem-2px)] border border-border/60">
                      <div>
                        <QuoteDownIcon className="w-8 h-8 text-primary/20 mb-4" aria-hidden="true" />
                        <p className="text-muted-foreground text-xs sm:text-sm italic mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border/60 mt-auto">
                        <div className="font-bold text-xs sm:text-sm text-foreground">{t.author}</div>
                        <div className="flex text-rating" role="img" aria-label={`${t.rating} out of 5 stars`}>
                          {[...Array(t.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Double-Bezel Booking Card */}
            <div className="lg:col-span-4">
              <div className="p-2 rounded-3xl bg-muted/40 border border-border/80 shadow-xl sticky top-28">
                <div className="rounded-[calc(1.5rem-2px)] bg-secondary text-secondary-foreground p-6 sm:p-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-1">
                    Direct Scheduling
                  </span>
                  <h3 className="text-2xl font-bold font-heading mb-6">Schedule a Visit</h3>

                  <div className="space-y-5 mb-8">
                    <div className="flex items-start gap-4">
                      <Calendar01Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-xs sm:text-sm mb-0.5">Availability</div>
                        <div className="text-secondary-foreground/80 text-xs whitespace-pre-line">{siteConfig.contact.hours}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Location01Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-xs sm:text-sm mb-0.5">Location</div>
                        <div className="text-secondary-foreground/80 text-xs whitespace-pre-line">{siteConfig.contact.address}</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    variant="cta"
                    onClick={openBooking}
                    className="w-full"
                  >
                    <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
                    <span>Book with {name}</span>
                  </Button>

                  <div className="mt-4 text-center text-[11px] text-secondary-foreground/70">
                    Accepting new patients. Emergency slots reserved daily.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
