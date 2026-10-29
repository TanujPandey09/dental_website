"use client";

import Link from "next/link";
import { ArrowRight01Icon, Call02Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";

export interface BookCallButtonsProps {
  onBookClick?: () => void;
  className?: string;
  bookText?: string;
  phoneText?: string;
}

export function BookCallButtons({
  onBookClick,
  className,
  bookText,
  phoneText,
}: BookCallButtonsProps) {
  const resolvedPhone = phoneText || siteConfig.contact.phone;
  const cleanPhone = resolvedPhone.replace(/[^0-9+]/g, "");

  return (
    <div className={cn("flex flex-wrap items-center gap-4 sm:gap-6", className)}>
      <button
        type="button"
        onClick={onBookClick}
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer touch-manipulation group"
      >
        <span>{bookText || "Book an appointment"}</span>
        <ArrowRight01Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>

      <a
        href={`tel:${cleanPhone}`}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-colors py-2"
      >
        <Call02Icon className="w-4 h-4 text-primary" />
        <span>{resolvedPhone}</span>
      </a>
    </div>
  );
}
