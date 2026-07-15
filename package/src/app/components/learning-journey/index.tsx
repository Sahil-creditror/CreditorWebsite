"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Users,
  GraduationCap,
  Shield,
  Building2,
  Wallet,
  Crown,
  MapPin,
  type LucideIcon,
} from "lucide-react";
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
    icon: GraduationCap,
    ring: "ring-blue-400/50",
    glow: "shadow-blue-500/25",
    badge: "bg-blue-50 text-blue-700",
    btn: "bg-[#2563EB] hover:bg-blue-700 shadow-blue-600/25",
    stepBg: "bg-[#2563EB]",
    wash: "from-blue-900/70 via-blue-800/20",
    borderHover: "group-hover:border-blue-400",
    titleHover: "group-hover:text-[#2563EB]",
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
    icon: Shield,
    ring: "ring-blue-400/50",
    glow: "shadow-blue-500/25",
    badge: "bg-blue-50 text-blue-700",
    btn: "bg-[#2563EB] hover:bg-blue-700 shadow-blue-600/25",
    stepBg: "bg-[#2563EB]",
    wash: "from-blue-900/70 via-blue-800/20",
    borderHover: "group-hover:border-blue-400",
    titleHover: "group-hover:text-[#2563EB]",
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
    icon: Building2,
    ring: "ring-blue-400/50",
    glow: "shadow-blue-500/25",
    badge: "bg-blue-50 text-blue-700",
    btn: "bg-[#2563EB] hover:bg-blue-700 shadow-blue-600/25",
    stepBg: "bg-[#2563EB]",
    wash: "from-blue-900/70 via-blue-800/20",
    borderHover: "group-hover:border-blue-400",
    titleHover: "group-hover:text-[#2563EB]",
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
    icon: Wallet,
    ring: "ring-blue-400/50",
    glow: "shadow-blue-500/25",
    badge: "bg-blue-50 text-blue-700",
    btn: "bg-[#2563EB] hover:bg-blue-700 shadow-blue-600/25",
    stepBg: "bg-[#2563EB]",
    wash: "from-blue-900/70 via-blue-800/20",
    borderHover: "group-hover:border-blue-400",
    titleHover: "group-hover:text-[#2563EB]",
  },
];

type Stage = {
  title: string;
  subtitle: string | null;
  icon: LucideIcon;
  href: string;
  pin: string;
  glow: string;
  card: string;
};

const stagePath: Stage[] = [
  {
    title: "Join Creditor Academy",
    subtitle: "Your starting point",
    icon: Users,
    href: "/masterclass-membership",
    pin: "bg-orange-500 shadow-orange-500/50",
    glow: "group-hover:shadow-orange-400/60",
    card: "bg-slate-800/95 border-slate-500/40",
  },
  {
    title: "Masterclass Membership",
    subtitle: "Community + Intro lessons",
    icon: GraduationCap,
    href: "/masterclass-membership",
    pin: "bg-violet-600 shadow-violet-600/50",
    glow: "group-hover:shadow-violet-400/60",
    card: "bg-violet-800/95 border-violet-500/40",
  },
  {
    title: "Become Private",
    subtitle: "Status correction & sovereignty",
    icon: Shield,
    href: BECOME_PRIVATE_HUB_PATH,
    pin: "bg-teal-600 shadow-teal-600/50",
    glow: "group-hover:shadow-teal-400/60",
    card: "bg-teal-800/95 border-teal-500/40",
  },
  {
    title: "Operate Private",
    subtitle: "Business trusts & PMAs",
    icon: Building2,
    href: OPERATE_PRIVATE_HUB_PATH,
    pin: "bg-amber-700 shadow-amber-700/50",
    glow: "group-hover:shadow-amber-400/60",
    card: "bg-amber-900/95 border-amber-600/40",
  },
  {
    title: "Financial Freedom",
    subtitle: "Credit & private banking",
    icon: Wallet,
    href: FINANCIAL_FREEDOM_HUB_PATH,
    pin: "bg-fuchsia-700 shadow-fuchsia-700/50",
    glow: "group-hover:shadow-fuchsia-400/60",
    card: "bg-fuchsia-900/95 border-fuchsia-500/40",
  },
  {
    title: "Full Private Operator",
    subtitle: "Sovereign wealth & legacy",
    icon: Crown,
    href: MASTER_CLASS_PATH,
    pin: "bg-slate-700 shadow-slate-600/50",
    glow: "group-hover:shadow-white/30",
    card: "bg-slate-800/95 border-slate-500/40",
  },
];

