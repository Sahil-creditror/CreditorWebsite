"use client";

import React, { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";

function MasterclassBenefits() {
  const benefits = [
    {
      title: "Free access to Starter Courses",
      description:
        "Get free access to starter courses designed by experts to help you understand the private life.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Access to Premium Courses",
      description:
        "Get exclusive access to premium courses at minimal fee designed by industry leaders to help you to become private.",
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Expert Mentorship",
      description:
        "Learn directly from top experts who provide guidance and insights throughout your learning journey.",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Community Support",
      description:
        "Join an exclusive community of learners to collaborate, share ideas, and grow together.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Container variants for section text
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // Card variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { type: "spring", stiffness: 150, damping: 20 },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 } },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8, ease: "easeOut" } },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const title = "What You'll Get with the Masterclass Membership";
  const words = title.split(" ");

  const subtitle =
    "By opting for the masterclass, you'll gain exclusive access to multiple courses, mentorship, community support, and continuous updates — all designed to accelerate your growth.";

  return (
    <section className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-20 md:py-36 relative overflow-hidden">
      {/* Decorative background shapes */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-400 to-blue-600 opacity-20 rounded-full blur-3xl z-0"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 20 }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-blue-300 to-blue-500 opacity-20 rounded-full blur-3xl z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 0.95 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 18 }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-200 to-blue-400 opacity-15 rounded-full blur-3xl z-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 22 }}
      />

      <div className="container mx-auto px-4 relative z-10 flex flex-col gap-16 md:gap-24">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariants}
          className="flex flex-col items-center gap-6 md:gap-8 text-center"
        >
          <motion.h2 variants={titleVariants} className="text-3xl md:text-5xl font-bold text-blue-500 dark:text-blue-400 leading-tight">
            {words.map((word, i) => (
              <motion.span key={i} className="inline-block mr-2">
                {word.split("").map((letter, j) => (
                  <motion.span key={j} variants={letterVariants} transition={{ delay: i * 0.05 + j * 0.03 }} className="inline-block">
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            variants={subtitleVariants}
            className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-light"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((item, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const isInView = useInView(cardRef, { once: false, margin: "-100px" });

            return (
              <motion.div
                ref={cardRef}
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 sm:p-6 flex flex-col gap-4 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl relative overflow-hidden group"
              >
                {/* Decorative hover bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image */}
                <motion.div
                  className="relative w-full h-40 sm:h-48 overflow-hidden rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl" />
                </motion.div>

                {/* Text */}
                <motion.h3
                  variants={textVariants}
                  className="font-semibold text-lg sm:text-xl text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  variants={textVariants}
                  className="text-sm sm:text-base text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-300 leading-relaxed"
                >
                  {item.description}
                </motion.p>

                {/* Hover indicator */}
                <motion.div
                  className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center ml-auto mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  whileHover={{ rotate: 90 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MasterclassBenefits;
