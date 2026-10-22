"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, ArrowUpRight01Icon, Calendar01Icon, SparklesIcon } from "hugeicons-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  image: string;
  detailTitle?: string;
  detailSubtitle?: string;
  detailBullets?: string[];
}

interface ServicesGridProps {
  services: ServiceItem[];
}

const SERVICE_SPECS: Record<string, { duration: string; note: string }> = {
  "cosmetic-dentistry": { duration: "60-90 Mins", note: "Precision Smile Design" },
  "dental-implants": { duration: "45-60 Mins", note: "3D Guided Surgery" },
  "teeth-whitening": { duration: "45 Mins", note: "In-Office Laser Care" },
  orthodontics: { duration: "30 Mins", note: "Digital Clear Aligners" },
  "general-dentistry": { duration: "45 Mins", note: "Comprehensive Health" },
  "root-canal": { duration: "60 Mins", note: "Single-Visit Gentle Care" },
  "pediatric-dentistry": { duration: "30-45 Mins", note: "Gentle Young Smile Care" },
  "oral-surgery": { duration: "45-75 Mins", note: "Monitored Sedation Care" },
};

export function ServicesGrid({ services }: ServicesGridProps) {
  const { openBooking } = useBooking();

  const featured = services[0];
  const remaining = services.slice(1);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Featured Treatment Card (Matches Reference Screenshot Grid layout) */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 overflow-hidden group"
        >
          {/* Subtle Decorative Background Contours */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle_at_top_right,rgba(30,77,64,0.06)_0%,transparent_70%)] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-primary/10 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full border border-primary/10 pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
            {/* Left Column Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-primary text-[11px] font-semibold tracking-wide border border-border/80 font-mono uppercase">
                  <SparklesIcon className="w-3.5 h-3.5 text-primary" />
                  Featured Treatment · {featured.category}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {SERVICE_SPECS[featured.id]?.duration || "Specialist Care"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-normal text-foreground tracking-tight leading-tight">
                {featured.title}
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
                {featured.description}
              </p>

              {featured.detailBullets && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {featured.detailBullets.map((bullet, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center text-xs text-slate-700 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-full"
                    >
                      {bullet}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Button asChild size="default" variant="cta">
                  <Link href={`/services/${featured.id}`}>
                    <span>Explore Treatment</span>
                    <ArrowRight01Icon className="size-4" />
                  </Link>
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  onClick={() => openBooking()}
                  className="rounded-full border-slate-300 hover:border-slate-900"
                >
                  <Calendar01Icon className="size-4" />
                  <span>Book Consultation</span>
                </Button>
              </div>
            </div>

            {/* Right Column Image Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] border border-slate-200 shadow-md">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono font-medium text-slate-800 shadow-sm border border-slate-200/60">
                  {SERVICE_SPECS[featured.id]?.note || "Advanced Procedure"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grid of Remaining Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {remaining.map((service, index) => {
            const spec = SERVICE_SPECS[service.id];

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                key={service.id}
                className="bg-card border border-border rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative Subtle Geometry Contour */}
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full border border-primary/10 pointer-events-none group-hover:scale-110 transition-transform duration-500"
                />

                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-primary bg-muted border border-border px-2.5 py-0.5 rounded-full font-semibold">
                      {service.category}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {spec?.duration || "Specialist Care"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-foreground group-hover:text-primary transition-colors mb-2.5 leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3 relative z-10">
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    <span>Details</span>
                    <ArrowUpRight01Icon className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => openBooking()}
                    className="px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
