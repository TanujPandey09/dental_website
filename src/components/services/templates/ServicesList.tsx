"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { ArrowRight01Icon } from "hugeicons-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  image: string;
}

interface ServicesListProps {
  services: ServiceItem[];
}

const SERVICE_SPECS: Record<
  string,
  { duration: string; comfort: string; recovery: string }
> = {
  "cosmetic-dentistry": {
    duration: "60-90 Mins",
    comfort: "Local / Sedation",
    recovery: "Same-Day Routine",
  },
  "dental-implants": {
    duration: "45-60 Mins",
    comfort: "3D Guided Local",
    recovery: "Tailored Protocol",
  },
  "teeth-whitening": {
    duration: "45 Mins",
    comfort: "Cold Laser / Gentle",
    recovery: "Immediate",
  },
  orthodontics: {
    duration: "30 Mins",
    comfort: "Digital Aligners",
    recovery: "Normal Activity",
  },
  "general-dentistry": {
    duration: "45 Mins",
    comfort: "Ultrasonic Gentle",
    recovery: "Preventive",
  },
  "root-canal": {
    duration: "60 Mins",
    comfort: "Single-Visit Local",
    recovery: "Same-Day Rest",
  },
  "pediatric-dentistry": {
    duration: "30-45 Mins",
    comfort: "Child-Friendly",
    recovery: "Normal Activity",
  },
  "oral-surgery": {
    duration: "45-75 Mins",
    comfort: "Monitored Sedation",
    recovery: "Guided 2-Day Rest",
  },
};

export function ServicesList({ services }: ServicesListProps) {
  const { openBooking } = useBooking();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {services.map((service, index) => {
          const spec = SERVICE_SPECS[service.id] || {
            duration: "45-60 Mins",
            comfort: "Local / Gentle",
            recovery: "Standard Protocol",
          };

          return (
            <motion.div
              layout
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -15 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, delay: index * 0.03 }}
              key={service.id}
              className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-teal-600/40 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">

                {/* Left Section: Rounded Thumbnail + Title & Description */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  {/* Thumbnail with Soft Contour */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200/80 bg-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 80px, 96px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 to-transparent" />
                  </div>

                  {/* Content Block */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold text-primary bg-primary/10 border border-primary/20 leading-normal">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-sans font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                      <Link href={`/services/${service.id}`}>
                        {service.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed max-w-xl">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Middle Section: Comparison Metadata Columns (Desktop) */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 py-3 px-4 bg-muted/40 rounded-xl sm:rounded-2xl border border-border/70 shrink-0 lg:min-w-[320px]">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">
                      Duration
                    </p>
                    <p className="text-xs font-semibold text-foreground leading-tight">
                      {spec.duration}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">
                      Comfort
                    </p>
                    <p className="text-xs font-semibold text-foreground leading-tight truncate">
                      {spec.comfort}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">
                      Recovery
                    </p>
                    <p className="text-xs font-semibold text-foreground leading-tight truncate">
                      {spec.recovery}
                    </p>
                  </div>
                </div>

                {/* Right Section: Actions */}
                <div className="flex items-center justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary px-3 py-1.5 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight01Icon className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => openBooking()}
                    className="px-4 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-colors cursor-pointer shadow-xs active:scale-95"
                  >
                    Book
                  </button>
                </div>

              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
