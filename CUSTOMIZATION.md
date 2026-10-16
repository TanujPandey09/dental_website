# Lumina Dental Customization Guide

This guide explains how to customize the Lumina Dental Next.js template for your own brand.

## 🗺️ Where your content lives

| Area | Config-driven? | Where to edit |
|------|----------------|---------------|
| Clinic name, colors, contact, hero, features, awards | ✅ Yes | `src/config/site.tsx` |
| Navbar & footer links | ✅ Yes | `src/config/site.tsx` |
| Appointment & contact form options | ✅ Yes | `src/config/site.tsx` (`forms`) |
| Home page sections | ✅ Yes | `src/config/site.tsx` + `src/components/home/*` |
| Service **list** (`/services`) | ⚠️ Sample data | `src/app/services/ServicesClient.tsx` |
| Service **detail** (`/services/[slug]`) | ✅ Yes (config + fallbacks) | `src/config/site.tsx` (`services[]`), layout in `src/app/services/[slug]/page-client.tsx` |
| Doctor **list** (`/doctors`) | ⚠️ Sample data | `src/app/doctors/DoctorsClient.tsx` |
| Doctor **detail** (`/doctors/[slug]`) | ✅ Yes (config + fallbacks) | `src/config/site.tsx` (`doctors[]`), layout in `src/app/doctors/[slug]/page-client.tsx` |
| Testimonials page (`/testimonials`) | ⚠️ Sample data | `src/app/testimonials/TestimonialsClient.tsx` |

The **detail** pages (`/services/[slug]`, `/doctors/[slug]`) read their title,
hero image, stats, credentials, expertise, philosophy, testimonials and contact
info from `src/config/site.tsx`, falling back to sensible defaults when a field
is omitted. The **list** pages (`/services`, `/doctors`, `/testimonials`) keep
their own sample arrays for bespoke icons and layout — copy those arrays when
adapting the template, or refactor them to read from `src/config/site.tsx` if
you prefer a single source of truth.

## 🎨 Visual Branding

### Colors

Edit the clinic color configuration in `src/config/site.tsx`:

```typescript
clinic: {
  name: "Your Clinic Name",
  primaryColor: "#your-primary-color",
  secondaryColor: "#your-secondary-color", 
  accentColor: "#your-accent-color",
  backgroundColor: "#your-bg-color",
  foregroundColor: "#your-text-color",
  // ... rest of config
}
```

### Logo & Favicon

Place your logo files in `public/dental/` and update the config:

```typescript
clinic: {
  logoLight: "/dental/your-logo-light.png",
  logoDark: "/dental/your-logo-dark.png",
  favicon: "/dental/your-favicon.png",
  ogImage: "/dental/your-og-image.png",
  // ... rest of config
}
```

### Fonts

The template uses Inter font (Google Fonts) by default. To use a different font:

1. Add the font import to `next-config.js` or `app/layout.tsx`
2. Update the CSS variable mappings in `src/config/site.tsx`

### Images

All content photos are centralised in `src/config/images.ts` and point at
`public/dental/images/`. To swap them:

1. Drop your photos into `public/dental/images/` using the filenames listed in
   [`public/dental/images/README.md`](./public/dental/images/README.md).
2. Nothing else needs changing unless you rename a file — then update the path
   in `src/config/images.ts`.

Sections are keyed for readability:

```typescript
import { images } from "@/config/images";

images.hero                              // "/dental/images/hero.jpg"
images.services["cosmetic-dentistry"]   // "/dental/images/service-cosmetic-dentistry.jpg"
images.doctors["dr-sarah-jenkins"]      // "/dental/images/doctor-sarah-jenkins.jpg"
images.testimonials.patients[1]         // "/dental/images/patient-1.jpg"
images.testimonials.before              // "/dental/images/smile-before.jpg"
images.about.lobby                      // "/dental/images/about-lobby.jpg"
```

The bundled files are generated **placeholders** — replace them before going
live. See [`public/dental/IMAGE-CREDITS.md`](./public/dental/IMAGE-CREDITS.md).

## 🌐 Multilingual (i18n)

**Not included in v1** - i18n would require next-translate or similar package. 
The template uses static English content throughout. To add languages:

1. Install `next-translate` or `react-i18next`
2. Create translation files
3. Wrap static strings in translation functions

## 📦 Adding New Services

Add to the `services` array in `src/config/site.tsx`:

```typescript
import { images } from "@/config/images";

services: [
  // ... existing services
  {
    id: "your-service",
    title: "Your Service Title",
    description: "Service description",
    category: "Cosmetic", // or "Restorative" | "Specialty" | "General"
    icon: <SparklesIcon className="w-7 h-7" />,
    image: "/dental/images/service-your-service.jpg",
    detailTitle: "Detail Title",
    detailSubtitle: "Detail Subtitle",
    detailBullets: ["Bullet 1", "Bullet 2"],
  },
],
```

