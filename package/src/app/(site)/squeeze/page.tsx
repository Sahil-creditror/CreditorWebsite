import Image from "next/image";
import { Clock } from "lucide-react";
import SqueezeEmbed from "@/app/components/squeeze/Embed";
import Script from "next/script";

export const metadata = {
  title: "Creditor Academy — Free Guide",
  description: "Discover how to restore credit, operate private, and protect your estate.",
};

export default function Page() {
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

              <div className="px-6 py-8 md:px-10 md:py-12 bg-white/80 dark:bg-secondary/60 backdrop-blur-sm">
                <h1 className="text-3xl md:text-4xl font-extrabold text-secondary dark:text-white leading-tight">
                  Creditor Academy <span className="text-primary">Private Commerce Masterclass</span>
                </h1>
                <p className="mt-2 text-secondary/80 dark:text-white/80 max-w-2xl">
                  A practical, no-fluff session on restoring credit, operating privately, and protecting your estate. Live demonstrations, downloadable templates, and real member case studies.
                </p>

                {/* Key badges */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary ring-1 ring-primary/20">Free orientation</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-sm font-semibold text-secondary ring-1 ring-black/5 dark:bg-neutral-900 dark:text-blue-300 dark:ring-blue-400/40">
                    Weekly — Saturdays
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700 ring-1 ring-amber-100">Limited seats</span>
                </div>

                {/* Image collage */}
                <div className="mt-2 relative rounded-lg overflow-hidden shadow-sm w-full h-64 md:h-110">
                <Image
                    src="/images/squeeze/squeeze.webp"
                    alt="Creditor Academy banner"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute left-3 bottom-3 bg-white/80 dark:bg-neutral-800/70 rounded-md px-3 py-1 text-sm font-medium">
                    Live demo + Q&A
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
                            src="/images/Icon/right-check.svg"
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
              <div className="mt-4 rounded-xl bg-white/60 dark:bg-secondary/60 p-6 shadow-sm ring-1 ring-black/5">
                <div className="font-semibold text-secondary dark:text-white text-center text-xl mb-6">
                    Quick Preview — What You’ll Learn
                </div>

                <div className="flex flex-col gap-4">
                    {[
                    {
                        title: "Become Private",
                        desc: "Learn how the public system treats you as a corporate fiction and how to correct your status using a clear lawful framework so you can confidently live in the private.",
                    },
                    {
                        title: "Operate Private",
                        desc: "Learn how to live, build, and do business in the private sector. This course shows you how to use business trusts and private associations to protect assets, manage commerce, plan legacies, and operate outside public jurisdiction.",
                    },
                    {
                        title: "Financial Freedom",
                        desc: "Learn to build elite business credit with Unincorporated Business Trusts, repair your personal credit, and establish Private Merchant Processing — no banks, no KYC, no risk of shutdowns.",
                    },
                    ].map((item, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col gap-2 bg-white dark:bg-slate-800/60 rounded-lg p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-300 hover:scale-[1.02]"
                    >
                        <div className="text-lg font-semibold text-primary">{item.title}</div>
                        <div className="text-sm text-secondary/80 dark:text-white/80">{item.desc}</div>
                    </div>
                    ))}
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
