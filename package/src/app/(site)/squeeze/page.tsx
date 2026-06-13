"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, BookOpen, Shield, DollarSign, ArrowRight, Play, Pause, Lock } from "lucide-react";
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

  const courses = [
    {
      num: "I",
      title: "Become Private",
      desc: "Learn how the public system treats you as a corporate fiction and how to correct your status using a clear lawful framework so you can confidently live in the private.",
      icon: Shield,
      href: "/services/course-cataloges/become-private",
    },
    {
      num: "II",
      title: "Operate Private",
      desc: "Learn how to live, build, and do business in the private sector. This course shows you how to use business trusts and private associations to protect assets, manage commerce, plan legacies, and operate outside public jurisdiction.",
      icon: BookOpen,
      href: "/services/course-cataloges/operate-private",
    },
    {
      num: "III",
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

      <main className="relative min-h-screen bg-[#FAF8F4] dark:bg-[#0E1B2B] text-[#0E1B2B] dark:text-[#F6F1E7]">
        {/* subtle ledger-line texture */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 38px, currentColor 39px)",
          }}
        />

        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-[420px_1fr]">
          {/* ===================== LEFT — STICKY MEMBERSHIP CARD ===================== */}
          <aside className="lg:sticky lg:top-0 lg:h-screen border-b lg:border-b-0 lg:border-r border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10 bg-[#0E1B2B] dark:bg-black/40 text-[#F6F1E7] flex flex-col">
            <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-12">
              {/* Seal mark */}
              <div className="mb-8 flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#C9A153]">
                  <Lock className="h-5 w-5 text-[#C9A153]" />
                </div>
                <div className="font-serif text-sm uppercase tracking-[0.25em] text-[#C9A153]">
                  Creditor Academy
                </div>
              </div>

              <p className="mb-2 font-serif text-xs uppercase tracking-[0.3em] text-[#C9A153]">
                Admission &middot; No. 002,041
              </p>
              <h2 className="font-serif text-[2.5rem] leading-[1.05] tracking-tight text-[#F6F1E7]">
                Reserve your seat for the Private Pathway Orientation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#F6F1E7]/70">
                Saturday, 10:00&nbsp;AM — live walkthrough, open Q&amp;A, and member templates.
              </p>

              <div className="mt-8 rounded-2xl border border-[#F6F1E7]/15 bg-[#F6F1E7]/[0.04] p-5 backdrop-blur-sm">
                <SqueezeEmbed />
              </div>

              <div className="mt-6 flex items-center gap-3 text-xs text-[#F6F1E7]/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 flex-none text-[#C9A153]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure &amp; privacy-first — we never sell your data.
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-[#F6F1E7]/40">
                By reserving a seat you agree to receive occasional emails about the event and
                resources. Unsubscribe any time.
              </p>

              {/* Avatars / social proof */}
              <div className="mt-10 flex items-center gap-4 border-t border-[#F6F1E7]/10 pt-6">
                <div className="flex -space-x-3">
                  {["avatar_1.webp", "avatar_2.webp", "avatar_3.webp", "avatar_4.webp"].map(
                    (a, i) => (
                      <Image
                        key={i}
                        src={`/images/avatar/${a}`}
                        alt={`Member ${i + 1}`}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full ring-2 ring-[#0E1B2B] object-cover"
                      />
                    )
                  )}
                </div>
                <div className="text-xs text-[#F6F1E7]/60">
                  <span className="font-semibold text-[#F6F1E7]">2,000+</span> members learning
                  private commerce
                </div>
              </div>
            </div>
          </aside>

          {/* ===================== RIGHT — DOSSIER CONTENT ===================== */}
          <div className="px-6 py-12 md:px-14 md:py-16 lg:py-20">
            {/* Header / hero copy */}
            <header className="max-w-2xl">
              <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#C9A153]">
                Orientation Briefing
              </p>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl font-medium leading-[1.08] tracking-tight">
                Entering the Private Pathway
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#0E1B2B]/70 dark:text-[#F6F1E7]/70">
                This orientation introduces you to the foundations of operating
                privately&mdash;beyond the noise of the public system&mdash;and shows how Creditor
                Academy guides members toward greater control, protection, and independence.
                You&apos;ll explore our full range of courses and programs, each designed to help
                you build private structures, elevate your financial literacy, and navigate
                commerce with confidence.
              </p>
            </header>

            {/* Video */}
            <div className="mt-10 group relative w-full overflow-hidden rounded-xl border border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10 shadow-sm">
              <video
                ref={videoRef}
                playsInline
                controls
                controlsList="nodownload"
                className="aspect-video h-auto w-full object-cover"
                onPlay={() => {
                  setIsPlaying(true);
                  setShowControls(false);
                }}
                onPause={() => {
                  setIsPlaying(false);
                  setShowControls(true);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  togglePlayPause();
                }}
              >
                <source src="/video/squeeze.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  showControls || !isPlaying
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
                style={{ pointerEvents: "none" }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause();
                  }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F6F1E7]/95 shadow-2xl transition-transform duration-300 hover:scale-110"
                  style={{ pointerEvents: "auto" }}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="h-7 w-7 text-[#0E1B2B]" fill="currentColor" />
                  ) : (
                    <Play className="ml-1 h-7 w-7 text-[#0E1B2B]" fill="currentColor" />
                  )}
                </button>
              </div>
            </div>

            {/* Quick preview checklist */}
            <section className="mt-12 border-t border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10 pt-8">
              <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#C9A153]">
                What&apos;s Inside
              </p>
              <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-3">
                {[
                  "Status & jurisdiction basics — what to know",
                  "Private documents & trust essentials",
                  "Simple credit repair frameworks",
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[#C9A153]" />
                    <span className="text-sm leading-relaxed text-[#0E1B2B]/80 dark:text-[#F6F1E7]/80">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* The Freedom Formula */}
            <section className="mt-16 border-t border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10 pt-10">
              <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#C9A153]">
                The Path, Step by Step
              </p>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl font-medium tracking-tight">
                The Freedom Formula
              </h3>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2">
                {formula.map((step, index) => (
                  <div
                    key={index}
                    className={`flex gap-5 py-6 ${
                      index % 2 === 0 ? "sm:pr-8 sm:border-r" : "sm:pl-8"
                    } ${
                      index < 2 ? "border-b" : ""
                    } border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10`}
                  >
                    <div className="font-serif text-3xl text-[#C9A153]/50 leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="font-serif text-lg font-medium">{step.title}</div>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#0E1B2B]/70 dark:text-[#F6F1E7]/70">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Courses */}
            <section className="mt-16 border-t border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10 pt-10 pb-8">
              <p className="font-serif text-xs uppercase tracking-[0.35em] text-[#C9A153]">
                Curriculum
              </p>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl font-medium tracking-tight">
                Three courses that transform your understanding
              </h3>

              <div className="mt-8 flex flex-col">
                {courses.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.num}
                      href={item.href}
                      className="group flex flex-col gap-4 border-t border-[#0E1B2B]/10 dark:border-[#F6F1E7]/10 py-7 no-underline sm:flex-row sm:items-start sm:gap-8 last:border-b"
                    >
                      <div className="flex items-baseline gap-4 sm:w-32 sm:flex-none">
                        <span className="font-serif text-2xl text-[#C9A153]">{item.num}</span>
                        <Icon className="h-5 w-5 text-[#0E1B2B]/40 dark:text-[#F6F1E7]/40 transition-colors group-hover:text-[#C9A153]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h4 className="font-serif text-xl font-medium transition-colors group-hover:text-[#C9A153]">
                            {item.title}
                          </h4>
                          <ArrowRight className="h-4 w-4 flex-none -translate-x-1 text-[#0E1B2B]/30 dark:text-[#F6F1E7]/30 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[#C9A153]" />
                        </div>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#0E1B2B]/70 dark:text-[#F6F1E7]/70">
                          {item.desc}
                        </p>
                      </div>
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