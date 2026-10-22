# Lumina Dental — Design System (Warm Editorial & Refined)

> Bound via Open Design: `design-systems/warm-editorial` + `craft/anti-ai-slop` + `craft/typography-hierarchy-editorial`
> Category: Luxury Boutique Medical & Dental Sanctuary

## 1. Visual Theme & Atmosphere
Quiet, unhurried, architectural luxury. Think Aesop, Kinfolk, and Aman wellness retreats applied to modern dental healthcare.
- Generous macro-whitespace (80–112px desktop vertical rhythm).
- Restrained chrome, warm off-white paper canvas, deep botanical forest tones.
- No cold hospital clinical slate, no generic AI gradient blobs, no default Tailwind indigo.

## 2. Color Palette & Roles
- **Canvas / Background:** `#FAF8F5` (warm paper off-white)
- **Foreground / Text:** `#1C1A17` (near-black, warm obsidian)
- **Primary Accent:** `#1E4D40` (deep botanical emerald / medical forest)
- **Secondary Accent:** `#C4823F` (warm champagne bronze / terracotta kicker)
- **Surface / Cards:** `#FFFFFF` with `rgba(28, 26, 23, 0.07)` 1px hairline border
- **Muted Text:** `#6E675F` (warm mid-stone grey, high readability)
- **Muted Surface:** `#F3EFEA` (warm paper tint for secondary pills and tags)
- **Success:** `#227156` (natural sage green)
- **Border / Dividers:** `rgba(28, 26, 23, 0.08)` (hairline precision)

### Dark Mode (Warm Sanctuary Dark)
- **Background:** `#161513` (warm obsidian paper)
- **Foreground:** `#F5F2EB` (warm off-white)
- **Card Surface:** `#1E1D1A` (warm charcoal card)
- **Primary:** `#2E7362` (luminous botanical emerald)
- **Secondary / Accent:** `#D49556` (luminous champagne bronze)
- **Border:** `rgba(245, 242, 235, 0.09)`

## 3. Typography Rules
- **Display / Headlines:** `Fraunces` serif (`--font-heading`).
  - Feature italic flourishes on emotional emphasis words (*"Minus the noise"*, *"Designed around your smile"*).
  - Letter spacing: `-0.025em` for display sizes >= 36px.
  - Optical sizes and soft weights: `font-medium` / `font-normal` (avoid harsh over-bold black weights).
- **Body / Interface:** `Inter` / `Plus Jakarta Sans` (`--font-body`).
  - Line-height: `1.6` for long-form scanability.
- **Micro-Kickers & Category Tags:**
  - Monospace or clean uppercase sans with `tracking-[0.18em]` (e.g. `01 / CLINICAL PROTOCOLS`).

## 4. Elevation & Depth
- **Level 0 (Flat):** Default state for cards, forms, and hero elements.
- **Level 1 (Hover/Floating):** `0 4px 20px -2px rgba(28, 26, 23, 0.06)`, 1px border. No heavy drop-shadows, no blurry colored glow.

## 5. Micro-Interactions & Transitions
- Standard duration: `200ms`–`250ms` with `cubic-bezier(0.16, 1, 0.3, 1)` easing.
- Interactive states: Subtle background shift or 1px border highlight; no aggressive button bouncing.
