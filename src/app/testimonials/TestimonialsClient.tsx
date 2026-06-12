"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, QuoteUpIcon, FilterIcon } from "hugeicons-react";
import { Card, CardContent } from "@/components/ui/card";
import { useBooking } from "@/components/BookingContext";

const allReviews = [
  {
    id: 1,
    name: "Michael R.",
    treatment: "Cosmetic Dentistry",
    text: "The team here completely transformed my smile. From the consultation to the final result, the level of professionalism and care was unmatched. I finally have the confidence to smile in photos.",
    rating: 5,
    patientImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80",
    platform: "Google"
  },
  {
    id: 2,
    name: "Sarah L.",
    treatment: "Dental Implants",
    text: "I was extremely nervous about getting an implant, but Dr. Chen made the entire process painless and comfortable. The facility feels more like a luxury spa than a dental clinic.",
    rating: 5,
    patientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    platform: "Yelp"
  },
  {
    id: 3,
    name: "Emma T.",
    treatment: "Teeth Whitening",
    text: "I came in for a whitening session before my wedding. The results were immediate and stunning. The staff went above and beyond to ensure I was comfortable throughout.",
    rating: 5,
    patientImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80",
    platform: "Google"
  },
  {
    id: 4,
    name: "David K.",
    treatment: "General Dentistry",
    text: "Best cleaning I've ever had. They were thorough, gentle, and the hygienist explained everything she was doing. I no longer dread my 6-month checkups.",
    rating: 5,
    patientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    platform: "Healthgrades"
  },
  {
    id: 5,
    name: "Jessica M.",
    treatment: "Orthodontics",
    text: "Finished my Invisalign treatment last week and I couldn't be happier. The monitoring app they use meant I didn't have to come into the office constantly. Super convenient for my busy schedule.",
    rating: 5,
    patientImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    platform: "Google"
  },
  {
    id: 6,
    name: "Robert B.",
    treatment: "Dental Implants",
    text: "After struggling with a missing tooth for years, I finally took the plunge. The 3D scanning tech they use is incredible. The implant feels completely natural.",
    rating: 5,
    patientImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80",
    platform: "Google"
  }
];

const categories = ["All", "Cosmetic Dentistry", "Dental Implants", "Orthodontics", "General Dentistry"];

export function TestimonialsClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredReviews = activeCategory === "All" 
    ? allReviews 
    : allReviews.filter(review => review.treatment === activeCategory);

  return (
    <div className="bg-background">
      
      {/* Trust Badges / Stats Section */}
      <section className="py-12 bg-[#0F172A] border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            <div className="text-center">
              <div className="flex justify-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-6 h-6 fill-current" />)}
              </div>
              <div className="text-white font-bold text-xl font-heading">4.9/5 Average</div>
              <div className="text-slate-400 text-sm">Across 1,200+ Reviews</div>
            </div>
            
            <div className="hidden md:block w-px h-16 bg-white/10"></div>
            
            <div className="text-center">
              <div className="text-white font-bold text-3xl font-heading mb-1">Google</div>
              <div className="text-slate-400 text-sm">Top Rated Clinic 2024</div>
            </div>
            
            <div className="hidden md:block w-px h-16 bg-white/10"></div>
            
            <div className="text-center">
              <div className="text-white font-bold text-3xl font-heading mb-1">Healthgrades</div>
              <div className="text-slate-400 text-sm">Patient Choice Award</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <FilterIcon className="w-5 h-5" />
              <span>Filter by Treatment:</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === category 
                      ? "bg-primary text-white shadow-md" 
                      : "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-Style Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4 }}
                  key={review.id}
                  className="break-inside-avoid"
                >
                  <Card className="rounded-3xl border-border/50 hover:shadow-xl transition-shadow duration-300 bg-white relative overflow-hidden group">
                    <CardContent className="p-8">
                      <QuoteUpIcon className="absolute top-6 right-6 w-10 h-10 text-primary/5 group-hover:text-primary/10 transition-colors" />
                      
                      {review.beforeImage && review.afterImage && (
                        <div className="flex gap-2 mb-8 rounded-2xl overflow-hidden h-40">
                          <div className="w-1/2 relative group-hover:w-[40%] transition-all duration-500">
                            <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">BEFORE</div>
                            <img src={review.beforeImage} alt="Before" className="w-full h-full object-cover grayscale opacity-80" />
                          </div>
                          <div className="w-1/2 relative group-hover:w-[60%] transition-all duration-500">
                            <div className="absolute top-2 left-2 bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">AFTER</div>
                            <img src={review.afterImage} alt="After" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-1 text-amber-400 mb-6">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      
                      <p className="text-slate-600 mb-8 leading-relaxed text-base italic">
                        "{review.text}"
                      </p>
                      
                      <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                        <img src={review.patientImage} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />
                        <div>
                          <h4 className="font-heading font-bold text-slate-900">{review.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-accent font-semibold px-2 py-0.5 bg-accent/10 rounded-full">{review.treatment}</span>
                            <span className="text-xs text-slate-400">via {review.platform}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              No reviews found for this treatment type.
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
