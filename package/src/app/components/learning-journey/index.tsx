"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, ChevronRight } from "lucide-react";
import {
  BECOME_PRIVATE_PATH,
  OPERATE_PRIVATE_PATH,
  FINANCIAL_FREEDOM_PATH,
} from "@/lib/coursePaths";

const MASTERCLASS_PATH = "/masterclass-membership";

const courseCards = [
  {
    step: 1,
    title: "Master Class",
    description:
      "Build sovereignty, business trusts, credit systems, and private financial infrastructure.",
    modules: "Foundation",
    href: MASTERCLASS_PATH,
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883850/creditor-website-assets/images/projects/projectlist/become.webp",
  },
  {
    step: 2,
    title: "Become Private",
    description:
      "Master sovereignty principles, secured party creditor status, and political status correction.",
    modules: "3 Courses",
    href: BECOME_PRIVATE_PATH,
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883850/creditor-website-assets/images/projects/projectlist/become.webp",
  },
  {
    step: 3,
    title: "Operate Private",
    description:
      "Operate trusts, PMAs, and real estate structures at a professional level with full legal footing.",
    modules: "3 Courses",
    href: OPERATE_PRIVATE_PATH,
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883858/creditor-website-assets/images/projects/projectlist/operate.webp",
  },
  {
    step: 4,
    title: "Financial Freedom",
    description:
      "Court remedies, business credit mastery, and PMA-based financial independence.",
    modules: "3 Courses",
    href: FINANCIAL_FREEDOM_PATH,
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883854/creditor-website-assets/images/projects/projectlist/financial.webp",
  },
];

const stagePath = [
  {
    title: "Join Creditor Academy",
    subtitle: null,
    color: "bg-slate-800 text-white",
  },
  {
    title: "Masterclass Membership",
    subtitle: "Community + Intro lessons",
    color: "bg-violet-800 text-violet-100",
  },
  {
    title: "Become Private",
    subtitle: "Status correction & sovereignty",
    color: "bg-teal-800 text-teal-100",
  },
  {
    title: "Operate Private",
    subtitle: "Business trusts & PMAs",
    color: "bg-amber-900 text-amber-100",
  },
  {
    title: "Financial Freedom",
    subtitle: "Credit & private banking",
    color: "bg-fuchsia-900 text-fuchsia-100",
  },
  {
    title: "Full Private Operator",
    subtitle: "Sovereign wealth & legacy",
    color: "bg-slate-800 text-white",
  },
];

const detailedSteps = [
  { num: 1, title: "Join Academy", subtitle: null, color: "bg-slate-600" },
  {
    num: 2,
    title: "Masterclass Membership",
    subtitle: "Foundation for all courses",
    color: "bg-violet-700",
  },
  {
    num: 3,
    title: "Status Correction",
    subtitle: "Become Private — Course 1",
    color: "bg-teal-700",
  },
  {
    num: 4,
    title: "SPC",
    subtitle: "Become Private — Course 2",
    color: "bg-teal-700",
  },
  {
    num: 5,
    title: "SOV 101",
    subtitle: "Become Private — Elective",
    color: "bg-teal-700",
  },
  {
    num: 6,
    title: "Business Trust",
    subtitle: "Operate Private — Course 1",
    color: "bg-amber-800",
  },
  {
    num: 7,
    title: "Private Membership Assoc.",
    subtitle: "Operate Private — Course 2",
    color: "bg-amber-800",
  },
  {
    num: 8,
    title: "Real Estate & Legacy",
    subtitle: "Operate Private — Course 3",
    color: "bg-amber-800",
  },
  {
    num: 9,
    title: "I Want Remedy Now",
    subtitle: "Financial Freedom — Course 1",
    color: "bg-fuchsia-800",
  },
  {
    num: 10,
    title: "Private Merchant Processing",
    subtitle: "Financial Freedom — Course 2",
    color: "bg-fuchsia-800",
  },
  {
    num: 11,
    title: "Private Business Credit",
    subtitle: "Financial Freedom — Course 3",
    color: "bg-fuchsia-800",
  },
  {
    num: 12,
    title: "Certified Private Operator",
    subtitle: "Graduate",
    color: "bg-slate-600",
  },
];

export default function LearningJourney() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] text-slate-900 overflow-x-hidden">
      {/* HEADER */}
      <section className="pt-28 sm:pt-32 pb-10 px-4 sm:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase mb-3"
        >
          Creditor Academy
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900"
        >
          Your Learning Journey
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-slate-500 text-sm sm:text-base max-w-lg mx-auto"
        >
          Follow the path – each course builds on the last.
        </motion.p>
      </section>

      {/* COURSE PATH CARDS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col lg:flex-row items-stretch gap-5 lg:gap-0">
          {courseCards.map((card, i) => (
            <React.Fragment key={card.step}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col flex-1 min-w-0"
              >
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/90 text-slate-700 text-xs font-bold flex items-center justify-center shadow-sm">
                    {card.step}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed flex-1">
                    {card.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                      {card.modules}
                    </span>
                    <Link
                      href={card.href}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-0.5"
                    >
                      View
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>

              {i < courseCards.length - 1 && (
                <>
                  <div className="hidden lg:flex items-center justify-center px-1.5 shrink-0 self-center -mt-12">
                    <span className="w-7 h-7 rounded-full border-2 border-blue-300 bg-white text-blue-500 flex items-center justify-center shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="flex lg:hidden items-center justify-center py-0.5">
                    <span className="w-7 h-7 rounded-full border-2 border-blue-300 bg-white text-blue-500 flex items-center justify-center shadow-sm">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* STAGE ROADMAP + DETAILED PATH */}
      <section className="bg-[#1a1d23] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-400 font-bold tracking-[0.2em] text-xs uppercase mb-2">
              The Full Path
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Learning Journey of Creditor Academy
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-md mx-auto">
              From joining to graduating as a certified private operator.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: 6-stage vertical boxes */}
            <div className="flex flex-col items-center max-w-xs mx-auto w-full">
              {stagePath.map((stage, i) => (
                <React.Fragment key={stage.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.05 }}
                    className={`w-full rounded-xl px-5 py-4 text-center ${stage.color} shadow-lg`}
                  >
                    <p className="font-bold text-sm sm:text-base tracking-tight">
                      {stage.title}
                    </p>
                    {stage.subtitle && (
                      <p className="mt-0.5 text-xs opacity-75">{stage.subtitle}</p>
                    )}
                  </motion.div>
                  {i < stagePath.length - 1 && (
                    <ArrowDown className="w-4 h-4 text-slate-500 my-2.5 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Right: 12-step detailed zigzag */}
            <div className="relative pl-2">
              <div className="absolute left-[22px] top-4 bottom-4 border-l border-dashed border-slate-600" />

              <div className="space-y-5">
                {detailedSteps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: i * 0.03 }}
                    className={`relative flex items-start gap-4 ${
                      i % 2 === 0 ? "ml-0" : "ml-4 sm:ml-8"
                    }`}
                  >
                    <span
                      className={`relative z-10 shrink-0 w-11 h-11 rounded-full ${step.color} text-white text-sm font-bold flex items-center justify-center shadow-md ring-4 ring-[#1a1d23]`}
                    >
                      {step.num}
                    </span>
                    <div className="pt-1.5">
                      <p className="text-white font-semibold text-sm sm:text-base leading-tight">
                        {step.title}
                      </p>
                      {step.subtitle && (
                        <p className="text-slate-400 text-xs mt-0.5">
                          {step.subtitle}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/masterclass-membership"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
