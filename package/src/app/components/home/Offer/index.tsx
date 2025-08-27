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
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Start your Passive Income now",
      description:
        "A 3-phase journey from building trust, to optimizing Tier 1 business credit, and unlocking private merchant processing.",
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Expert Mentorship",
      description:
        "Receive one-on-one and group mentorship from experts who’ve handled thousands of real cases.",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Community Support",
      description:
        "Join a private, supportive community for feedback, accountability, and real-world tips.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.45 },
    }),
  };

  const underlineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 110, damping: 16 },
    },
    hover: {
      scale: 1.03,
      y: -6,
      transition: { type: "spring", stiffness: 200, damping: 18 },
    },
  };

  const title = "Join Creditor Academy";
  const subtitle =
    "Unlock expert-led courses, real mentorship, and an active community — everything you need to rebuild and protect your financial future.";

  const titleWords = title.split(" ");

  return (
    <section className="relative overflow-hidden py-20 md:py-36 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Decorative shapes */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-32 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-indigo-400 to-blue-400 opacity-12"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sectionVariants}
          className="flex flex-col items-center gap-6 md:gap-8 text-center max-w-4xl mx-auto"
        >
          {/* Badge + Title row */}
          <motion.div
            variants={headerVariants}
            className="flex flex-col items-center gap-4"
          >
            <motion.span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 border border-yellow-200"
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path d="M10 2a1 1 0 01.894.553L12.382 5H15a1 1 0 01.832 1.555l-1.68 2.52.447 3.07a1 1 0 01-.29.882L12.5 14.5 10 16l-2.5-1.5-1.279-.913a1 1 0 01-.29-.882l.447-3.07L4.879 6.555A1 1 0 015.71 5H8.618l1.488-2.447A1 1 0 0110 2z" />
              </svg>
              <span>Free enrollment • Limited seats</span>
            </motion.span>

            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              <span className="block">
                {titleWords.map((w, i) => (
                  <motion.span
                    key={w + i}
                    custom={i}
                    variants={wordVariants}
                    className="inline-block mr-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>

              <motion.span
                className="block mt-2 text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                Enroll free today and start your transformation.
              </motion.span>

              <motion.span className="block mt-4 h-1 overflow-hidden">
                <motion.span
                  className="block h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400 origin-left"
                  variants={underlineVariants}
                  initial="hidden"
                  animate="visible"
                />
              </motion.span>
            </h2>

            {/* Subtitle */}
            <motion.p
              variants={headerVariants}
              className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light"
            >
              {subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="/signup"
                className="mt-4 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Enroll free"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                Enroll free
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Heading before benefits */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
            What you'll get just after signing up to{" "}
            <span className="bg-clip-text text-transparent bg-blue-500">
                Creditor Academy
            </span>
          </h3>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              whileHover="hover"
              className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 sm:p-6 flex flex-col gap-4 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative w-full h-40 sm:h-48 overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl" />
              </div>

              <h3 className="font-semibold text-lg sm:text-xl text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-300 leading-relaxed">
                {item.description}
              </p>

              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center ml-auto mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
