"use client";

import { useRef } from "react";
import { ArrowRight01Icon, SparklesIcon, SmileIcon, Shield01Icon, Activity01Icon, Tick01Icon } from "hugeicons-react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Cosmetic Dentistry",
    description: "Transform your smile with premium veneers, bonding, and total smile makeovers.",
    icon: <SparklesIcon className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Dental Implants",
    description: "Permanent, natural-looking tooth replacements using state-of-the-art titanium implants.",
    icon: <Shield01Icon className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Teeth Whitening",
    description: "Professional whitening treatments for a brilliantly bright smile in just one visit.",
    icon: <Activity01Icon className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Orthodontics",
    description: "Clear aligners and modern braces for perfectly straight teeth without the metal look.",
    icon: <SmileIcon className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop"
  },
];

export function ServicesPreview() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".service-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-primary">
              Advanced Dental Solutions
            </h3>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center justify-center h-12 px-6 rounded-full border border-border bg-white hover:border-primary hover:bg-primary hover:text-white transition-all font-medium text-primary"
          >
            View All Services
            <ArrowRight01Icon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              className="service-card block group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6 border border-white/20 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                  {service.icon}
                </div>

                <h4 className="text-2xl font-heading font-bold text-white mb-3 drop-shadow-md">
                  {service.title}
                </h4>

                <p className="text-white/90 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden drop-shadow-sm font-medium">
                  {service.description}
                </p>

                <div className="flex items-center text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Learn more
                  <ArrowRight01Icon className="ml-2 w-4 h-4" />
                </div>
              </div>

              {/* Glassmorphism Spotlight Hover Border */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-3xl transition-colors duration-500 z-20 pointer-events-none mix-blend-overlay" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
