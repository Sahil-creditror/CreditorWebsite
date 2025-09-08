"use client";

import React from "react";
import { motion, cubicBezier } from "framer-motion";
import { cn } from "@/lib/utils";

export type LearnItem = {
  title: string;
  description: string;
  image: string;
  span?: "normal" | "wide" | "tall" | "big";
};

interface WhatYoullLearnBentoProps {
  items?: LearnItem[];
  className?: string;
  onCardClick?: (item: LearnItem, index: number) => void;
}

const DEFAULT_ITEMS: LearnItem[] = [
  {
    title: "Interactive Live Classes",
    description:
      "Join our interactive live classes every Tuesday & Thursday and engage in real-time learning.",
    image: "/images/operate/img2.webp",
    span: "wide",
  },
  {
    title: "Insights & Q&A",
    description:
      "Enjoy powerful insights, Q&A, and engaging sessions that keep you involved and learning.",
    image: "/images/operate/img5.webp",
  },
  {
    title: "Deep Insights",
    description:
      "Dive deeper into topics with expert-led discussions and knowledge sharing.",
    image: "/images/operate/img6.webp",
    span: "tall",
  },
  {
    title: "Hands-on Learning",
    description:
      "Apply concepts directly through guided, hands-on learning experiences.",
    image: "/images/operate/img1.webp",
  },
  {
    title: "Expert Mentor — Paul Michael",
    description:
      "Learn directly from Paul Michael, an experienced mentor guiding you with clarity and expertise.",
    image: "/images/operate/img3.webp",
    span: "wide",
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.6,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  }),
};

function spans(span?: LearnItem["span"]) {
  switch (span) {
    case "wide":
      return "sm:col-span-2";
    case "tall":
      return "sm:row-span-2";
    case "big":
      return "sm:col-span-2 sm:row-span-2";
    default:
      return "";
  }
}

export default function WhatYoullLearnBento({
  items = DEFAULT_ITEMS,
  className,
  onCardClick,
}: WhatYoullLearnBentoProps) {
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  };

  // keyboard accessibility for cards
  const handleKey = (e: React.KeyboardEvent, item: LearnItem, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCardClick?.(item, i);
    }
  };

  return (
    <section
      className={cn("relative mx-auto max-w-7xl px-4 py-12 md:py-16", className)}
      aria-labelledby="wyl-heading"
    >
      <AnimatedBackground />
      {/* Heading */}
      <div className="mb-8 md:mb-12 text-center">
        <motion.h2
          id="wyl-heading"
          className="text-2xl font-extrabold tracking-tight md:text-5xl text-red-600"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        >
          What You’ll Learn
        </motion.h2>

        <motion.p
          className="mt-3 max-w-2xl mx-auto text-sm text-slate-600 dark:text-white/80 md:text-base"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.04, duration: 0.5 }}
        >
          A concise, real-world curriculum for operating in the private—built for
          clarity, compliance, and longevity.
        </motion.p>
        <motion.div
          className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        />
      </div>

      {/* Grid */}
      <motion.div
        className="grid auto-rows-[14rem] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((item, i) => (
          <LearnCard
            key={i}
            item={item}
            index={i}
            onClick={() => onCardClick?.(item, i)}
            onKeyDown={(e: React.KeyboardEvent) => handleKey(e, item, i)}
          />
        ))}
      </motion.div>
    </section>
  );
}

function LearnCard({
  item,
  index,
  onClick,
  onKeyDown,
}: {
  item: LearnItem;
  index: number;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cn(
        "group relative overflow-hidden rounded-2xl text-left outline-none",
        spans(item.span)
      )}
      initial="hidden"
      whileInView="visible"
      variants={itemVariant}
      viewport={{ once: true, amount: 0.24 }}
      custom={index}
      aria-label={`${item.title} — ${item.description}`}
      whileTap={{ scale: 0.985 }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
        whileHover={{ y: -6 }}
        className="relative h-full w-full rounded-2xl bg-slate-900/60 backdrop-blur-sm overflow-hidden shadow-lg ring-0 ring-red-500/0 transition-all duration-500 group-hover:shadow-2xl group-hover:ring-8 group-hover:ring-red-500/10"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        </div>

        {/* Accent glow */}
        <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6">
          <h3 className="text-base font-semibold leading-tight text-white md:text-lg">
            {item.title}
          </h3>
          <p className="mt-2 max-w-[34ch] text-sm text-white/85 line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Hover shine */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]" />
        </div>
      </motion.div>
    </motion.button>
  );
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      {/* subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:24px_24px]" />

      {/* animated blobs */}
      <motion.div
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: cubicBezier(0.22, 1, 0.36, 1) }}
      />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 right-0 h-96 w-96 rounded-full bg-red-600/10 blur-3xl"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: cubicBezier(0.22, 1, 0.36, 1) }}
      />
      <motion.div
        className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-white/5 blur-3xl"
        animate={{ y: [0, -10, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
