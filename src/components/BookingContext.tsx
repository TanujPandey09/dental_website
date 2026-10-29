"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import siteConfig from "@/config/site";

/**
 * Quick-booking draft carried from the homepage hero to the appointment
 * form. It lives only in React state for the current session: it is never
 * written to the URL (no personal information in query strings) and never
 * persisted to storage.
 */
export interface BookingDraft {
  /** Preselected service — must match a siteConfig.forms.bookingServices value. */
  service?: string;
  /** Part of day chosen in the hero quick form: morning | afternoon | evening. */
  timeWindow?: string;
  /** Full name exactly as typed; the booking form splits it into first/last. */
  fullName?: string;
  /** Phone number as typed; sanitized before storage. */
  phone?: string;
  /** Preferred appointment date string (e.g. YYYY-MM-DD). */
  preferredDate?: string;
  /** Initial message or notes from patient. */
  message?: string;
}

interface BookingContextType {
  /**
   * Navigates to /appointment with an empty form. (Signature stays
   * argument-free so existing `onClick={openBooking}` usages keep working.)
   */
  openBooking: () => void;
  /**
   * Navigates to /appointment with the given quick-booking draft prefilled
   * into the booking form after sanitization.
   */
  openBookingWithDraft: (draft: BookingDraft) => void;
  closeBooking: () => void;
  /** Draft set by the most recent `openBookingWithDraft` call, if any. */
  bookingDraft: BookingDraft | null;
  /** Discards the draft once the appointment form has consumed it. */
  clearBookingDraft: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const TIME_WINDOWS = new Set(["morning", "afternoon", "evening"]);
const SERVICE_VALUES = new Set(
  siteConfig.forms.bookingServices.map((option) => option.value)
);

/** Strips control characters, trims whitespace and caps the length. */
function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/**
 * Treats every draft as untrusted input: unknown service/time values are
 * dropped, free text is sanitized and capped, and an empty result becomes
 * `null` instead of carrying garbage into the form.
 */
function sanitizeDraft(draft?: BookingDraft | null): BookingDraft | null {
  if (!draft) return null;
  const clean: BookingDraft = {};

  if (typeof draft.service === "string" && SERVICE_VALUES.has(draft.service)) {
    clean.service = draft.service;
  }
  if (typeof draft.timeWindow === "string" && TIME_WINDOWS.has(draft.timeWindow)) {
    clean.timeWindow = draft.timeWindow;
  }

  const fullName = cleanText(draft.fullName, 80);
  if (fullName) clean.fullName = fullName;

  const phone = cleanText(draft.phone, 40).replace(/[^\d()+\-. ]/g, "").slice(0, 20);
  if (phone) clean.phone = phone;

  const preferredDate = cleanText(draft.preferredDate, 20);
  if (preferredDate) clean.preferredDate = preferredDate;

  const message = cleanText(draft.message, 500);
  if (message) clean.message = message;

  return Object.keys(clean).length > 0 ? clean : null;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [bookingDraft, setBookingDraft] = useState<BookingDraft | null>(null);

  const goToAppointment = (draft?: BookingDraft | null) => {
    // A call without a draft intentionally clears any previous one so stale
    // details never leak into a different booking attempt.
    setBookingDraft(sanitizeDraft(draft ?? null));
    router.push("/appointment");
  };

  return (
    <BookingContext.Provider
      value={{
        openBooking: () => goToAppointment(),
        openBookingWithDraft: (draft) => goToAppointment(draft),
        closeBooking: () => {},
        bookingDraft,
        clearBookingDraft: () => setBookingDraft(null),
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
