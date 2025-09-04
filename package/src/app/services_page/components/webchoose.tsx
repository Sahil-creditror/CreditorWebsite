"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Rocket,
  ShieldCheck,
  Cpu,
  Layers,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react";

type Feature = {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accent?: string; // tailwind gradient classes (e.g. "from-indigo-400 to-indigo-600")
};

interface WhyChooseUsProps {
  features?: Feature[];
  ctaText?: string;
  ctaHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  className?: string;
}

const DEFAULT_FEATURES: Feature[] = [
  {
    id: "speed",
    title: "Blazing-fast performance",
    desc: "Optimized builds, CDN-first delivery and pragmatic SSR/ISR where it matters.",
    icon: Rocket,
    accent: "from-indigo-400 to-indigo-600",
  },
  {
    id: "secure",
    title: "Enterprise-grade security",
    desc: "HTTPS, hardened headers, automated audits and secure auth patterns by default.",
    icon: ShieldCheck,
    accent: "from-emerald-400 to-emerald-600",
  },
  {
    id: "scale",
    title: "Built to scale",
    desc: "Decoupled services, clean APIs and caching strategies that grow with you.",
    icon: Layers,
    accent: "from-sky-400 to-sky-600",
  },
  // {
  //   id: "integrations",
  //   title: "Plug & play integrations",
  //   desc: "Payments, CRM, analytics and marketing systems connected with minimal friction.",
  //   icon: Cpu,
  //   accent: "from-amber-400 to-amber-600",
  // },
  // {
  //   id: "support",
  //   title: "White-glove onboarding",
  //   desc: "Client training, handover docs and a support SLA so teams stay productive.",
  //   icon: Users,
  //   accent: "from-pink-400 to-pink-600",
  // },
  {
    id: "uptime",
    title: "Proactive maintenance",
    desc: "Monitoring, backups and on-call practices to keep your site healthy and fast.",
    icon: Clock,
    accent: "from-rose-400 to-rose-600",
  },
];

// ✅ Typed variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export default function WhyChooseUs({
  features = DEFAULT_FEATURES,
  ctaText = "Get a free quote",
  ctaHref = "#contact",
  secondaryText = "See case studies",
  secondaryHref = "#case-studies",
  className = "",
}: WhyChooseUsProps) {
  return (
    <section
      className={`why-choose-us relative overflow-hidden py-12 sm:py-20 lg:py-28 ${className}`}
      aria-labelledby="why-choose-us-title"
    >
      {/* Decorative blurred gradient shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-24 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-300/40 to-violet-300/30 blur-3xl mix-blend-multiply transform-gpu opacity-60 dark:from-indigo-700/30 dark:to-violet-700/20"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Headline / CTA */}
          <div className="z-10">
            <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-sm font-semibold dark:bg-indigo-900/30 dark:text-indigo-300">
              <CheckCircle className="w-4 h-4 mr-2" aria-hidden />
              Why choose us
            </span>

            <h2
              id="why-choose-us-title"
              className="mt-6 max-w-xl text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-gray-100"
            >
              Modern websites that perform — beautiful, secure, and built for growth
            </h2>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-lg">
              We combine design excellence with engineering discipline: fast launches,
              measurable outcomes, and an ownership mindset. Small teams to enterprise
              — same quality, tailored to your goals.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-3 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:-translate-y-0.5"
              >
                {ctaText}
                <svg
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M5 12h14"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {secondaryText}
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-2">
                <strong className="text-gray-900 dark:text-gray-100">99.9%</strong>
                uptime guarantee
              </span>

              <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />

              <span>Dedicated onboarding & documentation</span>
            </div>
          </div>

          {/* Right: Features grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.article
                    key={feature.id}
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow transform hover:-translate-y-1 focus-within:translate-y-0"
                    tabIndex={0}
                    aria-labelledby={`feature-${feature.id}-title`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 rounded-lg p-3 bg-gradient-to-br ${
                          feature.accent ?? "from-indigo-400 to-indigo-600"
                        } text-white shadow-inner`}
                        aria-hidden
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div>
                        <h3
                          id={`feature-${feature.id}-title`}
                          className="text-base font-semibold text-gray-900 dark:text-gray-100"
                        >
                          {feature.title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {feature.desc}
                        </p>

                        <div className="mt-3 flex items-center gap-3">
                          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 px-2 py-1 text-xs font-medium dark:bg-indigo-900/20 dark:text-indigo-300">
                            <CheckCircle className="w-3 h-3" aria-hidden />
                            Proven
                          </span>

                          <a
                            href="#"
                            className="text-xs font-medium text-indigo-600 dark:text-indigo-300 hover:underline"
                          >
                            Learn more
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* subtle animated accent bar */}
                    <motion.div
                      aria-hidden
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35 }}
                      className="pointer-events-none absolute -right-16 top-6 h-28 w-28 rounded-full opacity-20 bg-gradient-to-br from-white to-transparent dark:from-gray-800"
                    />
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Optional small testimonial / trust strip */}
        <div className="mt-12 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800/60 shadow flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 12h16"
                  stroke="#8B5CF6"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 6h16"
                  stroke="#8B5CF6"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Trusted by teams worldwide
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Fintechs, marketplaces, and agencies.
              </p>
            </div>
          </div>

          {/* <div className="flex items-center gap-6">
            <img
              src="/logos/logo-1.svg"
              alt="logo"
              className="h-6 opacity-80 dark:opacity-60"
            />
            <img
              src="/logos/logo-2.svg"
              alt="logo"
              className="h-6 opacity-80 dark:opacity-60"
            />
            <img
              src="/logos/logo-3.svg"
              alt="logo"
              className="h-6 opacity-80 dark:opacity-60"
            />
          </div> */}
        </div>
      </div>

      {/* subtle foreground blur */}
      <div
        className="pointer-events-none absolute -right-36 -bottom-36 w-72 h-72 rounded-full bg-gradient-to-br from-pink-300/20 to-rose-300/10 blur-2xl mix-blend-overlay"
        aria-hidden
      />
    </section>
  );
}
