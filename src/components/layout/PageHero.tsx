"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckmarkCircle02Icon } from "hugeicons-react";

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
}

const trustItems = [
  "Board Certified Specialists",
  "Same-Day Appointments",
  "Painless Procedures",
];

export function PageHero({ title, subtitle, badge }: PageHeroProps) {
  const reduce = useReducedMotion();

  return (
    <section className="pt-24 pb-12 sm:pt-36 sm:pb-24 bg-background relative overflow-hidden border-b border-border/40">

      {/* Static grid texture */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Single restrained ambient wash */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">

        {badge && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-primary font-medium mb-4"
          >
            {badge}
          </motion.p>
        )}

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 tracking-tight leading-[1.08] text-balance"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium mb-10"
        >
          {subtitle}
        </motion.p>

        {/* Trust proof points */}
        <motion.ul
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {trustItems.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-sm font-medium text-foreground/80"
            >
              <CheckmarkCircle02Icon className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </motion.ul>

      </div>

      {/* Bottom hairline */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
