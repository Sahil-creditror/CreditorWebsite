"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function MasterclassBenefits() {
  const benefits = [
    {
      title: "Roadmap Series",
      description:
        "Begin your journey with Roadmap Series, giving you a clear view of the path to private, sovereign living.",
      image: "/images/offers/roadmap1.webp",
    },
    {
      title: "Start your Passive Income now",
      description:
        "A 3-phase journey from building trust, to optimizing Tier 1 business credit, and unlocking private merchant processing.",
      image: "/images/offers/passive.webp",
    },
    {
      title: "Expert Mentorship",
      description:
        "Receive one-on-one and group mentorship from experts who've handled thousands of real cases.",
      image: "/images/offers/mentor2.webp",
    },
    {
      title: "Community Support",
      description:
        "Join a private, supportive community for feedback, accountability, and real-world tips.",
      image: "/images/offers/support.webp",
    },
  ];

  // Animation variants (only those used below)

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    hover: {
      y: -10,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const imageVariants: Variants = {
    hidden: { scale: 1 },
    hover: {
      scale: 1.08,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  // Removed hero/CTA-related state and strings

  return (
    <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 relative z-10">
        {/* Removed top content to start directly from the benefits heading */}

        {/* Heading before benefits */}
        <motion.div
          className="mt-0 md:mt-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white leading-tight">
            What you'll get just after getting enroll to
            <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400">
              Creditor Academy
            </span>
          </h3>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="relative flex flex-col justify-between bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden p-6 transition-all duration-300 h-full"
            >
              {/* Decorative Gradient Blob */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-200/20 dark:bg-blue-700/30 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-60" />

              {/* Image */}
              <motion.div
                className="relative h-52 overflow-hidden -ml-6 w-[calc(100%+3rem)] -mt-6 mb-6 rounded-t-2xl"
                variants={imageVariants}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20 transition-colors duration-500" />
              </motion.div>

              {/* Text */}
              <div className="flex flex-col gap-3 flex-grow">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}