> To use this service's image on the service detail page `/services/your-service`,
> add a matching entry to `images.services` in `src/config/images.ts` (the detail
> page looks the image up by the service `id`).

Then the service list on the home page and `/services` page will automatically update.

## 👨‍⚕️ Adding New Doctors

Add to the `doctors` array in `src/config/site.tsx`:

```typescript
doctors: [
  // ... existing doctors
  {
    id: "dr-your-name",
    name: "Dr. Your Name",
    role: "Your Role",
    image: "/dental/images/doctor-your-name.jpg",
    qualifications: "Your Qualifications",
    experience: "Your Experience",
    specialty: "Your Specialty",
    specializations: ["Specialization 1", "Specialization 2"],
    rating: 5.0,
    reviews: 100,
    heroImage: "/dental/images/doctor-your-name.jpg",
    heroDescription: "Short description",
    philosophy: "Your philosophy statement",
    credentials: [
      { year: "2020", title: "Your Credential", desc: "Description" },
    ],
    expertise: [
      { name: "Expertise 1", percent: 95 },
    ],
    testimonials: [
      {
        id: 1,
        name: "Patient Name",
        treatment: "Treatment",
        text: "Patient review text",
        rating: 5,
        patientImage: "/dental/images/patient-1.jpg",
        platform: "Google",
      },
    ],
  },
],
```

Doctor cards on the `/doctors` page will automatically render the new doctor.

## 🔔 Demo Disclaimers

The template includes an optional "Demo Review" badge to distinguish sample
data from real patient information.

When a testimonial in `src/config/site.tsx` has `demo: true`, a "Demo Review"
badge is rendered on the home page testimonial cards. Set `demo: true` while
you are still using placeholder content, and `demo: false` once your content is
real.

```ts
// In site.tsx config (testimonials array):
demo: true,  // shows the "Demo Review" badge on the home page
```

> The doctor profiles and the `/testimonials` listing also carry a `demo` flag
> in the sample data; enable the badge there too if you extend those components.

## 📱 Form Configuration

The dropdown options for the booking and contact forms are centralised in
`src/config/site.tsx`:

```typescript
forms: {
  bookingServices: [
    { value: "general", label: "General Checkup & Cleaning" },
    // ...add or remove options
  ],
  contactInquiryTypes: [
    { value: "general", label: "General Inquiry" },
    // ...
  ],
},
```

Each option is `{ value, label }`. `value` is what gets submitted; `label` is
what the visitor sees. Both forms render these automatically.

Form submissions are handled by API routes — see
[`FORM-INTEGRATION.md`](./FORM-INTEGRATION.md) to enable email delivery.

## 📧 Email, Phone & Location

Contact links and map pin use the config values:

- `mailto:${siteConfig.contact.email}` - email link
- `tel:${siteConfig.contact.phone}` - phone link
- `siteConfig.contact.address` - full clinic address
- `siteConfig.contact.mapCenter` - `{ lat, lng }` pin coordinates for the interactive map
- `siteConfig.contact.mapEmbedUrl` - (optional) custom Google Maps embed override

To customize, edit the `contact` section in `src/config/site.tsx`. The interactive map component (`src/components/contact/ClinicMap.tsx`) automatically centers on these coordinates and generates a one-click Google Maps directions button for mobile and desktop visitors.

## 🎯 SEO Customization

The `seo` config object controls metadata:

```typescript
seo: {
  title: "Your Clinic Name | Advanced Dentistry",
  description: "Your description",
  keywords: ["dentist", "your-city", "cosmetic dentistry"],
  openGraph: {
    title: "Your Clinic Name",
    description: "Your description",
    images: ["/dental/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Clinic Name",
    description: "Your description",
    images: ["/dental/og-image.png"],
  },
  metadataBase: "http://your-domain.com",
},
```

Update these values in `src/config/site.tsx` to match your brand.

## 📄 License switching

This template includes two license files:

- **LICENSE** - For personal/evaluation use
- **LICENSE-COMMERCIAL** - For commercial products/SaaS

To use the commercial version:
1. Rename `LICENSE-COMMERCIAL.md` to `LICENSE`
2. Or keep both and distribute appropriately
3. The config system enables rebranding without source code changes

## 🔧 Advanced: Overriding Config

You can partially override the default config in your own files:

```typescript
// next-config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ]
  },
}
```

Or use React context to override specific config values at runtime if needed.

## 📋 Checklist Before Going Live

- [ ] Update `src/config/site.tsx` with your clinic info
- [ ] Replace placeholder images in `public/dental/images/` with your own photos
- [ ] Replace logos / favicon / OG image in `public/dental/`
- [ ] Update `LICENSE` or `LICENSE-COMMERCIAL` per your needs
- [ ] Set up custom domain in your hosting platform
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Test contact form and booking flow
- [ ] Review demo disclaimers are appropriate for your use case
- [ ] Run `npm run build` to verify no errors
- [ ] Test on mobile devices