import { Tradeline } from "./tradelines";

export type CartItem = {
  tradelineId: string;
  quantity: number;
  addedAt: string;
};

const STORAGE_KEY = "tradeline_cart";

const isBrowser = typeof window !== "undefined";

const readCart = (): CartItem[] => {
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

const writeCart = (cart: CartItem[]) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // ignore write errors
  }
};

export const cartStore = {
  getCart(): CartItem[] {
    return readCart();
  },

  addItem(tradelineId: string): void {
    const cart = readCart();
    const existing = cart.find((item) => item.tradelineId === tradelineId);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        tradelineId,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
    }
    writeCart(cart);
  },

  removeItem(tradelineId: string): void {
    const cart = readCart().filter((item) => item.tradelineId !== tradelineId);
    writeCart(cart);
  },

  updateQuantity(tradelineId: string, quantity: number): void {
    if (quantity <= 0) {
      cartStore.removeItem(tradelineId);
      return;
    }
    const cart = readCart();
    const item = cart.find((item) => item.tradelineId === tradelineId);
    if (item) {
      item.quantity = quantity;
      writeCart(cart);
    }
  },

  clearCart(): void {
    writeCart([]);
  },

  getItemCount(): number {
    return readCart().reduce((sum, item) => sum + item.quantity, 0);
  },
};

