import { Suspense } from "react";
import { DoctorsClient } from "./DoctorsClient";
import siteConfig from "@/config/site";

export const metadata = {
  title: `Our Clinicians & Specialists | ${siteConfig.clinic.name}`,
  description:
    "Meet our team of board-certified dentists, specialists, and hygienists across our Austin clinics. Every clinician is state-licensed with public credentials.",
};

export default function DoctorsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 text-center text-muted-foreground flex items-center justify-center">
          Loading clinicians...
        </div>
      }
    >
      <DoctorsClient />
    </Suspense>
  );
}
