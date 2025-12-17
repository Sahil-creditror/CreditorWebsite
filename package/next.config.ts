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
};

export default nextConfig;
