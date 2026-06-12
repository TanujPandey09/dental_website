"use client";

import { useRef } from "react";
import { ArrowRight01Icon, StarIcon, Location01Icon, Calendar01Icon } from "hugeicons-react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/BookingContext";

gsap.registerPlugin(ScrollTrigger);

const doctors = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Lead Cosmetic Dentist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    qualifications: "DDS, NYU College of Dentistry",
    experience: "15+ Years Experience",
    specializations: ["Veneers", "Smile Makeovers", "Bonding"],
    rating: 5.0,
    reviews: 124
  },
  {
    name: "Dr. Michael Chen",
    role: "Implant Specialist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    qualifications: "DMD, Harvard School of Dental Medicine",
    experience: "12+ Years Experience",
    specializations: ["Dental Implants", "Oral Surgery", "Bone Grafting"],
    rating: 4.9,
    reviews: 89
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Orthodontist",
    image: "https://plus.unsplash.com/premium_photo-1672760399926-bdbd01b89937?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RHIlMjBFbWlseSUyMFJvZHJ1Z3VlenxlbnwwfHwwfHx8MA%3D%3D",
    qualifications: "DDS, UCLA School of Dentistry",
    experience: "10+ Years Experience",
    specializations: ["Invisalign", "Clear Braces", "TMJ Treatment"],
    rating: 5.0,
    reviews: 156
  }
];

export function MeetDentists() {
  const container = useRef<HTMLElement>(null);
  const { openBooking } = useBooking();

  useGSAP(() => {
    gsap.fromTo(".doctor-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Our Team</h2>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-primary">
              World-Class Specialists
            </h3>
          </div>
          <Link
            href="/doctors"
            className="group inline-flex items-center justify-center h-12 px-6 rounded-full border border-border bg-white hover:border-primary hover:bg-primary hover:text-white transition-all font-medium text-primary"
          >
            Meet Entire Team
            <ArrowRight01Icon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => {
            const slug = doctor.name.toLowerCase().replace(/dr\.\s+/g, 'dr-').replace(/\s+/g, '-');
            return (
              <div
                key={index}
                className="doctor-card group bg-background rounded-3xl overflow-hidden border border-border/50 hover:shadow-2xl hover:border-accent/30 transition-all duration-500 relative"
              >
                <Link href={`/doctors/${slug}`} className="absolute inset-0 z-10" />
              {/* Image Container */}
              <div className="relative h-[360px] overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-60" />

                {/* Floating Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <StarIcon className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-bold text-primary">{doctor.rating}</span>
                  <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                </div>

                {/* Name & Role (Always visible) */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform group-hover:-translate-y-4 transition-transform duration-500">
                  <h4 className="text-2xl font-heading font-bold mb-1">{doctor.name}</h4>
                  <p className="text-white/80 font-medium">{doctor.role}</p>
                </div>
              </div>

              {/* Slide-up Info Section */}
              <div className="p-6 bg-white absolute bottom-0 left-0 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out border-t border-border">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Location01Icon className="w-4 h-4 text-accent" />
                    <span>{doctor.qualifications}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar01Icon className="w-4 h-4 text-accent" />
                    <span>{doctor.experience}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {doctor.specializations.map((spec, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1 bg-accent/10 text-accent rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 relative z-20">
                  <Link href={`/doctors/${slug}`} className="flex-1">
                    <Button variant="outline" className="w-full h-11 border-primary text-primary hover:bg-primary/5 bg-white">
                      View Details
                    </Button>
                  </Link>
                  <Button className="flex-1 h-11 shadow-md shadow-primary/20" onClick={(e) => { e.stopPropagation(); openBooking(); }}>
                    Book
                  </Button>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}
