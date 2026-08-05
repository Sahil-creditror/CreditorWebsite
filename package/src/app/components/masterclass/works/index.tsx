"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiStar,
  FiUsers,
  FiBookOpen,
  FiCreditCard,
  FiMessageCircle,
  FiBook,
  FiPercent,
  FiCalendar,
  FiFileText,
  FiAlertTriangle,
  FiArrowRight,
  FiClock,
  FiShield,
  FiCheck,
} from "react-icons/fi";

const plan = {
  id: "masterclass",
  name: "Masterclass Membership",
  priceCurrent: 69,
  priceOriginal: 147,
  short:
    "Gain the exact tools, mentorship, and sovereign community required to live and operate completely in the private side starting today.",
  badge: "Limited locked-in rate",
  features: [
    { text: "Live Classes, Monday–Friday", icon: FiCalendar },
    { text: "Step-by-Step Private Plan", icon: FiFileText },
    { text: "Connect with a Like-Minded Community", icon: FiUsers },
    { text: "Intro Lessons Across All Premium Courses", icon: FiBookOpen },
    { text: "Pay-As-You-Go Flexibility", icon: FiCreditCard },
    { text: "Private Community Groups", icon: FiMessageCircle },
    { text: "Starter Resource Library", icon: FiBook },
    { text: "Exclusive Member Discounts", icon: FiPercent },
  ],
};

const steps = [
  {
    num: "01",
    title: "Access & Footing",
    description:
      "Get everything you need to transition into the private side with step-by-step guidance and early-stage mentorship.",
  },
  {
    num: "02",
    title: "Fuel Capitalization",
    description:
      "Load your custom Creditor Card in the hub to unlock tailored courses, workshops, and legal tools on-demand.",
  },
  {
    num: "03",
    title: "Sovereign Operations",
    description:
      "Follow our master educational roadmap to ultimate functional sovereignty, asset protection, and real wealth management.",
  },
];

export default function PricingRedesign() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-slate-50 via-sky-50/40 to-blue-50/20 py-16 md:py-24 text-slate-900">
      {/* Soft Background Accent Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <motion.header
          className="mx-auto max-w-2xl text-center mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-3">
            Simple Pricing
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Invest in Sovereignty.
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed">
            Unlock your entry path into the Masterclass ecosystem. Gain access to the operational roadmap, premium tools, and community resources.
          </p>
        </motion.header>

        {/* 3-Step Process Pipeline */}
        <motion.div 
          className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-md transition-all hover:border-blue-300 hover:bg-white/90"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {step.num}
                </span>
                <h3 className="font-bold text-slate-800 text-sm">{step.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Main Monolith Pricing Card */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-xl shadow-slate-200/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Top accent bar */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-blue-500 via-cyan-400 to-indigo-500" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Plan Information */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-2xl font-black text-slate-900 sm:text-3xl">
                  {plan.name}
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 border border-blue-100">
                  <FiStar className="h-3 w-3 fill-current" /> {plan.badge}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {plan.short}
              </p>

              <div className="my-6 h-px w-full bg-slate-100" />

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                What&apos;s included in your profile:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plan.features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Checkout Box */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 lg:col-span-5 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 line-through">
                Standard ${plan.priceOriginal}/mo
              </span>

              <div className="mt-1 flex items-baseline justify-center lg:justify-start gap-1">
                <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                  ${plan.priceCurrent}
                </span>
                <span className="text-sm font-semibold text-slate-500">/ month</span>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Lock this rate indefinitely. Cancel anytime.
              </p>

              <div className="mt-6 space-y-3">
                <motion.a
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 p-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
                  href="https://lmsathena.com/signup"
                >
                  Get Started Instantly
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </motion.a>

                <div className="flex items-center justify-center gap-3 text-[11px] font-medium text-slate-400">
                  <span className="flex items-center gap-1"><FiShield className="h-3 w-3" /> PCI-DSS Secure</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FiClock className="h-3 w-3" /> Instant Entry</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Rate Notice Alert */}
        <div className="mt-6 rounded-2xl border border-amber-200/60 bg-amber-50/60 p-4 text-xs leading-relaxed text-amber-900">
          <div className="flex items-start gap-2.5">
            <FiAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <span>
              <strong>Notice:</strong> This promotional entry rate transitions to the standard <strong>$147/mo</strong> rate shortly. Locking your membership now guarantees authorization at <strong>$69/mo indefinitely</strong>.
            </span>
          </div>
        </div>

        {/* Footer Support */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <a href="/contact" className="hover:text-blue-600 hover:underline">
            Contact Support
          </a>
          <span className="mx-2">•</span>
          <span>Encrypted 256-Bit SSL Checkout Security</span>
        </div>

      </div>
    </section>
  );
}