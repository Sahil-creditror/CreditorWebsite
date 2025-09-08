"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { FiCheck, FiStar } from "react-icons/fi";

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
    short: "Access to Masterclass",
    badge: "Popular",
    features: [
      "Unlimited access to live masterclasses",
      "Community & office hours",
      "Workbooks and templates",
      "Certificate of completion",
    ],
    cta: "Join Masterclass",
    featured: false,
  },
  {
    id: "bundle",
    name: "Course Bundle",
    price: "$500",
    cadence: "one-time",
    short: "15 modules · Recorded lessons",
    badge: "Best value",
    features: [
      "15 recorded modules (lifetime access)",
      "Downloadable resources & transcripts",
      "Project files and templates",
      "1:1 review session (first 30 days)",
    ],
    cta: "Buy Bundle",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$2,800",
    cadence: "Full access",
    short: "Team & priority support",
    badge: "Enterprise",
    features: [
      "Unlimited seats & team onboarding",
      "Dedicated account manager",
      "SLA & priority support",
      "Custom integrations & reporting",
    ],
    cta: "Purchase Now",
    featured: false,
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

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eef5ff] to-[#f8fbff] dark:from-[#0b1220] dark:to-[#0e1a2b] text-slate-900 dark:text-white py-16">
      {/* subtle background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-4xl font-extrabold tracking-tight">Pricing & Plans</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Choose a simple plan — monthly membership, one-time bundle, or enterprise access for teams.
          </p>
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

        <motion.div
          className="grid gap-8 md:grid-cols-3 items-stretch"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariant}
              whileHover={{ y: -4 }}
              className={`relative rounded-2xl border p-8 flex flex-col justify-between overflow-hidden transition-shadow duration-300 ease-out
                ${plan.featured ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white border-blue-600 shadow-lg" : "bg-white/90 backdrop-blur dark:bg-[#0f1b2d]/80 border-slate-200 dark:border-[#1e3352]"}`}
            >
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
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-2xl font-semibold ${plan.featured ? "text-white" : "text-slate-900 dark:text-white"}`}>{plan.name}</h3>
                    <p className={`text-sm mt-1 ${plan.featured ? "text-blue-100/90" : "text-slate-500 dark:text-slate-300"}`}>{plan.short}</p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {plan.id === "masterclass" ? (
                        <>
                          <span className={`text-3xl font-extrabold ${plan.featured ? "text-white" : "text-blue-700 dark:text-blue-400"}`}>
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
                              isYearly ? (plan as any).priceYearly : (plan as any).priceMonthly
                            )}
                          </span>
                          <span className={`text-sm ${plan.featured ? "text-blue-100/90" : "text-slate-500 dark:text-slate-400"}`}>
                            {isYearly ? (plan as any).cadenceYearly : (plan as any).cadenceMonthly}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className={`text-3xl font-extrabold ${plan.featured ? "text-white" : "text-blue-700 dark:text-blue-400"}`}>{(plan as any).price}</span>
                          <span className={`text-sm ${plan.featured ? "text-blue-100/90" : "text-slate-500 dark:text-slate-400"}`}>{(plan as any).cadence}</span>
                        </>
                      )}
                    </div>
                    {plan.badge && (
                      <span className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${plan.featured ? "bg-white/12 text-white" : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"}`}>
                        <FiStar className={`${plan.featured ? "text-white" : "text-blue-600 dark:text-blue-400"}`} /> {plan.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`${plan.featured ? "text-blue-200" : "text-blue-600 dark:text-blue-400 mt-1"}`}>
                          <FiCheck />
                        </span>
                        <span className={`${plan.featured ? "text-blue-50" : "text-slate-700 dark:text-slate-300 text-sm"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <motion.a
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  href={
                    plan.id === "masterclass"
                      ? "/tncmasterclass"
                      : plan.id === "bundle"
                      ? "/course-tnc"
                      : plan.id === "enterprise"
                      ? "/enterprise-tnc"
                      : "#"
                  }
                  className={`relative w-full inline-flex items-center justify-center py-3 rounded-full font-medium shadow-md transition-transform duration-200 overflow-hidden
                    ${plan.featured ? "bg-white text-blue-600" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                >
                  <span className="relative z-[1]">{plan.cta}</span>
                  <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-white/0 via-white/30 to-white/0" />
                </motion.a>

                <p className={`mt-4 text-xs ${plan.featured ? "text-blue-100/90" : "text-slate-500 dark:text-slate-400"}`}>
                  {plan.id === "enterprise"
                    ? "Custom contracts, billing and onboarding."
                    : plan.id === "bundle"
                    ? "One-time purchase — lifetime access to recorded lessons."
                    : isYearly
                    ? "Billed annually. Cancel anytime before renewal."
                    : "Cancel anytime. Access renews monthly."}
                </p>
              </div>

              {/* Decorative absolute */}
              <div className="pointer-events-none absolute -right-10 -top-10 opacity-10">
                <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
