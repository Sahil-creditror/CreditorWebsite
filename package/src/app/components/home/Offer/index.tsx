"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BenefitCard {
  step: string;
  stageNum: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  glowColor: string;
}

const benefits: BenefitCard[] = [
  {
    step: "STAGE 01",
    stageNum: "01",
    title: "Become a Member",
    description:
      "Join Creditor Academy and unlock private education, exclusive resources, and a structured path toward financial freedom.",
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883732/creditor-website-assets/images/offers/enrollnew.png",
    accent: "from-blue-600 via-blue-500 to-sky-400",
    glowColor: "rgba(37, 99, 235, 0.25)",
  },
  {
    step: "STAGE 02",
    stageNum: "02",
    title: "Charge Your Card",
    description:
      "Activate your Creditor Card and enter a private economy built around access, opportunity, and member advantages.",
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883727/creditor-website-assets/images/offers/card.webp",
    accent: "from-sky-500 via-cyan-400 to-blue-500",
    glowColor: "rgba(14, 165, 233, 0.25)",
  },
  {
    step: "STAGE 03",
    stageNum: "03",
    title: "Unlock Courses & Connect",
    description:
      "Access premium courses, live masterclasses, and a private network designed for growth and collaboration.",
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883729/creditor-website-assets/images/offers/courses.webp",
    accent: "from-indigo-600 via-blue-600 to-sky-400",
    glowColor: "rgba(79, 70, 229, 0.25)",
  },
  {
    step: "STAGE 04",
    stageNum: "04",
    title: "Become Private",
    description:
      "Apply what you learn to operate privately, protect your assets, and build wealth on your own terms.",
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883751/creditor-website-assets/images/offers/sovnew.png",
    accent: "from-violet-600 via-indigo-500 to-blue-400",
    glowColor: "rgba(124, 58, 237, 0.25)",
  },
];

export default function MasterclassBenefits() {
  return (
    <div className="relative bg-slate-950 min-h-screen text-slate-100 selection:bg-blue-500/20 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* --- Original Background Layers --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg/bggg.jpg')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-600/30 via-blue-950/80 to-slate-600/60" />
        
        {/* Grid Pattern Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* --- Header Area --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center max-w-3xl mx-auto mb-20"
        >
         

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
            The{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
              Freedom
            </span>{" "}
            Formula
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
            A precise, sequential pipeline framework engineered to optimize capital scaling, private membership access, and asset protection.
          </p>
        </motion.div>

        {/* --- Pipeline Cards Grid --- */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
         

          {benefits.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              className="group relative rounded-3xl border border-slate-800/90 bg-slate-900/60 backdrop-blur-xl p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-sky-500/40 hover:-translate-y-2 z-10"
              style={{
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
              }}
            >
             

              {/* Card Ambient Glow Effect */}
              <div
                className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: item.glowColor }}
              />

              {/* Card Header Info */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] tracking-[0.25em] font-extrabold uppercase text-blue-400/90 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                    {item.step}
                  </span>
                  <span className="text-3xl font-black text-slate-500  duration-300">
                    {item.stageNum}
                  </span>
                </div>

                {/* Image Display Area */}
                <div className="relative my-6 h-44 w-full flex items-center justify-center">
                  <div
                    className={`absolute w-3/4 h-3/4 bg-gradient-to-r ${item.accent} opacity-15 rounded-full filter blur-2xl group-hover:opacity-30 transition-opacity duration-500`}
                  />
                  <div className="relative w-full h-full select-none transform transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain object-center filter drop-shadow-[0_16px_24px_rgba(0,0,0,0.7)]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </div>

                {/* Title & Divider */}
                <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-sky-200 transition-colors duration-300">
                  {item.title}
                </h3>
                <div
                  className={`h-[2px] w-10 bg-gradient-to-r ${item.accent} my-3.5 group-hover:w-16 transition-all duration-300`}
                />
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal mt-1">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- Bottom Callout CTA --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mt-16 md:mt-20"
        >
          <a
            href="/masterclass-membership"
            className="group relative inline-flex items-center gap-4 pl-8 pr-3 py-3 overflow-hidden rounded-full bg-blue-600 text-white text-xs tracking-widest uppercase font-extrabold transition-all duration-300 shadow-xl shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40 hover:scale-[1.02]"
          >
            <span>Initialize Membership</span>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-white transition-transform duration-300 group-hover:translate-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}