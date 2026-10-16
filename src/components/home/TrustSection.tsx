"use client";

import { useEffect, useState, useRef } from "react";
import siteConfig from "@/config/site";

function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, isVisible]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold font-heading text-primary mb-2">
        {count.toLocaleString()}+
      </div>
      <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export function TrustSection() {
  return (
    <section className="py-10 sm:py-20 bg-white border-y border-border/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 md:gap-8
          [&>*:nth-child(even)]:border-l [&>*:nth-child(even)]:border-border/50
          md:[&>*:nth-child(3)]:border-l md:[&>*:nth-child(3)]:border-border/50">
          <Counter target={siteConfig.clinic.yearsExperience} label="Years Experience" />
          <Counter target={siteConfig.clinic.happyPatients} label="Happy Patients" />
          <Counter target={siteConfig.clinic.certifiedDentists} label="Certified Dentists" />
          <Counter target={siteConfig.clinic.treatmentsCompleted} label="Treatments Completed" />
        </div>
      </div>
    </section>
  );
}