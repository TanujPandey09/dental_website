"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import { StarIcon, QuoteUpIcon, ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import siteConfig from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const x = useMotionValue(0);

  const scrollByCard = (direction: 1 | -1) => {
    const card = containerRef.current?.querySelector<HTMLElement>("[data-testimonial-card]");
    const gap = 32;
    const step = (card?.offsetWidth ?? 400) + gap;
    const current = x.get();
    const next = Math.max(-width, Math.min(0, current - direction * step));
    animate(x, next, { type: "spring", stiffness: 300, damping: 40 });
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

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".testimonial-header", { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(".testimonial-header", 
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: sectionRef });

  const testimonialLinks = siteConfig.testimonials.map((t) => ({
    ...t,
    slug: t.name.toLowerCase().replace(/ /g, '-').replace(/'/g, '-'),
  }));

  return (
    <section ref={sectionRef} className="py-12 sm:py-24 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-6 sm:mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 testimonial-header">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
              Real Stories. Real Transformations.
            </h2>
            <p className="text-white/70 mt-3 sm:mt-4 text-base sm:text-lg max-w-xl">
              Every review below is tied to a real treatment plan and an identifiable patient.
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => scrollByCard(-1)}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <ArrowLeft01Icon className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => scrollByCard(1)}
              className="w-12 h-12 rounded-full border border-transparent bg-primary flex items-center justify-center text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <ArrowRight01Icon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>

      <div className="pl-4 md:pl-8 xl:pl-[calc((100vw-1280px)/2+2rem)]">
        <motion.div ref={containerRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
          <motion.div
            drag="x"
            style={{ x }}
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-4 md:gap-8 w-max pb-6 md:pb-12 pr-8"
          >
            {testimonialLinks.map((testimonial, index) => (
              <motion.div
                key={index}
                data-testimonial-card
                className="w-[82vw] max-w-[340px] md:max-w-none md:w-[450px] shrink-0 bg-white/5 p-5 md:p-8 rounded-3xl border border-white/10 relative group hover:bg-white/10 transition-colors"
              >
                <QuoteUpIcon className="absolute top-5 right-5 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 text-white/5 group-hover:text-accent/20 transition-colors" />
                
                {/* Before/After Transformation */}
                {testimonial.beforeImage && testimonial.afterImage && (
                  <div className="flex gap-2 mb-5 md:mb-8 rounded-2xl overflow-hidden h-24 md:h-32">
                    <div className="w-1/2 relative group-hover:w-[40%] transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">BEFORE</div>
                      <Image src={testimonial.beforeImage} alt="Before" fill sizes="220px" className="object-cover grayscale opacity-80" />
                    </div>
                    <div className="w-1/2 relative group-hover:w-[60%] transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                      <div className="absolute top-2 left-2 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">AFTER</div>
                      <Image src={testimonial.afterImage} alt="After" fill sizes="220px" className="object-cover" />
                    </div>
                  </div>
                )}

                <div className="flex gap-1 text-rating mb-3 md:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-white/80 mb-5 md:mb-8 leading-relaxed text-[15px] md:text-lg md:min-h-[120px] line-clamp-5 md:line-clamp-none">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-white/10">
                  <Image src={testimonial.patientImage} alt={testimonial.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
                  <div>
                    <h3 className="font-heading font-bold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-accent font-medium">{testimonial.treatment}</p>
                  </div>
                  {testimonial.demo && (
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-white/70 bg-white/10 border border-white/15 px-2 py-1 rounded-full">
                      Demo Review
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}