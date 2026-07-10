"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  Variants,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import CourseVideoPlayer from "@/app/components/shared/CourseVideoPlayer";
import {
  FaCheckCircle,
  FaArrowRight,
  FaClock,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaUserSecret,
  FaCrown,
  FaUserCheck,
  FaBrain,
  FaMoneyBillWave,
  FaLandmark,
  FaVideo,
  FaCalendarAlt,
} from "react-icons/fa";

interface WebinarBootcampProps {
  title: string;
  badgeText?: string;
  description: string;
  imageSrc?: string;
  youtubeVideoId?: string;
  driveVideoId?: string;
  driveViewUrl?: string;
  videoPosterSrc?: string;
  features: {
    title: string;
    description: string;
    iconName: string;
  }[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  tactical: <FaUserSecret />,
  shield: <FaShieldAlt />,
  banking: <FaChartLine />,
  status: <FaUserCheck />,
  crown: <FaCrown />,
  mindset: <FaBrain />,
  wealth: <FaMoneyBillWave />,
  investing: <FaChartLine />,
  legacy: <FaLandmark />,
};

const getIcon = (name: string): React.ReactNode => {
  return ICON_MAP[name] || <FaCheckCircle />;
};

const SESSION_STATS = [
  { icon: FaVideo, label: "Live Session", value: "Interactive" },
  { icon: FaClock, label: "Duration", value: "~2 Hours" },
  { icon: FaCalendarAlt, label: "Format", value: "Bootcamp" },
];

const REGISTERED_TARGET = 127;
const SEATS_TOTAL = 150;

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

const WebinarBootcamp: React.FC<WebinarBootcampProps> = ({
  title,
  badgeText = "Live Bootcamp",
  description,
  imageSrc,
  youtubeVideoId,
  driveVideoId,
  driveViewUrl,
  videoPosterSrc,
  features,
}) => {
  const hasVideo = Boolean(youtubeVideoId?.trim() || driveVideoId?.trim());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [spotsHovered, setSpotsHovered] = useState(false);

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const registeredCount = useCountUp(REGISTERED_TARGET, statsInView);

  const visualRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleVisualMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const resetTilt = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (isPaused || features.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 4500);
    return () => clearInterval(id);
  }, [isPaused, features.length]);

  const activeFeature = features[activeIndex] ?? features[0];
  const fillPercent = Math.round((REGISTERED_TARGET / SEATS_TOTAL) * 100);

  // Structural Framer Motion Orchestrator Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section className="relative w-full overflow-hidden py-16 lg:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg/bgm.jpg')" }}
        aria-hidden
      />
      {/* <div
        className="pointer-events-none absolute inset-0 bg-white/75 dark:bg-slate-950/80"
        aria-hidden
      /> */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/5 dark:from-blue-500/10 dark:to-transparent blur-3xl opacity-70" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/5 dark:from-indigo-500/10 dark:to-transparent blur-3xl opacity-70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
        >
          
          {/* Column 1: Media Presentation Deck Asset */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 order-1 lg:order-2 w-full"
            style={{ perspective: 1200 }}
          >
            <motion.div
              ref={visualRef}
              onMouseMove={handleVisualMouseMove}
             
              className="relative w-full"
            >
              {hasVideo ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-2 shadow-xl shadow-slate-200/80 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-none">
                  <CourseVideoPlayer
                    title={`${title} overview`}
                    youtubeId={youtubeVideoId}
                    driveFileId={driveVideoId}
                    driveViewUrl={driveViewUrl}
                    posterSrc={videoPosterSrc}
                  />
                </div>
              ) : imageSrc ? (
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/80 dark:border-slate-800/80 dark:shadow-none transform transition-transform duration-500 ">
                  <Image
                    src={imageSrc}
                    alt={`${title} bootcamp`}
                    width={800}
                    height={1000}
                    className="h-[360px] sm:h-[440px] lg:h-[500px] w-full object-cover bg-slate-100 dark:bg-slate-900"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Floating Action Glass Chips */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-5 top-5 rounded-xl border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md shadow-sm"
                  >
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Registrations Open
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-5 right-5 rounded-xl border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md shadow-sm"
                  >
                    {features.length} Core Modules
                  </motion.div>

                  {/* Active Spotlight Presenter Feature Overlay */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35 }}
                      className="absolute bottom-5 left-5 max-w-[240px] rounded-xl border border-white/25 bg-slate-950/40 p-4 backdrop-blur-md shadow-lg"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-0.5">
                        Now exploring
                      </p>
                      <p className="text-sm font-black text-white leading-snug">{activeFeature.title}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <div className="relative flex min-h-[380px] lg:min-h-[460px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br from-white to-slate-50 p-8 text-center shadow-xl shadow-slate-200/50 dark:border-slate-800/80 dark:from-slate-900 dark:to-slate-900/40 dark:shadow-none group">
                  <div className="pointer-events-none absolute inset-0 opacity-30 flex items-center justify-center">
                    <div className="absolute h-64 w-64 rounded-full border border-indigo-100 dark:border-indigo-950 animate-[spin_30s_linear_infinite]" />
                    <div className="absolute h-48 w-48 rounded-full border border-blue-100 dark:border-blue-950 animate-[spin_20s_linear_infinite_reverse]" />
                  </div>
                  <div className="relative z-10 max-w-sm">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl text-indigo-600 shadow-md border border-slate-100 dark:bg-slate-800 dark:text-indigo-400 dark:border-slate-700/50 group-hover:-translate-y-1 transition-transform duration-300">
                      <FaClock />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Session Starting Soon
                    </h3>
                    <p className="mb-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Secure your spot in the queue. Limited seating capacity allocation applies for this dynamic event workspace.
                    </p>
                    <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold text-indigo-700 border border-indigo-100/80 dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-900/40">
                      High Demand Expected
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Column 2: Action Content Typography Panel */}
          <div 
            className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Live Context Heading Tag Badge */}
            {/* <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-400 text-xs font-bold tracking-wide uppercase shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                </span>
                {badgeText}
              </span>
            </motion.div> */}

            <motion.h2 
              variants={itemVariants}
              className="mb-4 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              Join the{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                {title} Bootcamp
              </span>
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="mb-6 max-w-xl text-base font-medium leading-relaxed text-slate-600 md:text-lg dark:text-slate-300"
            >
              {description}
            </motion.p>

            {/* Interactive Tabbed Features Segment */}
            <motion.div variants={itemVariants} className="mb-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                What you&apos;ll master
              </p>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <motion.button
                      key={feature.title}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-left text-xs font-bold tracking-wide transition-all ${
                        isActive
                          ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                          : "border-slate-200/60 bg-white text-slate-700 hover:border-indigo-200 hover:bg-slate-50 dark:border-slate-800/80 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-900"
                      }`}
                      aria-pressed={isActive}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm transition-colors ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {getIcon(feature.iconName)}
                      </span>
                      <span className="hidden sm:inline">{feature.title}</span>
                      <span className="sm:hidden">{feature.title.split(" ")[0]}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Focused Active Showcase Module Container */}
            <motion.div variants={itemVariants} className="mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border border-slate-200/60 bg-white/80 p-4 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/40"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm text-white shadow-sm">
                      {getIcon(activeFeature.iconName)}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {activeFeature.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {activeFeature.description}
                  </p>
                  <div className="mt-3.5 flex gap-1.5">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-1 rounded-full transition-all ${
                          index === activeIndex
                            ? "w-6 bg-indigo-600 dark:bg-indigo-400"
                            : "w-1 bg-slate-200 hover:bg-indigo-200 dark:bg-slate-800 dark:hover:bg-indigo-950"
                        }`}
                        aria-label={`Show feature ${index + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Metric Parameter Metadata Matrix */}
            {/* <motion.div variants={itemVariants} className="mb-8 grid grid-cols-3 gap-3">
              {SESSION_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200/50 bg-white/40 px-3 py-2.5 text-center backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-900/20"
                >
                  <stat.icon className="mx-auto mb-1 text-indigo-600 dark:text-indigo-400 text-sm" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">
                    {stat.label}
                  </p>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </motion.div> */}

            {/* Conversion CTA Matrix Panel */}
            <motion.div 
              ref={statsRef} 
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row sm:items-center border-t border-slate-200/60 dark:border-slate-800/60 pt-6"
            >
              <Link href="/webinar" className="group relative inline-flex w-full sm:w-auto">
                <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-30 blur transition duration-300 group-hover:opacity-50" />
                <span className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3 text-sm font-bold text-white shadow-md transition-colors group-hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200">
                  Register Now
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1 duration-200" />
                </span>
              </Link>

              <div
                className="flex-1 rounded-xl border border-slate-200/60 bg-white/50 p-3.5 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-900/30"
                onMouseEnter={() => setSpotsHovered(true)}
                onMouseLeave={() => setSpotsHovered(false)}
              >
                <div className="mb-1.5 flex items-center justify-between text-xs font-bold tracking-wide">
                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <FaUsers className="text-indigo-600 dark:text-indigo-400" />
                    Seats filling fast
                  </span>
                  <motion.span
                    animate={{ scale: spotsHovered ? 1.03 : 1 }}
                    className="text-slate-900 dark:text-white font-extrabold"
                  >
                    {registeredCount}+ registered
                  </motion.span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200/60 dark:bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={statsInView ? { width: `${fillPercent}%` } : { width: 0 }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                </div>
                <p className="mt-1.5 text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wide">
                  {SEATS_TOTAL - REGISTERED_TARGET} spots remaining — reserve yours today
                </p>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default WebinarBootcamp;