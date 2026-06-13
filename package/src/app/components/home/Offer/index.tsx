"use client";

import React from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function MasterclassBenefits() {
  const { ref, inView } = useInView({
    threshold: 0.05,
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
      bg: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883732/creditor-website-assets/images/offers/enrollnew.png",
    },
    {
      type: "block",
      title: "Charge Your Card",
      img: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883727/creditor-website-assets/images/offers/card.webp",
      description:
        "Charge your \"Creditor Card\" and step into the private economy. Each swipe unlocks access, wealth, and opportunity reserved for members only.",
      color: "from-slate-50 via-slate-100 to-slate-200",
    },
    {
      type: "block",
      title: "Unlock Courses & Connect",
      img: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883729/creditor-website-assets/images/offers/courses.webp",
      description:
        "Instantly access premium courses, join daily live masterclasses, and a private network of like-minded achievers. Learn, grow, and collaborate.",
      color: "from-blue-50 via-indigo-50/50 to-slate-100",
    },
    {
      type: "bg",
      title: "Become Private",
      description:
        "Take control of your sovereignty. Apply what you learn to live free, operate privately, and build wealth on your own terms.",
      bg: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883751/creditor-website-assets/images/offers/sovnew.png",
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-28 bg-white text-slate-900">
      {/* ── AMBIENT STRUCTURAL BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-500/[0.03] rounded-full blur-[160px]" />
        <div className="absolute top-2/3 left-1/3 w-[600px] h-[300px] bg-amber-500/[0.03] rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        
        {/* ── HEADER INTRO BLOCK ── */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase mb-4">
            Strategic Architecture
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
            The{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Freedom
            </span>{" "}
            Formula
          </h2>
          <p className="text-sm md:text-base text-slate-500 mt-3 font-normal leading-relaxed">
            A linear operational map designed to transition entities step-by-step out of traditional friction and into sovereign private commerce.
          </p>
        </div>

        {/* ── TIMELINE ENGINE ROW & CONTAINER ── */}
        <div ref={ref} className="relative space-y-12 md:space-y-20 before:absolute before:inset-y-4 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500/20 before:via-slate-200 before:to-transparent">
          {benefits.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-stretch gap-6 md:gap-12 relative ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Geometric Hub */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-500 z-30 shadow-[0_0_12px_rgba(59,130,246,0.3)] mt-6 hidden sm:block" />

                {/* ── CONTENT INTERACTION HALF ── */}
                <div className="w-full md:w-1/2 flex flex-col justify-center pl-8 md:pl-0 md:px-4">
                  <div className="space-y-3 max-w-md mx-auto md:mx-0 w-full">
                    <div className="text-xs font-black tracking-widest text-amber-600 uppercase">
                      Stage 0{idx + 1}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500 font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* ── GRAPHIC CANVAS INTERACTION HALF ── */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/60 shadow-xl group h-[220px] md:h-[260px] flex items-center justify-center transition-all duration-300 hover:border-slate-300 hover:shadow-2xl">
                    
                    {/* Background Overlay Controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 via-transparent to-transparent z-10" />

                    {/* BG TYPE PANEL LAYER RENDER */}
                    {item.type === "bg" && (
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={item.bg}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
                      </div>
                    )}

                    {/* BLOCK TYPE CARD RENDER */}
                    {item.type === "block" && (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
                        <div className="relative z-20 w-4/5 h-4/5 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
                          <Image
                            src={(item as BlockCard).img}
                            alt={item.title}
                            width={280}
                            height={180}
                            className="object-contain max-h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
                            loading="lazy"
                          />
                        </div>
                      </>
                    )}

                    {/* Linear Node Index Identification Stamp */}
                    <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm backdrop-blur-md select-none">
                      0{idx + 1}
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* ── ACTION CONVERSION TRIGGER ── */}
        <div className="mt-20 md:mt-28 flex flex-col items-center">
          <a
            href="/masterclass-membership"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base md:text-lg shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="relative z-10">Initialize Membership Protocols</span>
            <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>

      </div>
    </section>
  );
}