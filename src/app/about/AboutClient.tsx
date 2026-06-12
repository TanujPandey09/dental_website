"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SmileIcon, Shield01Icon, SparklesIcon, StarIcon } from "hugeicons-react";
import { Card, CardContent } from "@/components/ui/card";

export function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  const values = [
    {
      title: "Radical Empathy",
      description: "We treat patients, not just teeth. We listen to your concerns, respect your time, and prioritize your comfort above all else.",
      icon: <SmileIcon className="w-6 h-6" />
    },
    {
      title: "Clinical Excellence",
      description: "We are obsessed with precision. Our specialists undergo continuous training to master the latest advancements in dental science.",
      icon: <StarIcon className="w-6 h-6" />
    },
    {
      title: "Total Transparency",
      description: "No surprise bills or hidden fees. We explain every treatment plan clearly, including costs, before any work begins.",
      icon: <Shield01Icon className="w-6 h-6" />
    },
    {
      title: "Spa-Like Experience",
      description: "We've removed the clinical smells, harsh lights, and anxiety-inducing sounds. Our clinic is designed to be your sanctuary.",
      icon: <SparklesIcon className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-background">
      
      {/* The Vision Section */}
      <section className="py-24 lg:py-32 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Storytelling Text */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">Our Genesis</h2>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                  Dentistry, <br />
                  <span className="text-muted-foreground italic font-normal">Reimagined.</span>
                </h3>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  For decades, going to the dentist has been synonymous with anxiety, sterile environments, and dreaded waiting rooms. We decided it was time to tear down that paradigm and build something entirely new.
                </p>
                <p>
                  Lumina Dental was founded by a collective of board-certified specialists who shared a radical vision: what if a dental clinic felt like a luxury hospitality experience? What if clinical excellence was paired with radical empathy?
                </p>
                <p>
                  Today, we serve thousands of patients who actually look forward to their visits. From the curated playlist in the lobby to the pain-free technology in our suites, every detail is meticulously designed around you.
                </p>
              </div>

              <div className="pt-6 border-t border-border/50 flex gap-8">
                <div>
                  <div className="text-3xl font-heading font-bold text-foreground mb-1">15+</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Years Exp.</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-foreground mb-1">10k+</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Smiles Transformed</div>
                </div>
              </div>
            </motion.div>

            {/* Parallax Image Grid */}
            <div className="relative h-[600px] lg:h-[700px] w-full" ref={containerRef}>
              <motion.div style={{ y }} className="absolute top-0 right-0 w-[70%] h-[60%] rounded-3xl overflow-hidden shadow-2xl z-10">
                <Image 
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=1200&auto=format&fit=crop" 
                  alt="Clinic Interior" 
                  fill 
                  className="object-cover"
                />
              </motion.div>
              <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }} className="absolute bottom-10 left-0 w-[60%] h-[50%] rounded-3xl overflow-hidden shadow-xl z-20">
                <Image 
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop" 
                  alt="Dental Technology" 
                  fill 
                  className="object-cover"
                />
              </motion.div>
              
              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-muted/30 border-y border-border/40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">Our Core Philosophy</h2>
            <p className="text-lg text-muted-foreground">The foundational principles that guide every interaction, every treatment, and every decision we make.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full rounded-3xl border-border/60 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8 md:p-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {value.icon}
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-foreground mb-4">{value.title}</h4>
                    <p className="text-muted-foreground leading-relaxed text-lg flex-1">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Tour / Aesthetics */}
      <section className="py-24 lg:py-32 bg-[#0F172A] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Designed for Peace of Mind</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Step into a sanctuary of wellness. From the moment you walk through our doors, you are immersed in a calming, architecturally stunning environment designed to melt away clinical anxiety.
              </p>
              <ul className="space-y-4">
                {[
                  "Aromatherapy infused waiting lounge",
                  "Noise-canceling headphones with curated playlists",
                  "Warm neck pillows and blankets during treatment",
                  "Private, sound-proofed consultation suites"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-200">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4 md:space-y-6 mt-12 md:mt-24">
                  <div className="relative h-[250px] md:h-[350px] rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" alt="Lobby" fill className="object-cover" />
                  </div>
                  <div className="relative h-[200px] md:h-[250px] rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" alt="Treatment Room" fill className="object-cover" />
                  </div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div className="relative h-[200px] md:h-[250px] rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800&auto=format&fit=crop" alt="Consultation" fill className="object-cover" />
                  </div>
                  <div className="relative h-[250px] md:h-[350px] rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop" alt="Details" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
