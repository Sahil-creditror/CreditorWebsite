"use client";

import { motion, cubicBezier } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

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
    title: "Set up your UBOT Trust & asset-holding structure",
    description:
      "Design robust UBOT frameworks to protect and compartmentalize assets from day one.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop",
    span: "wide",
  },
  {
    title: "Form PMAs for coaching, services, education, or trades",
    description:
      "Stand up Private Membership Associations to operate in the private with clarity.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Acquire & hold real estate in trusts",
    description:
      "Structure acquisitions for privacy, continuity, and long-term stewardship.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
    span: "tall",
  },
  {
    title: "Handle bookkeeping + taxes privately",
    description:
      "Implement disciplined record-keeping and private accounting workflows.",
    image:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Operate legally without UCC, LLCs, or statutory codes",
    description:
      "Navigate operations with private instruments and compliant governance.",
    image:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1600&auto=format&fit=crop",
    span: "wide",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
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
  return (
    <section
      className={cn("relative mx-auto max-w-7xl px-4 py-12 md:py-16", className)}
      aria-labelledby="wyl-heading"
    >
      {/* Heading */}
      <div className="mb-8 md:mb-12">
        <motion.h2
          id="wyl-heading"
          className="text-xl font-extrabold tracking-tight md:text-5xl text-blue-600"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) }}
        >
          What You’ll Learn
        </motion.h2>
        <motion.p
          className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06, duration: 0.5 }}
        >
          A concise, real-world curriculum for operating in the private—built for
          clarity, compliance, and longevity.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid auto-rows-[14rem] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => onCardClick?.(item, i)}
            className={cn(
              "group relative overflow-hidden rounded-3xl text-left outline-none shadow-lg hover:shadow-2xl transition-shadow duration-500",
              spans(item.span)
            )}
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true, amount: 0.2 }}
            custom={i}
          >
            {/* Card Inner */}
            <div className="relative h-full w-full rounded-3xl bg-gray-900/80 backdrop-blur-sm overflow-hidden">
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-end p-6 transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-white/80">
                  {item.description}
                </p>
              </div>

              {/* Hover shine */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_120%,white/15,transparent_60%)]" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
