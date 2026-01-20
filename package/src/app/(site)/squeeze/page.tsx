"use client";

import Image from "next/image";
import { Clock, BookOpen, Shield, DollarSign, ArrowRight, Play, Pause } from "lucide-react";
import SqueezeEmbed from "@/app/components/squeeze/Embed";
import Script from "next/script";
import { useState, useRef } from "react";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

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
    <main className="relative min-h-screen flex flex-col bg-gradient-to-b from-blue-900 via-blue-300 to-blue-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-black">
      {/* Background overlays */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(1200px_600px_at_20%_-10%,rgba(59,130,246,0.10),transparent),radial-gradient(900px_500px_at_80%_110%,rgba(16,185,129,0.10),transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2] [background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(0,0,0,0.04)_24px),repeating-linear-gradient(90deg,transparent,transparent_23px,rgba(0,0,0,0.04)_24px)] dark:[background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(255,255,255,0.05)_24px),repeating-linear-gradient(90deg,transparent,transparent_23px,rgba(255,255,255,0.05)_24px)]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-40 [background-image:radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.6),transparent_35%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.4),transparent_35%)] dark:opacity-20" />

      {/* Content Section */}
      <section className="container relative mx-auto px-4 py-12 md:py-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-30 pb-10">

          {/* LEFT — Hero + Details */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-2xl shadow-lg w-full">
              <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-tr from-primary/8 to-transparent" />

              <div className="px-3 py-8 md:px-10 md:py-12 bg-white/80 dark:bg-secondary/60 backdrop-blur-sm">
                <h1 className="text-3xl md:text-4xl font-extrabold text-secondary dark:text-white leading-tight">
                  Creditor Academy Orientation: <span className="text-primary">Entering the Private Pathway</span>
                </h1>
                <p className="mt-2 text-secondary/80 dark:text-white/80 max-w-2xl">
                This orientation introduces you to the foundations of operating privately—beyond the noise of the public system—and shows how Creditor Academy guides members toward greater control, protection, and independence. You'll explore our full range of courses and programs, each designed to help you build private structures, elevate your financial literacy, and navigate commerce with confidence. We'll also walk you through a demo of our online campus so you can experience how our tools, lessons, and community support your transition into a more empowered private life.
                </p>

                {/* Video Section */}
                <div className="mt-6 relative rounded-lg overflow-hidden shadow-sm w-full group">
                  <video
                    ref={videoRef}
                    playsInline
                    controls
                    controlsList="nodownload"
                    className="w-full h-auto aspect-video object-cover"
                    onPlay={() => {
                      setIsPlaying(true);
                      setShowControls(false);
                    }}
                    onPause={() => {
                      setIsPlaying(false);
                      setShowControls(true);
                    }}
                    onClick={(e) => {
                      // Prevent default video click behavior
                      e.preventDefault();
                      togglePlayPause();
                    }}
                  >
                    <source src="/video/squeeze.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Custom Play/Pause Button Overlay */}
                  <div 
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      showControls || !isPlaying ? 'opacity-100 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    style={{ pointerEvents: 'none' }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                      className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white cursor-pointer"
                      style={{ pointerEvents: 'auto' }}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? (
                        <Pause className="w-10 h-10 text-primary" fill="currentColor" />
                      ) : (
                        <Play className="w-10 h-10 text-primary ml-1" fill="currentColor" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Social proof */}
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex flex-wrap -space-x-3 items-center">
                        {["avatar_1.webp", "avatar_2.webp", "avatar_3.webp", "avatar_4.webp"].map((a, i) => (
                        <Image
                            key={i}
                            src={`/images/avatar/${a}`}
                            alt={`Member ${i + 1}`}
                            width={44}
                            height={44}
                            className="h-11 w-11 rounded-full ring-2 ring-white dark:ring-secondary object-cover"
                        />
                        ))}
                    </div>
                    <div className="mt-2 sm:mt-0 text-sm text-secondary/70 dark:text-white/70">
                        Trusted by <span className="font-semibold text-secondary dark:text-white">2,000+</span> members learning private commerce
                    </div>
                </div>

                {/* Quick preview checklist (moved above The Freedom Formula) */}
                <div className="mt-8 rounded-xl bg-white/60 dark:bg-secondary/60 p-4 shadow-sm ring-1 ring-black/5">
                    <div className="font-semibold text-secondary dark:text-white">Quick preview — what we cover</div>
                    <ul className="mt-3 space-y-2 text-secondary/80 dark:text-white/80">
                        {[
                        "Status & jurisdiction basics — what to know",
                        "Private documents & trust essentials",
                        "Simple credit repair frameworks",
                        ].map((text, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <Image
                            src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883682/creditor-website-assets/images/Icon/right-check.svg"
                            alt="Check"
                            width={20}
                            height={20}
                            className="mt-0.5"
                            />
                            <span>{text}</span>
                        </li>
                        ))}
                    </ul>
                    </div>

                    {/* The Freedom Formula Section */}
                    <div className="my-8">
                    <h3 className="text-center text-3xl md:text-4xl font-semibold text-blue-600 dark:text-blue-400 mb-6 pt-10">
                        The Freedom Formula
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[ 
                        {
                            title: 'Become a Member',
                            desc: 'Join the movement. Step inside Creditor Academy and unlock access to a world of private education and financial freedom.',
                        },
                        {
                            title: 'Charge Your Card',
                            desc: 'Charge your "Creditor Card" and step into the private economy. Each swipe unlocks access, wealth, and opportunity reserved for members only.',
                        },
                        {
                            title: 'Unlock Courses & Connect',
                            desc: 'Instantly access premium courses, join daily live masterclasses, and a private network of like-minded achievers. Learn, grow, and collaborate.',
                        },
                        {
                            title: 'Become Private',
                            desc: 'Take control of your sovereignty. Apply what you learn to live free, operate privately, and build wealth on your own terms.',
                        },
                        ].map((step, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 bg-white dark:bg-slate-800/60 rounded-lg p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-300 hover:scale-[1.02]"
                        >
                            <div className="flex-none w-10 h-10 rounded-full bg-primary/10 grid place-items-center text-primary font-semibold">
                            {index + 1}
                            </div>
                            <div>
                            <div className="text-base font-semibold text-secondary dark:text-white">
                                {step.title}
                            </div>
                            <div className="text-sm text-secondary/70 dark:text-white/70 mt-1">
                                {step.desc}
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Signup form */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="sticky top-20">
              <div className="rounded-3xl bg-white/80 p-5 shadow-2xl ring-1 ring-black/5 dark:bg-secondary dark:ring-white/8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-secondary/70 dark:text-white/70">Free Orientation</div>
                    <div className="text-xl md:text-2xl font-extrabold text-secondary dark:text-white">Reserve your seat — Saturday 10AM</div>
                    <div className="text-sm text-secondary/70 mt-1">Live walkthrough, Q&amp;A, templates</div>
                  </div>
                  <div className="hidden sm:block">
                    {/* <div className="w-16 h-16 relative rounded-lg overflow-hidden grid place-items-center bg-white/60 dark:bg-neutral-800/60">
                      <Clock className="w-12 h-12 text-blue-500" aria-hidden="true" />
                    </div> */}
                  </div>
                </div>

                <div className="mt-4">
                  <SqueezeEmbed />
                </div>

                <div className="mt-4 flex items-center gap-3 text-sm text-secondary/70 dark:text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>Secure &amp; privacy-first — we never sell your data.</div>
                </div>

                <div className="mt-4 text-xs text-secondary/60 dark:text-white/60">
                  By reserving a seat you agree to receive occasional emails about the event and resources. You can unsubscribe any time.
                </div>
              </div>

              {/* Quick preview — key lessons (vertical layout) */}
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-white/90 to-white/60 dark:from-secondary/80 dark:to-secondary/60 p-8 shadow-xl backdrop-blur-sm">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 mb-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary dark:text-white mb-2">
                    Quick Preview — What You'll Learn
                  </h3>
                  <p className="text-sm text-secondary/60 dark:text-white/60">
                    Three core courses that transform your understanding
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                    {[
                    {
                        title: "Become Private",
                        desc: "Learn how the public system treats you as a corporate fiction and how to correct your status using a clear lawful framework so you can confidently live in the private.",
                        icon: Shield,
                        gradient: "from-blue-500/10 to-blue-600/5",
                        iconBg: "bg-blue-500/10",
                        iconColor: "text-blue-600 dark:text-blue-400",
                    },
                    {
                        title: "Operate Private",
                        desc: "Learn how to live, build, and do business in the private sector. This course shows you how to use business trusts and private associations to protect assets, manage commerce, plan legacies, and operate outside public jurisdiction.",
                        icon: BookOpen,
                        gradient: "from-green-500/10 to-green-600/5",
                        iconBg: "bg-green-500/10",
                        iconColor: "text-green-600 dark:text-green-400",
                    },
                    {
                        title: "Financial Freedom",
                        desc: "Learn to build elite business credit with Unincorporated Business Trusts, repair your personal credit, and establish Private Merchant Processing — no banks, no KYC, no risk of shutdowns.",
                        icon: DollarSign,
                        gradient: "from-amber-500/10 to-amber-600/5",
                        iconBg: "bg-amber-500/10",
                        iconColor: "text-amber-600 dark:text-amber-400",
                    },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                      <div
                          key={idx}
                          className={`group relative flex flex-col gap-3 bg-gradient-to-br ${item.gradient} dark:from-slate-800/80 dark:to-slate-800/60 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                      >
                          <div className="flex items-start gap-4">
                            <div className={`flex-none w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                              <Icon className={`w-6 h-6 ${item.iconColor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <h4 className="text-lg font-bold text-secondary dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
                                  {item.title}
                                </h4>
                                <div className="flex-none w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                  <span className="text-xs font-bold text-primary">{idx + 1}</span>
                                </div>
                              </div>
                              <p className="text-sm leading-relaxed text-secondary/70 dark:text-white/70">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowRight className="w-4 h-4 text-primary" />
                          </div>
                      </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
