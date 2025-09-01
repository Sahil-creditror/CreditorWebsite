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
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "linear-gradient(45deg, #ff9a9e, #fad0c4, #fad0c4, #a1c4fd)",
              "linear-gradient(135deg, #a1c4fd, #c2e9fb, #c2e9fb, #ff9a9e)",
              "linear-gradient(225deg, #ff9a9e, #fad0c4, #fad0c4, #a1c4fd)",
              "linear-gradient(315deg, #a1c4fd, #c2e9fb, #c2e9fb, #ff9a9e)",
              "linear-gradient(45deg, #ff9a9e, #fad0c4, #fad0c4, #a1c4fd)",
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, #a1c4fd 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #a1c4fd 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, #ff9a9e 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, #ff9a9e 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, #a1c4fd 0%, transparent 50%)",
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Expanded Box Ripple Effect - Covering the whole container */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-4 border-blue-300/30 rounded-lg"
          animate={{
            scale: [1, 1.2, 1.5],
            opacity: [0.7, 0.4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.7, 1]
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-4 border-pink-300/30 rounded-lg"
          animate={{
            scale: [1, 1.2, 1.5],
            opacity: [0.7, 0.4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1.5,
            times: [0, 0.7, 1]
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-4 border-purple-300/30 rounded-lg"
          animate={{
            scale: [1, 1.2, 1.5],
            opacity: [0.7, 0.4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeOut",
            delay: 3,
            times: [0, 0.7, 1]
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-4 border-teal-300/30 rounded-lg"
          animate={{
            scale: [1, 1.2, 1.5],
            opacity: [0.7, 0.4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeOut",
            delay: 4.5,
            times: [0, 0.7, 1]
          }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-16 relative z-10">
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
                className="bg-white dark:bg-lightgray/10 rounded-3xl shadow-2xl overflow-hidden cursor-pointer group flex flex-col h-full"
                whileHover={{ y: -10, scale: 1.03 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Cover Image */}
                <div className="relative h-72 w-full overflow-hidden rounded-t-3xl flex-shrink-0">
                  <Image
                    src={coverImage}
                    alt={`${value?.planName} cover`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 via-transparent to-transparent p-4 flex flex-col gap-2">
                    <span className="text-white text-sm uppercase font-medium">
                      {value?.tag || "Plan"}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-500">{value?.planName}</h3>
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
                      transition={{ delay: 0.1 }}
                      className="text-lg font-medium"
                    >
                      What's Included:
                    </motion.p>
                    <ul className="flex flex-col gap-3 mt-3">
                      {value?.planIncludes?.map((item: any, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
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
                  >
                    <a
                      href={value?.paylink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 relative inline-flex justify-center items-center w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold py-4 rounded-full shadow-lg transition-all duration-300"
                    >
                      Subscribe Now
                    </a>
                  </motion.div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Pricing;