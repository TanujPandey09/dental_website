"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { StarIcon, Location01Icon, Calendar01Icon, FilterIcon, ArrowUpRight01Icon } from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import siteConfig from "@/config/site";

import { cn } from "@/lib/utils";

const allDoctors = siteConfig.doctors;
const specialties = ["All", "Cosmetic", "Implants", "Orthodontics", "Endodontics", "Pediatric", "General"];

export function DoctorsClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();

  const filteredDoctors = activeFilter === "All"
    ? allDoctors
    : allDoctors.filter(doc => doc.specialty === activeFilter);

  return (
    <section className="pt-6 pb-6 sm:pt-10 sm:pb-8 bg-background">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl">

        {/* Filters with Active Count Badges */}
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center mb-5 sm:mb-10 gap-3 sm:gap-6">
          <div className="flex items-center gap-2 text-muted-foreground font-semibold text-xs sm:text-sm">
            <FilterIcon className="w-4 h-4 text-primary shrink-0" />
            <span>Filter by Clinical Specialty:</span>
          </div>
          <div className="flex overflow-x-auto sm:flex-wrap gap-1.5 sm:gap-2 w-full md:w-auto pb-1 sm:pb-0 no-scrollbar justify-start sm:justify-center md:justify-end">
            {specialties.map(specialty => {
              const count = specialty === "All"
                ? allDoctors.length
                : allDoctors.filter(d => d.specialty === specialty).length;

              return (
                <button
                  key={specialty}
                  type="button"
                  onClick={() => setActiveFilter(specialty)}
                  aria-pressed={activeFilter === specialty}
                  className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold shrink-0 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95 ${activeFilter === specialty
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-card text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground"
                    }`}
                >
                  <span>{specialty}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeFilter === specialty ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Double-Bezel Doctors Grid - 2x2 on Mobile, 3 cols on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 md:gap-8 auto-rows-fr">
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doctor) => (
              <motion.div
                layout={reduceMotion ? false : true}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
                key={doctor.id}
                className="doctor-card p-1 sm:p-2 rounded-2xl sm:rounded-3xl bg-muted/40 border border-border/70 shadow-sm flex flex-col group hover:-translate-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] relative h-full min-h-0"
              >
                <div className="rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-2px)] bg-card border border-border/60 flex flex-col flex-1 h-full min-h-0 hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                  <Link
                    href={`/doctors/${doctor.id}`}
                    aria-label={`View details for ${doctor.name}`}
                    tabIndex={-1}
                    className="absolute inset-0 z-10"
                  />

                  {/* Image Container with Top Rounded Corners */}
                  <div className="relative h-[150px] xs:h-[180px] sm:h-[320px] md:h-[360px] overflow-hidden bg-muted rounded-t-[calc(1rem-1px)] sm:rounded-t-[calc(1.5rem-2px)] shrink-0">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                    {/* Floating Rating Top-Right */}
                    <div className="absolute top-2 right-2 sm:top-3.5 sm:right-3.5 backdrop-blur-md bg-white/95 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 shadow-sm border border-white/20">
                      <StarIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-rating text-rating" aria-hidden="true" />
                      <span className="text-[10px] sm:text-xs font-bold text-slate-950">{doctor.rating.toFixed(1)}</span>
                      <span className="hidden sm:inline text-[10px] text-muted-foreground font-medium">({doctor.reviews})</span>
                    </div>

                    {/* Sample profile notice */}
                    {siteConfig.ui.showSampleContentNotices && doctor.demo && (
                      <div className="hidden xs:block absolute top-2 left-2 sm:top-3.5 sm:left-3.5 backdrop-blur-md bg-slate-950/70 border border-white/20 text-white px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full shadow-sm text-[8px] sm:text-[10px] font-bold">
                        Sample
                      </div>
                    )}

                    {/* Name & Role (Always visible over bottom photo) */}
                    <div className="absolute bottom-0 left-0 w-full p-2.5 sm:p-5 sm:p-6 text-white">
                      <h2 className="text-xs sm:text-2xl font-heading font-bold mb-0.5 leading-snug drop-shadow-sm line-clamp-1">{doctor.name}</h2>
                      <p className="text-white/85 text-[10px] sm:text-sm font-medium line-clamp-1">{doctor.role}</p>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-2.5 sm:p-5 sm:p-6 bg-card rounded-b-[calc(1rem-1px)] sm:rounded-b-[calc(1.5rem-2px)] border-t border-border/60 flex flex-col flex-1 justify-between min-h-0">
                    <div>
                      <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-4">
                        <div className="flex items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-sm text-muted-foreground">
                          <Location01Icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0" aria-hidden="true" />
                          <span className="truncate">{doctor.qualifications}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-sm text-muted-foreground">
                          <Calendar01Icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0" aria-hidden="true" />
                          <span className="truncate">{doctor.experience} Practice</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-5">
                        {doctor.specializations.map((spec, i) => (
                          <span
                            key={i}
                            className={cn(
                              "text-[9px] sm:text-[11px] font-medium px-1.5 sm:px-3 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/15 truncate max-w-full",
                              i > 0 && "hidden sm:inline-block"
                            )}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2.5 relative z-20 mt-auto pt-2.5 sm:pt-3 border-t border-border/60 shrink-0">
                      <Button
                        size="sm"
                        variant="cta"
                        onClick={() => openBooking()}
                        className="w-full sm:flex-1 h-8 sm:h-9 text-[11px] sm:text-xs px-2 shrink-0"
                      >
                        <Calendar01Icon className="size-3 sm:size-3.5 shrink-0" aria-hidden="true" />
                        <span>Book</span>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="hidden sm:flex flex-1 h-9 text-xs shrink-0"
                      >
                        <Link href={`/doctors/${doctor.id}`}>
                          <span>View Profile</span>
                          <ArrowUpRight01Icon className="size-3.5 transition-transform duration-150 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 shrink-0" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredDoctors.length === 0 && (
          <div role="status" className="text-center py-20 text-muted-foreground">
            No doctors found for this specialty.
          </div>
        )}

      </div>
    </section>
  );
}

