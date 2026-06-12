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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Doctors", href: "/doctors" },
    { name: "About Us", href: "/about" },
    { name: "Reviews", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-primary/95 backdrop-blur-xl border-white/10 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
          : "bg-white border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center group relative z-10 shrink-0">
          <Image
            src="/dental/Logo.png"
            alt="Healthy Smiles Dental Logo"
            width={150}
            height={10}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm transition-all duration-300 relative py-1 flex flex-col after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:rounded-full after:transition-all hover:after:w-full",
                      scrolled
                        ? "hover:text-white after:bg-white"
                        : "hover:text-primary after:bg-primary",
                      isActive
                        ? scrolled
                          ? "text-white font-semibold after:w-full"
                          : "text-primary font-semibold after:w-full"
                        : scrolled
                          ? "text-white/80 font-medium after:w-0"
                          : "text-foreground/80 font-medium after:w-0"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className={cn(
              "flex items-center gap-3 lg:gap-4 border-l pl-4 lg:pl-6 transition-colors duration-300",
              scrolled ? "border-white/20" : "border-border/50"
            )}
          >
            <a
              href="tel:+1234567890"
              className={cn(
                "hidden lg:flex items-center gap-2 text-sm font-medium transition-colors duration-300",
                scrolled
                  ? "text-white/80 hover:text-white"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <Call02Icon className="w-4 h-4 shrink-0" />
              <span>(555) 123-4567</span>
            </a>

            <Button
              onClick={openBooking}

              className={cn(
                "rounded-lg px-5 lg:px-6 py-6 cursor-pointer text-sm font-semibold transition-all duration-300 shadow-md whitespace-nowrap",
                scrolled
                  ? "bg-white text-primary hover:bg-white/90"
                  : "bg-accent text-white hover:bg-accent/90 shadow-accent/10"
              )}
            >
              Book Appointment
            </Button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-md transition-colors",
            scrolled ? "text-white" : "text-foreground"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <Cancel01Icon className="w-6 h-6" />
          ) : (
            <Menu01Icon className="w-6 h-6" />
          )}
        </button>
      </div >

      {/* Premium Side-Drawer Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[45] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-[50] flex flex-col md:hidden"
            >
              <div className="flex justify-end p-6">
                <button
                  className="p-2 text-foreground/80 hover:text-foreground bg-muted/50 rounded-full transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Cancel01Icon className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col justify-center">
                <motion.div 
                  className="flex flex-col gap-6"
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
                          className={cn(
                            "text-3xl font-heading font-bold transition-colors block",
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
                  className="mt-12 pt-8 border-t border-border flex flex-col gap-4"
                >
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 text-foreground/80 font-medium py-2"
                  >
                    <Call02Icon className="w-5 h-5 text-primary" />
                    <span className="text-lg">(555) 123-4567</span>
                  </a>
                  <Button
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl py-6 text-lg font-bold shadow-lg shadow-accent/20"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openBooking();
                    }}
                  >
                    Book Appointment
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header >
  );
}