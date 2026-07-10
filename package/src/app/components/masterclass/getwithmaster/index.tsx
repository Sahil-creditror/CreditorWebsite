"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Benefit = {
  title: string;
  description: string;
  image: string;
};

const benefits: Benefit[] = [
  {
    title: "Pay-As-You-Go Learning",
    description:
      "Access every course in our library at a member-only rate — only pay for what you need, when you need it.",
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883414/creditor-website-assets/images/courses/become/learning.webp",
  },
  {
    title: "Introductory Access",
    description:
      "Try the first module of premium courses for free so you can decide before committing.",
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883385/creditor-website-assets/images/courses/become/access.webp",
  },
  {
    title: "Private Community Groups",
    description:
      "Connect with entrepreneurs and pros, get fast answers, and share wins in exclusive groups.",
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883403/creditor-website-assets/images/courses/become/group.webp",
  },
  {
    title: "Live Weekly Trainings",
    description:
      "Attend live sessions with instructors — ask questions, get critiques, and stay ahead.",
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883452/creditor-website-assets/images/courses/become/trainingnew.webp",
  },
];

const LOGO_SRC =
  "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883706/creditor-website-assets/images/logo/logo_roadmap.png";

const CX = 300;
const CY = 300;
const INNER_R = 58;
const OUTER_R = 288;
const GAP_DEG = 2.5;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeDonutSegment(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
) {
  const start = startAngle + GAP_DEG / 2;
  const end = endAngle - GAP_DEG / 2;

  const outerStart = polarToCartesian(cx, cy, outerR, start);
  const outerEnd = polarToCartesian(cx, cy, outerR, end);
  const innerStart = polarToCartesian(cx, cy, innerR, end);
  const innerEnd = polarToCartesian(cx, cy, innerR, start);
  const largeArc = end - start > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ");
}

function segmentMidAngle(index: number, total: number) {
  const slice = 360 / total;
  return index * slice + slice / 2;
}

function RadialBenefits({ activeIndex, onHover }: { activeIndex: number | null; onHover: (i: number | null) => void }) {
  const total = benefits.length;
  const slice = 360 / total;

  return (
    <div className="relative mx-auto w-full max-w-[760px] aspect-square">
      <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden>
        <defs>
          {benefits.map((item, i) => (
            <pattern
              key={`pattern-${i}`}
              id={`benefit-pattern-${i}`}
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href={item.image}
                width="600"
                height="600"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          ))}
          <filter id="segment-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#3B82F6" floodOpacity="0.95" />
          </filter>
        </defs>

        {benefits.map((item, i) => {
          const start = i * slice;
          const end = start + slice;
          const path = describeDonutSegment(CX, CY, INNER_R, OUTER_R, start, end);
          const isActive = activeIndex === i;

          return (
            <g
              key={item.title}
              className="cursor-pointer transition-opacity duration-300"
              style={{ opacity: activeIndex === null || isActive ? 1 : 0.55 }}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(i)}
              onBlur={() => onHover(null)}
              tabIndex={0}
              role="button"
              aria-label={item.title}
            >
              <path d={path} fill={`url(#benefit-pattern-${i})`} />
              <path d={path} fill="rgba(15, 23, 42, 0.62)" />
              <path
                d={path}
                fill="none"
                stroke={isActive ? "#3B82F6" : "rgba(59, 130, 246, 0.3)"}
                strokeWidth={isActive ? 2.5 : 1}
                filter={isActive ? "url(#segment-glow)" : undefined}
              />
            </g>
          );
        })}

      </svg>

      {/* Segment labels */}
      {benefits.map((item, i) => {
        const angle = segmentMidAngle(i, total);
        const labelR = (INNER_R + OUTER_R) / 2;
        const pos = polarToCartesian(CX, CY, labelR, angle);
        const left = (pos.x / 600) * 100;
        const top = (pos.y / 600) * 100;
        const isActive = activeIndex === i;

        return (
          <div
            key={`label-${item.title}`}
            className="pointer-events-none absolute z-10 w-[46%] max-w-[220px] -translate-x-1/2 -translate-y-1/2 px-3 text-center transition-all duration-300"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <span
              className={`mb-1.5 block text-[11px] font-medium tracking-widest transition-colors duration-300 sm:text-xs ${
                isActive ? "text-blue-200" : "text-blue-300/70"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className={`mb-1.5 text-sm font-bold leading-snug transition-colors duration-300 sm:text-base md:text-lg ${
                isActive ? "text-white" : "text-white/90"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`hidden text-[11px] leading-relaxed transition-colors duration-300 sm:block sm:text-xs md:text-sm ${
                isActive ? "text-blue-100/90" : "text-blue-200/60"
              }`}
            >
              {item.description}
            </p>
          </div>
        );
      })}

      {/* Center hub */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="relative flex size-[96px] items-center justify-center rounded-full bg-white shadow-[0_0_40px_rgba(59,130,246,0.35)] ring-2 ring-blue-200/60 sm:size-[116px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/15 to-transparent" />
          <Image
            src={LOGO_SRC}
            alt="Creditor Academy"
            width={56}
            height={56}
            className="relative z-10 size-11 object-contain sm:size-14"
          />
        </div>
      </div>
    </div>
  );
}

function MobileBenefitCard({
  item,
  index,
  isActive,
  onHover,
}: {
  item: Benefit;
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) {
  return (
    <motion.article
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isActive
          ? "border-blue-400/70 shadow-[0_0_30px_rgba(59,130,246,0.25)]"
          : "border-blue-500/20"
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="absolute inset-0">
        <Image src={item.image} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-950/80 to-slate-900/85" />
      </div>
      <div className="relative p-5">
        <span className="mb-2 block text-xs font-medium tracking-widest text-blue-300/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
        <p className="text-sm leading-relaxed text-blue-100/75">{item.description}</p>
      </div>
    </motion.article>
  );
}

export default function MasterclassBenefits() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-20 md:py-12">
      {/* Background image + blue-white overlay */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg/bgmmy.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-white/90 to-blue-900/50" />
        <div className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-sky-300/25 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.12),transparent_70%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.header
          className="mx-auto mb-10 max-w-3xl text-center md:mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem]">
            What you get
          </h2>
          <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-slate-600 md:text-base lg:text-lg">
            Everything you need to level up fast: community, live coaching, and preview access.
          </p>
        </motion.header>

        {/* Desktop radial layout */}
        <div className="hidden lg:block">
          <RadialBenefits activeIndex={activeIndex} onHover={setActiveIndex} />
        </div>

        {/* Mobile / tablet stacked layout */}
        <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
          {benefits.map((item, index) => (
            <MobileBenefitCard
              key={item.title}
              item={item}
              index={index}
              isActive={activeIndex === index}
              onHover={setActiveIndex}
            />
          ))}
        </div>

        <motion.p
          className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-slate-600 md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Join today to get exclusive previews, live coaching, and entry to member-only community
          groups — cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
