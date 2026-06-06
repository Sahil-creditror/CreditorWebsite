"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Pricing() {
  const [pricingData, setPricingData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPricingData(data?.pricingData2);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchData();
  }, []);

  const defaultCoverImages = [
    "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883797/creditor-website-assets/images/pricing/Cover-1.jpg",
    "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883800/creditor-website-assets/images/pricing/Cover-2.jpg",
    "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883811/creditor-website-assets/images/pricing/Cover-3.jpg"
  ];

  return (
    <section className="relative overflow-hidden py-12 md:py-20 bg-white dark:bg-neutral-900">

      {/* Content container (above background blobs) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col gap-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Affordable Plan for Everyone
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Explore our creative solutions, optimized workflows, and transformative digital experiences that empower your business.
          </p>
        </div>

        {/* Aligned Grid */}
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-2">
          {pricingData?.data?.map((value: any, index: number) => {
            const coverImage = value.coverImage || defaultCoverImages[index] || defaultCoverImages[0];

            return (
              <div
                key={index}
                className="rounded-3xl overflow-hidden cursor-pointer group flex flex-col h-full shadow-2xl"
              >
                {/* Card shell uses glass style so it reads well over animated background */}
                <div className="flex flex-col h-full bg-white/90 dark:bg-neutral-900/60 backdrop-blur-sm border border-white/6 dark:border-neutral-800/40 rounded-3xl overflow-hidden">
                  {/* Cover Image */}
                  <div className="relative h-72 w-full overflow-hidden rounded-t-3xl flex-shrink-0">
                    <Image
                      src={coverImage}
                      alt={`${value.planName} cover`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/45 via-transparent to-transparent p-4 flex flex-col gap-2">
                      <span className="text-white text-sm uppercase font-medium">
                        {value?.tag || "Plan"}
                      </span>
                      <h3 className="text-white text-2-xl font-bold">{value?.planName}</h3>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center gap-2">
                        {value.cancelPrice && <del className="text-white/70">{value.cancelPrice}</del>}
                        <span className="text-2xl font-bold">{value.planPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 xl:p-10 flex flex-col gap-6 flex-1 justify-between">
                    <div>
                      <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        What's Included:
                      </p>
                      <ul className="flex flex-col gap-3 mt-3">
                        {value?.planIncludes?.map((item: any, i: number) => (
                          <li
                            key={i}
                            className="flex items-center gap-3"
                          >
                            <div className="bg-primary w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0">
                              <Image src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883682/creditor-website-assets/images/Icon/right-check.svg" alt="check" width={16} height={16} />
                            </div>
                            <span className="text-black-700 dark:text-gray-200">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Subscribe Button */}
                    <div className="mt-4">
                      <a
                        href={value?.payLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex justify-center items-center w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

export default Pricing;
