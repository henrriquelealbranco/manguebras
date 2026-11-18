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
  async redirects() {
    // Preserve old image URLs after correcting mislabeled WebP extensions.
    const relabelled = [
      "1005", "1085", "1087", "1088", "1089", "1090", "1198", "1199",
      "1202", "1203", "2099", "2189", "2216", "2217", "2218", "2219",
      "2220", "2221", "2222", "2223", "2224", "2225", "2226", "2227",
      "2228", "2461", "2465", "2466", "2777", "3155", "4414", "4437",
      "4527", "4528", "4676", "4833", "5059", "5144", "5303",
    ];
    return relabelled.map(code => ({
      source: `/produtos/${code}.jpg`,
      destination: `/produtos/${code}.webp`,
      permanent: true,
    }));
  },
};

export default nextConfig;
