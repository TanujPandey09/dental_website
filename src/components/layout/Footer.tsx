import Link from "next/link";
import Image from "next/image";
import { Location01Icon, Call02Icon, Mail01Icon, Clock01Icon, Facebook01Icon, InstagramIcon, TwitterIcon } from "hugeicons-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/dental/dark-logo.png"
                alt="Healthy Smiles Dental Logo"
                width={150}
                height={10}
              // className="h-10 md:h-12 w-auto object-contain brightness-0 invert transition-all duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-xs">
              Modern dentistry with experienced professionals, advanced technology, and patient-first care. Designing beautiful smiles every day.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Facebook01Icon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {["About Us", "Our Doctors", "Services", "Testimonials", "Contact Us", "Careers"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-secondary-foreground/70 hover:text-accent transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-4">
              {["General Dentistry", "Cosmetic Dentistry", "Dental Implants", "Orthodontics", "Teeth Whitening", "Root Canal"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-secondary-foreground/70 hover:text-accent transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-secondary-foreground/70 text-sm">
                <Location01Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>1234 Healthcare Ave, Suite 100<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70 text-sm">
                <Call02Icon className="w-5 h-5 text-accent shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70 text-sm">
                <Mail01Icon className="w-5 h-5 text-accent shrink-0" />
                <span>contact@premiumdental.com</span>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/70 text-sm">
                <Clock01Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>Mon - Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-foreground/50 text-sm">
            &copy; {new Date().getFullYear()} Lumina Dental Care. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-secondary-foreground/50 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-secondary-foreground/50 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
