"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface BookingContextType {
  openBooking: () => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <BookingContext.Provider 
      value={{ 
        openBooking: () => router.push("/appointment"), 
        closeBooking: () => {} 
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

