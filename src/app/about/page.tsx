import { PageHero } from "@/components/layout/PageHero";
import { AboutClient } from "./AboutClient";
import { AwardsWall } from "@/components/home/AwardsWall";
import { CTA } from "@/components/home/CTA";

export const metadata = {
  title: "About Us | Lumina Dental Care",
  description: "Learn about our clinic, our mission, and why we are redefining dental care.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero 
        title="Meet The Experts Behind Your Smile" 
        subtitle="We started with a simple mission: to make visiting the dentist an experience you actually look forward to."
        badge="Our Story"
      />

      <AboutClient />
      <AwardsWall />
      
      <CTA />
    </>
  );
}
