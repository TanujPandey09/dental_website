/**
 * Central image configuration.
 *
 * Every photo used by the template is referenced from this single file and
 * points at a local file inside `public/dental/images/`. To rebrand, simply
 * replace the files in that folder with your own photos â€” keeping the same
 * filenames â€” and nothing else in the codebase needs to change.
 *
 * See `public/dental/images/README.md` for the full filename list and the
 * recommended dimensions for each image.
 *
 * Prefer `.jpg` / `.webp`. If you change an extension, update the path here.
 */

export const images = {
  // ---------------------------------------------------------------------------
  // Global sections
  // ---------------------------------------------------------------------------
  /** Home hero background — large, landscape. */
  hero: "/dental/images/hero.jpg",
  /** Cinematic hero suite background. */
  heroCinematic: "/dental/images/hero-cinematic.jpg",
  /** Architectural luxury suite background. */
  heroArchitectural: "/dental/images/hero-architectural.jpg",
  /** Swiss minimalist operatory equipment close-up. */
  heroSwissOperatory: "/dental/images/hero-swiss-operatory.jpg",
  /** Call-to-action section background (tinted dark overlay is applied). */
  ctaBackground: "/dental/images/cta-background.jpg",
  /** "Why Choose Us" clinic interior (home page, desktop only). */
  clinicInterior: "/dental/images/clinic-interior.jpg",
  /** Services page "Advanced Technology" feature image. */
  servicesTechnology: "/dental/images/services-technology.jpg",

  // ---------------------------------------------------------------------------
  // Services â€” keyed by the service `id` in src/config/site.tsx
  // Used for the service cards, the services page, and the detail page hero.
  // ---------------------------------------------------------------------------
  services: {
    "cosmetic-dentistry": "/dental/images/service-cosmetic-dentistry.jpg",
    "dental-implants": "/dental/images/service-dental-implants.jpg",
    "teeth-whitening": "/dental/images/service-teeth-whitening.jpg",
    "orthodontics": "/dental/images/service-orthodontics.jpg",
    "general-dentistry": "/dental/images/service-general-dentistry.jpg",
    "root-canal": "/dental/images/service-root-canal.jpg",
    "pediatric-dentistry": "/dental/images/service-pediatric-dentistry.jpg",
    "oral-surgery": "/dental/images/service-oral-surgery.jpg",
  } as Record<string, string>,

  // ---------------------------------------------------------------------------
  // Doctors â€” keyed by the doctor `id` in src/config/site.tsx
  // Used for the doctor cards and the doctor detail page hero.
  // ---------------------------------------------------------------------------
  doctors: {
    "dr-sarah-jenkins": "/dental/images/doctor-sarah-jenkins.jpg",
    "dr-michael-chen": "/dental/images/doctor-michael-chen.jpg",
    "dr-emily-rodriguez": "/dental/images/doctor-emily-rodriguez.jpg",
    "dr-james-wilson": "/dental/images/doctor-james-wilson.jpg",
    "dr-amanda-lee": "/dental/images/doctor-amanda-lee.jpg",
    "dr-robert-taylor": "/dental/images/doctor-robert-taylor.jpg",
  } as Record<string, string>,

  // ---------------------------------------------------------------------------
  // Testimonials â€” patient avatars keyed by review `id`, plus shared
  // before/after smile photos.
  // ---------------------------------------------------------------------------
  testimonials: {
    patients: {
      1: "/dental/images/patient-1.jpg",
      2: "/dental/images/patient-2.jpg",
      3: "/dental/images/patient-3.jpg",
      4: "/dental/images/patient-4.jpg",
      5: "/dental/images/patient-5.jpg",
      6: "/dental/images/patient-6.jpg",
    } as Record<number, string>,
    before: "/dental/images/smile-before.jpg",
    after: "/dental/images/smile-after.jpg",
  },

  // ---------------------------------------------------------------------------
  // About page imagery
  // ---------------------------------------------------------------------------
  about: {
    clinicInterior: "/dental/images/about-clinic-interior.jpg",
    dentalTechnology: "/dental/images/about-dental-technology.jpg",
    lobby: "/dental/images/about-lobby.jpg",
    treatmentRoom: "/dental/images/about-treatment-room.jpg",
    consultation: "/dental/images/about-consultation.jpg",
    details: "/dental/images/about-details.jpg",
  },
} as const;

export type ImagesConfig = typeof images;

export default images;


