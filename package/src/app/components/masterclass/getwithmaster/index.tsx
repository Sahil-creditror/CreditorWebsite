"use client";

import React, { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";

export default function MasterclassBenefits() {
  const benefits = [
    {
      title: "Pay-As-You-Go Learning",
      description:
        "Access every course in our library at a member-only rate — only pay for what you need, when you need it.",
      image: "/images/courses/become/private.png",
    },
    {
      title: "Introductory Access",
      description:
        "Try the first module of premium courses for free so you can decide before committing.",
      image: "/images/courses/become/document.png",
    },
    {
      title: "Private Community Groups",
      description:
        "Connect with entrepreneurs and pros, get fast answers, and share wins in exclusive groups.",
      image: "/images/masterclass/community.png",
    },
    {
      title: "Live Weekly Trainings",
      description:
        "Attend live sessions with instructors — ask questions, get critiques, and stay ahead.",
      image: "/images/about-us/masterclass.webp",
    },
  ];

  // Section variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  };

  // Title letter variants (subtle stagger)
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  // Card variants accept custom index for stagger timing
  const cardVariants: Variants = {
    hidden: (i: number) => ({ opacity: 0, y: 30, scale: 0.99 }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.12, type: "spring", stiffness: 110, damping: 18 },
    }),
  };

  const title = "What You Get";
  const words = title.split(" ");
  const subtitle = "Everything you need to level up fast: community, live coaching, and preview access.";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-24 md:py-20">
      {/* Decorative blurred shapes */}
      <div className="pointer-events-none absolute -left-24 -top-24 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-12 blur-3xl" />
      <div className="pointer-events-none absolute right-8 -bottom-28 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 opacity-10 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.header
          className="max-w-4xl mx-auto text-center mb-10 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={sectionVariants}
        >
          <motion.h2 className="font-extrabold leading-tight text-slate-900 dark:text-white text-3xl md:text-5xl lg:text-6xl tracking-tight mb-4">
            {words.map((word, i) => (
              <motion.span key={i} className="inline-block mr-2" variants={letterVariants}>
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p className="mx-auto text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-medium" variants={sectionVariants}>
            {subtitle}
          </motion.p>

          <motion.div className="mt-6 flex items-center justify-center gap-4" variants={sectionVariants}>
            <motion.a
              href="#join"
              className="inline-flex items-center gap-3 rounded-full px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Join Masterclass"
            >
              Join — $69 / month
            </motion.a>

            <motion.a
              href="#learn"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 md:px-6 md:py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Learn more about Masterclass"
            >
              Learn more
            </motion.a>
          </motion.div>
        </motion.header>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((item, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const isInView = useInView(cardRef, { once: false, margin: "-80px" });

            return (
              <motion.article
                key={index}
                ref={cardRef}
                className="relative bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col"
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={index}
                whileHover={{ translateY: -8, scale: 1.02 }}
                layout
              >
                {/* Image / media */}
                <div className="relative w-full h-44 sm:h-52 lg:h-44">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Floating label */}
                  <div className="absolute left-4 top-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/80 text-slate-900 dark:text-white">
                    {index === 0 ? "New" : index === 3 ? "Live" : "Feature"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      aria-label={`Explore ${item.title}`}
                    >
                      Explore
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>

                    <motion.div
                      className="ml-auto flex items-center gap-3"
                      whileHover={{ rotate: 10 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    >
                      <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-slate-700 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 11a1 1 0 011-1h3.28a1 1 0 01.95.684L8.9 14H16a1 1 0 011 1v2a1 1 0 01-1 1H2v-6z" />
                          <path d="M7 7a3 3 0 100-6 3 3 0 000 6z" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Decorative bottom accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-80" />
              </motion.article>
            );
          })}
        </div>

        {/* Sub-footer / note */}
        <motion.div className="mt-10 max-w-3xl mx-auto text-center text-sm text-slate-500 dark:text-slate-400" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p>
            Join today to get exclusive previews, live coaching, and entry to member-only community groups — cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
