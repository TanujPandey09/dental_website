import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Lumina Dental Care | Advanced Dentistry Designed Around Your Smile",
  description: "Modern dentistry with experienced professionals, advanced technology, and patient-first care.",
  keywords: ["dentist", "dental clinic", "cosmetic dentistry", "dental implants", "orthodontics", "premium healthcare"],
  openGraph: {
    title: "Lumina Dental Care",
    description: "Advanced Dentistry Designed Around Your Smile",
    type: "website",
    images: ["/dental/og-image.png"],
  },
  icons: {
    icon: '/dental/favicon.png',
  },
};

import { BookingProvider } from "@/components/BookingContext";
import { CustomCursor } from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(interTight.variable, inter.variable, "antialiased")}>
      <body className="min-h-screen bg-background font-body flex flex-col">
        <CustomCursor />
        <SmoothScroll>
          <BookingProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </BookingProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
