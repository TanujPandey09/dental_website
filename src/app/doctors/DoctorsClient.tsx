"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, Location01Icon, Calendar01Icon, FilterIcon } from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";

const allDoctors = [
  {
    id: "dr-sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    role: "Lead Cosmetic Dentist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
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
    image: "https://plus.unsplash.com/premium_photo-1672760399926-bdbd01b89937?w=600&auto=format&fit=crop&q=60",
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
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
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
    image: "https://media.istockphoto.com/id/1298800629/photo/portrait-of-confident-male-doctor-looking-at-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=zDglgekwTgR0ng2XiDRs0ZN3drnlXpB5smEmoBB243A=",
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
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
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
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8">

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <FilterIcon className="w-5 h-5" />
            <span>Filter by Specialty:</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {specialties.map(specialty => (
              <button
                key={specialty}
                onClick={() => setActiveFilter(specialty)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === specialty
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary"
                  }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doctor) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={doctor.id}
                className="doctor-card group bg-white rounded-3xl overflow-hidden border border-border/50 hover:shadow-2xl hover:border-accent/30 transition-all duration-500 relative"
              >
                <Link href={`/doctors/${doctor.id}`} className="absolute inset-0 z-10" />

                {/* Image Container */}
                <div className="relative h-[360px] overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-60" />

                  {/* Floating Rating */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <StarIcon className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-bold text-primary">{doctor.rating}</span>
                    <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                  </div>

                  {/* Name & Role (Always visible) */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white transform group-hover:-translate-y-4 transition-transform duration-500">
                    <h4 className="text-2xl font-heading font-bold mb-1">{doctor.name}</h4>
                    <p className="text-white/80 font-medium">{doctor.role}</p>
                  </div>
                </div>

                {/* Slide-up Info Section */}
                <div className="p-6 bg-white absolute bottom-0 left-0 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out border-t border-border flex flex-col justify-end">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Location01Icon className="w-4 h-4 text-accent" />
                      <span>{doctor.qualifications}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Calendar01Icon className="w-4 h-4 text-accent" />
                      <span>{doctor.experience}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {doctor.specializations.map((spec, i) => (
                      <span key={i} className="text-xs font-medium px-3 py-1 bg-accent/10 text-accent rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 relative z-20 mt-auto">
                    <Link href={`/doctors/${doctor.id}`} className="flex-1">
                      <Button variant="outline" className="w-full h-11 border-primary text-primary hover:bg-primary/5 bg-white">
                        View Details
                      </Button>
                    </Link>
                    <Button className="flex-1 h-11 shadow-md shadow-primary/20" onClick={(e) => { e.stopPropagation(); openBooking(); }}>
                      Book
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No doctors found for this specialty.
          </div>
        )}

      </div>
    </section>
  );
}
