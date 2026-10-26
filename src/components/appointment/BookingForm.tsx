"use client";

import { useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Calendar01Icon,
  Clock01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  CheckmarkCircle01Icon,
  Shield01Icon,
  SmileIcon,
  Sun01Icon,
  Sun02Icon,
  Moon02Icon,
  Call02Icon,
  CheckmarkBadge01Icon,
  DentalCareIcon,
  DentalToothIcon,
  UserIcon,
  Mail01Icon,
} from "hugeicons-react";
import siteConfig from "@/config/site";
import { useBooking } from "@/components/BookingContext";
import { cn } from "@/lib/utils";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const TIME_CATEGORIES = [
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

const SERVICE_META: Record<string, {
  badge: string;
  duration: string;
  desc: string;
  icon: typeof SmileIcon;
}> = {
  general: {
    badge: "Preventative",
    duration: "45 mins",
    desc: "Comprehensive exam, low-dose 3D digital x-rays & ultrasonic prophylaxis cleaning.",
    icon: DentalCareIcon,
  },
  cosmetic: {
    badge: "Aesthetic",
    duration: "45 mins",
    desc: "Custom porcelain veneers, composite bonding & digital 3D smile design mockups.",
    icon: SmileIcon,
  },
  implants: {
    badge: "Restorative",
    duration: "45 mins",
    desc: "3D CBCT volume scan, bone density evaluation & guided surgical implant blueprint.",
    icon: DentalToothIcon,
  },
  whitening: {
    badge: "Popular",
    duration: "60 mins",
    desc: "Advanced in-office laser whitening — up to 8 shades brighter in one session.",
    icon: Sun01Icon,
  },
  emergency: {
    badge: "Priority",
    duration: "Same-Day",
    desc: "Immediate clinical triage for acute pain, broken tooth, or dental trauma.",
    icon: Call02Icon,
  },
};

function slotForTimeWindow(timeWindow?: string): string {
  if (!timeWindow) return "";
  const category = TIME_CATEGORIES.find(
    (c) => c.period.toLowerCase() === timeWindow.toLowerCase()
  );
  return category?.slots[0] ?? "";
}

function splitFullName(fullName?: string): { firstName: string; lastName: string } {
  const parts = (fullName ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a preferred date"),
  timePref: z.string().min(1, "Please select a time preference"),
  notes: z.string().optional(),
});

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { bookingDraft, clearBookingDraft } = useBooking();

  const { firstName, lastName } = splitFullName(bookingDraft?.fullName);

  // Default date to tomorrow if not set
  const initialDateStr = useMemo(() => {
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    const yyyy = tmrw.getFullYear();
    const mm = String(tmrw.getMonth() + 1).padStart(2, "0");
    const dd = String(tmrw.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName,
      lastName,
      email: "",
      phone: bookingDraft?.phone ?? "",
      service: bookingDraft?.service ?? "general",
      date: initialDateStr,
      timePref: slotForTimeWindow(bookingDraft?.timeWindow) || "10:00 AM",
      notes: "",
    },
  });

  const selectedDateStr = useWatch({ control: form.control, name: "date" });
  const selectedService = useWatch({ control: form.control, name: "service" });
  const selectedTime = useWatch({ control: form.control, name: "timePref" });

  // Calendar state
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewDate, setViewDate] = useState<Date>(() => {
    if (initialDateStr) {
      const parsed = new Date(initialDateStr + "T00:00:00");
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return today;
  });

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handleSelectDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;
    form.setValue("date", dateString, { shouldValidate: true });
  };

  const selectShortcut = (daysToAdd: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysToAdd);
    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, "0");
    const dd = String(target.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;
    form.setValue("date", dateString, { shouldValidate: true });
    setViewDate(target);
  };

  const isCurrentMonthPast =
    viewYear < today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth <= today.getMonth());

  // Formatted date string for UI
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDateStr) return "Select a date";
    const d = new Date(selectedDateStr + "T00:00:00");
    if (isNaN(d.getTime())) return selectedDateStr;
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDateStr]);

  const activeServiceInfo = siteConfig.forms.bookingServices.find(
    (s) => s.value === selectedService
  );

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      form.reset();
      clearBookingDraft();
      setStatus("success");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="p-1.5 rounded-3xl bg-primary/10 border border-primary/20 my-4" role="status" aria-live="polite">
        <div className="rounded-2xl bg-card border border-primary/20 p-8 sm:p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 text-primary">
            <CheckmarkCircle01Icon className="w-9 h-9" aria-hidden="true" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-3">
            Appointment Request Confirmed
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            Thank you! We have reserved your requested consultation slot. Our patient coordination concierge will contact you via phone/email within 2 hours to confirm your private operatory suite.
          </p>

          <div className="max-w-sm mx-auto p-4 rounded-xl bg-muted/50 border border-border/70 text-left mb-8 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Procedure:</span>
              <span className="font-semibold text-foreground">{activeServiceInfo?.label || "General Care"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Preferred Schedule:</span>
              <span className="font-semibold text-primary">{formattedSelectedDate} at {selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-semibold text-foreground">{siteConfig.contact.landmark}</span>
            </div>
          </div>

          <Button
            onClick={() => setStatus("idle")}
            variant="outline"
            size="lg"
          >
            Book Another Appointment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

        {/* ============================================================== */}
        {/* TOP 3-STAGE PROGRESS STEPPER (Unified Clinical Design)         */}
        {/* ============================================================== */}
        <div className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-muted/40 border border-border/80 shadow-sm">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-4 relative">
            {/* Step 1 */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 ring-2 sm:ring-4 ring-primary/20 shadow-sm">
                <DentalCareIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] sm:text-[10px] font-mono uppercase font-bold text-primary tracking-wider">Stage 1</p>
                <p className="text-[10px] sm:text-xs font-bold text-foreground truncate">Procedure</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 ring-2 sm:ring-4 ring-primary/20 shadow-sm">
                <Calendar01Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] sm:text-[10px] font-mono uppercase font-bold text-primary tracking-wider">Stage 2</p>
                <p className="text-[10px] sm:text-xs font-bold text-foreground truncate">Date &amp; Time</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center shrink-0 ring-2 sm:ring-4 ring-background shadow-sm">
                <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] sm:text-[10px] font-mono uppercase font-bold text-muted-foreground tracking-wider">Stage 3</p>
                <p className="text-[10px] sm:text-xs font-bold text-foreground truncate">Details</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* STEP 1: REASON FOR VISIT (Clean SaaS Card Selector)           */}
        {/* ============================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <DentalCareIcon className="w-3.5 h-3.5" />
                </div>
                <span>Clinical Consultation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                Reason for Visit
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted border border-border/60 text-muted-foreground hidden sm:inline-block">
              5 Procedure Types
            </span>
          </div>

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {siteConfig.forms.bookingServices.map((option) => {
                    const isSelected = field.value === option.value;
                    const meta = SERVICE_META[option.value] || {
                      badge: "Standard",
                      duration: "45 mins",
                      desc: "Comprehensive diagnostic exam & care plan.",
                      icon: Shield01Icon,
                    };
                    const Icon = meta.icon;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => field.onChange(option.value)}
                        className={cn(
                          "p-3.5 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between group relative overflow-hidden",
                          isSelected
                            ? "bg-primary/5 border-primary ring-2 ring-primary/20 shadow-md"
                            : "bg-card border-border/70 hover:border-primary/40 hover:bg-muted/40 shadow-sm"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2.5 mb-2">
                          <div className={cn(
                            "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors shrink-0",
                            isSelected
                              ? "bg-primary text-white shadow-sm"
                              : "bg-muted text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
                          )}>
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={cn(
                              "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                              isSelected
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-muted text-muted-foreground border-border/50"
                            )}>
                              {meta.duration}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                                <CheckmarkCircle01Icon className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="font-heading font-bold text-foreground text-sm sm:text-base leading-snug group-hover:text-primary transition-colors">
                            {option.label}
                          </div>
                          <p className="text-muted-foreground text-xs leading-relaxed mt-1 line-clamp-2">
                            {meta.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ============================================================== */}
        {/* STEP 2: DATE & TIME SLOT (SaaS Scheduling Widget)             */}
        {/* ============================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar01Icon className="w-3.5 h-3.5" />
                </div>
                <span>Live Availability</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                Date & Time Slot
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Calendar</span>
            </div>
          </div>

          {/* Double-Bezel SaaS Calendar & Slot Split Widget */}
          <div className="p-1 sm:p-1.5 rounded-2xl sm:rounded-3xl bg-muted/40 border border-border/70 shadow-sm">
            <div className="rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-2px)] bg-card border border-border/60 p-3 sm:p-6">

              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                {/* Left: Interactive Monthly Calendar */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <Calendar01Icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-heading font-bold text-foreground">
                        {MONTH_NAMES[viewMonth]} {viewYear}
                      </span>
                    </div>

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
                      <span key={day} className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground py-1">
                        {day}
                      </span>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                    {/* Empty leading days */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10" />
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

                      const dayYyyy = currentDate.getFullYear();
                      const dayMm = String(currentDate.getMonth() + 1).padStart(2, "0");
                      const dayDd = String(currentDate.getDate()).padStart(2, "0");
                      const dayDateStr = `${dayYyyy}-${dayMm}-${dayDd}`;

                      const isSelected = selectedDateStr === dayDateStr;

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          disabled={isPast}
                          onClick={() => handleSelectDay(dayNum)}
                          className={cn(
                            "h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 mx-auto text-xs font-semibold rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer relative",
                            isSelected
                              ? "bg-primary text-white shadow-md shadow-primary/30 font-bold scale-105"
                              : isPast
                                ? "text-muted-foreground/30 cursor-not-allowed line-through decoration-muted-foreground/20"
                                : "text-foreground hover:bg-primary/10 hover:text-primary",
                            isToday && !isSelected && "ring-1 ring-primary text-primary font-bold bg-primary/5"
                          )}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Shortcut Buttons */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-1.5 flex-wrap">
                    <span className="text-[11px] font-semibold text-muted-foreground">Quick Select:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => selectShortcut(0)}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-foreground/80"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => selectShortcut(1)}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-foreground/80"
                      >
                        Tomorrow
                      </button>
                      <button
                        type="button"
                        onClick={() => selectShortcut(7)}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-foreground/80"
                      >
                        Next Week
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Available Time Slots */}
                <div className="lg:col-span-6 space-y-4 lg:border-l lg:border-border/60 lg:pl-8">
                  <div className="pb-2 border-b border-border/60 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                        Slots For
                      </div>
                      <div className="text-sm font-heading font-bold text-foreground">
                        {formattedSelectedDate}
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {selectedTime ? `Selected: ${selectedTime}` : "Choose Slot"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {TIME_CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <div key={cat.period} className="space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-foreground/80">
                            <Icon className="w-3.5 h-3.5 text-primary" />
                            <span>{cat.period} Slots</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {cat.slots.map((slot) => {
                              const isSelected = selectedTime === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => form.setValue("timePref", slot, { shouldValidate: true })}
                                  className={cn(
                                    "h-10 px-3 text-xs font-semibold rounded-xl border flex items-center justify-between transition-all duration-200 cursor-pointer",
                                    isSelected
                                      ? "bg-primary text-white border-primary shadow-sm font-bold scale-[1.02]"
                                      : "bg-card hover:bg-primary/5 hover:border-primary/40 text-foreground/80 border-border/70"
                                  )}
                                >
                                  <span>{slot}</span>
                                  {isSelected ? (
                                    <CheckmarkCircle01Icon className="w-3.5 h-3.5 text-white" />
                                  ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LIVE APPOINTMENT SUMMARY BANNER (SaaS Floating Bar)           */}
        {/* ============================================================== */}
        <div className="p-1 rounded-2xl bg-primary/10 border border-primary/20 shadow-sm">
          <div className="rounded-xl bg-card border border-primary/20 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Clock01Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-primary uppercase tracking-wider">
                  Reservation Summary
                </div>
                <div className="text-sm sm:text-base font-bold text-foreground">
                  {activeServiceInfo?.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formattedSelectedDate} at <span className="font-semibold text-foreground">{selectedTime}</span>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border/70 text-xs text-muted-foreground shrink-0 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Suite 100 • No prepay required</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* STEP 3: PATIENT CONTACT INFORMATION (Tactile SaaS Inputs)      */}
        {/* ============================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UserIcon className="w-3.5 h-3.5" />
                </div>
                <span>Patient Identity</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                Your Contact Information
              </h3>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:inline-block">
              {siteConfig.clinic.compliance.formSecurityBadge}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">First Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="e.g. John"
                        className="h-12 pl-10 rounded-xl bg-card border-border/70 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
                        {...field}
                      />
                      <UserIcon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Last Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="e.g. Doe"
                        className="h-12 pl-10 rounded-xl bg-card border-border/70 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
                        {...field}
                      />
                      <UserIcon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="e.g. john@example.com"
                        className="h-12 pl-10 rounded-xl bg-card border-border/70 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
                        {...field}
                      />
                      <Mail01Icon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="h-12 pl-10 rounded-xl bg-card border-border/70 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
                        {...field}
                      />
                      <Call02Icon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Specific Clinical Concerns / Insurance Notes (Optional)</FormLabel>
                <FormControl>
                  <textarea
                    className="flex min-h-[90px] w-full rounded-xl border border-border/70 bg-card px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                    placeholder="E.g., dental anxiety, previous x-rays available, dental insurance carrier..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-destructive bg-destructive/10 rounded-xl px-4 py-3 border border-destructive/20">
            {errorMessage}
          </p>
        )}

        {/* Submit Action: Step 3.1 compact-right on desktop, centered on mobile */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-center sm:justify-end">
            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="w-full sm:w-auto h-12 text-sm font-bold shadow-md shadow-primary/20"
              disabled={status === "submitting"}
              aria-busy={status === "submitting"}
            >
              <Calendar01Icon className="size-4 shrink-0" aria-hidden="true" />
              <span>{status === "submitting" ? "Reserving Your Suite…" : "Confirm Appointment Request"}</span>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground flex-wrap pt-1">
            <span className="inline-flex items-center gap-1">
              <CheckmarkBadge01Icon className="w-3.5 h-3.5 text-primary" />
              <span>Zero cancellation fees</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Shield01Icon className="w-3.5 h-3.5 text-primary" />
              <span>{siteConfig.clinic.compliance.encryptionNotice}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock01Icon className="w-3.5 h-3.5 text-primary" />
              <span>2-hour confirmation guarantee</span>
            </span>
          </div>
        </div>

      </form>
    </Form>
  );
}

