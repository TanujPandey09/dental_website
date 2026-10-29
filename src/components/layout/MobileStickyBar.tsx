"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Call02Icon, Calendar01Icon } from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";

export function MobileStickyBar() {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only reveal sticky action bar once patient scrolls past the hero section (320px)
      // This prevents visual clutter and button collisions at the top of the screen
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Suppress on form/booking pages where user is already actively filling details
  if (pathname === "/appointment" || pathname === "/contact") {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          role="region"
          aria-label="Quick appointment and phone actions"
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-md border-t border-border/80 px-3.5 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.08)] flex items-center gap-2.5 pointer-events-auto"
        >
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center justify-center gap-1.5 px-3.5 h-10 rounded-lg bg-muted/90 hover:bg-muted text-foreground border border-border/80 font-medium text-xs touch-manipulation active:scale-95 transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Call office at ${siteConfig.contact.phone}`}
          >
            <Call02Icon className="size-4 text-primary shrink-0" aria-hidden="true" />
            <span className="font-semibold">Call Office</span>
          </a>

          <button
            type="button"
            onClick={openBooking}
            className="flex-1 h-10 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-xs touch-manipulation active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Calendar01Icon className="size-4 shrink-0 text-white" aria-hidden="true" />
            <span>Book Appointment</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
