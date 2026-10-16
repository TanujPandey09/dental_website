import type { Metadata } from "next";
import { DoctorClient } from "./page-client";
import siteConfig from "@/config/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const doctor = siteConfig.doctors.find((d) => d.id === slug);
  const name =
    doctor?.name ??
    slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return {
    title: `${name} | ${siteConfig.clinic.name}`,
    description:
      doctor?.heroDescription ??
      `Book an appointment with ${name}, ${doctor?.role ?? "dentist"} at ${siteConfig.clinic.name}.`,
    openGraph: {
      title: `${name} | ${siteConfig.clinic.name}`,
      description: `View ${name}'s expertise, patient reviews, and availability.`,
      images: [siteConfig.clinic.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${siteConfig.clinic.name}`,
    },
  };
}

export default async function DoctorDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  return <DoctorClient slug={resolvedParams.slug} />;
}
