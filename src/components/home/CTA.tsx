"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, Calendar01Icon } from "hugeicons-react";
import Link from "next/link";
import { useBooking } from "@/components/BookingContext";

export function CTA() {
  const { openBooking } = useBooking();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Experience the difference of Lumina Dental care. Schedule your comprehensive consultation today and take the first step towards a healthier, brighter smile.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={openBooking} size="lg" className="h-14 px-8 text-base bg-white text-primary hover:bg-white/90 shadow-xl">
                <Calendar01Icon className="mr-2 w-5 h-5" />
                Book Your Appointment
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-transparent border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Contact Us
                  <ArrowRight01Icon className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
