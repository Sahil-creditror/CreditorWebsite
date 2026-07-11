"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface HeroBannerProps {
  bannerimage?: string;
  heading: string;
  desc: string;
  headingClass?: string;
  buttonPath?: string;
  buttonText?: string;
}

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

const BUTTON_CLASSNAME =
  "inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-md transition-all duration-200 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 tracking-wide text-sm uppercase";

function renderDescription(text: string): ReactNode[] {
  const parts = text.split(/(<span>.*?<\/span>)/g);

  return parts.map((part, index) => {
    if (part.startsWith("<span>") && part.endsWith("</span>")) {
      const cleanText = part.replace(/<\/?span>/g, "");
      return (
        <span key={index} className="text-yellow-400 font-semibold">
          {cleanText}
        </span>
      );
    }

    return part ? <span key={index}>{part}</span> : null;
  });
}

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

export function Herobanner({
  bannerimage,
  heading,
  desc,
  headingClass = "text-4xl sm:text-5xl md:text-6xl",
  buttonPath,
  buttonText = "Start Now",
}: HeroBannerProps) {
  const buttonLabel = (
    <>
      {buttonText}
      <Icon icon="solar:arrow-right-up-linear" width="18" height="18" className="stroke-[2.5]" />
    </>
  );

  return (
    <section
      className={`relative flex items-center text-white min-h-[40vh] sm:min-h-50vh py-16 overflow-hidden pt-28 ${
        bannerimage ? "bg-black" : "bg-linear-to-br from-blue-900 via-indigo-950 to-slate-900"
      }`}
    >
      {bannerimage && (
        <>
          <Image
            className="absolute inset-0 w-full h-full object-cover"
            alt="Hero background"
            src={bannerimage}
            height={694}
            width={1800}
            priority
            quality={85}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden />
        </>
      )}

      {!bannerimage && (
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden
        />
      )}

      <div className="relative z-10 container mx-auto px-6 sm:px-12 lg:px-20 layout-container">
        <div className="max-w-4xl flex flex-col gap-6">
          <h1 className={`${headingClass} font-bold tracking-tight leading-tight text-white`}>
            {heading}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed tracking-wide">
            {renderDescription(desc)}
          </p>

          {buttonPath && (
            <div className="mt-4">
              {isExternalUrl(buttonPath) ? (
                <a
                  href={buttonPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Go to ${heading}`}
                  className={BUTTON_CLASSNAME}
                >
                  {buttonLabel}
                </a>
              ) : (
                <Link href={buttonPath} aria-label={`Go to ${heading}`} className={BUTTON_CLASSNAME}>
                  {buttonLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Herobanner;
