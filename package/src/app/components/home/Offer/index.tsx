"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function MasterclassBenefits() {
  type BgCard = {
    type: "bg";
    title: string;
    description: string;
    bg: string;
  };
  type BlockCard = {
    type: "block";
    title: string;
    description: string;
    img: string;
    color: string;
  };

  const benefits: Array<BgCard | BlockCard> = [
    {
      type: "bg",
      title: "Become a Member",
      description:
        "Join the movement. Step inside Creditor Academy and unlock access to a world of private education and financial freedom.",
      bg: "/images/offers/enrollnew.webp",
    },
    {
      type: "block",
      title: "Charge Your Card",
      img: "/images/offers/card.webp",
      description:
        "Charge your Creditor Card and step into the private economy. Each swipe unlocks access, wealth, and opportunity reserved for members only.",
      color: "from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black",
    },
    {
      type: "block",
      title: "Unlock Courses & Connect",
      img: "/images/offers/courses.webp",
      description:
        "Instantly access premium courses, join daily live masterclasses, and a private network of like-minded achievers. Learn, grow, and collaborate.",
      color: "from-[#0a1e3f] to-[#1a2e5f] dark:from-[#0a1e3f] dark:to-[#101b36]",
    },
    {
      type: "bg",
      title: "Become Private",
      description:
        "Take control of your sovereignty. Apply what you learn to live free, operate privately, and build wealth on your own terms.",
      bg: "/images/offers/sovnew.webp",
    },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 relative z-10">
        {/* --- Section Heading --- */}
        <motion.div
          className="mt-0 md:mt-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white leading-tight">
            The{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400">
              Freedom
            </span>{" "}
            Formula
          </h3>
        </motion.div>

        {/* --- Cards Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 h-full group"
            >
              {/* --- Large Number Overlay --- */}
              <motion.span
                className={`absolute top-3 right-5 text-[90px] md:text-[120px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400/40 to-amber-400/40 dark:from-blue-300/50 dark:to-yellow-300/50 select-none pointer-events-none leading-none z-30 drop-shadow-[0_0_20px_rgba(255,215,0,0.25)] group-hover:scale-110 group-hover:opacity-100 opacity-90 transition-transform duration-500 ease-out`}
                initial={{ opacity: 0, scale: 0.9, y: -15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                {String(idx + 1).padStart(1, "0")}
              </motion.span>

              {/* --- BG type cards (1 & 4) --- */}
              {item.type === "bg" && (
                <div
                  className="relative h-full min-h-[20rem] flex flex-col justify-between rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(2,6,23,0.38) 60%), url(${item.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none" />
                  <div className="absolute -top-8 -right-8 w-36 h-36 bg-gradient-to-tr from-blue-400/30 to-indigo-600/20 rounded-full blur-3xl pointer-events-none opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a1e3f]/80 via-[#0a1e3f]/50 to-transparent pointer-events-none" />

                  {/* Top heading overlay for BG cards */}
                  <motion.div
                    className="p-6 md:p-8 absolute top-0 left-0 right-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent z-20"
                    initial={{ opacity: 0, y: -12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                      {item.title}
                    </h3>
                  </motion.div>

                  <motion.div
                    className="p-6 md:p-8 relative z-20 mt-auto"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-prose text-justify">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              )}

              {/* --- Block type cards (2 & 3) --- */}
              {item.type === "block" && (
                <div
                  className={`relative flex flex-col justify-between rounded-2xl p-6 md:p-8 h-full bg-gradient-to-b ${item.color} border border-slate-200 dark:border-slate-700 overflow-hidden`}
                >
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none z-0" />

                  {/* Heading */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md relative z-20">
                    {item.title}
                  </h3>

                  {/* Image */}
                  <div className="relative mt-5 z-20">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={800}
                      height={400}
                      className="w-full h-36 md:h-44 object-contain rounded-xl"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Description at bottom */}
                  <p className="mt-4 text-sm md:text-base text-white/90 leading-relaxed max-w-prose z-20 text-justify">
                    {item.description}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
