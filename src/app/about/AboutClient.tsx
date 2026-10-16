"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SmileIcon, Shield01Icon, SparklesIcon, StarIcon } from "hugeicons-react";
import { Card, CardContent } from "@/components/ui/card";
import { images } from "@/config/images";
import siteConfig from "@/config/site";

export function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const reduceMotion = useReducedMotion();
  const yRaw = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2Raw = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y = reduceMotion ? 0 : yRaw;
  const y2 = reduceMotion ? 0 : y2Raw;

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
      <section className="py-12 sm:py-24 lg:py-32 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">
            
            {/* Storytelling Text */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                  Dentistry, <br />
                  Reimagined.
                </h2>
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
                  <div className="text-3xl font-heading font-bold text-foreground mb-1">{siteConfig.clinic.yearsExperience}+</div>
                  <div className="text-sm text-muted-foreground font-medium">Years of experience</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-foreground mb-1">{Math.round(siteConfig.clinic.happyPatients / 1000)}k+</div>
                  <div className="text-sm text-muted-foreground font-medium">Smiles transformed</div>
                </div>
              </div>
            </motion.div>

            {/* Parallax Image Grid */}
            <div className="relative h-[320px] sm:h-[480px] lg:h-[700px] w-full" ref={containerRef}>
              <motion.div style={{ y }} className="absolute top-0 right-0 w-[70%] h-[60%] rounded-3xl overflow-hidden shadow-2xl z-10">
                <Image 
                  src={images.about.clinicInterior} 
                  alt="Clinic Interior" 
                  fill 
                  sizes="(max-width: 1024px) 70vw, 35vw"
                  className="object-cover"
                />
              </motion.div>
              <motion.div style={{ y: y2 }} className="absolute bottom-10 left-0 w-[60%] h-[50%] rounded-3xl overflow-hidden shadow-xl z-20">
                <Image 
                  src={images.about.dentalTechnology} 
                  alt="Dental Technology" 
                  fill 
                  sizes="(max-width: 1024px) 60vw, 30vw"
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
      <section className="py-12 sm:py-24 bg-muted/30 border-y border-border/40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-foreground mb-3 sm:mb-6">Our Core Philosophy</h2>
            <p className="text-base sm:text-lg text-muted-foreground">The foundational principles that guide every interaction, every treatment, and every decision we make.</p>
          </div>

          <div className="no-scrollbar -mx-4 px-4 pb-2 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 md:gap-6 lg:gap-8 md:overflow-visible">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-[78vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink"
              >
                <Card className="h-full rounded-3xl border-border/60 hover:shadow-lg transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group">
                  <CardContent className="p-8 md:p-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg flex-1">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Tour / Aesthetics */}
      <section className="py-12 sm:py-24 lg:py-32 bg-secondary text-secondary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Designed for Peace of Mind</h2>
              <p className="text-secondary-foreground/80 text-lg leading-relaxed mb-8">
                Step into a sanctuary of wellness. From the moment you walk through our doors, you are immersed in a calming, architecturally stunning environment designed to melt away clinical anxiety.
              </p>
              <ul className="space-y-4">
                {[
                  "Aromatherapy infused waiting lounge",
                  "Noise-canceling headphones with curated playlists",
                  "Warm neck pillows and blankets during treatment",
                  "Private, sound-proofed consultation suites"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-secondary-foreground">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="space-y-3 sm:space-y-4 md:space-y-6 mt-4 md:mt-24">
                  <div className="relative h-[160px] sm:h-[250px] md:h-[350px] rounded-3xl overflow-hidden shadow-2xl">
                    <Image src={images.about.lobby} alt="Lobby" fill sizes="(max-width: 1024px) 50vw, 29vw" className="object-cover" />
                  </div>
                  <div className="relative h-[140px] sm:h-[200px] md:h-[250px] rounded-3xl overflow-hidden shadow-2xl">
                    <Image src={images.about.treatmentRoom} alt="Treatment Room" fill sizes="(max-width: 1024px) 50vw, 29vw" className="object-cover" />
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="relative h-[140px] sm:h-[200px] md:h-[250px] rounded-3xl overflow-hidden shadow-2xl">
                    <Image src={images.about.consultation} alt="Consultation" fill sizes="(max-width: 1024px) 50vw, 29vw" className="object-cover" />
                  </div>
                  <div className="relative h-[160px] sm:h-[250px] md:h-[350px] rounded-3xl overflow-hidden shadow-2xl">
                    <Image src={images.about.details} alt="Details" fill sizes="(max-width: 1024px) 50vw, 29vw" className="object-cover" />
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
