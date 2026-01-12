import { Tradeline } from "./tradelines";

export type CartItem = {
  tradelineId: string;
  tradelineApiId?: string; // card_id from API
  quantity: number;
  addedAt: string;
};

const STORAGE_KEY = "tradeline_cart";

const isBrowser = typeof window !== "undefined";

// LocalStorage fallback (for offline/quick access)
const readCartLocal = (): CartItem[] => {
  if (!isBrowser) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeCartLocal = (cart: CartItem[]) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // ignore write errors
  }
};

// Get current user info
const getUserInfo = () => {
  if (!isBrowser) return null;
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Sync cart to MongoDB
const syncCartToDB = async (cart: CartItem[]) => {
  const user = getUserInfo();
  if (!user || !user.id || !user.email) {
    // No user logged in, just save locally
    console.log("[cartStore] No user logged in, skipping DB sync");
    return;
  }

  try {
    console.log("[cartStore] Syncing cart to database:", { userId: user.id, itemsCount: cart.length });
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        email: user.email,
        items: cart,
      }),
    });
    
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || "Failed to sync cart");
    }
    console.log("[cartStore] ✅ Cart synced to database successfully");
  } catch (error: any) {
    console.error("[cartStore] Failed to sync cart to database:", error?.message || error);
    // Continue with local storage fallback - don't block user
  }
};

// Fetch cart from MongoDB
const fetchCartFromDB = async (): Promise<CartItem[]> => {
  const user = getUserInfo();
  if (!user || !user.id) {
    return readCartLocal(); // Fallback to local storage
  }

  try {
    const response = await fetch(`/api/cart?userId=${user.id}`);
    const data = await response.json();
    
    if (data.success && data.cart && Array.isArray(data.cart.items)) {
      // Convert to CartItem format
      return data.cart.items.map((item: any) => ({
        tradelineId: item.tradelineId,
        tradelineApiId: item.tradelineApiId,
        quantity: item.quantity,
        addedAt: item.addedAt || new Date().toISOString(),
      }));
    }
  } catch (error) {
    console.error("[cartStore] Failed to fetch cart from database:", error);
  }

  // Fallback to local storage
  return readCartLocal();
};

export const cartStore = {
  async getCart(): Promise<CartItem[]> {
    // Try to fetch from database first, fallback to local
    const dbCart = await fetchCartFromDB();
    if (dbCart.length > 0) {
      // Sync DB cart to local storage for quick access
      writeCartLocal(dbCart);
      return dbCart;
    }
    // Fallback to local storage
    return readCartLocal();
  },

  async addItem(tradelineId: string, tradelineApiId?: string): Promise<void> {
    const cart = readCartLocal(); // Get current cart
    const existing = cart.find((item) => item.tradelineId === tradelineId);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        tradelineId,
        tradelineApiId,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
    }
    
    // Save locally first (instant feedback)
    writeCartLocal(cart);
    
    // Sync to database (async, don't block)
    syncCartToDB(cart);
  },

  async removeItem(tradelineId: string): Promise<void> {
    const cart = readCartLocal().filter((item) => item.tradelineId !== tradelineId);
    
    // Save locally first
    writeCartLocal(cart);
    
    // Sync to database
    syncCartToDB(cart);
  },

  async updateQuantity(tradelineId: string, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await cartStore.removeItem(tradelineId);
      return;
    }
    
    const cart = readCartLocal();
    const item = cart.find((item) => item.tradelineId === tradelineId);
    if (item) {
      item.quantity = quantity;
      writeCartLocal(cart);
      syncCartToDB(cart);
    }
  },

  async clearCart(): Promise<void> {
    writeCartLocal([]);
    
    // Clear from database
    const user = getUserInfo();
    if (user && user.id) {
      try {
        await fetch(`/api/cart?userId=${user.id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("[cartStore] Failed to clear cart from database:", error);
      }
    }
  },

  getItemCount(): number {
    // Quick count from local storage
    return readCartLocal().reduce((sum, item) => sum + item.quantity, 0);
  },

  async getItemCountAsync(): Promise<number> {
    // Accurate count from database
    const cart = await this.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },
};

