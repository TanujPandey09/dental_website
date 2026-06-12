import type { Metadata, ResolvingMetadata } from "next";
import { ServiceClient } from "./page-client";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const title = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return {
    title: `${title} | Healthy Smiles Dental Clinic`,
    description: `Learn more about our premium ${title.toLowerCase()} services. State-of-the-art procedures with proven success rates and lifetime warranties.`,
    openGraph: {
      title: `${title} | Healthy Smiles`,
      description: `Premium ${title.toLowerCase()} services with expert care.`,
      images: ['/dental/og-services.png'],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Healthy Smiles`,
    }
  };
}

export default async function ServiceDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  return <ServiceClient slug={resolvedParams.slug} />;
}
