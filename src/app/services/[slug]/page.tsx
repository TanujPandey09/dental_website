import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceClient } from "./page-client";
import siteConfig from "@/config/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return siteConfig.services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = siteConfig.services.find((s) => s.id === slug);
  const title =
    service?.title ??
    slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return {
    title: `${title} | ${siteConfig.clinic.name}`,
    description:
      service?.detailSubtitle ??
      service?.description ??
      `Learn more about our ${title.toLowerCase()} services at ${siteConfig.clinic.name}.`,
    openGraph: {
      title: `${title} | ${siteConfig.clinic.name}`,
      description: service?.description ?? `Premium ${title.toLowerCase()} services with expert care.`,
      images: [siteConfig.clinic.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.clinic.name}`,
    },
  };
}

export default async function ServiceDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const service = siteConfig.services.find((s) => s.id === resolvedParams.slug);
  if (!service) notFound();
  return <ServiceClient slug={resolvedParams.slug} />;
}
