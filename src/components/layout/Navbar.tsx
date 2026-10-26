"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu01Icon,
  Cancel01Icon,
  Call02Icon,
  Calendar01Icon,
  ArrowRight01Icon,
  Layers01Icon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";
import { useBooking } from "@/components/BookingContext";
import { useHeroStyle, HeroStyle } from "@/components/HeroStyleContext";
import siteConfig from "@/config/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { openBooking } = useBooking();
  const { heroStyle, setHeroStyle } = useHeroStyle();
  const pathname = usePathname();
  const router = useRouter();

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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = siteConfig.navigation.header;

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 bg-white transition-[padding,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        scrolled
          ? "py-2 shadow-[0_4px_25px_rgba(15,23,42,0.08)] border-b border-border/80"
          : "py-2 sm:py-2 border-b border-border/40"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${siteConfig.clinic.name} — home`}
          className="flex items-center group relative z-10 shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
        >
          <Image
            src={siteConfig.clinic.logoLight}
            alt={siteConfig.clinic.name}
            width={185}
            height={72}
            className="h-12 w-auto sm:h-13 transition-transform duration-300 group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Desktop Nav - Clean links, no redundant dropdowns */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Primary">
          <ul className="flex items-center gap-3.5 xl:gap-6">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "text-sm py-1 whitespace-nowrap flex flex-col rounded transition-colors duration-200 relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:rounded-full after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)] hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
                      isActive
                        ? "text-primary font-semibold after:w-full after:bg-primary"
                        : "text-foreground/80 font-medium after:w-0 after:bg-primary hover:text-primary"
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
              className="group/call hidden xl:flex items-center gap-2.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 whitespace-nowrap"
            >
              <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover/call:bg-primary group-hover/call:text-white transition-colors">
                <Call02Icon className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <span>{siteConfig.contact.phone}</span>
            </a>

            <Button
              size="default"
              variant="cta"
              onClick={openBooking}
            >
              <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
              <span>Book Appointment</span>
            </Button>
          </div>
        </nav>

        {/* Tablet & Mobile Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
          <Button
            size="sm"
            variant="cta"
            onClick={openBooking}
            className="inline-flex text-xs px-3 h-9"
          >
            <Calendar01Icon className="size-3.5 shrink-0" aria-hidden="true" />
            <span>Book</span>
          </Button>

          <button
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-lg border border-border/70 bg-card/60 text-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
              className="fixed top-0 right-0 h-dvh w-[88vw] max-w-sm bg-card shadow-2xl z-[50] flex flex-col lg:hidden"
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
                <div className="min-h-full flex flex-col justify-between px-6 py-6 gap-6">
                  {/* Clean Mobile Links */}
                  <div className="flex flex-col gap-1.5">
                    {navLinks.map((link) => {
                      const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between p-2.5 rounded-xl transition-colors text-sm font-medium",
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-foreground/80 hover:bg-muted/60 hover:text-foreground"
                          )}
                        >
                          <span>{link.name}</span>
                          <ArrowRight01Icon className="w-4 h-4 opacity-50" />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Template Variations Showcase inside Mobile Drawer */}
                  {siteConfig.ui.showTemplateSwitchers && (
                    <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 space-y-3.5 my-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Layers01Icon className="w-3.5 h-3.5 text-accent" />
                          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
                            11 Template Layouts
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary font-bold">
                          PREVIEW
                        </span>
                      </div>

                      {/* Hero Section (5 Styles) */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider flex justify-between">
                          <span>Hero Section (5)</span>
                          <span className="text-primary font-semibold">Active: {heroStyle}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {[
                            { id: "booking", label: "01 Booking" },
                            { id: "specialist", label: "02 Specialist" },
                            { id: "cinematic", label: "03 Cinematic" },
                            { id: "immersive", label: "04 Immersive" },
                            { id: "minimal", label: "05 Minimal", span: true },
                          ].map((item) => {
                            const isCur = heroStyle === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setHeroStyle(item.id as HeroStyle);
                                  setMobileMenuOpen(false);
                                  if (pathname !== "/") {
                                    router.push(item.id === "cinematic" ? "/" : `/?hero=${item.id}`);
                                  } else {
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                  }
                                }}
                                className={cn(
                                  "py-1.5 px-2 rounded-lg text-xs font-mono text-left transition-all border cursor-pointer",
                                  item.span ? "col-span-2" : "",
                                  isCur
                                    ? "bg-primary text-white border-primary font-semibold shadow-xs"
                                    : "bg-card border-border/70 text-foreground/80 hover:border-primary/50"
                                )}
                              >
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Services Page (3 Views) */}
                      <div className="space-y-1.5 pt-2 border-t border-border/60">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                          Services Page (3)
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            { href: "/services", label: "01 Cards" },
                            { href: "/services?view=list", label: "02 List" },
                            { href: "/services?view=bento", label: "03 Bento" },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="py-1 px-1.5 rounded-lg text-[11px] font-mono text-center bg-card border border-border/70 text-foreground/80 hover:border-primary/50 hover:text-primary transition-all truncate"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* About Page (3 Views) */}
                      <div className="space-y-1.5 pt-2 border-t border-border/60">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                          About Page (3)
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            { href: "/about", label: "01 Story" },
                            { href: "/about?view=clinical", label: "02 Clinical" },
                            { href: "/about?view=timeline", label: "03 Timeline" },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="py-1 px-1.5 rounded-lg text-[11px] font-mono text-center bg-card border border-border/70 text-foreground/80 hover:border-primary/50 hover:text-primary transition-all truncate"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Drawer Bottom Contact & Action */}
                  <div className="space-y-3 pt-3 border-t border-border">
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 text-sm font-medium transition-colors"
                    >
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Call02Icon className="w-4 h-4" />
                      </span>
                      <span>{siteConfig.contact.phone}</span>
                    </a>

                    <Button
                      size="lg"
                      variant="cta"
                      className="w-full justify-center"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openBooking();
                      }}
                    >
                      <Calendar01Icon className="size-4 shrink-0" />
                      <span>Book Appointment</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}