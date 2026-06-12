"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { 
  ArrowLeft01Icon, 
  StarIcon, 
  UserGroupIcon, 
  Clock01Icon, 
  CheckmarkBadge01Icon, 
  Calendar01Icon,
  Call02Icon,
  Location01Icon,
  QuoteDownIcon
} from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  { year: "2010", title: "DDS, Harvard School of Dental Medicine", desc: "Graduated with honors, focusing on restorative dentistry." },
  { year: "2013", title: "Specialization in Prosthodontics", desc: "Completed residency at Mayo Clinic." },
  { year: "2015", title: "Board Certification", desc: "American Board of Prosthodontics." },
  { year: "2020", title: "Fellowship Award", desc: "International Congress of Oral Implantologists." }
];

const expertise = [
  { name: "Dental Implants", percent: 98 },
  { name: "Cosmetic Dentistry", percent: 95 },
  { name: "Full Mouth Reconstruction", percent: 92 },
  { name: "General Dentistry", percent: 90 }
];

const testimonials = [
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

  const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  useEffect(() => {
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
  }, [slug]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28 pb-0 overflow-hidden">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-8 pt-8 lg:pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium">
                Chief Prosthodontist
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-slate-900 leading-tight">
                {name}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Specializing in advanced restorative and cosmetic dentistry, dedicated to creating perfect, healthy smiles with precision and care.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 py-4 border-y border-slate-200">
              <div>
                <div className="flex items-center gap-1 text-slate-900 font-bold text-xl">
                  <StarIcon className="w-5 h-5 fill-amber-400 text-amber-400" />
                  4.9
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-1">150+ Reviews</div>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <div className="flex items-center gap-1 text-slate-900 font-bold text-xl">
                  <UserGroupIcon className="w-5 h-5 text-teal-600" />
                  <CountUp end={5000} duration={2} suffix="+" />
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-1">Patients Treated</div>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <div className="flex items-center gap-1 text-slate-900 font-bold text-xl">
                  <Clock01Icon className="w-5 h-5 text-blue-600" />
                  <CountUp end={15} duration={2} suffix="+" />
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-1">Years Exp.</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={openBooking} size="lg" className="bg-[#0F172A] hover:bg-slate-800 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg">
                Book Appointment
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base font-semibold border-slate-200 hover:bg-slate-50 text-slate-900">
                Contact Office
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden bg-slate-200 shadow-2xl">
              <div className="absolute inset-0 z-0" ref={heroImageRef}>
                <Image 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop" 
                  alt={name}
                  fill
                  className="object-cover object-top scale-110"
                  priority
                />
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Story & Expertise Section */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Philosophy */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-heading text-slate-900 mb-6">Care Philosophy</h2>
                <div className="prose prose-lg text-slate-600">
                  <p className="mb-4">
                    "My approach to dentistry is rooted in the belief that a healthy smile is the foundation of overall well-being. I strive to provide care that is not only clinically exceptional but also incredibly compassionate."
                  </p>
                  <p>
                    Every patient is unique, and I take the time to deeply understand your goals, concerns, and history before designing a personalized treatment plan that perfectly fits your life.
                  </p>
                </div>
              </div>

              {/* Skill Bars */}
              <div className="pt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Clinical Expertise</h3>
                <div className="space-y-6">
                  {expertise.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                        <span>{skill.name}</span>
                        <span>{skill.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          ref={el => { if(el) barsRef.current[index] = el; }}
                          className="h-full bg-teal-500 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Credentials Timeline */}
            <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100">
              <h2 className="text-2xl font-bold font-heading text-slate-900 mb-8">Education & Credentials</h2>
              
              <div className="relative pl-8 border-l border-slate-200 space-y-10" ref={timelineRef}>
                {credentials.map((cred, index) => (
                  <div key={index} className="relative" ref={el => { if(el) credsRef.current[index] = el; }}>
                    <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-white border-4 border-teal-500"></div>
                    <div className="text-sm font-bold text-teal-600 mb-1">{cred.year}</div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{cred.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{cred.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials & Booking Grid */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Testimonials */}
            <div className="lg:col-span-8">
              <h2 className="text-3xl font-bold font-heading text-slate-900 mb-10">Patient Experiences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((t) => (
                  <Card key={t.id} className="bg-white rounded-3xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-8 flex flex-col h-full">
                      <QuoteDownIcon className="w-10 h-10 text-teal-100 mb-6" />
                      <p className="text-slate-600 italic mb-6 leading-relaxed">"{t.text}"</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="font-bold text-slate-900">{t.author}</div>
                        <div className="flex text-amber-400">
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
              <Card className="bg-[#0F172A] text-white border-0 rounded-3xl shadow-xl sticky top-32">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold font-heading mb-6">Schedule a Visit</h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4">
                      <Calendar01Icon className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">Availability</div>
                        <div className="text-slate-300 text-sm">Mon - Wed: 8am - 5pm</div>
                        <div className="text-slate-300 text-sm">Thu - Fri: 9am - 6pm</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Location01Icon className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">Location</div>
                        <div className="text-slate-300 text-sm">Main Clinic, Suite 100</div>
                      </div>
                    </div>
                  </div>

                  <Button onClick={openBooking} className="w-full bg-teal-500 hover:bg-teal-400 text-white rounded-full py-6 text-base font-semibold border-0">
                    Book with {name}
                  </Button>
                  
                  <div className="mt-4 text-center text-sm text-slate-400">
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
