"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    "/images/pricing/Cover-1.jpg",
    "/images/pricing/Cover-2.jpg",
    "/images/pricing/Cover-3.jpg"
  ];

  return (
    <section className="relative overflow-hidden py-30 md:py-44">
      {/* Animated decorative background (behind everything) */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        {/* Subtle base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-neutral-900 dark:via-neutral-900/60 dark:to-neutral-900/80" />

        {/* Blurred color blobs (animated) */}
        <motion.div
          aria-hidden="true"
          className="absolute -left-20 -top-20 w-[36rem] h-[36rem] rounded-full mix-blend-multiply filter blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.55), rgba(139,92,246,0.25) 35%, transparent 60%)",
          }}
          animate={{ y: [-20, 20, -20], x: [0, 20, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute right-[-4rem] top-10 w-[28rem] h-[28rem] rounded-full mix-blend-multiply filter blur-2xl opacity-50"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(6,182,212,0.45), rgba(59,130,246,0.22) 40%, transparent 65%)",
          }}
          animate={{ y: [10, -18, 10], x: [0, -18, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute left-10 bottom-[-6rem] w-[30rem] h-[30rem] rounded-full mix-blend-multiply filter blur-3xl opacity-45"
          style={{
            background:
              "radial-gradient(circle at 20% 70%, rgba(250,204,21,0.40), rgba(250,113,113,0.18) 35%, transparent 70%)",
          }}
          animate={{ y: [-8, 16, -8], x: [0, 12, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />

        {/* Very subtle noise/texture overlay for depth */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <filter id="grain">
            <feTurbulence baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend mode="overlay" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

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
              <motion.div
                key={index}
                className="rounded-3xl overflow-hidden cursor-pointer group flex flex-col h-full shadow-2xl"
                whileHover={{ y: -10, scale: 1.03 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                {/* Card shell uses glass style so it reads well over animated background */}
                <div className="flex flex-col h-full bg-white/90 dark:bg-neutral-900/60 backdrop-blur-sm border border-white/6 dark:border-neutral-800/40 rounded-3xl overflow-hidden">
                  {/* Cover Image */}
                  <div className="relative h-72 w-full overflow-hidden rounded-t-3xl flex-shrink-0">
                    <Image
                      src={coverImage}
                      alt={`${value?.planName} cover`}
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
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 }}
                        className="text-lg font-medium text-gray-800 dark:text-gray-100"
                      >
                        What's Included:
                      </motion.p>
                      <ul className="flex flex-col gap-3 mt-3">
                        {value?.planIncludes?.map((item: any, i: number) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="flex items-center gap-3"
                          >
                            <div className="bg-primary w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0">
                              <Image src="/images/Icon/right-check.svg" alt="check" width={16} height={16} />
                            </div>
                            <span className="text-black-700 dark:text-gray-200">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Subscribe Button */}
                    <motion.div
                      whileHover={{ y: -3, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="mt-4"
                    >
                      <a
                        href={value?.paylink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex justify-center items-center w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold py-4 rounded-full shadow-lg transition-all duration-300"
                      >
                        Subscribe Now
                      </a>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Animated bottom wave for extra polish */}
      <motion.div
        className="absolute bottom-0 left-0 w-full -z-10 pointer-events-none"
        initial={{ y: 40, opacity: 0.6 }}
        animate={{ y: 0, opacity: 0.9 }}
        transition={{ duration: 1.2 }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 1440 120" width="100%" height="120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(99,102,241,0.12)" />
              <stop offset="50%" stopColor="rgba(6,182,212,0.08)" />
              <stop offset="100%" stopColor="rgba(250,204,21,0.06)" />
            </linearGradient>
          </defs>
          <path d="M0 60 C 240 10 480 110 720 60 C 960 10 1200 110 1440 60 L1440 120 L0 120 Z" fill="url(#g1)" />
        </svg>
      </motion.div>
    </section>
  );
}

export default Pricing;
