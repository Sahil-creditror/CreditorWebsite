import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow explicit dev origins to avoid future cross-origin warnings for /_next/*
  allowedDevOrigins: ["localhost:3000", "127.0.0.1:3000"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Performance optimizations
  compress: true,
  optimizeFonts: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-infinite-logo-slider'],
  },
  images: {
    // Enable Next.js image optimization for better performance
    unoptimized: false,
    // Image formats to use (WebP is preferred for better compression)
    formats: ['image/webp', 'image/avif'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum quality for optimized images
    minimumCacheTTL: 60,
    // Cloudflare CDN configuration (if using Cloudflare)
    // The images will be served through Cloudflare automatically when deployed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL:
      //process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://testbackend-hcoy.onrender.com/api",
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://creditor.onrender.com/api",
    NEXT_PUBLIC_WEBINAR_ID: process.env.NEXT_PUBLIC_WEBINAR_ID ?? "85345478550",
    NEXT_PUBLIC_WEBINAR_ID_MIDNIGHT: process.env.NEXT_PUBLIC_WEBINAR_ID_MIDNIGHT ?? "81368819394",
    NEXT_PUBLIC_WEBINAR_ID_MORNING: process.env.NEXT_PUBLIC_WEBINAR_ID_MORNING ?? "85345478550",
    NEXT_PUBLIC_WEBINAR_ID_AFTERNOON: process.env.NEXT_PUBLIC_WEBINAR_ID_AFTERNOON ?? "85009970371",
    NEXT_PUBLIC_WEBINAR_ID_EVENING: process.env.NEXT_PUBLIC_WEBINAR_ID_EVENING ?? "84323907773",
  },
};

export default nextConfig;
