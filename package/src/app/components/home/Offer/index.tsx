"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll, useMotionValueEvent } from "framer-motion";

interface BenefitItem {
  step: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  accentHex: string;
}

export default function MasterclassBenefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  // Hook into the scroll progress of the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dynamically map scroll progress intervals to each section step index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveIndex(0);
    else if (latest >= 0.25 && latest < 0.5) setActiveIndex(1);
    else if (latest >= 0.5 && latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  // Mouse positioning state for the card spotlight effect
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
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883732/creditor-website-assets/images/offers/enrollnew.png",
      accent: "from-blue-600 to-sky-400",
      accentHex: "#2563eb",
    },
    {
      step: "STAGE 02",
      title: "Charge Your Card",
      description:
        "Activate your Creditor Card and enter a private economy built around access, opportunity, and member advantages.",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883727/creditor-website-assets/images/offers/card.webp",
      accent: "from-sky-500 to-cyan-400",
      accentHex: "#0ea5e9",
    },
    {
      step: "STAGE 03",
      title: "Unlock Courses & Connect",
      description:
        "Access premium courses, live masterclasses, and a private network designed for growth and collaboration.",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883729/creditor-website-assets/images/offers/courses.webp",
      accent: "from-indigo-600 to-blue-500",
      accentHex: "#4f46e5",
    },
    {
      step: "STAGE 04",
      title: "Become Private",
      description:
        "Apply what you learn to operate privately, protect your assets, and build wealth on your own terms.",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883751/creditor-website-assets/images/offers/sovnew.png",
      accent: "from-violet-600 to-indigo-400",
      accentHex: "#7c3aed",
    },
  ];

  return (
    <div className="relative bg-slate-950">
      {/* --- Unified Sticky Background Layer --- */}
      <div className="absolute inset-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
          {/* Background Layers */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/bg/bggg.jpg')" }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-600/50 via-blue-950/80 to-slate-600/60 " />
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
            style={{ backgroundImage: "url('/images/bg/bgfree.jpg')" }}
          />
          {/* Grid Pattern Mesh */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
          </div>
        </div>
      </div>

      {/* --- Content Area --- */}
      <div className="relative z-10">

        {/* --- Header Area (Scrolls Normally) --- */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-slate-100 selection:bg-blue-500/20 px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center flex flex-col items-center max-w-3xl"
          >
            <h2 className="text-5xl md:text-6xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
              The{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400">
                Freedom
              </span>{" "}
              Formula
            </h2>
            <p className="mt-8 text-sm md:text-base lg:text-lg text-slate-300 mx-auto leading-relaxed font-medium">
              A precise, sequential pipeline framework engineered to optimize capital scaling, private membership access, and asset protection.
            </p>
          </motion.div>


        </section>

        {/* --- The outer container gives the section scroll-depth (4 stages = 400vh) --- */}
        <div ref={containerRef} className="relative h-[400vh]">
          {/* Sticky content container stays locked to screen while right column processes updates */}
          <section className="sticky top-24 h-[calc(100vh-6rem)] w-full text-slate-100 selection:bg-blue-500/20 flex items-center">

            <div className="container mx-auto px-6 relative z-10 max-w-6xl w-full flex flex-col justify-center h-full">

              {/* --- Grid Layout Container --- */}
              <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[460px]">

                {/* Left Column: Fixed Timeline Indicator Hub */}
                <div className="lg:col-span-5 relative flex flex-col justify-between space-y-4">

                  {/* Master Tracking Vertical Line Connection */}
                  <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-slate-800/80" />

                  {/* Laser Active Fill Core Tracked by State */}
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
                      <div
                        key={index}
                        className="relative flex items-start text-left group z-10 w-full p-4 rounded-xl transition-all duration-300"
                      >
                        {/* Step Node */}
                        <div className="flex-shrink-0 mr-6 mt-1">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 font-mono text-sm font-bold
                              ${isSelected
                                ? "bg-slate-900 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white"
                                : "bg-slate-950/40 border-slate-800/60 text-slate-500"
                              }
                            `}
                          >
                            0{index + 1}
                          </div>
                        </div>

                        {/* Node Labels */}
                        <div className="flex-1">
                          <span
                            className={`text-[10px] tracking-[0.2em] font-black uppercase transition-colors duration-300 ${isSelected ? "text-blue-400" : "text-slate-500"
                              }`}
                          >
                            {item.step}
                          </span>
                          <h3 className={`text-lg font-bold uppercase tracking-tight transition-colors duration-300 ${isSelected ? "text-white" : "text-slate-500"
                            }`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: Central Evolving Kinetic Window */}
                <div
                  className="lg:col-span-7 relative bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-8 md:p-12 rounded-3xl h-[420px] flex flex-col justify-center overflow-hidden group shadow-2xl shadow-black/40"
                  onMouseMove={handleMouseMove}
                >
                  {/* Interactive Spotlight Overlay Tracking Mouse */}
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
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="grid md:grid-cols-12 gap-8 items-center w-full"
                    >
                      {/* Visual Canvas Frame */}
                      <div className="md:col-span-6 relative aspect-square w-full max-w-[200px] md:max-w-none mx-auto flex items-center justify-center">
                        {/* Backdrop Radial Dynamic Glow */}
                        <div className={`absolute w-4/5 h-4/5 bg-gradient-to-r ${benefits[activeIndex].accent} opacity-25 rounded-full filter blur-[40px]`} />

                        {/* Image Render */}
                        <div className="relative w-full h-full select-none pointer-events-none">
                          <Image
                            src={benefits[activeIndex].image}
                            alt={benefits[activeIndex].title}
                            fill
                            className="object-contain object-center filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                            sizes="(max-width: 1024px) 100vw, 35vw"
                            priority
                          />
                        </div>
                      </div>

                      {/* Information Segment */}
                      <div className="md:col-span-6 flex flex-col justify-center text-center md:text-left">
                        <span className="text-[10px] font-mono font-bold text-slate-500 tracking-widest uppercase">
                          {benefits[activeIndex].step} // EXCLUSIVE PIPELINE
                        </span>
                        <h3 className="mt-1 text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-tight">
                          {benefits[activeIndex].title}
                        </h3>
                        <div className="h-[2px] w-10 bg-blue-500 my-3 mx-auto md:mx-0" />
                        <p className="text-xs md:text-sm leading-relaxed text-slate-400 font-medium">
                          {benefits[activeIndex].description}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

              {/* Bottom Callout Option */}
              <div className="flex justify-center mt-6 md:mt-8 mb-12">
                <a
                  href="/masterclass-membership"
                  className="group relative inline-flex items-center gap-4 pl-6 pr-2 py-2 overflow-hidden rounded-full bg-blue-600 text-white text-[10px] tracking-widest uppercase font-black transition-all duration-300 shadow-lg hover:scale-[1.02]"
                >
                  <span>Initialize Membership</span>
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              </div>

            </div>
          </section>
        </div>
      </div>
    </div>
  );
}