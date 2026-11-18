import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Static catalog assets must remain visible when Vercel image optimization
    // is payment-blocked (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED).
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  // Keep the 3,500+ static product pages within build-machine memory limits.
  experimental: { cpus: 2 },
};

export default nextConfig;
