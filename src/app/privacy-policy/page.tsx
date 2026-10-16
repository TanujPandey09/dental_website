import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Privacy Policy | Lumina Dental Care",
  description:
    "How we collect, use, and protect the personal information you share with our dental practice.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="January 1, 2026"
      intro="This policy explains what information we collect, how we use it, and the choices you have."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "We collect information you provide directly to us, such as your name, email address, phone number, and the details you include when you submit a contact or appointment request through this website.",
            "We may also collect limited technical information automatically, such as your browser type and pages visited, to help us improve the site.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "We use the information you provide to respond to enquiries, schedule appointments, and provide dental services.",
            "We do not sell your personal information. We only share information with service providers who help us operate the site and deliver care, and only to the extent necessary.",
          ],
        },
        {
          heading: "Data retention and security",
          body: [
            "We retain personal information only as long as necessary to fulfil the purposes described in this policy or as required by law.",
            "We apply reasonable technical and organisational measures to protect personal information against unauthorised access, loss, or misuse.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You may request access to, correction of, or deletion of the personal information we hold about you by contacting us using the details below.",
          ],
        },
      ]}
    />
  );
}
