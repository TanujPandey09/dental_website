"use client";

import { useRef } from "react";
import { ArrowRight01Icon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import siteConfig from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

export function ServicesPreview() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".service-card", { opacity: 1, y: 0 });
      return;
    }
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

  const serviceLinks = siteConfig.services.map((service) => ({
    ...service,
    slug: service.id,
  }));

  return (
    <section ref={container} className="py-12 sm:py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6 mb-6 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
              Advanced Dental Solutions
            </h2>
            <p className="text-muted-foreground mt-3 sm:mt-4 text-base sm:text-lg max-w-xl">
              Preventive care to full-mouth rehabilitation, delivered by specialists using modern techniques.
            </p>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center justify-center h-12 px-6 rounded-full border border-border bg-card hover:border-primary hover:bg-primary hover:text-primary-foreground transition-[color,background-color,border-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-medium text-primary"
          >
            View All Services
            <ArrowRight01Icon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="no-scrollbar -mx-4 px-4 pb-2 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible">
          {serviceLinks.map((service) => (
            <Link
              href={`/services/${service.slug}`}
              key={service.id}
              className="service-card block group relative h-[340px] w-[76vw] max-w-[300px] shrink-0 snap-start md:h-[420px] md:w-auto md:max-w-none md:shrink rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-8">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 flex items-center justify-center text-white mb-4 md:mb-6 border border-white/25 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-heading font-bold text-white mb-3 drop-shadow-md">
                  {service.title}
                </h3>

                <p className="text-white/90 text-sm leading-relaxed mb-4 md:mb-6 line-clamp-3 md:line-clamp-none drop-shadow-sm font-medium">
                  {service.description}
                </p>

                <div className="flex items-center text-sm font-semibold text-white">
                  Learn more
                  <ArrowRight01Icon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Glassmorphism Spotlight Hover Border */}
              <div className="absolute inset-0 border-2 border-white/0 rounded-3xl transition-colors duration-500 z-20 pointer-events-none mix-blend-overlay" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}