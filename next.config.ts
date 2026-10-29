import type { NextConfig } from "next";

/**
 * The template ships with local images in `public/dental/images/` (see
 * `src/config/images.ts`), so no remote image hosts are required.
 *
 * If you host images on a CDN or use a remote source, allow the hostname here:
 *
 *   images: {
 *     remotePatterns: [{ protocol: "https", hostname: "images.example.com" }],
 *   },
 */
const nextConfig: NextConfig = {
  devIndicators: false,
};

export default nextConfig;
