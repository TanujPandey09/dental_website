"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon, Shield01Icon, Activity01Icon, SmileIcon, StethoscopeIcon, CheckmarkBadge01Icon, FilterIcon } from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";
import { images } from "@/config/images";

const allServices = [
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    description: "Transform your smile with premium veneers, bonding, and total smile makeovers.",
    category: "Cosmetic",
    icon: <SparklesIcon className="w-8 h-8" />,
    image: images.services["cosmetic-dentistry"]
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    description: "Permanent, natural-looking tooth replacements using state-of-the-art titanium implants.",
    category: "Restorative",
    icon: <Shield01Icon className="w-8 h-8" />,
    image: images.services["dental-implants"]
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    description: "Professional whitening treatments for a brilliantly bright smile in just one visit.",
    category: "Cosmetic",
    icon: <Activity01Icon className="w-8 h-8" />,
    image: images.services["teeth-whitening"]
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    description: "Clear aligners and modern braces for perfectly straight teeth without the metal look.",
    category: "Specialty",
    icon: <SmileIcon className="w-8 h-8" />,
    image: images.services["orthodontics"]
  },
  {
    id: "general-dentistry",
    title: "General Dentistry",
    description: "Comprehensive exams, cleanings, and preventative care to keep your smile healthy.",
    category: "General",
    icon: <StethoscopeIcon className="w-8 h-8" />,
    image: images.services["general-dentistry"]
  },
  {
    id: "root-canal",
    title: "Root Canal Therapy",
    description: "Painless endodontic treatments to save infected teeth and relieve pain instantly.",
    category: "Restorative",
    icon: <Shield01Icon className="w-8 h-8" />,
    image: images.services["root-canal"]
  },
  {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    description: "Gentle, fun, and educational dental care specialized for children of all ages.",
    category: "Specialty",
    icon: <SmileIcon className="w-8 h-8" />,
    image: images.services["pediatric-dentistry"]
  },
  {
    id: "oral-surgery",
    title: "Oral Surgery",
    description: "Expert extractions, wisdom teeth removal, and advanced surgical procedures.",
    category: "Specialty",
    icon: <CheckmarkBadge01Icon className="w-8 h-8" />,
    image: images.services["oral-surgery"]
  }
];

const categories = ["All", "General", "Cosmetic", "Restorative", "Specialty"];

export function ServicesClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { openBooking } = useBooking();

  const filteredServices = activeCategory === "All"
    ? allServices
    : allServices.filter(service => service.category === activeCategory);

  return (
    <section className="py-10 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-12 gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-muted-foreground font-medium">
            <FilterIcon className="w-5 h-5" />
            <span>Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-[color,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ${activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground border border-border hover:border-primary hover:text-primary"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={service.id}
                className="service-card block group relative h-[320px] sm:h-[400px] md:h-[420px] rounded-3xl overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 flex items-center justify-center text-white mb-3 md:mb-6 border border-white/25 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                    {service.icon}
                  </div>

                  <h2 className="text-2xl font-heading font-bold text-white mb-3 drop-shadow-md">
                    {service.title}
                  </h2>

                  <p className="text-white/90 text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-none drop-shadow-sm font-medium">
                    {service.description}
                  </p>

                  <div className="flex gap-3">
                    <Button asChild variant="outline" className="flex-1 h-10 border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary">
                      <Link href={`/services/${service.id}`}>Details</Link>
                    </Button>
                    <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground border-0" onClick={() => openBooking()}>
                      Book
                    </Button>
                  </div>
                </div>

                {/* Glassmorphism Spotlight Hover Border */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-3xl transition-colors duration-500 z-20 pointer-events-none mix-blend-overlay" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredServices.length === 0 && (
          <div role="status" className="text-center py-20 text-muted-foreground">
            No services found for this category.
          </div>
        )}

      </div>
    </section>
  );
}
