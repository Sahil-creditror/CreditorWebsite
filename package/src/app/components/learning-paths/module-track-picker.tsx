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
  BookOpen,
  Radio,
  PlayCircle,
  ChevronRight,
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
      accent: "from-blue-600 to-indigo-700",
      FeatureIcon: Radio,
      ctaClass:
        "bg-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/20",
      lessons: course.bookSmart.items.find((m) => m.slug === moduleSlug)?.lessons ?? 0,
      sessions: course.bookSmart.items.find((m) => m.slug === moduleSlug)?.sessions ?? 0,
    },
    {
      id: "street-smart" as const,
      ...TRACK_ABOUT["street-smart"],
      href: `${course.hubPath}/${moduleSlug}/street-smart`,
      accent: "from-slate-700 to-slate-900",
      FeatureIcon: PlayCircle,
      ctaClass:
        "bg-slate-800 text-white hover:bg-slate-900 shadow-md shadow-slate-800/20",
      lessons: course.streetSmart.items.find((m) => m.slug === moduleSlug)?.lessons ?? 0,
      sessions: course.streetSmart.items.find((m) => m.slug === moduleSlug)?.sessions ?? 0,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F7F8FA]">
      {/* ── Hero strip ── */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900">
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

      {/* ── Track cards ── */}
      <div className="relative w-full px-4 sm:px-8 lg:px-14 py-12 sm:py-16">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg/bgc.jpg')" }}
        />
        <div className="absolute inset-0 bg-white/30" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8"
          >
            Choose Your Learning Path
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
            {tracks.map((track, i) => {
              const FeatureIcon = track.FeatureIcon;
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.1, type: "spring", stiffness: 200 }}
                >
                  <Link
                    href={track.href}
                    className="group flex flex-col sm:flex-row lg:flex-col xl:flex-row h-full min-h-[280px] bg-white/90 backdrop-blur-sm rounded-3xl border border-white/80 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-blue-200/80 transition-all duration-300 overflow-hidden"
                  >
                    {/* Image side */}
                    <div className="relative w-full sm:w-[42%] lg:w-full xl:w-[42%] aspect-[16/11] sm:aspect-auto sm:min-h-[260px] lg:aspect-[16/10] xl:aspect-auto xl:min-h-[280px] bg-slate-100 overflow-hidden shrink-0">
                      <Image
                        src={track.image}
                        alt={track.label}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <span
                        className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${track.accent} shadow-md`}
                      >
                        <FeatureIcon className="w-3.5 h-3.5" />
                        {track.badge}
                      </span>
                    </div>

                    {/* Content side */}
                    <div className="flex flex-col flex-1 p-6 sm:p-7 lg:p-8 justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                            <FeatureIcon className="w-4 h-4" />
                          </span>
                          <div>
                            <h3 className="font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight">
                              {track.label}
                            </h3>
                            <p className="text-sm font-semibold text-blue-600">
                              {track.subtitle}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                          {track.about}
                        </p>

                        {/* Lesson count for this module */}
                        <div className="mt-4 flex items-baseline gap-1.5">
                          <span className="text-3xl font-extrabold tabular-nums text-[#2563EB]">
                            {track.lessons}
                          </span>
                          <span className="text-sm font-semibold text-slate-500">
                            lessons in this module
                          </span>
                        </div>
                      </div>

                      <span
                        className={`mt-6 inline-flex items-center justify-center gap-1.5 w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${track.ctaClass}`}
                      >
                        View {track.label}
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
