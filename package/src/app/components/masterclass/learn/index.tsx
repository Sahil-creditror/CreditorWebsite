"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaArrowRight,
  FaLock,
  FaClock,
  FaFileDownload,
  FaHeart,
} from "react-icons/fa";

type Phase = {
  title: string;
  subtitle?: string;
  bullets: string[];
  icon: React.ReactNode;
};

const phases: Phase[] = [
  {
    title: "Phase 1: Trust Formation",
    subtitle: "Set the foundation for private wealth.",
    bullets: [
      "Form your own UBOT Business Trust (template included)",
      "Lawfully exit public business registration systems",
      "Protect your assets & avoid tax and liability traps",
      "Understand private contracts & lawful operations",
    ],
    icon: <FaLock className="text-lg" aria-hidden />,
  },
  {
    title: "Phase 2: Tier 1 Business Credit Optimization",
    subtitle: "Build your fundable business profile—without using your SSN.",
    bullets: [
      "Set up your business for credit (DUNS, business address, phone, etc.)",
      "Apply for real Tier 1 vendor accounts & revolving credit lines",
      "Build credit fast using strategic layering",
      "Fix and structure public-facing profiles without PG",
    ],
    icon: <FaClock className="text-lg" aria-hidden />,
  },
  {
    title: "Phase 3: Private Merchant Processing",
    subtitle: "Accept payments without shutdown risks or banks.",
    bullets: [
      "Set up private, non-KYC merchant accounts",
      "Sell online or in person using private payment gateways",
      "Build payment flows for info products, services, eCom, and more",
      "Avoid censorship, chargebacks, and frozen funds",
    ],
    icon: <FaFileDownload className="text-lg" aria-hidden />,
  },
];

