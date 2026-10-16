"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, QuoteUpIcon, FilterIcon } from "hugeicons-react";
import { Card, CardContent } from "@/components/ui/card";
import { images } from "@/config/images";

const allReviews = [
  {
    id: 1,
    name: "Michael R.",
    treatment: "Cosmetic Dentistry",
    text: "The team here completely transformed my smile. From the consultation to the final result, the level of professionalism and care was unmatched. I finally have the confidence to smile in photos.",
    rating: 5,
    patientImage: images.testimonials.patients[1],
    beforeImage: images.testimonials.before,
    afterImage: images.testimonials.after,
    platform: "Google"
  },
  {
    id: 2,
    name: "Sarah L.",
    treatment: "Dental Implants",
    text: "I was extremely nervous about getting an implant, but Dr. Chen made the entire process painless and comfortable. The facility feels more like a luxury spa than a dental clinic.",
    rating: 5,
    patientImage: images.testimonials.patients[2],
    platform: "Yelp"
  },
  {
    id: 3,
    name: "Emma T.",
    treatment: "Teeth Whitening",
    text: "I came in for a whitening session before my wedding. The results were immediate and stunning. The staff went above and beyond to ensure I was comfortable throughout.",
    rating: 5,
    patientImage: images.testimonials.patients[3],
    beforeImage: images.testimonials.before,
    afterImage: images.testimonials.after,
    platform: "Google"
  },
  {
    id: 4,
    name: "David K.",
    treatment: "General Dentistry",
    text: "Best cleaning I've ever had. They were thorough, gentle, and the hygienist explained everything she was doing. I no longer dread my 6-month checkups.",
    rating: 5,
    patientImage: images.testimonials.patients[4],
    platform: "Healthgrades"
  },
  {
    id: 5,
    name: "Jessica M.",
    treatment: "Orthodontics",
    text: "Finished my Invisalign treatment last week and I couldn't be happier. The monitoring app they use meant I didn't have to come into the office constantly. Super convenient for my busy schedule.",
    rating: 5,
    patientImage: images.testimonials.patients[5],
    platform: "Google"
  },
  {
    id: 6,
    name: "Robert B.",
    treatment: "Dental Implants",
    text: "After struggling with a missing tooth for years, I finally took the plunge. The 3D scanning tech they use is incredible. The implant feels completely natural.",
    rating: 5,
    patientImage: images.testimonials.patients[6],
    beforeImage: images.testimonials.before,
    afterImage: images.testimonials.after,
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
      <section className="py-8 sm:py-12 bg-secondary border-y border-secondary-foreground/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
            <div className="text-center">
              <div className="flex justify-center gap-1 text-rating mb-2">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-6 h-6 fill-current" />)}
              </div>
              <div className="text-secondary-foreground font-bold text-xl font-heading">4.9/5 Average</div>
              <div className="text-secondary-foreground/70 text-sm">Across 1,200+ Reviews</div>
            </div>
            
            <div className="hidden md:block w-px h-16 bg-secondary-foreground/10"></div>
            
            <div className="text-center">
              <div className="text-secondary-foreground font-bold text-3xl font-heading mb-1">Google</div>
              <div className="text-secondary-foreground/70 text-sm">Top Rated Clinic 2024</div>
            </div>
            
            <div className="hidden md:block w-px h-16 bg-secondary-foreground/10"></div>
            
            <div className="text-center">
              <div className="text-secondary-foreground font-bold text-3xl font-heading mb-1">Healthgrades</div>
              <div className="text-secondary-foreground/70 text-sm">Patient Choice Award</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid Section */}
      <section className="py-10 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-16 gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-muted-foreground font-medium">
              <FilterIcon className="w-5 h-5" />
              <span>Filter by Treatment:</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-[color,background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ${
                    activeCategory === category 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "bg-card text-muted-foreground border border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-Style Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6 lg:gap-8 space-y-4 sm:space-y-6 lg:space-y-8">
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
                  <Card className="rounded-3xl border-border/50 hover:shadow-xl transition-shadow duration-300 bg-card relative overflow-hidden group">
                    <CardContent className="p-5 sm:p-8">
                      <QuoteUpIcon className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 text-primary/5 group-hover:text-primary/10 transition-colors" />
                      
                      {review.beforeImage && review.afterImage && (
                        <div className="flex gap-2 mb-5 sm:mb-8 rounded-2xl overflow-hidden h-28 sm:h-40">
                          <div className="w-1/2 relative group-hover:w-[40%] transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                            <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">BEFORE</div>
                            <Image src={review.beforeImage} alt="Before" fill sizes="300px" className="object-cover grayscale opacity-80" />
                          </div>
                          <div className="w-1/2 relative group-hover:w-[60%] transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                            <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-md z-10">AFTER</div>
                            <Image src={review.afterImage} alt="After" fill sizes="300px" className="object-cover" />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-1 text-rating mb-4 sm:mb-6">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                        ))}
                      </div>
                      
                      <p className="text-muted-foreground mb-5 sm:mb-8 leading-relaxed text-sm sm:text-base italic">
                        &ldquo;{review.text}&rdquo;
                      </p>
                      
                      <div className="flex items-center gap-4 pt-6 border-t border-border">
                        <Image src={review.patientImage} alt={review.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-border" />
                        <div>
                          <h3 className="font-heading font-bold text-foreground">{review.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-primary font-semibold px-2 py-0.5 bg-primary/10 rounded-full">{review.treatment}</span>
                            <span className="text-xs text-muted-foreground">via {review.platform}</span>
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
            <div className="text-center py-20 text-muted-foreground">
              No reviews found for this treatment type.
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
