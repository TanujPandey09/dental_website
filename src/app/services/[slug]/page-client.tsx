"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { 
  CheckmarkBadge01Icon, 
  Shield01Icon, 
  Award01Icon, 
  Call02Icon, 
  Calendar01Icon,
  PlusSignIcon,
  MinusSignIcon
} from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { images } from "@/config/images";
import siteConfig from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { id: 1, title: "Consultation", desc: "Initial assessment and 3D scanning." },
  { id: 2, title: "Assessment", desc: "Detailed treatment planning." },
  { id: 3, title: "Treatment Plan", desc: "Review options and timeline." },
  { id: 4, title: "Procedure", desc: "Expert surgical placement." },
  { id: 5, title: "Recovery", desc: "Follow-up and final restoration." }
];

const defaultBullets = [
  "Minimally invasive techniques",
  "Advanced 3D imaging technology",
  "Lifetime warranty on materials",
  "Flexible financing available"
];

const defaultBenefits = [
  { title: "Advanced Technology", desc: "We use 3D CBCT scanners and digital impressions for pinpoint accuracy.", icon: <Shield01Icon className="w-6 h-6" /> },
  { title: "Pain-Free Experience", desc: "Our modern anesthesia techniques ensure you feel absolutely nothing.", icon: <Award01Icon className="w-6 h-6" /> },
  { title: "Lifetime Warranty", desc: "We stand behind our work with comprehensive warranties on all implants.", icon: <CheckmarkBadge01Icon className="w-6 h-6" /> }
];

const defaultFaqs = [
  { q: "Does the procedure hurt?", a: "We use advanced local anesthesia and offer sedation options to ensure a completely pain-free experience during your procedure." },
  { q: "How long is the recovery time?", a: "Most patients return to work the next day. Full osseointegration takes 3-6 months, during which we provide a temporary aesthetic solution." },
  { q: "Are dental implants permanent?", a: "With proper care, dental implants are designed to last a lifetime, making them the most durable tooth replacement option available." },
  { q: "Am I a candidate for implants?", a: "Most adults with good general health and adequate bone density are candidates. We'll evaluate your specific case during the consultation." }
];

