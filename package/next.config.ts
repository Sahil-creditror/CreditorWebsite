import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://webx-6ba8.onrender.com",
    NEXT_PUBLIC_WEBINAR_ID: process.env.NEXT_PUBLIC_WEBINAR_ID ?? "85345478550",
    NEXT_PUBLIC_WEBINAR_ID_MORNING: process.env.NEXT_PUBLIC_WEBINAR_ID_MORNING ?? "85345478550",
    NEXT_PUBLIC_WEBINAR_ID_AFTERNOON: process.env.NEXT_PUBLIC_WEBINAR_ID_AFTERNOON ?? "85009970371",
    NEXT_PUBLIC_WEBINAR_ID_EVENING: process.env.NEXT_PUBLIC_WEBINAR_ID_EVENING ?? "84323907773",
  },
};

export default nextConfig;
