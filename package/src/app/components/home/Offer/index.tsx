"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

interface BenefitItem {
  step: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  accentHex: string;
}

export default function MasterclassBenefits() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Mouse positioning state for a global custom card spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const benefits: BenefitItem[] = [
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-18 pb-20 text-slate-100 selection:bg-blue-500/20"
    >
       {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/bg/bggg.jpg')",
        }}
      />
      {/* Background Graphic Framework with Dark Blue Gradient Fusion Layers */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-600/50 via-blue-950/80 to-slate-600/60 " />
      
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{
          backgroundImage: "url('/images/bg/bgfree.jpg')",
        }}
      >
        {/* Soft tone equalizer over the image frame to lock in the deep contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/20" />
      </div>

      {/* Grid Pattern Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">

        {/* --- Header Area --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <h2 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
            The{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400">
              Freedom
            </span>{" "}
            Formula
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
            A precise, sequential pipeline framework engineered to optimize capital scaling, private membership access, and asset protection.
          </p>
        </motion.div>

        {/* --- Dynamic Content Control Interactive Layout --- */}
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[480px]">

          {/* Left Column: Interactive Navigation Timeline Hub */}
          <div className="lg:col-span-5 relative flex flex-col justify-between h-full space-y-4">

            {/* Master Tracking Vertical Line Connection */}
            <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-slate-800/80" />

            {/* Laser Active Fill Core */}
            <div
              className="absolute left-[23px] w-[2px] bg-gradient-to-b from-blue-500 to-indigo-500 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                top: `${(activeIndex / benefits.length) * 100}%`,
                height: `${100 / benefits.length}%`,
                boxShadow: `0 0 12px ${benefits[activeIndex].accentHex}`
              }}
            />

            {benefits.map((item, index) => {
              const isSelected = activeIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="relative flex items-start text-left group z-10 outline-none w-full p-4 rounded-xl transition-all duration-300"
                >
                  {/* Step Interactive Node */}
                  <div className="flex-shrink-0 mr-6 mt-1">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 font-mono text-sm font-bold
                        ${isSelected
                          ? "bg-slate-900 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white"
                          : "bg-slate-950/40 border-slate-800/60 text-slate-500 group-hover:border-slate-700 group-hover:bg-slate-900/40"
                        }
                      `}
                    >
                      0{index + 1}
                    </div>
                  </div>

                  {/* Node Short Description metadata */}
                  <div className="flex-1">
                    <span
                      className={`text-[10px] tracking-[0.2em] font-black uppercase transition-colors duration-300 ${isSelected ? "text-blue-400" : "text-slate-500"
                        }`}
                    >
                      {item.step}
                    </span>
                    <h3 className={`text-lg font-bold uppercase tracking-tight transition-colors duration-300 ${isSelected ? "text-white" : "text-slate-400 group-hover:text-slate-300"
                      }`}>
                      {item.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Central Kinetic Focus Window */}
          <div
            className="lg:col-span-7 relative bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-8 md:p-12 rounded-3xl h-full flex flex-col justify-between overflow-hidden group shadow-2xl shadow-black/40"
            onMouseMove={handleMouseMove}
          >
            {/* Modern Interactive Spotlight Overlay Tracking Mouse */}
            <motion.div
              className="absolute -inset-px opacity-0 group-hover:opacity-100 pointer-events-none rounded-3xl transition-opacity duration-300"
              style={{
                background: useTransform(
                  [mouseX, mouseY],
                  ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(59,130,246,0.06), transparent 80%)`
                ),
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-12 gap-8 items-center w-full my-auto"
              >
                {/* Visual Canvas Frame */}
                <div className="md:col-span-6 relative aspect-square flex items-center justify-center">
                  {/* Backdrop Radial Dynamic Glow */}
                  <div className={`absolute w-4/5 h-4/5 bg-gradient-to-r ${benefits[activeIndex].accent} opacity-20 rounded-full filter blur-[50px] animate-pulse`} />

                  {/* Mouse Tracked Interactive Image Wrapper */}
                  <motion.div className="relative w-full h-full select-none pointer-events-none">
                    <Image
                      src={benefits[activeIndex].image}
                      alt={benefits[activeIndex].title}
                      fill
                      className="object-contain object-center filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      priority
                    />
                  </motion.div>
                </div>

                {/* Information Segment */}
                <div className="md:col-span-6 flex flex-col justify-center">
                  <span className="text-xs font-mono font-bold text-slate-500 tracking-widest uppercase">
                    {benefits[activeIndex].step} // EXCLUSIVE PIPELINE
                  </span>
                  <h3 className="mt-2 text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-tight">
                    {benefits[activeIndex].title}
                  </h3>
                  <div className="h-[2px] w-12 bg-blue-500 my-4" />
                  <p className="text-sm leading-relaxed text-slate-400 font-medium">
                    {benefits[activeIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* --- Action Pill Module --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-24 relative z-20"
        >
          <a
            href="/masterclass-membership"
            className="group relative inline-flex items-center gap-6 pl-8 pr-3 py-3 overflow-hidden rounded-full bg-blue-600 text-white text-xs tracking-widest uppercase font-black transition-all duration-300 shadow-lg shadow-blue-950/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.03] active:scale-[0.98]"
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
    </section>
  );
}