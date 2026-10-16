import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-24 bg-background">
      <div className="text-center max-w-lg">
        <p className="text-sm font-medium text-primary mb-4">
          404
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 text-balance">
          This page could not be found
        </h1>
        <p className="text-muted-foreground mb-10">
          The page you are looking for may have been moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 w-full sm:w-auto px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold"
          >
            <Link href="/">Back to home</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 w-full sm:w-auto px-8 rounded-full font-bold"
          >
            <Link href="/services">Browse services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
