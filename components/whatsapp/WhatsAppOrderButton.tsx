"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useCartStore } from "@/store/cart.store";
import type { SiteSettingsMap } from "@/types";

interface WhatsAppOrderButtonProps {
  settings: SiteSettingsMap;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  size?: "md" | "lg" | "xl";
  className?: string;
}

export function WhatsAppOrderButton({
  settings,
  customerName,
  customerPhone,
  customerAddress,
  size = "lg",
  className = "",
}: WhatsAppOrderButtonProps) {
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.totalItems);

  const handleClick = () => {
    if (items.length === 0) return;

    const currencySymbol = settings.currencySymbol ?? "Rs.";
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee =
      subtotal >= (settings.freeShippingThreshold ?? 5000)
        ? 0
        : (settings.shippingFee ?? 200);
    const total = subtotal + shippingFee;

    // Build message
    const itemLines = items.map((item, i) =>
      [
        `${i + 1}. ${item.productName}`,
        `   Size: ${item.size}`,
        `   Color: ${item.color}`,
        `   Quantity: ${item.quantity}`,
        `   Price: ${currencySymbol} ${(item.price * item.quantity).toLocaleString()}`,
      ].join("\n")
    );

    const message = [
      `Hello ${settings.brandName ?? "Musa Kicks"},`,
      "",
      "I would like to place an order.",
      "",
      "━━━━ Order Items ━━━━",
      ...itemLines,
      "",
      "━━━━ Order Summary ━━━━",
      `Subtotal:  ${currencySymbol} ${subtotal.toLocaleString()}`,
      `Shipping:  ${shippingFee === 0 ? "Free" : `${currencySymbol} ${shippingFee.toLocaleString()}`}`,
      `Total:     ${currencySymbol} ${total.toLocaleString()}`,
      "",
      "━━━━ Customer Details ━━━━",
      `Name:    ${customerName ?? "—"}`,
      `Phone:   ${customerPhone ?? "—"}`,
      `Address: ${customerAddress ?? "—"}`,
      "",
      "Please confirm my order.",
      "",
      "Thank you! 🙏",
    ].join("\n");

    const phone = (settings.whatsappNumber ?? "").replace(/[\s\-\(\)]/g, "");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const btnSizeClass =
    size === "xl" ? "btn-xl" : size === "lg" ? "btn-lg" : "";

  return (
    <button
      onClick={handleClick}
      disabled={totalItems === 0}
      className={`btn btn-whatsapp ${btnSizeClass} ${className}`}
      aria-label="Order via WhatsApp"
      id="whatsapp-order-btn"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
      <span>
        Order via WhatsApp
        {totalItems > 0 && ` (${totalItems} item${totalItems !== 1 ? "s" : ""})`}
      </span>
    </button>
  );
}
