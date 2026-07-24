"use client";

import React, { useState } from "react";
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
  Check,
  type LucideIcon,
} from "lucide-react";
import {
  MASTER_CLASS_PATH,
  BECOME_PRIVATE_HUB_PATH,
  OPERATE_PRIVATE_HUB_PATH,
  FINANCIAL_FREEDOM_HUB_PATH,
} from "@/lib/coursePaths";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
type Stage = {
  number: number;
  title: string;
  subtitle: string;
  desc: string;
  bullets: string[];
  icon: LucideIcon;
  href: string;
  color: string;
  light: string;
  side: "left" | "right";
};

const stages: Stage[] = [
  {
    number: 1,
    title: "Join Creditor Academy",
    subtitle: "Your starting point",
    desc: "Step into the private world. Gain immediate access to the community and orientation materials.",
    bullets: ["Community access", "Orientation materials", "Private network entry"],
    icon: Users,
    href: "/masterclass-membership",
    color: "#f8fafc",
    light: "#3b82f6",
    side: "left",
  },
  {
    number: 2,
    title: "Masterclass Membership",
    subtitle: "Community + Intro lessons",
    desc: "Unlock foundational live lessons, recorded lectures, and structured weekly sessions.",
    bullets: ["Live & recorded lessons", "Weekly structured sessions", "Direct instructor access"],
    icon: GraduationCap,
    href: "/master-class",
    color: "#f3e8ff",
    light: "#5214e3ff",
    side: "right",
  },
  {
    number: 3,
    title: "Become Private",
    subtitle: "Status correction & sovereignty",
    desc: "Master secured party creditor status, political status correction, and sovereignty principles.",
    bullets: ["Secured party creditor", "Political status correction", "SOV 101 curriculum"],
    icon: Shield,
    href: BECOME_PRIVATE_HUB_PATH,
    color: "#ccfbf1",
    light: "#f5c858ff",
    side: "left",
  },
  {
    number: 4,
    title: "Operate Private",
    subtitle: "Business trusts & PMAs",
    desc: "Set up and operate business trusts, PMAs, and real estate structures professionally.",
    bullets: ["Business trust formation", "PMA setup & operation", "Real estate through trusts"],
    icon: Building2,
    href: OPERATE_PRIVATE_HUB_PATH,
    color: "#fef3c7",
    light: "#d97706",
    side: "right",
  },
  {
    number: 5,
    title: "Financial Freedom",
    subtitle: "Credit & private banking",
    desc: "Build business credit, court remedies, and PMA-based financial independence systems.",
    bullets: ["Business credit mastery", "Court remedies", "PMA-based banking"],
    icon: Wallet,
    href: FINANCIAL_FREEDOM_HUB_PATH,
    color: "#fae8ff",
    light: "#1d09f6ff",
    side: "left",
  },
  {
    number: 6,
    title: "Full Private Operator",
    subtitle: "Sovereign wealth & legacy",
    desc: "Operate with full sovereign wealth structures and certified private operator status.",
    bullets: ["Sovereign wealth structures", "Certified operator status", "Legacy & estate planning"],
    icon: Crown,
    href: MASTER_CLASS_PATH,
    color: "#f1f5f9",
    light: "#0f172a",
    side: "right",
  },
];

