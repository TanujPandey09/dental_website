# Changelog

All notable changes to this project are documented in this file.

## Unreleased (Phase 3 — responsiveness, accessibility & config consolidation)

### Added

- **Related services & care team sections** — service detail pages
  (`/services/[slug]`) now surface three related services (matched from
  `siteConfig.services`) and the clinicians whose specialty maps to the
  treatment, both derived entirely from config. Each section hides itself when
  there is nothing to show.
- **Mid-funnel CTA on service detail** — a compact "Have questions?" band
  between the benefits and FAQ blocks, wiring the primary booking CTA and the
  clinic phone number into the middle of the page.
- **Optional `processSteps` on `siteConfig.services`** — buyers can supply
  `{ title, desc }[]` to replace the neutral default "what to expect" timeline
  on a service detail page.
- **Closing CTA in the treatment-journey section** — the home `PatientJourney`
  now ends with a booking CTA and a "no obligation" reassurance line.

### Changed

- **Reduced motion centralised** — `<MotionConfig reducedMotion="user">` in
  `src/app/layout.tsx` now disables transform/layout animations for the whole
  app when the visitor prefers reduced motion, keeping opacity/colour
  transitions. Marquee and GSAP timelines keep their existing media-query
  guards; animated counters render a static value instead of animating.
- **Heading & vertical-rhythm unification** — section headings standardised on
  the `text-3xl sm:text-5xl` scale and section padding on a consistent
  `py-12 sm:py-24` rhythm across home, About, Services, Doctors, Contact and
  detail pages. Hero sections share one responsive padding scale and headline
  scale.
- **CTA unification** — card CTAs use one order (`Book` primary → `Details`
  outline) with a consistent pill radius; full-width CTAs use the configured
  `siteConfig.hero.ctaTextPlain` label. Retired ad-hoc labels ("Full Protocol",
  "Book Whitening", "Book Scan", "Book Consultation", etc.).
- **Service detail copy is now treatment-neutral** — the previously
  implant-flavoured default process/benefits/FAQ copy was generalised so it no
  longer makes treatment-specific claims when a buyer omits overrides.

### Fixed

- **Unknown slugs now 404** — `/services/[slug]` and `/doctors/[slug]` return
  a proper 404 (with `generateStaticParams` pre-rendering the configured set)
  instead of rendering a broken page for unknown ids.
- **Sticky layouts clipped** — section wrappers used `overflow-hidden`, which
  broke `position: sticky` descendants; switched to `overflow-x-clip`
  (Doctors listing + "Why Choose Us"). Same fix applied to detail pages.
- **Invisible decorative layers** — hero/Awards backdrops sat behind their
  section (`-z-10`) on an opaque parent and were never visible; corrected to
  `z-0` inside the section's own stacking context.
- **Parallax overscan** — scroll parallax overscale reduced so images no longer
  reveal empty edges at the extremes of travel.
- **Patient journey on mobile** — removed the dead hidden vertical rail and
  added a scroll-affordance fade so the timeline reads correctly on small
  screens.
- **Navbar & footer touch targets** — dropdown parents now toggle on
  touch-only devices instead of navigating away, the mobile drawer closes on
  `Escape`, and the toggle/social/footer links meet a 44px minimum tap target.
- **Decorative icons hidden from assistive tech** — rating, clock, group and
  quote glyphs are `aria-hidden`, and testimonial star rows expose a single
  labelled `role="img"`.

## Unreleased (Phase 2 polish pass)

### Added

- **Template preview controls** — `siteConfig.ui.showTemplateSwitchers`
  (default `false`) hides navbar/mobile/page variant switchers in normal
  browsing while `?hero=` / `?view=` deep links keep working, and
  `siteConfig.ui.showSampleContentNotices` (default `false`) gates
  `Sample content` / `Sample profile` notices across testimonials and
  doctors surfaces.
- **Variant documentation** — README "Layout variants" table and
  CUSTOMIZATION.md "Template Variants & Preview Controls" document
  `?hero=` (5 home heroes), `?view=` (3 About / 3 Services layouts) and
  both preview toggles.

### Changed

- **Hero booking form hands off to the real booking flow** — the
  `HeroBookingSplit` form no longer shows a fake "Confirmation" state; it
  validates, sanitizes, and transfers a `BookingDraft` through the existing
  `BookingContext` to `/appointment`, prefilling the booking form (name,
  phone, service, time window). Drafts are in-memory only and never placed
  in the URL.
- **Demo-content policy unified** — testimonial badge renamed `Demo
  Review` → `Sample content`, verification claims removed from demo
  testimonial copy, `doctors` now render `Sample profile` chips, and the
  doctors/testimonials listings render `siteConfig` data instead of
  duplicated local arrays.
