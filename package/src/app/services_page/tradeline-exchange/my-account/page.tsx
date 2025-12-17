// @ts-nocheck
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { orderStore } from "../lib/orders";
import { MOCK_TRADELINES } from "../lib/tradelines";

export default function MyAccountPage() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [orders, setOrders] = useState([]);
  const [lookedUp, setLookedUp] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      handleLookup(initialEmail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEmail]);

  const handleLookup = (targetEmail?: string) => {
    const e = (targetEmail ?? email).trim();
    if (!e) {
      setOrders([]);
      setLookedUp(true);
      return;
    }
    const found = orderStore.getOrdersByEmail(e);
    setOrders(found);
    setLookedUp(true);
  };

  const enrichedOrders = useMemo(
    () =>
      orders.map((o) => ({
        ...o,
        tradeline: MOCK_TRADELINES.find((t) => t.id === o.tradelineId),
      })),
    [orders]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">My Account</h1>
          <p className="text-slate-600 mt-2">
            Enter your email to view tradeline orders and their status.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label className="text-sm font-semibold text-slate-800">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-sky-500/70 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <button
              onClick={() => handleLookup()}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:translate-y-0.5 transition"
            >
              View Orders
            </button>
          </div>
        </div>

        {lookedUp && enrichedOrders.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            <p className="text-lg font-semibold mb-2">No orders yet</p>
            <p className="mb-4">Book your first tradeline to see it here.</p>
            <Link
              href="/tradeline/buy-tradelines"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md"
            >
              Browse Tradelines
            </Link>
          </div>
        )}

        {enrichedOrders.length > 0 && (
          <div className="space-y-4">
            {enrichedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900">
                    {order.tradeline?.bankName ?? "Tradeline"} • {order.tradeline?.creditLimit ? `$${order.tradeline.creditLimit.toLocaleString()}` : ""}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Status:{" "}
                    <span className="font-semibold text-slate-900 capitalize">{order.status.replace("_", " ")}</span>
                  </p>
                  {order.creditGoal && (
                    <p className="text-slate-500 text-sm mt-1">Goal: {order.creditGoal}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
                    ID: {order.tradelineId}
                  </span>
                  {order.tradeline?.ageYears && (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
                      Age: {order.tradeline.ageYears} yrs
                    </span>
                  )}
                  {order.tradeline?.utilizationPercent !== undefined && (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
                      Util: {order.tradeline.utilizationPercent}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}