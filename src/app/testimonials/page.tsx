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
        title="Stories of Confident, Healthy Smiles." 
        subtitle="Read what patients share about their care, from first consultations to final results."
        badge="Testimonials"
      />

      <TestimonialsClient />
      
      <CTA />
    </>
  );
}
