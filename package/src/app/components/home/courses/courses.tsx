"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { StaticImageData } from "next/image";

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
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const imgSrc = typeof image === "string" ? image : (image as StaticImageData).src;

  return (
    <div
      className={`relative flex-1 max-w-sm w-full rounded-lg overflow-hidden transition-all duration-300 ease-out
        bg-white dark:bg-gray-800
        ${
          isHovered
            ? highlight
              ? "shadow-xl -translate-y-1 shadow-blue-900/30"
              : "shadow-xl -translate-y-1 shadow-blue-400/30"
            : highlight
            ? "shadow-md border-t-4 border-blue-900 shadow-blue-900/20"
            : "shadow-md border-t-4 border-blue-400 shadow-blue-400/20"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {badge && (
        <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-3 py-1 rounded-full text-xs font-bold shadow-md z-10">
          {badge}
        </div>
      )}

      <div className="relative h-40 overflow-hidden">
        <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-blue-700/70 text-white py-2 px-4 text-lg font-bold text-center">
          {title.split(" ")[0]}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-base mb-4">{subtitle}</p>

        <div className="bg-blue-100 dark:bg-gray-700 border-l-4 border-blue-400 p-4 rounded-md mb-5">
          <p className="text-blue-700 dark:text-blue-200 text-sm leading-relaxed m-0">{description}</p>
        </div>

        <div className="mb-5">
          <h4 className="text-blue-900 dark:text-blue-200 font-semibold text-sm mb-3">
            ✅ What You'll Learn:
          </h4>
          <ul className="list-disc pl-5 space-y-2">
            {learnings.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-5">
          <h4 className="text-blue-900 dark:text-blue-200 font-semibold text-sm mb-3">
            💎 Business Models:
          </h4>
          <div className="flex flex-wrap gap-2">
            {outcomes.map((item, index) => (
              <span
                key={index}
                className="bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
              Next Step: Private session
            </p>
            <p className="text-blue-900 dark:text-blue-200 text-2xl font-bold">{price}</p>
          </div>
          <button
            onClick={onLearnMore}
            className={`px-6 py-3 rounded-md text-white font-semibold text-base shadow-md transition-all duration-200
              ${isHovered ? "bg-blue-800 -translate-y-0.5 shadow-lg" : "bg-blue-600"}
            `}
          >
            Learn More ➔
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseRoadmap: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full mx-auto py-10 px-5 font-sans bg-transparent dark:bg-darkblack">
      <div className="flex flex-wrap justify-center gap-8 w-full">
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
          outcomes={[
            "Sovereignty consulting",
            "Private education",
            "Trust services",
            "Debt discharge",
          ]}
          badge="FOUNDATION"
          onLearnMore={() => router.push("/become")}
        />

        <CourseCard
          title="Operate Private"
          image="/images/projects/projectlist/junior.webp"
          subtitle="Asset Protection & Business"
          description="Build trusts and PMAs to operate without state oversight"
          learnings={[
            "UBOT business trusts",
            "Private Membership Associations",
            "Real estate in trusts",
            "Intergenerational protection",
          ]}
          outcomes={["Real estate trusts", "Wellness PMAs", "Private coaching", "Trade guilds"]}
          badge="JUNIOR"
          highlight={true}
          onLearnMore={() => router.push("/operate")}
        />

        <CourseCard
          title="Private Business Credit"
          image="/images/projects/projectlist/senior.webp"
          subtitle="$200K+ Without Banks"
          description="Build business credit through UBOT Trusts and private processing"
          learnings={[
            "Unlock vendor accounts",
            "Fix public credit lawfully",
            "0% APR funding",
            "Non-KYC payments",
          ]}
          outcomes={["Rental businesses", "E-commerce", "Merchant services", "15+ other models"]}
          badge="SENIOR"
          onLearnMore={() => router.push("/private")}
        />
      </div>
    </div>
  );
};

export default CourseRoadmap;
