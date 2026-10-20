"use client";

import { motion } from "framer-motion";
import { ArrowRight01Icon, Calendar01Icon, Call02Icon } from "hugeicons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

export function CTA() {
  const { openBooking } = useBooking();

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Double-Bezel Outer Shell */}
        <div className="p-2 sm:p-3 rounded-[2.5rem] bg-muted/40 border border-border/80 shadow-2xl relative overflow-hidden">
          {/* Inner Core with Background Image & Gradient */}
          <div className="relative rounded-[calc(2.5rem-0.75rem)] bg-primary overflow-hidden p-8 sm:p-16 text-center text-primary-foreground">
            <div
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25"
              style={{ backgroundImage: `url('${images.ctaBackground}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-primary/60 pointer-events-none" />

            <div className="max-w-2xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold bg-white/15 text-white border border-white/20 mb-4 shadow-sm">
                  <Calendar01Icon className="w-3.5 h-3.5" />
                  Begin Your Smile Journey
                </span>

                <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Start with an Unhurried Conversation.
                </h2>

                <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-10 leading-relaxed font-normal">
                  Tell us what you want to achieve. We provide clear, itemized options with zero pressure and complete clinical transparency.
                </p>

                {/* Dual Button Actions */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    size="lg"
                    variant="light"
                    onClick={openBooking}
                    className="w-full sm:w-auto hover:-translate-y-0.5"
                  >
                    <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
                    <span>{siteConfig.hero.ctaTextPlain}</span>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="glass"
                    className="w-full sm:w-auto hover:-translate-y-0.5"
                  >
                    <Link href="/contact">
                      <Call02Icon className="size-4" aria-hidden="true" />
                      <span>Contact Our Office</span>
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}