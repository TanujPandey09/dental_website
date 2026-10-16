"use client";

import { motion } from "framer-motion";
import siteConfig from "@/config/site";

export function AwardsWall() {
  return (
    <section className="py-12 bg-background border-y border-border/50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-4 md:px-8 mb-6"
      >
        <p className="text-center text-sm text-muted-foreground">
          Recognized by industry leaders
        </p>
      </motion.div>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
          {[...siteConfig.awards, ...siteConfig.awards, ...siteConfig.awards].map((award, index) => (
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
