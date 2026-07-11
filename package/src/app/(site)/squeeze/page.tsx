"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Shield, DollarSign, ArrowRight, Play, Pause, Lock, Compass, CheckCircle2 } from "lucide-react";
import SqueezeEmbed from "@/app/components/squeeze/Embed";
import Script from "next/script";
import { useState, useRef } from "react";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowControls(true);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setShowControls(false);
      }
    }
  };

  const courses = [
    {
      num: "01",
      phase: "Phase I",
      title: "Become Private",
      desc: "Learn how the public system treats you as a corporate fiction and how to correct your status using a clear lawful framework so you can confidently live in the private.",
      icon: Shield,
      href: "/services/course-cataloges/become-private",
    },
    {
      num: "02",
      phase: "Phase II",
      title: "Operate Private",
      desc: "Learn how to live, build, and do business in the private sector. This course shows you how to use business trusts and private associations to protect assets, manage commerce, plan legacies, and operate outside public jurisdiction.",
      icon: BookOpen,
      href: "/services/course-cataloges/operate-private",
    },
    {
      num: "03",
      phase: "Phase III",
      title: "Financial Freedom",
      desc: "Learn to build elite business credit with Unincorporated Business Trusts, repair your personal credit, and establish Private Merchant Processing — no banks, no KYC, no risk of shutdowns.",
      icon: DollarSign,
      href: "/services/course-cataloges/financial-freedom",
    },
  ];

  const formula = [
    {
      title: "Become a Member",
      desc: "Join the movement. Step inside Creditor Academy and unlock access to a world of private education and financial freedom.",
    },
    {
      title: "Charge Your Card",
      desc: 'Charge your "Creditor Card" and step into the private economy. Each swipe unlocks access, wealth, and opportunity reserved for members only.',
    },
    {
      title: "Unlock Courses & Connect",
      desc: "Instantly access premium courses, join daily live masterclasses, and a private network of like-minded achievers. Learn, grow, and collaborate.",
    },
    {
      title: "Become Private",
      desc: "Take control of your sovereignty. Apply what you learn to live free, operate privately, and build wealth on your own terms.",
    },
  ];

  return (
    <>
      <Script
        id="wonderengine-tracker"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var t = document.createElement("script");
              t.type = "text/javascript";
              t.async = true;
              t.src = 'https://api.wonderengine.ai/js/am.js';
              t.onload = t.onreadystatechange = function() {
                var s = this.readyState;
                if (!s || s === "complete" || s === "loaded") {
                  try {
                    affiliateManager.init('psaD1vtsVB3b1PyW2P6i', 'https://backend.leadconnectorhq.com', '.www.creditoracademy.com');
                  } catch (e) {}
                }
              };
              var e = document.getElementsByTagName("script")[0];
              e.parentNode.insertBefore(t, e);
            })();
          `,
        }}
      />

      <main className="relative min-h-screen bg-[#FAF8F4] dark:bg-[#0E1B2B] text-[#0E1B2B] dark:text-[#F6F1E7] overflow-x-hidden">
        {/* Subtle ledger-line background texture */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 38px, currentColor 39px)",
          }}
        />

        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[440px_1fr]">
          {/* ===================== LEFT — STICKY MEMEBER PANEL ===================== */}
          <aside className="lg:sticky lg:top-0 lg:h-screen border-b lg:border-b-0 lg:border-r border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10 bg-[#0E1B2B] dark:bg-[#070E17] text-[#F6F1E7] flex flex-col z-20">
            <div className="flex-1 flex flex-col justify-between px-8 py-10 md:px-12 overflow-y-auto scrollbar-none">
              <div>
                {/* Seal mark */}
                <div className="mb-8 flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A153]/50 bg-[#C9A153]/10">
                    <Lock className="h-4 w-4 text-[#C9A153]" />
                  </div>
                  <div className="font-serif text-xs uppercase tracking-[0.3em] text-[#C9A153]">
                    Creditor Academy
                  </div>
                </div>

                <p className="mb-2 font-serif text-[10px] uppercase tracking-[0.3em] text-[#C9A153]/80">
                  Admission &middot; No. 002,041
                </p>
                <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] tracking-tight text-[#F6F1E7]">
                  Reserve your seat for the Private Pathway Orientation
                </h2>
                <p className="mt-3 text-xs leading-relaxed text-[#F6F1E7]/70">
                  Saturday, 10:00 AM — live walkthrough, open Q&amp;A, and exclusive member templates.
                </p>

                <div className="mt-8 rounded-xl border border-[#F6F1E7]/10 bg-[#F6F1E7]/3 p-5 shadow-inner backdrop-blur-md">
                  <SqueezeEmbed />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#F6F1E7]/10">
                <div className="flex items-center gap-2.5 text-[11px] text-[#F6F1E7]/60">
                  <Shield className="h-3.5 w-3.5 text-[#C9A153] shrink-0" />
                  <span>Secure &amp; privacy-first — we never distribute data.</span>
                </div>

                <p className="mt-2 text-[10px] leading-relaxed text-[#F6F1E7]/40">
                  By reserving a seat you agree to receive strategic updates. Unsubscribe at any time.
                </p>

                {/* Social Proof */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex -space-x-2.5">
                    {["avatar_1.webp", "avatar_2.webp", "avatar_3.webp", "avatar_4.webp"].map((a, i) => (
                      <Image
                        key={i}
                        src={`/images/avatar/${a}`}
                        alt={`Member ${i + 1}`}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full ring-2 ring-[#0E1B2B] dark:ring-[#070E17] object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-[11px] text-[#F6F1E7]/60">
                    <span className="font-semibold text-[#F6F1E7]">2,000+</span> minds practicing private commerce
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ===================== RIGHT — INTERACTIVE PATHWAY DOSSIER ===================== */}
          <div className="px-6 py-12 md:px-16 md:py-16 lg:py-20 max-w-4xl">
            {/* Header / Hero */}
            <header>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A153]/30 bg-[#C9A153]/5 text-[#C9A153] mb-4">
                <Compass className="h-3.5 w-3.5 animate-spin-slow" />
                <span className="font-serif text-[10px] uppercase tracking-[0.2em]">Orientation Dossier</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight">
                Entering the Private Pathway
              </h1>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-[#0E1B2B]/70 dark:text-[#F6F1E7]/70 max-w-2xl">
                This orientation bridges the shift from traditional public systems into custom private sovereignty structures. Discover how to control jurisdiction boundaries, safeguard multi-generational capital assets, and manage private execution flawlessly.
              </p>
            </header>

            {/* Video Player Section */}
            <div className="mt-10 group relative w-full overflow-hidden rounded-xl border border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10 bg-black shadow-xl">
              <video
                ref={videoRef}
                playsInline
                controls
                controlsList="nodownload"
                className="aspect-video h-auto w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                onPlay={() => { setIsPlaying(true); setShowControls(false); }}
                onPause={() => { setIsPlaying(false); setShowControls(true); }}
                onClick={(e) => { e.preventDefault(); togglePlayPause(); }}
              >
                <source src="/video/squeeze.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/20 pointer-events-none ${showControls || !isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A153] text-[#0E1B2B] shadow-2xl transition-transform duration-300 hover:scale-110 pointer-events-auto backdrop-blur-sm"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" fill="currentColor" />
                  ) : (
                    <Play className="ml-1 h-6 w-6" fill="currentColor" />
                  )}
                </button>
              </div>
            </div>

            {/* Core Modules Quick Strip */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border border-[#0E1B2B]/5 dark:border-[#F6F1E7]/5 bg-[#0E1B2B]/2 dark:bg-[#F6F1E7]/1">
              {[
                "Jurisdiction Boundaries & Status Change",
                "Private Asset & Document Frameworks",
                "Unincorporated Trust Credit Mechanics",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#C9A153] shrink-0" />
                  <span className="text-xs font-medium text-[#0E1B2B]/80 dark:text-[#F6F1E7]/80">{text}</span>
                </div>
              ))}
            </div>

            {/* INTERACTIVE TIMELINE PATHWAY (The Freedom Formula) */}
            <section className="mt-20 relative">
              <div className="mb-10">
                <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#C9A153]">The Road Map</p>
                <h3 className="mt-2 font-serif text-3xl tracking-tight">The Freedom Formula</h3>
              </div>

              {/* Pathway Line Design */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 bottom-6 hidden md:block w-[2px] bg-linear-to-b from-[#C9A153]/80 via-[#C9A153]/30 to-transparent" />

              <div className="space-y-12 relative">
                {formula.map((step, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={index}
                      className={`flex flex-col md:flex-row relative items-start md:items-center justify-between gap-8 w-full ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      {/* Central Node Dot Indicator */}
                      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                        <div
                          className={`h-9 w-9 rounded-full border-2 flex items-center justify-center text-xs font-serif font-bold transition-all duration-300 ${hoveredStep === index
                            ? "bg-[#C9A153] border-[#C9A153] text-[#0E1B2B] scale-110 shadow-lg"
                            : "bg-[#FAF8F4] dark:bg-[#0E1B2B] border-[#C9A153]/60 text-[#C9A153]"
                            }`}
                        >
                          {index + 1}
                        </div>
                      </div>

                      {/* Content Block */}
                      <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isEven ? "md:text-right" : "md:text-left"}`}>
                        <div
                          className={`p-6 rounded-xl border transition-all duration-300 ${hoveredStep === index
                            ? "border-[#C9A153]/40 bg-[#C9A153]/4 translate-y-[-2px] shadow-sm"
                            : "border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10 bg-transparent"
                            }`}
                        >
                          <h4 className="font-serif text-lg font-medium">{step.title}</h4>
                          <p className="mt-2 text-xs leading-relaxed text-[#0E1B2B]/70 dark:text-[#F6F1E7]/70">
                            {step.desc}
                          </p>
                        </div>
                      </div>

                      {/* Ghost space matching opposite layout side to preserve clean alignment */}
                      <div className="hidden md:block w-[45%]" />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* CURRICULUM ACCORDION PATHWAY */}
            <section className="mt-24">
              <div className="mb-8">
                <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#C9A153]">Curriculum Structure</p>
                <h3 className="mt-2 font-serif text-3xl tracking-tight">Three Stages of Mastery</h3>
              </div>

              <div className="space-y-4">
                {courses.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.num}
                      href={item.href}
                      className="group block p-6 rounded-xl border border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10 bg-[#0E1B2B]/1 dark:bg-[#F6F1E7]/1 transition-all duration-300 hover:border-[#C9A153]/50 hover:bg-[#C9A153]/2 no-underline"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg border border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10 flex items-center justify-center text-[#C9A153] bg-[#FAF8F4] dark:bg-[#0E1B2B] group-hover:bg-[#C9A153] group-hover:text-[#0E1B2B] transition-colors duration-300">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono tracking-widest text-[#C9A153] uppercase block">
                              {item.phase}
                            </span>
                            <h4 className="font-serif text-xl font-medium group-hover:text-[#C9A153] transition-colors duration-200">
                              {item.title}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-[#0E1B2B]/40 dark:text-[#F6F1E7]/40 group-hover:text-[#C9A153] transition-colors duration-200 self-end sm:self-auto">
                          <span>Explore Core Syllabus</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>

                      <p className="mt-4 text-xs md:text-sm leading-relaxed text-[#0E1B2B]/70 dark:text-[#F6F1E7]/70 pl-0 sm:pl-16 max-w-2xl">
                        {item.desc}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}