"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  MASTER_CLASS_PATH,
  BECOME_PRIVATE_HUB_PATH,
  OPERATE_PRIVATE_HUB_PATH,
  FINANCIAL_FREEDOM_HUB_PATH,
} from "@/lib/coursePaths";

const courseCards = [
  {
    step: 1,
    title: "Master Class",
    description:
      "Build sovereignty, business trusts, credit systems, and private financial infrastructure.",
    modules: "Foundation",
    href: MASTER_CLASS_PATH,
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883850/creditor-website-assets/images/projects/projectlist/become.webp",
  },
  {
    step: 2,
    title: "Become Private",
    description:
      "Master sovereignty principles, secured party creditor status, and political status correction.",
    modules: "3 Courses",
    href: BECOME_PRIVATE_HUB_PATH,
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883850/creditor-website-assets/images/projects/projectlist/become.webp",
  },
  {
    step: 3,
    title: "Operate Private",
    description:
      "Operate trusts, PMAs, and real estate structures at a professional level with full legal footing.",
    modules: "3 Courses",
    href: OPERATE_PRIVATE_HUB_PATH,
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883858/creditor-website-assets/images/projects/projectlist/operate.webp",
  },
  {
    step: 4,
    title: "Financial Freedom",
    description:
      "Court remedies, business credit mastery, and PMA-based financial independence.",
    modules: "3 Courses",
    href: FINANCIAL_FREEDOM_HUB_PATH,
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883854/creditor-website-assets/images/projects/projectlist/financial.webp",
  },
];

const stagePath = [
  {
    title: "Join Creditor Academy",
    subtitle: null,
    node: "bg-slate-800",
    card: "bg-slate-800/95 border-slate-600/40",
    ring: "ring-slate-400/40",
  },
  {
    title: "Masterclass Membership",
    subtitle: "Community + Intro lessons",
    node: "bg-violet-700",
    card: "bg-violet-800/95 border-violet-500/40",
    ring: "ring-violet-300/40",
  },
  {
    title: "Become Private",
    subtitle: "Status correction & sovereignty",
    node: "bg-teal-700",
    card: "bg-teal-800/95 border-teal-500/40",
    ring: "ring-teal-300/40",
  },
  {
    title: "Operate Private",
    subtitle: "Business trusts & PMAs",
    node: "bg-amber-800",
    card: "bg-amber-900/95 border-amber-600/40",
    ring: "ring-amber-300/40",
  },
  {
    title: "Financial Freedom",
    subtitle: "Credit & private banking",
    node: "bg-fuchsia-800",
    card: "bg-fuchsia-900/95 border-fuchsia-500/40",
    ring: "ring-fuchsia-300/40",
  },
  {
    title: "Full Private Operator",
    subtitle: "Sovereign wealth & legacy",
    node: "bg-slate-800",
    card: "bg-slate-800/95 border-slate-600/40",
    ring: "ring-slate-400/40",
  },
];

