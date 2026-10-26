"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Calendar01Icon,
  CheckmarkCircle02Icon,
} from "hugeicons-react";

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
  const reduceMotion = useReducedMotion();

  const featured = services[0];
  const remaining = services.slice(1);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Featured Treatment Card (Matches Reference Screenshot Grid layout) */}
      {featured && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35 }}
          className="relative bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm hover:shadow-xl hover:border-teal-600/40 transition-all duration-300 overflow-hidden group"
        >
          {/* Subtle Decorative Background Contours */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle_at_top_right,rgba(15,118,110,0.06)_0%,transparent_70%)] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-teal-500/10 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full border border-teal-500/10 pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
            {/* Left Column Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal-800 font-semibold">
                  Featured Treatment · {featured.category}
                </span>
                <span className="text-slate-300 font-mono text-xs hidden sm:inline">/</span>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  {SERVICE_SPECS[featured.id]?.duration || "Specialist Care"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-normal text-slate-900 tracking-tight leading-tight">
                {featured.title}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        <AnimatePresence mode="popLayout">
          {remaining.map((service, index) => {
            const spec = SERVICE_SPECS[service.id];

            return (
              <motion.div
                layout={reduceMotion ? false : true}
                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : index * 0.04 }}
                key={service.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-teal-600/40 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative Subtle Geometry Contour */}
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 w-36 h-36 rounded-full border border-teal-500/10 pointer-events-none group-hover:scale-110 transition-transform duration-500 z-0"
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Card Photo Header */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 border border-slate-200/80 bg-slate-100 shadow-sm">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />

                    {/* Top Left: Category Pill */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider text-teal-800 shadow-sm border border-slate-200/60">
                      {service.category}
                    </div>

                    {/* Bottom Left: Duration */}
                    <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                      <span>{spec?.duration || "Specialist Care"}</span>
                    </div>

                    {/* Bottom Right: Note */}
                    {spec?.note && (
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border border-slate-200/60 shadow-sm hidden sm:block">
                        {spec.note}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-slate-900 group-hover:text-teal-700 transition-colors mb-2 leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Treatment Highlights */}
                  {service.detailBullets && service.detailBullets.length > 0 && (
                    <ul className="space-y-1.5 mb-5 pt-3 border-t border-slate-100 flex-1">
                      {service.detailBullets.slice(0, 2).map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckmarkCircle02Icon className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="truncate">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Bottom Actions Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 relative z-10 mt-auto">
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-teal-700 transition-colors"
                    >
                      <span>Details</span>
                      <ArrowUpRight01Icon className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => openBooking()}
                      className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold transition-colors cursor-pointer relative z-20"
                    >
                      Book Visit
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
