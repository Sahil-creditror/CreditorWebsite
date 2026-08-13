"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CurriculumPanel from "./curriculum-panel";
import {
  getCoursePath,
  type CourseId,
  type TrackId,
} from "./data";

type Props = {
  courseId: CourseId;
  track: TrackId;
};

export default function TrackDetailPage({ courseId, track }: Props) {
  const course = getCoursePath(courseId);
  const isLive = track === "book-smart";

  return (
    <>
      <CurriculumPanel course={course} track={track} />
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <Link
            href="https://lmsathena.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-bold transition-colors shadow-lg ${
              isLive
                ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/25"
                : "bg-slate-800 hover:bg-slate-900 shadow-slate-800/25"
            }`}
          >
            {isLive ? "Join Live Lessons" : "Access Recorded Lectures"}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-3 text-xs text-slate-400">
            Access through Masterclass Membership
          </p>
        </motion.div>
      </section>
    </>
  );
}
