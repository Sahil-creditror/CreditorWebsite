// @ts-nocheck
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Loader2, Plus } from "lucide-react";
import { cartStore, CartItem } from "../lib/cart";

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

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [tradelines, setTradelines] = useState<Tradeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user first
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

  // Fetch cart and tradelines from API (after user is loaded)
  useEffect(() => {
    // Don't fetch until we know user status (either loaded or not logged in)
    if (typeof window === "undefined") return;
    
    const storedUser = localStorage.getItem("user");
    const isLoggedOut = !storedUser;
    
    // Wait a bit if user might still be loading
    if (!user && !isLoggedOut) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Always load from localStorage first (for instant display)
        const localCart = await cartStore.getCart();
        console.log(`[cart] Loaded ${localCart.length} items from localStorage first`);
        setCart(localCart);

        // Fetch tradelines
        const tradelinesResponse = await fetch("/api/tradelines");
        const tradelinesData = await tradelinesResponse.json();
        
        if (tradelinesData.success && Array.isArray(tradelinesData.tradelines)) {
          setTradelines(tradelinesData.tradelines);
          console.log(`[cart] Loaded ${tradelinesData.tradelines.length} tradelines`);
        } else {
          throw new Error(tradelinesData.error || "Failed to fetch tradelines");
        }

        // Fetch cart from database (if user is logged in)
        if (user && user.id) {
          try {
            const cartResponse = await fetch(`/api/cart?userId=${user.id}`);
            const cartData = await cartResponse.json();
            
            if (cartData.success && cartData.cart && Array.isArray(cartData.cart.items)) {
              const dbCartItems = cartData.cart.items.map((item: any) => ({
                tradelineId: item.tradelineId,
                tradelineApiId: item.tradelineApiId,
                quantity: item.quantity,
                addedAt: item.addedAt || new Date().toISOString(),
              }));
              
              console.log(`[cart] Loaded ${dbCartItems.length} items from database`);
              
              // Merge: Use DB cart if it has items, otherwise keep local cart
              if (dbCartItems.length > 0) {
                // Merge local and DB carts (DB takes precedence, but keep local items not in DB)
                const mergedCart = [...dbCartItems];
                localCart.forEach((localItem) => {
                  if (!mergedCart.find((dbItem) => dbItem.tradelineId === localItem.tradelineId)) {
                    mergedCart.push(localItem);
                  }
                });
                setCart(mergedCart);
                
                // Sync merged cart back to DB
                if (mergedCart.length > 0) {
                  await fetch("/api/cart", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      userId: user.id,
                      email: user.email,
                      items: mergedCart,
                    }),
                  });
                }
              } else if (localCart.length > 0) {
                // DB is empty but local has items - sync local to DB
                console.log("[cart] DB cart is empty, syncing local cart to DB");
                await fetch("/api/cart", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: user.id,
                    email: user.email,
                    items: localCart,
                  }),
                });
              }
            } else {
              // DB cart doesn't exist, sync local to DB if it has items
              if (localCart.length > 0) {
                console.log("[cart] No DB cart found, syncing local cart to DB");
                await fetch("/api/cart", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: user.id,
                    email: user.email,
                    items: localCart,
                  }),
                });
              }
            }
          } catch (cartErr) {
            console.error("[cart] Error fetching cart from DB, using local:", cartErr);
            // Keep local cart on error
          }
        }
      } catch (err: any) {
        console.error("[cart] Error fetching data:", err);
        setError(err.message || "Failed to load cart");
        // Keep local cart on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, router]);

  const enrichedCart = useMemo(() => {
    return cart.map((item) => {
      // Try to find tradeline by multiple ID formats
      const tradeline = tradelines.find(
        (t) => 
          t.id === item.tradelineId ||
          t.id === `tl-${item.tradelineId}` ||
          t.tradelineId === item.tradelineId ||
          t.tradelineId === item.tradelineId.replace("tl-", "")
      );
      
      if (!tradeline) {
        console.warn("[cart] Tradeline not found for ID:", item.tradelineId, "Available IDs:", tradelines.slice(0, 5).map(t => t.id));
      }
      
      return {
        ...item,
        tradeline,
      };
    });
  }, [cart, tradelines]);

  const subtotal = useMemo(() => {
    return enrichedCart.reduce(
      (sum, item) => sum + (item.tradeline?.price || 0) * item.quantity,
      0
    );
  }, [enrichedCart]);

  const handleRemove = async (tradelineId: string) => {
    await cartStore.removeItem(tradelineId);
    // Get fresh cart after removal
    const updatedCart = await cartStore.getCart();
    setCart(updatedCart);
    
    // Also sync to DB if user is logged in
    if (user && user.id && updatedCart.length > 0) {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            email: user.email,
            items: updatedCart,
          }),
        });
      } catch (err) {
        console.error("[cart] Failed to sync cart after remove:", err);
      }
    }
  };

  const handleUpdateQuantity = async (tradelineId: string, quantity: number) => {
    await cartStore.updateQuantity(tradelineId, quantity);
    // Get fresh cart after update
    const updatedCart = await cartStore.getCart();
    setCart(updatedCart);
    
    // Also sync to DB if user is logged in
    if (user && user.id) {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            email: user.email,
            items: updatedCart,
          }),
        });
      } catch (err) {
        console.error("[cart] Failed to sync cart after update:", err);
      }
    }
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    router.push("/services_page/tradeline-exchange/user-agreement");
  };

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 mt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-slate-600">Review your tradeline selections</p>
        </div>

        {/* Warning */}
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded p-3">
          <p className="text-red-700 font-semibold text-center text-sm">
            *We do not sell tradelines in Georgia
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-sky-500 mx-auto mb-4" />
            <p className="text-slate-600">Loading tradelines...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-red-600 underline"
            >
              Reload page
            </button>
          </div>
        )}

        {/* Cart Items */}
        {!loading && !error && enrichedCart.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-lg font-semibold mb-1 text-slate-700">
                Your cart is empty
              </p>
              <p className="text-sm text-slate-500 mb-4">Start adding tradelines to your cart</p>
              <Link
                href="/services_page/tradeline-exchange/buy-tradelines"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
              >
                Browse Tradelines
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        ) : !loading && !error && (
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {enrichedCart.map((item) => (
                <div
                  key={item.tradelineId}
                  className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Tradeline Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-slate-900 mb-1 truncate">
                              {item.tradeline?.bankName || "Loading..."}
                              {!item.tradeline && (
                                <span className="ml-2 text-xs text-amber-600 font-normal">(Not found)</span>
                              )}
                            </h3>
                            <p className="text-xs text-slate-500 font-mono truncate">
                              ID: {item.tradelineId}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemove(item.tradelineId)}
                            className="flex-shrink-0 p-1.5 rounded-md hover:bg-red-50 text-red-600 transition"
                            aria-label="Remove item"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        
                        {/* Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Credit Limit</p>
                            <p className="text-sm font-semibold text-slate-900">
                              ${(item.tradeline?.creditLimit || 0).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Age</p>
                            <p className="text-sm font-semibold text-slate-900">
                              {item.tradeline?.ageYears || 0} {item.tradeline?.ageYears === 1 ? "yr" : "yrs"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Utilization</p>
                            <p className="text-sm font-semibold text-slate-900">
                              {item.tradeline?.utilizationPercent || 0}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Statement</p>
                            <p className="text-sm font-semibold text-slate-900">
                              {item.tradeline?.statementDate || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Price */}
                      <div className="flex-shrink-0 text-right border-l border-slate-200 pl-4">
                        <p className="text-xs text-slate-500 mb-1">Price</p>
                        <p className="text-xl font-bold text-slate-900">
                          ${(item.tradeline?.price || 0).toFixed(2)}
                        </p>
                        {!item.tradeline && (
                          <span className="block text-xs text-red-600 font-normal mt-1">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Browse More Button */}
              <div className="pt-4 text-center">
                <Link
                  href="/services_page/tradeline-exchange/buy-tradelines"
                  className="inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium transition"
                >
                  <Plus size={16} />
                  Browse More Tradelines
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 sticky top-24">
                <div className="space-y-4">
                  {/* Order Summary */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-slate-700 text-sm">
                        <span>Subtotal ({enrichedCart.length} {enrichedCart.length === 1 ? 'item' : 'items'})</span>
                        <span className="font-semibold">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-900">Total</span>
                          <span className="text-xl font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Store Credit */}
                  <div className="pt-3 border-t border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">
                      Store Credit
                    </h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                      />
                      <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-2 rounded-md transition text-sm whitespace-nowrap">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Continue Shopping Link */}
                  <Link
                    href="/services_page/tradeline-exchange/buy-tradelines"
                    className="block text-center text-xs text-slate-600 hover:text-sky-600 transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

