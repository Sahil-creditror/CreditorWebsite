"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type CourseCardProps = {
  title: string;
  image: string | StaticImageData;
  subtitle: string;
  description: string;
  learnings: string[];
  outcomes: string[];
  price?: string;
  badge?: string;
  highlight?: boolean;
  href: string;
};

export default function CourseCard({
  title,
  image,
  subtitle,
  description,
  learnings,
  highlight = false,
  href,
}: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const filterId = `filter0_d_course_btn_${slug}`;

  return (
    <article
      aria-labelledby={`course-${slug}`}
      className={`relative w-full rounded-xl overflow-hidden bg-white dark:bg-[#0b1220] shadow-md
        ${highlight ? "border-t-4 border-blue-900" : "border-t-4 border-blue-400"}
      `}
    >
      <div className="relative w-full h-44 sm:h-56 md:h-48 lg:h-56">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 sm:p-6">
        <h3 id={`course-${slug}`} className="text-lg sm:text-xl font-bold text-blue-900 dark:text-blue-200">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>

        <div className="mt-4 bg-blue-50 dark:bg-gray-800/60 border-l-4 border-blue-400 p-3 rounded">
          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">{description}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">What you&apos;ll learn</h4>
          <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {learnings.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <Link
            href={href}
            aria-label={`Learn more about ${title}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative flex justify-center items-center w-full bg-primary hover:bg-secondary rounded-full transition-all duration-300 ease-in-out no-underline ${isHovered ? "scale-[1.02]" : "scale-100"}`}
          >
            <span className="py-4 px-2 text-lg font-bold text-secondary group-hover:text-white transition-all duration-300 ease-in-out">
              Learn More
            </span>
            <div className="absolute top-0.5 right-0.5 transition-all duration-300 ease-in-out group-hover:left-0">
              <svg className="flex items-center transition-transform duration-300 ease-in-out group-hover:rotate-45" width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <g filter={`url(#${filterId})`}>
                  <rect x="3" y="2" width="52" height="52" rx="26" fill="white" />
                  <path d="M24 23H34M34 23V33M34 23L24 33" stroke="#1F2A2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <filter id={filterId} x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
