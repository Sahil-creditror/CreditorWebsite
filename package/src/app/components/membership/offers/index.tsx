"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { FiCheck, FiStar, FiUsers, FiBookOpen, FiGift, FiCreditCard, FiMessageCircle, FiBook, FiPercent, FiCalendar, FiFileText, FiAward, FiHeadphones, FiShield, FiSettings, FiTrendingUp, FiAlertTriangle } from "react-icons/fi";

const offers = [
  {
    id: "masterclass",
    name: "Masterclass Membership",
    price: "$69",
    originalPrice: "$147",
    cadence: "/month",
    short: "🚀 Start Your Journey into the Private - Gain the tools, mentorship, and community to start operating privately today.",
    badge: "Limited-Time Offer",
    discount: "53% OFF",
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
  {
    id: "bundle",
    name: "Course Bundle",
    price: "$500",
    cadence: "one-time",
    short: "15 modules · Lifetime access · Creditors-focused",
    badge: "Best Value",
    discount: "Save $400",
    features: [
      { text: "Receive 500 credits to spend on any premium course", icon: FiGift },
      { text: "Unlocks 15 premium courses & 15 live instructor lectures (500 credits)", icon: FiBookOpen },
      { text: "Bonus Value — 100 bonus credits added to your account", icon: FiPercent },
      { text: "Masterclass Access — 1 month of Masterclass included (live classes + community)", icon: FiCalendar },
      { text: "Exclusive Community — Unlock 1 exclusive Private Group for advanced discussions", icon: FiUsers },
    ],
    cta: "Buy Bundle",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$2,800",
    cadence: "Full access",
    short: "Team training, compliance & onboarding",
    badge: "Enterprise",
    discount: "Custom Pricing",
    features: [
      { text: "Unlimited seats, team onboarding & training roadmaps", icon: FiUsers },
      { text: "Dedicated account manager for implementation", icon: FiAward },
      { text: "SLA & priority support for large practices", icon: FiShield },
      { text: "Custom integrations, reporting and agency workflows", icon: FiSettings },
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

export default function OffersSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eef5ff] to-[#f8fbff] dark:from-[#0b1220] dark:to-[#0e1a2b] text-slate-900 dark:text-white py-16 md:py-24">
      {/* subtle background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black dark:text-white mb-4" style={{ fontWeight: 900 }}>
            Exclusive Membership Offers
          </h2>
          <p className="text-lg text-black dark:text-slate-300">
            Choose the Creditors Academy plan that fits your goals — monthly membership for ongoing learning, a one-time course bundle for complete self-study, or enterprise access for teams and agencies.
          </p>
        </div>

        <motion.div
          className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 items-stretch"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              variants={cardVariant}
              whileHover={{ y: -4 }}
              className={`relative rounded-2xl border p-8 flex flex-col justify-between overflow-hidden transition-shadow duration-300 ease-out
                ${offer.featured ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white border-blue-600 shadow-lg" : "bg-white/90 backdrop-blur dark:bg-[#0f1b2d]/80 border-slate-200 dark:border-[#1e3352]"}`}
            >
              {/* Top gradient bar */}
              <div className={`absolute inset-x-0 top-0 h-1 ${offer.featured ? "bg-gradient-to-r from-cyan-300/70 via-white/70 to-cyan-300/70" : "bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20"}`} />

              {/* Featured ribbon */}
              {offer.featured && (
                <div className="pointer-events-none absolute -right-12 top-6 rotate-45">
                  <div className="bg-white/20 dark:bg-white/10 text-white text-[10px] tracking-wide px-10 py-1.5 shadow-sm border border-white/20">
                    Best value
                  </div>
                </div>
              )}

              {/* Discount badge */}
              {offer.discount && offer.id === "masterclass" && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {offer.discount}
                  </div>
                </div>
              )}

              {/* Top */}
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`text-2xl font-black ${offer.featured ? "text-white" : "text-slate-900 dark:text-white"}`}>{offer.name}</h3>
                    <p className={`text-sm mt-1 ${offer.featured ? "text-blue-100/90" : "text-black dark:text-white"}`}>{offer.short}</p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {offer.id === "masterclass" ? (
                        <>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                              <span className={`text-lg font-bold line-through ${offer.featured ? "text-white/60" : "text-slate-400 dark:text-slate-500"}`}>
                                {offer.originalPrice}
                              </span>
                              <span className={`text-3xl font-extrabold ${offer.featured ? "text-white" : "text-blue-700 dark:text-blue-400"}`}>
                                {offer.price}
                              </span>
                            </div>
                            <span className={`text-sm ${offer.featured ? "text-blue-100/90" : "text-black dark:text-white"}`}>
                              {offer.cadence}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className={`text-3xl font-extrabold ${offer.featured ? "text-white" : "text-blue-700 dark:text-blue-400"}`}>{offer.price}</span>
                          <span className={`text-sm ${offer.featured ? "text-blue-100/90" : "text-black dark:text-white"}`}>{offer.cadence}</span>
                        </>
                      )}
                    </div>
                    {offer.badge && (
                      <span className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs whitespace-nowrap ${offer.featured ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"}`}>
                        <FiStar className={`text-green-600 dark:text-green-400 w-4 h-4 flex-shrink-0`} /> {offer.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <ul className="space-y-3">
                    {offer.features.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <li key={index} className="flex items-start gap-3">
                          <span className={`${offer.featured ? "text-blue-200" : "text-blue-600 dark:text-blue-400"} flex-shrink-0 mt-0.5`}>
                            <IconComponent className="w-4 h-4" />
                          </span>
                          <span className={`${offer.featured ? "text-blue-50" : "text-black dark:text-white text-sm"} leading-relaxed`}>{feature.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <motion.a
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  href={
                    offer.id === "masterclass"
                      ? "/signup"
                      : offer.id === "bundle"
                      ? "/course-tnc"
                      : offer.id === "enterprise"
                      ? "/enterprise-tnc"
                      : "#"
                  }
                  className={`relative w-full inline-flex items-center justify-center py-3 rounded-full font-medium shadow-md transition-transform duration-200 overflow-hidden
                    ${offer.featured ? "bg-white text-blue-600" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                >
                  <span className="relative z-[1]">{offer.cta}</span>
                  <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-white/0 via-white/30 to-white/0" />
                </motion.a>

                <p className={`mt-4 text-xs ${offer.featured ? "text-blue-100/90" : "text-slate-500 dark:text-slate-400"}`}>
                  {offer.id === "enterprise"
                    ? "Custom contracts, billing and onboarding for teams."
                    : offer.id === "bundle"
                    ? "One-time purchase — lifetime access to Creditors Academy recorded lessons."
                    : offer.id === "masterclass"
                    ? (
                        <span className="flex items-center gap-2">
                          <FiAlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                          <span>WARNING: The price will increase to $147/month soon. Join now to lock in your $69/month rate forever — and cancel anytime.</span>
                        </span>
                      )
                    : "Cancel anytime. Access renews monthly."}
                </p>
              </div>

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
                <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent ${offer.featured ? 'to-white/5' : 'to-blue-500/5'} dark:${offer.featured ? 'to-white/5' : 'to-blue-400/5'}`} />
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

