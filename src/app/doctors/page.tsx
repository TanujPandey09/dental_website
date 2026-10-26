import { PageHero } from "@/components/layout/PageHero";
import { DoctorsClient } from "./DoctorsClient";
import { CTA } from "@/components/home/CTA";
import siteConfig from "@/config/site";

export const metadata = {
  title: `Our Doctors | ${siteConfig.clinic.name}`,
  description: "Meet our world-class team of dental specialists.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageHero 
        title="World-Class Specialists" 
        subtitle="Board-certified specialists across cosmetic, restorative, orthodontic, and surgical disciplines—collaborating to deliver gentle, unhurried treatment plans tailored to your life."
        badge="Our Team"
        trustItems={["Fellowship-Trained Specialists", "Board-Certified Faculty", "Multidisciplinary Care"]}
      />

      <DoctorsClient />
      
      <CTA className="pt-0 sm:pt-2 pb-16 sm:pb-24" />
    </>
  );
}