/** Percent positions along the zig-zag road (left → right) */
const roadPositions = [
  { x: 6, y: 62 },
  { x: 22, y: 28 },
  { x: 38, y: 68 },
  { x: 54, y: 28 },
  { x: 70, y: 68 },
  { x: 92, y: 24 },
];

function buildRoadPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

const roadPathD = buildRoadPath(roadPositions);

function RoadmapMarker({
  stage,
  index,
  x,
  y,
  isActive,
  isStart,
  onHover,
  onLeave,
}: {
  stage: Stage;
  index: number;
  x: number;
  y: number;
  isActive: boolean;
  isStart: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = stage.icon;
  const cardAbove = y > 45;

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.08, type: "spring", stiffness: 260 }}
      className="absolute list-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Link
        href={stage.href}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onFocus={onHover}
        onBlur={onLeave}
        className={`group relative flex flex-col items-center outline-none ${
          isStart ? "z-20" : "z-10"
        }`}
        aria-label={`${stage.title}${stage.subtitle ? ` — ${stage.subtitle}` : ""}`}
      >
        {isStart && (
          <span className="mb-1.5 rounded-full bg-orange-500/90 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-white shadow-lg ring-2 ring-white/30">
            Start
          </span>
        )}

        <div className="relative">
          {isStart && (
            <span
              className="absolute inset-0 rounded-full bg-orange-400/40 animate-ping"
              aria-hidden
            />
          )}
          {isActive && (
            <span
              className={`absolute -inset-2 rounded-full blur-md opacity-70 ${stage.pin.split(" ")[0]}`}
              aria-hidden
            />
          )}
          <div
            className={`relative flex items-center justify-center rounded-full text-white shadow-xl ring-4 ring-white/25 transition-all duration-300 group-hover:scale-110 group-hover:ring-white/50 ${stage.pin} ${stage.glow} ${
              isStart ? "h-14 w-14 sm:h-16 sm:w-16" : "h-11 w-11 sm:h-12 sm:w-12"
            }`}
          >
            <Icon className={isStart ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5"} />
          </div>
          <span
            className={`absolute flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-slate-800 shadow-md ring-2 ring-white/80 ${
              isStart ? "-bottom-1 -right-1" : "-bottom-0.5 -right-0.5"
            }`}
          >
            {index + 1}
          </span>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: cardAbove ? 8 : -8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: cardAbove ? 6 : -6, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-none absolute z-30 w-44 sm:w-48 ${
                cardAbove ? "bottom-full mb-3" : "top-full mt-3"
              }`}
            >
              <div
                className={`rounded-xl border px-3 py-2.5 text-center shadow-2xl backdrop-blur-md ${stage.card}`}
              >
                <p className="text-[12px] sm:text-[13px] font-bold text-white leading-snug">
                  {stage.title}
                </p>
                {stage.subtitle && (
                  <p className="mt-0.5 text-[10px] sm:text-[11px] text-white/70 leading-snug">
                    {stage.subtitle}
                  </p>
                )}
                <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-white/80">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p
          className={`mt-2 hidden max-w-[7rem] text-center font-bold leading-tight text-white sm:block ${
            isStart ? "text-xs sm:text-sm" : "text-[11px]"
          } ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
        >
          {stage.title}
        </p>
      </Link>
    </motion.li>
  );
}

