import Link from "next/link";
import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Modern, vector-based dental logo component.
 * Dynamic: reads clinic name and tagline directly from `siteConfig.clinic`.
 * Designed for sellable templates so buyers never have to manually edit raster PNG logos.
 */
export function Logo({
  variant = "light",
  showTagline = true,
  className,
  href = "/",
  size = "md",
}: LogoProps) {
  const isDark = variant === "dark";

  // Split name for potential two-tone styling (e.g., "Lumina" + "Dental Care")
  const nameParts = siteConfig.clinic.name.split(" ");
  const firstName = nameParts[0] || "Lumina";
  const restName = nameParts.slice(1).join(" ") || "Dental";

  const sizeClasses = {
    sm: {
      icon: "w-7 h-7 sm:w-8 sm:h-8",
      title: "text-base sm:text-lg",
      tagline: "text-[9px]",
      gap: "gap-2.5",
    },
    md: {
      icon: "w-8 h-8 sm:w-9 sm:h-9",
      title: "text-lg sm:text-xl",
      tagline: "text-[10px]",
      gap: "gap-3",
    },
    lg: {
      icon: "w-10 h-10 sm:w-11 sm:h-11",
      title: "text-xl sm:text-2xl",
      tagline: "text-[11px]",
      gap: "gap-3.5",
    },
  }[size];

  const content = (
    <div className={cn("inline-flex items-center group select-none", sizeClasses.gap, className)}>
      {/* Modern Dental Spark Icon Mark */}
      <div
        className={cn(
          sizeClasses.icon,
          "rounded-xl flex items-center justify-center relative shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-sm",
          isDark
            ? "bg-gradient-to-br from-primary via-primary/90 to-accent text-white shadow-primary/20"
            : "bg-gradient-to-br from-primary to-accent text-white shadow-primary/25"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 drop-shadow-sm"
          aria-hidden="true"
        >
          {/* Stylized Modern Tooth Anatomy with Radiant Spark Accent */}
          <path d="M12 2C8.5 2 6 4.5 6 7.5c0 3 1.5 6 2.5 9 1 3 1.5 5.5 3.5 5.5s2.5-2.5 3.5-5.5c1-3 2.5-6 2.5-9C18 4.5 15.5 2 12 2z" />
          <path d="M12 2v6" strokeWidth="1.7" strokeOpacity="0.75" />
          <circle cx="12" cy="11" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </div>

      {/* Typography Hierarchy */}
      <div className="flex flex-col text-left">
        <span
          className={cn(
            "font-heading font-bold tracking-tight leading-none transition-colors",
            sizeClasses.title,
            isDark ? "text-white" : "text-slate-900 group-hover:text-primary"
          )}
        >
          <span>{firstName}</span>{" "}
          <span className={isDark ? "text-accent font-medium" : "text-primary font-medium"}>
            {restName}
          </span>
        </span>

        {showTagline && siteConfig.clinic.tagline && (
          <span
            className={cn(
              "font-medium tracking-wider uppercase line-clamp-1 mt-1 transition-colors",
              sizeClasses.tagline,
              isDark ? "text-white/60" : "text-muted-foreground"
            )}
          >
            {siteConfig.clinic.tagline}
          </span>
        )}
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      href={href}
      aria-label={`${siteConfig.clinic.name} — Home`}
      className="inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
    >
      {content}
    </Link>
  );
}

export default Logo;
