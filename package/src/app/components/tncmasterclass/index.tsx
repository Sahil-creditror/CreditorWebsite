"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Scale,
  Landmark,
  ShieldCheck,
  ScrollText,
  Building2,
  HandCoins,
  BadgeCheck,
  Sparkles,
  SunMedium,
  MoonStar,
} from "lucide-react";

/**
 * MasterclassMembershipTC – Premium T&C page
 * - Fully responsive, accessible
 * - Beautiful animated background (aurora + blobs + grid)
 * - Dark mode aware (uses Tailwind `dark:` variants)
 * - Subtle, tasteful motion via Framer Motion
 * - Sticky CTA with agree checkbox
 */

const sections = [
  {
    icon: <Scale className="h-6 w-6" />,
    title: "1. Purpose and Legal Standing",
    body: (
      <>
        <p>
          This Private Montessori Association (PMA) is established to provide a secure and private platform for
          its members to conduct lawful business, exchange knowledge, and seek counsel in education, finance,
          law, health, and other areas—outside the jurisdiction of governmental and regulatory authorities.
        </p>
        <p className="mt-4">We believe that the Holy Scriptures, the U.S. Constitution, and the various State Constitutions guarantee our members:</p>
        <ul className="mt-3 space-y-2">
          <Li>Absolute freedom of religion, speech, petition, and assembly.</Li>
          <Li>The right to gather lawfully to help one another assert and protect our rights.</Li>
          <Li>Protection from unreasonable search and seizure.</Li>
          <Li>The right to not incriminate ourselves.</Li>
          <Li>The freedom to exercise all other unalienable rights as granted by our Creator and protected by the U.S. and State Constitutions.</Li>
        </ul>
      </>
    ),
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    title: "2. Private Domain & Freedom of Association",
    body: (
      <>
        <p>
          <strong>WE HEREBY DECLARE</strong> that we are exercising our right to freedom of association, as protected by the U.S. Constitution and State Constitutions. This means that:
        </p>
        <ul className="mt-3 space-y-2">
          <Li>Association activities are restricted to the private domain only.</Li>
          <Li>We operate outside the jurisdiction of government agencies, entities, officers, agents, contractors, or other representatives, as permitted by law.</Li>
          <Li>All interactions within the Association are private contractual matters between members.</Li>
          <Li>By agreeing to this membership, you acknowledge that your private membership supersedes any public obligations concerning disclosure, investigation, or enforcement related to the Association.</Li>
        </ul>
      </>
    ),
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "3. Membership Rights and Responsibilities",
    body: (
      <>
        <p>Members exercise their right to associate freely and conduct business in the private domain.</p>
        <p className="mt-3">Members may seek counsel, advice, and assistance from other members on matters including but not limited to:</p>
        <ol className="mt-3 list-decimal list-inside md:list-outside md:pl-6 space-y-1">
          <li>Education</li>
          <li>Financial & Business Matters</li>
          <li>Legal Issues</li>
          <li>Health & Wellness</li>
          <li>Personal Development</li>
        </ol>
        <p className="mt-3">Members maintain absolute freedom to choose the methods, strategies, and solutions they deem best for themselves.</p>
        <p className="mt-3">The Association does not recognize the authority of any governmental regulatory agency over its internal activities.</p>
        <p className="mt-3">Members are strictly prohibited from advertising or promoting their own businesses, products, or services within Creditor Academy, its websites, or Social Media Groups without explicit prior written approval. Any member found advertising without authorization will be subject to immediate banning from the Association, its platforms, and any related groups.</p>
      </>
    ),
  },
  {
    icon: <HandCoins className="h-6 w-6" />,
    title: "4. Masterclass Membership & Monthly Fee",
    body: (
      <ul className="space-y-2">
        <Li>To maintain an active membership, a monthly fee of $69 USD is required.</Li>
        <Li>Membership remains active as long as the fee is paid on time.</Li>
        <Li>Failure to pay the fee results in automatic termination of membership.</Li>
        <Li>Terminated members may reapply, subject to approval by the Association.</Li>
        <Li>Once a membership fee payment is made, it is non-refundable.</Li>
      </ul>
    ),
  },
  {
    icon: <ScrollText className="h-6 w-6" />,
    title: "5. Cancellation Policy",
    body: (
      <>
        <p>
          A member may cancel their membership. However, if a member cancels within the first year, a cancellation fee will be applied. The fee will be the lesser of:
        </p>
        <ul className="mt-3 space-y-2">
          <Li>$399 (USD)</Li>
          <Li>The sum of the remaining monthly fees for the remainder of what would have been the first 12 months of membership.</Li>
        </ul>
        <p className="mt-3">
          For example, if a member cancels after six months, the cancellation fee would be the lesser of $399 or (6 months × $69 = $414). In this case, the cancellation fee would be $399.
        </p>
        <p className="mt-3">This fee compensates the Association for costs incurred due to early termination. Members acknowledge and agree that this cancellation fee is a reasonable estimate of damages that the Association will incur in the event of early termination.</p>
      </>
    ),
  },
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: "6. Membership Eligibility and Termination",
    body: (
      <ul className="space-y-2">
        <Li>Membership is open to any individual who agrees to abide by these principles and is not subject to prior sanction, suspension, or expulsion from the Association.</Li>
        <Li>Membership may be terminated at the discretion of the Association's Trustees or designated representatives if a member's actions are deemed detrimental to the integrity or well-being of the Association.</Li>
        <Li>Members agree not to pursue legal action against any fellow member unless a clear and present danger exists, as determined by the Association.</Li>
        <Li>Membership is non-transferable and may be revoked if a member violates any terms of this agreement.</Li>
      </ul>
    ),
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "7. Dispute Resolution & Limitation of Liability",
    body: (
      <>
        <p>
          Since the Association is protected by the First, Fourth, Fifth, Ninth, and Tenth Amendments of the U.S. Constitution, it is outside the jurisdiction of federal and state authorities regarding complaints or grievances against its members.
        </p>
        <ul className="mt-3 space-y-2">
          <Li>All disputes shall be resolved internally through the Association's designated committee or tribunal.</Li>
          <Li>Members waive their right to pursue external legal action against the Association or any of its members.</Li>
        </ul>
      </>
    ),
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "8. Voluntary Participation & Legal Standing",
    body: (
      <ul className="space-y-2">
        <Li>I affirm that I am voluntarily joining the Creditor Academy and that I do not represent any government entity, regulatory body, or enforcement agency.</Li>
        <Li>I acknowledge that my activities within the Association are private contractual matters, not subject to disclosure to local, state, or federal authorities.</Li>
        <Li>I understand that my membership can be revoked if I engage in any abusive, violent, destructive, or harassing behavior toward another member.</Li>
      </ul>
    ),
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: "9. Agreement & Acknowledgment",
    body: (
      <ul className="space-y-3">
        <Checklist defaultChecked> I have read and understood this document in its entirety.</Checklist>
        <Checklist defaultChecked> I am joining of my own free will, without coercion or pressure.</Checklist>
        <Checklist defaultChecked> I acknowledge that this is a private association and agree to abide by its rules.</Checklist>
        <Checklist defaultChecked> I understand that failure to comply with membership terms may result in termination.</Checklist>
      </ul>
    ),
  },
];

