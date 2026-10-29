"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown01Icon, ArrowUp01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
  className?: string;
}

export function FAQ({ items, title, description, className }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={cn("py-20 sm:py-28 bg-background border-t border-border/50", className)}>
      <div className="shell">
        {(title || description) && (
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-muted-foreground/80 text-xs sm:text-sm font-medium tracking-tight block mb-2">
              Common Questions /
            </span>
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-sans font-medium text-foreground leading-[1.12] tracking-[-0.03em] mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl bg-card border border-border/60 shadow-xs overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex items-center justify-between w-full px-6 py-4 sm:py-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                >
                  <span className="text-sm sm:text-base font-semibold text-foreground truncate">
                    {item.question}
                  </span>
                  <div className="w-5 h-5 shrink-0 transition-transform duration-200">
                    {isOpen ? (
                      <ArrowUp01Icon className="w-4 h-4 text-primary" />
                    ) : (
                      <ArrowDown01Icon className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:pb-8 pt-2">
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
