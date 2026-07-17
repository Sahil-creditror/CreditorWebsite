"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Scale,
  Landmark,
  Gem,
  ArrowLeft,
  Radio,
  PlayCircle,
  BookOpen,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { TRACK_ABOUT, type CoursePath, type TrackId } from "./data";

const ICONS: Record<CoursePath["icon"], LucideIcon> = {
  graduation: GraduationCap,
  scale: Scale,
  landmark: Landmark,
  gem: Gem,
};

type Props = {
  course: CoursePath;
  moduleSlug: string;
};

export default function ModuleDetail({ course, moduleSlug }: Props) {
  const [track, setTrack] = useState<TrackId>("book-smart");

  const Icon = ICONS[course.icon];
  const isBookSmart = track === "book-smart";

  const curriculum = isBookSmart ? course.bookSmart : course.streetSmart;
  const modItem = curriculum.items.find((m) => m.slug === moduleSlug);
  const hubMod = course.modules.find((m) => m.slug === moduleSlug);
  const moduleTitle = modItem?.title ?? hubMod?.title ?? moduleSlug;
  const moduleIndex = (course.modules.findIndex((m) => m.slug === moduleSlug) ?? 0) + 1;

  return (
    <div className="min-h-screen w-full bg-[#F7F8FA]">

      {/* ── Hero strip — full bleed, sits behind the fixed navbar ── */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900">
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg/bgc.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/40 to-transparent" />
        {/* Glow orb */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-14 pt-28 pb-14 sm:pb-20">
          {/* Back link — inside the hero, clears navbar */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href={course.hubPath}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {course.title}
            </Link>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            {/* Left — breadcrumb + title */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                </div>
                <span className="text-white/60 text-xs font-bold uppercase tracking-[0.18em]">
                  {course.title}
                </span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/60 text-xs font-bold uppercase tracking-[0.18em]">
                  Module {moduleIndex}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug max-w-2xl"
              >
                {moduleTitle}
              </motion.h1>
            </div>

            {/* Right — total lessons badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 shrink-0"
            >
              <BookOpen className="w-5 h-5 text-blue-300" />
              <div>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">
                  Total Lessons
                </p>
                <p className="text-white text-2xl font-extrabold tabular-nums leading-none mt-0.5">
                  {hubMod?.totalLessons ?? "—"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Track switcher + content ── */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-18">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg/bgc.jpg')" }}
        />
        <div className="absolute inset-0 bg-white/30" />

        {/* Toggle row */}
        <div className="relative z-10">
          <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-3 mb-10"
        >
          {(["book-smart", "street-smart"] as TrackId[]).map((id) => {
            const active = track === id;
            const TrackIcon = id === "book-smart" ? Radio : PlayCircle;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTrack(id)}
                className={`relative flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold transition-all duration-250 ${
                  active
                    ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/30"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-700 shadow-sm"
                }`}
              >
                <TrackIcon className="w-4 h-4" />
                {TRACK_ABOUT[id].label}
                {active && (
                  <motion.span
                    layoutId="track-pill"
                    className="absolute inset-0 rounded-full bg-[#2563EB] -z-10"
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Split layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={track}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch"
          >
            {/* ── Left: track info panel ── */}
            <div className="relative rounded-3xl overflow-hidden flex flex-col">
              {/* Image — shorter */}
              <div className="relative w-full h-40 sm:h-48 lg:h-56 shrink-0">
                <Image
                  src={TRACK_ABOUT[track].image}
                  alt={TRACK_ABOUT[track].label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                {/* Badge */}
                <span
                  className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${
                    isBookSmart
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                      : "bg-gradient-to-r from-slate-700 to-slate-900"
                  } shadow-md`}
                >
                  {isBookSmart ? <Radio className="w-3 h-3" /> : <PlayCircle className="w-3 h-3" />}
                  {TRACK_ABOUT[track].badge}
                </span>
              </div>

              {/* Text below image — grows to fill remaining height */}
              <div className="flex-1 bg-white border border-slate-100 rounded-b-3xl px-7 py-6 flex flex-col">
                <h3 className="text-xl font-extrabold text-slate-900">
                  {TRACK_ABOUT[track].label}
                </h3>
                <p className="mt-1 text-sm font-semibold text-blue-600">
                  {TRACK_ABOUT[track].subtitle}
                </p>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                  {TRACK_ABOUT[track].about}
                </p>

                {/* Feature bullets */}
                <ul className="mt-5 space-y-2.5 flex-1">
                  {(isBookSmart
                    ? [
                        "Live sessions with instructors in real time",
                        "Ask questions and get immediate feedback",
                        "Structured weekly schedule to stay on track",
                      ]
                    : [
                        "Study entirely on your own schedule",
                        "Pause, rewind and replay any lesson",
                        "Lifetime access to all recorded lectures",
                      ]
                  ).map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white text-[10px] font-black ${
                        isBookSmart ? "bg-[#2563EB]" : "bg-slate-700"
                      }`}>
                        ✓
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Bottom divider */}
                {/* <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${isBookSmart ? "bg-[#2563EB]" : "bg-slate-600"}`} />
                  <p className="text-xs text-slate-400 font-medium">
                    {isBookSmart ? "Live · Interactive · Scheduled" : "On-Demand · Flexible · Self-Paced"}
                  </p>
                </div> */}
              </div>
            </div>

            {/* ── Right: module lessons panel — full height card with CTA inside ── */}
            {modItem ? (
              <motion.div
                key={`lesson-card-${track}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className={`relative w-full rounded-3xl overflow-hidden flex flex-col ${
                  isBookSmart
                    ? "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"
                    : "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
                } shadow-xl`}
              >
                {/* Animated top highlight bar */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-0.5 ${
                    isBookSmart
                      ? "bg-gradient-to-r from-blue-300 via-white to-blue-300"
                      : "bg-gradient-to-r from-slate-400 via-white to-slate-400"
                  }`}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                />

                {/* Watermark number */}
                <span
                  className="pointer-events-none absolute -right-6 -bottom-8 text-[14rem] font-black leading-none text-white/[0.05] select-none"
                  aria-hidden
                >
                  {modItem.lessons}
                </span>

                {/* Top label row */}
                <div className="flex items-center justify-between px-8 pt-8 pb-0">
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.18em]">
                    This Module
                  </p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isBookSmart ? "bg-white/15 text-white" : "bg-white/10 text-white/80"
                  }`}>
                    {isBookSmart ? <Radio className="w-3 h-3" /> : <PlayCircle className="w-3 h-3" />}
                    {TRACK_ABOUT[track].label}
                  </span>
                </div>

                {/* Module title */}
                <div className="px-8 pt-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-[0.18em] mb-1.5">
                      Module {moduleIndex}
                    </p>
                    <h4 className="text-white font-extrabold text-2xl sm:text-3xl leading-snug">
                      {moduleTitle}
                    </h4>
                  </div>

                  {/* Big lesson count — with glow highlight */}
                  <div className="py-8 flex items-end gap-4">
                    {/* Glow ring behind the number */}
                    <div className="relative flex items-end">
                      <motion.span
                        animate={{ opacity: [0.25, 0.55, 0.25] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        className={`absolute inset-0 rounded-full blur-2xl -z-10 ${
                          isBookSmart ? "bg-blue-300" : "bg-slate-400"
                        }`}
                        aria-hidden
                      />
                      <motion.span
                        key={`num-${track}`}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="text-7xl sm:text-8xl lg:text-9xl font-extrabold tabular-nums text-white leading-none drop-shadow-lg"
                      >
                        {modItem.lessons}
                      </motion.span>
                    </div>
                    <div className="mb-3">
                      <p className="text-white/80 text-xl font-semibold leading-none">
                        lessons
                      </p>
                      <p className="text-white/40 text-xs mt-1.5">
                        {TRACK_ABOUT[track].subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA — pinned inside card at bottom */}
                <div className={`px-8 py-7 border-t ${isBookSmart ? "border-white/15" : "border-white/10"} flex flex-col sm:flex-row items-start sm:items-center gap-4`}>
                  <Link
                    href="https://lmsathena.com/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-sm font-bold shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:bg-slate-100"
                    style={{ color: isBookSmart ? "#2563EB" : "#1e293b" }}
                  >
                    {isBookSmart ? "Join Live Lessons" : "Access Recorded Lectures"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-white/40 text-xs">
                    Access through Masterclass Membership
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="rounded-3xl bg-white border border-slate-200 flex items-center justify-center p-10 text-center">
                <p className="text-slate-400 text-sm">
                  No lesson data available for this track.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
