"use client";
import React from "react";

    export default function GuaranteesPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 font-sans pt-24">
      {/* HERO */}
      <header className="w-full bg-gradient-to-r from-[#03253b] via-[#043a63] to-[#0b5fa0] text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 lg:py-36 mt-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-sm">Our Guarantees</h1>
              <p className="mt-4 text-lg text-sky-100 max-w-3xl leading-relaxed">
                Clear, simple commitments — we stand behind the core delivery promises for every tradeline purchased by the
                stated purchase deadline. Read the guarantees below and important exclusions so you know exactly what to expect.
              </p>

              <div className="mt-6 flex gap-3">
                <a href="#guarantees" className="px-5 py-3 bg-white text-[#0b5fa0] rounded-full font-semibold">View Guarantees</a>
                <a href="/services_page/tradeline-exchange/contact" className="px-5 py-3 border border-white/20 rounded-full">Contact Support</a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/6 p-6 rounded-xl border border-white/10">
                <div className="font-semibold mb-2 text-white">Guarantee snapshot</div>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li>✅ Posts by reporting period</li>
                  <li>✅ 2 monthly reporting cycles</li>
                  <li>✅ 2-of-3 bureaus guaranteed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main id="guarantees" className="max-w-5xl mx-auto -mt-12 px-6 pb-20 space-y-10">
        <section className="bg-[#eaf6ff] rounded-2xl p-8 shadow-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-slate-900">What We Guarantee</h2>
          <p className="mt-3 text-slate-700">Tradeline Exchange stands behind the following commitments for tradelines purchased by the purchase deadline:</p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl border border-blue-100">
              <div className="text-sm font-semibold text-slate-900 mb-2">Posting & Reporting</div>
              <ul className="list-disc pl-5 text-slate-700 space-y-2">
                <li>If you buy any tradeline by the purchase deadline, it will post on your credit report during the next reporting period listed for that tradeline.</li>
                <li>Tradelines will post to any <strong>two of the three</strong> major credit bureaus (Equifax, Experian, TransUnion).</li>
                <li>For each tradeline purchased, you will remain on the card as an authorized user for <strong>two monthly reporting cycles</strong>.</li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-xl border border-blue-100">
              <div className="text-sm font-semibold text-slate-900 mb-2">Account Quality & Utilization</div>
              <ul className="list-disc pl-5 text-slate-700 space-y-2">
                <li>All tradelines are guaranteed to have a perfect payment history — no late payments will be reported.</li>
                <li>The tradeline's utilization ratio while you are on the account will be maintained at <strong>15% or lower</strong>.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/80 rounded-lg border border-blue-100">
            <div className="font-semibold text-slate-900">How we honor these guarantees</div>
            <p className="mt-2 text-slate-700">We monitor reporting windows and verify postings. If a tradeline does not post within the guaranteed reporting period, follow our refund process (documented on the Report a Non-Posting page) to request a full refund for the affected tradeline.</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
          <h3 className="text-2xl font-bold">What We Do NOT Guarantee</h3>
          <p className="mt-3 text-slate-700">It’s important to be clear about the limits of our service. The following are <strong>not</strong> guaranteed:</p>

          <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-2">
            <li>We do not guarantee any specific increase in your credit score — you may see no change or a negative change depending on your unique credit file and scoring models.</li>
            <li>We do not guarantee that purchasing tradelines will result in new funding, loans, credit cards, or other credit approvals.</li>
            <li>Our customer service team will not provide speculative estimates about how many points you may gain or whether a tradeline will achieve a target score. We do not talk about credit score predictions.</li>
            <li>We do not guarantee any result beyond getting a tradeline to post as described in the guarantees above.</li>
            <li>Tradelines will not post if you have a fraud alert or credit freeze with any bureau — please remove these before purchasing to ensure posting.</li>
          </ul>
        </section>

        <section className="bg-[#eaf6ff] rounded-2xl p-8 shadow-lg border border-blue-200">
          <h3 className="text-2xl font-bold text-slate-900">Refunds & Non-Posting Policy</h3>
          <p className="mt-3 text-slate-700">If a tradeline does not post within the guaranteed reporting period, you may request a refund. Refund requests must be submitted in writing and include the documentation we require to verify non-posting.</p>

          <ol className="mt-4 list-decimal list-inside text-slate-700 space-y-3">
            <li>Create a CreditKarma.com account and confirm your credit was updated after the last date of the reporting period.</li>
            <li>Confirm the tradeline is not reporting to at least two bureaus (TransUnion & Equifax). If CreditKarma shows the tradeline reporting to one bureau, provide Experian data to demonstrate non-posting to two bureaus.</li>
            <li>Collect and attach the following: order confirmation, dated screenshots showing no posting, and any requested supporting evidence.</li>
            <li>Email the documentation to our support address (support@example.com) with a written refund request. Refunds are processed after verification.</li>
          </ol>

          <div className="mt-6 p-4 bg-white rounded-md border border-blue-100">
            <div className="font-semibold">Quick checklist</div>
            <ul className="mt-2 text-slate-700 pl-4 list-disc">
              <li>Confirm posting date is after reporting period end.</li>
              <li>Collect CreditKarma screenshots showing no posting on two bureaus.</li>
              <li>Email support with order confirmation and screenshots.</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 text-center">
          <h3 className="text-2xl font-bold mb-3">Questions about guarantees?</h3>
          <p className="text-slate-700">If anything on this page is unclear, contact our support team and we'll walk through your specific purchase and reporting windows.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a href="/services_page/tradeline-exchange/contact" className="px-6 py-3 bg-[#0b5fa8] text-white rounded-md font-semibold">Contact Support</a>
            <a href="/services_page/tradeline-exchange/buy-tradelines" className="px-6 py-3 border border-slate-200 rounded-md">View Tradeline List</a>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-10 text-sm text-slate-500">
        <div>Published by Tradeline Exchange • 12/12/2025</div>
      </footer>
    </div>
  );
}

