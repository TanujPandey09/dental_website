"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Mail01Icon, SparklesIcon } from "hugeicons-react";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";

export function NewsletterSignup() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-secondary text-secondary-foreground overflow-hidden relative">
      {/* Abstract organic shapes */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.1 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-mono font-bold uppercase tracking-wider">
            <SparklesIcon className="w-3 h-3" />
            <span>Stay Connected</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-[1.05] tracking-tight">
            Keep your smile in{" "}
            <span className="text-accent italic">perfect shape.</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Appointment reminders, oral health tips, and occasional smiles
            delivered straight to your inbox. No spam, ever.
          </p>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 relative group"
          >
            <div className="flex-1 min-w-0 relative">
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="flex-1 min-w-0 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                <Mail01Icon className="w-4 h-4 text-white/50" />
              </div>
            </div>
            <button
              type="submit"
              className="whitespace-nowrap px-6 py-4 rounded-xl bg-accent text-secondary-foreground font-semibold hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300 shadow-sm"
            >
              Subscribe
            </button>
          </form>

          {/* Social proof line */}
          <div className="flex items-center justify-center gap-6 text-white/30 border-t border-white/10 pt-6">
            <span className="text-[10px] font-mono uppercase tracking-widest">Join {siteConfig.clinic.stats.patientsTreated}+ patients</span>
            <div className="h-[1px] w-16 bg-white/10" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Trusted since 2009</span>
          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-4 sm:gap-6 mt-4">
            {siteConfig.social.instagram && (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <Mail01Icon className="w-5 h-5" aria-hidden="true" />
              </a>
            )}
            <a
              href="/contact"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300"
              aria-label="Contact"
            >
              <Mail01Icon className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
