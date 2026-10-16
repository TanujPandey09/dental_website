import Link from "next/link";
import siteConfig from "@/config/site";

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ eyebrow, title, updated, intro, sections }: LegalPageProps) {
  return (
    <section className="pt-32 pb-24 sm:pt-40 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <p className="text-sm font-medium text-primary mb-3">
          {eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4 tracking-tight text-balance">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">Last updated: {updated}</p>

        <p className="text-lg text-muted-foreground leading-relaxed mb-10">{intro}</p>

        <div className="rounded-2xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground leading-relaxed mb-12">
          This is placeholder template content and does not constitute legal advice. Replace
          it with your own policy reviewed for your jurisdiction before publishing. Contact
          details below are pulled from the site configuration.
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-3">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              {siteConfig.clinic.name}
              <br />
              <span className="whitespace-pre-line">{siteConfig.contact.address}</span>
              <br />
              Email:{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">
                {siteConfig.contact.email}
              </a>
              <br />
              Phone:{" "}
              <a href={`tel:${siteConfig.contact.phone}`} className="text-primary hover:underline">
                {siteConfig.contact.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border">
          <Link href="/" className="text-primary font-semibold hover:underline">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
