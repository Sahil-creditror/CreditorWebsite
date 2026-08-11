"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

type Benefit = {
  title: string;
  description: string;
  image: string;
};

const cardVariants: Variants = {
  hidden: (i: number) => ({ opacity: 0, y: 30, scale: 0.99 }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, type: "spring", stiffness: 110, damping: 18 },
  }),
};

function BenefitCard({ item, index }: { item: Benefit; index: number }) {
  const { ref: cardRef, inView: isInView } = useInView({
    triggerOnce: true,
    rootMargin: "-80px",
  });

  return (
    <motion.article
      ref={cardRef}
      className="relative bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      layout
    >
      <div className="relative w-full h-44 sm:h-52 lg:h-44">
        <Image
          src={item.image}
          alt={item.title}
          fill
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-2">
          {item.title}
        </h3>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
          {item.description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-blue-600 opacity-80" />
    </motion.article>
  );
}

export default function MasterclassBenefits() {
  const benefits = [
    {
      title: "Pay-As-You-Go Learning",
      description:
        "Access every course in our library at a member-only rate — only pay for what you need, when you need it.",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/f_auto,q_auto,w_600/v1768883414/creditor-website-assets/images/courses/become/learning.webp",
    },
    {
      title: "Introductory Access",
      description:
        "Try the first module of premium courses for free so you can decide before committing.",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/f_auto,q_auto,w_600/v1768883385/creditor-website-assets/images/courses/become/access.webp",
    },
    {
      title: "Private Community Groups",
      description:
        "Connect with entrepreneurs and pros, get fast answers, and share wins in exclusive groups.",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/f_auto,q_auto,w_600/v1768883403/creditor-website-assets/images/courses/become/group.webp",
    },
    {
      title: "Live Weekly Trainings",
      description:
        "Attend live sessions with instructors — ask questions, get critiques, and stay ahead.",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/f_auto,q_auto,w_600/v1768883452/creditor-website-assets/images/courses/become/trainingnew.webp",
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

  const title = "What You Get";
  const words = title.split(" ");
  const subtitle = "Everything you need to level up fast: community, live coaching, and preview access.";

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-24 md:py-20">
      {/* Decorative blurred shapes */}
      <div className="pointer-events-none absolute -left-24 -top-24 w-96 h-112 rounded-full bg-linear-to-tr from-blue-400 to-indigo-600 opacity-12 blur-3xl" />
      <div className="pointer-events-none absolute right-8 -bottom-28 w-80 h-96 rounded-full bg-linear-to-br from-cyan-300 to-blue-400 opacity-10 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.header
          className="max-w-4xl mx-auto text-center mb-10 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
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

          {/* <motion.div className="mt-6 flex items-center justify-center" variants={sectionVariants}>
            <motion.a
              href="https://lmsathena.com/signup"
              className="inline-flex items-center gap-3 rounded-full px-8 py-4 md:px-12 md:py-5 bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg md:text-xl"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Join Masterclass"
            >
              Join — $69 / month
            </motion.a>
          </motion.div> */}
        </motion.header>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((item, index) => (
            <BenefitCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Sub-footer / note */}
        <motion.div
          className="mt-10 max-w-3xl mx-auto text-center text-sm text-slate-700 dark:text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-700 dark:text-white">
            Join today to get exclusive previews, live coaching, and entry to member-only community groups — cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
