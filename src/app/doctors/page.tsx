import { PageHero } from "@/components/layout/PageHero";
import { DoctorsClient } from "./DoctorsClient";
import { CTA } from "@/components/home/CTA";

export const metadata = {
  title: "Our Doctors | Lumina Dental Care",
  description: "Meet our world-class team of dental specialists.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageHero 
        title="World-Class Specialists" 
        subtitle="Our team consists of board-certified specialists who have trained at the world's most prestigious dental institutions. We believe in continuous education to bring you the best care possible."
        badge="Our Team"
      />

      <DoctorsClient />
      
      <CTA />
    </>
  );
}
