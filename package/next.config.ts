import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow explicit dev origins to avoid future cross-origin warnings for /_next/*
  allowedDevOrigins: ["localhost:3000", "127.0.0.1:3000"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
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
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://testbackend-hcoy.onrender.com/api",
    NEXT_PUBLIC_WEBINAR_ID: process.env.NEXT_PUBLIC_WEBINAR_ID ?? "85345478550",
    NEXT_PUBLIC_WEBINAR_ID_MORNING: process.env.NEXT_PUBLIC_WEBINAR_ID_MORNING ?? "85345478550",
    NEXT_PUBLIC_WEBINAR_ID_AFTERNOON: process.env.NEXT_PUBLIC_WEBINAR_ID_AFTERNOON ?? "85009970371",
    NEXT_PUBLIC_WEBINAR_ID_EVENING: process.env.NEXT_PUBLIC_WEBINAR_ID_EVENING ?? "84323907773",
  },
};

export default nextConfig;
