import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { EmergencyBanner } from "@/components/home/EmergencyBanner";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { BeforeAfterGallery } from "@/components/home/BeforeAfterGallery";
import { PatientJourney } from "@/components/home/PatientJourney";
import { MeetDentists } from "@/components/home/MeetDentists";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQ } from "@/components/shared/FAQ";
import { CTA } from "@/components/home/CTA";

const FAQ_ITEMS = [
  {
    question: "How much does a first visit cost?",
    answer:
      "Your initial consultation includes a full exam, digital imaging, and a written treatment plan. We verify your insurance upfront so you know all costs before any work begins — no surprise fees.",
  },
  {
    question: "Do you accept my insurance?",
    answer:
      "We are in-network with major PPO dental providers. Bring your insurance card or share your details when booking, and our team will confirm coverage before your visit.",
  },
  {
    question: "Is treatment painful?",
    answer:
      "Not at all. We use computer-controlled gentle anesthesia, acoustic private suites, and noise-canceling audio to keep every visit calm and comfortable.",
  },
  {
    question: "How soon can I get an appointment?",
    answer:
      "We reserve same-day priority slots for dental emergencies and typically have general availability within 1–2 business days. Book online or call to see the next open time.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes. We offer 0% financing for up to 12 months and accept major credit cards, HSA/FSA, and in-network insurance to make care affordable.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <EmergencyBanner />
      <ServicesPreview />
      <BeforeAfterGallery />
      <PatientJourney />
      <MeetDentists />
      <TestimonialsSection />
      <FAQ
        title="Frequently Asked Questions"
        description="Everything you need to know before your first visit, from cost and insurance to what to expect during treatment."
        items={FAQ_ITEMS}
      />
      <CTA showLocationInfo />
    </>
  );
}
