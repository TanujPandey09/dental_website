"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StarIcon, QuoteUpIcon, ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Michael R.",
    treatment: "Cosmetic Dentistry",
    text: "The team here completely transformed my smile. From the consultation to the final result, the level of professionalism and care was unmatched. I finally have the confidence to smile in photos.",
    rating: 5,
    patientImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Sarah L.",
    treatment: "Dental Implants",
    text: "I was extremely nervous about getting an implant, but Dr. Chen made the entire process painless and comfortable. The facility feels more like a luxury spa than a dental clinic.",
    rating: 5,
    patientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Emma T.",
    treatment: "Teeth Whitening",
    text: "I came in for a whitening session before my wedding. The results were immediate and stunning. The staff went above and beyond to ensure I was comfortable throughout.",
    rating: 5,
    patientImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80"
  }
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="py-24 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 testimonial-header">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Patient Stories</h2>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white">
              Real Stories. Real Transformations.
            </h3>
          </div>
          <div className="hidden md:flex gap-4">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-white/10 transition-colors cursor-pointer">
              <ArrowLeft01Icon className="w-5 h-5" />
            </div>
            <div className="w-12 h-12 rounded-full border border-transparent bg-accent flex items-center justify-center text-white shadow-sm hover:bg-accent/90 transition-colors cursor-pointer">
              <ArrowRight01Icon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="pl-4 md:pl-8 xl:pl-[calc((100vw-1280px)/2+2rem)]">
        <motion.div ref={containerRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-6 md:gap-8 w-max pb-12 pr-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="w-[350px] md:w-[450px] shrink-0 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative group hover:bg-white/10 transition-colors"
              >
                <QuoteUpIcon className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-accent/20 transition-colors" />
                
                {/* Before/After Transformation */}
                <div className="flex gap-2 mb-8 rounded-2xl overflow-hidden h-32">
                  <div className="w-1/2 relative group-hover:w-[40%] transition-all duration-500">
                    <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">BEFORE</div>
                    <img src={testimonial.beforeImage} alt="Before" className="w-full h-full object-cover grayscale opacity-80" />
                  </div>
                  <div className="w-1/2 relative group-hover:w-[60%] transition-all duration-500">
                    <div className="absolute top-2 left-2 bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">AFTER</div>
                    <img src={testimonial.afterImage} alt="After" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-8 leading-relaxed text-lg min-h-[120px]">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <img src={testimonial.patientImage} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
                  <div>
                    <h4 className="font-heading font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-accent font-medium">{testimonial.treatment}</p>
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
