"use client";
import React, { useState } from "react";

export default function HowToPurchase(): React.ReactElement {
  const [showRefundSteps, setShowRefundSteps] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 font-sans pt-24">
      {/* HERO - dark blue */}
      <header className="w-full bg-gradient-to-r from-[#03253b] via-[#043a63] to-[#0b5fa0] text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32 mt-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow">How to Purchase Tradelines — What to Expect</h1>
              <p className="mt-6 text-lg text-sky-100 max-w-3xl leading-relaxed">
                Quick, secure online ordering — follow the steps below. We explain the purchase flow, guarantees, and how to request a refund
                if a tradeline does not post during the guaranteed reporting period.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#how-to" className="inline-block bg-white text-[#0b5fa0] px-5 py-3 rounded-full font-semibold shadow">How to Buy</a>
                <a href="#guarantees" className="inline-block bg-white/10 border border-white/20 text-white px-5 py-3 rounded-full">Guarantees</a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-white/6 p-6 rounded-xl border border-white/10">
                <div className="font-semibold mb-2 text-white">Order snapshot</div>
                <ul className="text-white/90 space-y-2 text-sm">
                  <li>• Add tradelines to cart</li>
                  <li>• eSign Service Terms</li>
                  <li>• Upload docs & pay via eCheck</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN - light blue */}
      <main className="max-w-6xl mx-auto -mt-12 px-6 pb-20 space-y-10">
        {/* How to purchase */}
        <section id="how-to" className="bg-[#eaf6ff] rounded-2xl p-8 shadow-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-slate-900">How to Purchase Tradelines</h2>
          <p className="mt-3 text-slate-700">We are an online business — all orders must be placed through our secure website. Follow these steps to complete your purchase:</p>

          <ol className="mt-4 space-y-3 list-decimal list-inside text-slate-700">
            <li>
              <strong>Add tradelines to your cart.</strong> Browse our tradeline list and select the items you want to purchase.
            </li>
            <li>
              <strong>Open the cart (top-right) and proceed to checkout.</strong> Review the order summary carefully — each item includes reporting period details.
            </li>
            <li>
              <strong>Sign Service Terms & Disclosures.</strong> Click “Sign Service Terms & Disclosures” and complete the eSign steps — this is required before we can add you as an authorized user.
            </li>
            <li>
              <strong>Enter personal information.</strong> Provide the name, DOB, and identification info required on the checkout form.
            </li>
            <li>
              <strong>Upload documentation.</strong> In the Documentation section upload a color copy of your driver's license and your Social Security card (or required ID per the form).
            </li>
            <li>
              <strong>Provide payment via eCheck.</strong> Enter your routing and account numbers for secure eCheck payment (we display secure instructions during checkout).
            </li>
            <li>
              <strong>Submit your order.</strong> Click “Submit Order.” After successful submission you'll receive an immediate confirmation email with order and reporting details.
            </li>
          </ol>

          <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
            <div className="font-semibold text-slate-900">Pro tip</div>
            <div className="text-sm text-slate-700 mt-1">Save your confirmation email — it lists purchase deadlines and the reporting period for each tradeline. Purchase by the deadline to guarantee posting in the next reporting cycle.</div>
          </div>
        </section>

        {/* What to expect after purchase */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
          <h3 className="text-2xl font-bold">What to Expect After You Buy Tradelines</h3>
          <p className="mt-3 text-slate-700">After completing your order you'll receive a confirmation email with the details for each tradeline you purchased, including reporting period dates.</p>

          <ul className="mt-4 space-y-3 text-slate-700">
            <li>• Keep your confirmation email — it contains the reporting period and purchase deadline for each tradeline.</li>
            <li>• There is nothing else you need to do after you submit your order — your authorized-user setup is handled by our team.</li>
            <li>• We guarantee the tradeline will post by the final day of the reporting period or you will be eligible for a full refund (see refund instructions below).</li>
            <li>• Reporting is completed in a single step — you will not receive status updates beyond the confirmation email.</li>
          </ul>
        </section>

        {/* Guarantees */}
        <section id="guarantees" className="bg-[#e6f3ff] rounded-2xl p-6 shadow-inner border border-blue-200">
          <h3 className="text-2xl font-bold text-slate-900">Our Guarantees</h3>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-blue-100">
              <h4 className="font-semibold">We guarantee</h4>
              <ul className="mt-3 text-slate-700 list-disc pl-5 space-y-2">
                <li>If you buy any tradeline by the purchase deadline, it will post on your credit report during the next reporting period for that tradeline.</li>
                <li>For each tradeline purchased, you will remain on the card as an authorized user for 2 monthly reporting cycles.</li>
                <li>Tradelines will post to any 2 out of the 3 major credit bureaus.</li>
                <li>All tradelines will have a perfect payment history (no late payments ever reported).</li>
                <li>Utilization on the tradeline will be 15% or lower.</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border border-blue-100">
              <h4 className="font-semibold">What we don't guarantee</h4>
              <ul className="mt-3 text-slate-700 list-disc pl-5 space-y-2">
                <li>We do not guarantee any specific change to your credit score — results vary by file and scoring model.</li>
                <li>We do not guarantee the ability to secure loans, credit cards, or other funding as a result of purchasing tradelines.</li>
                <li>We do not guarantee any outcomes beyond getting the tradeline to post as described above.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Refund steps */}
        <section className="bg-[#eaf6ff] rounded-2xl p-8 shadow-lg border border-blue-200">
          <h3 className="text-2xl font-bold">What to Do if Your Tradeline Doesn’t Post</h3>
          <p className="mt-3 text-slate-700">If your tradeline does not post within the guaranteed reporting period you can request a refund. Follow these steps:</p>

          <ol className="mt-4 list-decimal list-inside space-y-3 text-slate-700">
            <li>Create a free CreditKarma.com account and confirm your credit was updated after the last date of the reporting period.</li>
            <li>Confirm the tradeline is not being reported on both TransUnion and Equifax. If CreditKarma shows the tradeline posted to at least 1 bureau, you must also provide Experian data to demonstrate it did not report to at least 2 bureaus.</li>
            <li>Gather the following documentation: order confirmation email, screenshots from CreditKarma showing the lack of posting, and any other requested screenshots (dates visible).</li>
            <li>Submit a written refund request via email to our support address (support@example.com) including the documentation above. Refund requests must be processed in writing.</li>
            <li>Once verified, we will issue a full money-back refund for the affected tradeline(s).</li>
          </ol>

          <div className="mt-6">
            <button onClick={() => setShowRefundSteps((s) => !s)} className="px-4 py-2 rounded-md bg-[#0b5fa8] text-white">{showRefundSteps ? "Hide quick checklist" : "Show quick checklist"}</button>

            {showRefundSteps && (
              <div className="mt-4 p-4 bg-white rounded-md border border-blue-100">
                <div className="font-semibold">Quick checklist</div>
                <ul className="mt-2 text-slate-700 pl-4 list-disc">
                  <li>Confirm posting date is after reported period end.</li>
                  <li>Collect CreditKarma screenshots showing no posting on 2 bureaus.</li>
                  <li>Email support with order confirmation and screenshots.</li>
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* CTA footer */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 text-center">
          <h3 className="text-2xl font-bold">Ready to purchase?</h3>
          <p className="mt-3 text-slate-700">When you're ready, visit our tradeline list and add the items you want to your cart. If you need help, contact support.</p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a href="/services/tradeline-exchange/buy-tradelines" className="px-6 py-3 bg-[#0b5fa8] text-white rounded-md font-semibold">View Tradeline List</a>
            <a href="/services/tradeline-exchange/contact" className="px-6 py-3 border border-slate-200 rounded-md">Contact Support</a>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-10 text-sm text-slate-500">
        <div>Published by Tradeline Exchange • 06/21/2021</div>
      </footer>
    </div>
  );
}

