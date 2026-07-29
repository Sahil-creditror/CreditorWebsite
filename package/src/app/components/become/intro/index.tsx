"use client";
import React, { useRef, useEffect } from "react";
import { motion, Variants, Transition } from "framer-motion";
import { gsap } from "gsap";
import {
  FileText,
  Scale,
  Lock,
  Shield,
} from "lucide-react";

export default function CourseOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const blobs = containerRef.current?.querySelectorAll(".blob") ?? [];
      gsap.to(blobs, {
        y: "+=24",
        x: "+=16",
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 1.5
      });

      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3
        }
      );

      return () => {};
    });

    return () => mm.revert();
  }, []);

  // --- Framer Motion Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const features = [
    { icon: FileText, text: 'Lawful Status Correction' },
    { icon: Scale, text: 'Sovereignty Framework' },
    { icon: Lock, text: 'Private Jurisdiction' },
    { icon: Shield, text: 'Asset Protection' }
  ];

  const transition: Transition = {
    duration: 0.65,
    ease: [0.43, 0.13, 0.23, 0.96]
  };

  return (
    <motion.section
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full overflow-hidden px-4 md:px-6 py-12 md:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg/bgmm.jpg')" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-white/20 dark:bg-slate-900/50"
        aria-hidden
      />

      {/* Enhanced decorative blobs */}
      <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full blob bg-linear-to-br from-blue-400/20 to-indigo-400/15 dark:from-indigo-700/25 dark:to-blue-600/20 mix-blend-screen blur-3xl transform-gpu" />
      <div aria-hidden className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blob bg-linear-to-br from-indigo-300/20 to-purple-300/12 dark:from-indigo-800/20 dark:to-purple-800/15 mix-blend-screen blur-3xl transform-gpu" />
      <div aria-hidden className="absolute top-1/4 -left-20 w-64 h-64 rounded-full blob bg-linear-to-br from-blue-300/15 to-cyan-300/10 dark:from-blue-700/15 dark:to-cyan-600/10 mix-blend-screen blur-2xl transform-gpu" />

      <div className="mx-auto max-w-7xl flex flex-wrap gap-10 items-center relative z-10 p-0 md:p-0">
        {/* Embedded Drive Video */}
        <div className="flex-1 min-w-72 max-w-3xl relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="w-full aspect-video rounded-2xl relative overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://creditorappuniquebucket02082025.s3.us-east-1.amazonaws.com/course/Become+Private+Bootcamp.mp4"
              allow="autoplay"
              allowFullScreen
              title="Course overview video"
              style={{ border: 0 }}
            />
          </div>
        </div>

        {/* Enhanced Course Description */}
        <div className="flex-1 min-w-72 p-5 relative z-10">
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            transition={transition}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight relative inline-block"
          >
            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-700 to-blue-600 dark:from-indigo-300 dark:to-blue-400">Bootcamp Overview</span>
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-3 left-0 h-1 bg-linear-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded"
            />
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            transition={transition}
            className="leading-relaxed text-base md:text-lg text-slate-700 dark:text-slate-300 mb-8"
          >
            Learn how the public system treats you as a corporate fiction and how to correct your status using a clear lawful framework so you can confidently live in the private.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            transition={transition}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
          >
            {features.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/70 dark:bg-slate-800/70 rounded-xl py-4 px-5 flex items-center gap-3 border border-indigo-100 dark:border-indigo-800/50 backdrop-blur-md shadow-sm"
                >
                  <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.6 }}
            className="mt-8"
          >
            {/* <motion.button 
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 px-6 bg-linear-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              Enroll Now
            </motion.button> */}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}