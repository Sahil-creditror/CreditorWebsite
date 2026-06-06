// @ts-nocheck
"use client";

import React from "react";

const BrokersPage = () => {
  return (
    <div className="w-full bg-gradient-to-b from-white via-sky-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 space-y-14">
        {/* HERO */}
        <section className="grid gap-8 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] items-center rounded-3xl bg-gradient-to-br from-white via-sky-50 to-sky-100 text-slate-900 px-6 sm:px-8 py-10 shadow-[0_24px_60px_rgba(59,130,246,0.18)] border border-sky-100">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-sky-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
              Broker Program
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-slate-900">
              Broker tradelines to your clients at your prices.
            </h1>
            <p className="text-sm md:text-base text-slate-700">
              Sign up for wholesale tradelines access. Your brand, your margins, our inventory and support.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#broker-form"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(56,189,248,0.35)] transition-transform hover:-translate-y-0.5"
              >
                Become a Tradeline Broker
              </a>
              <span className="text-xs text-slate-600">
                No fees to join • Fast approvals • Volume discounts
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-sky-100 p-6 space-y-4 shadow-[0_18px_45px_rgba(59,130,246,0.15)]">
            <h3 className="text-lg font-semibold text-slate-900">Program Snapshot</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• White-label sales under your brand</li>
              <li>• Set your own prices and profit margins</li>
              <li>• Access the largest marketplace with API option</li>
              <li>• Dedicated broker success & compliance support</li>
            </ul>
          </div>
        </section>

        {/* FORM + NOTICE */}
        <section
          id="broker-form"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)] items-start"
        >
          <div className="rounded-2xl bg-white border border-sky-100 p-6 sm:p-7 space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-sky-700 uppercase tracking-[0.2em]">
                To register as a broker, enter your information here.
              </p>
              <p className="text-sm text-slate-600">
                We’ll reach out with wholesale access steps and your projected earnings.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-semibold text-slate-800">
                    Name <span className="text-rose-500">*</span>
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-semibold text-slate-800">
                    Email <span className="text-rose-500">*</span>
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm">
                <span className="font-semibold text-slate-800">
                  Phone Number <span className="text-rose-500">*</span>
                </span>
                <input
                  type="tel"
                  placeholder="(000) 000-0000"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </label>

              <label className="flex items-start gap-3 text-xs text-slate-600">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                <span>
                  I consent to be contacted via email & phone. Please review the privacy policy.
                </span>
              </label>

              <button
                type="button"
                className="w-full sm:w-auto rounded-full bg-slate-900 text-white px-7 py-3 text-sm font-semibold shadow-[0_18px_35px_rgba(15,23,42,0.25)] hover:bg-slate-800 transition"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white p-5">
              <h3 className="text-lg font-semibold mb-1">Notice</h3>
              <p className="text-sm text-white/90">
                At this time, we are only enrolling Discover tradelines. Join the waitlist for other banks by submitting the form; we’ll notify you as soon as access expands.
              </p>
            </div>

            <div className="rounded-xl bg-white border border-slate-100 p-5 space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">
                Become a Tradeline Broker
              </h3>
              <p className="text-sm text-slate-600">
                Follow these steps to become a tradeline broker partner.
              </p>
              <ol className="space-y-2.5 text-sm text-slate-700 list-decimal list-inside">
                <li>
                  <strong>Submit Application:</strong> Apply on this page to start the white label application and align on compliance. No fees and easy to qualify.
                </li>
                <li>
                  <strong>Send Documentation:</strong> Return your application and business docs. Approvals as fast as one business day.
                </li>
                <li>
                  <strong>Place Orders:</strong> Sell our tradelines under your company name. Set your own prices and profit margins.
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="rounded-3xl bg-white border border-sky-50 p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">
              Tradeline Selling Benefits
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Help clients, grow revenue, and keep your brand front and center.
            </h2>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              "Help your clients",
              "Sell to your clients",
              "Access the largest marketplace",
              "Build a new sales channel",
              "Set your prices",
              "Use the website API",
              "Empower with high closing rates",
              "Get volume discounts",
              "Grow with support",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg bg-slate-50 px-4 py-3 text-slate-800 border border-slate-100"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                <p className="text-sm font-semibold text-slate-900">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* PRICING */}
        <section className="rounded-3xl bg-gradient-to-br from-sky-600 via-sky-700 to-blue-700 text-white px-6 sm:px-8 py-10 shadow-[0_24px_60px_rgba(37,99,235,0.35)]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-sky-200 mb-1">
                Broker Pricing
              </p>
              <h3 className="text-2xl md:text-3xl font-bold">Volume-based discounts</h3>
              <p className="text-sm text-slate-300 mt-1">
                Brokers are eligible to receive the following discounting based on the total volume of orders:
              </p>
            </div>
            <p className="text-xs text-slate-400">Updated quarterly • Subject to change</p>
          </div>

          <div className="bg-white/10 rounded-2xl overflow-hidden border border-white/20">
            <table className="min-w-full text-sm">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold text-white uppercase tracking-[0.16em]">
                    Lifetime Volume
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold text-white uppercase tracking-[0.16em]">
                    Discount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/15">
                <tr>
                  <td className="px-6 py-3 text-white/90">Tradeline Broker Pricing</td>
                  <td className="px-6 py-3 text-white font-semibold">See your dashboard</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-white/80 mt-3">
            *Once you reach a qualifying lifetime volume, you will receive the corresponding discount. Tradeline Exchange Company, LLC reserves the right to modify or discontinue discounts, promotions, and eligibility criteria at any time without notice.
          </p>
        </section>

        {/* FAQ + VIDEOS */}
        <section className="space-y-4">
          <div className="rounded-2xl bg-white border border-sky-100 shadow-[0_12px_32px_rgba(59,130,246,0.14)] p-6 sm:p-7">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Recommended Videos</h3>
            <p className="text-sm text-slate-600 mb-5">
              Quick walkthroughs to help you sell and support tradelines with confidence.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "How broker pricing works", embed: "https://www.youtube.com/embed/OIZrFXyvNbE" },
                { title: "Positioning tradelines to clients", embed: "https://www.youtube.com/embed/36cjamlLz3g" },
                { title: "API overview (advanced)", embed: "https://www.youtube.com/embed/OYgirpsl1NM" },
              ].map((video) => (
                <div
                  key={video.embed}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_36px_rgba(59,130,246,0.16)]"
                >
                  <div className="relative w-full pt-[58%] bg-slate-100">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={video.embed}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="px-5 py-4 border-t border-slate-100">
                    <p className="text-base font-semibold text-slate-900">{video.title}</p>
                    <p className="text-xs text-slate-500">YouTube</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BrokersPage;
