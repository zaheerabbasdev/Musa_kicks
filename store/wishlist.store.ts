"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
export type WishlistItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice: number | null;
  images: {
    publicId: string;
    imageUrl: string;
    altText?: string | null;
  }[];
  category: { name: string; slug: string } | null;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  variants: {
    size: string;
    color: string;
    colorHex?: string | null;
    stock: number;
  }[];
};

interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().items.some((i) => i.id === product.id)) {
          set({ items: [...get().items, product] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) });
      },
      toggleItem: (product) => {
        const exists = get().items.some((i) => i.id === product.id);
        if (exists) {
          set({ items: get().items.filter((i) => i.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((i) => i.id === productId);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "musa-kicks-wishlist",
    }
  )
);
