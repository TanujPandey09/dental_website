"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar01Icon,
  Clock01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Sun01Icon,
  Sun02Icon,
  Moon02Icon,
  CheckmarkCircle01Icon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface CalendarDatePickerProps {
  value?: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export function CalendarDatePicker({
  value,
  onChange,
  placeholder = "Select appointment date",
  className,
}: CalendarDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse existing value or fallback to today for calendar view
  const selectedDate = value ? new Date(value + "T00:00:00") : null;
  const [viewDate, setViewDate] = useState<Date>(selectedDate || today);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Navigate months
  const handlePrevMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  // Days calculations
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  // Handle date selection
  const handleSelectDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;
    onChange(dateString);
    setIsOpen(false);
  };

  // Quick shortcuts
  const selectShortcut = (daysToAdd: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysToAdd);
    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, "0");
    const dd = String(target.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;
    onChange(dateString);
    setViewDate(target);
    setIsOpen(false);
  };

  // Formatted display text
  const formatDisplay = (d: Date | null) => {
    if (!d || isNaN(d.getTime())) return placeholder;
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isCurrentMonthPast =
    viewYear < today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth <= today.getMonth());

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select appointment date"
        className={cn(
          "h-12 w-full px-4 rounded-xl border border-input bg-card flex items-center justify-between text-sm transition-[border-color,box-shadow] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isOpen ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/50",
          !value ? "text-muted-foreground" : "text-foreground font-medium",
          className
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Calendar01Icon className="w-4 h-4 text-primary shrink-0" />
          <span className="truncate">{formatDisplay(selectedDate)}</span>
        </div>
        <span className="text-[11px] font-semibold text-primary px-2 py-0.5 rounded-md bg-primary/10 shrink-0">
          {value ? "Change" : "Pick Date"}
        </span>
      </button>

      {/* Luxury Interactive Calendar Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-0 sm:left-auto right-0 sm:right-auto mt-2 w-full sm:w-[320px] p-4 rounded-2xl bg-card border border-border/80 shadow-[0_20px_50px_rgba(15,23,42,0.15)] backdrop-blur-2xl z-50 flex flex-col gap-3.5"
          >
            {/* Header: Month & Year + Arrows */}
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <span className="text-sm font-heading font-bold text-foreground">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={isCurrentMonthPast}
                  aria-label="Previous month"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ArrowLeft01Icon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Next month"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <ArrowRight01Icon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day Names Row */}
            <div className="grid grid-cols-7 text-center">
              {DAYS_OF_WEEK.map((day) => (
                <span key={day} className="text-[11px] font-semibold text-muted-foreground py-1">
                  {day}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty leading days */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-8 w-8" />
              ))}

              {/* Day numbers */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const currentDate = new Date(viewYear, viewMonth, dayNum);
                const isPast = currentDate < today;
                const isToday =
                  currentDate.getDate() === today.getDate() &&
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getFullYear() === today.getFullYear();
                const isSelected =
                  selectedDate &&
                  currentDate.getDate() === selectedDate.getDate() &&
                  currentDate.getMonth() === selectedDate.getMonth() &&
                  currentDate.getFullYear() === selectedDate.getFullYear();

                return (
                  <button
                    key={dayNum}
                    type="button"
                    disabled={isPast}
                    onClick={() => handleSelectDay(dayNum)}
                    className={cn(
                      "h-8 w-8 mx-auto text-xs font-semibold rounded-lg flex items-center justify-center transition-[background-color,color,box-shadow] duration-200 cursor-pointer relative",
                      isSelected
                        ? "bg-primary text-white shadow-md shadow-primary/30 font-bold"
                        : isPast
                        ? "text-muted-foreground/35 cursor-not-allowed"
                        : "text-foreground hover:bg-primary/10 hover:text-primary",
                      isToday && !isSelected && "ring-1 ring-primary/60 text-primary font-bold"
                    )}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            {/* Quick date shortcuts */}
            <div className="pt-2.5 border-t border-border/60 flex items-center justify-between gap-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground">
                Quick:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => selectShortcut(0)}
                  className="text-[11px] font-semibold px-2 py-1 rounded-md bg-muted/60 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-foreground/80"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => selectShortcut(1)}
                  className="text-[11px] font-semibold px-2 py-1 rounded-md bg-muted/60 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-foreground/80"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => selectShortcut(7)}
                  className="text-[11px] font-semibold px-2 py-1 rounded-md bg-muted/60 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-foreground/80"
                >
                  Next Week
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TimeSlotPickerProps {
  value?: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const TIME_CATEGORIES = [
  {
    period: "Morning",
    icon: Sun01Icon,
    slots: ["08:30 AM", "09:15 AM", "10:00 AM", "11:15 AM"],
  },
  {
    period: "Afternoon",
    icon: Sun02Icon,
    slots: ["01:00 PM", "02:00 PM", "03:15 PM", "04:30 PM"],
  },
  {
    period: "Evening",
    icon: Moon02Icon,
    slots: ["05:15 PM", "06:00 PM", "06:45 PM"],
  },
];

export function TimeSlotPicker({
  value,
  onChange,
  placeholder = "Select preferred time slot",
  className,
}: TimeSlotPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectSlot = (slot: string) => {
    onChange(slot);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select preferred time slot"
        className={cn(
          "h-12 w-full px-4 rounded-xl border border-input bg-card flex items-center justify-between text-sm transition-[border-color,box-shadow] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isOpen ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/50",
          !value ? "text-muted-foreground" : "text-foreground font-medium",
          className
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Clock01Icon className="w-4 h-4 text-primary shrink-0" />
          <span className="truncate">{value || placeholder}</span>
        </div>
        <span className="text-[11px] font-semibold text-primary px-2 py-0.5 rounded-md bg-primary/10 shrink-0">
          {value ? "Change" : "Pick Slot"}
        </span>
      </button>

      {/* Luxury Interactive Time Slot Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-0 sm:left-auto right-0 sm:right-auto mt-2 w-full sm:w-[340px] p-4 rounded-2xl bg-card border border-border/80 shadow-[0_20px_50px_rgba(15,23,42,0.15)] backdrop-blur-2xl z-50 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <span className="text-xs font-bold text-muted-foreground">
                Available Appointment Slots
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                Real-Time
              </span>
            </div>

            <div className="space-y-3.5">
              {TIME_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.period} className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                      <span>{cat.period}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {cat.slots.map((slot) => {
                        const isSelected = value === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => handleSelectSlot(slot)}
                            className={cn(
                              "h-9 px-3 text-xs font-semibold rounded-xl border flex items-center justify-between transition-[background-color,border-color,color] duration-200 cursor-pointer",
                              isSelected
                                ? "bg-primary text-white border-primary shadow-sm font-bold"
                                : "bg-muted/40 hover:bg-primary/10 hover:border-primary/50 text-foreground/80 border-border/70"
                            )}
                          >
                            <span>{slot}</span>
                            {isSelected && <CheckmarkCircle01Icon className="w-3.5 h-3.5 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
