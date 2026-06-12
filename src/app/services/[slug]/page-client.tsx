"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  MinusSignIcon,
  ArrowLeft01Icon
} from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { id: 1, title: "Consultation", desc: "Initial assessment and 3D scanning." },
  { id: 2, title: "Assessment", desc: "Detailed treatment planning." },
  { id: 3, title: "Treatment Plan", desc: "Review options and timeline." },
  { id: 4, title: "Procedure", desc: "Expert surgical placement." },
  { id: 5, title: "Recovery", desc: "Follow-up and final restoration." }
];

const faqs = [
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

  useEffect(() => {
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

  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28 pb-0 overflow-hidden">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 pt-8 lg:pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium">
                <CheckmarkBadge01Icon className="w-4 h-4" />
                Premium Care
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-slate-900 leading-tight">
                Advanced <span className="text-primary">{title}</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Restore your smile's natural beauty and function with our state-of-the-art {title.toLowerCase()} procedures. Experience permanent, comfortable, and natural-looking results.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                "Minimally invasive techniques",
                "Advanced 3D imaging technology",
                "Lifetime warranty on materials",
                "Flexible financing available"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                    <CheckmarkBadge01Icon className="w-4 h-4" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={openBooking} size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20">
                Book Consultation
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base font-semibold border-slate-200 hover:bg-slate-50 text-slate-900">
                <Call02Icon className="w-5 h-5 mr-2" />
                (555) 123-4567
              </Button>
            </div>
          </div>

          <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 z-0 bg-slate-200" ref={heroImageRef}>
              <Image 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop" 
                alt={title}
                fill
                className="object-cover scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md border border-white/40 p-6 rounded-2xl shadow-xl z-10 grid grid-cols-3 gap-4 divide-x divide-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  <CountUp end={98} duration={2} suffix="%" enableScrollSpy />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  <CountUp end={5000} duration={2} suffix="+" enableScrollSpy />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">Procedures</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  <CountUp end={15} duration={2} suffix="+" enableScrollSpy />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">Years Exp.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="container mx-auto px-4 md:px-8 flex flex-wrap justify-center gap-12 md:gap-24 opacity-70">
          <div className="flex items-center gap-3">
            <Shield01Icon className="w-8 h-8 text-slate-800" />
            <div>
              <div className="font-bold text-slate-900">FDA Approved</div>
              <div className="text-sm text-slate-500">Premium Materials</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award01Icon className="w-8 h-8 text-slate-800" />
            <div>
              <div className="font-bold text-slate-900">Top Rated Clinic</div>
              <div className="text-sm text-slate-500">Excellence Award 2025</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckmarkBadge01Icon className="w-8 h-8 text-slate-800" />
            <div>
              <div className="font-bold text-slate-900">Board Certified</div>
              <div className="text-sm text-slate-500">Expert Specialists</div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Process Timeline */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">Your Journey to a Perfect Smile</h2>
            <p className="text-slate-600">We ensure a seamless, transparent, and comfortable process from your first consultation to your final result.</p>
          </div>

          <div className="relative" ref={timelineRef}>
            <div className="hidden lg:block absolute top-[45px] left-0 right-0 h-0.5 bg-slate-200 z-0"></div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className="relative z-10 flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-4 lg:text-center"
                  ref={(el) => { if (el) stepsRef.current[index] = el; }}
                >
                  <div className="w-24 h-24 lg:w-[90px] lg:h-[90px] rounded-full bg-white border-4 border-slate-50 flex items-center justify-center shadow-lg text-2xl font-bold text-teal-600 shrink-0">
                    0{step.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">Why Choose Us for {title}?</h2>
            <p className="text-slate-600">Experience world-class dental care with cutting-edge technology and unparalleled comfort.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Advanced Technology", desc: "We use 3D CBCT scanners and digital impressions for pinpoint accuracy.", icon: Shield01Icon },
              { title: "Pain-Free Experience", desc: "Our modern anesthesia techniques ensure you feel absolutely nothing.", icon: Award01Icon },
              { title: "Lifetime Warranty", desc: "We stand behind our work with comprehensive warranties on all implants.", icon: CheckmarkBadge01Icon }
            ].map((benefit, i) => (
              <Card key={i} className="group rounded-3xl bg-white border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 group-hover:bg-teal-50 transition-all duration-300">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</CardTitle>
                  <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Everything you need to know about the procedure and recovery.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-slate-900">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeFaq === i ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {activeFaq === i ? <MinusSignIcon className="w-5 h-5" /> : <PlusSignIcon className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed">
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
      <section className="relative py-24 bg-[#0F172A] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-teal-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">Ready To Restore Your Smile?</h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            Schedule a comprehensive consultation with our specialists to discuss your personalized treatment plan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={openBooking} size="lg" className="bg-teal-500 hover:bg-teal-400 text-white rounded-full px-8 py-6 text-base font-semibold border-0">
              <Calendar01Icon className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base font-semibold border-slate-600 text-white hover:bg-white/10 hover:text-white">
              <Call02Icon className="w-5 h-5 mr-2" />
              Call Clinic
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
