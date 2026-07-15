"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Scale,
  Landmark,
  Gem,
  type LucideIcon,
} from "lucide-react";
import {
  TRACK_ABOUT,
  getTrackCurriculum,
  type CoursePath,
  type TrackId,
} from "./data";

const ICONS: Record<CoursePath["icon"], LucideIcon> = {
  graduation: GraduationCap,
  scale: Scale,
  landmark: Landmark,
  gem: Gem,
};

type Props = {
  course: CoursePath;
  track: TrackId;
};

export default function CurriculumPanel({ course, track }: Props) {
  const [activeModule, setActiveModule] = useState<number>(1);
  const curriculum = getTrackCurriculum(course, track);
  const modeLabel = TRACK_ABOUT[track].modeLabel;
  const Icon = ICONS[course.icon];

  const shortDesc =
    course.description.length > 72
      ? `${course.description.slice(0, 69)}...`
      : course.description;

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F7F8FA]">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 lg:p-10 w-full"
        >
          {/* Header */}
          <div className="flex gap-4 items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
              <Icon className="w-7 h-7 text-violet-700" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {course.title}
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-slate-500 leading-snug max-w-3xl">
                {shortDesc}
              </p>
              <p className="mt-2 text-sm sm:text-base">
                <span className="font-bold text-[#2563EB] tabular-nums">
                  {curriculum.modules}
                </span>
                <span className="text-slate-400"> modules · </span>
                <span className="font-bold text-[#2563EB] tabular-nums">
                  {curriculum.lessons}
                </span>
                <span className="text-slate-400"> lessons</span>
              </p>
            </div>
          </div>

          {/* Book Smart / Street Smart toggles */}
          <div className="mt-6 flex flex-wrap gap-2.5 max-w-md">
            {(["book-smart", "street-smart"] as TrackId[]).map((id) => {
              const active = track === id;
              const href =
                id === "book-smart"
                  ? course.bookSmartPath
                  : course.streetSmartPath;
              return (
                <Link
                  key={id}
                  href={href}
                  className={`flex-1 min-w-[140px] text-center py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-700"
                  }`}
                >
                  {TRACK_ABOUT[id].label}
                </Link>
              );
            })}
          </div>

          {/* About track */}
          <p className="mt-5 text-sm sm:text-base text-slate-500 leading-relaxed border-t border-slate-100 pt-5 max-w-3xl">
            {TRACK_ABOUT[track].about}
          </p>

          {/* Modules — horizontal on desktop */}
          <div className="mt-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
              Modules
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {curriculum.items.map((mod, i) => {
                const isActive = activeModule === mod.id;
                return (
                  <motion.button
                    key={`${track}-${mod.id}`}
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setActiveModule(mod.id)}
                    className={`w-full text-left rounded-2xl px-5 py-5 transition-all duration-200 min-h-[120px] flex flex-col justify-between ${
                      isActive
                        ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/30"
                        : "bg-white text-slate-800 border border-slate-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    <p
                      className={`font-bold text-base sm:text-lg leading-snug line-clamp-2 ${
                        isActive ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {mod.title}
                    </p>

                    <div
                      className={`mt-4 flex items-baseline gap-1.5 flex-wrap ${
                        isActive ? "text-white" : ""
                      }`}
                    >
                      <span
                        className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${
                          isActive ? "text-white" : "text-[#2563EB]"
                        }`}
                      >
                        {mod.sessions}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          isActive ? "text-blue-100" : "text-slate-500"
                        }`}
                      >
                        {modeLabel}
                      </span>
                      <span
                        className={`text-sm ${
                          isActive ? "text-blue-200" : "text-slate-300"
                        }`}
                      >
                        ·
                      </span>
                      <span
                        className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${
                          isActive ? "text-white" : "text-[#2563EB]"
                        }`}
                      >
                        {mod.lessons}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          isActive ? "text-blue-100" : "text-slate-500"
                        }`}
                      >
                        lessons
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
