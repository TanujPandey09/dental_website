"use client";

import { motion } from "framer-motion";

const awards = [
  "American Dental Association",
  "Top Dentist NYC 2023",
  "Invisalign Diamond Provider",
  "Aesthetics Dentistry Award",
  "Healthcare Excellence"
];

export function AwardsWall() {
  return (
    <section className="py-12 bg-background border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-6">
        <p className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Recognized By Industry Leaders
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
          {[...awards, ...awards, ...awards].map((award, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center text-xl font-heading font-bold text-foreground/40 hover:text-foreground/80 transition-colors px-8"
            >
              {award}
            </div>
          ))}
        </div>
        
        {/* Left/Right Fade */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
