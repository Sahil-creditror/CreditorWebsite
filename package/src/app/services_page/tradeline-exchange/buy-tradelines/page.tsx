// @ts-nocheck
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Filter, Info, ShoppingCart } from "lucide-react";
import { MOCK_TRADELINES } from "../lib/tradelines";

const INQUIRY_FORM_URL =
  process.env.NEXT_PUBLIC_BROKER_FORM_URL ??
  "https://forms.gle/your-broker-form-id";

export default function BuyTradeline() {
  const [minAge, setMinAge] = useState(0);
  const [minLimit, setMinLimit] = useState(0);
  const [sortBy, setSortBy] = useState("best");

  const filtered = useMemo(() => {
    let list = [...MOCK_TRADELINES];

    if (minAge > 0) list = list.filter((t) => t.ageYears >= minAge);
    if (minLimit > 0) list = list.filter((t) => t.creditLimit >= minLimit);

    switch (sortBy) {
      case "age-desc":
        list.sort((a, b) => b.ageYears - a.ageYears);
        break;
      case "age-asc":
        list.sort((a, b) => a.ageYears - b.ageYears);
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        // Best value heuristic: limit / price
        list.sort((a, b) => b.creditLimit / b.price - a.creditLimit / a.price);
    }

    return list;
  }, [minAge, minLimit, sortBy]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-12 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Buy{" "}
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                Tradelines
              </span>
            </h1>
            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-xl">
              Browse verified, high-quality tradelines. Filter by age and limit,
              then book instantly.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-medium text-sky-800 border border-sky-200">
              <Filter size={14} />
              <span>{filtered.length} results</span>
            </div>
          </div>
        </div>

        {/* SECURE FORM CTA */}
        <div className="mt-4 mb-8 rounded-xl border border-sky-200 bg-sky-50/80 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Prefer a secure form for questions or booking?
            </p>
            <p className="text-xs text-slate-700">
              Submit the Google Form and only the assigned reviewer receives your details.
            </p>
          </div>
          <a
            href={INQUIRY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-sky-400 hover:to-blue-500"
          >
            Open Secure Form
          </a>
        </div>

        {/* FILTER / SORT BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-xl border border-slate-200 bg-white/85 shadow-sm px-4 py-3 md:px-5 md:py-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-xs font-semibold text-slate-600">Min Age (yrs)</label>
            <input
              type="number"
              min={0}
              value={minAge}
              onChange={(e) => setMinAge(Number(e.target.value || 0))}
              className="w-24 rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:ring-2 focus:ring-sky-500/60 focus:outline-none"
            />
            <label className="text-xs font-semibold text-slate-600">Min Limit ($)</label>
            <input
              type="number"
              min={0}
              value={minLimit}
              onChange={(e) => setMinLimit(Number(e.target.value || 0))}
              className="w-28 rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:ring-2 focus:ring-sky-500/60 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs md:text-sm border border-slate-200 rounded-full px-3 py-1.5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/70"
            >
              <option value="best">Best value</option>
              <option value="age-desc">Age (high → low)</option>
              <option value="age-asc">Age (low → high)</option>
              <option value="price-asc">Price (low → high)</option>
              <option value="price-desc">Price (high → low)</option>
            </select>
          </div>
        </div>

        {/* LIST */}
        <div className="grid gap-5 mt-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white/95 rounded-2xl shadow-[0_10px_28px_rgba(15,23,42,0.12)] border border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-3 bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    {item.bankName}
                    <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-full">
                      **** {item.last4}
                    </span>
                  </h3>
                  <p className="text-xs text-sky-50/90">
                    Statement: {item.statementDate} • Util: {item.utilizationPercent}% • Age:{" "}
                    {item.ageYears} yrs
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-sky-100">Credit Limit</p>
                    <p className="text-xl font-bold">${item.creditLimit.toLocaleString()}</p>
                  </div>
                  <div className="h-10 w-px bg-white/20" />
                  <div className="text-right">
                    <p className="text-xs text-sky-100">Price</p>
                    <p className="text-xl font-bold">${item.price.toFixed(0)}</p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 grid md:grid-cols-[1fr_auto] gap-3 items-center">
                <div className="flex flex-wrap gap-3 text-sm text-slate-700">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-800">
                    Age: {item.ageYears} yrs
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-800">
                    Slots: {item.slotsAvailable}/{item.slotsTotal}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-800">
                    Util: {item.utilizationPercent}%
                  </span>
                  {item.notes && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 font-semibold text-sky-700">
                      <Info size={14} />
                      {item.notes}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 justify-end">
                  <Link
                    href={`/tradeline/checkout/${item.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:border-sky-400 transition"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/services_page/tradeline-exchange/checkout/${item.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:translate-y-0.5 transition"
                  >
                    <ShoppingCart size={16} />
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
