"use client";

import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl mx-auto text-center mb-12 sm:mb-16", className)}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="uppercase tracking-wider font-mono text-[11px]">{eyebrow}</span>
        </div>
      )}
      <h2
        className={cn(
          "text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.12] tracking-tight mb-3",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
