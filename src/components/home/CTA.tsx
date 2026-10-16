"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, Calendar01Icon } from "hugeicons-react";
import Link from "next/link";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

export function CTA() {
  const { openBooking } = useBooking();

  return (
    <section className="py-12 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
        style={{ backgroundImage: `url('${images.ctaBackground}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-6xl font-heading font-bold text-white mb-4 md:mb-6">
              Start with a conversation.
            </h2>
            <p className="text-base md:text-xl text-white/90 mb-6 md:mb-10 leading-relaxed">
              Tell us what you need and we will take care of the rest.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={openBooking} size="lg" className="h-14 px-8 text-base bg-white text-primary hover:bg-white/90 shadow-xl w-full sm:w-auto">
                <Calendar01Icon className="mr-2 w-5 h-5" />
                {siteConfig.hero.ctaTextPlain}
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base bg-transparent border-white text-white hover:bg-white/10 w-full sm:w-auto">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight01Icon className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}