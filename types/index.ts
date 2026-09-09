/**
 * Musa Kicks — Shared TypeScript Types
 */
import type { Prisma } from "@prisma/client";

// ── Product Types ─────────────────────────────────────────

export type ProductWithImages = Prisma.ProductGetPayload<{
  include: {
    images: true;
    category: true;
    variants: true;
  };
}>;

export type ProductSummary = Prisma.ProductGetPayload<{
  include: {
    images: { where: { isPrimary: true }; take: 1 };
    category: { select: { name: true; slug: true } };
    variants: { select: { size: true; color: true; stock: true } };
  };
}>;

// ── Cart Types ────────────────────────────────────────────

export type CartItemFull = Prisma.CartItemGetPayload<{
  include: {
    product: {
      include: {
        images: { where: { isPrimary: true }; take: 1 };
      };
    };
    variant: true;
  };
}>;

export type CartWithItems = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            images: { where: { isPrimary: true }; take: 1 };
          };
        };
        variant: true;
      };
    };
  };
}>;

// ── Order Types ───────────────────────────────────────────

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    items: true;
    address: true;
    user: { select: { name: true; email: true; phone: true } };
  };
}>;

// ── Wishlist Types ────────────────────────────────────────

export type WishlistWithItems = Prisma.WishlistGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            images: { where: { isPrimary: true }; take: 1 };
            variants: true;
            category: true;
          };
        };
      };
    };
  };
}>;

// ── Loyalty Types ─────────────────────────────────────────

export type LoyaltyCycleWithPurchases = Prisma.LoyaltyCycleGetPayload<{
  include: {
    purchases: true;
  };
}>;

// ── API Response Types ────────────────────────────────────

export type ApiResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// ── Filter Types ──────────────────────────────────────────

export type ProductFilters = {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  sort?: "newest" | "oldest" | "price_asc" | "price_desc" | "popular" | "featured";
  page?: number;
  limit?: number;
};

// ── Cart State (client-side) ─────────────────────────────

export type CartItemClient = {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  slug: string;
  stock: number;
};

// ── Site Settings ─────────────────────────────────────────

export type SiteSettingsMap = {
  brandName: string;
  brandEmail: string;
  brandPhone: string;
  brandAddress: string;
  whatsappNumber: string;
  whatsappOrderMessageTemplate: string;
  shippingFee: number;
  freeShippingThreshold: number;
  loyaltyRequiredPurchases: number;
  loyaltyRewardTitle: string;
  loyaltyRewardDescription: string;
  loyaltyRewardExpirationDays?: number;
  currency: string;
  currencySymbol: string;
  returnPeriodDays: number;
  socialInstagram?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  logoUrl?: string;
  logoPublicId?: string;
  faviconUrl?: string;
  faviconPublicId?: string;
};
