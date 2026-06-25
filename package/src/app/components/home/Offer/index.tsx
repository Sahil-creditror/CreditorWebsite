"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function MasterclassBenefits() {
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const benefits = [
    {
      step: "STAGE 01",
      title: "Become a Member",
      description:
        "Join Creditor Academy and unlock private education, exclusive resources, and a structured path toward financial freedom.",
      image:
        "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883732/creditor-website-assets/images/offers/enrollnew.png",
      accent: "from-blue-600 to-sky-400",
      accentHex: "#2563eb",
    },
    {
      step: "STAGE 02",
      title: "Charge Your Card",
      description:
        "Activate your Creditor Card and enter a private economy built around access, opportunity, and member advantages.",
      image:
        "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883727/creditor-website-assets/images/offers/card.webp",
      accent: "from-sky-500 to-cyan-400",
      accentHex: "#0ea5e9",
    },
    {
      step: "STAGE 03",
      title: "Unlock Courses & Connect",
      description:
        "Access premium courses, live masterclasses, and a private network designed for growth and collaboration.",
      image:
        "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883729/creditor-website-assets/images/offers/courses.webp",
      accent: "from-indigo-600 to-blue-500",
      accentHex: "#4f46e5",
    },
    {
      step: "STAGE 04",
      title: "Become Private",
      description:
        "Apply what you learn to operate privately, protect your assets, and build wealth on your own terms.",
      image:
        "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883751/creditor-website-assets/images/offers/sovnew.png",
      accent: "from-violet-600 to-indigo-400",
      accentHex: "#7c3aed",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-tr from-[#f3f8fe] via-[#eff6ff] to-[#e0f2fe] pt-20 pb-32 md:pt-18 md:pb-24 text-slate-800 selection:bg-blue-500/20">

      {/* Light Tech Overlay Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* --- Heading Area --- */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 md:mb-32 flex flex-col items-center"
        >
          <h2 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-slate-900 uppercase">
            The{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
              Freedom
            </span>{" "}
            Formula
          </h2>

          <p className="mt-4 text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
            A precise, sequential pipeline framework engineered to optimize capital scaling, private membership access, and asset protection.
          </p>
        </motion.div>

        {/* --- Timeline Grid Pathway --- */}
        <div className="relative max-w-5xl mx-auto">

          {/* Tech Laser Spine */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-blue-200/60 -translate-x-1/2" />

          {/* Fluid Travel Glow Anchor */}
          <motion.div
            className="hidden md:block absolute left-1/2 w-[2px] bg-gradient-to-b from-blue-600 to-sky-400 -translate-x-1/2 transition-all duration-500 z-10 shadow-[0_0_8px_#2563eb]"
            style={{
              top: hoveredIndex !== null ? `${hoveredIndex * 25}%` : "0%",
              height: hoveredIndex !== null ? "25%" : "0%",
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          />

          <div className="space-y-24 md:space-y-36">
            {benefits.map((item, index) => {
              const isEven = index % 2 === 0;
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative grid md:grid-cols-2 gap-12 md:gap-24 items-center w-full transition-all duration-500 ${hoveredIndex !== null && !isHovered ? "opacity-40 blur-[0.5px]" : "opacity-100"
                    }`}
                >

                  {/* Central Timeline Point */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20">
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.3 : 1,
                        borderColor: isHovered ? item.accentHex : "#bfdbfe",
                        backgroundColor: isHovered ? "#ffffff" : "#eff6ff"
                      }}
                      className="w-3.5 h-3.5 rounded-full border-2 bg-white transition-colors duration-300 relative shadow-sm"
                    >
                      {isHovered && (
                        <span
                          className="absolute inset-0 rounded-full animate-ping opacity-25"
                          style={{ backgroundColor: item.accentHex }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Image Column - Full and Frameless */}
                  <div className={`${isEven ? "md:pr-4" : "md:order-2 md:pl-4"}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full aspect-[16/10] flex items-center justify-center select-none group"
                    >
                      {/* Ambient Image Underglow */}
                      <div className={`absolute w-4/5 h-4/5 bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-10 rounded-full filter blur-[60px] transition-opacity duration-700 pointer-events-none`} />

                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain object-center filter drop-shadow-[0_15px_30px_rgba(37,99,235,0.08)]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </motion.div>
                  </div>

                  {/* Content Column */}
                  <div className={`${isEven ? "md:pl-4" : "md:pr-4"} flex flex-col justify-center`}>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[10px] tracking-[0.2em] font-extrabold transition-colors duration-300"
                        style={{ color: isHovered ? item.accentHex : "#94a3b8" }}
                      >
                        {item.step}
                      </span>
                      <div className="h-[1px] w-8 bg-blue-200/60" />
                    </div>

                    <h3 className="mt-3 text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-500 font-medium max-w-md">
                      {item.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* --- Action Pill Module --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-28 relative z-20"
        >
          <a
            href="/masterclass-membership"
            className="group relative inline-flex items-center gap-6 pl-8 pr-3 py-3 overflow-hidden rounded-full bg-primary text-white text-xs tracking-widest uppercase font-black transition-all duration-300 shadow-lg shadow-blue-900/10 hover:shadow-xl hover:shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Initialize Membership</span>
            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white transition-transform duration-300 group-hover:translate-x-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        </motion.div>

      </div>

      {/* --- Smooth Futuristic Curved Bottom Wave Layer --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden line-height-0 transform translate-y-[1px] pointer-events-none z-10">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-[60px] md:h-[120px]"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b9d8edff" stopOpacity="1" />
              <stop offset="50%" stopColor="#eff6ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#3e7cc8ff" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
            fill="url(#curve-gradient)"
          />
        </svg>
      </div>

    </section>
  );
}