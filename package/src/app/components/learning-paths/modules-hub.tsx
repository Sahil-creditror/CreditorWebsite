"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";
import type { CoursePath } from "./data";

type Props = {
  course: CoursePath;
};

export default function ModulesHub({ course }: Props) {
  const totalModules = course.modules.length;

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg/bgmm.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-14 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase mb-3">
            {course.title}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Choose Your Module
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            {totalModules} modules — click any module to explore its lessons.
          </p>

          {/* Stats row */}
          <div className="mt-6 inline-flex items-center gap-6 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl px-7 py-4 shadow-sm">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                Modules
              </p>
              <p className="text-2xl font-extrabold tabular-nums text-slate-900">
                {totalModules}
              </p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                Total Lessons
              </p>
              <p className="text-2xl font-extrabold tabular-nums text-[#2563EB]">
                {course.modules.reduce((sum, m) => sum + m.totalLessons, 0)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Module Cards Grid - Pyramid Arrangement */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-center max-w-6xl mx-auto">
          {course.modules.map((mod, i) => {
            // Determine middle card logic for 3-column pyramid effect
            const isMiddle =
              totalModules === 3 ? i === 1 : i === Math.floor(totalModules / 2);

            return (
              <motion.div
                key={mod.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.06 + i * 0.08,
                  type: "spring",
                  stiffness: 200,
                }}
                className={`w-full ${
                  isMiddle ? "xl:-translate-y-4 xl:scale-105 z-20" : "z-10"
                }`}
              >
                <Link
                  href={`${course.hubPath}/${mod.slug}`}
                  className={`group relative flex flex-col h-full rounded-3xl transition-all duration-300 overflow-hidden p-7 sm:p-8 backdrop-blur-md ${
                    isMiddle
                      ? "bg-white/95 border-2 border-blue-500/80 shadow-2xl shadow-blue-500/15 hover:shadow-blue-500/25 hover:border-blue-600"
                      : "bg-white/85 border border-white/80 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-blue-300 hover:bg-white/95"
                  } hover:-translate-y-1`}
                >
                  {/* Accent highlight bar on top for middle, side for others */}
                  <span
                    className={`absolute bg-[#2563EB] transition-all duration-300 ${
                      isMiddle
                        ? "top-0 left-0 right-0 h-1.5 opacity-100"
                        : "left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100"
                    }`}
                    aria-hidden
                  />

                  {/* Header Row: Badge & Featured tag */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                        isMiddle
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                          : "bg-blue-50 text-[#2563EB] group-hover:bg-blue-600 group-hover:text-white"
                      }`}
                    >
                      <BookOpen className="w-6 h-6" />
                    </span>

                  
                  </div>

                  {/* Module Label */}
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">
                    Module {i + 1}
                  </p>

                  {/* Title */}
                  <h3
                    className={`font-extrabold text-slate-900 leading-snug group-hover:text-[#2563EB] transition-colors flex-1 ${
                      isMiddle ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                    }`}
                  >
                    {mod.title}
                  </h3>

                  {/* Divider */}
                  <div className="my-6 border-t border-slate-100" />

                  {/* Bottom Stats & CTA */}
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <span className="text-3xl font-black tabular-nums text-slate-900 group-hover:text-[#2563EB] transition-colors">
                        {mod.totalLessons}
                      </span>
                      <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Lessons
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB] group-hover:gap-2.5 transition-all duration-200 bg-blue-50/80 px-4 py-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white">
                      <span>Explore</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}