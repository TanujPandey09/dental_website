import { PageHero } from "@/components/layout/PageHero";
import { TestimonialsClient } from "./TestimonialsClient";
import { CTA } from "@/components/home/CTA";

export const metadata = {
  title: "Patient Reviews | Lumina Dental Care",
  description: "Read what our patients have to say about their experience with us.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero 
        title="Real Stories. Real Transformations." 
        subtitle="Don't just take our word for it. Hear from the thousands of patients whose smiles and lives have been transformed by our care."
        badge="Testimonials"
      />

      <TestimonialsClient />
      
      <CTA />
    </>
  );
}
