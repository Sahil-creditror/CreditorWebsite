"use client";
import Image from "next/image";

type MerchantHeroProps = {
  heading?: string;
  subheading?: string;
  ctaHref?: string;
  ctaText?: string;
  coverImageSrc?: string;
};

export default function MerchantHero({
  heading = "Private Merchant Processing",
  subheading = "Seamless, private, and bank-free payment solutions for modern businesses.",
  ctaHref = "/contact",
  ctaText = "Get Started",
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
          {/* Added mb-4 so button floats a bit above bottom */}
          <a
            href={ctaHref}
            className="inline-flex items-center bg-primary text-secondary hover:bg-secondary hover:text-white rounded-full font-bold px-6 py-3 transition-colors mb-4"
          >
            {ctaText}
            <span className="ml-3 inline-flex w-8 h-8 items-center justify-center bg-white rounded-full">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="#1F2A2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}