# Image Pack

Drop your own photos in this folder using the **exact filenames below**. All of
the paths are wired up in [`src/config/images.ts`](../../../src/config/images.ts),
so once you replace a file (or a few), the whole site updates automatically.

## Rules

- Keep the same filenames. If you change an extension (e.g. `.jpg` → `.webp`),
  update the matching path in `src/config/images.ts`.
- You don't have to match the suggested pixel sizes exactly — `next/image`
  scales images — but matching the **aspect ratio** avoids cropping surprises.
- Keep photos reasonably compressed (target < 300 KB each) for fast loading.
- Delete this file before shipping, or keep it as a note to yourself.

## Recommended dimensions

| File | Used on | Suggested size | Ratio |
| --- | --- | --- | --- |
| `hero.jpg` | Home hero background | 1920 × 1080 | 16:9 |
| `cta-background.jpg` | Call-to-action band | 1920 × 1080 | 16:9 |
| `clinic-interior.jpg` | "Why Choose Us" (home) | 1200 × 900 | 4:3 |
| `services-technology.jpg` | Services page feature | 1200 × 900 | 4:3 |
| `service-*.jpg` | Service cards + detail hero | 800 × 800 | 1:1 |
| `doctor-*.jpg` | Doctor cards + detail hero | 800 × 1000 | 4:5 |
| `patient-*.jpg` | Testimonial avatars | 400 × 400 | 1:1 |
| `smile-before.jpg` | Testimonial before shot | 400 × 400 | 1:1 |
| `smile-after.jpg` | Testimonial after shot | 400 × 400 | 1:1 |
| `about-*.jpg` | About page gallery | 1000 × 1200 | 5:6 |

## Full filename list

```
hero.jpg
cta-background.jpg
clinic-interior.jpg
services-technology.jpg

service-cosmetic-dentistry.jpg
service-dental-implants.jpg
service-teeth-whitening.jpg
service-orthodontics.jpg
service-general-dentistry.jpg
service-root-canal.jpg
service-pediatric-dentistry.jpg
service-oral-surgery.jpg

doctor-sarah-jenkins.jpg
doctor-michael-chen.jpg
doctor-emily-rodriguez.jpg
doctor-james-wilson.jpg
doctor-amanda-lee.jpg
doctor-robert-taylor.jpg

patient-1.jpg
patient-2.jpg
patient-3.jpg
patient-4.jpg
patient-5.jpg
patient-6.jpg
smile-before.jpg
smile-after.jpg

about-clinic-interior.jpg
about-dental-technology.jpg
about-lobby.jpg
about-treatment-room.jpg
about-consultation.jpg
about-details.jpg
```

The files currently in this folder are **generated placeholders**. Replace them
with licensed photos you have the right to redistribute before selling or
deploying.
