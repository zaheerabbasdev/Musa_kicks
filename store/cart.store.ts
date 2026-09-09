/**
 * Cart Store — Zustand client-side cart state
 * Syncs with server-side DB for authenticated users.
 */
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItemClient } from "@/types";

interface CartStore {
  items: CartItemClient[];
  totalItems: number;
  isOpen: boolean;

  addItem: (item: CartItemClient) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  hydrate: (items: CartItemClient[]) => void;
}

function computeTotal(items: CartItemClient[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      isOpen: false,

      addItem: (newItem) => {
        const existing = get().items.find((i) => i.variantId === newItem.variantId);
        let items: CartItemClient[];

        if (existing) {
          items = get().items.map((i) =>
            i.variantId === newItem.variantId
              ? { ...i, quantity: Math.min(i.quantity + newItem.quantity, i.stock) }
              : i
          );
        } else {
          items = [...get().items, newItem];
        }

        set({ items, totalItems: computeTotal(items), isOpen: true });
      },

      removeItem: (variantId) => {
        const items = get().items.filter((i) => i.variantId !== variantId);
        set({ items, totalItems: computeTotal(items) });
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        const items = get().items.map((i) =>
          i.variantId === variantId ? { ...i, quantity: Math.min(quantity, i.stock) } : i
        );
        set({ items, totalItems: computeTotal(items) });
      },

      clearCart: () => set({ items: [], totalItems: 0 }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      hydrate: (items) => set({ items, totalItems: computeTotal(items) }),
    }),
    {
      name: "musa-kicks-cart",
      partialize: (s) => ({ items: s.items, totalItems: s.totalItems }),
    }
  )
);

// ── Selector helpers ───────────────────────────────────────
export function useCartSubtotal() {
  return useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
}

export function useCartItem(variantId: string) {
  return useCartStore((s) => s.items.find((i) => i.variantId === variantId));
}
