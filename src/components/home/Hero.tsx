"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, StarIcon, Shield01Icon } from "hugeicons-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";
import { images } from "@/config/images";

const DRIFT_EASE = [0.65, 0, 0.35, 1] as const;

const AVATAR_IDS = [1, 2, 3, 4] as const;

export function Hero() {
  const { openBooking } = useBooking();
  const reduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15,
        delayChildren: reduceMotion ? 0 : 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }
    },
  };

  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-background">
      {/* Single bold moment: slow drifting ambient wash (desktop only for performance) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden pointer-events-none -z-10 hidden md:flex items-center justify-center opacity-60">
        <motion.div
          animate={reduceMotion ? undefined : {
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: DRIFT_EASE }}
          className="absolute w-[800px] h-[800px] bg-primary/25 rounded-[40%_60%_70%_30%] blur-[100px] mix-blend-multiply"
        />
        <motion.div
          animate={reduceMotion ? undefined : {
            x: [0, -120, 80, 0],
            y: [0, 100, -80, 0],
            scale: [1, 0.9, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: DRIFT_EASE }}
          className="absolute w-[600px] h-[600px] bg-accent/25 rounded-[60%_40%_30%_70%] blur-[100px] mix-blend-multiply -translate-x-1/4 translate-y-1/4"
        />
        <motion.div
          animate={reduceMotion ? undefined : {
            x: [0, 80, -100, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: DRIFT_EASE }}
          className="absolute w-[700px] h-[700px] bg-secondary/15 rounded-[50%_50%_70%_30%] blur-[120px] mix-blend-multiply translate-x-1/3 -translate-y-1/4"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-[4.5rem] font-heading font-bold text-foreground leading-[1.05] tracking-tight mb-8 text-balance"
          >
            {siteConfig.hero.headline}{" "}
            {siteConfig.hero.headlineAccent}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed mb-10 sm:mb-12 max-w-3xl mx-auto font-medium">
            {siteConfig.hero.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-14 sm:mb-20 w-full">
            <Button onClick={openBooking} size="lg" className="group/btn w-full sm:w-auto h-14 pl-10 pr-3 rounded-full text-base font-bold shadow-[0_8px_30px_rgb(15,118,110,0.3)] hover:shadow-[0_8px_40px_rgb(15,118,110,0.4)] bg-primary hover:bg-primary/90 text-white">
              {siteConfig.hero.ctaText}
              <span className="ml-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5">
                <ArrowRight01Icon className="w-[18px] h-[18px]" aria-hidden="true" />
              </span>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 rounded-full text-base font-bold bg-card border-border hover:bg-card/70 transition-colors">
              <Link href="/doctors">{siteConfig.hero.secondaryCtaText}</Link>
            </Button>
          </motion.div>

          {/* Credential bar: social proof + trust signals in one quiet row */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {AVATAR_IDS.map((id) => (
                  <div key={id} className="relative w-9 h-9 rounded-full ring-2 ring-background overflow-hidden bg-muted">
                    <Image
                      src={images.testimonials.patients[id]}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  ))}
                  <span className="text-sm font-bold text-foreground ml-0.5">4.9</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{siteConfig.hero.badge}</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-border" aria-hidden="true" />

            <div className="flex items-center gap-10">
              <div className="text-left">
                <p className="text-2xl font-heading font-bold text-foreground">
                  <CountUp end={siteConfig.clinic.happyPatients} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />+
                </p>
                <p className="text-sm text-muted-foreground mt-1">Happy patients</p>
              </div>
              <div className="text-left">
                <p className="text-2xl font-heading font-bold text-foreground">
                  <CountUp end={siteConfig.clinic.yearsExperience} duration={2.5} enableScrollSpy scrollSpyOnce />+
                </p>
                <p className="text-sm text-muted-foreground mt-1">Years of care</p>
              </div>
              <div className="text-left">
                <p className="text-2xl font-heading font-bold text-foreground flex items-center gap-1.5">
                  <Shield01Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  100%
                </p>
                <p className="text-sm text-muted-foreground mt-1">Board certified</p>
              </div>
            </div>
          </motion.div>

          {/* Premium Parallax Image */}
          <motion.div variants={itemVariants} className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-3xl sm:rounded-[2.5rem] overflow-hidden mt-12 sm:mt-16 shadow-2xl">
            <motion.div
              initial={reduceMotion ? false : { scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image src={images.hero} alt="Premium dental clinic treatment room" fill priority sizes="100vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
