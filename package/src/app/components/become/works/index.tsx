"use client";

import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { FiCheck, FiStar, FiUsers, FiBookOpen, FiGift, FiCreditCard, FiMessageCircle, FiBook, FiPercent, FiCalendar, FiFileText, FiAward, FiHeadphones, FiShield, FiSettings, FiTrendingUp, FiAlertTriangle } from "react-icons/fi";

const plans = [
  {
    id: "masterclass",
    name: "Masterclass Membership",
    price: "$69",
    cadence: "/month",
    // added for toggle
    priceMonthly: 69,
    priceYearly: Math.round(69 * 12 * 0.8), // 20% off yearly
    cadenceMonthly: "/month",
    cadenceYearly: "/year",
    short: "Start Your Journey into the Private - Gain the tools, mentorship, and community to start operating privately today.",
    badge: "Limited-Time",
    features: [
      { text: "Live Classes, Monday–Friday", icon: FiCalendar },
      { text: "Step-by-Step Private Plan", icon: FiFileText },
      { text: "Connect with a Like-Minded Community", icon: FiUsers },
      { text: "Access to Intro Lessons Across All Premium Courses", icon: FiBookOpen },
      { text: "Pay-As-You-Go Flexibility", icon: FiCreditCard },
      { text: "Private Community Groups", icon: FiMessageCircle },
      { text: "Starter Library", icon: FiBook },
      { text: "Member Discounts", icon: FiPercent },
    ],
    cta: "Join Masterclass",
    featured: false,
  },
];

