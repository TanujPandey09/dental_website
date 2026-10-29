import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-lg border border-transparent bg-clip-padding",
    "text-sm font-medium leading-none whitespace-nowrap",
    "transition-[color,background-color,border-color,box-shadow,scale] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
    "active:scale-[0.98]",
    "outline-none select-none cursor-pointer touch-manipulation",
    "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        cta: [
          "bg-primary text-primary-foreground",
          "shadow-[0_4px_14px_color-mix(in_oklch,var(--primary)_22%,transparent)]",
          "hover:bg-primary/90",
          "hover:shadow-[0_6px_20px_color-mix(in_oklch,var(--primary)_28%,transparent)]",
        ].join(" "),
        onDark:
          "bg-primary text-white ring-1 ring-inset ring-white/20 shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:ring-accent/70 hover:shadow-[0_0_0_3px_rgba(20,184,166,0.18)]",
        light:
          "bg-white text-primary shadow-xs hover:bg-[#F0FDFA] hover:text-primary-hover",
        glass:
          "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/30 shadow-xs",
        outline: [
          "border-border/90 bg-card text-foreground shadow-xs",
          "hover:border-primary/50 hover:bg-muted/40 hover:text-primary",
          "aria-expanded:bg-muted aria-expanded:text-foreground",
          "dark:bg-input/30 dark:hover:bg-input/50",
        ].join(" "),
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 gap-1.5 rounded-md px-2.5 text-xs [&_svg]:size-3.5",
        sm: "h-9 gap-1.5 rounded-md px-3 text-xs font-semibold [&_svg]:size-3.5",
        default:
          "h-10 px-4 text-sm font-medium [&_svg]:size-4",
        lg: "h-11 sm:h-12 gap-2 px-5 sm:px-6 text-sm sm:text-base font-semibold [&_svg]:size-4",
        xl: "h-12 sm:h-13 gap-2.5 px-6 sm:px-7 text-base font-semibold [&_svg]:size-4.5",
        icon: "size-10 rounded-lg [&_svg]:size-4",
        "icon-xs": "size-7 rounded-md [&_svg]:size-3.5",
        "icon-sm": "size-9 rounded-md [&_svg]:size-4",
        "icon-lg": "size-12 rounded-lg [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

/** Rounded badge for trailing icons, e.g. the arrow on CTA buttons. */
function ButtonBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-icon="inline-end"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg",
        "border border-current/20 bg-current/10 transition-colors duration-150",
        "group-hover/button:bg-current/20",
        className
      )}
      {...props}
    />
  )
}

export { Button, ButtonBadge, buttonVariants }