"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon, QuoteUpIcon, FilterIcon, SparklesIcon, CheckmarkBadge01Icon } from "hugeicons-react";
import siteConfig from "@/config/site";

const categories = [
  "All",
  ...Array.from(new Set(siteConfig.testimonials.map((t) => t.treatment))),
];

export function TestimonialsClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredReviews = activeCategory === "All"
    ? siteConfig.testimonials
    : siteConfig.testimonials.filter(review => review.treatment === activeCategory);

  return (
    <div className="bg-background">

      {/* 1. Trust Badges / Stats Section */}
      <section className="py-10 sm:py-14 bg-secondary text-secondary-foreground border-y border-secondary-foreground/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 lg:gap-16 items-center">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[200px]">
              <div className="flex justify-center gap-1 text-rating mb-2" role="img" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4 fill-current" aria-hidden="true" />)}
              </div>
              <div className="text-white font-bold text-lg sm:text-xl font-heading">4.9/5 Star Rating</div>
              <div className="text-secondary-foreground/75 text-xs font-medium">Verified Patient Reviews</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[200px]">
              <div className="flex items-center justify-center gap-1.5 text-accent font-bold text-sm mb-1.5">
                <CheckmarkBadge01Icon className="w-4 h-4" />
                <span>Independent Platforms</span>
              </div>
              <div className="text-white font-bold text-xl sm:text-2xl font-heading mb-0.5">Google &amp; Yelp</div>
              <div className="text-secondary-foreground/75 text-xs font-medium">Third-Party Authenticated</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[200px]">
              <div className="flex items-center justify-center gap-1.5 text-accent font-bold text-sm mb-1.5">
                <SparklesIcon className="w-4 h-4" />
                <span>Clinical Governance</span>
              </div>
              <div className="text-white font-bold text-xl sm:text-2xl font-heading mb-0.5">Healthgrades</div>
              <div className="text-secondary-foreground/75 text-xs font-medium">Verified Practice Profile</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Reviews Grid Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 sm:mb-16 gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-muted-foreground font-semibold text-xs sm:text-sm">
              <FilterIcon className="w-4 h-4 text-primary" />
              <span>Filter by Treatment:</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {categories.map(category => {
                const count = category === "All"
                  ? siteConfig.testimonials.length
                  : siteConfig.testimonials.filter(t => t.treatment === category).length;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 ${activeCategory === category
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "bg-card text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground"
                      }`}
                  >
                    <span>{category}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeCategory === category ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                      }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Double-Bezel Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.35 }}
                  key={review.id}
                  className="break-inside-avoid"
                >
                  <div className="p-1.5 sm:p-2 rounded-3xl bg-muted/40 border border-border/70 shadow-sm flex flex-col group hover:-translate-y-1 transition-all duration-300">
                    <div className="rounded-[calc(1.5rem-2px)] bg-card border border-border/60 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
                      <QuoteUpIcon className="absolute top-6 right-6 w-9 h-9 text-primary/10 group-hover:text-primary/20 transition-colors pointer-events-none" />

                      {/* Before/After Transformation */}
                      {review.beforeImage && review.afterImage && (
                        <div className="flex gap-2.5 mb-6 rounded-2xl overflow-hidden h-28 sm:h-36 border border-border/60">
                          <div className="w-1/2 relative group-hover:w-[42%] transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                            <div className="absolute top-2 left-2 backdrop-blur-md bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 border border-white/20">
                              BEFORE
                            </div>
                            <Image src={review.beforeImage} alt="Before" fill sizes="300px" className="object-cover grayscale opacity-80" />
                          </div>
                          <div className="w-1/2 relative group-hover:w-[58%] transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                            <div className="absolute top-2 left-2 backdrop-blur-md bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
                              AFTER
                            </div>
                            <Image src={review.afterImage} alt="After" fill sizes="300px" className="object-cover" />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-1 text-rating mb-4" role="img" aria-label={`${review.rating} out of 5 stars`}>
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                        ))}
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed text-xs sm:text-sm italic font-normal">
                        &ldquo;{review.text}&rdquo;
                      </p>

                      <div className="flex items-center gap-3.5 pt-4 border-t border-border/60 mt-auto">
                        <Image src={review.patientImage} alt={review.name} width={44} height={44} className="w-11 h-11 rounded-full object-cover border-2 border-border shrink-0" />
                        <div className="min-w-0">
                          <h3 className="font-heading font-bold text-foreground text-sm sm:text-base leading-snug truncate">{review.name}</h3>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] text-primary font-semibold px-2 py-0.2 bg-primary/10 rounded-full border border-primary/15">{review.treatment}</span>
                            <span className="text-[10px] text-muted-foreground font-medium">via {review.platform}</span>
                          </div>
                        </div>
                        {siteConfig.ui.showSampleContentNotices && review.demo && (
                          <span className="ml-auto shrink-0 text-[10px] font-bold text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded-full">
                            Sample
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
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
