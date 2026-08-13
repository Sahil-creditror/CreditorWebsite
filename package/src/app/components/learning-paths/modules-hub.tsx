"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  PlayCircle,
  X,
  ArrowRight,
  ChevronRight,
  Puzzle,
  Network,
  Lightbulb,
  BookOpen,
  Zap,
  Sparkles,
  Check,
  Users,
  CalendarClock,
  Video,
  Smartphone,
  Infinity as InfinityIcon,
  Rewind,
} from "lucide-react";
import type { CoursePath } from "./data";

type Props = { course: CoursePath };
type SelectedModule = {
  slug: string;
  title: string;
  totalLessons: number;
  index: number;
};
type TrackKey = "book-smart" | "street-smart";

const MODULE_ICONS = [Puzzle, Network, Lightbulb];

const ACCENTS = [
  { bg: "#1e3a8a", ring: "#3b5fc0", glow: "rgba(37,99,235,0.3)", light: "#eff6ff", text: "#1e3a8a" },
  { bg: "#7c3aed", ring: "#a78bfa", glow: "rgba(124,58,237,0.3)", light: "#f5f3ff", text: "#7c3aed" },
  { bg: "#0e7490", ring: "#22d3ee", glow: "rgba(14,116,144,0.3)", light: "#ecfeff", text: "#0e7490" },
];

const TRACKS: {
  key: TrackKey;
  label: string;
  tag: string;
  icon: typeof Radio;
  image: string;
  blurb: string;
  detail: string;
  cta: string;
  features: { icon: typeof Radio; label: string }[];
}[] = [
  {
    key: "book-smart",
    label: "Book Smart",
    tag: "Live",
    icon: Radio,
    // TODO: swap in a dedicated Book Smart image when ready
    image: "/images/bg/cl1.png",
    blurb: "Real-time sessions with instructors, right on schedule.",
    detail: "Join instructors in real time — ask questions and learn as a group.",
    cta: "Join Live Lessons",
    features: [
      { icon: Users, label: "Live Q&A with instructors" },
      { icon: CalendarClock, label: "Fixed weekly schedule" },
      { icon: Video, label: "Session recordings included" },
    ],
  },
  {
    key: "street-smart",
    label: "Street Smart",
    tag: "On-Demand",
    icon: PlayCircle,
    // TODO: swap in a dedicated Street Smart image when ready
    image: "/images/bg/cl2.png",
    blurb: "Recorded lectures you can watch whenever it suits you.",
    detail: "Recorded lectures, ready whenever you are. Pause, rewind, repeat.",
    cta: "Watch Lectures",
    features: [
      { icon: Smartphone, label: "Watch on any device" },
      { icon: Rewind, label: "Learn at your own pace" },
      { icon: InfinityIcon, label: "Lifetime access to lectures" },
    ],
  },
];

/** Animated ring showing this track's share of the module's lessons. */
function LessonDial({
  value,
  total,
  colorFrom,
  colorTo,
}: {
  value: number;
  total: number;
  colorFrom: string;
  colorTo: string;
}) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const pct = total > 0 ? Math.min(value / total, 1) : 0;
  const gradientId = `dial-${colorFrom.replace("#", "")}-${colorTo.replace("#", "")}`;

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorFrom} />
            <stop offset="100%" stopColor={colorTo} />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" stroke="#eef2f7" strokeWidth="10" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - pct * c }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          key={value}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="text-3xl font-black tabular-nums text-slate-900"
        >
          {value}
        </motion.span>
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Lessons
        </span>
      </div>
    </div>
  );
}

/** Staggered, track-colored checklist used to fill out the detail panels. */
function FeatureChecklist({
  features,
  accentBg,
  accentLight,
  accentText,
}: {
  features: { icon: typeof Radio; label: string }[];
  accentBg: string;
  accentLight: string;
  accentText: string;
}) {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {features.map((f, idx) => (
        <motion.div
          key={f.label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + idx * 0.08, duration: 0.25 }}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
            style={{ background: accentLight, color: accentText }}
          >
            <f.icon className="w-3.5 h-3.5" />
          </span>
          <span className="flex-1 text-xs font-semibold text-slate-600">{f.label}</span>
          <Check className="w-3.5 h-3.5 shrink-0" style={{ color: accentBg }} />
        </motion.div>
      ))}
    </div>
  );
}

