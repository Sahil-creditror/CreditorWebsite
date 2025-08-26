"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLock, FaMoneyCheckAlt, FaRocket, FaShieldAlt, FaChartLine, FaUserLock } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

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

export default function MasterClassLaunchpad() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);

  // small-screen detection (client-only)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Only render particle markup after mounting to prevent SSR/CSR mismatch
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setMounted(true);

    // generate particles on the client only (avoids different server-side random values)
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    const count = width <= 640 ? 8 : 15; // fewer particles on mobile
    const arr: Particle[] = Array.from({ length: count }).map((_, i) => {
      const w = Math.round(Math.random() * (width <= 640 ? 8 : 12) + (width <= 640 ? 3 : 4));
      const h = Math.round(Math.random() * (width <= 640 ? 8 : 12) + (width <= 640 ? 3 : 4));
      const top = (Math.random() * 84 + 8).toFixed(2) + "%";
      const left = (Math.random() * 84 + 8).toFixed(2) + "%";
      const background =
        i % 3 === 0
          ? "linear-gradient(45deg, #6b70ffff, #6bc1ffff)"
          : i % 3 === 1
          ? "linear-gradient(45deg, #4bc0c8, #c779d0)"
          : "linear-gradient(45deg, #fe8c00, #f83600)";
      const opacity = +(Math.random() * (width <= 640 ? 0.35 : 0.45) + 0.08).toFixed(2);
      const duration = +(1.6 + Math.random() * (width <= 640 ? 1.6 : 2)).toFixed(2);
      const rotation = i % 2 ? -5 : 5;
      const x = i % 3 ? -10 : 10;
      const y = i % 2 ? -14 : 14;
      return { id: i, width: `${w}px`, height: `${h}px`, top, left, background, opacity, duration, rotation, x, y };
    });

    setParticles(arr);
  }, []);

  useEffect(() => {
    // run animations & marquee only when mounted and DOM refs are available
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Background animation
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          duration: 30,
          backgroundPosition: "0% 100%",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Particles animation wired into GSAP with the generated particles array
      if (particlesRef.current && particles.length > 0) {
        const els = particlesRef.current.children;
        Array.from(els).forEach((el, i) => {
          const p = particles[i];
          if (!p) return;
          gsap.to(el as Element, {
            y: p.y,
            x: p.x,
            rotation: p.rotation,
            duration: p.duration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: (i % 5) * 0.12,
          });
        });
      }

      // Reveal animations using ScrollTrigger
      gsap.utils.toArray<HTMLElement>(".gs-reveal").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          delay: i * 0.12,
          ease: "back.out(1.7)",
          overwrite: "auto",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, sectionRef.current);

    // --- Marquee: controller for pointer/touch/responsive ---
    let marqueeCleanup = () => {};

    if (marqueeRef.current) {
      const marqueeEl = marqueeRef.current;

      let baseDuration = window.innerWidth <= 640 ? 28 : 20;
      marqueeEl.style.setProperty("--marquee-duration", `${baseDuration}s`);
      marqueeEl.style.setProperty("--marquee-play-state", "running");

      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (media.matches) {
        marqueeEl.style.setProperty("--marquee-play-state", "paused");
        marqueeEl.style.setProperty("--marquee-duration", "0s");
      }

      const slowDuration = Math.max(8, baseDuration / 0.3);

      let rafId: number | null = null;
      const tweenCssVar = (from: number, to: number, durationMs = 350) => {
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          const val = from + (to - from) * eased;
          marqueeEl.style.setProperty("--marquee-duration", `${val}s`);
          if (t < 1) rafId = requestAnimationFrame(step);
        };
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(step);
      };

      const handlePointerEnter = () => {
        const current = parseFloat(getComputedStyle(marqueeEl).getPropertyValue("--marquee-duration") || `${baseDuration}`);
        tweenCssVar(current, slowDuration, 350);
      };

      const handlePointerLeave = () => {
        const current = parseFloat(getComputedStyle(marqueeEl).getPropertyValue("--marquee-duration") || `${slowDuration}`);
        tweenCssVar(current, baseDuration, 350);
      };

      const handleTouchStart = () => handlePointerEnter();
      const handleTouchEnd = () => handlePointerLeave();

      const onResize = () => {
        baseDuration = window.innerWidth <= 640 ? 28 : 20;
        const current = parseFloat(getComputedStyle(marqueeEl).getPropertyValue("--marquee-duration") || `${baseDuration}`);
        if (current <= baseDuration + 1) {
          marqueeEl.style.setProperty("--marquee-duration", `${baseDuration}s`);
        }
      };

      marqueeEl.addEventListener("pointerenter", handlePointerEnter);
      marqueeEl.addEventListener("pointerleave", handlePointerLeave);
      marqueeEl.addEventListener("touchstart", handleTouchStart, { passive: true });
      marqueeEl.addEventListener("touchend", handleTouchEnd);
      window.addEventListener("resize", onResize);

      marqueeCleanup = () => {
        marqueeEl.removeEventListener("pointerenter", handlePointerEnter);
        marqueeEl.removeEventListener("pointerleave", handlePointerLeave);
        marqueeEl.removeEventListener("touchstart", handleTouchStart);
        marqueeEl.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("resize", onResize);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }

    return () => {
      marqueeCleanup();
      ctx.revert();
    };
  }, [particles, mounted]);

  function createRipple(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    // offsetX/Y may be 0 in some cases (e.g., keyboard activation) — fallback to center
    const offsetX = (e.nativeEvent as any).offsetX ?? btn.clientWidth / 2;
    const offsetY = (e.nativeEvent as any).offsetY ?? btn.clientHeight / 2;
    circle.style.left = `${offsetX - radius}px`;
    circle.style.top = `${offsetY - radius}px`;
    circle.classList.add("ripple");
    const ripple = btn.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();
    btn.appendChild(circle);
  }

  const items = [
    "Trusts",
    "Tier 1 Credit",
    "Private Processing",
    "Asset Protection",
    "Merchant Onboarding",
    "Business Funding",
    "90-Day Launch",
  ];

  return (
    <section
      ref={sectionRef}
      aria-label="Creditor Academy Master Class Launchpad"
      className="relative overflow-hidden py-12 md:py-20 lg:py-28"
    >
      {/* Animated gradient background */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 -z-10 opacity-95"
        style={{
          background: "linear-gradient(125deg, #0f1320 0%, #1c2a53 33%, #2b5fc8 66%, #071021 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Animated particles (render from stable particle array).
          Render them only after mount to avoid SSR/CSR mismatch */}
      {mounted && particles.length > 0 && (
        <div ref={particlesRef} className="absolute inset-0 -z-10 overflow-hidden particles-container" aria-hidden>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: p.width,
                height: p.height,
                top: p.top,
                left: p.left,
                background: p.background,
                opacity: p.opacity,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: p.opacity }}
              transition={{
                duration: p.duration,
                delay: p.id * 0.12,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10">
          {/* left column - headline + CTA */}
          <div className="w-full lg:w-6/12 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-block mb-5">
              <div className="rounded-full bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700 px-4 py-2 text-sm font-bold tracking-wider text-white shadow">
                Master Class • 90-Day Private Launchpad
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="font-display mb-4 text-white leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400"
              style={{ fontWeight: 800, WebkitFontSmoothing: "antialiased" }}
            >
              Structure Legally. Fund Privately. Operate Sovereignly.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="text-slate-200 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
              The Creditor Academy Master Class is more than a course — it's a private
              business launch system. In 90 days you'll set up trust structures, build
              Tier 1 business credit, and activate private merchant processing so you can
              collect payments without banks and protect assets from day one.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row sm:items-center sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={createRipple}
                className="signup-btn relative overflow-hidden inline-flex items-center gap-3 justify-center px-6 py-3 rounded-xl text-base sm:text-lg font-bold shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group"
                style={{
                  background: "linear-gradient(90deg, rgba(100, 113, 255, 0.92), rgba(44,129,255,0.88))",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isMobile ? "0 6px 20px -8px rgba(44,129,255,0.45)" : "0 10px 40px -10px rgba(44,129,255,0.7)",
                  minHeight: "48px",
                }}
                aria-label="Sign up for Master Class"
                animate={isMobile ? {} : { scale: [1, 1.06, 1] }}
                transition={isMobile ? {} : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Shimmer overlay */}
                <span className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-[1.5s] before:ease-in-out" />

                {/* Aura glow on hover */}
                <span className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-40 blur-2xl bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 transition-opacity duration-500" />

                <span className="relative z-10">✨ Join the Private Launch</span>

                {/* Rotating subtle circle effect: stop rotating on small screens */}
                <motion.div
                  animate={isMobile ? { rotate: 0 } : { rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-6 -top-6 opacity-20 w-20 h-20"
                  aria-hidden
                >
                  <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden>
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1">
                        <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
                        <stop offset="1" stopColor="#fff" stopOpacity="0.03" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="40" fill="url(#g1)" />
                  </svg>
                </motion.div>
              </motion.button>

              {/* small spacer for mobile */}
              <div className="mt-3 sm:mt-0" />
            </motion.div>

            {/* marquee (CSS-driven) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              ref={marqueeRef}
              className="mt-10 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-r from-purple-900/25 to-pink-900/20 p-3 backdrop-blur-md marquee-container"
              aria-hidden={false}
              aria-label="Program highlights"
            >
              <div className="flex marquee-track" style={{ gap: isMobile ? "1.25rem" : "2.5rem", alignItems: "center" }} role="list">
                {items.map((item, i) => (
                  <span key={i} role="listitem" className="flex items-center text-sm sm:text-base md:text-lg text-slate-200 font-semibold">
                    <span className="text-amber-400 mr-2">✦</span> {item}
                  </span>
                ))}
                {/* Duplicate set for smooth looping; mark duplicate as aria-hidden to avoid repeated screen reader output */}
                {items.map((item, i) => (
                  <span key={i + 100} aria-hidden="true" role="presentation" className="flex items-center text-sm sm:text-base md:text-lg text-slate-200 font-semibold">
                    <span className="text-amber-400 mr-2">✦</span> {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* right column - feature panel */}
          <div className="w-full lg:w-6/12">
            <motion.div initial={{ opacity: 0, scale: 0.98, y: 12 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }} className="rounded-3xl bg-gradient-to-br from-purple-900/40 via-blue-900/24 to-pink-900/30 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl">
              <motion.div className="flex items-start gap-4 mb-6" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <motion.div className="flex-shrink-0 bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 p-3 rounded-xl shadow-lg" animate={{ rotate: [0, -5, 0, 5, 0], scale: [1, 1.03, 1] }} transition={{ duration: 5, repeat: Infinity }}>
                  <FaRocket className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white text-lg font-bold mb-1">Launch in 90 Days</h3>
                  <p className="text-slate-300 text-sm">A step-by-step pipeline to a functioning private business.</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FeatureCard Icon={FaLock} title="Structure Legally" desc="Trust formation, entity separation, and fundamental compliance." color="from-emerald-500 to-cyan-500" />
                <FeatureCard Icon={FaMoneyCheckAlt} title="Fund Privately" desc="Build fundable credit profiles and access non-bank funding." color="from-amber-500 to-orange-500" />
                <FeatureCard Icon={FaShieldAlt} title="Asset Protection" desc="Shield your business assets from legal threats." color="from-violet-500 to-purple-500" />
                <FeatureCard Icon={FaChartLine} title="Grow Exponentially" desc="Scale your business with advanced financial strategies." color="from-pink-500 to-rose-500" />
              </div>

              <motion.div className="mt-6 pt-5 border-t border-white/10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
                <h4 className="text-slate-200 text-sm font-bold mb-3 flex items-center gap-2">
                  <FaUserLock className="text-amber-400" /> Who it's for
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {["Entrepreneurs", "Freelancers", "Consultants", "Investors", "Creators", "Business Owners"].map((t) => (
                    <motion.span key={t} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate-200 border border-white/8" whileHover={{ scale: 1.05 }}>
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* three-step strip */}
            <motion.div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <StripCard step="1" title="Set Up Trust" desc="Foundational legal structure." color="bg-gradient-to-br from-cyan-500 to-blue-600" />
              <StripCard step="2" title="Build Credit" desc="Tier 1 business credit profile." color="bg-gradient-to-br from-violet-500 to-purple-600" />
              <StripCard step="3" title="Activate Processing" desc="Private merchant payments & onboarding." color="bg-gradient-to-br from-pink-500 to-rose-600" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* decorative SVG at bottom (purely decorative) */}
      <svg className="pointer-events-none absolute left-0 right-0 bottom-0 -z-20" width="100%" height="120" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M0 80c120 40 240 40 360 0s240-40 360 0 240 40 360 0 240-40 360 0v40H0z" fill="url(#gradient)" />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4b8ec8ff" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#277ad9ff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#002afeff" stopOpacity="0.08" />
          </linearGradient>
        </defs>
      </svg>

      <style jsx>{`
        .font-display {
          font-family: ui-sans-serif, system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
        }

        /* CTA ripple */
        .signup-btn {
          position: relative;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }
        .signup-btn .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 900ms linear;
          background: rgba(255, 255, 255, 0.4);
          pointer-events: none;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        /* Marquee (CSS-driven) */
        .marquee-container {
          --marquee-duration: 20s; /* JS may overwrite this */
          --marquee-play-state: running;
        }

        .marquee-track {
          display: inline-flex;
          gap: 2.5rem;
          white-space: nowrap;
          align-items: center;
          animation: marqueeX var(--marquee-duration) linear infinite;
          animation-play-state: var(--marquee-play-state);
        }

        @keyframes marqueeX {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .gs-reveal {
          will-change: transform, opacity;
        }

        .particles-container {
          pointer-events: none;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .signup-btn {
            width: 100%;
            padding: 12px 18px !important;
            font-size: 16px !important;
            box-shadow: 0 6px 18px -8px rgba(0,0,0,0.35) !important;
          }

          .marquee-track {
            gap: 1.25rem;
          }

          /* Hide particle layer on small screens for performance */
          .particles-container {
            display: none;
          }

          /* Reduce decorative shadow intensity */
          .shadow-2xl {
            box-shadow: 0 8px 24px -12px rgba(0,0,0,0.45) !important;
          }
        }

        /* Respect prefers-reduced-motion for motion-heavy elements */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation-play-state: paused !important;
          }

          .signup-btn, .shadow-2xl, .rounded-3xl, .particles-container > * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function FeatureCard({ Icon, title, desc, color }: { Icon: any; title: string; desc: string; color: string; }) {
  return (
    <motion.div className="flex gap-3 items-start p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/8 backdrop-blur-sm" whileHover={{ y: -4, boxShadow: "0 8px 22px -8px rgba(0, 0, 0, 0.18)", transition: { duration: 0.28 } }}>
      <motion.div className={`p-2.5 rounded-lg bg-gradient-to-r ${color} shadow-md`} whileHover={{ rotate: 6 }} transition={{ type: "spring", stiffness: 300, damping: 12 }}>
        <Icon className="w-5 h-5 text-white" />
      </motion.div>
      <div>
        <div className="text-white text-sm font-semibold mb-1">{title}</div>
        <div className="text-slate-300 text-xs">{desc}</div>
      </div>
    </motion.div>
  );
}

function StripCard({ step, title, desc, color }: { step: string; title: string; desc: string; color: string; }) {
  return (
    <motion.div className="p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/8 flex items-start gap-3 backdrop-blur-sm" whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
      <div className={`${color} h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-md`}>{step}</div>
      <div>
        <div className="text-white text-sm font-semibold">{title}</div>
        <div className="text-slate-300 text-xs mt-1">{desc}</div>
      </div>
    </motion.div>
  );
}
