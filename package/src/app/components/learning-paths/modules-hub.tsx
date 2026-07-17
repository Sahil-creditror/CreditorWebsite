"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { CoursePath } from "./data";

type Props = {
  course: CoursePath;
};

export default function ModulesHub({ course }: Props) {
  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg/bgmm.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/30" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase mb-3">
            {course.title}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Choose Your Module
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            {course.modules.length} modules — click any module to see its lessons.
          </p>

          {/* Stats row */}
          <div className="mt-6 inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl px-7 py-4 shadow-sm">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                Modules
              </p>
              <p className="text-2xl font-extrabold tabular-nums text-slate-900">
                {course.modules.length}
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

        {/* Module cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {course.modules.map((mod, i) => (
            <motion.div
              key={mod.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 + i * 0.08, type: "spring", stiffness: 200 }}
            >
              <Link
                href={`${course.hubPath}/${mod.slug}`}
                className="group relative flex flex-col h-full rounded-2xl border border-white/80 bg-white/90 backdrop-blur-sm shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-blue-200/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden p-7"
              >
                {/* Accent stripe on hover */}
                <span
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden
                />

                {/* Module number badge */}
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                  <BookOpen className="w-5 h-5" />
                </span>

                {/* Module number label */}
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-1">
                  Module {i + 1}
                </p>

                {/* Title */}
                <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-[#2563EB] transition-colors flex-1">
                  {mod.title}
                </h3>

                {/* Lesson count */}
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold tabular-nums text-[#2563EB]">
                    {mod.totalLessons}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">lessons</span>
                </div>

                {/* CTA row */}
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB] group-hover:gap-2.5 transition-all duration-200">
                  View lessons
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