export default function LearningJourney() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-slate-900 overflow-x-hidden">
      {/* STAGE ROADMAP — The Full Path */}
      <section
        className="relative w-full pt-28 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/bg/bgc.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-blue-900/90 via-blue-800/50 to-blue-900/50" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center lg:text-left mb-8 sm:mb-4 lg:mb-1 max-w-2xl"
          >
            <p className="text-white/80 font-bold tracking-[0.2em] text-xs uppercase mb-3">
              The Full Path
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-blue-200 tracking-tight leading-[1.08]">
            Your Journey to Certification
            </h2>
            <p className="mt-3 text-blue-100/90 text-sm sm:text-base font-medium">
              Follow the road — hover each milestone to explore.
            </p>
          </motion.div>

          {/* Horizontal zig-zag roadmap */}
          <div className="relative w-full">
            {/* Desktop / tablet — winding road */}
            <div className="hidden sm:block relative w-full h-[340px] md:h-[380px] lg:h-[420px]">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <defs>
                  <filter id="road-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodOpacity="0.35" />
                  </filter>
                </defs>
                <motion.path
                  d={roadPathD}
                  fill="none"
                  stroke="rgba(30,41,59,0.85)"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#road-shadow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
                <motion.path
                  d={roadPathD}
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="0.6"
                  strokeDasharray="2 2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.15, ease: "easeInOut" }}
                />
              </svg>

              <ol className="relative h-full w-full m-0 p-0">
                {stagePath.map((stage, i) => {
                  const pos = roadPositions[i];
                  return (
                    <RoadmapMarker
                      key={stage.title}
                      stage={stage}
                      index={i}
                      x={pos.x}
                      y={pos.y}
                      isActive={activeStage === i}
                      isStart={i === 0}
                      onHover={() => setActiveStage(i)}
                      onLeave={() => setActiveStage(null)}
                    />
                  );
                })}
              </ol>

              {/* Finish flag */}
              <div
                className="absolute flex items-center gap-1.5 text-white/70"
                style={{ left: "96%", top: "12%", transform: "translate(-50%, -50%)" }}
              >
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider hidden md:inline">
                  Destination
                </span>
              </div>
            </div>

            {/* Mobile — vertical stepped path */}
            <ol className="sm:hidden relative space-y-0 m-0 p-0">
              {stagePath.map((stage, i) => {
                const Icon = stage.icon;
                const isLast = i === stagePath.length - 1;

                return (
                  <motion.li
                    key={stage.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="relative flex gap-4 pb-6 last:pb-0"
                  >
                    {!isLast && (
                      <div
                        className="absolute left-[1.65rem] top-12 bottom-0 w-px bg-linear-to-b from-white/40 to-white/10"
                        aria-hidden
                      />
                    )}

                    <Link
                      href={stage.href}
                      className={`group relative z-10 flex shrink-0 items-center justify-center rounded-full text-white shadow-xl ring-4 ring-white/20 transition-transform active:scale-95 ${stage.pin} ${
                        i === 0 ? "h-14 w-14" : "h-11 w-11"
                      }`}
                    >
                      {i === 0 && (
                        <span
                          className="absolute inset-0 rounded-full bg-orange-400/30 animate-ping"
                          aria-hidden
                        />
                      )}
                      <Icon className={i === 0 ? "h-6 w-6" : "h-5 w-5"} />
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-slate-800 shadow ring-2 ring-white/80">
                        {i + 1}
                      </span>
                    </Link>

                    <div className="min-w-0 flex-1 pt-1">
                      {i === 0 && (
                        <span className="mb-1 inline-block rounded-full bg-orange-500/90 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white">
                          Start Here
                        </span>
                      )}
                      <p className="font-bold text-white text-sm leading-snug">
                        {stage.title}
                      </p>
                      {stage.subtitle && (
                        <p className="mt-0.5 text-white/65 text-xs leading-snug">
                          {stage.subtitle}
                        </p>
                      )}
                      <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-200 group-hover:text-white transition-colors">
                        Explore <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* CTA + description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            <p className="text-white/70 text-sm sm:text-[15px] max-w-xl leading-relaxed text-center sm:text-left">
              Start in the community, then move through Become Private, Operate
              Private, and Financial Freedom — until you can run as a Full Private
              Operator with sovereign wealth and legacy in place.
            </p>
            <Link
              href="/masterclass-membership"
              className="inline-flex shrink-0 items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#2563EB] text-white text-sm font-bold hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-900/40 ring-4 ring-white/30 mx-auto sm:mx-0"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Course path — interactive four steps */}
      <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg/bgm.jpg')" }}
        />
        <div className="absolute inset-0 bg-white/40" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

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
              Each course builds on the last — hover a step to see how the
              path unlocks Book Smart &amp; Street Smart tracks.
            </motion.p>

            {/* Interactive progress rail */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.85 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-8 hidden sm:flex items-center justify-center gap-0 max-w-lg mx-auto"
              aria-hidden
            >
              {courseCards.map((card, i) => {
                const isLit =
                  activeCard === null ||
                  (activeCard !== null && i <= activeCard);
                return (
                  <React.Fragment key={card.step}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveCard(i)}
                      onMouseLeave={() => setActiveCard(null)}
                      onFocus={() => setActiveCard(i)}
                      onBlur={() => setActiveCard(null)}
                      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-black transition-all duration-300 ${
                        isLit
                          ? `${card.stepBg} text-white scale-110 shadow-lg ${card.glow}`
                          : "bg-white text-slate-400 border border-slate-200"
                      }`}
                      aria-label={`Highlight step ${card.step}: ${card.title}`}
                    >
                      {card.step}
                    </button>
                    {i < courseCards.length - 1 && (
                      <div className="h-0.5 w-10 sm:w-14 md:w-20 bg-slate-200 overflow-hidden rounded-full">
                        <motion.div
                          className={`h-full ${courseCards[i + 1].stepBg}`}
                          initial={false}
                          animate={{
                            width:
                              activeCard !== null && activeCard > i
                                ? "100%"
                                : activeCard === null
                                  ? "35%"
                                  : "0%",
                          }}
                          transition={{ duration: 0.35 }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 w-full">
            {courseCards.map((card, i) => {
              const Icon = card.icon;
              const isFocused = activeCard === i;
              const isDimmed = activeCard !== null && activeCard !== i;

              return (
                <motion.div
                  key={card.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.08, type: "spring", stiffness: 200 }}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={`relative flex flex-col transition-all duration-300 ${
                    isDimmed ? "opacity-45 scale-[0.98]" : "opacity-100 scale-100"
                  } ${isFocused ? "z-10" : "z-0"}`}
                >
                  {/* Animated connector */}
                  {i < courseCards.length - 1 && (
                    <motion.div
                      className="hidden xl:flex absolute -right-4 top-[32%] z-20 items-center justify-center translate-x-1/2 pointer-events-none"
                      animate={
                        isFocused
                          ? { x: [0, 4, 0], scale: [1, 1.12, 1] }
                          : { x: 0, scale: 1 }
                      }
                      transition={
                        isFocused
                          ? { repeat: Infinity, duration: 1.1, ease: "easeInOut" }
                          : { duration: 0.25 }
                      }
                    >
                      <span
                        className={`w-9 h-9 rounded-full border-2 bg-white flex items-center justify-center shadow-md transition-colors duration-300 ${
                          isFocused
                            ? `${card.ring} text-slate-800 border-current`
                            : "border-slate-300 text-slate-400"
                        }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.div>
                  )}

                  <Link
                    href={card.href}
                    className={`group relative flex flex-col h-full rounded-2xl border bg-white/90 backdrop-blur-md overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40 transition-all duration-300 ${
                      card.borderHover
                    } ${
                      isFocused
                        ? `border-transparent shadow-2xl ${card.glow} -translate-y-2`
                        : "border-white/80 shadow-lg shadow-slate-200/50 hover:-translate-y-1"
                    }`}
                  >
                    {/* Accent stripe */}
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-1 ${card.stepBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      aria-hidden
                    />

                    {/* Giant watermark number */}
                    <span
                      className="pointer-events-none absolute -right-2 -bottom-4 text-[7.5rem] font-black leading-none text-slate-900/[0.04] select-none group-hover:text-slate-900/[0.07] transition-colors"
                      aria-hidden
                    >
                      {card.step}
                    </span>

                    <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      />
                      <div
                        className={`absolute inset-0 bg-linear-to-t ${card.wash} to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300`}
                      />

                      {/* Step badge */}
                      {/* <motion.span
                        className={`absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full text-white text-sm font-bold shadow-lg ring-2 ring-white/80 ${card.stepBg}`}
                        animate={isFocused ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                        transition={
                          isFocused
                            ? { repeat: Infinity, duration: 1.4 }
                            : { duration: 0.2 }
                        }
                      >
                        {card.step}
                      </motion.span> */}

                      {/* Floating icon on hover */}
                      <span
                        className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-lg translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <div className="relative p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          className={`font-extrabold text-slate-900 text-lg leading-snug transition-colors ${card.titleHover}`}
                        >
                          {card.title}
                        </h3>
                      </div>

                      <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">
                        {card.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-transform duration-300 group-hover:scale-105 ${card.badge}`}
                        >
                          {card.modules}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 group-hover:text-slate-600 transition-colors">
                          Step {card.step}/4
                        </span>
                      </div>

                      <span
                        className={`mt-4 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-white text-sm font-bold shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:gap-3 ${card.btn}`}
                      >
                        Explore {card.title}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
