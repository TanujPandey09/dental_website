"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar01Icon, Call02Icon } from "hugeicons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";
import { cn } from "@/lib/utils";

export function CTA({ className }: { className?: string } = {}) {
  const { openBooking } = useBooking();
  const reduce = useReducedMotion();

  return (
    <section className={cn("py-12 sm:py-20 relative overflow-hidden bg-background", className)}>
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
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduce ? 0 : 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/75 font-semibold mb-4">
                  Begin Your Smile Journey
                </p>

                <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4 sm:mb-6 leading-tight pb-1">
                  Start with an Unhurried Conversation.
                </h2>

                <p className="text-base sm:text-lg text-white/90 mb-8 sm:mb-10 leading-relaxed font-normal pt-0.5">
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