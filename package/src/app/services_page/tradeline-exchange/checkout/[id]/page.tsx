// @ts-nocheck
"use client";

import Link from "next/link";
import { use, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PAYMENT_LINK_BASE =
  process.env.NEXT_PUBLIC_PAYMENT_LINK_BASE ??
  "https://pay.example.com/checkout"; // replace with your hosted payment URL

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

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [tradeline, setTradeline] = useState<Tradeline | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    creditGoal: "",
  });
  const [error, setError] = useState("");

  // Check authentication and load tradeline
  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          // Pre-fill form with user data
          setForm((prev) => ({
            ...prev,
            fullName: parsedUser.name || parsedUser.user || "",
            email: parsedUser.email || "",
          }));
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      } else {
        // Redirect to login if not authenticated
        router.push(`/signin?redirect=/services_page/tradeline-exchange/checkout/${id}`);
        return;
      }
    }

    // Fetch tradeline from API using specific endpoint
    const fetchTradeline = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Try the specific tradeline endpoint first
        const response = await fetch(`/api/tradelines/${id}`);
        const data = await response.json();
        
        if (data.success && data.tradeline) {
          console.log("Tradeline found:", data.tradeline);
          setTradeline(data.tradeline);
        } else if (!response.ok) {
          // Fallback: try fetching all tradelines and finding by ID
          console.log("Trying fallback: fetch all tradelines");
          const allResponse = await fetch("/api/tradelines");
          const allData = await allResponse.json();
          
          if (allData.success && Array.isArray(allData.tradelines)) {
            // Try multiple ID formats
            const found = allData.tradelines.find(
              (t: Tradeline) => 
                t.id === id || 
                t.id === `tl-${id}` ||
                t.tradelineId === id ||
                t.tradelineId === id.replace("tl-", "")
            );
            
            if (found) {
              console.log("Tradeline found in fallback:", found);
              setTradeline(found);
            } else {
              console.error("Tradeline not found. Available IDs:", allData.tradelines.map((t: Tradeline) => t.id));
              setError(`Tradeline not found. Looking for: ${id}`);
            }
          } else {
            setError(data.error || "Failed to load tradeline");
          }
        } else {
          setError(data.error || "Failed to load tradeline");
        }
      } catch (err: any) {
        console.error("Error fetching tradeline:", err);
        setError(err.message || "Failed to load tradeline details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTradeline();
  }, [id, router]);

  if (!user) {
    return null; // Will redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 px-6 pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-slate-300">Loading tradeline details...</p>
        </div>
      </div>
    );
  }

  if (!tradeline && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 px-6 pt-24">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-3xl font-bold">Tradeline not found</h1>
          <p className="text-slate-300">
            {error || "The tradeline you're looking for is unavailable. Please browse the catalog again."}
          </p>
          {error && (
            <p className="text-xs text-slate-400 mt-2">
              Debug: Looking for ID: {id}
            </p>
          )}
          <Link
            href="/services_page/tradeline-exchange/buy-tradelines"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md"
          >
            Back to Tradelines
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handlePaymentRedirect = () => {
    if (!form.email) {
      setError("Enter your email so we can match your payment.");
      return;
    }
    const url = `${PAYMENT_LINK_BASE}?tradelineId=${encodeURIComponent(
      id
    )}&email=${encodeURIComponent(form.email)}&price=${encodeURIComponent(
      tradeline?.price?.toFixed(0) ?? ""
    )}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-6 pt-24 pb-12">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_minmax(0,1fr)] gap-10 mt-8">
        {/* Summary Card */}
        <div className="rounded-3xl border border-sky-500/40 bg-slate-900/80 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-sky-200 mb-2">Tradeline Summary</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {tradeline.bankName || "Bank Name Not Available"}
            {(!tradeline.bankName || tradeline.bankName === "Unknown Bank") && (
              <span className="text-xs text-amber-400 block mt-1">
                ⚠️ Please verify tradeline details
              </span>
            )}
          </h1>
          <p className="text-slate-300 mb-4">
            **** {tradeline.last4 || "0000"} • Statement {tradeline.statementDate || "N/A"}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border border-sky-500/30 bg-slate-900/70 p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wide">Credit Limit</p>
              <p className="text-xl font-bold text-slate-50">
                ${(tradeline.creditLimit || 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-sky-500/30 bg-slate-900/70 p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wide">Age</p>
              <p className="text-xl font-bold text-slate-50">
                {tradeline.ageYears || 0} {tradeline.ageYears === 1 ? "year" : "years"}
              </p>
            </div>
            <div className="rounded-2xl border border-sky-500/30 bg-slate-900/70 p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wide">Utilization</p>
              <p className="text-xl font-bold text-slate-50">
                {tradeline.utilizationPercent || 0}%
              </p>
            </div>
            <div className="rounded-2xl border border-sky-500/30 bg-slate-900/70 p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wide">Slots Available</p>
              <p className="text-xl font-bold text-slate-50">
                {tradeline.slotsAvailable || 0}/{tradeline.slotsTotal || 0}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-sky-500/10 border border-sky-500/40 p-4">
            <p className="text-sm text-slate-50 font-semibold">Price</p>
            <p className="text-3xl font-black text-white">
              ${(tradeline.price || 0).toFixed(0)}
            </p>
            {(!tradeline.price || tradeline.price === 0) && (
              <p className="text-xs text-red-400 mt-2">
                ⚠️ Price not available. Please contact support.
              </p>
            )}
          </div>

          <div className="mt-6 text-sm text-slate-300 space-y-2">
            <p>Reporting Date: {tradeline.statementDate}</p>
            {tradeline.notes && <p className="text-sky-200">Note: {tradeline.notes}</p>}
          </div>

          <div className="mt-6">
            <Link
              href="/services_page/tradeline-exchange/buy-tradelines"
              className="text-sm text-sky-300 hover:text-sky-200 underline underline-offset-4"
            >
              ← Browse other tradelines
            </Link>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="rounded-3xl bg-white text-slate-900 p-6 shadow-xl border border-slate-200">
          <h2 className="text-2xl font-bold mb-2">Book this Tradeline</h2>
          <p className="text-slate-600 mb-6">
            Enter your details, then continue to the hosted payment page.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-semibold text-slate-800">Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-sky-500/70 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-800">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-sky-500/70 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-800">Phone (optional)</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-sky-500/70 focus:outline-none"
                placeholder="(000) 000-0000"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-800">Credit Goal (optional)</label>
              <textarea
                name="creditGoal"
                value={form.creditGoal}
                onChange={handleChange}
                rows={3}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-sky-500/70 focus:outline-none"
                placeholder="e.g., boost utilization, add age, prep for mortgage..."
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="button"
              onClick={handlePaymentRedirect}
              className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:translate-y-0.5 transition"
            >
              Proceed to Payment
            </button>
          </form>

          <div className="mt-4 text-[11px] text-slate-400">
            After paying, you’ll be redirected to a success page to confirm details.
          </div>
        </div>
      </div>
    </div>
  );
}


