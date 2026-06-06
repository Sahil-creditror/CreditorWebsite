"use client";
import React, { useState } from "react";

export default function FaqPage(): React.ReactElement {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (k: string) => {
    setOpen((s) => ({ ...s, [k]: !Boolean(s[k]) }));
  };

  const faqs: { section: string; items: { q: string; a: string }[] }[] = [
    {
      section: "General Tradeline Information",
      items: [
        { q: "What is a tradeline?", a: "A tradeline is a record of activity for any credit account listed on a credit report — credit cards, lines of credit, etc." },
        { q: "How do tradelines work?", a: "Tradelines report account age, limit and payment history to credit bureaus. Authorized-user tradelines add an account to a user's file so the user's credit profile can benefit from that account's age and payment history." },
        { q: "How much do tradelines cost?", a: "Prices vary depending on age, limit and provider. Seasoned high-limit tradelines command higher prices." },
        { q: "Do tradelines still work in 2024?", a: "Tradelines continue to be used; however, results vary by individual credit files and scoring models. Always do the math for your file first." },
        { q: "What is tradeline renting?", a: "Tradeline renting (or authorized user tradelines) is when someone is added to an existing account to inherit its history for a limited period." },
        { q: "What is a seasoned tradeline?", a: "A seasoned tradeline is an account with established age (commonly 2+ years) and clean payment history. Seasoned accounts are more influential." },
        { q: "Can tradelines hurt my credit?", a: "If chosen incorrectly (e.g., a tradeline that reduces your average age or comes from problematic accounts), tradelines can fail to help and in rare cases could negatively affect scoring signals." },
        { q: "What is a tradeline package? Should I buy one?", a: "A package bundles multiple tradelines. They can be efficient but only buy if each line improves your file based on your calculations." },
      ],
    },
    {
      section: "Our Tradeline List",
      items: [
        { q: "What is the Purchase Deadline?", a: "Purchase deadlines vary per offer — check the listing for specific cutoffs." },
        { q: "Do you have tradelines that are not on your current list?", a: "Occasionally — contact support to ask about off-list options or upcoming inventory." },
        { q: "Can you send me a list of updated tradelines?", a: "Yes — most providers will send an updated inventory upon request or subscription to alerts." },
        { q: "What is the utilization ratio of your tradelines?", a: "Each tradeline listing includes credit limit and recent utilization — ask for specifics if not shown." },
        { q: "Does it matter which bank the tradeline is from?", a: "Usually not, unless you have a negative relationship or blacklist with a particular issuer." },
        { q: "Do you sell tradeline packages?", a: "Many providers sell packages; verify each line's age and limit before purchasing." },
      ],
    },
    {
      section: "Selecting Tradelines",
      items: [
        { q: "Can you help me choose a tradeline?", a: "Reputable providers often offer guidance — but always verify the math yourself or request a simple simulation." },
        { q: "What is more important: the age of the card or the credit limit?", a: "Age and limit both matter; age often carries more weight because it affects payment history and length-of-credit-history signals." },
        { q: "How many tradelines should I buy?", a: "There is no universal number. Buy based on your file — sometimes one targeted tradeline is better than many mediocre ones." },
      ],
    },
    {
      section: "Reporting/Posting FAQs",
      items: [
        { q: "Will my tradelines post if I have fraud alerts or credit freezes on my credit file?", a: "Fraud alerts and freezes can block some reporting — coordinate with the provider and the bureaus to ensure posting." },
        { q: "How long do tradelines stay on your credit?", a: "Duration depends on whether it's an open or closed account and bureau policies — ask the seller for expected reporting windows." },
        { q: "How many bureaus do you guarantee it will report to?", a: "Guarantees vary; ask your provider for their reporting commitments (Equifax, Experian, TransUnion)." },
        { q: "How long does it take for your tradelines to report?", a: "Reporting timelines vary. Many tradelines post within 1–2 billing cycles, but confirm reporting dates before purchase." },
        { q: "Will the tradeline fall off of my credit report after the 2 reporting cycles?", a: "Some products are temporary; always confirm the expected reporting duration with the seller." },
        { q: "Do you have tradelines that will stay on my credit for longer than 2 months?", a: "Some listings are longer-term; verify before buying." },
        { q: "How do I request a refund if a tradeline does not post?", a: "Follow the provider's refund policy and provide required documentation (ID, report screenshots, timestamps)." },
      ],
    },
    {
      section: "Placing an Order & Paying",
      items: [
        { q: "How do I place an order?", a: "Orders are placed through the vendor's checkout — contact support if you need manual assistance." },
        { q: "How do I buy store credit or pay with a wire?", a: "Payment methods differ — ask support for wire instructions or store credit options." },
        { q: "Do you accept credit cards?", a: "Many vendors accept cards but policies vary." },
        { q: "What documents do I need in order to purchase a tradeline?", a: "Commonly: name, DOB, SSN (or last 4), and sometimes a credit report screenshot — but only provide what the vendor requires and ensure secure channels." },
        { q: "What payment methods do you accept?", a: "Typical methods: credit card, ACH/wire, crypto (provider-dependent), or site store credit." },
      ],
    },
    {
      section: "Credit Repair & Credit Score Information",
      items: [
        { q: "What is the average boost in score from tradelines?", a: "There is no guaranteed average — boosts depend on the individual's credit profile and scoring model." },
        { q: "Do you do credit repair?", a: "Some providers offer credit repair services; verify credentials and read reviews before engaging." },
        { q: "What is piggybacking for credit?", a: "Piggybacking commonly refers to adding an authorized user to an established account to gain the benefit of its history." },
        { q: "What is a credit report? How can I check my credit report?", a: "A credit report is a detailed history of your credit accounts. You can get official copies at annualcreditreport.com or via many consumer services." },
        { q: "What is a credit score? How are credit scores determined?", a: "A credit score is a numerical summary of credit risk derived from factors like payment history, utilization, age of accounts, mix, and recent inquiries." },
        { q: "How can I get an 850 credit score?", a: "An 850 score requires excellent payment history, low utilization, long-aged accounts, and minimal negative data — it's rare and takes time." },
      ],
    },
    {
      section: "Business Credit",
      items: [
        { q: "What is business credit?", a: "Business credit refers to a company's credit profile separate from personal credit, used for supplier lines, loans, and corporate cards." },
        { q: "Do you sell business tradelines?", a: "Some providers offer business tradelines — ask specifically as business reporting differs from personal reporting." },
      ],
    },
    {
      section: "Legal Topics",
      items: [
        { q: "Are tradelines legal?", a: "Tradelines themselves are legal, but practices around them can be risky — always ensure compliance with terms of service and law." },
        { q: "Do you accept CPNs?", a: "Reputable providers will not accept CPNs. Use only legitimate identification." },
        { q: "Do you sell primary tradelines?", a: "Primary tradelines (adding primary account ownership) are typically not sold by reputable secondary-market vendors." },
      ],
    },
    {
      section: "Tradeline Broker Information",
      items: [
        { q: "What is the difference between being a broker representative and a white label broker?", a: "Broker representatives resell inventory under their own brand, while white label brokers may use another provider's backend and brand it as their own." },
        { q: "What are the prices for brokers?", a: "Broker prices vary based on partnership terms; contact sales for broker pricing." },
        { q: "How does the speed pay option work?", a: "Speed pay accelerates order fulfillment for an extra fee — details depend on provider capacity." },
      ],
    },
    {
      section: "Credit Sponsor Information",
      items: [
        { q: "What is the commission for selling my tradelines?", a: "Commission rates are negotiated — ask the platform for current terms." },
        { q: "What cards do you accept?", a: "Accepted cards depend on provider payments integration — check the checkout for current options." },
      ],
    },
  ];

  const filtered = faqs
    .map((s) => ({ ...s, items: s.items.filter((it) => (it.q + it.a).toLowerCase().includes(query.toLowerCase().trim())) }))
    .filter((s) => s.items.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07243a] to-[#0b5fa0] text-white pt-24">
      {/* HERO */}
      <header className="py-20 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">Frequently Asked Questions</h1>
              <p className="mt-4 text-lg text-sky-100 max-w-3xl">Everything you need to know about tradelines, buying, reporting, and legal considerations.</p>

              <div className="mt-6 flex gap-3">
                <a href="#faq" className="px-5 py-3 bg-white text-[#0b5fa0] rounded-full font-semibold">Browse FAQs</a>
                <a href="#contact" className="px-5 py-3 border border-white/20 rounded-full">Contact Support</a>
              </div>
            </div>

            <div className="w-full lg:w-96">
              <div className="bg-white/6 p-6 rounded-xl border border-white/10">
                <div className="text-sm font-semibold text-white mb-2">Quick search</div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={'Search questions (e.g. "refund")'}
                  className="w-full p-3 rounded-md bg-white/8 border border-white/10 text-white"
                />
                <div className="mt-3 text-sm text-white/80">Try queries like: "age", "utilization", "refund"</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT - light blue background */}
      <main id="faq" className="bg-[#eaf6ff] text-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {filtered.map((section) => (
            <section key={section.section} className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">{section.section}</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((it) => (
                  <div key={it.q} className="border rounded-md overflow-hidden">
                    <button className="w-full text-left p-4 bg-white/50 flex items-center justify-between" onClick={() => toggle(it.q)}>
                      <div className="font-medium">{it.q}</div>
                      <div className="text-slate-500">{open[it.q] ? '−' : '+'}</div>
                    </button>

                    {open[it.q] && <div className="p-4 text-slate-700">{it.a}</div>}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="font-semibold">No results found</h3>
              <p className="mt-2 text-sm text-slate-600">Try different keywords or contact support for help.</p>
            </div>
          )}

          <section id="contact" className="bg-white rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold">Still have questions?</h2>
            <p className="mt-2 text-slate-700">Reach out to our support team and we’ll assist you directly.</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/tradeline/contact" className="px-4 py-2 bg-[#0b5fa8] text-white rounded-md">Contact Support</a>
              <a href="/tradeline/resources#buyers-guide" className="px-4 py-2 border border-slate-200 rounded-md">Read Buyer’s Guide</a>
            </div>
          </section>
        </div>
      </main>

      {/* <footer className="max-w-6xl mx-auto px-6 py-10 text-sm text-slate-400">
        <div>Published by Tradeline Exchange Company, LLC • 06/21/2021</div>
      </footer> */}
    </div>
  );
}
