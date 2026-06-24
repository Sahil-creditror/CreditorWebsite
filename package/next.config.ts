import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow explicit dev origins to avoid future cross-origin warnings for /_next/*
  allowedDevOrigins: ["localhost:3000", "127.0.0.1:3000"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Performance optimizations
  compress: true,
  productionBrowserSourceMaps: false,
  // Optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'react-infinite-logo-slider',
      'lucide-react',
      '@tabler/icons-react',
      'react-icons',
    ],
  },
  // Webpack optimizations for better code splitting
  webpack: (config: any, { isServer }: any) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[contenthash][ext]",
      },
    });

    if (!isServer) {
      // Optimize chunk splitting to reduce initial bundle size
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Separate framework chunks
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Separate large libraries
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module: any) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
                return packageName ? `npm.${packageName.replace('@', '')}` : null;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    // Ensure react-intersection-observer resolves correctly
    try {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-intersection-observer': require.resolve('react-intersection-observer'),
      };
    } catch (e) {
      // If require.resolve fails, webpack will use default resolution
      console.warn('Could not resolve react-intersection-observer alias:', e);
    }
    
    return config;
  },
  images: {
    // Enable Next.js image optimization for better performance
    unoptimized: false,
    // Image formats to use (WebP is preferred for better compression)
    formats: ['image/webp', 'image/avif'],
    qualities: [85, 90, 100],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Increased cache TTL for better performance (1 year for static assets)
    minimumCacheTTL: 31536000,
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
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/services_page",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services_page/:path*",
        destination: "/services/:path*",
        permanent: true,
      },
      {
        source: "/become",
        destination: "/services/course-cataloges/become-private",
        permanent: true,
      },
      {
        source: "/operate",
        destination: "/services/course-cataloges/operate-private",
        permanent: true,
      },
      {
        source: "/private",
        destination: "/services/course-cataloges/financial-freedom",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/masterclass-membership",
        permanent: true,
      },
      {
        source: "/projects/BecomeSov",
        destination: "/services/course-cataloges/become-private",
        permanent: true,
      },
      {
        source: "/projects/BusinessCredit",
        destination: "/services/course-cataloges/financial-freedom",
        permanent: true,
      },
      {
        source: "/projects/OperatePrivate",
        destination: "/services/course-cataloges/operate-private",
        permanent: true,
      },
      {
        source: "/masterclass-membership/BecomeSov",
        destination: "/services/course-cataloges/become-private",
        permanent: true,
      },
      {
        source: "/masterclass-membership/BusinessCredit",
        destination: "/services/course-cataloges/financial-freedom",
        permanent: true,
      },
      {
        source: "/masterclass-membership/OperatePrivate",
        destination: "/services/course-cataloges/operate-private",
        permanent: true,
      },
      {
        source: "/projects-wonder/BecomeSov",
        destination: "/services/course-cataloges/become-private",
        permanent: true,
      },
      {
        source: "/projects-wonder/BusinessCredit",
        destination: "/services/course-cataloges/financial-freedom",
        permanent: true,
      },
      {
        source: "/projects-wonder/OperatePrivate",
        destination: "/services/course-cataloges/operate-private",
        permanent: true,
      },
    ];
  },
  // Add headers for better caching and performance
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/video/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL:
      //process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://testbackend-hcoy.onrender.com/api",
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.lmsathena.com/api",
    NEXT_PUBLIC_WEBINAR_ID: process.env.NEXT_PUBLIC_WEBINAR_ID ?? "82601545984",
    NEXT_PUBLIC_WEBINAR_ID_MIDNIGHT: process.env.NEXT_PUBLIC_WEBINAR_ID_MIDNIGHT ?? "85673138781",
    NEXT_PUBLIC_WEBINAR_ID_MORNING: process.env.NEXT_PUBLIC_WEBINAR_ID_MORNING ?? "82601545984",
    NEXT_PUBLIC_WEBINAR_ID_AFTERNOON: process.env.NEXT_PUBLIC_WEBINAR_ID_AFTERNOON ?? "89734509269",
    NEXT_PUBLIC_WEBINAR_ID_EVENING: process.env.NEXT_PUBLIC_WEBINAR_ID_EVENING ?? "86776822313",
  },
};

export default nextConfig;
