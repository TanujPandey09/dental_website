"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import { StarIcon, QuoteUpIcon, ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import siteConfig from "@/config/site";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const x = useMotionValue(0);

  const scrollByCard = (direction: 1 | -1) => {
    const card = containerRef.current?.querySelector<HTMLElement>("[data-testimonial-card]");
    const gap = 32;
    const step = (card?.offsetWidth ?? 420) + gap;
    const current = x.get();
    const next = Math.max(-width, Math.min(0, current - direction * step));
    animate(x, next, { type: "spring", stiffness: 300, damping: 35 });
  };

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".testimonial-header", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".testimonial-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const testimonialLinks = siteConfig.testimonials.map((t) => ({
    ...t,
    slug: t.name.toLowerCase().replace(/ /g, "-").replace(/'/g, "-"),
  }));

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-secondary text-secondary-foreground overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-8 sm:mb-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 testimonial-header">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white leading-tight">
              Stories of Confident, <br className="hidden sm:inline" />
              Healthy Smiles.
            </h2>
            <p className="text-white/75 mt-3 sm:mt-4 text-base sm:text-lg max-w-xl leading-relaxed">
              Real patients, genuine feedback, and life-changing smile transformations across cosmetic, implant, and general care.
            </p>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              type="button"
              variant="glass"
              size="icon-lg"
              aria-label="Previous testimonials"
              onClick={() => scrollByCard(-1)}
              className="rounded-full"
            >
              <ArrowLeft01Icon className="size-5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="cta"
              size="icon-lg"
              aria-label="Next testimonials"
              onClick={() => scrollByCard(1)}
              className="rounded-full"
            >
              <ArrowRight01Icon className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      {/* Draggable Carousel */}
      <div className="pl-4 md:pl-8 xl:pl-[calc((100vw-1280px)/2+2rem)] relative z-10">
        <motion.div ref={containerRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
          <motion.div
            drag="x"
            style={{ x }}
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-4 md:gap-6 w-max pb-6 md:pb-12 pr-8"
          >
            {testimonialLinks.map((testimonial, index) => (
              <motion.div
                key={index}
                data-testimonial-card
                className="w-[85vw] max-w-[340px] md:max-w-none md:w-[460px] shrink-0 p-1.5 sm:p-2 rounded-3xl bg-white/5 border border-white/10 shadow-lg group hover:border-white/20 transition-all duration-300"
              >
                <div className="rounded-[calc(1.5rem-2px)] bg-white/[0.07] backdrop-blur-md p-6 sm:p-8 border border-white/10 flex flex-col justify-between h-full relative overflow-hidden">
                  <QuoteUpIcon className="absolute top-5 right-5 sm:top-7 sm:right-7 w-10 h-10 sm:w-12 sm:h-12 text-white/5 group-hover:text-accent/20 transition-colors pointer-events-none" />

                  {/* Before/After Transformation Photo */}
                  {testimonial.beforeImage && testimonial.afterImage && (
                    <div className="flex gap-2.5 mb-6 rounded-2xl overflow-hidden h-28 sm:h-36 border border-white/10">
                      <div className="w-1/2 relative group-hover:w-[42%] transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                        <div className="absolute top-2 left-2 backdrop-blur-md bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 border border-white/20">
                          BEFORE
                        </div>
                        <Image
                          src={testimonial.beforeImage}
                          alt="Before Treatment"
                          fill
                          sizes="240px"
                          className="object-cover grayscale opacity-80"
                        />
                      </div>
                      <div className="w-1/2 relative group-hover:w-[58%] transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                        <div className="absolute top-2 left-2 backdrop-blur-md bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
                          AFTER
                        </div>
                        <Image
                          src={testimonial.afterImage}
                          alt="After Treatment"
                          fill
                          sizes="240px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Rating Stars */}
                  <div
                    className="flex gap-1 text-rating mb-3 sm:mb-4"
                    role="img"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-white/85 mb-6 leading-relaxed text-sm sm:text-base italic font-normal">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Patient Info Footer */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-white/10 mt-auto">
                    <Image
                      src={testimonial.patientImage}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-white text-sm sm:text-base leading-snug truncate">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs text-accent font-medium truncate">{testimonial.treatment}</p>
                    </div>
                    {siteConfig.ui.showSampleContentNotices && testimonial.demo && (
                      <span className="ml-auto shrink-0 text-[10px] font-bold text-white/70 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full">
                        Sample
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
