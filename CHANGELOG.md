# Changelog

All notable changes to this project are documented in this file.

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
