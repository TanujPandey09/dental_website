"use client";

import { motion } from "framer-motion";
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
  return (
    <section className="pt-40 pb-28 bg-background relative overflow-hidden border-b border-border/40">

      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Animated Ambient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[100px]"
          style={{ animation: "heroGlow 6s ease-in-out infinite alternate" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-accent/8 rounded-full blur-[80px]"
          style={{ animation: "heroGlow 8s ease-in-out infinite alternate-reverse" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-widest uppercase mb-8 border border-primary/20 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {badge}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 tracking-tight leading-[1.08]"
        >
          {title.split(" ").map((word, i, arr) =>
            i >= arr.length - 2 ? (
              <span
                key={i}
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
              >
                {word}{i < arr.length - 1 ? " " : ""}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium mb-10"
        >
          {subtitle}
        </motion.p>

        {/* Trust Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {trustItems.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.45 + i * 0.08, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border/60 backdrop-blur-sm text-sm font-medium text-foreground/80"
            >
              <CheckmarkCircle02Icon className="w-4 h-4 text-primary flex-shrink-0" />
              {item}
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <style jsx>{`
        @keyframes heroGlow {
          from { transform: translateX(-50%) scale(1); opacity: 0.6; }
          to   { transform: translateX(-50%) scale(1.15); opacity: 1; }
        }
      `}</style>
    </section>
  );
}