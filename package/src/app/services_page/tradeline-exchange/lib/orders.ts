export type TradelineOrder = {
  id: string;
  tradelineId: string;
  fullName: string;
  email: string;
  phone?: string;
  creditGoal?: string;
  createdAt: string;
  status: "pending" | "in_review" | "complete";
};

const STORAGE_KEY = "tradeline_orders";

const isBrowser = typeof window !== "undefined";

const readStore = (): TradelineOrder[] => {
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

const writeStore = (orders: TradelineOrder[]) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // ignore write errors
  }
};

export const orderStore = {
  getOrders(): TradelineOrder[] {
    return readStore();
  },

  getOrdersByEmail(email: string): TradelineOrder[] {
    if (!email) return [];
    const target = email.toLowerCase();
    return readStore().filter((o) => o.email?.toLowerCase() === target);
  },

  createOrder(order: TradelineOrder): void {
    const next = [...readStore(), order];
    writeStore(next);
  },
};


