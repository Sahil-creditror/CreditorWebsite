import Image from "next/image";
import React from "react";

type PrivateMerchantBannerProps = {
  imageSrc: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
};

export default function PrivateMerchantBanner({
  imageSrc = "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883881/creditor-website-assets/images/services/pmabanner.webp",
  alt = "Private Merchant Banner",
  title,
  subtitle,
  ctaText,
  ctaHref,
}: PrivateMerchantBannerProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Soft radial glows */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-500/20 blur-[90px]" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-[90px]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.35) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/10 to-transparent dark:from-black/40" />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {/* Optional heading */}
        {(title || subtitle) && (
          <div className="mb-8 md:mb-12 text-center">
            {subtitle && (
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="h-px w-10 bg-slate-300 dark:bg-white/15" />
                <span className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300/80 tracking-wide uppercase">
                  {subtitle}
                </span>
                <span className="h-px w-10 bg-slate-300 dark:bg-white/15" />
              </div>
            )}
            {title && (
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-white">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Banner with side paddings and premium frame */}
        <div className="relative rounded-3xl border border-white/60 dark:border-white/10 shadow-[0_10px_40px_-10px_rgba(2,6,23,0.35)] bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl">
          {/* Gradient border sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40 dark:ring-white/10" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/50 to-transparent dark:from-white/5" />

          {/* Banner image maintains side padding via container padding */}
          <div className="p-3 md:p-5">
            <div className="relative w-full overflow-hidden rounded-2xl">
              <Image
                src={imageSrc}
                alt={alt}
                width={1920}
                height={900}
                priority
                className="w-full h-auto object-contain"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Optional CTA below image inside frame */}
          {ctaText && ctaHref && (
            <div className="px-6 pb-6 -mt-1">
              <div className="flex justify-center">
                <a
                  href={ctaHref}
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold shadow-lg ring-1 ring-white/10 dark:ring-black/10 transition-colors"
                >
                  {ctaText}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


