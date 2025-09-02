"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

type CourseCardProps = {
  title: string;
  image: string | StaticImageData;
  subtitle: string;
  description: string;
  learnings: string[];
  outcomes: string[];
  price?: string;
  badge?: string;
  highlight?: boolean;
  onLearnMore: () => void;
};

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  image,
  subtitle,
  description,
  learnings,
  outcomes,
  price,
  badge,
  highlight = false,
  onLearnMore,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <article
      aria-labelledby={`course-${slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full rounded-xl overflow-hidden transition-transform duration-300 ease-out transform bg-white dark:bg-[#0b1220]
        ${isHovered ? "-translate-y-1 shadow-2xl" : "shadow-md"}
        ${highlight ? "border-t-4 border-blue-900" : "border-t-4 border-blue-400"}
      `}
    >
      {/* Image header */}
      <div className="relative w-full h-44 sm:h-56 md:h-48 lg:h-56">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />

        {badge && (
          <span className="absolute top-3 left-3 z-20 inline-block bg-white/90 dark:bg-gray-900/80 text-blue-900 dark:text-blue-100 px-3 py-1 rounded-full text-xs font-semibold shadow">
            {badge}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent text-white py-2 text-center font-semibold tracking-wide">
          {title.split(" ")[0]}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6">
        <h3 id={`course-${slug}`} className="text-lg sm:text-xl font-bold text-blue-900 dark:text-blue-200">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>

        <div className="mt-4 bg-blue-50 dark:bg-gray-800/60 border-l-4 border-blue-400 p-3 rounded">
          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">{description}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">What you'll learn</h4>
          <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {learnings.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">Business models</h4>
          <div className="flex flex-wrap gap-2">
            {outcomes.map((o, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-200"
              >
                {o}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Next Step: Private session</p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">{price ?? "—"}</p>
          </div>

          <button
            onClick={onLearnMore}
            aria-label={`Learn more about ${title}`}
            className={`w-full sm:w-auto px-5 py-3 rounded-md text-white font-semibold text-sm shadow transition-transform duration-150 ease-out
              ${isHovered ? "bg-blue-800 translate-y-0.5 shadow-lg" : "bg-blue-600"}
            `}
          >
            Learn More ➔
          </button>
        </div>
      </div>
    </article>
  );
};

const CourseRoadmap: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative w-full mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      {/* Ripple background: SVG based (performs well and respects reduced-motion) */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-90">
        <svg className="w-full h-full" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <radialGradient id="r1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="r2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="r3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* big slow ripple */}
          <circle cx="20%" cy="30%" r="60" fill="url(#r1)">
            <animate attributeName="r" from="60" to="520" dur="8s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.35" to="0" dur="8s" repeatCount="indefinite" />
          </circle>

          {/* staggered ripple */}
          <circle cx="80%" cy="70%" r="40" fill="url(#r2)">
            <animate attributeName="r" from="40" to="420" dur="7s" begin="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.3" to="0" dur="7s" begin="1.8s" repeatCount="indefinite" />
          </circle>

          <circle cx="50%" cy="50%" r="30" fill="url(#r3)">
            <animate attributeName="r" from="30" to="300" dur="6s" begin="0.9s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.25" to="0" dur="6s" begin="0.9s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* overlay gradient to tint the content slightly */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-50/30 via-transparent to-transparent mix-blend-normal" />

        {/* respect user motion preferences */}
        <style>{`@media (prefers-reduced-motion: reduce) { svg { display: none !important; } }`}</style>
      </div>

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard
            title="Become Private + SOV 101"
            image="/images/projects/projectlist/freshman.webp"
            subtitle="Reclaim Your Legal Identity"
            description="Correct your status and exit public contracts to reclaim sovereignty"
            learnings={[
              "Status correction principles",
              "Remove from public jurisdiction",
              "Essential legal documents",
              "Estate protection basics",
            ]}
            outcomes={["Sovereignty consulting", "Private education", "Trust services", "Debt discharge"]}
            badge="FOUNDATION"
            onLearnMore={() => router.push("/become")}
          />

          <CourseCard
            title="Operate Private"
            image="/images/projects/projectlist/junior.webp"
            subtitle="Asset Protection & Business"
            description="Build trusts and PMAs to operate without state oversight"
            learnings={["UBOT business trusts", "Private Membership Associations", "Real estate in trusts", "Intergenerational protection"]}
            outcomes={["Real estate trusts", "Wellness PMAs", "Private coaching", "Trade guilds"]}
            badge="JUNIOR"
            highlight
            onLearnMore={() => router.push("/operate")}
          />

          <CourseCard
            title="Private Business Credit"
            image="/images/projects/projectlist/senior.webp"
            subtitle="$200K+ Without Banks"
            description="Build business credit through UBOT Trusts and private processing"
            learnings={["Unlock vendor accounts", "Fix public credit lawfully", "0% APR funding", "Non-KYC payments"]}
            outcomes={["Rental businesses", "E-commerce", "Merchant services", "15+ other models"]}
            badge="SENIOR"
            onLearnMore={() => router.push("/private")}
          />
        </div>
      </div>
    </section>
  );
};

export default CourseRoadmap;
