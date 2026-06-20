// @ts-nocheck
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { orderStore } from "../lib/orders";
import { MOCK_TRADELINES } from "../lib/tradelines";

type TabType = "dashboard" | "orders" | "store-credit" | "account-details";

export default function MyAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState(initialEmail);
  const [orders, setOrders] = useState([]);
  const [lookedUp, setLookedUp] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setEmail(parsed.user || parsed.email || "");
      } else {
        // Redirect to login if not logged in
        router.push("https://lmsathena.com/login?redirect=/services/tradeline-exchange/my-account");
      }
    }
  }, [router]);

  useEffect(() => {
    if (initialEmail || email) {
      handleLookup(initialEmail || email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEmail, email]);

  const handleLookup = async (targetEmail?: string) => {
    const e = (targetEmail ?? email).trim();
    if (!e) {
      setOrders([]);
      setLookedUp(true);
      return;
    }

    try {
      // Fetch orders from MongoDB
      const response = await fetch(`/api/orders?email=${encodeURIComponent(e)}`);
      const data = await response.json();
      
      if (data.success && Array.isArray(data.orders)) {
        // Convert MongoDB orders to the format expected by the component
        const formattedOrders = data.orders.map((order: any) => ({
          id: order._id || order.id,
          tradelineId: order.tradelines?.[0]?.tradelineId || "",
          fullName: `${order.clientFirstName} ${order.clientLastName}`,
          email: order.email,
          phone: order.clientPhone,
          creditGoal: order.creditGoal,
          createdAt: order.createdAt,
          status: order.status,
        }));
        setOrders(formattedOrders);
        setLookedUp(true);
      } else {
        // Fallback to localStorage
        const found = orderStore.getOrdersByEmail(e);
        setOrders(found);
        setLookedUp(true);
      }
    } catch (error) {
      console.error("[my-account] Error fetching orders:", error);
      // Fallback to localStorage
      const found = orderStore.getOrdersByEmail(e);
      setOrders(found);
      setLookedUp(true);
    }
  };

  const enrichedOrders = useMemo(
    () =>
      orders.map((o) => ({
        ...o,
        tradeline: MOCK_TRADELINES.find((t) => t.id === o.tradelineId),
      })),
    [orders]
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    // Redirect to tradeline main page
    router.push("/services/tradeline-exchange");
  };

  const getUserName = () => {
    if (!user) return "";
    const userValue = user.user || user.name || user.email || "";
    // If it's an email, extract name part or use email
    if (userValue.includes("@")) {
      return userValue.split("@")[0];
    }
    return userValue;
  };

  const getUserEmail = () => {
    if (!user) return "";
    return user.email || user.user || "";
  };

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      {/* Header */}
      <div className="bg-gray-800 text-white py-12 mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">My Account</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 mb-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === "dashboard"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === "orders"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("store-credit")}
              className={`px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === "store-credit"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Store Credit
            </button>
            <button
              onClick={() => setActiveTab("account-details")}
              className={`px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === "account-details"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Account details
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-3 font-semibold text-gray-600 hover:text-gray-900 transition ml-auto"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === "dashboard" && (
            <div>
              <p className="text-lg mb-4">
                Hello {getUserName()} ({getUserEmail()})
              </p>
              <p className="text-sm text-gray-600 mb-4">
                (not {getUserName()}?{" "}
                <button
                  onClick={handleLogout}
                  className="text-blue-600 hover:underline"
                >
                  Log out
                </button>
                )
              </p>
              <p className="text-gray-700 mb-4">
                From your account dashboard you can view your{" "}
                <Link
                  href="#"
                  onClick={() => setActiveTab("orders")}
                  className="text-blue-600 hover:underline"
                >
                  recent orders
                </Link>
                , manage your shipping and billing addresses and edit your
                password and account details.
              </p>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              {lookedUp && enrichedOrders.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  <p className="text-lg font-semibold mb-2">No orders yet</p>
                  <p className="mb-4">Book your first tradeline to see it here.</p>
                  <Link
                    href="/services/tradeline-exchange/buy-tradelines"
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
                      className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <h3 className="text-xl font-bold text-gray-900">
                          {order.tradeline?.bankName ?? "Tradeline"} •{" "}
                          {order.tradeline?.creditLimit
                            ? `$${order.tradeline.creditLimit.toLocaleString()}`
                            : ""}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Status:{" "}
                          <span className="font-semibold text-gray-900 capitalize">
                            {order.status.replace("_", " ")}
                          </span>
                        </p>
                        {order.creditGoal && (
                          <p className="text-gray-500 text-sm mt-1">
                            Goal: {order.creditGoal}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">
                          ID: {order.tradelineId}
                        </span>
                        {order.tradeline?.ageYears && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">
                            Age: {order.tradeline.ageYears} yrs
                          </span>
                        )}
                        {order.tradeline?.utilizationPercent !== undefined && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">
                            Util: {order.tradeline.utilizationPercent}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "store-credit" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Store Credit</h2>
              <p className="text-gray-600 mb-4">
                You currently have no store credit available.
              </p>
            </div>
          )}

          {activeTab === "account-details" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Account Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={getUserEmail()}
                    readOnly
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={getUserName()}
                    readOnly
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

