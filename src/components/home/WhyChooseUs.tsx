"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

gsap.registerPlugin(ScrollTrigger);

export function WhyChooseUs() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".feature-card", { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(".feature-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-12 sm:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--foreground) 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start">

          {/* Sticky Left Content */}
          <div className="lg:w-1/2 lg:sticky lg:top-32 space-y-4 lg:space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-3 md:mb-6">
                Excellence in Every Detail
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg mb-0 lg:mb-8 max-w-lg">
                Every part of your visit — from the room you wait in to the hands that treat you — is built around comfort, safety, and lasting results.
              </p>
            </div>

            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl hidden lg:block">
              <Image
                src={images.clinicInterior}
                alt="Modern Clinic Interior"
                fill
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-secondary/90 p-5 rounded-2xl text-white">
                <h3 className="text-xl font-bold font-heading mb-1">State of the Art Facility</h3>
                <p className="text-white/80 text-sm">Designed for your comfort and equipped with the latest dental technology.</p>
              </div>
            </div>
          </div>

          {/* Scrolling Right Content */}
          <div className="no-scrollbar -mx-4 px-4 pb-2 w-[calc(100%+2rem)] lg:w-1/2 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:w-full sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:w-1/2">
            {siteConfig.features.map((feature, index) => (
              <div
                key={index}
                className="feature-card group w-[72vw] max-w-[280px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink bg-card p-5 sm:p-6 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-3 sm:mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
