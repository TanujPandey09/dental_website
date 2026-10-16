import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ClinicMap } from "@/components/contact/ClinicMap";
import { Location01Icon, Call02Icon, Mail01Icon, ArrowDown01Icon } from "hugeicons-react";
import { CTA } from "@/components/home/CTA";
import { Card, CardContent } from "@/components/ui/card";
import siteConfig from "@/config/site";

export const metadata = {
  title: "Contact Us | Lumina Dental Care",
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
        subtitle="Experience world-class dentistry. Connect with our dedicated patient coordinators to schedule your personalized consultation."
        badge="Contact Support"
      />

      <section className="py-12 sm:py-20 lg:py-32 bg-background relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">
            
            {/* Left: SaaS Style Info Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4 tracking-tight">How can we help?</h2>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium mb-8">
                  Whether you need to schedule a routine checkup or require immediate emergency assistance, we are always here.
                </p>
              </div>

              <div className="space-y-4">
                {/* Email Card */}
                <Card className="rounded-2xl border-border/50 bg-card hover:bg-card/70 transition-colors group shadow-sm">
                  <CardContent className="p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail01Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-1 text-lg">Email Support</h3>
                      <p className="text-muted-foreground text-sm mb-3">For general inquiries and scheduling.</p>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-primary font-bold hover:underline break-all">{siteConfig.contact.email}</a>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone Card */}
                <Card className="rounded-2xl border-border/50 bg-card hover:bg-card/70 transition-colors group shadow-sm">
                  <CardContent className="p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Call02Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-heading font-bold text-foreground text-lg">Phone Support</h3>
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/10 text-primary text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                          Emergency line
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3 whitespace-pre-line">{siteConfig.contact.hours}</p>
                      <a href={`tel:${siteConfig.contact.phone}`} className="text-primary font-bold hover:underline">{siteConfig.contact.phone}</a>
                      <p className="text-muted-foreground text-xs mt-2">
                        After hours emergency: {" "}
                        <a href={`tel:${siteConfig.contact.emergencyPhone}`} className="text-primary font-semibold hover:underline">{siteConfig.contact.emergencyPhone}</a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Location Card */}
                <Card className="rounded-2xl border-border/50 bg-card hover:bg-card/70 transition-colors group shadow-sm">
                  <CardContent className="p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                      <Location01Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-1 text-lg">Visit Our Clinic</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                        {siteConfig.contact.address}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right: SaaS Style Form */}
            <div className="lg:col-span-7">
              <Card className="rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-border/60">
                <CardContent className="p-5 sm:p-8 md:p-12">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Send us a message</h3>
                  <p className="text-muted-foreground mb-8 font-medium">Fill out the form below and our team will get back to you within 2 hours.</p>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Modern FAQ Section */}
      <section className="py-12 sm:py-20 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-3 sm:mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-base sm:text-lg">Everything you need to know about your visit.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-4 sm:p-6 font-bold text-foreground cursor-pointer select-none">
                  <span className="text-lg">{faq.question}</span>
                  <span className="ml-4 flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                    <ArrowDown01Icon className="w-5 h-5 text-muted-foreground" />
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed text-base">
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
