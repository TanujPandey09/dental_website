import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Terms of Service | Lumina Dental Care",
  description:
    "The terms that govern your use of our website and the information and services offered through it.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="January 1, 2026"
      intro="By using this website you agree to the terms described below."
      sections={[
        {
          heading: "Use of this website",
          body: [
            "This website is provided for general information about our dental practice and services. You agree to use it only for lawful purposes and in a way that does not infringe the rights of, or restrict the use of, this site by anyone else.",
          ],
        },
        {
          heading: "No medical advice",
          body: [
            "The content on this website is for general informational purposes only and does not constitute medical or dental advice. It is not a substitute for a professional consultation, diagnosis, or treatment.",
            "Always seek the advice of a qualified dental professional with any questions you may have regarding a medical or dental condition.",
          ],
        },
        {
          heading: "Appointment requests",
          body: [
            "Submitting a contact or appointment form through this website is a request only. It does not create a dentist-patient relationship and does not confirm a booking until our team has contacted you to confirm the time and details.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "All content on this website, including text, graphics, and logos, is owned by or licensed to us and is protected by applicable intellectual property laws.",
          ],
        },
        {
          heading: "Changes to these terms",
          body: [
            "We may update these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.",
          ],
        },
      ]}
    />
  );
}
