"use client";

type Row = {
  feature: string;
  pmp: string;
  stripe: string;
  paypal: string;
  square: string;
};

export default function PMPComparisonTable() {
  const rows: Row[] = [
    {
      feature: "Payout Speed",
      pmp: "24–48 hrs (standard)",
      stripe: "2–7 days (may hold funds)",
      paypal: "1–5 days (holds common)",
      square: "1–2 days (can delay)",
    },
    {
      feature: "Account Type",
      pmp: "Full Merchant Account (underwritten, direct relationship)",
      stripe: "PSP / Aggregator (shared account)",
      paypal: "PSP / Aggregator (shared account)",
      square: "PSP / Aggregator (shared account)",
    },
    {
      feature: "Pricing Model",
      pmp: "Interchange-Plus (transparent)",
      stripe: "Flat rate 2.9% + $0.30 (U.S. online)",
      paypal: "Flat rate 2.9% + $0.30 (U.S. online)",
      square: "Flat rate 2.6% + $0.10 (in-person)",
    },
    {
      feature: "Support",
      pmp: "Dedicated Account Manager",
      stripe: "Email / Chat",
      paypal: "Limited phone / chat",
      square: "Email / limited support",
    },
    {
      feature: "Risk of Freezes",
      pmp: "Low (private underwriting, direct review)",
      stripe: "High (algorithm-driven risk holds)",
      paypal: "High (common for large balances or disputes)",
      square: "Medium (holds possible, esp. spikes)",
    },
    {
      feature: "Customization",
      pmp: "High (POS, gateways, multi-currency, custom rates)",
      stripe: "Limited",
      paypal: "Limited",
      square: "Limited",
    },
    {
      feature: "Security & Compliance",
      pmp: "PCI + EMV included, fraud tools built-in",
      stripe: "PCI shared responsibility",
      paypal: "PCI shared responsibility",
      square: "PCI shared responsibility",
    },
    {
      feature: "Best For",
      pmp: "Serious businesses needing privacy, fast payouts, and stability",
      stripe: "Startups / hobby e-commerce",
      paypal: "Small sellers, peer-to-peer",
      square: "Small retail shops, pop-ups",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-white via-blue-100/50 to-blue-50 dark:from-[#131e38] dark:via-[#192040] dark:to-[#071023] overflow-hidden">
      {/* Ambient glows hidden for brevity */}

      <div className="container relative z-10 px-4">
        <div className="text-center mb-6 md:mb-10">
          <h2
            className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 drop-shadow-xl"
          >
            Why a Private Merchant Account Beats Stripe, PayPal, and Square
          </h2>
        </div>

        <div className="flex justify-center mb-10">
          <button
            // href="https://payments.creditoracademy.com/form/creditor-academy-paulr-referral"
            // target="_blank"
            // rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-bold text-lg shadow-xl transition-all duration-200 transform hover:scale-105 hover:brightness-110 hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400/80"
            aria-label="Learn how a private account benefits you"
          >
            Switch to Private Today
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto w-full">
          <div
            className="min-w-[1200px] w-full rounded-3xl border border-blue-200/20 dark:border-blue-900/30 bg-white/70 dark:bg-[#192040]/80 shadow-2xl backdrop-blur-lg"
          >
            <div className="grid grid-cols-5 bg-gradient-to-r from-blue-200/25 via-blue-100/35 to-white/60 dark:from-blue-900/35 dark:to-blue-900/60 font-bold text-base md:text-lg">
              <div className="px-6 py-5 text-blue-600 dark:text-blue-400">Feature</div>
              <div className="px-6 py-5 text-blue-600 dark:text-blue-400">Private Merchant Account</div>
              <div className="px-6 py-5 text-blue-600 dark:text-blue-400">Stripe</div>
              <div className="px-6 py-5 text-blue-600 dark:text-blue-400">PayPal</div>
              <div className="px-6 py-5 text-blue-600 dark:text-blue-400">Square</div>
            </div>
            <div className="divide-y divide-blue-200/16 dark:divide-blue-900/13 w-full">
              {rows.map((r, idx) => (
                <div
                  key={idx}
                  className="w-full grid grid-cols-5 text-base md:text-lg bg-white/70 dark:bg-[#192040]/80 text-slate-900 dark:text-slate-100"
                >
                  <div className="px-6 py-4 font-semibold">{r.feature}</div>
                  <div className="px-6 py-4">{r.pmp}</div>
                  <div className="px-6 py-4">{r.stripe}</div>
                  <div className="px-6 py-4">{r.paypal}</div>
                  <div className="px-6 py-4">{r.square}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Mobile stacked cards (cleaned up) */}
        <div className="md:hidden space-y-6">
          {rows.map((r, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/80 dark:bg-[#192040]/90 shadow-md backdrop-blur-lg p-5 border border-blue-100/30 dark:border-blue-800/30"
            >
              {/* Feature Title */}
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">
                {r.feature}
              </h3>

              {/* PMP always visible (highlighted) */}
              <div className="mb-4">
                <span className="block text-sm font-semibold text-blue-700 dark:text-blue-300">
                  Private Merchant Account
                </span>
                <p className="text-slate-900 dark:text-slate-100 text-base leading-relaxed">
                  {r.pmp}
                </p>
              </div>

              {/* Competitors in collapsible */}
              <details className="group">
                <summary className="cursor-pointer text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  Compare with Stripe, PayPal & Square
                </summary>
                <div className="mt-3 space-y-3 text-slate-800 dark:text-slate-200 text-sm">
                  <div>
                    <span className="font-semibold">Stripe:</span> {r.stripe}
                  </div>
                  <div>
                    <span className="font-semibold">PayPal:</span> {r.paypal}
                  </div>
                  <div>
                    <span className="font-semibold">Square:</span> {r.square}
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
