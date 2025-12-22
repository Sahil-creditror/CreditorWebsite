// @ts-nocheck
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { cartStore } from "../lib/cart";
import { MOCK_TRADELINES } from "../lib/tradelines";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(cartStore.getCart());
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push("/signin?redirect=/services_page/tradeline-exchange/cart");
      }
    }
  }, [router]);

  const enrichedCart = useMemo(() => {
    return cart.map((item) => ({
      ...item,
      tradeline: MOCK_TRADELINES.find((t) => t.id === item.tradelineId),
    }));
  }, [cart]);

  const subtotal = useMemo(() => {
    return enrichedCart.reduce(
      (sum, item) => sum + (item.tradeline?.price || 0) * item.quantity,
      0
    );
  }, [enrichedCart]);

  const handleRemove = (tradelineId: string) => {
    cartStore.removeItem(tradelineId);
    setCart(cartStore.getCart());
  };

  const handleUpdateQuantity = (tradelineId: string, quantity: number) => {
    cartStore.updateQuantity(tradelineId, quantity);
    setCart(cartStore.getCart());
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    router.push("/services_page/tradeline-exchange/user-agreement");
  };

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Cart
          </h1>
          <p className="text-slate-600">Review your tradeline selections</p>
        </div>

        {/* Warning */}
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold text-center">
            *We do not sell tradelines in Georgia
          </p>
        </div>

        {/* Cart Table */}
        {enrichedCart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <p className="text-lg font-semibold mb-2 text-slate-500">
              Your cart is empty
            </p>
            <Link
              href="/services_page/tradeline-exchange/buy-tradelines"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md mt-4"
            >
              Browse Tradelines
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                      Card ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                      Credit Limit
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                      Date Opened
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                      Purchase Deadline
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                      Reporting Period
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                      Price
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {enrichedCart.map((item) => (
                    <tr key={item.tradelineId} className="hover:bg-slate-50">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {item.tradeline?.bankName || "Unknown"}
                          </p>
                          <p className="text-sm text-slate-500">
                            {item.tradelineId}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        ${item.tradeline?.creditLimit.toLocaleString() || "0"}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {item.tradeline?.ageYears
                          ? `${new Date().getFullYear() - item.tradeline.ageYears} ${new Date().toLocaleString("default", { month: "short" })}`
                          : "N/A"}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-4 font-semibold text-slate-900">
                        ${item.tradeline?.price.toFixed(2) || "0.00"}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleRemove(item.tradelineId)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cart Totals and Actions */}
        {enrichedCart.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Cart totals
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold text-lg pt-2 border-t border-slate-200">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Store Credit
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter store credit code"
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500/70 focus:outline-none"
                  />
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded transition">
                    Apply Store Credit
                  </button>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Important Information
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                Please ensure any fraud alerts or credit freezes are removed
                from the credit bureaus before placing an order for a tradeline.
                Tradelines will not post and refunds will not be issued if there
                is a fraud alert or credit freeze.
              </p>
              <div className="flex items-center gap-2 text-slate-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-semibold">619-255-9588</span>
              </div>
              <div className="mt-2 text-sm text-slate-600">
                <p>Monday - Friday: 7:00 AM PST - 6:00 PM PST</p>
                <p>Saturday: 8:00 AM PST - 5:00 PM PST</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

