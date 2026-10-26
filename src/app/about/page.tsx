import { AboutClient } from "./AboutClient";
import { AwardsWall } from "@/components/home/AwardsWall";
import { CTA } from "@/components/home/CTA";
import siteConfig from "@/config/site";

export const metadata = {
  title: `About Us | ${siteConfig.clinic.name}`,
  description: "Learn about our clinic, our mission, and why we are redefining dental care.",
};

export default function AboutPage() {
  return (
    <>
      <AboutClient />
      <AwardsWall />
      
      <CTA />
    </>
  );
}
