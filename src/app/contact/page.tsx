import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Location01Icon, Call02Icon, Mail01Icon, Clock01Icon, ArrowDown01Icon } from "hugeicons-react";
import { CTA } from "@/components/home/CTA";
import { Card, CardContent } from "@/components/ui/card";

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
    answer: "If you are experiencing severe pain, bleeding, or have lost a tooth, please call our 24/7 emergency line immediately at (555) 123-4567. We reserve slots daily specifically for urgent care."
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

      <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
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
                <Card className="rounded-2xl border-border/50 bg-white/50 backdrop-blur-sm hover:bg-white transition-colors group shadow-sm">
                  <CardContent className="p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Mail01Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-foreground mb-1 text-lg">Email Support</h4>
                      <p className="text-muted-foreground text-sm mb-3">For general inquiries and scheduling.</p>
                      <a href="mailto:care@premiumdental.com" className="text-primary font-bold hover:underline">care@premiumdental.com</a>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone Card */}
                <Card className="rounded-2xl border-border/50 bg-white/50 backdrop-blur-sm hover:bg-white transition-colors group shadow-sm">
                  <CardContent className="p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                      <Call02Icon className="w-6 h-6" />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-heading font-bold text-foreground text-lg">Phone Support</h4>
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-destructive/10 text-destructive text-[10px] font-bold tracking-wider uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                          24/7
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">Mon-Fri from 8am to 7pm.</p>
                      <a href="tel:+1234567890" className="text-accent font-bold hover:underline">(555) 123-4567</a>
                    </div>
                  </CardContent>
                </Card>

                {/* Location Card */}
                <Card className="rounded-2xl border-border/50 bg-white/50 backdrop-blur-sm hover:bg-white transition-colors group shadow-sm">
                  <CardContent className="p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                      <Location01Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-foreground mb-1 text-lg">NYC Headquarters</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        123 Premium Medical Plaza<br />
                        Suite 500<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right: SaaS Style Form */}
            <div className="lg:col-span-7">
              <Card className="rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-border/60">
                <CardContent className="p-8 md:p-12">
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
      <section className="py-24 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Everything you need to know about your visit.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 font-bold text-foreground cursor-pointer select-none">
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

      {/* Map Section */}
      <section className="h-[400px] w-full bg-muted relative border-y border-border/40">
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center backdrop-blur-sm z-10 hover:opacity-0 transition-opacity duration-500">
          <div className="bg-white px-6 py-4 rounded-full shadow-lg font-bold text-foreground flex items-center gap-3">
            <Location01Icon className="w-5 h-5 text-primary" />
            Click to interact with map
          </div>
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d193595.25279998066!2d-74.1444876798033!3d40.69763123336785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1709664531123!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full grayscale opacity-90"
        ></iframe>
      </section>

      <CTA />
    </>
  );
}
