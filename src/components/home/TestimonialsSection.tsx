"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { StarIcon, ArrowUpRight01Icon } from "hugeicons-react";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion();
  const reviews = siteConfig.testimonials.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-background text-foreground overflow-hidden">
      <div className="shell">
        {/* Header matching Reference 1 (Aveline: "What patients say" with "All 120 reviews ↗") */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14 pb-6 border-b border-border/60">
          <div>
            <span className="text-muted-foreground/80 text-xs sm:text-sm font-medium tracking-tight block mb-2">
              Reviews /
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-foreground tracking-[-0.03em] leading-[1.12]">
              What patients say
            </h2>
          </div>

          <Link
            href="/testimonials"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
          >
            <span>All {siteConfig.clinic.stats.reviewsCount}+ verified reviews</span>
            <ArrowUpRight01Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3-Column Clean Card Grid (Light Editorial Scandinavian Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.08 }}
              className="rounded-3xl bg-card border border-border/80 p-6 sm:p-8 shadow-xs hover:shadow-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 5-Star Rating */}
                <div
                  className="flex items-center gap-1 mb-4 text-amber-500"
                  role="img"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-amber-500" aria-hidden="true" />
                  ))}
                  <span className="ml-1.5 text-xs font-mono font-semibold text-muted-foreground">
                    5.0
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-foreground/90 text-sm sm:text-[15px] leading-relaxed mb-6 font-normal">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Patient Author Details */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-border/60">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border">
                  <Image
                    src={review.patientImage || images.testimonials.patients[1]}
                    alt={review.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-bold text-foreground text-sm leading-snug truncate">
                    {review.name}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {review.treatment} · Verified Patient
                  </p>
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {review.platform}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