export default function MasterclassRedesignPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMuted = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const container = "max-w-8xl mx-auto px-10";
  const sectionSpacing = "py-16"; // consistent vertical rhythm
  const primaryGradient = "from-[#60A5FA] to-[#1E3A8A]";

  // --- NEW: use Courses page colors for the "What you'll learn" (phases) section ---
  const phasesWrapper = "bg-lightgray dark:bg-darkblack py-20 md:py-40";

  return (
    <main className={`min-h-screen bg-white text-slate-900 antialiased`}> 
      {/* HERO */}
        <section className={`${container} ${sectionSpacing} bg-white dark:bg-[#151922]`}>
    <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* VIDEO (Left) */}
        <motion.div
        id="video-section"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg bg-slate-50 dark:bg-slate-800"
        >
        <div className="w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
            className="w-full h-full"
            src="https://drive.google.com/file/d/1KKlV8_rSO7eW0oMmPRUjc6tuf-X4bUnL/preview"
            title="Intro Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>
        </div>
        </motion.div>

        {/* Content (Right) */}
        <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        >
        <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600 block" />
            Exclusive • Limited Seats
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight font-extrabold mb-6 text-slate-900 dark:text-white">
            Build your <span className={`bg-clip-text text-transparent bg-gradient-to-r ${primaryGradient}`}>Private Business</span> Empire — modern, compliant, and sovereign.
            </h1>

            {/* Subtext */}
            <p className="text-slate-700 dark:text-slate-300 mb-6">
            A refined three-phase system for founders who want legal protection, fundable credit, and private payment flows. Templates, walkthroughs, and proven playbooks included.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
            <a href="#enroll" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1E3A8A] text-white font-semibold shadow hover:scale-[1.02] transition">
                Reserve Seat <FaArrowRight />
            </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                <FaFileDownload />
                </div>
                <div>
                <div className="font-semibold text-slate-900 dark:text-white">Templates + Checklists</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Contracts, trust docs, and vendor lists</div>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                <FaLock />
                </div>
                <div>
                <div className="font-semibold text-slate-900 dark:text-white">Private Payments</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Gateways, flow design, fraud avoidance</div>
                </div>
            </div>
            </div>
        </div>
        </motion.div>

    </div>
    </section>

      {/* PHASES - updated with colorful accents & hover animations */}
      <section className={phasesWrapper}>
        <div className={container}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto mb-12"
                >
                <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-gradient-x">
                    Your Step-by-Step Blueprint
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
                    A compact, practical path from <span className="font-semibold text-blue-500 dark:text-blue-400">formation → credit → private payments</span>. Each phase includes <span className="font-semibold text-indigo-500 dark:text-indigo-400">templates, vendor lists, and done-for-you checklists</span>.
                </p>
            </motion.div>
            <div className="flex flex-col lg:flex-row gap-8">
            {/* Nav */}
            <div className="lg:w-1/4">
                <div className="sticky top-28 space-y-4">
                {phases.map((p, idx) => (
                    <button
                    key={idx}
                    onClick={() => setActivePhase(idx)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-3
                        ${
                        activePhase === idx
                            ? 'bg-gradient-to-r from-blue-400 to-indigo-500 border border-indigo-300 text-white shadow-lg scale-105'
                            : 'bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-white/90 hover:scale-105'
                        }`}
                    >
                    <div
                        className={`p-3 rounded-full transition-colors duration-300 ${
                        activePhase === idx
                            ? 'bg-white text-blue-500'
                            : 'bg-blue-50 text-blue-600 dark:bg-slate-700 dark:text-white'
                        }`}
                    >
                        {p.icon}
                    </div>
                    <div className="flex-1">
                        <div className="font-semibold">{`Phase ${idx + 1}`}</div>
                        <div className="text-sm mt-1 opacity-75 text-slate-700 dark:text-white/75">
                        {p.title.split(":")[1].trim()}
                        </div>
                    </div>
                    </button>
                ))}
                </div>
            </div>

            {/* Content */}
            <div className="lg:w-3/4">
                <AnimatePresence mode="wait">
                <motion.div
                    key={activePhase}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                    className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                    <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-slate-700 dark:to-slate-800 text-indigo-700 dark:text-white text-sm font-medium mb-3">
                        Phase {activePhase + 1}
                        </div>
                        <h3 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">
                        {phases[activePhase].title}
                        </h3>
                        <p className="text-slate-700 dark:text-white/90">
                        {phases[activePhase].subtitle}
                        </p>
                    </div>
                    <div className="text-6xl font-extrabold text-slate-200">{`0${activePhase + 1}`}</div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {phases[activePhase].bullets.map((b, i) => (
                        <div
                        key={i}
                        className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-md"
                        >
                        <div className="mt-1 text-blue-500 dark:text-blue-400">
                            <FaCheckCircle />
                        </div>
                        <p className="text-slate-700 dark:text-white/90">{b}</p>
                        </div>
                    ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                    {/* Add CTA buttons if needed */}
                    </div>
                </motion.div>
                </AnimatePresence>
            </div>
            </div>
        </div>
      </section>

      {/* ENROLL (form removed as requested) */}
      <section id="enroll" className={`${container} ${sectionSpacing} bg-white dark:bg-[#151922]`}>
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="grid lg:grid-cols-2">
                {/* Left Content */}
                <div className="p-10 bg-white dark:bg-slate-900">
                    <div className="max-w-lg">
                    <h3 className="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                        Join the Masterclass
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed">
                        Secure lifetime access to recordings, templates, and private guides. Designed for real operators — <span className="font-semibold text-blue-500 dark:text-blue-400">builders, sellers, and founders</span> who want control.
                    </p>

                    <div className="space-y-4 mb-8">
                        {[
                        { icon: <FaLock />, title: "Lifetime Access", subtitle: "Return anytime — materials updated" },
                        { icon: <FaFileDownload />, title: "All Templates", subtitle: "Trusts, contracts, vendor lists" },
                        { icon: <FaClock />, title: "Private Payment Flows", subtitle: "Resilient, low-risk payment design" },
                        ].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <div className={`p-3 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-300 transition-all duration-300 hover:from-blue-200 hover:to-indigo-300`}>
                            {item.icon}
                            </div>
                            <div>
                            <div className="font-semibold text-slate-900 dark:text-white">{item.title}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">{item.subtitle}</div>
                            </div>
                        </div>
                        ))}
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-sm inline-flex items-center gap-3">
                        <FaHeart className="text-blue-600 dark:text-blue-400" />
                        <div className="text-slate-700 dark:text-slate-400">
                        Secure enrollment. We respect your privacy and protect your data.
                        </div>
                    </div>
                    </div>
                </div>

                {/* Right CTA */}
                <div
                    className="p-10 flex items-center justify-center"
                    style={{
                    backgroundImage: "url('/images/home/services/master.jpg')",
                    }}
                >
                    <div className="w-full max-w-sm p-8 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-lg bg-cover bg-center bg-no-repeat relative transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    {/* Optional overlay for better text visibility */}
                    <div className="absolute inset-0 bg-white/30 dark:bg-black/60 rounded-2xl"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Reserve your spot
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 mt-2 mb-6 text-lg leading-relaxed">
                        No form here — click to go to the secure checkout / scheduled page.
                        </p>
                        <a
                        href="#"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1E3A8A] text-white font-semibold transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                        Reserve My Spot <FaArrowRight />
                        </a>
                    </div>
                    </div>
                </div>
                </div>
        </div>
      </section>
      {/* NOTE: footer/copyright removed as requested */}
    </main>
  );
}