export default function ModulesHub({ course }: Props) {
  const totalModules = course.modules.length;

  const [selectedModule, setSelectedModule] = useState<SelectedModule | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TrackKey | null>(null);

  function openModuleModal(mod: SelectedModule) {
    setSelectedModule(mod);
    setSelectedTrack(null);
  }
  function closeAll() {
    setSelectedModule(null);
    setSelectedTrack(null);
  }

  const bookSmartItem = selectedModule
    ? course.bookSmart.items.find((m) => m.slug === selectedModule.slug)
    : null;
  const streetSmartItem = selectedModule
    ? course.streetSmart.items.find((m) => m.slug === selectedModule.slug)
    : null;

  const itemsByTrack: Record<TrackKey, { lessons: number } | null | undefined> = {
    "book-smart": bookSmartItem,
    "street-smart": streetSmartItem,
  };

  const totalTrackLessons = (bookSmartItem?.lessons ?? 0) + (streetSmartItem?.lessons ?? 0);
  const acc = selectedModule ? ACCENTS[(selectedModule.index - 1) % ACCENTS.length] : ACCENTS[0];
  const activeTrackMeta = selectedTrack ? TRACKS.find((t) => t.key === selectedTrack)! : null;
  const activeTrackItem = selectedTrack ? itemsByTrack[selectedTrack] : null;
  const bookMeta = TRACKS[0];
  const streetMeta = TRACKS[1];

  return (
    <>
      {/* ═══════════════════════ SECTION ═══════════════════════ */}
      <section className="relative w-full overflow-hidden py-16 sm:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg/bgc.jpg')" }}
        />
        <div className="absolute inset-0 bg-white/40 " />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 max-w-6xl mx-auto">
          {/* ── Header row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          >
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase text-[#2563EB] bg-blue-50 border border-blue-100 px-6 py-1.5 rounded-full mb-4">
                {course.title}
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Choose Your Module
              </h2>
              <p className="mt-3 text-slate-500 text-base max-w-sm">
                Select a module to explore your learning path — live or on-demand.
              </p>
            </div>
            <div className="flex items-center gap-5 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm shrink-0">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Modules</p>
                <p className="text-3xl font-extrabold text-slate-900 tabular-nums">{totalModules}</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Lessons</p>
                <p className="text-3xl font-extrabold text-[#2563EB] tabular-nums">
                  {course.modules.reduce((sum, m) => sum + m.totalLessons, 0)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Zigzag timeline ── */}
          <div className="relative flex flex-col gap-0">
            {course.modules.map((mod, i) => {
              const isLeft = i % 2 === 0;
              const Icon = MODULE_ICONS[i] ?? BookOpen;
              const rowAcc = ACCENTS[i] ?? ACCENTS[0];
              const isLast = i === totalModules - 1;

              return (
                <div key={mod.slug} className="relative">
                  {/* Row */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                    className={`flex items-center gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                  >
                    {/* Card side (44%) */}
                    <div className={`w-full sm:w-[44%] ${isLeft ? "sm:pr-8" : "sm:pl-8"}`}>
                      <button
                        onClick={() => openModuleModal({ ...mod, index: i + 1 })}
                        className="group relative w-full text-left focus:outline-none"
                      >
                        {/* Card */}
                        <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
                          {/* Coloured top bar */}
                          <div
                            className="h-1.5 w-full"
                            style={{ background: `linear-gradient(90deg, ${rowAcc.bg}, ${rowAcc.ring})` }}
                          />

                          {/* Module badge — top right corner */}
                          <div
                            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm"
                            style={{ background: `linear-gradient(135deg, ${rowAcc.bg}, ${rowAcc.ring})` }}
                          >
                            <Icon className="w-3 h-3" />
                            Module 
                          </div>

                          <div className="px-6 pt-5 pb-6">
                            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug pr-24 group-hover:text-[#2563EB] transition-colors duration-200">
                              {mod.title}
                            </h3>
                            <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                              Explore live and on-demand lessons across this module.
                            </p>

                            {/* Footer */}
                            <div className="mt-5 flex items-center justify-between">
                              <span
                                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                                style={{ background: rowAcc.light, color: rowAcc.text }}
                              >
                                <Zap className="w-3 h-3" />
                                {mod.totalLessons} Lessons
                              </span>
                              <span
                                className="inline-flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all duration-200"
                                style={{ color: rowAcc.text }}
                              >
                                Explore <ChevronRight className="w-4 h-4" />
                              </span>
                            </div>
                          </div>

                          {/* Decorative circle */}
                          <div
                            className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-10 pointer-events-none"
                            style={{ background: rowAcc.ring }}
                            aria-hidden
                          />
                        </div>
                      </button>
                    </div>

                    {/* Centre node (12%) */}
                    <div className="hidden sm:flex w-[12%] justify-center items-center relative z-10">
                      <motion.button
                        onClick={() => openModuleModal({ ...mod, index: i + 1 })}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.92 }}
                        className="relative flex items-center justify-center focus:outline-none"
                        style={{ width: 60, height: 60 }}
                        aria-label={`Open ${mod.title}`}
                      >
                        {/* Pulse */}
                        <motion.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                          className="absolute inset-0 rounded-full pointer-events-none"
                          style={{ background: rowAcc.glow }}
                          aria-hidden
                        />
                        {/* Dashed ring */}
                        <div
                          className="absolute inset-[6px] rounded-full border-2 border-dashed opacity-50"
                          style={{ borderColor: rowAcc.ring }}
                          aria-hidden
                        />
                        {/* Circle */}
                        <div
                          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-extrabold shadow-xl"
                          style={{ background: `linear-gradient(135deg, ${rowAcc.bg}, ${rowAcc.ring})` }}
                        >
                          {i + 1}
                        </div>
                      </motion.button>
                    </div>

                    {/* Spacer (44%) */}
                    <div className="hidden sm:block w-[44%]" />
                  </motion.div>

                  {/* Connector between cards */}
                  {!isLast && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.25, duration: 0.4 }}
                      className="relative hidden sm:flex justify-center py-4"
                    >
                      {/* Curved SVG connector */}
                      <svg
                        className="absolute left-0 right-0 w-full"
                        height="48"
                        viewBox="0 0 800 48"
                        fill="none"
                        preserveAspectRatio="none"
                        style={{ top: 0 }}
                      >
                        <path
                          d={
                            isLeft
                              ? "M 368 4 C 368 4, 400 44, 432 44"
                              : "M 432 4 C 432 4, 400 44, 368 44"
                          }
                          stroke="#bfdbfe"
                          strokeWidth="2"
                          strokeDasharray="6 5"
                          strokeLinecap="round"
                        />
                        {/* Arrow tip */}
                        {isLeft ? (
                          <path d="M 426 38 L 432 44 L 426 50" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        ) : (
                          <path d="M 374 38 L 368 44 L 374 50" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                      </svg>
                      {/* Mobile connector */}
                      <div className="sm:hidden flex flex-col items-center gap-1 py-2">
                        <div className="w-0.5 h-6 bg-blue-200 rounded-full" />
                        <ChevronRight className="w-4 h-4 text-blue-300 rotate-90" />
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ MODAL ═══════════════════════ */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md overflow-y-auto"
            onClick={closeAll}
          >
            {/*
              Three-column row:
              [Book Smart detail] [Picker — centered] [Street Smart detail]
            */}
            <div
              className="flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full max-w-5xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── LEFT: Book Smart detail ── */}
              <div className="w-full sm:w-[260px] shrink-0">
                <AnimatePresence>
                  {selectedTrack === "book-smart" && activeTrackMeta && (
                    <motion.div
                      key="detail-book-smart"
                      initial={{ opacity: 0, x: -28, scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="flex flex-col h-full bg-white rounded-[28px] shadow-2xl overflow-hidden"
                    >
                      {/* Image header */}
                      <div className="relative h-28 w-full overflow-hidden shrink-0">
                        <img
                          src={activeTrackMeta.image}
                          alt={activeTrackMeta.label}
                          className="h-full w-full object-cover"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: `linear-gradient(160deg, ${acc.bg}e6, ${acc.ring}99)` }}
                        />
                        <button
                          onClick={() => setSelectedTrack(null)}
                          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                          aria-label="Close"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-3 left-4">
                          <div className="flex items-center gap-1.5 text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">
                            <activeTrackMeta.icon className="w-3 h-3" />
                            {activeTrackMeta.tag}
                          </div>
                          <p className="text-white font-extrabold text-base leading-tight">{activeTrackMeta.label}</p>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex-1 flex flex-col items-center px-5 pt-5 pb-4 gap-4 bg-[#fafbff]">
                        <LessonDial
                          value={activeTrackItem?.lessons ?? 0}
                          total={totalTrackLessons}
                          colorFrom={acc.bg}
                          colorTo={acc.ring}
                        />
                        <p className="text-slate-400 text-xs text-center leading-relaxed max-w-[200px]">
                          {activeTrackMeta.detail}
                        </p>

                        <FeatureChecklist
                          features={bookMeta.features}
                          accentBg={acc.bg}
                          accentLight={acc.light}
                          accentText={acc.text}
                        />

                        {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-500">
                          Module {selectedModule.index}
                        </span> */}
                      </div>

                      <div className="px-4 pb-4 bg-[#fafbff]">
                        <a
                          href="https://lmsathena.com/signup"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] shadow-md"
                          style={{ background: `linear-gradient(90deg, ${acc.bg}, ${acc.ring})` }}
                        >
                          {activeTrackMeta.cta}
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── CENTER: Track picker ── */}
              <motion.div
                key="picker-panel"
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col w-full sm:w-[420px] shrink-0 bg-white rounded-[28px] shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div
                  className="relative px-6 pt-6 pb-7 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${acc.bg} 0%, ${acc.ring} 130%)` }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-16 -right-12 w-56 h-56 rounded-full bg-white pointer-events-none"
                    aria-hidden
                  />
                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-2 text-white/70 text-[11px] font-bold uppercase tracking-[0.24em] mb-2">
                      Module {selectedModule.index}
                    </div>
                    <button
                      onClick={closeAll}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors text-white"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <h2 className="relative text-white text-xl font-extrabold leading-tight pr-4 line-clamp-2">
                    {selectedModule.title}
                  </h2>
                  <p className="relative text-white/60 text-xs mt-1.5">
                    Pick how you want to learn this module
                  </p>
                </div>

                {/* Track cards */}
                <div className="flex flex-col gap-3 p-4 bg-[#fafbff]">
                  {TRACKS.map((t) => {
                    const active = selectedTrack === t.key;
                    return (
                      <button
                        key={t.key}
                        onClick={() => setSelectedTrack(active ? null : t.key)}
                        className={`group relative w-full text-left rounded-2xl overflow-hidden bg-white border-2 transition-all duration-200 ${
                          active ? "shadow-lg -translate-y-0.5" : "border-slate-100 hover:border-slate-200 hover:shadow-md"
                        }`}
                        style={active ? { borderColor: t.key === "book-smart" ? acc.bg : "#0f172a" } : undefined}
                      >
                        {/* Image */}
                        <div className="relative h-24 w-full overflow-hidden">
                          <img
                            src={t.image}
                            alt={t.label}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                t.key === "book-smart"
                                  ? `linear-gradient(115deg, ${acc.bg}cc, transparent 65%)`
                                  : "linear-gradient(115deg, #0f172acc, transparent 65%)",
                            }}
                          />
                          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-[9px] font-extrabold uppercase tracking-wider text-slate-700">
                            <t.icon className="w-3 h-3" />
                            {t.tag}
                          </span>
                          {active && (
                            <motion.span
                              layoutId="track-check"
                              className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full text-white shadow"
                              style={{ background: t.key === "book-smart" ? acc.bg : "#0f172a" }}
                            >
                              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.6 3.6 6.7-6.7a1 1 0 011.4 0z" clipRule="evenodd" />
                              </svg>
                            </motion.span>
                          )}
                        </div>
                        {/* Text */}
                        <div className="px-3.5 py-3">
                          <p className="font-extrabold text-slate-900 text-sm">{t.label}</p>
                          <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{t.blurb}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* ── RIGHT: Street Smart detail ── */}
              <div className="w-full sm:w-[260px] shrink-0">
                <AnimatePresence>
                  {selectedTrack === "street-smart" && activeTrackMeta && (
                    <motion.div
                      key="detail-street-smart"
                      initial={{ opacity: 0, x: 28, scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="flex flex-col h-full bg-white rounded-[28px] shadow-2xl overflow-hidden"
                    >
                      {/* Image header */}
                      <div className="relative h-28 w-full overflow-hidden shrink-0">
                        <img
                          src={activeTrackMeta.image}
                          alt={activeTrackMeta.label}
                          className="h-full w-full object-cover"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(160deg, #0f172ae6, #1e293b99)" }}
                        />
                        <button
                          onClick={() => setSelectedTrack(null)}
                          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                          aria-label="Close"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-3 left-4">
                          <div className="flex items-center gap-1.5 text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">
                            <activeTrackMeta.icon className="w-3 h-3" />
                            {activeTrackMeta.tag}
                          </div>
                          <p className="text-white font-extrabold text-base leading-tight">{activeTrackMeta.label}</p>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex-1 flex flex-col items-center px-5 pt-5 pb-4 gap-4 bg-[#fafbff]">
                        <LessonDial
                          value={activeTrackItem?.lessons ?? 0}
                          total={totalTrackLessons}
                          colorFrom="#0f172a"
                          colorTo="#475569"
                        />
                        <p className="text-slate-400 text-xs text-center leading-relaxed max-w-[200px]">
                          {activeTrackMeta.detail}
                        </p>

                        <FeatureChecklist
                          features={streetMeta.features}
                          accentBg="#0f172a"
                          accentLight="#f1f5f9"
                          accentText="#334155"
                        />

                        {/* <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-500">
                          Module {selectedModule.index}
                        </span> */}
                      </div>

                      <div className="px-4 pb-4 bg-[#fafbff]">
                        <a
                          href="https://lmsathena.com/signup"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] shadow-md"
                          style={{ background: "linear-gradient(90deg, #0f172a, #1e293b)" }}
                        >
                          {activeTrackMeta.cta}
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}