export default function LearningJourney() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] text-slate-900 overflow-x-hidden">
      {/* STAGE ROADMAP — The Full Path */}
      <section
        className="relative w-full pt-28 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/bg/bgc.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-blue-800/60 via-blue-500/50 to-blue-600/40" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-white/80 font-bold tracking-[0.2em] text-xs uppercase mb-2">
              The Full Path
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Join to Certified Operator
            </h2>
            <p className="mt-2 text-blue-100 text-sm sm:text-base max-w-lg mx-auto">
              See every stage — then explore each course below.
            </p>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute left-1/2 top-6 bottom-6 hidden w-0.5 -translate-x-1/2 md:block"
              aria-hidden
            >
              <motion.div
                className="h-full w-full bg-linear-to-b from-white/15 via-white/50 to-white/15"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
              />
            </div>

            <div
              className="pointer-events-none absolute left-[1.15rem] top-3 bottom-3 w-px bg-linear-to-b from-white/10 via-white/45 to-white/10 md:hidden"
              aria-hidden
            />

            <ol className="relative space-y-8 sm:space-y-10 md:space-y-12">
              {stagePath.map((stage, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <motion.li
                    key={stage.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="relative flex items-center gap-4 md:grid md:grid-cols-[1fr_3.5rem_1fr] md:gap-0"
                  >
                    <div
                      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${stage.node} text-white text-xs font-bold shadow-lg ring-4 ${stage.ring} md:hidden`}
                    >
                      {i + 1}
                    </div>

                    <div
                      className={`hidden md:flex md:items-center md:justify-end ${
                        isLeft ? "" : "invisible"
                      }`}
                    >
                      {isLeft && (
                        <div className="flex items-center gap-0">
                          <div
                            className={`max-w-sm rounded-2xl border px-5 py-4 text-right shadow-xl backdrop-blur-sm ${stage.card}`}
                          >
                            <p className="font-bold text-white text-sm sm:text-base tracking-tight">
                              {stage.title}
                            </p>
                            {stage.subtitle && (
                              <p className="mt-0.5 text-white/70 text-xs">
                                {stage.subtitle}
                              </p>
                            )}
                          </div>
                          <div className="h-px w-6 bg-white/40" aria-hidden />
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 hidden md:flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.12 + i * 0.08,
                          type: "spring",
                          stiffness: 280,
                          damping: 18,
                        }}
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${stage.node} text-white text-sm font-bold shadow-xl ring-4 ${stage.ring}`}
                      >
                        {i + 1}
                      </motion.div>
                    </div>

                    <div
                      className={`min-w-0 flex-1 md:flex md:items-center md:justify-start ${
                        isLeft ? "md:invisible" : ""
                      }`}
                    >
                      <div
                        className={`rounded-2xl border px-5 py-4 shadow-xl backdrop-blur-sm md:hidden ${stage.card}`}
                      >
                        <p className="font-bold text-white text-sm tracking-tight">
                          {stage.title}
                        </p>
                        {stage.subtitle && (
                          <p className="mt-0.5 text-white/70 text-xs">
                            {stage.subtitle}
                          </p>
                        )}
                      </div>

                      {!isLeft && (
                        <div className="hidden md:flex items-center gap-0">
                          <div className="h-px w-6 bg-white/40" aria-hidden />
                          <div
                            className={`max-w-sm rounded-2xl border px-5 py-4 text-left shadow-xl backdrop-blur-sm ${stage.card}`}
                          >
                            <p className="font-bold text-white text-sm sm:text-base tracking-tight">
                              {stage.title}
                            </p>
                            {stage.subtitle && (
                              <p className="mt-0.5 text-white/70 text-xs">
                                {stage.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/masterclass-membership"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2563EB] text-white text-sm font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-900/40 ring-4 ring-white/30"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Course path — full width with bgm */}
      <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg/bgm.jpg')" }}
        />
        <div className="absolute inset-0 bg-white/30" />

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center mb-10 sm:mb-14">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase mb-3"
            >
              Creditor Academy
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Four Steps to Private Mastery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto"
            >
              Each course builds on the last — tap a step to explore Book Smart
              &amp; Street Smart paths.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 w-full">
            {courseCards.map((card, i) => (
              <motion.div
                key={card.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.07 }}
                className="relative flex flex-col"
              >
                {i < courseCards.length - 1 && (
                  <div className="hidden xl:flex absolute -right-4 top-[28%] z-20 items-center justify-center translate-x-1/2 pointer-events-none">
                    <span className="w-8 h-8 rounded-full border-2 border-blue-400 bg-white text-[#2563EB] flex items-center justify-center shadow-md">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                )}

                <Link
                  href={card.href}
                  className="group flex flex-col h-full bg-white/95 backdrop-blur-sm rounded-2xl border border-white shadow-lg shadow-slate-200/60 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40"
                >
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#2563EB] text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-blue-600/40 ring-2 ring-white/80">
                      {card.step}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-[#2563EB] transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">
                      {card.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                        {card.modules}
                      </span>
                    </div>

                    <span className="mt-4 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#2563EB] text-white text-sm font-bold shadow-md shadow-blue-600/25 group-hover:bg-blue-700 group-hover:shadow-lg group-hover:shadow-blue-600/30 transition-all">
                      Explore {card.title}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
