"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu01Icon, Cancel01Icon, Call02Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import { useBooking } from "@/components/BookingContext";
import siteConfig from "@/config/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBooking } = useBooking();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = siteConfig.navigation.header;

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-[background-color,border-color,padding,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        scrolled
          ? "bg-card/80 backdrop-blur-xl border-b border-border py-3 shadow-[0_4px_30px_rgba(15,23,42,0.06)]"
          : "bg-transparent border-b border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          aria-label={`${siteConfig.clinic.name} — home`}
          className="flex items-center group relative z-10 shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
        >
          <Image
            src={siteConfig.clinic.logoLight}
            alt={siteConfig.clinic.name}
            width={150}
            height={59}
            className="h-10 w-auto sm:h-11 transition-transform duration-300 group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Primary">
          <ul className="flex items-center gap-3.5 xl:gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "text-sm py-1 whitespace-nowrap flex flex-col rounded transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:rounded-full after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)] hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
                      isActive
                        ? "text-primary font-semibold after:w-full after:bg-primary"
                        : "text-foreground/75 font-medium after:w-0 after:bg-primary hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3 xl:gap-4 border-l border-border pl-4 xl:pl-6">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="hidden xl:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 whitespace-nowrap"
            >
              <Call02Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{siteConfig.contact.phone}</span>
            </a>

            <Button
              onClick={openBooking}
              className="rounded-lg px-5 xl:px-6 h-11 xl:h-12 cursor-pointer text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-[background-color,box-shadow] duration-200 whitespace-nowrap"
            >
              Book Appointment
            </Button>
          </div>
        </nav>

        {/* Tablet & Mobile Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 lg:hidden">
          <Button
            onClick={openBooking}
            className="hidden sm:inline-flex rounded-lg px-4 sm:px-5 h-10 md:h-11 text-xs md:text-sm font-semibold shadow-sm shadow-primary/20 cursor-pointer"
          >
            Book Now
          </Button>

          <button
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-lg border border-border/70 bg-card/60 backdrop-blur-md text-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <Cancel01Icon className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
            ) : (
              <Menu01Icon className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Premium Side-Drawer Menu for Mobile & Tablet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[45] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-dvh w-[85vw] max-w-sm bg-card shadow-2xl z-[50] flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-2 shrink-0">
                <Image
                  src={siteConfig.clinic.logoLight}
                  alt={siteConfig.clinic.name}
                  width={130}
                  height={50}
                  className="h-8 w-auto"
                />
                <button
                  className="p-2 text-foreground/80 hover:text-foreground bg-muted/50 hover:bg-muted rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <Cancel01Icon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="min-h-full flex flex-col justify-center px-6 py-8 gap-5">
                  <motion.div
                    className="flex flex-col gap-5"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={{
                      open: {
                        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                      },
                      closed: {
                        transition: { staggerChildren: 0.05, staggerDirection: -1 }
                      }
                    }}
                  >
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <motion.div
                          key={link.name}
                          variants={{
                            open: { opacity: 1, y: 0 },
                            closed: { opacity: 0, y: 20 }
                          }}
                        >
                          <Link
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                              "text-2xl font-heading font-bold transition-colors block leading-tight rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
                              isActive ? "text-primary" : "text-foreground hover:text-primary"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 pt-6 border-t border-border flex flex-col gap-4"
                  >
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="flex items-center gap-3 text-foreground/80 font-medium py-1"
                    >
                      <Call02Icon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                      <span className="text-base">{siteConfig.contact.phone}</span>
                    </a>
                    <Button
                      size="lg"
                      className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-bold shadow-lg shadow-primary/20"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openBooking();
                      }}
                    >
                      Book Appointment
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header >
  );
}