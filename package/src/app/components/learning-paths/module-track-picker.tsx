"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Scale,
  Landmark,
  Gem,
  ArrowLeft,
  BookOpen,
  Radio,
  PlayCircle,
  ArrowRight,
  Compass,
  type LucideIcon,
} from "lucide-react";
import { TRACK_ABOUT, type CoursePath } from "./data";

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

export default function ModuleTrackPicker({ course, moduleSlug }: Props) {
  const Icon = ICONS[course.icon];

  const hubMod = course.modules.find((m) => m.slug === moduleSlug);
  const moduleIndex = (course.modules.findIndex((m) => m.slug === moduleSlug) ?? 0) + 1;
  const moduleTitle = hubMod?.title ?? moduleSlug;

  const tracks = [
    {
      id: "book-smart" as const,
      ...TRACK_ABOUT["book-smart"],
      href: `${course.hubPath}/${moduleSlug}/book-smart`,
      // Light blue styling definitions
      cardBg: "bg-gradient-to-b from-blue-100/80 via-blue-100/60 to-slate-100",
      accentText: "text-blue-700",
      titleText: "text-slate-900",
      bodyText: "text-slate-600",
      statNumberText: "text-slate-900",
      statLabelText: "text-slate-500",
      badgeBg: "bg-blue-100/80 text-blue-800 border-blue-200",
      borderStyle: "border-slate-200/80",
      ctaBg: "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20",
      FeatureIcon: Radio,
      lessons: course.bookSmart.items.find((m) => m.slug === moduleSlug)?.lessons ?? 0,
      sessions: course.bookSmart.items.find((m) => m.slug === moduleSlug)?.sessions ?? 0,
    },
    {
      id: "street-smart" as const,
      ...TRACK_ABOUT["street-smart"],
      href: `${course.hubPath}/${moduleSlug}/street-smart`,
      // Light gray styling definitions
      cardBg: "bg-gradient-to-b from-zinc-100 via-slate-100/50 to-zinc-100",
      accentText: "text-amber-800",
      titleText: "text-zinc-900",
      bodyText: "text-zinc-600",
      statNumberText: "text-zinc-900",
      statLabelText: "text-zinc-500",
      badgeBg: "bg-amber-100/80 text-amber-900 border-amber-300/60",
      borderStyle: "border-zinc-200/80",
      ctaBg: "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md shadow-amber-500/20",
      FeatureIcon: PlayCircle,
      lessons: course.streetSmart.items.find((m) => m.slug === moduleSlug)?.lessons ?? 0,
      sessions: course.streetSmart.items.find((m) => m.slug === moduleSlug)?.sessions ?? 0,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col">
      {/* ── Hero strip (Maintained dark aesthetic for header impact) ── */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 border-b border-slate-800">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg/bgc.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/40 to-transparent" />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-14 pt-28 pb-14 sm:pb-20">
          {/* Back link */}
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

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-3 text-white/60 text-sm sm:text-base max-w-xl"
              >
                Choose how you want to learn this module — live lessons or recorded lectures.
              </motion.p>
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

      {/* ── Section Header: Choose Your Learning Path ── */}
      <div className="w-full bg-slate-200/60 border-b border-slate-300/70 py-10 px-4 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-600/10 text-blue-700 border border-blue-600/20 mb-3">
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Learning Tracks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Choose Your Learning Path
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-lg">
            Select the format that best fits your schedule, goals, and preferred pace of study.
          </p>
        </motion.div>
      </div>

      {/* ── Full-Width Light Split Screen Track Picker ── */}
      <div className="relative flex-1 w-full grid grid-cols-1 lg:grid-cols-2">
        {tracks.map((track, index) => {
          const FeatureIcon = track.FeatureIcon;

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className={`relative group min-h-[500px] lg:min-h-[calc(100vh-420px)] flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden border-b lg:border-b-0 lg:border-r ${track.borderStyle} last:border-none ${track.cardBg}`}
            >
              {/* Card Header Content */}
              <div className="relative z-10 flex flex-col items-start">
                {/* Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${track.badgeBg}`}
                >
                  <FeatureIcon className="w-4 h-4" />
                  <span>{track.badge}</span>
                </div>

                {/* Subtitle & Title */}
                <p className={`font-bold text-sm tracking-wider uppercase mt-6 mb-1 ${track.accentText}`}>
                  {track.subtitle}
                </p>
                <h3 className={`text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight ${track.titleText}`}>
                  {track.label}
                </h3>
              </div>

              {/* Card Footer Content */}
              <div className="relative z-10 flex flex-col gap-8 mt-12">
                {/* Description */}
                <p className={`text-base sm:text-lg leading-relaxed max-w-xl font-normal ${track.bodyText}`}>
                  {track.about}
                </p>

                {/* Lessons Stats & CTA Row */}
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t ${track.borderStyle}`}>
                  <div>
                    <span className={`block text-3xl sm:text-4xl font-black tabular-nums ${track.statNumberText}`}>
                      {track.lessons}
                    </span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${track.statLabelText}`}>
                      Lessons Available
                    </span>
                  </div>

                  {/* Action Link Button */}
                  <Link
                    href={track.href}
                    className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-sm tracking-wide transition-all duration-300 group/btn ${track.ctaBg}`}
                  >
                    <span>Explore Track</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}