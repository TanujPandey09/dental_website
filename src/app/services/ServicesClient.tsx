"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon, Shield01Icon, Activity01Icon, SmileIcon, StethoscopeIcon, CheckmarkBadge01Icon, FilterIcon } from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";

const allServices = [
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    description: "Transform your smile with premium veneers, bonding, and total smile makeovers.",
    category: "Cosmetic",
    icon: <SparklesIcon className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    description: "Permanent, natural-looking tooth replacements using state-of-the-art titanium implants.",
    category: "Restorative",
    icon: <Shield01Icon className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "teeth-whitening",
    title: "Teeth Whitening",
    description: "Professional whitening treatments for a brilliantly bright smile in just one visit.",
    category: "Cosmetic",
    icon: <Activity01Icon className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    description: "Clear aligners and modern braces for perfectly straight teeth without the metal look.",
    category: "Specialty",
    icon: <SmileIcon className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "general-dentistry",
    title: "General Dentistry",
    description: "Comprehensive exams, cleanings, and preventative care to keep your smile healthy.",
    category: "General",
    icon: <StethoscopeIcon className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "root-canal",
    title: "Root Canal Therapy",
    description: "Painless endodontic treatments to save infected teeth and relieve pain instantly.",
    category: "Restorative",
    icon: <Shield01Icon className="w-8 h-8" />,
    image: "https://plus.unsplash.com/premium_photo-1674575270991-653fb6bfc1bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJvb3QlMjBjYW5hbCUyMHRyZWF0bWVudHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    description: "Gentle, fun, and educational dental care specialized for children of all ages.",
    category: "Specialty",
    icon: <SmileIcon className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1631051103633-24959376b92d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVkaWF0cmljJTIwZGVudGlzdHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "oral-surgery",
    title: "Oral Surgery",
    description: "Expert extractions, wisdom teeth removal, and advanced surgical procedures.",
    category: "Specialty",
    icon: <CheckmarkBadge01Icon className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3JhbCUyMHN1cmdlcnl8ZW58MHx8MHx8fDA%3D"
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
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <FilterIcon className="w-5 h-5" />
            <span>Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={service.id}
                className="service-card block group relative h-[420px] rounded-3xl overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6 border border-white/20 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                    {service.icon}
                  </div>

                  <h4 className="text-2xl font-heading font-bold text-white mb-3 drop-shadow-md">
                    {service.title}
                  </h4>

                  <p className="text-white/90 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 h-0 group-hover:h-auto overflow-hidden drop-shadow-sm font-medium">
                    {service.description}
                  </p>

                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
                    <Link href={`/services/${service.id}`} className="flex-1">
                      <Button variant="outline" className="w-full h-10 border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm">
                        Details
                      </Button>
                    </Link>
                    <Button className="flex-1 h-10 bg-accent hover:bg-accent/90 text-white border-0" onClick={(e) => { e.preventDefault(); openBooking(); }}>
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
          <div className="text-center py-20 text-slate-500">
            No services found for this category.
          </div>
        )}

      </div>
    </section>
  );
}
