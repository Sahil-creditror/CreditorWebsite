"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Scale,
  Landmark,
  Gem,
  ArrowLeft,
  Radio,
  PlayCircle,
  ArrowRight,
  Check,
  BookOpen,
  Clock,
  Monitor,
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
  track: TrackId;
};

export default function ModuleTrackDetail({ course, moduleSlug, track }: Props) {
  const Icon = ICONS[course.icon];
  const isBookSmart = track === "book-smart";
  const TrackIcon = isBookSmart ? Radio : PlayCircle;
  const trackInfo = TRACK_ABOUT[track];

  const curriculum = isBookSmart ? course.bookSmart : course.streetSmart;
  const modItem = curriculum.items.find((m) => m.slug === moduleSlug);
  const hubMod = course.modules.find((m) => m.slug === moduleSlug);
  const moduleTitle = modItem?.title ?? hubMod?.title ?? moduleSlug;
  const moduleIndex = (course.modules.findIndex((m) => m.slug === moduleSlug) ?? 0) + 1;
  const lessonCount = modItem?.lessons ?? 0;

  const bullets = isBookSmart
    ? [
        "Live sessions with instructors in real time",
        "Ask questions and get immediate feedback",
        "Structured weekly schedule to stay on track",
      ]
    : [
        "Study entirely on your own schedule",
        "Pause, rewind and replay any lesson",
        "Lifetime access to all recorded lectures",
      ];

  const stats = [
    { icon: BookOpen, label: "Total Lessons", value: String(lessonCount) },
    { icon: isBookSmart ? Clock : Monitor, label: "Format", value: trackInfo.subtitle },
    { icon: TrackIcon, label: "Type", value: isBookSmart ? "Live" : "On-Demand" },
  ];

  return (
    <div className="w-full bg-white">

      {/* ══════════════════════════════════════════
          HERO — full bleed dark gradient + image
      ══════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {/* <Image
            src={trackInfo.image}
            alt={trackInfo.label}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          /> */}
          {/* Dark overlay gradient */}
          <div
            className={`absolute inset-0 ${
              isBookSmart
                ? "bg-gradient-to-br from-[#030d2a]/95 via-[#0a1f5c]/98 to-[#0a1f5c]/90"
                : "bg-gradient-to-br from-[#0a0a0a]/95 via-[#1a1a2e]/90 to-[#16213e]/85"
            }`}
          />
        </div>

        {/* Glow accents */}
        <div
          className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-30 ${
            isBookSmart ? "bg-blue-600" : "bg-slate-500"
          }`}
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 bg-indigo-600"
          aria-hidden
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-24 pb-12">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 flex-wrap text-xs font-medium mb-10"
          >
            <Link href={course.hubPath} className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              {course.title}
            </Link>
            <span className="text-white/20">/</span>
            <Link href={`${course.hubPath}/${moduleSlug}`} className="text-white/40 hover:text-white/80 transition-colors">
              {moduleTitle}
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/70">{trackInfo.label}</span>
          </motion.div>

          {/* Track badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5"
          >
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white ${
                isBookSmart
                  ? "bg-blue-600/50 border border-blue-400/30"
                  : "bg-white/10 border border-white/15"
              }`}
            >
              <TrackIcon className="w-3.5 h-3.5" />
              {trackInfo.badge} · {trackInfo.label}
            </span>
          </motion.div> */}

          {/* Module title */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="flex items-start gap-3 mb-3"
          >
            <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
              <Icon className="w-4 h-4 text-white" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-white/45 text-xs font-bold uppercase tracking-widest mb-1">
                {course.title} · Module {moduleIndex}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
                {moduleTitle}
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/55 text-base max-w-2xl ml-11 mb-10"
          >
            {trackInfo.about}
          </motion.p>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="ml-11 flex flex-wrap items-center gap-3"
          >
            {stats.map(({ icon: StatIcon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5"
              >
                <StatIcon className="w-4 h-4 text-white/50" />
                <div>
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest leading-none">{label}</p>
                  <p className="text-white font-extrabold text-sm leading-tight mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CONTENT — full width sections
      ══════════════════════════════════════════ */}
      {/* background image wrapper */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg/bgmm.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-white/40" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* ── What you get ── */}
        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="py-14 border-b border-slate-100"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
            What's Included
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {bullets.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`flex flex-col gap-3 rounded-2xl px-6 py-5 border ${
                  isBookSmart
                    ? "bg-blue-50/60 border-blue-100"
                    : "bg-slate-50 border-slate-200/60"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl text-white ${
                    isBookSmart ? "bg-[#2563EB]" : "bg-slate-800"
                  }`}
                >
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                </span>
                <p className="text-slate-700 text-sm font-semibold leading-snug">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.section> */}

        {/* ── Lesson count feature ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="py-14 border-b border-slate-100"
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-16">

            {/* Number side */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
                {isBookSmart ? "Live Sessions" : "Recorded Lectures"}
              </p>
              <motion.span
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
                className={`text-[9rem] sm:text-[11rem] font-extrabold tabular-nums leading-none ${
                  isBookSmart ? "text-[#2563EB]" : "text-slate-800"
                }`}
              >
                {lessonCount}
              </motion.span>
              <p className="text-slate-500 text-lg font-semibold mt-2">
                {isBookSmart ? "live lessons" : "recorded lectures"}
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-slate-300 self-stretch" />
            <div className="block lg:hidden h-px w-full bg-slate-100" />

            {/* Detail side */}
            <div className="flex flex-col justify-center gap-6 flex-1">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                  {isBookSmart ? "Learn Live. Ask. Grow." : "Learn at Your Own Pace."}
                </h2>
                <p className="text-slate-500 text-[15px] leading-relaxed">
                  {isBookSmart
                    ? `This module contains ${lessonCount} live lessons delivered by instructors in real time. Join each session, interact directly, and follow a structured learning path designed to get you results fast.`
                    : `This module contains ${lessonCount} recorded lectures you can watch anytime. Pause, rewind, and replay at your own pace with lifetime access on LMS Athena.`}
                </p>
              </div>

              {/* Inline stats */}
              <div className="flex flex-wrap gap-6">
                {[
                  { label: "Module", value: `#${moduleIndex}` },
                  { label: "Lessons", value: String(lessonCount) },
                  { label: "Platform", value: "LMS Athena" },
                  { label: "Access", value: "Membership" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
                    <p className={`text-base font-extrabold mt-0.5 ${isBookSmart ? "text-[#2563EB]" : "text-slate-800"}`}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── CTA section ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-14"
        >
          <div
            className={`relative overflow-hidden rounded-3xl px-8 sm:px-14 py-12 flex flex-col sm:flex-row items-center justify-between gap-8 ${
              isBookSmart
                ? "bg-gradient-to-br from-[#1a3faa] via-[#2563EB] to-[#1d4ed8]"
                : "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"
            }`}
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 bg-white pointer-events-none" aria-hidden />

            <div className="relative z-10">
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                Ready to start?
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                {isBookSmart ? "Join Live Lessons" : "Access Recorded Lectures"}
              </h3>
              <p className="mt-1.5 text-white/55 text-sm">
                {moduleTitle} · {lessonCount} {isBookSmart ? "live sessions" : "lectures"}
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center sm:items-end gap-2 shrink-0">
              <Link
                href="https://lmsathena.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white font-bold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl"
                style={{ color: isBookSmart ? "#2563EB" : "#0f172a" }}
              >
                {isBookSmart ? "Join Live Lessons" : "Watch Lectures"}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-white/40 text-xs">Access through Masterclass Membership</p>
            </div>
          </div>
        </motion.section>

      </div>{/* end content sections */}
      </div>{/* end bg wrapper */}
    </div>
  );
}
