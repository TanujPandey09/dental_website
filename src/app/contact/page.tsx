import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ClinicMap } from "@/components/contact/ClinicMap";
import { Location01Icon, Call02Icon, Mail01Icon, ArrowDown01Icon, Clock01Icon } from "hugeicons-react";
import { CTA } from "@/components/home/CTA";
import siteConfig from "@/config/site";

export const metadata = {
  title: `Contact Us | ${siteConfig.clinic.name}`,
  description: "Schedule your visit and connect with our world-class dental specialists.",
};

const faqs = [
  {
    question: "What should I bring to my first appointment?",
    answer: "Please bring your valid photo ID, insurance card, and any previous dental records or x-rays if available. Arriving 15 minutes early helps us process your paperwork smoothly."
  },
  {
    question: "Do you accept my dental insurance?",
    answer: "We are in-network with most major PPO insurance providers. Our dedicated billing specialists will verify your benefits before your appointment to ensure you have no surprise out-of-pocket costs."
  },
  {
    question: "What do I do in a dental emergency?",
    answer: `If you are experiencing severe pain, bleeding, or have lost a tooth, please call our emergency line immediately at ${siteConfig.contact.emergencyPhone}. We reserve slots daily specifically for urgent care.`
  },
  {
    question: "Do you offer financing options for cosmetic procedures?",
    answer: "Yes, we believe premium care should be accessible. We partner with CareCredit and offer flexible, interest-free in-house financing plans tailored to your budget."
  }
];

export default function ContactPage() {
  return (
    <>
      <PageHero 
        title="Get in touch" 
        subtitle="Direct clinical guidance and unhurried appointment coordination. Connect with our patient team for transparent estimates, records transfers, or emergency triage."
        badge="Contact Support"
        trustItems={["Prompt 2-Hour Response", "Emergency Same-Day Dispatch", siteConfig.contact.locationBadge]}
      />

      <section className="pt-8 pb-16 sm:pt-10 sm:pb-24 bg-background relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="shell relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left: Clean Architectural Info Cards */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div>
                <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-primary mb-3">
                  Concierge Care /
                </p>
                <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-sans font-medium text-foreground mb-3 tracking-[-0.03em] leading-tight">
                  How can we{" "}
                  <span className="inline-block rounded-md bg-primary/20 text-foreground px-2 py-0.5 font-normal">
                    help you?
                  </span>
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-normal">
                  Whether you need to schedule a routine checkup or require immediate emergency assistance, our concierge team is on standby.
                </p>
              </div>

              <div className="space-y-3.5">
                {/* Email Card - Single Crisp Container */}
                <div className="rounded-xl bg-card border border-border/80 p-5 sm:p-6 shadow-xs hover:border-primary/40 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Mail01Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-heading font-bold text-foreground text-base">Email Support</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                          &lt;2h Response
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs mb-2.5">For general inquiries, records transfer & treatment estimates.</p>
                      <a 
                        href={`mailto:${siteConfig.contact.email}`} 
                        className="text-primary font-semibold hover:underline break-all text-sm inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Card - Single Crisp Container */}
                <div className="rounded-xl bg-card border border-border/80 p-5 sm:p-6 shadow-xs hover:border-primary/40 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Call02Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="w-full min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <h3 className="font-heading font-bold text-foreground text-base">Phone Support</h3>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                          Emergency Ready
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs mb-2.5 whitespace-pre-line leading-relaxed">{siteConfig.contact.hours}</p>
                      <a 
                        href={`tel:${siteConfig.contact.phone}`} 
                        className="text-primary font-semibold hover:underline text-base block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                      >
                        {siteConfig.contact.phone}
                      </a>
                      <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-1">
                        <span>After-hours urgent line:</span>
                        <a 
                          href={`tel:${siteConfig.contact.emergencyPhone}`} 
                          className="text-primary font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                        >
                          {siteConfig.contact.emergencyPhone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Card - Single Crisp Container */}
                <div className="rounded-xl bg-card border border-border/80 p-5 sm:p-6 shadow-xs hover:border-primary/40 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0">
                      <Location01Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-heading font-bold text-foreground text-base">Visit Our Clinic</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                          Valet Available
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed whitespace-pre-line mb-2.5">
                        {siteConfig.contact.address}
                      </p>
                      <div className="mt-2.5 pt-2.5 border-t border-border/50 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock01Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                        <span>{siteConfig.contact.transitInfo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Clean Single Form Container */}
            <div className="lg:col-span-7">
              <div className="rounded-xl bg-card border border-border/80 p-5 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground tracking-tight">
                    Send us a message
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                    Avg. 2h response
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 text-xs sm:text-sm leading-relaxed">
                  Fill out the form below and our clinical coordination team will get back to you promptly.
                </p>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern FAQ Section - Single Clean Accordions */}
      <section className="py-12 sm:py-20 bg-muted/30 border-t border-border/40 relative">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-primary mb-3">
              Common Questions /
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-sans font-medium text-foreground mb-2 sm:mb-3 tracking-[-0.03em] leading-tight">
              Frequently Asked{" "}
              <span className="inline-block rounded-md bg-primary/20 text-foreground px-2 py-0.5 font-normal">
                Questions
              </span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Everything you need to know about your consultation, insurance coverage, and clinic protocols.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-card rounded-xl border border-border/80 overflow-hidden shadow-xs hover:border-primary/40 transition-colors [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-4 sm:p-5 font-heading font-semibold text-foreground cursor-pointer select-none transition-colors group-hover:text-primary">
                  <span className="text-sm sm:text-base pr-4">{faq.question}</span>
                  <span className="ml-2 flex-shrink-0 w-7 h-7 rounded-md bg-muted flex items-center justify-center group-open:rotate-180 transition-transform duration-200">
                    <ArrowDown01Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </span>
                </summary>
                <div className="px-4 sm:px-5 pb-5 pt-1 text-muted-foreground leading-relaxed text-xs sm:text-sm border-t border-border/40">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ClinicMap />

      <CTA />
    </>
  );
}

