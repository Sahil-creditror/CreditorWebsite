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
        </div>
      </div>
    </section>
  );
}