"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Video, ChevronRight, Radio, PlayCircle } from "lucide-react";
import { TRACK_ABOUT, type CoursePath } from "./data";

type Props = {
  course: CoursePath;
};

export default function LearningPathHub({ course }: Props) {
  const categories = [
    {
      ...TRACK_ABOUT["book-smart"],
      href: course.bookSmartPath,
      accent: "from-blue-600 to-indigo-600",
      icon: BookOpen,
      featureIcon: Radio,
      ctaClass:
        "bg-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/20",
    },
    {
      ...TRACK_ABOUT["street-smart"],
      href: course.streetSmartPath,
      accent: "from-slate-700 to-slate-900",
      icon: Video,
      featureIcon: PlayCircle,
      ctaClass:
        "bg-slate-800 text-white hover:bg-slate-900 shadow-md shadow-slate-800/20",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Full-bleed background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg/bgm.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/25" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-14">
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
            Choose Your Learning Path
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Two ways to learn — pick the format that fits you, then see modules
            and lessons for that path.
          </p>
        </motion.div>

        {/* Full-width two-column cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 w-full">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const FeatureIcon = cat.featureIcon;
            return (
              <motion.article
                key={cat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.1 }}
                className="w-full"
              >
                <Link
                  href={cat.href}
                  className="group flex flex-col sm:flex-row lg:flex-col xl:flex-row h-full min-h-[280px] bg-white/90 backdrop-blur-sm rounded-3xl border border-white/80 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-blue-200/80 transition-all duration-300 overflow-hidden"
                >
                  {/* Image side */}
                  <div className="relative w-full sm:w-[42%] lg:w-full xl:w-[42%] aspect-[16/11] sm:aspect-auto sm:min-h-[260px] lg:aspect-[16/10] xl:aspect-auto xl:min-h-[280px] bg-slate-100 overflow-hidden shrink-0">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                    <span
                      className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-linear-to-r ${cat.accent} shadow-md`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {cat.badge}
                    </span>
                  </div>

                  {/* Content side */}
                  <div className="flex flex-col flex-1 p-6 sm:p-7 lg:p-8 justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                          <FeatureIcon className="w-4.5 h-4.5" />
                        </span>
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight">
                            {cat.label}
                          </h3>
                          <p className="text-sm font-semibold text-blue-600">
                            {cat.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                        {cat.about}
                      </p>
                    </div>

                    <span
                      className={`mt-6 inline-flex items-center justify-center gap-1.5 w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${cat.ctaClass}`}
                    >
                      View {cat.label}
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
