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
  QuoteDownIcon
} from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { images } from "@/config/images";
import siteConfig from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const defaultCredentials = [
  { year: "2010", title: "DDS, Harvard School of Dental Medicine", desc: "Graduated with honors, focusing on restorative dentistry." },
  { year: "2013", title: "Specialization in Prosthodontics", desc: "Completed residency at Mayo Clinic." },
  { year: "2015", title: "Board Certification", desc: "American Board of Prosthodontics." },
  { year: "2020", title: "Fellowship Award", desc: "International Congress of Oral Implantologists." }
];

const defaultExpertise = [
  { name: "Dental Implants", percent: 98 },
  { name: "Cosmetic Dentistry", percent: 95 },
  { name: "Full Mouth Reconstruction", percent: 92 },
  { name: "General Dentistry", percent: 90 }
];

const defaultTestimonials = [
  { id: 1, text: "The most painless and professional dental experience I've ever had. Truly exceptional care.", author: "Michael T.", rating: 5 },
  { id: 2, text: "My smile makeover completely changed my life. I can't stop smiling now!", author: "Sarah W.", rating: 5 },
  { id: 3, text: "Explains every step of the process clearly and makes you feel completely at ease.", author: "James L.", rating: 5 }
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
  const role = doctor?.role ?? "Chief Prosthodontist";
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
        yPercent: 15,
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
          stagger: 0.2,
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
    <div className="bg-background min-h-screen pt-20 sm:pt-28 pb-0 overflow-hidden">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 pt-4 sm:pt-8 lg:pt-16 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                {role}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground leading-tight">
                {name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {doctor?.heroDescription ??
                  "Specializing in advanced restorative and cosmetic dentistry, dedicated to creating perfect, healthy smiles with precision and care."}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 py-4 border-y border-border">
              <div>
                <div className="flex items-center gap-1 text-foreground font-bold text-xl">
                  <StarIcon className="w-5 h-5 fill-rating text-rating" />
                  {rating}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">{reviews}+ Reviews</div>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div>
                <div className="flex items-center gap-1 text-foreground font-bold text-xl">
                  <UserGroupIcon className="w-5 h-5 text-primary" />
                  <CountUp end={siteConfig.clinic.happyPatients} duration={2} suffix="+" />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Patients Treated</div>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div>
                <div className="flex items-center gap-1 text-foreground font-bold text-xl">
                  <Clock01Icon className="w-5 h-5 text-primary" />
                  <CountUp end={years} duration={2} suffix="+" />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Years Exp.</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={openBooking} size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 h-14 text-base font-semibold shadow-lg">
                Book Appointment
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-semibold border-border hover:bg-muted text-foreground">
                <Link href="/contact">Contact Office</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative h-[340px] sm:h-[480px] lg:h-[700px] rounded-3xl overflow-hidden bg-muted shadow-2xl">
              <div className="absolute inset-0 z-0" ref={heroImageRef}>
                <Image 
                  src={heroImage} 
                  alt={name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-top scale-110"
                  priority
                />
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Story & Expertise Section */}
      <section className="py-12 sm:py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Philosophy */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-heading text-foreground mb-6">Care Philosophy</h2>
                <div className="prose prose-lg text-muted-foreground">
                  <p className="mb-4">
                    &ldquo;{doctor?.philosophy ??
                      "My approach to dentistry is rooted in the belief that a healthy smile is the foundation of overall well-being. I strive to provide care that is not only clinically exceptional but also incredibly compassionate."}&rdquo;
                  </p>
                  <p>
                    Every patient is unique, and I take the time to deeply understand your goals, concerns, and history before designing a personalized treatment plan that perfectly fits your life.
                  </p>
                </div>
              </div>

              {/* Skill Bars */}
              <div className="pt-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Clinical Expertise</h3>
                <div className="space-y-6">
                  {expertise.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm font-medium text-foreground/90 mb-2">
                        <span>{skill.name}</span>
                        <span>{skill.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          ref={el => { if(el) barsRef.current[index] = el; }}
                          className="h-full bg-primary rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Credentials Timeline */}
            <div className="bg-muted p-8 md:p-10 rounded-3xl border border-border">
              <h2 className="text-2xl font-bold font-heading text-foreground mb-8">Education & Credentials</h2>
              
              <div className="relative pl-8 border-l border-border space-y-10" ref={timelineRef}>
                {credentials.map((cred, index) => (
                  <div key={index} className="relative" ref={el => { if(el) credsRef.current[index] = el; }}>
                    <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-card border-4 border-primary"></div>
                    <div className="text-sm font-bold text-primary mb-1">{cred.year}</div>
                    <h4 className="text-lg font-bold text-foreground mb-2">{cred.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{cred.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials & Booking Grid */}
      <section className="py-12 sm:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Testimonials */}
            <div className="lg:col-span-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-10">Patient Experiences</h2>
              <div className="no-scrollbar -mx-4 px-4 pb-2 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible">
                {testimonials.map((t) => (
                  <Card key={t.id} className="w-[82vw] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink bg-card rounded-3xl border-border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-8 flex flex-col h-full">
                      <QuoteDownIcon className="w-10 h-10 text-primary/10 mb-6" />
                      <p className="text-muted-foreground italic mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="font-bold text-foreground">{t.author}</div>
                        <div className="flex text-rating">
                          {[...Array(t.rating)].map((_, i) => (
                            <StarIcon key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Schedule / Booking Card */}
            <div className="lg:col-span-4">
              <Card className="bg-secondary text-secondary-foreground border-0 rounded-3xl shadow-xl sticky top-32">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold font-heading mb-6">Schedule a Visit</h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <Calendar01Icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">Availability</div>
                        <div className="text-secondary-foreground/80 text-sm whitespace-pre-line">{siteConfig.contact.hours}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Location01Icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">Location</div>
                        <div className="text-secondary-foreground/80 text-sm whitespace-pre-line">{siteConfig.contact.address}</div>
                      </div>
                    </div>
                  </div>

                  <Button onClick={openBooking} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-14 text-base font-semibold border-0">
                    Book with {name}
                  </Button>
                  
                  <div className="mt-4 text-center text-sm text-secondary-foreground/70">
                    Accepting new patients. Emergency slots available daily.
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
