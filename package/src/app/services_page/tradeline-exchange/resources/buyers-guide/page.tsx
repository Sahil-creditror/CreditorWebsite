"use client";
import React, { useState } from "react";

// BuyersGuide.jsx
// Full-page, wide "Buyer's Guide" landing section for tradelines
// - Full-bleed hero with dark-blue theme
// - Long-form content broken into readable sections
// - Interactive calculators for average age & utilization
// - Example scenarios with instant math
// - Accordion for common mistakes + conclusions
// - No external icon libs (inline SVGs)

export default function BuyersGuide() {
  // Calculator state (shared between small and large calculators)
  const [accountsCount, setAccountsCount] = useState(10);
  const [avgAge, setAvgAge] = useState(8.5);
  const [newLineAge, setNewLineAge] = useState(18);
  const [newLineLimit, setNewLineLimit] = useState(20000);

  const [curTotalLimit, setCurTotalLimit] = useState(120000);
  const [curUtil, setCurUtil] = useState(35);

  // helpers
  const computeAvgAfter = (accounts: number, currentAvg: number, addedAge: number) => {
    if (accounts === 0) return addedAge;
    const totalAge = currentAvg * accounts + Number(addedAge || 0);
    const newAvg = totalAge / (accounts + 1);
    return Math.round(newAvg * 100) / 100;
  };

  const computeUtilAfter = (currentLimit: number, currentUtilPct: number, addedLimit: number) => {
    const balances = (currentLimit * currentUtilPct) / 100;
    const newLimit = currentLimit + Number(addedLimit || 0);
    if (newLimit === 0) return 0;
    const newUtil = (balances / newLimit) * 100;
    return Math.round(newUtil * 100) / 100;
  };

  // example scenarios
  const examples = [
    {
      id: 1,
      title: "Thin file example",
      accounts: 3,
      ages: [0.5, 0.5, 1.5],
      explanation:
        "A thin file reacts strongly to any single tradeline — you may need a very old tradeline to move the average significantly.",
    },
    {
      id: 2,
      title: "Established file example",
      accounts: 10,
      ages: [4, 8, 6, 4, 7, 7, 15, 13, 9, 12],
      explanation:
        "When a file has many accounts, a single tradeline moves the average far less (you might need decades of age to move a mature average).",
    },
  ];

  // accordion state
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="w-full min-h-screen font-sans text-slate-800">
      {/* HERO */}
      <header className="w-full bg-gradient-to-r from-[#03253b] to-[#0b5fa0] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">How to Choose a Tradeline: A Buyer’s Guide</h1>
              <p className="mt-6 text-lg text-sky-100 max-w-3xl leading-relaxed">
                Practical guidance to choose tradelines that meaningfully move your credit file —
                clear math, realistic examples, and a calculator to test scenarios yourself.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#examples" className="inline-block bg-white text-[#0b5fa0] px-5 py-3 rounded-full font-semibold shadow">See Examples</a>
                <a href="#calculator" className="inline-block bg-white/10 border border-white/20 text-white px-5 py-3 rounded-full">Open Calculator</a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/6 p-6 rounded-xl">
                <div className="font-semibold mb-2">Quick facts</div>
                <ul className="text-white/90 space-y-2">
                  <li>• Age & credit limit are the primary factors to consider.</li>
                  <li>• Seasoned tradelines (≥2 yrs) are usually more valuable.</li>
                  <li>• Use math, not hype — our calculator helps.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BODY - wide sections */}
      <main className="max-w-7xl mx-auto px-6 -mt-6 space-y-16">
        {/* Intro / short checklist */}
        <section className="bg-white rounded-md p-8 shadow">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold">Understanding the two main variables</h2>
              <p className="mt-3 text-slate-700 leading-relaxed">
                When choosing tradelines the two key variables are <strong>age</strong> and
                <strong> credit limit</strong>. Other factors (perfect payment history, low utilization,
                account type) should be baseline assumptions when you buy from a reputable source.
              </p>

              <p className="mt-3 text-slate-700 leading-relaxed">
                Because credit files vary widely, the same tradeline can affect two people very
                differently. That’s why doing the arithmetic on your file is essential before buying.
              </p>
            </div>

            <div className="p-4 bg-sky-50 rounded-md">
              <div className="font-semibold">Quick checklist</div>
              <ul className="mt-2 text-sm text-slate-700 space-y-2">
                <li>• Does the tradeline increase your average age?</li>
                <li>• Does it add meaningful credit limit to help utilization?</li>
                <li>• Is the account seasoned (≥2 years)?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Credit limits & utilization - wide dark band */}
        <section className="rounded-md overflow-hidden" style={{ background: 'linear-gradient(180deg,#062d4f,#083d6a)' }}>
          <div className="p-10 text-white">
            <h3 className="text-2xl font-bold">Credit Limits and Utilization Ratios</h3>
            <p className="mt-4 max-w-4xl leading-relaxed text-sky-100">
              Many score simulators only model a change in overall utilization (new limit). Those tools
              often ignore the age a seasoned tradeline brings. Utilization guidance often recommends
              staying below 20% overall, with many pros preferring lower (10–15%). But individual-card
              utilization also matters — several individually high-utilization cards can still drag your score.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-white/6 p-4 rounded-md">
                <div className="font-semibold">Overall vs Individual</div>
                <p className="mt-2 text-sky-100 text-sm leading-relaxed">
                  Example: two cards where one is maxed and the other has a huge limit can make overall
                  utilization look healthy while the percentage of high-utilization cards remains high.
                </p>
              </div>

              <div className="bg-white/6 p-4 rounded-md">
                <div className="font-semibold">Why limits matter</div>
                <p className="mt-2 text-sky-100 text-sm leading-relaxed">
                  A high limit tradeline reduces overall utilization if balances remain constant — but
                  it doesn't fix high utilization on individual cards. Use both strategies together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Age deep-dive - white */}
        <section className="bg-white rounded-md p-8 shadow">
          <h3 className="text-2xl font-bold">Examining the Age of a Tradeline</h3>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Age is often the most powerful factor for tradelines because it impacts both payment history
            (if the tradeline has a perfect history) and length of credit history. Together those can
            account for roughly half of many scoring models' inputs.
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold">Seasoned tradelines</h4>
              <p className="mt-2 text-slate-700 leading-relaxed">
                "Seasoned" generally means at least 2 years old. The more seasoned a tradeline is, the
                more it can influence average age and oldest-account signals.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Why averages are hard to move</h4>
              <p className="mt-2 text-slate-700 leading-relaxed">
                The more accounts you have, the less impact a single tradeline will have. Review the
                examples below to see how dramatic that math can be.
              </p>
            </div>
          </div>
        </section>

        {/* Examples - interactive list */}
        <section id="examples" className="bg-slate-50 rounded-md p-8">
          <h3 className="text-2xl font-bold mb-4">Calculations & Examples</h3>

          {examples.map((ex) => {
            const sum = ex.ages.reduce((s, a) => s + a, 0);
            const avg = Math.round((sum / ex.ages.length) * 100) / 100;

            return (
              <div key={ex.id} className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold">{ex.title}</h4>
                    <p className="mt-1 text-slate-700 leading-relaxed">{ex.explanation}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-slate-500">Current average</div>
                    <div className="text-2xl font-bold">{avg} yrs</div>
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <div className="flex gap-2 flex-wrap">
                      {ex.ages.map((a, i) => (
                        <div key={i} className="px-3 py-2 bg-white rounded-md text-sm border">{a} yrs</div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm text-slate-600">If you add a tradeline with age:</label>
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="number"
                          defaultValue={ex.id === 1 ? 6 : 25}
                          className="w-32 px-3 py-2 border rounded-md"
                          onChange={(e) => {
                            // temporary local calc only
                            const v = Number(e.target.value || 0);
                            const newAvg = Math.round(((sum + v) / (ex.ages.length + 1)) * 100) / 100;
                            const notice = `New average would be ${newAvg} yrs`;
                            // small in-place alert
                            alert(notice);
                          }}
                        />
                        <div className="text-sm text-slate-600">(try 4, 6, 25)</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-md">
                    <div className="text-sm text-slate-500">Sample calculation</div>
                    <div className="mt-2 font-semibold">Try it: enter an age above</div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Calculator - full width */}
        {/* <section id="calculator" className="bg-white rounded-md p-8 shadow">
          <h3 className="text-2xl font-bold mb-4">Tradeline Calculator</h3>
          <p className="text-slate-700 mb-6">Play with the inputs below to estimate how a single tradeline affects average age and utilization.</p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm text-slate-600">Accounts in file</label>
              <input value={accountsCount} onChange={(e) => setAccountsCount(Math.max(0, Number(e.target.value || 0)))} type="number" className="w-40 px-3 py-2 border rounded-md" />

              <label className="block text-sm text-slate-600">Current average age (yrs)</label>
              <input value={avgAge} onChange={(e) => setAvgAge(Math.max(0, Number(e.target.value || 0)))} type="number" step="0.1" className="w-48 px-3 py-2 border rounded-md" />

              <label className="block text-sm text-slate-600">New tradeline age (yrs)</label>
              <input value={newLineAge} onChange={(e) => setNewLineAge(Math.max(0, Number(e.target.value || 0)))} type="number" step="0.1" className="w-48 px-3 py-2 border rounded-md" />

              <label className="block text-sm text-slate-600">New tradeline limit (USD)</label>
              <input value={newLineLimit} onChange={(e) => setNewLineLimit(Math.max(0, Number(e.target.value || 0)))} type="number" className="w-48 px-3 py-2 border rounded-md" />
            </div>

            <div className="space-y-4">
              <label className="block text-sm text-slate-600">Current total credit limit (USD)</label>
              <input value={curTotalLimit} onChange={(e) => setCurTotalLimit(Math.max(0, Number(e.target.value || 0)))} type="number" className="w-64 px-3 py-2 border rounded-md" />

              <label className="block text-sm text-slate-600">Current utilization (%)</label>
              <input value={curUtil} onChange={(e) => setCurUtil(Math.max(0, Math.min(100, Number(e.target.value || 0))))} type="number" className="w-40 px-3 py-2 border rounded-md" />

              <div className="mt-4 p-4 bg-slate-50 rounded-md">
                <div className="text-sm text-slate-600">New average age</div>
                <div className="text-3xl font-bold">{computeAvgAfter(accountsCount, avgAge, newLineAge)} yrs</div>

                <div className="mt-4 text-sm text-slate-600">Estimated utilization after tradeline</div>
                <div className="text-2xl font-semibold">{computeUtilAfter(curTotalLimit, curUtil, newLineLimit)}%</div>
                <div className="text-xs text-slate-500 mt-2">(Balances assumed unchanged.)</div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Common mistakes accordion */}
        <section className="bg-white rounded-md p-8 shadow">
          <h3 className="text-2xl font-bold mb-4">Common Mistakes People Make When Buying Tradelines</h3>

          {[
            {
              q: "Buying without the math",
              a: "Failing to calculate average-age impact and utilization changes is the biggest reason buyers are disappointed.",
            },
            {
              q: "Prioritizing price over fit",
              a: "An expensive tradeline that doesn't increase your age or limit relative to your file may not help.",
            },
            {
              q: "Assuming all issuers report history the same",
              a: "Some banks limit how much history is added for authorized users. Check reporting practices.",
            },
            {
              q: "Ignoring high individual-card utilization",
              a: "Overall utilization can improve while multiple high-util cards still exert negative pressure.",
            },
          ].map((it, i) => (
            <div key={i} className="mb-3 border rounded-md overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i as number)}
                className="w-full text-left px-4 py-3 bg-white flex items-center justify-between"
                type="button"
              >
                <div className="font-medium">{it.q}</div>
                <div className="text-slate-500">{openIdx === i ? '−' : '+'}</div>
              </button>

              {openIdx === i && <div className="p-4 text-slate-700">{it.a}</div>}
            </div>
          ))}
        </section>

        {/* Conclusions / CTAs */}
        <section className="bg-slate-50 rounded-md p-8">
          <h3 className="text-2xl font-bold mb-3">Conclusions & Next Steps</h3>
          <p className="text-slate-700 leading-relaxed">
            Authorized user tradelines can be powerful, but only if they are chosen to improve your file —
            older age and higher limits relative to your existing file are the levers that matter most.
            Use the calculator, do the math for your unique file, and combine tradelines with long-term
            primary-account building for the best results.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a href="/tradeline/buy-tradelines" className="px-6 py-3 bg-[#0b5fa8] text-white rounded-md font-semibold">Shop Tradelines</a>
            <a href="/tradeline/resources#buyers-guide" className="px-6 py-3 border border-slate-200 rounded-md">Read Buyer’s Guide</a>
            <a href="/tradeline/contact" className="px-6 py-3 border border-slate-200 rounded-md">Contact Sales</a>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-10 text-sm text-slate-500">
        <div>Published by Tradeline Exchange Company, LLC • 06/21/2021</div>
      </footer>
    </div>
  );
}

