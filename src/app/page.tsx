import { Hero } from "@/components/home/Hero";
import { TrustSection } from "@/components/home/TrustSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { MeetDentists } from "@/components/home/MeetDentists";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PatientJourney } from "@/components/home/PatientJourney";
import { AwardsWall } from "@/components/home/AwardsWall";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <AwardsWall />
      <ServicesPreview />
      <WhyChooseUs />
      <PatientJourney />
      <MeetDentists />
      <Testimonials />
      <CTA />
    </>
  );
}
