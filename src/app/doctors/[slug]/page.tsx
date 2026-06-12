import type { Metadata, ResolvingMetadata } from "next";
import { DoctorClient } from "./page-client";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return {
    title: `${name} | Expert Dentist at Healthy Smiles`,
    description: `Book an appointment with ${name}. Specializing in advanced restorative and cosmetic dentistry, dedicated to creating perfect, healthy smiles with precision and care.`,
    openGraph: {
      title: `${name} | Healthy Smiles Dental`,
      description: `View ${name}'s expertise, patient reviews, and availability.`,
      images: ['/dental/og-doctors.png'],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Healthy Smiles Dental`,
    }
  };
}

export default async function DoctorDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  return <DoctorClient slug={resolvedParams.slug} />;
}
