"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBrain,
  FaChalkboardTeacher,
  FaChartPie,
  FaGraduationCap,
} from "react-icons/fa";

type Particle = {
  id: number;
  width: string;
  height: string;
  top: string;
  left: string;
  background: string;
  opacity: number;
  duration: number;
  rotation: number;
  x: number;
  y: number;
};

export default function AthenaLMSLaunchpad() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const marqueeItems = [
    "AI-Powered Insights",
    "SCORM Compliant",
    "Whitelabel Dashboard",
    "Gamified Learning Paths",
    "Automated Grading",
    "Multi-Tenant Architecture",
  ];

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction to Athena LMS"
      className="relative overflow-hidden py-16 md:py-24 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg/bgmm.jpg')" }}
        aria-hidden
      />

      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 -z-10 opacity-95"
        style={{
          background:
            "linear-gradient(180deg, rgba(239,246,255,0.8) 0%, rgba(219,234,254,0.72) 38%, rgba(191,219,254,0.58) 100%)",
          backgroundSize: "200% 200%",
        }}
        aria-hidden
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-block"
            >
              <span className="inline-flex items-center rounded-full border border-blue-200/80 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 backdrop-blur-md">
                Meet Athena LMS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              style={{ WebkitFontSmoothing: "antialiased" }}
            >
              Smarter Learning.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg"
            >
              Athena LMS brings course creation, learner engagement, and performance insights into one modern platform for enterprise training.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a
                href="https://lmsathena.com/"
                className="group inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 sm:w-auto"
              >
                Explore Athena
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/70 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-800 backdrop-blur-md transition-all hover:bg-white/80 sm:w-auto"
              >
                View Features
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              ref={marqueeRef}
              className="marquee-container mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-3 backdrop-blur-md"
            >
              <div className="flex flex-wrap items-center justify-center" style={{ gap: isMobile ? "0.75rem" : "1rem" }}>
                {marqueeItems.map((item) => (
                  <span
                    key={item}
                    className="flex items-center whitespace-nowrap text-xs font-medium text-slate-700 sm:text-sm"
                  >
                    <span className="mr-2 text-cyan-500">✦</span>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
            <FeatureCard
              Icon={FaChalkboardTeacher}
              title="Build Faster"
              desc="Create polished lessons, quizzes, and pathways with less effort."
              color="from-blue-500 to-sky-500"
            />
            <FeatureCard
              Icon={FaBrain}
              title="Learn Smarter"
              desc="Use AI-powered suggestions to guide progress and improve outcomes."
              color="from-violet-500 to-fuchsia-500"
            />
            <FeatureCard
              Icon={FaChartPie}
              title="Track Better"
              desc="Measure completion, engagement, and performance in one place."
              color="from-emerald-500 to-teal-500"
            />
          </motion.div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="rounded-3xl border border-white/70 bg-white/55 p-5 backdrop-blur-md shadow-lg shadow-blue-100/40 sm:p-6"
            >
              <div className="mb-4 flex items-start gap-4 pt-12">
                <div className="shrink-0 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 p-3 text-white shadow-md pt-">
                  <FaGraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">A cleaner, modern learning flow</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Athena combines authoring, delivery, analytics, and governance in a layout designed to feel simple, premium, and easy to scan.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700">
                  Interactive course paths
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700">
                  AI-driven learner insights
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-medium text-slate-700">
                  Enterprise team control
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44 }}
              className="rounded-3xl border border-white/20 bg-slate-900/90 p-5 text-white shadow-xl"
            >
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Flow</div>
              <div className="space-y-3">
                <StripCard step="01" title="Create" desc="Build structured content." color="bg-blue-500" />
                <StripCard step="02" title="Launch" desc="Deliver at scale." color="bg-purple-500" />
                <StripCard step="03" title="Measure" desc="Track growth clearly." color="bg-emerald-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .particles-container {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

function FeatureCard({
  Icon,
  title,
  desc,
  color,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/70 bg-white/55 p-5 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/50">
      <div className={`mb-4 inline-flex rounded-2xl bg-linear-to-r ${color} p-3 text-white shadow-sm transition-transform duration-300 group-hover:rotate-3`}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h4 className="mb-1 text-base font-semibold text-slate-900">{title}</h4>
        <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function StripCard({ step, title, desc, color }: { step: string; title: string; desc: string; color: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className={`${color} flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm`}>
        {step}
      </div>
      <div>
        <h4 className="text-xs font-bold text-white">{title}</h4>
        <p className="mt-0.5 text-[11px] leading-snug text-slate-300">{desc}</p>
      </div>
    </div>
  );
}