- **Pattern cleanup across the new templates** — `transition-all` narrowed
  to animated properties, `animate-pulse` dots removed, decorative
  `backdrop-blur` removed, all-caps tracked labels sentence-cased; unused
  imports removed so `npm run lint` passes with 0 errors / 0 warnings.

### Fixed

- **Lint blockers** — two `react-hooks/set-state-in-effect` errors resolved
  by deriving About/Services variant state from the URL (pushState/`popstate`,
  no mirrored `useState`), matching the `HeroStyleContext` pattern.
- **Packaging consistency** — the duplicated
  `public/dental/images/image-generation-prompt.txt` (internal generator
  prompt, git-ignored policy) removed from `public/`, so the distributable
  zip no longer ships it while the internal root copy stays for development.

### Removed

- **Dead code** — `components/home/TrustSection.tsx` and
  `components/ui/BookingModal.tsx` (zero references; the booking modal
  conflicted with the `/appointment` page flow). `navigation-menu.tsx`
  retained intentionally as a shadcn kit primitive.

## v1.0.0 — 2026-02-01

First release prepared for commercial sale.

### Added

- **Central image system** — every photo path now lives in
  `src/config/images.ts`, pointing at `public/dental/images/`. Includes a
  filename/dimension guide (`public/dental/images/README.md`) and generated
  placeholder images so the template looks intentional out of the box.
- **License files** — `LICENSE` (personal/evaluation) and
  `LICENSE-COMMERCIAL.md` (commercial / client projects).
- **Working forms** — `POST /api/contact` and `POST /api/booking` route
  handlers, shared `src/lib/send-lead.ts` helper (Resend-compatible via
  `fetch`, zero new dependencies), plus loading / success / error UI states.
- **`FORM-INTEGRATION.md`** — how to enable email delivery or swap providers.
- **Error & loading states** — `src/app/error.tsx`, `not-found.tsx`,
  `loading.tsx`.
- **Image licensing guide** — `public/dental/IMAGE-CREDITS.md`.
- **`.nvmrc`** and `engines.node` pin (`>=20.9.0`).
- **`typecheck` npm script**.
- **Config-driven form options** — `forms.bookingServices` /
  `forms.contactInquiryTypes` now use `{ value, label }` and render in the
  booking/contact forms.
- **`demo` badge** on home testimonials when `demo: true`.
- **Rate limiting** — in-memory limiter (`src/lib/rate-limit.ts`) on the form
  API routes (5 requests/min per IP, HTTP 429 + `Retry-After`).
- **`npm run package`** — `scripts/package.mjs` builds a clean distributable zip
  into `release/` (excludes deps, build output, editor config, local env).
- **`GUMROAD-LISTING.md`** — product copy, feature list, license summary, FAQ
  and asset checklist.
- **Dynamic Clinic Map** — zero-API-key OpenStreetMap embed with
  responsive floating clinic card, turn-by-turn Google Maps directions button,
  and optional custom embed URL override in `siteConfig.contact`.
- **Integrated Hugeicons** — configured directly in `siteConfig.services` and
  `siteConfig.features` so all home and service cards render rich SVG icons.
- **Legal pages** — `src/app/privacy-policy/page.tsx` and
  `src/app/terms-of-service/page.tsx` with clean boilerplate and config wiring.
- **Config-driven detail pages** — service and doctor `[slug]` pages read
  title, hero image, stats, credentials, philosophy and contact info from
  `siteConfig`, with fallbacks; their `generateMetadata` now uses the configured
  clinic name and OG image instead of hardcoded demo branding.

### Changed

- Renamed package to `lumina-dental-template`, version `1.0.0`.
- All demo images moved from remote Unsplash/iStock URLs to local placeholders
  in `public/dental/images/`; `next.config.ts` `remotePatterns` removed (now
  unused).
- README rewritten: quickstart, accurate config-coverage notes, deployment
  guide, project structure, license section.
- `metadataBase` now honours `NEXT_PUBLIC_SITE_URL` (falls back to config).
- All 12 `<img>` elements converted to `next/image` (lint now 0 warnings).
- Central config system (`src/config/site.tsx`) drives nav, footer, hero,
  home sections, contact, appointment and the service/doctor detail pages.

### Fixed

- Mobile responsiveness: off-canvas nav drawer (font size + scroll clipping),
  hover-only content on touch devices, hero/card layouts, footer, contact map.
- Swapped footer phone/email icons and wrong logo aspect ratio.
- Reduced-motion support (marquee + animations).
- Removed leftover `ts-errors.txt`.
- ESLint errors (unescaped entities, setState-in-effect) and unused imports.

### Removed

- Non-functional `alert()`-only form handlers.

### Notes

- Services / doctors / testimonials **list** pages keep sample data arrays for
  bespoke layout and icons; the **detail** pages are config-driven — see
  `CUSTOMIZATION.md`.
- Demo images are generated placeholders in `public/dental/images/` and must be
  replaced with your own photos before going live.
