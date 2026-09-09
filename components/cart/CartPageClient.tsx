"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faMinus,
  faPlus,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp as fabWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useCartStore, useCartSubtotal } from "@/store/cart.store";
import { CloudinaryImage } from "@/components/cloudinary/CloudinaryImage";
import { WhatsAppOrderButton } from "@/components/whatsapp/WhatsAppOrderButton";
import { EmptyState } from "@/components/ui/EmptyState";
import type { SiteSettingsMap } from "@/types";

interface CartPageClientProps {
  settings: SiteSettingsMap;
}

export function CartPageClient({ settings }: CartPageClientProps) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartSubtotal();
  const currencySymbol = settings.currencySymbol ?? "Rs.";
  const shippingFee = subtotal >= (settings.freeShippingThreshold ?? 5000) ? 0 : (settings.shippingFee ?? 200);
  const total = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add some shoes to get started"
        action={
          <Link href="/shop" className="btn btn-primary btn-lg">
            <FontAwesomeIcon icon={faShoppingBag} className="w-4 h-4" />
            Continue Shopping
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">{items.length} Item{items.length !== 1 ? "s" : ""}</h2>
          <button
            onClick={clearCart}
            className="text-sm text-[var(--error)] hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.variantId} className="card p-4 flex gap-4">
              {/* Image */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-[var(--radius-md)] overflow-hidden bg-[var(--muted)]">
                {item.imageUrl && (
                  <CloudinaryImage
                    src={item.imageUrl}
                    alt={item.productName}
                    width={112}
                    height={112}
                    fill
                    objectFit="cover"
                    preset="thumbnail"
                  />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.slug}`} className="font-medium hover:text-[var(--primary)] transition-colors line-clamp-2">
                  {item.productName}
                </Link>
                <div className="flex gap-3 text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
                  <span>Size: {item.size}</span>
                  <span>•</span>
                  <span>Color: {item.color}</span>
                </div>
                <p className="text-sm font-semibold mt-1">
                  {currencySymbol} {item.price.toLocaleString()}
                </p>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-[var(--border)] rounded-[var(--radius-md)] overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[var(--muted)] transition-colors"
                      aria-label="Decrease"
                    >
                      <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[var(--muted)] transition-colors disabled:opacity-40"
                      aria-label="Increase"
                    >
                      <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Line total + remove */}
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">
                      {currencySymbol} {(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] hover:bg-[var(--error-bg)] transition-colors"
                      style={{ color: "var(--error)" }}
                      aria-label="Remove item"
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/shop" className="btn btn-secondary mt-6 inline-flex">
          ← Continue Shopping
        </Link>
      </div>

      {/* Order Summary */}
      <div>
        <div className="card p-6 sticky top-[calc(var(--nav-height)+1rem)]">
          <h2 className="text-lg font-semibold font-display mb-6">Order Summary</h2>

          <div className="flex flex-col gap-3 text-sm mb-6">
            <div className="flex justify-between">
              <span style={{ color: "var(--muted-foreground)" }}>Subtotal</span>
              <span>{currencySymbol} {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--muted-foreground)" }}>Shipping</span>
              <span>
                {shippingFee === 0
                  ? <span style={{ color: "var(--success)" }}>Free</span>
                  : `${currencySymbol} ${shippingFee.toLocaleString()}`
                }
              </span>
            </div>
            {shippingFee > 0 && (
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Add {currencySymbol} {(settings.freeShippingThreshold - subtotal).toLocaleString()} more for free shipping
              </p>
            )}
          </div>

          <div className="divider mb-4" />

          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>{currencySymbol} {total.toLocaleString()}</span>
          </div>

          <WhatsAppOrderButton
            settings={settings}
            size="xl"
            className="w-full justify-center"
          />

          <p className="text-xs text-center mt-4" style={{ color: "var(--muted-foreground)" }}>
            You will be redirected to WhatsApp to confirm your order
          </p>
        </div>
      </div>
    </div>
  );
}
