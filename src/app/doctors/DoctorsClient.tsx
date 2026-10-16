"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, Location01Icon, Calendar01Icon, FilterIcon } from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { images } from "@/config/images";

const allDoctors = [
  {
    id: "dr-sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    role: "Lead Cosmetic Dentist",
    image: images.doctors["dr-sarah-jenkins"],
    qualifications: "DDS, NYU College of Dentistry",
    experience: "15+ Years",
    specialty: "Cosmetic",
    specializations: ["Veneers", "Smile Makeovers", "Bonding"],
    rating: 5.0,
    reviews: 124
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    role: "Implant Specialist",
    image: images.doctors["dr-michael-chen"],
    qualifications: "DMD, Harvard",
    experience: "12+ Years",
    specialty: "Implants",
    specializations: ["Dental Implants", "Oral Surgery", "Bone Grafting"],
    rating: 4.9,
    reviews: 89
  },
  {
    id: "dr-emily-rodriguez",
    name: "Dr. Emily Rodriguez",
    role: "Orthodontist",
    image: images.doctors["dr-emily-rodriguez"],
    qualifications: "DDS, UCLA",
    experience: "10+ Years",
    specialty: "Orthodontics",
    specializations: ["Invisalign", "Clear Braces", "TMJ Treatment"],
    rating: 5.0,
    reviews: 156
  },
  {
    id: "dr-james-wilson",
    name: "Dr. James Wilson",
    role: "Endodontist",
    image: images.doctors["dr-james-wilson"],
    qualifications: "DMD, UPenn",
    experience: "8+ Years",
    specialty: "Endodontics",
    specializations: ["Root Canals", "Apicoectomy", "Dental Trauma"],
    rating: 4.8,
    reviews: 72
  },
  {
    id: "dr-amanda-lee",
    name: "Dr. Amanda Lee",
    role: "Pediatric Dentist",
    image: images.doctors["dr-amanda-lee"],
    qualifications: "DDS, Columbia",
    experience: "11+ Years",
    specialty: "Pediatric",
    specializations: ["Child Care", "Preventive", "Special Needs"],
    rating: 4.9,
    reviews: 204
  },
  {
    id: "dr-robert-taylor",
    name: "Dr. Robert Taylor",
    role: "General Dentist",
    image: images.doctors["dr-robert-taylor"],
    qualifications: "DDS, Michigan",
    experience: "20+ Years",
    specialty: "General",
    specializations: ["Checkups", "Fillings", "Crowns"],
    rating: 4.9,
    reviews: 312
  }
];

const specialties = ["All", "Cosmetic", "Implants", "Orthodontics", "Endodontics", "Pediatric", "General"];

export function DoctorsClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { openBooking } = useBooking();

  const filteredDoctors = activeFilter === "All"
    ? allDoctors
    : allDoctors.filter(doc => doc.specialty === activeFilter);

  return (
    <section className="py-10 sm:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-8">

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-12 gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-muted-foreground font-medium">
            <FilterIcon className="w-5 h-5" />
            <span>Filter by Specialty:</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {specialties.map(specialty => (
              <button
                key={specialty}
                onClick={() => setActiveFilter(specialty)}
                aria-pressed={activeFilter === specialty}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-[color,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ${activeFilter === specialty
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground border border-border hover:border-primary hover:text-primary"
                  }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doctor) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={doctor.id}
                className="doctor-card group bg-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-2xl hover:border-primary/30 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] relative"
              >
                <Link
                  href={`/doctors/${doctor.id}`}
                  aria-label={`View details for ${doctor.name}`}
                  tabIndex={-1}
                  className="absolute inset-0 z-10"
                />

                {/* Image Container */}
                <div className="relative h-[260px] sm:h-[320px] md:h-[360px] overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-60" />

                  {/* Floating Rating */}
                  <div className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <StarIcon className="w-4 h-4 fill-rating text-rating" aria-hidden="true" />
                    <span className="text-sm font-bold text-primary">{doctor.rating}</span>
                    <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                  </div>

                  {/* Name & Role (Always visible) */}
                  <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 text-white">
                    <h2 className="text-xl sm:text-2xl font-heading font-bold mb-0.5 sm:mb-1">{doctor.name}</h2>
                    <p className="text-white/80 font-medium">{doctor.role}</p>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4 sm:p-6 bg-card border-t border-border flex flex-col">
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Location01Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span>{doctor.qualifications}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Calendar01Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span>{doctor.experience}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {doctor.specializations.map((spec, i) => (
                      <span key={i} className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 relative z-20 mt-auto">
                    <Button asChild variant="outline" className="flex-1 h-11 border-primary text-primary hover:bg-primary/5 bg-card">
                      <Link href={`/doctors/${doctor.id}`}>View Details</Link>
                    </Button>
                    <Button className="flex-1 h-11 shadow-md shadow-primary/20" onClick={() => openBooking()}>
                      Book
                    </Button>
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