export function ServiceClient({ slug }: { slug: string }) {
  const { openBooking } = useBooking();

  const heroImageRef = useRef(null);
  const timelineRef = useRef(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const service = siteConfig.services.find((s) => s.id === slug);
  const derivedTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const title = service?.title ?? derivedTitle;
  const bullets = service?.detailBullets?.length ? service.detailBullets : defaultBullets;
  const benefits = service?.benefits?.length ? service.benefits : defaultBenefits;
  const faqs = service?.faq?.length ? service.faq : defaultFaqs;
  const heroImage =
    service?.heroImage ?? images.services[slug] ?? images.services["general-dentistry"];

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
        yPercent: 20,
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
  }, [slug]);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="bg-background min-h-screen pt-20 sm:pt-28 pb-0 overflow-hidden">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 pt-4 sm:pt-8 lg:pt-16 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <CheckmarkBadge01Icon className="w-4 h-4" />
                Premium Care
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground leading-tight">
                Advanced <span className="text-primary">{title}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {service?.detailSubtitle
                  ? `${service.detailSubtitle} — delivered with our signature comfort-first care.`
                  : `Restore your smile\u2019s natural beauty and function with our state-of-the-art ${title.toLowerCase()} procedures. Experience permanent, comfortable, and natural-looking results.`}
              </p>
            </div>

            <ul className="space-y-3">
              {bullets.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground/90 font-medium">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <CheckmarkBadge01Icon className="w-4 h-4" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={openBooking} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-14 text-base font-semibold shadow-lg shadow-primary/20">
                Book Consultation
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-semibold border-border hover:bg-muted text-foreground">
                <a href={`tel:${siteConfig.contact.phone}`}>
                  <Call02Icon className="w-5 h-5 mr-2" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
          </div>

          <div className="relative h-[340px] sm:h-[480px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 z-0 bg-muted" ref={heroImageRef}>
              <Image 
                src={heroImage} 
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-card/90 backdrop-blur-md border border-border/50 p-3 sm:p-6 rounded-2xl shadow-xl z-10 grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-border">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-foreground">
                  <CountUp end={98} duration={2} suffix="%" enableScrollSpy />
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5 sm:mt-1 uppercase tracking-wider">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-foreground">
                  <CountUp end={siteConfig.clinic.treatmentsCompleted} duration={2} suffix="+" enableScrollSpy />
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5 sm:mt-1 uppercase tracking-wider">Procedures</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-foreground">
                  <CountUp end={siteConfig.clinic.yearsExperience} duration={2} suffix="+" enableScrollSpy />
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5 sm:mt-1 uppercase tracking-wider">Years Exp.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="container mx-auto px-4 md:px-8 flex flex-wrap justify-center gap-12 md:gap-24 opacity-70">
          <div className="flex items-center gap-3">
            <Shield01Icon className="w-8 h-8 text-foreground" />
            <div>
              <div className="font-bold text-foreground">FDA Approved</div>
              <div className="text-sm text-muted-foreground">Premium Materials</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award01Icon className="w-8 h-8 text-foreground" />
            <div>
              <div className="font-bold text-foreground">Top Rated Clinic</div>
              <div className="text-sm text-muted-foreground">Excellence Award 2025</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckmarkBadge01Icon className="w-8 h-8 text-foreground" />
            <div>
              <div className="font-bold text-foreground">Board Certified</div>
              <div className="text-sm text-muted-foreground">Expert Specialists</div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Process Timeline */}
      <section className="py-12 sm:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-foreground mb-3 sm:mb-4">Your Journey to a Perfect Smile</h2>
            <p className="text-muted-foreground text-sm sm:text-base">We ensure a seamless, transparent, and comfortable process from your first consultation to your final result.</p>
          </div>

          <div className="relative" ref={timelineRef}>
            <div className="hidden lg:block absolute top-[45px] left-0 right-0 h-0.5 bg-border z-0"></div>
            <div className="no-scrollbar -mx-4 px-4 pb-2 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 lg:mx-0 lg:px-0 lg:pb-0 lg:grid lg:grid-cols-5 lg:gap-8 lg:overflow-visible">
              {processSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className="relative z-10 w-[72vw] max-w-[260px] shrink-0 snap-start lg:w-auto lg:max-w-none lg:shrink flex flex-col items-center text-center p-6 rounded-3xl bg-card border border-border lg:bg-transparent lg:border-0 lg:p-0 shadow-sm lg:shadow-none"
                  ref={(el) => { if (el) stepsRef.current[index] = el; }}
                >
                  <div className="w-16 h-16 lg:w-[90px] lg:h-[90px] rounded-full bg-card border-4 border-border flex items-center justify-center shadow-lg text-xl lg:text-2xl font-bold text-primary shrink-0 mb-4 lg:mb-0">
                    0{step.id}
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-foreground mb-1 lg:mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/10 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-foreground mb-3 sm:mb-4">Why Choose Us for {title}?</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Experience world-class dental care with cutting-edge technology and unparalleled comfort.</p>
          </div>

          <div className="no-scrollbar -mx-4 px-4 pb-2 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
            {benefits.map((benefit, i) => (
              <Card key={i} className="group w-[78vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink rounded-3xl bg-card border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{benefit.title}</CardTitle>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-foreground mb-3 sm:mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Everything you need to know about the procedure and recovery.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  aria-expanded={activeFaq === i}
                  aria-controls={`faq-panel-${i}`}
                  className="w-full flex items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                >
                  <span className="text-lg font-bold text-foreground">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeFaq === i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`} aria-hidden="true">
                    {activeFaq === i ? <MinusSignIcon className="w-5 h-5" /> : <PlusSignIcon className="w-5 h-5" />}
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
                      <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-24 bg-secondary overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-secondary-foreground mb-4 sm:mb-6">Ready To Restore Your Smile?</h2>
          <p className="text-base sm:text-lg text-secondary-foreground/80 mb-6 sm:mb-10 leading-relaxed">
            Schedule a comprehensive consultation with our specialists to discuss your personalized treatment plan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={openBooking} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-14 text-base font-semibold border-0">
              <Calendar01Icon className="w-5 h-5 mr-2" aria-hidden="true" />
              Book Appointment
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-semibold border-secondary-foreground/30 text-secondary-foreground bg-transparent hover:bg-secondary-foreground/10 hover:text-secondary-foreground">
              <a href={`tel:${siteConfig.contact.phone}`}>
                <Call02Icon className="w-5 h-5 mr-2" aria-hidden="true" />
                Call Clinic
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
