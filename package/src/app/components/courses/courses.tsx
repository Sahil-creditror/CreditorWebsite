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
      className={`relative w-full rounded-xl overflow-hidden bg-white dark:bg-[#0b1220] shadow-md
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

        {/* badge overlay removed */}

        {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent text-white py-2 text-center font-semibold tracking-wide">
          {title.split(" ")[0]}
        </div> */}
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

        <div className="mt-5">
          <button
            onClick={onLearnMore}
            aria-label={`Learn more about ${title}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative flex justify-center items-center w-full bg-primary hover:bg-secondary rounded-full transition-all duration-300 ease-in-out ${isHovered ? "scale-[1.02]" : "scale-100"}`}
          >
            <span className="py-4 px-2 text-lg font-bold text-secondary group-hover:text-white transition-all duration-300 ease-in-out">
              Learn More
            </span>
            <div className="absolute top-0.5 right-0.5 transition-all duration-300 ease-in-out group-hover:left-0">
              <svg className="flex items-center transition-transform duration-300 ease-in-out group-hover:rotate-45" width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_courses_btn)">
                  <rect x="3" y="2" width="52" height="52" rx="26" fill="white" />
                  <path d="M24 23H34M34 23V33M34 23L24 33" stroke="#1F2A2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <filter id="filter0_d_courses_btn" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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
      {/* Static gradient background - Light mode (Blue gradient) */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 block dark:hidden"
        style={{
          background: "linear-gradient(to bottom, #1e40af, #60a5fa)",
        }}
      />
      
      {/* Static gradient background - Dark mode (Dark slate gradient) */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
        style={{
          background: "linear-gradient(to bottom, #0f172a, #334155)",
        }}
      />

      <div className="max-w-7xl mx-auto">

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard
            title="Become Private + Sovereignty101"
            image="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883850/creditor-website-assets/images/projects/projectlist/become.webp"
            subtitle="Reclaim Your Lawful Identity"
            description="Learn how to step out of the public and establish your affairs in the private."
            learnings={[
              "Status correction principles",
              "Remove from public jurisdiction",
              "Essential lawful documents",
              "Estate protection basics",
            ]}
            outcomes={["Sovereignty consulting", "Private education", "Trust services", "Debt discharge"]}
            // badge="FOUNDATION"
            onLearnMore={() => router.push("/become")}
          />

          <CourseCard
            title="Operate Private"
            image="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883858/creditor-website-assets/images/projects/projectlist/operate.webp"
            subtitle="Asset Protection & Business"
            description="Build trusts and PMAs to operate without state oversight."
            learnings={["Unincorporated Business Trusts", "Private Membership Associations", "Real estate in trusts", "Family legacy planning"]}
            outcomes={["Real estate trusts", "Wellness PMAs", "Private coaching", "Trade guilds"]}
            // badge="JUNIOR"
            highlight
            onLearnMore={() => router.push("/operate")}
          /> */}
                  {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:flex lg:justify-center">

{/* <CourseCard
  title="Become Private"
  image="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883850/creditor-website-assets/images/projects/projectlist/become.webp"
  subtitle="Reclaim Your Lawful Identity"
  description="Learn how to step out of the public and establish your affairs in the private."
  learnings={[
    "Status correction principles",
    "Remove from public jurisdiction",
    "Essential lawful documents",
    "Estate protection basics",
  ]}
  outcomes={["Sovereignty consulting", "Private education", "Trust services", "Debt discharge"]}
  // badge="FOUNDATION"
  onLearnMore={() => router.push("/become")}
/> */}
<div className="w-full max-w-sm">
<CourseCard
title="Become Private"
image="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883850/creditor-website-assets/images/projects/projectlist/become.webp"
subtitle="Reclaim Your Lawful Identity"
description="Learn how to step out of the public and establish your affairs in the private."
learnings={[
"Status correction principles",
"Remove from public jurisdiction",
"Essential lawful documents",
"Estate protection basics",
]}
outcomes={[
"Sovereignty consulting",
"Private education",
"Trust services",
"Debt discharge",
]}
onLearnMore={() => router.push("/become")}
/>
</div>


{/* <CourseCard
  title="Operate Private"
  image="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883858/creditor-website-assets/images/projects/projectlist/operate.webp"
  subtitle="Asset Protection & Business"
  description="Build, manage, and grow an Empire in the private, independent of the public system."
  learnings={["Unincorporated Business Trusts", "Private Membership Associations", "Real estate in trusts", "Family legacy planning"]}
  outcomes={["Real estate trusts", "Wellness PMAs", "Private coaching", "Trade guilds"]}
  // badge="JUNIOR"
  highlight
  onLearnMore={() => router.push("/operate")}
/> */}
<div className="w-full max-w-sm">
<CourseCard
title="Operate Private"
image="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883858/creditor-website-assets/images/projects/projectlist/operate.webp"
subtitle="Asset Protection & Business"
description="Build, manage, and grow an Empire in the private, independent of the public system."
learnings={[
"Unincorporated Business Trusts",
"Private Membership Associations",
"Real estate in trusts",
"Family legacy planning",
]}
outcomes={[
"Real estate trusts",
"Wellness PMAs",
"Private coaching",
"Trade guilds",
]}
highlight
onLearnMore={() => router.push("/operate")}
/>
</div>

          <div className="w-full max-w-sm">
            <CourseCard
              title="Financial Freedom"
              image="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883854/creditor-website-assets/images/projects/projectlist/financial.webp"
              subtitle="200k with Vendors, Banks & Credit Unions"
              description="Build business credit through Unincorporated Business Trusts and private processing."
              learnings={["Private Business Credit","Personal Credit Repair", "Private Merchant Accounts", "Credit card stacking strategies"]}//"Unlock vendor accounts"
              outcomes={["Rental businesses", "E-commerce", "Merchant services", "15+ other models"]}
              // badge="SENIOR"
              onLearnMore={() => router.push("/private")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseRoadmap;
