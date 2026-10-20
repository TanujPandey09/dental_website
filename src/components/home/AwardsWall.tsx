"use client";

import { motion } from "framer-motion";
import { Certificate01Icon } from "hugeicons-react";
import siteConfig from "@/config/site";

export function AwardsWall() {
  return (
    <section className="py-10 sm:py-12 bg-muted/20 border-y border-border/50 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-4 sm:mb-6"
      >
        <p className="text-center text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground/90">
          Clinical Accreditations &amp; Professional Governance
        </p>
      </motion.div>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-4 sm:gap-6 py-2">
          {[...siteConfig.awards, ...siteConfig.awards, ...siteConfig.awards].map((award, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-card/90 border border-border/70 text-xs sm:text-sm font-semibold text-foreground/80 hover:text-foreground shadow-sm hover:border-primary/40 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Certificate01Icon className="w-3 h-3" />
              </div>
              <span>{award}</span>
            </div>
          ))}
        </div>

        {/* Left/Right Smooth Gradients */}
        <div className="absolute top-0 left-0 w-24 sm:w-40 h-full bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-24 sm:w-40 h-full bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
