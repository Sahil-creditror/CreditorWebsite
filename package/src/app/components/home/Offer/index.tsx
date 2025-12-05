"use client";

import React from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function MasterclassBenefits() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
        "Charge your \"Creditor Card\" and step into the private economy. Each swipe unlocks access, wealth, and opportunity reserved for members only.",
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

  return (
    <section className="relative overflow-hidden py-10 md:py-20 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" /> */}
      <div
        className="absolute inset-0 bg-[url('/images/home/aboutusIndex/about_christmas4.webp')] bg-cover bg-center dark:opacity-0 transition-opacity duration-300"
        aria-hidden="true"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 dark:hidden pointer-events-none" /> */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/60 hidden dark:block pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- Section Heading --- */}
        <div ref={ref} className="mt-0 md:mt-5">
          {/* Top Row - Left Aligned */}
          {/* <motion.div
            className="flex items-center gap-4 md:gap-8 mb-6"
            initial={{ opacity: 0 }}
            animate={
              inView
                ? {
                    opacity: 1,
                    transition: { delay: 0.2 }
                  }
                : {}
            }
          >
            <motion.span
              className="bg-primary py-1.5 px-2.5 text-base font-medium rounded-full dark:text-secondary"
              initial={{ scale: 0 }}
              animate={
                inView
                  ? {
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 15
                      }
                    }
                  : {}
              }
            >
              02
            </motion.span>
            <motion.div
              className="h-px w-16 bg-secondary/12 dark:bg-white/12"
              initial={{ scaleX: 0 }}
              animate={
                inView
                  ? {
                      scaleX: 1,
                      transition: { delay: 0.3 }
                    }
                  : {}
              }
            />
            <motion.p
              className="text-base font-medium text-white bg-secondary dark:bg-white/10 py-1.5 px-4 rounded-full"
              initial={{ y: 20, opacity: 0 }}
              animate={
                inView
                  ? {
                      y: 0,
                      opacity: 1,
                      transition: { delay: 0.4 }
                    }
                  : {}
              }
            >
              We Offer You
            </motion.p>
          </motion.div> */}
          
          {/* Section Title - Center Aligned */}
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white leading-tight">
              The{' '}
              <span className="bg-clip-text text-white bg-gradient-to-r from-blue-500 to-blue-400">
                Freedom
              </span>{' '}
              Formula
            </h3> 
          </div> 
        </div>

        {/* --- Cards Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {benefits.map((item, idx) => (
            <div key={idx} className="relative">
              {/* --- Snow Layer Above Card (Outside Card Container) --- */}
              <div className="absolute -top-3 left-0 right-0 w-full h-auto z-40 pointer-events-none">
                <Image
                  src="/images/offers/snow.png"
                  alt=""
                  width={800}
                  height={200}
                  className="w-full h-auto object-contain object-top"
                />
              </div>

              {/* --- Card Container --- */}
              <div
                className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 h-full group"
              >
                {/* --- Large Number Overlay --- */}
                <span
                  className={`absolute top-3 right-5 text-[90px] md:text-[120px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400/40 to-amber-400/40 dark:from-blue-300/50 dark:to-yellow-300/50 select-none pointer-events-none leading-none z-30 drop-shadow-[0_0_20px_rgba(255,215,0,0.25)] group-hover:scale-110 group-hover:opacity-100 opacity-90 transition-transform duration-500 ease-out`}
                >
                  {String(idx + 1).padStart(1, "0")}
                </span>

              {/* Shared overlays for ALL card types (subtle glass + gradient + radial glow) */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {/* soft tint to unify cards */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 dark:to-black/40 opacity-60 mix-blend-overlay" />

                {/* radial glow (top-right) */}
                <div className="absolute -top-10 -right-10 w-36 h-36 blur-3xl opacity-60 rounded-full bg-gradient-to-tr from-blue-400/30 to-indigo-600/20" /> 

                {/* subtle bottom vignette */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

                {/* translucent glass layer for readable text */}
                <div className="absolute inset-0 bg-white/0 dark:bg-black/0 backdrop-blur-[2px]" />
              </div>

              {/* --- BG type cards (1 & 4) --- */}
              {item.type === "bg" && (
                <div
                  className="relative h-full min-h-[20rem] flex flex-col justify-between overflow-hidden border rounded-2xl border-slate-200 dark:border-slate-700"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(2,6,23,0.38) 60%), url(${item.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Additional overlay specific to BG cards for contrast */}
                  <div className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none z-20" />

                  <div className="absolute -top-8 -right-8 w-36 h-36 bg-gradient-to-tr from-blue-400/30 to-indigo-600/20 rounded-full blur-3xl pointer-events-none opacity-80 z-15" />

                  {/* Top heading overlay for BG cards */}
                  <div className="p-6 md:p-8 absolute top-0 left-0 right-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent z-30">
                    <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>

                  <div className="p-6 md:p-8 relative z-30 mt-auto">
                    <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-prose text-justify">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover accent */}
                  <div className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-30 bg-gradient-to-br from-blue-400/20 to-amber-300/10" />
                </div>
              )}

              {/* --- Block type cards (2 & 3) --- */}
              {item.type === "block" && (
                <div
                  className={`relative flex flex-col justify-between rounded-2xl p-6 md:p-8 h-full bg-gradient-to-b ${item.color} border border-slate-200 dark:border-slate-700 overflow-hidden`}
                >
                  {/* layered gradients to improve readability */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />

                  {/* Heading */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md relative z-20">
                    {item.title}
                  </h3>

                  {/* Image */}
                  <Image
                    src={(item as BlockCard).img}
                    alt={item.title}
                    width={800}
                    height={400}
                    className={`w-full object-contain rounded-xl relative mt-5 z-20 ${idx === 1 ? 'h-28 md:h-32' : 'h-36 md:h-44'}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Description at bottom */}
                  <p className="mt-4 text-sm md:text-base text-white/90 leading-relaxed max-w-prose z-20 text-justify">
                    {item.description}
                  </p>

                  {/* Hover accent */}
                  <div className="absolute inset-0 z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-25 bg-gradient-to-br from-white/5 to-black/20 pointer-events-none" />
                </div>
              )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <a
            className="relative w-full max-w-md inline-flex items-center justify-center px-10 py-3.5 md:px-10 md:py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-lg md:text-xl shadow-lg ring-1 ring-white/10 dark:ring-black/10 transition-transform duration-200"
            href="/projects"
          >
            Become a Member
          </a>
        </div>
      </div>
    </section>
  );
}
