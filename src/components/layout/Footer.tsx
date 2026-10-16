import Link from "next/link";
import Image from "next/image";
import { Location01Icon, Call02Icon, Mail01Icon, Clock01Icon, Facebook01Icon, InstagramIcon, TwitterIcon } from "hugeicons-react";
import siteConfig from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-12 md:pt-20 pb-8 md:pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-12 mb-8 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-4 md:space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src={siteConfig.clinic.logoDark}
                alt={siteConfig.clinic.name}
                width={150}
                height={68}
                className="h-11 w-auto"
              />
            </Link>
            <p className="hidden md:block text-secondary-foreground/70 text-sm leading-relaxed max-w-xs">
              {siteConfig.contact.address}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-heading font-semibold text-base md:text-lg mb-4 md:mb-6">Quick Links</h2>
            <ul className="space-y-3 md:space-y-4">
              {siteConfig.navigation.footer.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-secondary-foreground/70 hover:text-accent transition-colors text-sm flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-heading font-semibold text-base md:text-lg mb-4 md:mb-6">Our Services</h2>
            <ul className="space-y-3 md:space-y-4">
              {siteConfig.navigation.footer.services.map((service) => {
                const match = siteConfig.services.find(
                  (s) => s.title.toLowerCase() === service.toLowerCase()
                );
                const slug = match ? match.id : service.toLowerCase().replace(/ /g, "-");
                return (
                  <li key={service}>
                    <Link href={`/services/${slug}`} className="text-secondary-foreground/70 hover:text-accent transition-colors text-sm flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                      {service}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="font-heading font-semibold text-base md:text-lg mb-4 md:mb-6">Contact Info</h2>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3 text-secondary-foreground/70 text-sm">
                <Location01Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/70 text-sm">
                <Mail01Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-accent transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70 text-sm">
                <Call02Icon className="w-5 h-5 text-accent shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-accent transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/70 text-sm">
                <Clock01Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <p className="text-secondary-foreground/60 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.clinic.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-5 md:gap-6">
            {siteConfig.social.facebook && (
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-secondary-foreground/60 hover:text-white text-sm transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-secondary">
                <Facebook01Icon className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {siteConfig.social.instagram && (
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-secondary-foreground/60 hover:text-white text-sm transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-secondary">
                <InstagramIcon className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {siteConfig.social.twitter && (
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-secondary-foreground/60 hover:text-white text-sm transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-secondary">
                <TwitterIcon className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            <Link href="/privacy-policy" className="text-secondary-foreground/60 hover:text-white text-sm transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-secondary">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-secondary-foreground/60 hover:text-white text-sm transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-secondary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}