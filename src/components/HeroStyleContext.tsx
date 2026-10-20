"use client";

import { createContext, useContext, ReactNode, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export type HeroStyle =
  | "cinematic"
  | "booking"
  | "specialist"
  | "minimal"
  | "immersive";

export const HERO_STYLES: HeroStyle[] = [
  "cinematic",
  "booking",
  "specialist",
  "minimal",
  "immersive",
];

interface HeroStyleContextType {
  heroStyle: HeroStyle;
  setHeroStyle: (style: HeroStyle) => void;
}

const HeroStyleContext = createContext<HeroStyleContextType | undefined>(undefined);

function HeroStyleState({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // The URL is the single source of truth — no mirrored state, no sync effect.
  const heroParam = searchParams.get("hero");
  const heroStyle: HeroStyle = HERO_STYLES.includes(heroParam as HeroStyle)
    ? (heroParam as HeroStyle)
    : "cinematic";

  const setHeroStyle = (style: HeroStyle) => {
    if (pathname === "/") {
      const url = new URL(window.location.href);
      if (style === "cinematic") {
        url.searchParams.delete("hero");
      } else {
        url.searchParams.set("hero", style);
      }
      window.history.pushState({}, "", url.toString());
    } else {
      router.push(style === "cinematic" ? "/" : `/?hero=${style}`);
    }
  };

  return (
    <HeroStyleContext.Provider value={{ heroStyle, setHeroStyle }}>
      {children}
    </HeroStyleContext.Provider>
  );
}

// Rendered while useSearchParams() suspends during prerender. Children must
// still receive a provider, otherwise useHeroStyle() throws in Navbar.
function HeroStyleFallback({ children }: { children: ReactNode }) {
  const setHeroStyle = () => {};
  return (
    <HeroStyleContext.Provider value={{ heroStyle: "cinematic", setHeroStyle }}>
      {children}
    </HeroStyleContext.Provider>
  );
}

export function HeroStyleProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<HeroStyleFallback>{children}</HeroStyleFallback>}>
      <HeroStyleState>{children}</HeroStyleState>
    </Suspense>
  );
}

export function useHeroStyle() {
  const context = useContext(HeroStyleContext);
  if (!context) {
    throw new Error("useHeroStyle must be used within a HeroStyleProvider");
  }
  return context;
}
