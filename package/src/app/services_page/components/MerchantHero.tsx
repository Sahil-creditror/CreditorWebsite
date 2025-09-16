"use client";
import Image from "next/image";
import Link from "next/link";

type MerchantHeroProps = {
  heading?: string;
  subheading?: string;
  ctaHref?: string;
  ctaText?: string;
  coverImageSrc?: string;
};

export default function HeroSection({
  heading = "Your Merchant Account — Secure, Fast, and Private",
  subheading = "Ditch the restrictions of mainstream processors. Get a fully underwritten Private Merchant Account with fast approvals, transparent pricing, and 24–48 hour payouts.",
  ctaHref = "/contact",
  ctaText = "Apply to your Private Account",
  coverImageSrc = "/images/services/service-banner.webp",
}: MerchantHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-black min-h-[60vh] md:min-h-[85vh]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={coverImageSrc}
          alt="Private Merchant Processing"
          fill
          className="object-cover opacity-70"
          priority
        />
      </div>

      {/* Content aligned at bottom */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-end min-h-[60vh] md:min-h-[85vh] pb-12 md:pb-16 lg:pb-20 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
            {heading}
          </h1>
          {/* Reduced bottom margin to bring button closer */}
          <p className="text-base md:text-lg text-white/85 mb-6">
            {subheading}
          </p>
          <div className="mb-6 md:mb-3">
            <Link
              href={ctaHref}
              aria-label={ctaText}
              className="group flex gap-4 items-center w-fit bg-primary border border-primary hover:border hover:border-white/30 hover:bg-secondary rounded-full transition-all duration-200 ease-in-out"
            >
              <span className="pl-6 text-lg font-bold text-secondary group-hover:text-white group-hover:translate-x-12 transform transition-transform duration-200 ease-in-out">
                {ctaText}
              </span>
              <svg
                className="py-1 group-hover:-translate-x-37 group-hover:rotate-45 transition-all duration-300 ease-in-out"
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1_873)">
                  <rect x="3" y="2" width="52" height="52" rx="26" fill="white" />
                  <path
                    d="M24 23H34M34 23V33M34 23L24 33"
                    stroke="#1F2A2E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_1_873"
                    x="0"
                    y="0"
                    width="58"
                    height="58"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                    />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_873" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_873" result="shape" />
                  </filter>
                </defs>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}