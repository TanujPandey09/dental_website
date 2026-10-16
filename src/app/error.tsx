"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.error(error);
    headingRef.current?.focus();
  }, [error]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-24 bg-background">
      <div className="text-center max-w-lg" role="alert" aria-live="assertive">
        <p className="text-sm font-medium text-primary mb-4">
          Something went wrong
        </p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 text-balance outline-none"
        >
          An unexpected error occurred
        </h1>
        <p className="text-muted-foreground mb-10">
          We hit a snag loading this page. You can try again, or head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            size="lg"
            className="h-12 w-full sm:w-auto px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold"
          >
            Try again
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 w-full sm:w-auto px-8 rounded-full font-bold"
          >
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
