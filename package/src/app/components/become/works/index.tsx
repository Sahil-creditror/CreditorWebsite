"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar,
  FiUsers,
  FiBookOpen,
  FiCreditCard,
  FiMessageCircle,
  FiBook,
  FiPercent,
  FiCalendar,
  FiFileText,
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiShield,
} from "react-icons/fi";

const plan = {
  id: "masterclass",
  name: "Masterclass Membership",
  priceCurrent: 69,
  priceOriginal: 147,
  short:
    "Gain the exact tools, mentorship, and sovereign community required to live and operate completely in the private side starting today.",
  badge: "Limited locked-in rate",
  features: [
    { text: "Live Classes, Monday–Friday", icon: FiCalendar },
    { text: "Step-by-Step Private Plan", icon: FiFileText },
    { text: "Connect with a Like-Minded Community", icon: FiUsers },
    { text: "Intro Lessons Across All Premium Courses", icon: FiBookOpen },
    { text: "Pay-As-You-Go Flexibility", icon: FiCreditCard },
    { text: "Private Community Groups", icon: FiMessageCircle },
    { text: "Starter Resource Library", icon: FiBook },
    { text: "Exclusive Member Discounts", icon: FiPercent },
  ],
};

type Step = {
  id: number;
  title: string;
  tagline: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "1. Access",
    tagline: "Secure Private Footing",
    description:
      "Get everything you need to transition seamlessly into the private side. Gain step-by-step guidance, early-stage mentorship, and join an empowering, locked community to start operating securely.",
  },
  {
    id: 2,
    title: "2. Fuel",
    tagline: "Initialize Capitalization",
    description:
      'Load your custom "Creditor Card" right inside the secure platform hub. Use it on-demand to unlock highly tailored courses, interactive workshops, and specialized legal/operational tools at your own pace.',
  },
  {
    id: 3,
    title: "3. Execute",
    tagline: "Sovereign Operations",
    description:
      "Follow our master educational roadmap to ultimate functional sovereignty, strict asset protection, and real wealth management. Break free from public dependencies and step into operational liberty.",
  },
];

function InteractiveBackground({
  mouseX,
  mouseY,
}: {
  mouseX: number;
  mouseY: number;
}) {
  const parallaxX = (mouseX - 0.5) * 24;
  const parallaxY = (mouseY - 0.5) * 16;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out will-change-transform"
        style={{
          backgroundImage: "url('/images/bg/bgmm.jpg')",
          transform: `translate(${parallaxX}px, ${parallaxY}px) scale(1.08)`,
        }}
      />
      <motion.div
        className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-blue-300/60 blur-3xl"
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl"
        animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <svg
        className="absolute bottom-0 left-0 w-full opacity-30"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
          fill="url(#wave-grad)"
          animate={{
            d: [
              "M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z",
              "M0,70 C360,30 720,100 1080,50 C1260,70 1380,90 1440,70 L1440,120 L0,120 Z",
              "M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="wave-grad" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function PricingRedesign() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 text-slate-900 lg:py-20"
    >
      <InteractiveBackground mouseX={mouse.x} mouseY={mouse.y} />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        
        {/* Header - Shifted Center-Left Asymmetric */}
        <motion.header
          className="mb-12 mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
         
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Invest in Sovereignty.
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Unlock your entry path into the Masterclass ecosystem. Gain access to the operational roadmap, premium tools, and community-guided resources at your own speed.
          </p>
        </motion.header>

        {/* Dynamic Multi-Step Pipeline Section */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {steps.map((step, idx) => {
            const isSelected = idx === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setIsAutoplay(false);
                  setActiveStep(idx);
                }}
                className={`relative flex flex-col items-start rounded-2xl border p-5 text-left transition-all duration-300 backdrop-blur-md ${
                  isSelected
                    ? "border-blue-300 bg-white/90 shadow-md shadow-blue-500/5"
                    : "border-white/40 bg-white/30 hover:border-white/80 hover:bg-white/50"
                }`}
              >
                <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? "text-blue-600" : "text-slate-400"}`}>
                  {step.title}
                </span>
                <span className="mt-1 font-bold text-slate-800 text-sm">{step.tagline}</span>
                {isSelected && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 w-full bg-blue-600 rounded-b-2xl"
                    layoutId="pipeline-indicator"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Panel connected to Pipeline selection */}
        <div className="mb-12 min-h-[90px] rounded-2xl border border-white/60 bg-white/40 p-5 backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-3.5"
            >
              <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
                <FiCheckCircle className="h-4 w-4" />
              </div>
              <p className="text-sm leading-relaxed text-slate-700">
                {steps[activeStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Main Monolith Pricing Glass Card */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/50 p-6 shadow-xl backdrop-blur-xl sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Accent top gradient bar */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-blue-500 via-cyan-400 to-indigo-500" />
          
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            
            {/* Left side: Package overview and structured features list */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  {plan.name}
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/10 px-2.5 py-0.5 text-xs font-bold text-blue-600">
                  <FiStar className="h-3 w-3 fill-current" /> {plan.badge}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {plan.short}
              </p>

              <hr className="my-6 border-slate-200/60" />

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                What&apos;s included in your active profile:
              </h4>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {plan.features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs font-medium text-slate-700">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side: High-contrast financial transaction checkout box */}
            <div className="rounded-2xl border border-white/80 bg-white/60 p-6 backdrop-blur-sm lg:col-span-5 lg:p-10">
              <div className="text-center lg:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 line-through">
                  Standard ${plan.priceOriginal}/mo
                </span>
                <div className="mt-1 flex items-baseline justify-center gap-1 lg:justify-start">
                  <span className="text-5xl font-black tracking-tight text-blue-600">
                    ${plan.priceCurrent}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">/ month</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">Lock this rate indefinitely. Cancel anytime.</p>
              </div>

              <div className="mt-6 space-y-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 p-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/10 transition-all"
                  href="https://lmsathena.com/signup"
                >
                  Get Started Instantly
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </motion.a>
                
                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><FiShield /> PCI-DSS Secure</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FiClock /> Instant Entry</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Warning Notification Block positioned nicely at baseline */}
        <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-50/50 p-4 text-xs leading-relaxed text-slate-600 backdrop-blur-sm">
          <div className="flex items-start gap-2.5">
            <FiAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <span>
              <strong className="uppercase tracking-wide text-amber-700 font-bold mr-1">
                Notice:
              </strong>
              This promotional entry rate transitions to the standard <strong>$147/mo</strong> index shortly. Locking your membership now guarantees authorization at the current <strong>$69/mo architecture indefinitely</strong> for your profile lifespan.
            </span>
          </div>
        </div>

        {/* Simple Footer Links */}
        <div className="mt-8 flex justify-center gap-6 text-xs font-medium text-slate-400">
          <a href="/contact" className="hover:text-blue-600 hover:underline">
            Contact Academic Support
          </a>
          <span>•</span>
          <span>Encrypted Checkout Security Guaranteed</span>
        </div>

      </div>
    </section>
  );
}