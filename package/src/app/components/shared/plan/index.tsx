"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { FiStar, FiAlertTriangle } from "react-icons/fi";

const plans = [
  {
    id: "masterclass",
    name: "Become a Member",
    // price: "$69",
    // cadence: "/month",
    // added for toggle
    //priceMonthly: 69,
    // priceYearly: Math.round(69 * 12 * 0.8), // 20% off yearly
    // cadenceMonthly: "/month",
    // cadenceYearly: "/year",
    short: "Start Your Journey into the Private - Gain the tools, mentorship, and community to start operating privately today.",
    badge: "Limited-Time",
    cta: "Join Masterclass",
    featured: false,
    backgroundImage: "/images/plan/membership.webp",
  },
  {
    id: "bundle",
    name: "Charge Your Card",
    //price: "$500",
    //cadence: "monthly",
    short: "Get credits worth $500",
    badge: "Best value",
    cta: "Get Now",
    featured: true,
    backgroundImage: "/images/plan/become-member.webp",
  },
  {
    id: "enterprise",
    name: "Become Private, Operate Private, Business Credit",
    //price: "$2,800",
    //cadence: "Full access",
    short: "Access to all premium courses",
    badge: "Full access",
    cta: "Purchase Now",
    featured: false,
    backgroundImage: "/images/plan/new.webp",
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
          <h2 className="text-4xl font-black tracking-tight text-black dark:text-white" style={{ fontWeight: 900 }}>Pricing & Plans</h2>
          <p className="mt-3 text-black dark:text-slate-300">
            Choose the Creditors Academy plan that fits your goals — monthly membership for ongoing learning, a one-time course bundle for complete self-study, or enterprise access for teams and agencies.
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
          className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 items-stretch"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ gridTemplateRows: '1fr auto' }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariant}
              whileHover={{ y: -4 }}
              className={`relative rounded-2xl border p-8 grid grid-rows-[1fr_auto] gap-8 overflow-hidden transition-shadow duration-300 ease-out
                ${plan.featured ? "text-white border-blue-600 shadow-lg" : "bg-white/90 backdrop-blur dark:bg-[#0f1b2d]/80 border-slate-200 dark:border-[#1e3352]"}`}
              style={{
                backgroundImage: `url(${plan.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Background overlay for text readability */}
              <div className={`absolute inset-0 ${plan.featured ? "bg-black/20" : plan.id === "masterclass" || plan.id === "enterprise" ? "bg-black/40" : "bg-white/80 dark:bg-[#0f1b2d]/80"}`} />
              
              {/* Top gradient bar */}
              <div className={`absolute inset-x-0 top-0 h-1 z-10 ${plan.featured ? "bg-gradient-to-r from-cyan-300/70 via-white/70 to-cyan-300/70" : "bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20"}`} />

              {/* Top */}
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-2xl font-black ${plan.featured ? "text-white" : plan.id === "masterclass" || plan.id === "enterprise" ? "text-white" : "text-slate-900 dark:text-white"}`}>{plan.name}</h3>
                    <p className={`text-sm mt-1 ${plan.featured ? "text-blue-100/90" : plan.id === "masterclass" || plan.id === "enterprise" ? "text-white" : "text-black dark:text-white"}`}>{plan.short}</p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {plan.id === "masterclass" ? (
                        <>
                          <div className="flex flex-col items-end">
                            {/*<div className="flex items-center gap-2">
                              <span className={`text-lg font-bold line-through ${plan.featured ? "text-white/60" : plan.id === "masterclass" ? "text-white/60" : "text-slate-400 dark:text-slate-500"}`}>
                                $147
                              </span>
                              <span className={`text-3xl font-extrabold ${plan.featured ? "text-white" : plan.id === "masterclass" ? "text-white" : "text-blue-700 dark:text-blue-400"}`}>
                                $69
                              </span>
                            </div>*/}
                            {/* <span className={`text-sm ${plan.featured ? "text-blue-100/90" : plan.id === "masterclass" ? "text-white" : "text-black dark:text-white"}`}>
                              Monthly
                            </span> */}
                          </div>
                        </>
                      ) : (
                        <>
                          <span className={`text-3xl font-extrabold ${plan.featured ? "text-white" : plan.id === "enterprise" ? "text-white" : "text-blue-700 dark:text-blue-400"}`}>{(plan as any).price}</span>
                          <span className={`text-sm ${plan.featured ? "text-blue-100/90" : plan.id === "enterprise" ? "text-white" : "text-black dark:text-white"}`}>{(plan as any).cadence}</span>
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

              </div>

              {/* CTA */}
              <div className="relative z-10">
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
                    ${plan.featured ? "bg-white text-blue-600" : plan.id === "enterprise" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                >
                  <span className="relative z-[1]">{plan.cta}</span>
                  <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-white/0 via-white/30 to-white/0" />
                </motion.a>

                {/* <p className={`mt-4 text-xs ${plan.featured ? "text-blue-100/90" : plan.id === "masterclass" || plan.id === "enterprise" ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
                  {plan.id === "enterprise"
                    ? "Custom contracts, billing and onboarding for teams."
                    : plan.id === "bundle"
                    ? "One-time purchase — lifetime access to Creditors Academy recorded lessons."
                    : plan.id === "masterclass"
                    ? (
                        <span className="flex items-center gap-2">
                          <FiAlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                          <span>WARNING: The price will increase to $147/month soon. Join now to lock in your $69/month rate forever — and cancel anytime.</span>
                        </span>
                      )
                    : isYearly
                    ? "Billed annually. Cancel anytime before renewal."
                    : "Cancel anytime. Access renews monthly."}
                </p> */}
              </div>

              {/* Decorative curves and shapes */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
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
