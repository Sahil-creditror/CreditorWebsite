"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Home,
  Heart,
  BookOpen,
  FileText,
  ArrowRight,
  DollarSign,
  Zap,
} from "lucide-react";

type BusinessItem = {
  id?: string;
  name: string;
  whatItDoes: string;
  income: string;
  support: string[];
  icon: React.ReactNode;
  accent: string;
};

interface InfographicTableProps {
  items?: BusinessItem[];
  className?: string;
  onRowClick?: (item: BusinessItem, index: number) => void;
  onCta?: () => void;
  ctaLabel?: string;
}

const DEFAULT_ITEMS: BusinessItem[] = [
  {
    id: "trust",
    name: "Trust & Estate Consultant",
    whatItDoes: "Setup private wealth trusts for others",
    income: "$2K–$10K/mo",
    support: ["Scripts", "Templates", "Intake forms"],
    icon: <ShieldCheck className="h-5 w-5" />,
    accent: "from-emerald-400 to-teal-500",
  },
  {
    id: "realestate",
    name: "Real Estate via Trust",
    whatItDoes: "Hold or rent out homes under trusts",
    income: "$500–$5K+/property",
    support: ["Title setup", "EIN setup"],
    icon: <Home className="h-5 w-5" />,
    accent: "from-blue-400 to-indigo-500",
  },
  {
    id: "wellness",
    name: "Wellness or Coaching PMA",
    whatItDoes: "Operate outside licensing boards",
    income: "$1K–$8K/mo",
    support: ["PMA charters", "Client onboarding"],
    icon: <Heart className="h-5 w-5" />,
    accent: "from-pink-400 to-rose-500",
  },
  {
    id: "homeschool",
    name: "Homeschool PMA",
    whatItDoes: "Offer private or faith-based education",
    income: "$750–$6K/mo",
    support: ["Curriculum", "Legal agreements"],
    icon: <BookOpen className="h-5 w-5" />,
    accent: "from-amber-400 to-orange-500",
  },
  {
    id: "notary",
    name: "Private Notary",
    whatItDoes: "Notarize private docs & affidavits",
    income: "$500–$3K/mo",
    support: ["Affidavit guide", "Stamp guide"],
    icon: <FileText className="h-5 w-5" />,
    accent: "from-purple-400 to-fuchsia-500",
  },
];

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function InfographicTable({
  items = DEFAULT_ITEMS,
  className = "",
  onRowClick,
  onCta,
  ctaLabel = "Get Started",
}: InfographicTableProps) {
  return (
    <section className={`${className} relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden`}>
      {/* 🔮 Background Gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full bg-gradient-to-b from-indigo-400/20 via-fuchsia-400/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.08),transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl w-full">
        {/* Header */}
        <header className="mb-10 sm:mb-12 text-left relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-start rounded-full bg-blue-100/70 dark:bg-blue-900/40 px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 backdrop-blur-sm"
          >
            <Zap className="h-4 w-4 text-blue-600 dark:text-blue-300 mr-2" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
              Business Opportunities
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-blue-600 dark:text-blue-600">
            Businesses You Can Launch
          </h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Practical private-service businesses you can stand up quickly with our support resources.
          </p>
        </header>

        {/* Column headers - hidden on mobile */}
        <div className="hidden md:grid grid-cols-[80px_1fr_160px_200px] gap-4 md:gap-6 mb-3 sm:mb-4 px-4 sm:px-6 relative z-10">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
            Service
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Description
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center">
            <DollarSign className="h-3 w-3 mr-1" />
            Income Potential
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Support Materials
          </div>
        </div>

        {/* Items */}
        <div className="space-y-4 relative z-10">
          {items.map((item, i) => (
            <motion.div
              key={item.id ?? item.name}
              className="grid grid-cols-1 md:grid-cols-[80px_1fr_160px_200px] items-start md:items-center gap-4 md:gap-6 rounded-xl border border-gray-200/20 dark:border-gray-700/40 bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: i * 0.06,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => onRowClick?.(item, i)}
            >
              {/* Icon */}
              <div className="flex justify-start md:justify-center">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${item.accent} text-white shadow-sm group-hover:scale-105 transition-transform`}>
                  {item.icon}
                </div>
              </div>

              {/* Name & description */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  {item.whatItDoes}
                </p>
              </div>

              {/* Income */}
              <div className="flex md:justify-start">
                <div className="inline-flex items-center rounded-full bg-blue-50/70 dark:bg-blue-900/40 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 group-hover:bg-blue-100/80 dark:group-hover:bg-blue-800/50 transition-colors backdrop-blur-sm">
                  {item.income}
                </div>
              </div>

              {/* Support */}
              <div className="flex flex-wrap gap-2 justify-start">
                {item.support.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-md bg-gray-50/80 dark:bg-gray-700/50 px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:bg-gray-100/90 dark:group-hover:bg-gray-600/50 transition-colors backdrop-blur-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 flex justify-center relative z-10"
        >
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={onCta}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-md hover:shadow-lg transition-all"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
  