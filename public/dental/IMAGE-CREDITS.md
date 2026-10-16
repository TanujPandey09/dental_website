# Image Credits & Licensing

## Read this before going live

The template ships with **generated placeholder images** in
`public/dental/images/`. They are plain gradient cards (no third-party photos,
no real people) meant only to show the layout. Replace them with photos you have
the right to use.

The logo, favicon and OG image in `public/dental/` are also demo brand assets —
replace them with your own.

This template's license does **not** grant any rights to any third-party images
you may choose to add.

## Why this matters

- Portrait photos of people must not be used to imply endorsement by real
  individuals.
- Stock-photo licenses often forbid redistributing the images as part of a
  template or stock-like product. Check each source's license.
- Remote hotlinks can break, change, or be rate-limited at any time.

## Where images are referenced

All photos are centralised in **`src/config/images.ts`** and point at
`public/dental/images/`. Nothing else hardcodes image paths.

- `src/config/images.ts` — the single source of truth for every photo path
- `public/dental/` — logos, favicon, OG image
- `public/dental/images/` — all content photos (see its `README.md`)

## Recommended sources for replacement

| Need | Suggested source | Notes |
|------|------------------|-------|
| Clinic & treatment photos | Your own photography | Best / safest |
| Free stock photos | Unsplash, Pexels, Pixabay | Check each site's license |
| Icons | hugeicons (already bundled) | See license of the icon set |
| Logos / favicon | Your designer | Replace `public/dental/*` |

## How to replace images

1. Drop your files into `public/dental/images/`, keeping the **same filenames**
   listed in `public/dental/images/README.md`.
2. That's it — `src/config/images.ts` already points at them.

If you change a filename or extension, update the matching path in
`src/config/images.ts`.

## Using remote images instead

If you prefer to host images on a CDN, allow the hostname in `next.config.ts`:

```ts
images: {
  remotePatterns: [{ protocol: "https", hostname: "images.example.com" }],
}
```

…then set the URLs directly in `src/config/images.ts`.