/* ─────────────────────────────────────────────────────────
   ANIMATED SPINE
───────────────────────────────────────────────────────── */
function Spine({ activeIndex, total }: { activeIndex: number | null; total: number }) {
  const pct = activeIndex === null ? 0 : ((activeIndex + 0.5) / total) * 100;
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-7 bottom-7 w-[3px] z-10 rounded-full overflow-hidden"
      style={{ background: "rgba(15, 23, 42, 0.1)" }}
      aria-hidden
    >
      <motion.div
        className="w-full rounded-full"
        style={{ background: "linear-gradient(to bottom, #2563eb, #7c3aed, #db2777)" }}
        animate={{ height: `${pct}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   HOVER BUBBLE — floats outside the card
───────────────────────────────────────────────────────── */
function HoverBubble({
  stage,
  side,
  visible,
}: {
  stage: Stage;
  side: "left" | "right";
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="bubble"
          initial={{ opacity: 0, x: side === "left" ? 16 : -16, scale: 0.88 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: side === "left" ? 10 : -10, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 340, damping: 26 }}
          className={`absolute top-1/2 -translate-y-1/2 z-50 w-60 pointer-events-none ${
            side === "left" ? "right-[calc(100%+16px)]" : "left-[calc(100%+16px)]"
          }`}
        >
          {/* Arrow tip pointing toward card */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 ${
              side === "left"
                ? "right-[-7px] border-l-[7px] border-y-[6px] border-y-transparent"
                : "left-[-7px] border-r-[7px] border-y-[6px] border-y-transparent"
            }`}
            style={{
              borderLeftColor: side === "left" ? "#ffffff" : "transparent",
              borderRightColor: side === "right" ? "#ffffff" : "transparent",
            }}
            aria-hidden
          />

          <div
            className="rounded-2xl px-4 py-4 shadow-xl border border-slate-200/80 bg-white"
            style={{
              boxShadow: `0 12px 32px rgba(15, 23, 42, 0.12)`,
            }}
          >
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
              Step {stage.number}
            </p>
            <p className="text-slate-900 font-extrabold text-sm leading-snug mb-1">
              {stage.title}
            </p>
            <p className="text-slate-600 text-xs leading-relaxed mb-3">{stage.desc}</p>

            {/* Bullets */}
            <ul className="space-y-1.5 mb-3">
              {stage.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-[11px] font-medium text-slate-700">
                  <span
                    className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: stage.light }}
                  >
                    <Check className="h-2 w-2" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="pt-2 border-t border-slate-100">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-extrabold"
                style={{ color: stage.light }}
              >
                Click to explore <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────
   STEP ROW
───────────────────────────────────────────────────────── */
function Step({
  stage,
  index,
  isActive,
  isCompleted,
  onHover,
  onLeave,
}: {
  stage: Stage;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = stage.icon;
  const isLeft = stage.side === "left";

  /* ── Number circle ── */
  const circle = (
    <div className="relative z-20 flex-shrink-0">
      <AnimatePresence>
        {isActive && (
          <motion.span
            key="ring"
            className="absolute -inset-3 rounded-full"
            style={{ border: `2px solid ${stage.light}` }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.7, 1.4, 1.4] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, repeat: Infinity }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          scale: isActive ? 1.15 : isCompleted ? 1.05 : 1,
          boxShadow: isActive
            ? `0 0 0 4px ${stage.light}22, 0 8px 20px ${stage.light}44`
            : isCompleted
            ? `0 0 0 2px ${stage.light}44`
            : "0 2px 8px rgba(0,0,0,0.08)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full font-black text-lg select-none border border-slate-200/60"
        style={{
          backgroundColor: isCompleted || isActive ? stage.light : "#ffffff",
          color: isCompleted || isActive ? "#ffffff" : "#1e293b",
        }}
      >
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.span
              key="check"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Check className="h-5 w-5 text-white" strokeWidth={3} />
            </motion.span>
          ) : isActive ? (
            <motion.span
              key="icon"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <Icon className="h-5 w-5 text-white" strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="num"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              {stage.number}
            </motion.span>
          )}
        </AnimatePresence>

        {index === 0 && !isActive && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: stage.light }}
            aria-hidden
          />
        )}
      </motion.div>
    </div>
  );

  /* ── Card ── */
  const card = (
    <div className="relative flex-1 max-w-xs">
      {/* Hover bubble — appears on the OUTER edge */}
      <HoverBubble stage={stage} side={isLeft ? "left" : "right"} visible={isActive} />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ delay: index * 0.07 + 0.1, type: "spring", stiffness: 200, damping: 22 }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <Link href={stage.href} className="block outline-none" aria-label={stage.title}>
          <motion.div
            animate={{
              scale: isActive ? 1.03 : 1,
              boxShadow: isActive
                ? `0 10px 25px -5px ${stage.light}33, 0 8px 10px -6px rgba(0, 0, 0, 0.05)`
                : "0 2px 8px rgba(0,0,0,0.04)",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="rounded-2xl px-5 py-4 border border-slate-200/80 transition-colors"
            style={{ backgroundColor: stage.color }}
          >
            <div className={`flex items-center gap-2.5 ${isLeft ? "flex-row-reverse" : "flex-row"}`}>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-xs"
                style={{ backgroundColor: stage.light }}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
                <p className="text-slate-900 font-extrabold text-sm sm:text-[15px] leading-snug">
                  {stage.title}
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5">{stage.subtitle}</p>
              </div>
            </div>

            {/* Hover hint */}
            <motion.div
              animate={{ opacity: isActive ? 1 : 0.6 }}
              className={`mt-2 flex items-center gap-1 text-[10px] font-bold ${
                isLeft ? "justify-end" : "justify-start"
              }`}
              style={{ color: stage.light }}
            >
              <ArrowRight className="h-2.5 w-2.5" />
              <span>Explore</span>
            </motion.div>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );

  const spacer = <div className="flex-1 max-w-xs" />;

  const connectorColor = isActive
    ? stage.light
    : isCompleted
    ? stage.light
    : "rgba(148, 163, 184, 0.3)";

  const connector = (
    <div className="hidden sm:flex items-center flex-shrink-0 gap-0">
      <motion.div className="h-px w-8" animate={{ backgroundColor: connectorColor }} transition={{ duration: 0.25 }} />
      <motion.div className="h-2 w-2 rounded-full" animate={{ backgroundColor: connectorColor, scale: isActive ? 1.5 : 1 }} transition={{ duration: 0.25 }} />
    </div>
  );
  const connectorBlank = <div className="hidden sm:block flex-shrink-0" style={{ width: 40 }} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 180, damping: 22 }}
      className="relative flex items-center gap-2 sm:gap-3 w-full"
    >
      {isLeft ? (
        <>{card}{connector}{circle}{connectorBlank}{spacer}</>
      ) : (
        <>{spacer}{connectorBlank}{circle}{connector}{card}</>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────── */
export default function LearningJourney() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main className="overflow-x-hidden bg-white">
      <section
        className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg/bgmm.jpg')" }}
      >
        {/* Subtle dark blue gradient from top down */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-700/40 via-slate-900/10 to-transparent pointer-events-none" 
          aria-hidden 
        />

        <div className="relative z-10 max-w-3xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-blue-600 font-bold tracking-[0.22em] text-xs uppercase mb-3">
              The Full Path
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Your Journey to Certification
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-md mx-auto font-medium">
              Six milestones — hover any step to preview, click to explore.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <Spine activeIndex={hovered} total={stages.length} />

            <div className="flex flex-col gap-9 sm:gap-11">
              {stages.map((stage, i) => (
                <Step
                  key={stage.number}
                  stage={stage}
                  index={i}
                  isActive={hovered === i}
                  isCompleted={hovered !== null && i < hovered}
                  onHover={() => setHovered(i)}
                  onLeave={() => setHovered(null)}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Link
              href="/masterclass-membership"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25 ring-4 ring-blue-50"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-3 text-slate-500 text-xs font-medium">
              Move through every step at your own pace.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}