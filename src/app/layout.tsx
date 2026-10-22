import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import siteConfig from "@/config/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.seo.metadataBase;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: siteConfig.seo.openGraph.title,
    description: siteConfig.seo.openGraph.description,
    type: siteConfig.seo.openGraph.type,
    siteName: siteConfig.clinic.name,
    images: siteConfig.seo.openGraph.images,
  },
  twitter: {
    card: siteConfig.seo.twitter.card,
    title: siteConfig.seo.twitter.title,
    description: siteConfig.seo.twitter.description,
    images: siteConfig.seo.twitter.images,
  },
  icons: {
    icon: siteConfig.clinic.favicon,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: siteConfig.clinic.primaryColor,
};

import { BookingProvider } from "@/components/BookingContext";
import { HeroStyleProvider } from "@/components/HeroStyleContext";
import { CustomCursor } from "@/components/CustomCursor";
import { MobileTemplateSwitcher } from "@/components/ui/MobileTemplateSwitcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(fraunces.variable, inter.variable, "antialiased")}>
      <body className="min-h-screen bg-background font-body flex flex-col overflow-x-hidden">
        <CustomCursor />
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <BookingProvider>
              <HeroStyleProvider>
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
                >
                  Skip to content
                </a>
                <Navbar />
                <main id="main-content" className="flex-1">
                  {children}
                </main>
                <Footer />
                <MobileTemplateSwitcher />
              </HeroStyleProvider>
            </BookingProvider>
          </SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
