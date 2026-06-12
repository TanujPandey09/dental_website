"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar01Icon, MicroscopeIcon, Activity01Icon, SmileIcon } from "hugeicons-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Your journey begins with a comprehensive 1-on-1 consultation in our comfortable, spa-like environment.",
    icon: <Calendar01Icon className="w-8 h-8" />
  },
  {
    number: "02",
    title: "Diagnosis",
    description: "Using advanced 3D imaging, we create a precise map of your dental anatomy for optimal planning.",
    icon: <MicroscopeIcon className="w-8 h-8" />
  },
  {
    number: "03",
    title: "Treatment",
    description: "Experience pain-free procedures performed by world-class specialists using state-of-the-art tech.",
    icon: <Activity01Icon className="w-8 h-8" />
  },
  {
    number: "04",
    title: "Smile Transformation",
    description: "Walk out with a confident, radiant smile and a personalized long-term care plan.",
    icon: <SmileIcon className="w-8 h-8" />
  }
];

export function PatientJourney() {
  const container = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Parallax Stacking Effect with GSAP
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const isLast = index === cardsRef.current.length - 1;
      
      // We animate all cards EXCEPT the last one to shrink and fade slightly as they go up
      if (!isLast) {
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 15%", // When the card hits the sticky top position
            end: "bottom 0%", // Until it's completely scrolled past
            scrub: true,
          }
        });
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-24 bg-muted/20 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Your Experience</h2>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-primary">
            The Patient Journey
          </h3>
          <p className="text-muted-foreground mt-4 text-lg">
            A seamless, step-by-step process designed around your comfort and health.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="max-w-3xl mx-auto relative flex flex-col gap-8 pb-32">
          {steps.map((step, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el }}
              className="sticky"
              style={{ 
                top: `calc(15vh + ${index * 30}px)`, 
                zIndex: index 
              }}
            >
              <div className="w-full p-8 md:p-12 rounded-3xl bg-background border border-border shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all">
                
                {/* Number & Icon */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="text-accent mb-2">
                    {step.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-heading font-bold text-primary/20">
                    {step.number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center md:text-left flex-1">
                  <h4 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                    {step.title}
                  </h4>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
