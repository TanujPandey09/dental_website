"use client";

import { useRef } from "react";
import { Clock01Icon, Shield01Icon, MicroscopeIcon, CheckmarkBadge01Icon, DollarCircleIcon, TelephoneIcon } from "hugeicons-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Certified Specialists",
    description: "Our doctors are board-certified and trained at the world's most prestigious institutions.",
    icon: <CheckmarkBadge01Icon className="w-6 h-6" />,
  },
  {
    title: "Advanced Equipment",
    description: "We utilize 3D imaging, laser dentistry, and AI-driven diagnostics for unmatched precision.",
    icon: <MicroscopeIcon className="w-6 h-6" />,
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees. We provide clear, upfront treatment plans and accept major insurance.",
    icon: <DollarCircleIcon className="w-6 h-6" />,
  },
  {
    title: "Emergency Support",
    description: "Dental emergencies don't wait. We offer 24/7 priority booking for urgent care needs.",
    icon: <TelephoneIcon className="w-6 h-6" />,
  },
  {
    title: "Comfortable Environment",
    description: "Relax in our spa-like clinic designed to reduce anxiety and make you feel at home.",
    icon: <Clock01Icon className="w-6 h-6" />,
  },
  {
    title: "Lifetime Warranty",
    description: "We stand behind our work with comprehensive warranties on implants and veneers.",
    icon: <Shield01Icon className="w-6 h-6" />,
  }
];

export function WhyChooseUs() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".feature-card",
      { opacity: 0, scale: 0.95, y: 20 },
      { 
        opacity: 1, 
        scale: 1, 
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
    <section ref={container} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--foreground) 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Sticky Left Content */}
          <div className="lg:w-1/2 lg:sticky lg:top-32 space-y-8">
            <div>
              <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">Why Lumina Dental</h2>
              <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Excellence in Every Detail
              </h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-lg">
                We believe that a visit to the dentist should be a premium experience. Our approach combines world-class clinical expertise with unparalleled patient hospitality.
              </p>
            </div>
            
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop"
                alt="Modern Clinic Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-white">
                <h4 className="text-xl font-bold font-heading mb-1">State of the Art Facility</h4>
                <p className="text-white/80 text-sm">Designed for your comfort and equipped with the latest dental technology.</p>
              </div>
            </div>
          </div>
          
          {/* Scrolling Right Content */}
          <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card group bg-white p-6 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center text-accent mb-5 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-heading font-bold text-foreground mb-2">
                  {feature.title}
                </h4>
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
