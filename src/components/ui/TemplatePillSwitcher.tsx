"use client";

import { cn } from "@/lib/utils";

export interface TemplateVariantOption {
  id: string;
  title: string;
  num?: string;
}

interface TemplatePillSwitcherProps {
  label: string; // e.g. "HERO" | "SERVICES" | "ABOUT"
  variants: TemplateVariantOption[];
  activeId: string;
  onSelect: (id: string) => void;
  isDarkTheme?: boolean;
  className?: string;
}

export function TemplatePillSwitcher({
  label,
  variants,
  activeId,
  onSelect,
  isDarkTheme = false,
  className,
}: TemplatePillSwitcherProps) {
  const activeVariant = variants.find((v) => v.id === activeId) || variants[0];

  return (
    <div
      role="region"
      aria-label={`${label} layout switcher`}
      className={cn(
        "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs transition-colors duration-200 select-none shadow-sm",
        isDarkTheme
          ? "bg-[#0B1528]/90 backdrop-blur-xl border border-white/15 text-white shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
          : "bg-white/95 backdrop-blur-xl border border-slate-200/90 text-slate-900 shadow-[0_4px_20px_rgba(15,23,42,0.06)]",
        className
      )}
    >
      <span
        className={cn(
          "text-[10px] tracking-[0.14em] uppercase font-bold pr-1 hidden md:inline-block",
          isDarkTheme ? "text-white/50" : "text-slate-400"
        )}
      >
        {label}
      </span>

      <div className="flex items-center gap-1">
        {variants.map((v, index) => {
          const num = v.num || String(index + 1).padStart(2, "0");
          const isActive = v.id === activeId;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.id)}
              aria-pressed={isActive}
              className={cn(
                "w-7 h-7 sm:w-7.5 sm:h-7.5 flex items-center justify-center rounded-full text-[11px] font-mono font-bold transition-all duration-200 cursor-pointer shrink-0",
                isActive
                  ? isDarkTheme
                    ? "bg-teal-500 text-slate-950 shadow-sm"
                    : "bg-teal-700 text-white shadow-sm"
                  : isDarkTheme
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              {num}
            </button>
          );
        })}
      </div>

      <span
        className={cn(
          "h-3.5 w-px mx-1 sm:mx-1.5",
          isDarkTheme ? "bg-white/20" : "bg-slate-200"
        )}
        aria-hidden="true"
      />

      <span
        className={cn(
          "text-[11px] sm:text-xs font-semibold whitespace-nowrap pl-0.5 pr-1 max-w-[110px] xs:max-w-[140px] sm:max-w-none truncate",
          isDarkTheme ? "text-white" : "text-slate-800"
        )}
      >
        {activeVariant?.title}
      </span>
    </div>
  );
}
