"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // <--- Add this missing import back in!
import Link from "next/link";
import HeroContactOverlay from "./ContactOverlay";

// --- AI Particle Grid Background Component ---
const FuturisticParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 1,
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(6, 182, 212, 0.4)";
      ctx.strokeStyle = "rgba(18, 58, 158, 0.15)";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        const mouseDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (mouseDist < 180) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${1 - mouseDist / 180})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
};

// --- Main Hero Component ---
const HeroSection = () => {
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiStatus, setAiStatus] = useState("AI Sovereign Node: Ready");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAnalyzing(true);
    setAiStatus("Quantum decrypting wealth objectives...");

    setTimeout(() => {
      setIsAnalyzing(false);
      setAiStatus("Optimal Vector Mapped: Masterclass Membership recommended.");
      setAiPrompt("");
    }, 2200);
  };

  const heroContent = {
    title: "Become Private",
    titleAccent: "Operate Private",
    subTitle: "Achieve Financial Freedom",
    description:
      "Learn business trusts, asset protection, business credit, and financial sovereignty through the Creditor Academy Masterclass.",
    bgImage: "/images/hero/Bannerhero.webp",
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030712] text-white font-sans selection:bg-cyan-500/30">

      {/* BACKGROUND GRAPHICS & TEXTURES */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroContent.bgImage}
          alt="Hero background structural overlay"
          fill
          priority
          quality={90}
          sizes="100vw"
          className=" object-cover object-center opacity-35 mix-blend-luminosity scale-105 animate-[pulse_8s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/90 via-[#060b19]/70 to-[#030712]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#030712_80%)]" />
      </div>

      <FuturisticParticles />

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[200px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[250px] rounded-full pointer-events-none" />

      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-20 flex flex-col items-center text-center">



        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none uppercase mt-18">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="block text-white tracking-tighter"
          >
            {heroContent.title}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-white to-slate-500 tracking-normal text-3xl sm:text-5xl lg:text-6xl mt-2"
          >
            {heroContent.titleAccent}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="block mt-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent text-2xl sm:text-4xl font-bold tracking-wide normal-case font-mono"
          >
            {heroContent.subTitle}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 mb-8 max-w-3xl text-sm sm:text-base lg:text-lg text-slate-400 text-bold  leading-relaxed  tracking-wide"
        >
          {heroContent.description}
        </motion.p>



        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
        >
          <Link
            href="/masterclass-membership"
            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-white to-slate-100 text-[#030712] font-black text-xs uppercase tracking-widest rounded-full pl-8 pr-3 py-3 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/50 transition-colors pointer-events-none" />
            Join Masterclass Membership
            <span className="w-9 h-9 rounded-full bg-[#030712] text-white flex items-center justify-center transition-all group-hover:rotate-45 group-hover:text-white group-hover:bg-blue-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </Link>

          <Link
            href="/webinar"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/10 bg-white/[0.15] backdrop-blur-md text-slate-200 font-semibold text-xs uppercase tracking-widest hover:bg-white/[0.20] hover:border-cyan-500/40 hover:text-white transition-all shadow-lg group"
          >
            Watch Free Webinar
            <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping ml-1" />
          </Link>
        </motion.div>


      </div>

      <AnimatePresence>
        {showContactForm && (
          <HeroContactOverlay onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
