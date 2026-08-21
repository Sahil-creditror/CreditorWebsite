// @ts-nocheck
"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpDown, Filter, Info, ShoppingCart, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { cartStore } from "../lib/cart";
import AddToCartModal from "../components/AddToCartModal";
import CheckoutModal from "../components/CheckoutModal";

// Tradeline type matching the API response
interface Tradeline {
  id: string;
  tradelineId: string;
  bankName: string;
  last4: string;
  ageYears: number;
  creditLimit: number;
  utilizationPercent: number;
  statementDate: string;
  price: number;
  slotsTotal: number;
  slotsAvailable: number;
  notes?: string;
}

const INQUIRY_FORM_URL =
  process.env.NEXT_PUBLIC_BROKER_FORM_URL ??
  "https://forms.gle/your-broker-form-id";

export default function BuyTradeline() {
  const router = useRouter();
  const [minAge, setMinAge] = useState(0);
  const [minLimit, setMinLimit] = useState(0);
  const [sortBy, setSortBy] = useState("best");
  const [showModal, setShowModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedTradeline, setSelectedTradeline] = useState<Tradeline | null>(null);
  const [addedItemCount, setAddedItemCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  
  // API state
  const [tradelines, setTradelines] = useState<Tradeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tradelines from API
  useEffect(() => {
    fetchTradelines();
  }, []);

  const fetchTradelines = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/tradelines");
      
      // Check if response is ok before parsing JSON
      if (!response.ok) {
        // Try to parse error response
        let errorMessage = "Failed to fetch tradelines";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = response.statusText || `Server error (${response.status})`;
        }
        throw new Error(errorMessage);
      }
      
      // Parse successful response
      const data = await response.json();
      
      // Check if data structure is valid
      if (!data || typeof data !== "object") {
        throw new Error("Invalid response from server");
      }
      
      // Check success flag
      if (data.success === false) {
        throw new Error(data.error || "Failed to fetch tradelines");
      }
      
      // Set tradelines (handle both array and nested structure)
      const tradelinesList = data.tradelines || data.data || [];
      if (Array.isArray(tradelinesList)) {
        // Log for debugging
        console.log(`[buy-tradelines] Loaded ${tradelinesList.length} tradelines`);
        if (tradelinesList.length > 0) {
          const sample = tradelinesList[0];
          console.log("[buy-tradelines] Sample tradeline:", {
            id: sample.id,
            tradelineId: sample.tradelineId,
            bankName: sample.bankName,
            price: sample.price,
            creditLimit: sample.creditLimit,
            ageYears: sample.ageYears,
            slotsAvailable: sample.slotsAvailable,
            fullObject: sample,
          });
          
          // Check for issues
          if (!sample.bankName || sample.bankName === "Unknown Bank") {
            console.error("[buy-tradelines] WARNING: Sample tradeline has unknown bank:", sample);
          }
          if (!sample.price || sample.price === 0) {
            console.error("[buy-tradelines] WARNING: Sample tradeline has no price:", sample);
          }
        }
        
        // Filter out any invalid items before setting
        const validTradelines = tradelinesList.filter((t: Tradeline) => {
          const isValid = t.id && t.bankName && t.bankName !== "Unknown Bank" && t.price > 0;
          if (!isValid) {
            console.warn("[buy-tradelines] Filtering out invalid tradeline:", t);
          }
          return isValid;
        });
        
        console.log(`[buy-tradelines] Valid tradelines after filtering: ${validTradelines.length} of ${tradelinesList.length}`);
        setTradelines(validTradelines);
      } else {
        throw new Error("Invalid tradelines data format");
      }
    } catch (err: any) {
      console.error("Error fetching tradelines:", err);
      setError(err.message || "Failed to load tradelines. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing user data:", e);
          localStorage.removeItem("user");
        }
      }
    }
  }, []);

  const handleAddToCart = async (tradelineId: string) => {
    // REQUIRE LOGIN: Check if user is logged in
    if (!user) {
      router.push("https://lmsathena.com/login?redirect=/services/tradeline-exchange/buy-tradelines");
      return;
    }

    // Find tradeline to get API ID
    const tradeline = tradelines.find((t) => t.id === tradelineId);
    const tradelineApiId = tradeline?.tradelineId || tradelineId.replace("tl-", "");

    await cartStore.addItem(tradelineId, tradelineApiId);
    setAddedItemCount(1);
    setShowModal(true);
  };

  const handleViewDetails = (tradelineId: string) => {
    // REQUIRE LOGIN: Check if user is logged in
    if (!user) {
      router.push("https://lmsathena.com/login?redirect=/services/tradeline-exchange/buy-tradelines");
      return;
    }

    // Find the tradeline and show checkout modal
    const tradeline = tradelines.find((t) => t.id === tradelineId);
    if (tradeline) {
      setSelectedTradeline(tradeline);
      setShowCheckoutModal(true);
    }
  };

  const handleProceedToCheckout = () => {
    if (selectedTradeline) {
      router.push(`/services/tradeline-exchange/checkout/${selectedTradeline.id}`);
    }
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.name || user.user || user.email?.split("@")[0] || "User";
  };

  const filtered = useMemo(() => {
    let list = [...tradelines];

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
  }, [tradelines, minAge, minLimit, sortBy]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 mt-8">
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
            {/* User Status Indicator */}
            {user ? (
              <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-800 border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Logged in as {getUserDisplayName()}</span>
                <Link
                  href="/services/tradeline-exchange/my-account"
                  className="text-green-700 hover:text-green-900 underline"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800 border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Please</span>
                <Link
                  href="https://lmsathena.com/login?redirect=/services/tradeline-exchange/buy-tradelines"
                  className="text-amber-700 hover:text-amber-900 font-semibold underline"
                >
                  Sign In
                </Link>
                <span>to add to cart</span>
              </div>
            )}
            <div className="flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-medium text-sky-800 border border-sky-200">
              <Filter size={14} />
              <span>{loading ? "..." : `${filtered.length} results`}</span>
            </div>
          </div>
        </div>

        {/* SECURE FORM CTA */}
        {/* <div className="mt-4 mb-8 rounded-xl border border-sky-200 bg-sky-50/80 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
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
        </div> */}

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

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-sky-500 mb-4" />
            <p className="text-slate-600">Loading tradelines...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50/80 p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-900 mb-1">Error Loading Tradelines</h3>
                <p className="text-sm text-red-700 mb-4">{error}</p>
                <button
                  onClick={fetchTradelines}
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 text-white px-4 py-2 text-sm font-semibold hover:bg-red-700 transition"
                >
                  <RefreshCw size={14} />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LIST */}
        {!loading && !error && (
          <div className="grid gap-5 mt-8">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600 mb-2">No tradelines match your filters.</p>
                <button
                  onClick={() => {
                    setMinAge(0);
                    setMinLimit(0);
                  }}
                  className="text-sm text-sky-600 hover:text-sky-700 underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filtered.map((item) => (
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
                    Statement: {item.statementDate || "N/A"} • Util: {item.utilizationPercent || 0}% • Age:{" "}
                    {item.ageYears || 0} {item.ageYears === 1 ? "yr" : "yrs"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-sky-100">Credit Limit</p>
                    <p className="text-xl font-bold">
                      ${(item.creditLimit || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="h-10 w-px bg-white/20" />
                  <div className="text-right">
                    <p className="text-xs text-sky-100">Price</p>
                    <p className="text-xl font-bold">
                      ${(item.price || 0).toFixed(0)}
                    </p>
                    {(!item.price || item.price === 0) && (
                      <p className="text-xs text-red-200 mt-1">Price N/A</p>
                    )}
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
                  <button
                    onClick={() => handleViewDetails(item.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:border-sky-400 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    disabled={!user}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-md transition ${
                      user
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:translate-y-0.5"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    title={!user ? "Please sign in to add to cart" : ""}
                  >
                    <ShoppingCart size={16} />
                    {user ? "Add to Cart" : "Sign In Required"}
                  </button>
                </div>
              </div>
            </div>
          ))
            )}
          </div>
        )}

        {/* COMPLIANCE DISCLAIMER */}
        {!loading && !error && filtered.length > 0 && (
          <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50/80 p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-amber-900 mb-2">Important Information</h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Tradelines are authorized user accounts. Results may vary and are not guaranteed. 
                  Tradelines are not advertised for the purpose of obtaining loans, funding, or credit approval.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <AddToCartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        itemCount={addedItemCount}
      />

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => {
          setShowCheckoutModal(false);
          setSelectedTradeline(null);
        }}
        tradeline={selectedTradeline}
        onProceed={handleProceedToCheckout}
      />
    </div>
  );
}

