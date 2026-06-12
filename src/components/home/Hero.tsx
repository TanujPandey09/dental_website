"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight01Icon, StarIcon, Shield01Icon } from "hugeicons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useBooking } from "@/components/BookingContext";

export function Hero() {
  const { openBooking } = useBooking();
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4, // This is crucial so the page transition doesn't hide the animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <section className="relative pt-20 pb-20 lg:pt-30 lg:pb-25 overflow-hidden bg-background">
      {/* Premium Apple-style Drifting Ambient Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden pointer-events-none -z-10 flex items-center justify-center opacity-60">
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0], 
            y: [0, -50, 100, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/25 rounded-[40%_60%_70%_30%] blur-[100px] mix-blend-multiply" 
        />
        <motion.div 
          animate={{ 
            x: [0, -120, 80, 0], 
            y: [0, 100, -80, 0],
            scale: [1, 0.9, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] md:w-[600px] h-[500px] md:h-[600px] bg-accent/25 rounded-[60%_40%_30%_70%] blur-[100px] mix-blend-multiply -translate-x-1/4 translate-y-1/4" 
        />
        <motion.div 
          animate={{ 
            x: [0, 80, -100, 0], 
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[550px] md:w-[700px] h-[550px] md:h-[700px] bg-secondary/15 rounded-[50%_50%_70%_30%] blur-[120px] mix-blend-multiply translate-x-1/3 -translate-y-1/4" 
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center relative z-10">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/90 backdrop-blur-md text-white font-medium text-xs tracking-wider uppercase mb-8 shadow-sm border border-secondary/20">
            <StarIcon className="w-3.5 h-3.5 fill-current" />
            <span>Voted #1 Dental Practice in New York</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-[4.5rem] font-heading font-bold text-foreground leading-[1.05] tracking-tight mb-8">
            Advanced Dentistry. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Designed Around You.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
            Experience world-class healthcare where luxury hospitality meets advanced medical expertise. We believe your smile is your greatest asset.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-24 w-full">
            <Button onClick={openBooking} size="lg" className="w-full sm:w-auto h-14 px-10 rounded-full text-base font-bold shadow-[0_8px_30px_rgb(14,165,164,0.3)] hover:shadow-[0_8px_40px_rgb(14,165,164,0.4)] transition-all bg-primary hover:bg-primary/90 text-white">
              Request Appointment
              <ArrowRight01Icon className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/doctors">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 rounded-full text-base font-bold bg-white/50 backdrop-blur-md border-border/50 hover:bg-white transition-colors">
                Meet Our Specialists
              </Button>
            </Link>
          </motion.div>

          {/* Clean Apple-style Trust Factors with CountUp */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 w-full max-w-4xl mx-auto pt-5 border-t border-border/50 mb-20">
            <div className="flex flex-col items-center">
              <p className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
                <CountUp end={5000} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />+
              </p>
              <p className="text-sm text-muted-foreground font-semibold mt-3 tracking-wider uppercase">Happy Patients</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
                <CountUp end={15} duration={2.5} enableScrollSpy scrollSpyOnce />+
              </p>
              <p className="text-sm text-muted-foreground font-semibold mt-3 tracking-wider uppercase">Years of Excellence</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl lg:text-5xl font-heading font-bold text-foreground flex items-center justify-center gap-2">
                <Shield01Icon className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                100%
              </p>
              <p className="text-sm text-muted-foreground font-semibold mt-3 tracking-wider uppercase">Board Certified</p>
            </div>
          </motion.div>

          {/* Premium Parallax Image Grid */}
          <motion.div variants={itemVariants} className="relative w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden mt-12 shadow-2xl">
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000&auto=format&fit=crop" alt="Premium Clinic" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
