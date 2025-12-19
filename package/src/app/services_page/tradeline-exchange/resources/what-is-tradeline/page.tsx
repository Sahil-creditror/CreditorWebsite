// @ts-nocheck
"use client";

import { useState } from "react";

/**
 * Full-page "What Is a Tradeline?" — wide, full-bleed layout
 * - Use on a landing-style page where content spans the viewport
 * - Dark hero, alternating wide sections, larger typography
 */

export default function WhatIsTradelinePage() {
  const [copied, setCopied] = useState(false);

  // calculator state
  const [currentAccounts, setCurrentAccounts] = useState(3);
  const [currentAvgAge, setCurrentAvgAge] = useState(2.5);
  const [newTradelineAge, setNewTradelineAge] = useState(10);
  const [newLimit, setNewLimit] = useState(10000);
  const [currentTotalLimit, setCurrentTotalLimit] = useState(6000);
  const [currentUtil, setCurrentUtil] = useState(45);

  function computeNewAvg() {
    const totalAge = currentAvgAge * currentAccounts + newTradelineAge;
    const newAvg = totalAge / (currentAccounts + 1);
    return Math.round(newAvg * 100) / 100;
  }

  function computeNewUtil() {
    const balances = (currentTotalLimit * currentUtil) / 100;
    const newTotalLimit = currentTotalLimit + Number(newLimit || 0);
    if (newTotalLimit === 0) return 0;
    const newUtil = (balances / newTotalLimit) * 100;
    return Math.round(newUtil * 100) / 100;
  }

  async function handleCopy() {
    try {
      const text = document.getElementById("content-block")?.innerText || "";
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (e) {}
  }

  return (
    <main className="w-full min-h-screen text-slate-800">
      {/* HERO - full bleed */}
      <section className="w-full bg-gradient-to-r from-[#02283b] to-[#0a5fa0] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">What Is a Tradeline?</h1>
              <p className="mt-6 text-lg lg:text-xl text-sky-100/90 max-w-3xl leading-relaxed">
                A tradeline is any account that appears on your credit report — mortgages, auto loans,
                student loans, installment loans, and credit cards. Below we explain authorized user
                tradelines, why people buy them, and how to evaluate options.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#calculator"
                  className="inline-block bg-white text-[#0a5fa0] px-5 py-3 rounded-full font-semibold shadow hover:opacity-95 transition"
                >
                  Try the Tradeline Calculator
                </a>

                <button
                  onClick={handleCopy}
                  className="inline-block bg-white/10 border border-white/20 text-white px-5 py-3 rounded-full font-medium hover:bg-white/20 transition"
                >
                  {copied ? "Copied" : "Copy Page Text"}
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/6 rounded-xl p-6">
                <div className="text-sm font-semibold text-white">At-a-glance</div>
                <ul className="mt-4 text-white/90 space-y-2 leading-relaxed">
                  <li>• We sell authorized user tradelines.</li>
                  <li>• Buying may add an account’s history to your report (issuer-dependent).</li>
                  <li>• Seasoned tradelines (≥2 yrs) are generally stronger.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wide content container - sections alternate backgrounds */}
      <div id="content-block" className="max-w-7xl mx-auto px-6 space-y-16 py-12">
        {/* Definition - wide light area */}
        <section className="w-full">
          <h2 className="text-2xl font-bold mb-4">Definition</h2>
          <p className="text-lg leading-relaxed text-slate-700">
            In the broadest sense, a tradeline is any account that appears on your credit report.
            Types include mortgages, auto loans, student loans, furniture loans, installment loans,
            and credit cards.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            If you're looking to purchase tradelines, you’re likely referring to <strong>authorized
            user tradelines</strong>: you pay to become an authorized user on someone else’s card so the
            account (often with its history) appears on your credit report.
          </p>
        </section>

        {/* Why buy - dark wide strip */}
        <section className="w-full rounded-md" style={{ background: "linear-gradient(180deg,#062d4f,#083d6a)" }}>
          <div className="px-6 py-10">
            <h3 className="text-2xl font-bold text-white mb-4">Why would someone buy a tradeline?</h3>
            <p className="text-lg text-sky-100 leading-relaxed max-w-4xl">
              Tradelines form the core of your credit report. Adding a high-quality, seasoned tradeline
              with a strong payment history and a high credit limit can positively influence signals like
              average account age and utilization. Remember, scoring algorithms are proprietary — results
              vary by file and bureau.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white">If you currently have bad credit</h4>
                <p className="mt-2 text-sky-100 leading-relaxed">
                  Rebuilding is similar: open healthy accounts and make timely payments. Tradelines can
                  accelerate certain signals, but removing errors via credit dispute processes is often
                  essential as well.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white">What to watch for</h4>
                <ul className="mt-2 text-sky-100 leading-relaxed space-y-1">
                  <li>• Some issuers limit how much history is reported for authorized users.</li>
                  <li>• Tradelines won’t remove negative items elsewhere on your report.</li>
                  <li>• No provider can guarantee a specific score increase.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How tradelines help - light */}
        <section className="w-full">
          <h3 className="text-2xl font-bold mb-4">How can tradelines help?</h3>
          <p className="text-lg leading-relaxed text-slate-700 max-w-4xl">
            When added as an authorized user, many issuers report the full account history on your report.
            For example, if you’re added to a 20-year-old card, it may appear as a 20-year account on your
            file — which can be valuable if that account has a clean payment history.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-slate-700 max-w-4xl">
            Tradelines can also affect utilization (total balances relative to total credit limits).
            Because scoring is complex and proprietary, the exact impact varies by bureaus and issuers.
            Use the calculator below to model the arithmetic for your specific situation.
          </p>
        </section>

        {/* Which to buy - dark */}
        <section className="w-full rounded-md" style={{ background: "linear-gradient(180deg,#042744,#073a59)" }}>
          <div className="px-6 py-10">
            <h3 className="text-2xl font-bold text-white mb-4">Which tradelines should I buy?</h3>
            <p className="text-lg text-sky-100 leading-relaxed max-w-4xl">
              Aim for tradelines that are older than your current average age and that have higher credit
              limits than your current accounts. That combination helps increase average age and reduce
              utilization impact.
            </p>

            <ul className="mt-4 grid sm:grid-cols-3 gap-4 text-sky-100">
              <li>• Prefer seasoned, high-limit accounts from major issuers.</li>
              <li>• Avoid short-age, low-limit tradelines that won’t move averages.</li>
              <li>• Blend tradelines with primary account building for long-term strength.</li>
            </ul>
          </div>
        </section>

        {/* Authorized vs primary - light */}
        <section className="w-full">
          <h3 className="text-2xl font-bold mb-4">Authorized user tradelines vs primary tradelines</h3>
          <p className="text-lg leading-relaxed text-slate-700 max-w-4xl">
            Authorized user tradelines appear on your report but you aren’t financially responsible for them.
            A primary tradeline is an account in your name for which you are responsible. Primary accounts
            are best long-term, but a seasoned, high-limit authorized user tradeline can offer stronger
            short-term improvements in many files.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-slate-700 max-w-4xl">
            Buying primary tradelines is risky and often fraudulent — exercise caution. Legitimate credit
            in your name is ideal, but it starts with no age.
          </p>
        </section>

        {/* Seasoned - dark */}
        <section className="w-full rounded-md" style={{ background: "linear-gradient(180deg,#042b47,#074058)" }}>
          <div className="px-6 py-10">
            <h3 className="text-2xl font-bold text-white mb-4">What is a seasoned tradeline?</h3>
            <p className="text-lg text-sky-100 leading-relaxed max-w-4xl">
              “Seasoned” refers to how long an account has been open. Accounts under two years generally
              aren’t considered seasoned. Tradelines two years or older are typically considered to
              provide meaningful age benefits.
            </p>
          </div>
        </section>

        {/* Calculator - full width two-column */}
        {/* <section id="calculator" className="w-full bg-white rounded-md px-6 py-10 shadow">
          <h3 className="text-2xl font-bold mb-6">Tradeline Impact Calculator (simple model)</h3>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Current open accounts</label>
                <input
                  type="number"
                  value={currentAccounts}
                  min={0}
                  onChange={(e) => setCurrentAccounts(Math.max(0, Number(e.target.value || 0)))}
                  className="mt-2 w-48 px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Current average age (years)</label>
                <input
                  type="number"
                  step="0.1"
                  value={currentAvgAge}
                  min={0}
                  onChange={(e) => setCurrentAvgAge(Math.max(0, Number(e.target.value || 0)))}
                  className="mt-2 w-48 px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">New tradeline age (years)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newTradelineAge}
                  min={0}
                  onChange={(e) => setNewTradelineAge(Math.max(0, Number(e.target.value || 0)))}
                  className="mt-2 w-48 px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">New tradeline limit (USD)</label>
                <input
                  type="number"
                  value={newLimit}
                  min={0}
                  onChange={(e) => setNewLimit(Math.max(0, Number(e.target.value || 0)))}
                  className="mt-2 w-48 px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Current total credit limit (USD)</label>
                <input
                  type="number"
                  value={currentTotalLimit}
                  min={0}
                  onChange={(e) => setCurrentTotalLimit(Math.max(0, Number(e.target.value || 0)))}
                  className="mt-2 w-64 px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Current utilization (%)</label>
                <input
                  type="number"
                  value={currentUtil}
                  min={0}
                  max={100}
                  onChange={(e) => setCurrentUtil(Math.max(0, Math.min(100, Number(e.target.value || 0))))}
                  className="mt-2 w-48 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="mt-4 p-4 bg-slate-50 rounded-md">
                <div className="text-sm text-slate-700">New average account age</div>
                <div className="text-3xl font-bold mt-1">{computeNewAvg()} yrs</div>

                <div className="mt-4 text-sm text-slate-700">Estimated utilization after addition</div>
                <div className="text-xl font-semibold">{computeNewUtil()}%</div>
                <div className="text-xs text-slate-500 mt-2">(Assumes balances unchanged; only limit changes.)</div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Resources list */}
        <section className="w-full">
          <h3 className="text-2xl font-bold mb-4">More Tradeline Resources</h3>
          <ul className="grid md:grid-cols-2 gap-4 text-lg">
            <li><a href="/tradeline/resources#knowledge" className="text-[#0b5fa8] hover:underline">Tradeline Knowledge Center</a></li>
            <li><a href="/tradeline/resources#infographic" className="text-[#0b5fa8] hover:underline">Tradelines 101 (Infographic)</a></li>
            <li><a href="/tradeline/resources#how-do-tradelines-work" className="text-[#0b5fa8] hover:underline">How Do Tradelines Work?</a></li>
            <li><a href="/tradeline/resources#buyers-guide" className="text-[#0b5fa8] hover:underline">How to Choose a Tradeline: Buyer's Guide</a></li>
            <li><a href="/tradeline/resources#common-mistakes" className="text-[#0b5fa8] hover:underline">Common Mistakes Made When Buying Tradelines</a></li>
            <li><a href="/tradeline/resources#secret" className="text-[#0b5fa8] hover:underline">The #1 Secret on How to Unlock the Power of Tradelines</a></li>
          </ul>
        </section>

        {/* Footer CTAs */}
        <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 py-8">
          <div className="text-lg text-slate-700 max-w-2xl">
            For tailored guidance, read our <a href="/tradeline/resources#buyers-guide" className="text-[#0b5fa8] font-semibold">Buyer's Guide</a>.
          </div>

          <div className="flex gap-4">
            <a href="/services_page/tradeline-exchange/buy-tradelines" className="px-6 py-3 bg-[#0b5fa8] text-white rounded-md font-semibold shadow">Shop Tradelines</a>
            <a href="/services_page/tradeline-exchange/contact" className="px-6 py-3 border border-slate-200 rounded-md text-slate-700">Contact Sales</a>
          </div>
        </section>
      </div>
    </main>
  );
}
