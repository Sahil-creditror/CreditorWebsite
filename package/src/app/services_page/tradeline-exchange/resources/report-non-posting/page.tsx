"use client";
import React from "react";

export default function ReportNonPosting(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 font-sans pt-24">
      {/* HERO */}
      <header className="w-full bg-gradient-to-r from-[#03253b] via-[#043a63] to-[#0b5fa0] text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 lg:py-36 mt-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">Report a Non‑Posting</h1>
              <p className="mt-4 text-lg text-sky-100 max-w-3xl leading-relaxed">
                We guarantee purchased tradelines will post to at least two major credit bureaus within the stated reporting
                period. If a tradeline does not post, follow the simple steps below to request a full refund — we’ll verify and
                process it quickly.
              </p>

              <div className="mt-6 flex gap-3">
                <a href="#requirements" className="px-5 py-3 bg-white text-[#0b5fa0] rounded-full font-semibold">Refund Requirements</a>
                <a href="#how-to" className="px-5 py-3 border border-white/20 rounded-full">How to Request</a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/6 p-6 rounded-xl border border-white/10">
                <div className="font-semibold mb-2 text-white">Fast facts</div>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li>• Report within 21 days of first scheduled reporting date</li>
                  <li>• We verify within 2 business days</li>
                  <li>• Refund issued within 2 business days after verification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto -mt-12 px-6 pb-20 space-y-10">
        <section id="requirements" className="bg-[#eaf6ff] rounded-2xl p-8 shadow-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-slate-900">Refund Qualification — At a Glance</h2>
          <p className="mt-3 text-slate-700">To qualify for a full refund for a non-posting, you must meet the following requirements:</p>

          <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-2">
            <li>Purchase the tradeline by the stated <strong>purchase deadline</strong>.</li>
            <li>Report any non-posting in writing to <a href="mailto:counselor@creditoracademy.com" className="text-[#0b5fa8] underline">counselor@creditoracademy.com</a> within <strong>21 days</strong> of the first scheduled reporting date.</li>
            <li>Provide supporting credit monitoring credentials or credit reports (details below) so we can verify non-posting.</li>
          </ul>

          <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
            <div className="font-semibold text-slate-900">Important—check your report date first</div>
            <p className="mt-2 text-slate-700">Most credit monitoring services update monthly. Before requesting a refund, ensure the report you're viewing was updated <strong>after</strong> the reporting period ended — outdated reports are a common reason items appear missing.</p>
          </div>
        </section>

        <section id="how-to" className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
          <h3 className="text-2xl font-bold">How to Request a Refund — Step by Step</h3>
          <p className="mt-3 text-slate-700">Email <a href="mailto:counselor@creditoracademy.com" className="text-[#0b5fa8] underline">counselor@creditoracademy.com</a> and include the following information and documentation:</p>

          <ol className="mt-4 list-decimal list-inside text-slate-700 space-y-3">
            <li><strong>Your full name and order number</strong> so we can locate your purchase quickly.</li>
            <li><strong>The card ID</strong> for the specific tradeline you are requesting a refund for.</li>
            <li><strong>Credit monitoring information (choose one)</strong> — we accept the following methods for verification (see security note below):
              <ul className="mt-2 list-disc pl-5 space-y-2">
                <li><strong>CreditKarma.com:</strong> the username &amp; password for your CreditKarma account (used to verify TransUnion &amp; Equifax).</li>
                <li><strong>Experian:</strong> username &amp; password for Experian.com or CreditCheckTotal.com.</li>
                <li><strong>Full PDF credit reports:</strong> Downloaded from AnnualCreditReport.com (all pages). These are accepted and often preferred.</li>
                <li><strong>Other accepted reports:</strong> myFICO or bureau-specific reports downloaded directly from each bureau.</li>
              </ul>
            </li>
            <li><strong>Attach supporting screenshots or PDFs</strong> showing dates and the absence of the tradeline posting. Do not provide partial or cropped reports — include full pages.</li>
            <li><strong>Send the email within 21 days</strong> of the first scheduled reporting date for the tradeline.</li>
          </ol>

          <div className="mt-6 p-4 bg-[#e9f7ff] rounded-lg border border-blue-100">
            <div className="font-semibold">What happens next</div>
            <p className="mt-2 text-slate-700">Our refund team will confirm the information within <strong>2 business days</strong>. Once verified, refunds are issued within an additional <strong>2 business days</strong>. Standard bank processing times may apply.</p>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
            <div className="font-semibold">Security &amp; privacy (recommended)</div>
            <p className="mt-2 text-slate-700">For security, we prefer that you provide full PDF credit reports (AnnualCreditReport.com, myFICO, or bureau downloads) rather than account credentials. If you choose to provide account credentials, we may call you to request a two-factor authentication code — we will never ask for unrelated personal data and will handle your information per our privacy policy.</p>
          </div>
        </section>

        <section className="bg-[#eaf6ff] rounded-2xl p-8 shadow-lg border border-blue-200">
          <h3 className="text-2xl font-bold text-slate-900">Customer Service & Limitations</h3>
          <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-2">
            <li>Our phone support team cannot verify non-postings or process refunds — all refund requests must be submitted via email.</li>
            <li>We may contact you for a two-factor authentication code to access provided accounts strictly for verification purposes.</li>
            <li>Please allow standard bank clearing times after a refund has been issued.</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to submit a request?</h3>
          <p className="text-slate-700">Email <a href="mailto:counselor@creditoracademy.com" className="text-[#0b5fa8] underline">counselor@creditoracademy.com</a> with your documentation and we’ll begin verification.</p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a href="mailto:counselor@creditoracademy.com" className="px-6 py-3 bg-[#0b5fa8] text-white rounded-md font-semibold">counselor@creditoracademy.com</a>
            <a href="/services_page/tradeline-exchange/resources/report-non-posting" className="px-6 py-3 border border-slate-200 rounded-md">Read detailed instructions</a>
          </div>
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-10 text-sm text-slate-500">
        <div>Published by Tradeline Exchange Company• 06/12/2025</div>
      </footer>
    </div>
  );
}

