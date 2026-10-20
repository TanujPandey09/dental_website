"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, Location01Icon, Calendar01Icon, FilterIcon, ArrowRight01Icon, ArrowUpRight01Icon } from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import siteConfig from "@/config/site";

const allDoctors = siteConfig.doctors;
const specialties = ["All", "Cosmetic", "Implants", "Orthodontics", "Endodontics", "Pediatric", "General"];

export function DoctorsClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { openBooking } = useBooking();

  const filteredDoctors = activeFilter === "All"
    ? allDoctors
    : allDoctors.filter(doc => doc.specialty === activeFilter);

  return (
    <section className="pt-8 pb-16 sm:pt-10 sm:pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Filters with Active Count Badges */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-10 gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-muted-foreground font-semibold text-xs sm:text-sm">
            <FilterIcon className="w-4 h-4 text-primary" />
            <span>Filter by Clinical Specialty:</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
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
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 ${activeFilter === specialty
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

        {/* Double-Bezel Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doctor) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={doctor.id}
                className="doctor-card p-1.5 sm:p-2 rounded-3xl bg-muted/40 border border-border/70 shadow-sm flex flex-col group hover:-translate-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] relative"
              >
                <div className="rounded-[calc(1.5rem-2px)] bg-card border border-border/60 overflow-hidden flex flex-col flex-1 hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                  <Link
                    href={`/doctors/${doctor.id}`}
                    aria-label={`View details for ${doctor.name}`}
                    tabIndex={-1}
                    className="absolute inset-0 z-10"
                  />

                  {/* Image Container */}
                  <div className="relative h-[270px] sm:h-[320px] md:h-[360px] overflow-hidden bg-muted">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                    {/* Floating Rating Top-Right */}
                    <div className="absolute top-3.5 right-3.5 backdrop-blur-md bg-white/95 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/20">
                      <StarIcon className="w-3.5 h-3.5 fill-rating text-rating" aria-hidden="true" />
                      <span className="text-xs font-bold text-slate-950">{doctor.rating}</span>
                      <span className="text-[10px] text-muted-foreground font-medium">({doctor.reviews})</span>
                    </div>

                    {/* Sample profile notice */}
                    {siteConfig.ui.showSampleContentNotices && doctor.demo && (
                      <div className="absolute top-3.5 left-3.5 backdrop-blur-md bg-slate-950/70 border border-white/20 text-white px-2.5 py-0.5 rounded-full shadow-sm text-[10px] font-bold">
                        Sample Profile
                      </div>
                    )}

                    {/* Name & Role (Always visible over bottom photo) */}
                    <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 text-white">
                      <h2 className="text-xl sm:text-2xl font-heading font-bold mb-1 leading-snug drop-shadow-sm">{doctor.name}</h2>
                      <p className="text-white/85 text-xs sm:text-sm font-medium">{doctor.role}</p>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-5 sm:p-6 bg-card border-t border-border/60 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <Location01Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                          <span>{doctor.qualifications}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <Calendar01Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                          <span>{doctor.experience} Clinical Practice</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {doctor.specializations.map((spec, i) => (
                          <span key={i} className="text-[11px] font-medium px-3 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/15">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2.5 relative z-20 mt-auto pt-3 border-t border-border/60">
                      <Button
                        size="sm"
                        variant="cta"
                        onClick={() => openBooking()}
                        className="flex-1"
                      >
                        <Calendar01Icon className="size-3.5 shrink-0" aria-hidden="true" />
                        <span>Book Visit</span>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        <Link href={`/doctors/${doctor.id}`}>
                          <span>View Profile</span>
                          <ArrowUpRight01Icon className="size-3.5 transition-transform duration-150 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
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

