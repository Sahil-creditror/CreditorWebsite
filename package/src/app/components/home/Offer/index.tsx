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
      image: "/images/offers/roadmap.webp",
    },
    {
      title: "Start your Passive Income now",
      description:
        "A 3-phase journey from building trust, to optimizing Tier 1 business credit, and unlocking private merchant processing.",
      image: "/images/offers/launch.webp",
    },
    {
      title: "Expert Mentorship",
      description:
        "Receive one-on-one and group mentorship from experts who've handled thousands of real cases.",
      image: "/images/offers/mentor.webp",
    },
    {
      title: "Community Support",
      description:
        "Join a private, supportive community for feedback, accountability, and real-world tips.",
      image: "/images/offers/merchant.webp",
    },
  ];

  // Animation variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.06,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const underlineVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 },
    },
  };

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

  const title = "Join Creditor Academy";
  const subtitle =
    "Unlock expert-led courses, real mentorship, and an active community — everything you need to rebuild and protect your financial future.";
  const titleWords = title.split(" ");
  const eventImages = [
    "Get your account.webp",
    "Refer and earn.webp",
    "unlock premium.webp",
  ];
  const [currentEventIndex, setCurrentEventIndex] = React.useState(0);
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % eventImages.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [eventImages.length]);

  return (
    <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Background Elements */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-32 w-96 h-96 rounded-full blur-3xl bg-gradient-to-br from-indigo-400 to-blue-400 opacity-12"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-32 w-80 h-80 rounded-full blur-3xl bg-gradient-to-br from-purple-400 to-pink-400 opacity-10"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
      />

      

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col xl:flex-row items-start gap-8 px-4 mb-12">
          {/* Left Badge */}
          <div className="flex items-center py-3 gap-4 md:gap-8 w-full max-w-xl">
            <motion.span
              className="bg-primary py-1.5 px-2.5 text-base font-medium rounded-full dark:text-secondary"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              04
            </motion.span>
            <motion.div
              className="h-px w-16 bg-black/12 dark:bg-white/12"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <motion.p
              className="section-bedge py-1.5 px-4 rounded-full border border-black/10 dark:border-white/10"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Offers
            </motion.p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="flex flex-col xl:flex-row items-start gap-8 md:gap-10 max-w-6xl mx-auto"
        >
          {/* Left: Auto sliding single banner card */}
<div className="w-full xl:w-1/2 flex flex-col items-center">
  <motion.div
    key={currentEventIndex}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700"
    style={{ width: 500, minHeight: 180 }}
  >
    <div className="w-full h-full flex items-center justify-center p-4">
      <Image
        src={`/images/event/${eventImages[currentEventIndex]}`}
        alt={`Event ${currentEventIndex + 1}`}
        width={460}
        height={160}
        className="object-contain"
        sizes="(max-width: 1280px) 100vw, 50vw"
        priority
      />
    </div>
  </motion.div>
  {/* Dots below image */}
  <div className="flex items-center justify-center gap-2 mt-4">
    {eventImages.map((_, i) => (
      <button
        key={i}
        aria-label={`Go to slide ${i + 1}`}
        onClick={() => setCurrentEventIndex(i)}
        className={`h-2.5 rounded-full transition-all duration-300 ${
          i === currentEventIndex ? "w-6 bg-blue-600" : "w-2.5 bg-slate-300 dark:bg-slate-600"
        }`}
      />
    ))}
  </div>
</div>


         {/* Right: Badge, Heading, Subtitle, CTA */}
<div className="w-full xl:w-1/2 text-center mt-10">
  <motion.div variants={headerVariants} className="flex flex-col items-center gap-4">
    <motion.span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm md:text-base font-medium bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 border border-yellow-200"
      initial={{ y: -6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 md:h-6 md:w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden
      >
        <path d="M10 2a1 1 0 01.894.553L12.382 5H15a1 1 0 01.832 1.555l-1.68 2.52.447 3.07a1 1 0 01-.29.882L12.5 14.5 10 16l-2.5-1.5-1.279-.913a1 1 0 01-.29-.882l.447-3.07L4.879 6.555A1 1 0 015.71 5H8.618l1.488-2.447A1 1 0 0110 2z" />
      </svg>
      <span>Enroll to Creditor Academy</span>
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
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Enroll to Creditor Academy today and start your transformation.
      </motion.span>
      <motion.span className="block mt-4 h-1 overflow-hidden">
        <motion.span
          className="block h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400 origin-left"
          variants={underlineVariants}
        />
      </motion.span>
    </h2>

    {/* Subtitle */}
    <motion.p
      variants={headerVariants}
      className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light mt-2"
    >
      {subtitle}
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="mt-6"
    >
      <motion.a
        href="https://lmsathena.com/login"
        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-colors duration-300"
        aria-label="Enroll free"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        Enroll Today
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
</div>
        </motion.div>

        {/* Heading before benefits */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
            What you'll get just after getting enroll to{" "}
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