export default function MasterclassMembershipTC() {
  const [agreed, setAgreed] = useState(false);
  const [darkHint, setDarkHint] = useState(false);

  // Reduced-motion preference
  const prefersReduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-800 dark:bg-neutral-950 dark:text-slate-200">
      {/* Animated Background */}
      <AnimatedBackground paused={prefersReduced} />

      {/* Content Card */}
      <section className="relative mx-auto max-w-4xl px-4 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-neutral-900/60 shadow-xl shadow-slate-800/5 dark:shadow-black/30 backdrop-blur-xl overflow-hidden"
        >
          {/* Card top gradient border */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-300" />

          {/* Hero title */}
          <div className="px-6 md:px-10 pt-8 md:pt-10 pb-6 md:pb-8">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-center"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 dark:from-blue-300 dark:via-indigo-300 dark:to-cyan-300">
                Membership Terms & Conditions
              </span>
            </motion.h2>
            <p className="mt-4 text-center text-base md:text-lg text-slate-600 dark:text-slate-300">
              By joining our Private Association, you acknowledge and agree to the following terms.
            </p>
            {/* Agree + CTA moved here */}
            <div className="mt-6 flex flex-col items-center gap-4">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 rounded accent-indigo-600 dark:accent-indigo-400"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span className="text-base md:text-lg">I have read and agree to the Terms and Conditions.</span>
              </label>

              <motion.button
                type="button"
                onClick={() => {
                  if (!agreed) return;
                  window.location.href = "https://quickclick.com/r/m7o5skh90z5o7s6x6bg9yeklf7ql3f";
                }}
                disabled={!agreed}
                whileTap={{ scale: agreed ? 0.98 : 1 }}
                className={`relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-70 ${
                  agreed
                    ? "bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-xl"
                    : "bg-slate-200 dark:bg-neutral-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                <span>Enroll Now</span>
              </motion.button>
            </div>
          </div>

          {/* Sections */}
          <div className="px-6 md:px-10 pb-10 md:pb-12">
            <div className="divide-y divide-black/5 dark:divide-white/10">
              {sections.map((s, i) => (
                <Section key={i} index={i + 1} icon={s.icon} title={s.title}>
                  {s.body}
                </Section>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom padding */}
      <div className="h-16" />
    </main>
  );
}

/** Utility: List item with check icon */
function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-indigo-500 dark:text-indigo-400" />
      <span>{children}</span>
    </li>
  );
}

/** Utility: Checklist row with checkbox */
function Checklist({ children, defaultChecked = false }: { children: React.ReactNode; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <li className="flex items-start gap-3">
      <input
        type="checkbox"
        className="mt-1 h-5 w-5 rounded accent-indigo-600 dark:accent-indigo-400"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span>{children}</span>
    </li>
  );
}

/** Section wrapper with subtle reveal animation */
function Section({
  index,
  icon,
  title,
  children,
}: {
  index: number;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="py-6 md:py-8"
    >
      <div className="mb-3 md:mb-4 flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-400/20">
          {icon}
        </div>
        <h3 className="text-lg md:text-xl font-semibold tracking-tight">
          {title}
        </h3>
      </div>
      <div className="prose prose-slate max-w-none dark:prose-invert prose-p:leading-relaxed prose-li:leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

/** Animated layered background (aurora, blobs, grid, noise) */
function AnimatedBackground({ paused = false }: { paused?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Aurora sweep */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={paused ? { opacity: 0.25 } : { opacity: [0.25, 0.45, 0.25] }}
        transition={paused ? { duration: 6 } : { duration: 10, repeat: Infinity }}
        className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.25), rgba(99,102,241,0.25), rgba(34,211,238,0.25), rgba(59,130,246,0.25))",
        }}
      />

      {/* Floating gradient blobs */}
      <motion.div
        initial={{ x: -200, y: -120 }}
        animate={paused ? { x: -200, y: -120 } : { x: [ -200, 40, -60, -200 ], y: [ -120, -60, 30, -120 ] }}
        transition={paused ? { duration: 12 } : { duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl bg-gradient-to-tr from-sky-400/35 to-fuchsia-400/35 dark:from-sky-500/25 dark:to-fuchsia-500/25"
      />
      <motion.div
        initial={{ x: 220, y: 160 }}
        animate={paused ? { x: 220, y: 160 } : { x: [ 220, -20, 80, 220 ], y: [ 160, 80, -20, 160 ] }}
        transition={paused ? { duration: 12 } : { duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl bg-gradient-to-tr from-amber-300/35 to-rose-400/35 dark:from-amber-300/20 dark:to-rose-400/20"
      />

      {/* Subtle grid (light & dark variants) */}
      <div className="absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(30,41,59,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,41,59,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 hidden dark:block opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(226,232,240,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,232,240,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "center",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\" viewBox=\"0 0 400 400\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.6\"/></svg>')" }}
      />
    </div>
  );
}
