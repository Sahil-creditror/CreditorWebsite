// @ts-nocheck
"use client";

import { motion } from "framer-motion";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function InnovationPurpose() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-sky-50 py-16 md:py-20 px-6 md:px-10 lg:px-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute right-[-6rem] bottom-[-4rem] h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        <motion.div
          {...fadeIn(0)}
          className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-700"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm shadow-blue-200 ring-1 ring-sky-100">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            Tradeline Exchange
          </span>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-600">
            Hero Spotlight
          </span>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)] items-start">
          <motion.div {...fadeIn(0.05)} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              Leading Through{" "}
              <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Innovation &amp; Purpose
              </span>
            </h2>

            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Tradeline Exchange, is a pioneer in making it possible
              for consumers to purchase authorized user tradelines 100% online
              with an easy automated checkout process. By leveraging innovative
              technology, we have been able to cut costs and streamline the
              process, which ultimately makes this product available to more
              consumers.
            </p>

            <div className="rounded-3xl border border-sky-100 bg-white/80 p-5 shadow-[0_18px_40px_rgba(59,130,246,0.12)] backdrop-blur">
              <p className="text-sm md:text-base text-slate-800 leading-relaxed">
                Tradeline Exchange, is not a credit repair company,
                does not advertise this product for the purpose of boosting
                credit scores. Its products do not directly impact credit
                scores. There is no guarantee of any improvements to credit in
                any way. Instead, we are simply fighting for the rights of our
                customers to have the same opportunities as other more
                privileged Americans who have friends and family to provide them
                with this product. Additionally, we provide free education and
                tools to learn about credit and finances in order to empower
                people to make the best choices possible.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeIn(0.12)}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="sm:col-span-2 rounded-3xl border border-blue-100 bg-white shadow-[0_20px_55px_rgba(37,99,235,0.12)] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-sky-600 mb-2">
                Providing Equal Opportunity
              </p>
              <p className="text-sm md:text-base text-slate-800 leading-relaxed">
                Traditionally, many parents have been advised to add their kids
                to their credit cards as authorized users to give them a head
                start in life. Sadly, not everyone has a parent with good credit
                to do that. Additionally, a large scale study of 300,000 credit
                profiles concluded that approximately one-third of our entire
                nation has one or more authorized user tradelines in their
                credit file. This same study pointed out that minorities and the
                lower demographic sectors were less likely to have these types
                of tradelines, which is further evidence of the inequality that
                exists in our financial system.
              </p>
            </div>

            <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-sky-100 p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-sky-700 mb-2">
                Tradeline Credit Piggybacking
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                  <span>
                    Tradeline Exchange, helps reduce this
                    inequality by providing an equal opportunity for those who
                    were not fortunate enough to have a friend or family
                    member provide such a favor.
                  </span>
                </li>
                {/* <li className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <span>
                    Opportunities to Participate <span className="font-semibold">251x251</span>
                  </span>
                </li> */}
              </ul>
            </div>

            <div className="rounded-3xl border border-sky-200 bg-white p-5 shadow-[0_16px_32px_rgba(15,23,42,0.08)] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.22em] text-sky-700">
                  Opportunities to Participate
                </p>
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                  New
                  <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Being a broker or an affiliate is a great option for just about
                anyone to help spread the word about our program and receive
                commissions or referral fees for helping the people around you.
                There is no cost to join and you can get paid to help people.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {/* <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">
                  Zero cost to join
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                  Referral rewards
                </span> */}
                {/* <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">
                  Share &amp; earn
                </span> */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