type Step = {
  id: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Become a Member",
    description:
      "Start Your Journey – Get everything you need to transition into the private. Gain step-by-step guidance, mentorship, and an empowering community to begin living and operating privately.",
  },
  {
    id: 2,
    title: "Charge Card",
    description:
      "Load your \"Creditor Card\" right inside the platform. Use it to unlock courses, workshops, and tools across our campus! Each lesson has its own credit value so you can choose your path at your own pace.",
  },
  {
    id: 3,
    title: "Become Private",
    description:
      "Redeem credits to uncover how the shift from freedom to control happened — and what steps you can take to reclaim your independence. Learn the strategies to move your life and business into the private realm, one course at a time.",
  },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.42, ease: "easeOut" } },
  hover: { scale: 1.02, y: -4, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  // Simple auto-advancing slider (3 images, 3s interval)
  const sliderImages = [
    "/images/plan/credit1.webp",
    "/images/plan/credit2.webp",
    "/images/plan/credit3.webp",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [sliderImages.length]);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eef5ff] to-[#f8fbff] dark:from-[#0b1220] dark:to-[#0e1a2b] text-slate-900 dark:text-white py-16">
      {/* subtle background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
      <div className="relative container mx-auto px-6">
        <div className="relative mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-1 text-s text-slate-700 dark:text-slate-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                Membership & Programs
              </div>
              <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight text-black dark:text-white" style={{ fontWeight: 900 }}>
                Invest In Becoming Private
              </h2>
              <p className="mt-3 text-slate-700 dark:text-slate-300 max-w-2xl">
                Choose the plan that fits your goals. Start with Masterclass membership and scale into premium catalogs at your own pace.
              </p>
            </div>
            <div className="w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-blue-500/20 via-cyan-400/20 to-blue-500/20 blur-xl" aria-hidden />
                <motion.div
                  key={sliderImages[currentSlide]}
                  initial={{ opacity: 0.2, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative h-[320px] overflow-hidden"
                >
                  <Image
                    src={sliderImages[currentSlide]}
                    alt="Membership highlights"
                    width={560}
                    height={320}
                    className="relative rounded-xl ring-1 ring-slate-200/70 dark:ring-white/10 shadow-lg object-cover w-full h-full"
                    priority
                  />
                </motion.div>
                <div className="mt-3 flex justify-center gap-2">
                  {sliderImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${idx === currentSlide ? "bg-blue-600 dark:bg-blue-400" : "bg-slate-300 dark:bg-white/20"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-slate-300/70 dark:via-white/10 to-transparent" />
        </div>

        {/* Billing toggle
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex items-center rounded-full bg-white/70 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-1 backdrop-blur supports-[backdrop-filter]:bg-white/30">
            <button
              onClick={() => setIsYearly(false)}
              className={`relative z-[1] px-4 py-2 text-sm rounded-full transition-colors ${
                !isYearly ? "text-blue-700 dark:text-blue-300" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`relative z-[1] px-4 py-2 text-sm rounded-full transition-colors ${
                isYearly ? "text-blue-700 dark:text-blue-300" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Yearly
            </button>
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`absolute inset-y-1 w-1/2 rounded-full shadow-sm ${
                isYearly ? "left-1/2" : "left-1"
              } bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-500`}
            />
          </div>
          {isYearly && (
            <span className="ml-3 inline-flex items-center rounded-full bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20 px-2.5 py-1 text-xs">
              Save 20%
            </span>
          )}
        </div> */}

        <div className="grid gap-12 grid-cols-1 lg:grid-cols-3 items-stretch">
          {/* LEFT - Pricing Card */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={cardVariant}
                whileHover={{ y: -4 }}
                className={`relative h-full rounded-2xl border p-8 flex flex-col justify-between overflow-hidden transition-shadow duration-300 ease-out
                  ${plan.featured ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white border-blue-600 shadow-lg" : "bg-white/90 backdrop-blur dark:bg-[#0f1b2d]/80 border-slate-200 dark:border-[#1e3352]"}`}
              >
                {/* Background Image removed as requested */}
                {/* Top gradient bar */}
                <div className={`absolute inset-x-0 top-0 h-1 ${plan.featured ? "bg-gradient-to-r from-cyan-300/70 via-white/70 to-cyan-300/70" : "bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20"}`} />

                {/* Featured ribbon */}
                {plan.featured && (
                  <div className="pointer-events-none absolute -right-12 top-6 rotate-45">
                    <div className="bg-white/20 dark:bg-white/10 text-white text-[10px] tracking-wide px-10 py-1.5 shadow-sm border border-white/20">
                      Best value
                    </div>
                  </div>
                )}
                {/* Top */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-2xl font-black ${plan.featured ? "text-white" : "text-slate-900 dark:text-white"}`}>{plan.name}</h3>
                      <p className={`text-sm mt-1 ${plan.featured ? "text-blue-100/90" : "text-black dark:text-white"}`}>{plan.short}</p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        {plan.id === "masterclass" ? (
                          <>
                            <div className="flex flex-col items-end">
                              <div className="flex items-center gap-2">
                                <span className={`text-lg font-bold line-through ${plan.featured ? "text-white/60" : "text-slate-400 dark:text-slate-500"}`}>
                                  $147
                                </span>
                                <span className={`text-3xl font-extrabold ${plan.featured ? "text-white" : "text-blue-700 dark:text-blue-400"}`}>
                                  $69
                                </span>
                              </div>
                              <span className={`text-sm ${plan.featured ? "text-blue-100/90" : "text-black dark:text-white"}`}>
                                /month
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className={`text-3xl font-extrabold ${plan.featured ? "text-white" : "text-blue-700 dark:text-blue-400"}`}>{(plan as any).price}</span>
                            <span className={`text-sm ${plan.featured ? "text-blue-100/90" : "text-black dark:text-white"}`}>{(plan as any).cadence}</span>
                          </>
                        )}
                      </div>
                      {plan.badge && (
                        <span className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs whitespace-nowrap ${plan.featured ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"}`}>
                          <FiStar className={`text-green-600 dark:text-green-400 w-4 h-4 flex-shrink-0`} /> {plan.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                          <li key={index} className="flex items-start gap-3">
                            <span className={`${plan.featured ? "text-blue-200" : "text-blue-600 dark:text-blue-400"} flex-shrink-0 mt-0.5`}>
                              <IconComponent className="w-4 h-4" />
                            </span>
                            <span className={`${plan.featured ? "text-blue-50" : "text-black dark:text-white text-sm"} leading-relaxed`}>{feature.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* CTA moved below near footer */}

                {/* Decorative curves and shapes */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  {/* Main curved circle */}
                  <div className="absolute -right-10 -top-10 opacity-10">
                    <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3" />
                    </svg>
                  </div>
                  
                  {/* Additional curved elements */}
                  <div className="absolute -left-8 -bottom-8 opacity-5">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 20 Q50 5 80 20 Q95 50 80 80 Q50 95 20 80 Q5 50 20 20" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  
                  {/* Small curved accent */}
                  <div className="absolute top-4 right-4 opacity-8">
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 10 Q30 5 50 10 Q70 15 90 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  
                  {/* Bottom curve accent */}
                  <div className="absolute bottom-4 left-4 opacity-6">
                    <svg width="60" height="30" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 25 Q25 10 50 25 Q75 40 100 25" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                  
                  {/* Gradient overlay for depth */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-${plan.featured ? 'white/5' : 'blue-500/5'} dark:to-${plan.featured ? 'white/5' : 'blue-400/5'}`} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT - How It Works Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={containerVariants}
            className="lg:col-span-2 w-full"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-blue-900 dark:text-blue-100 mb-6"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              How It Works
            </motion.h2>

            <div className="relative rounded-2xl border border-slate-200 dark:border-[#1e3352] bg-white/70 dark:bg-[#0f1b2d]/60 p-6 md:p-8">
              {/* vertical line */}
              <div className="absolute md:left-[60px] top-10 bottom-10 w-[2px] bg-blue-300 dark:bg-blue-600 opacity-70 hidden md:block" />

              <motion.ul className="space-y-8" variants={containerVariants}>
                {steps.map((s) => (
                  <motion.li
                    key={s.id}
                    className="group relative md:flex md:items-start md:gap-6"
                    variants={itemVariants}
                  >
                    {/* circle */}
                    <div className="flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg bg-blue-600 dark:bg-blue-500"
                      >
                        <span className="text-lg md:text-xl">{s.id}</span>
                      </motion.div>
                    </div>

                    {/* content */}
                    <div className="mt-2 md:mt-0">
                      <motion.h3
                        className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
                        variants={itemVariants}
                      >
                        {s.title}
                      </motion.h3>

                      <motion.p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed" variants={itemVariants}>
                        {s.description}
                      </motion.p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* CTA row removed as requested */}
          </motion.div>
        </div>

        {/* Moved Join Masterclass CTA and Disclaimer */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <a
            className="relative w-full max-w-xl inline-flex items-center justify-center px-10 py-3.5 md:px-14 md:py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-lg md:text-xl shadow-lg ring-1 ring-white/10 dark:ring-black/10 transition-transform duration-200"
            href="/tncmasterclass"
          >
            Join Masterclass
          </a>
          <div className="text-xs text-slate-600 dark:text-slate-300 max-w-3xl text-center">
            <span className="inline-flex items-center justify-center gap-2">
              <FiAlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span className="leading-relaxed">
                WARNING: The price will increase to $147/month soon. Join now to lock in your $69/month rate forever — and cancel anytime.
              </span>
            </span>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          <span>Have questions? </span>
          <a href="/contact" className="text-blue-600 dark:text-blue-400 underline">
            Contact sales
          </a>
          <span className="mx-2">·</span>
          <span>Secure checkout &amp; multiple payment options.</span>
        </div>
      </div>
    </section>
  );
}
