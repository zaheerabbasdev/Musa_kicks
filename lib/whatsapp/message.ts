/**
 * WhatsApp Message Service
 * Generates pre-filled WhatsApp order messages and URLs.
 */
import type { CartWithItems } from "@/types";
import type { SiteSettingsMap } from "@/types";

type CustomerInfo = {
  name?: string;
  phone?: string;
  address?: string;
};

export function generateOrderMessage(
  cart: CartWithItems,
  customer: CustomerInfo,
  settings: SiteSettingsMap
): string {
  const currencySymbol = settings.currencySymbol ?? "Rs.";

  // Build items section
  const itemLines = cart.items.map((item, i) => {
    const price = Number(item.product.price);
    const line = [
      `${i + 1}. ${item.product.name}`,
      `   Size: ${item.variant.size}`,
      `   Color: ${item.variant.color}`,
      `   Quantity: ${item.quantity}`,
      `   Price: ${currencySymbol} ${(price * item.quantity).toLocaleString()}`,
    ].join("\n");
    return line;
  });

  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  const shippingFee = subtotal >= (settings.freeShippingThreshold ?? 5000)
    ? 0
    : (settings.shippingFee ?? 200);

  const total = subtotal + shippingFee;

  const lines = [
    `Hello ${settings.brandName ?? "Store"},`,
    "",
    "I would like to place an order.",
    "",
    "━━━━ Order Items ━━━━",
    ...itemLines,
    "",
    `━━━━ Order Summary ━━━━`,
    `Subtotal:  ${currencySymbol} ${subtotal.toLocaleString()}`,
    `Shipping:  ${shippingFee === 0 ? "Free" : `${currencySymbol} ${shippingFee.toLocaleString()}`}`,
    `Total:     ${currencySymbol} ${total.toLocaleString()}`,
    "",
    "━━━━ Customer Details ━━━━",
    `Name:    ${customer.name ?? "—"}`,
    `Phone:   ${customer.phone ?? "—"}`,
    `Address: ${customer.address ?? "—"}`,
    "",
    "Please confirm my order.",
    "",
    "Thank you! 🙏",
  ];

  return lines.join("\n");
}

export function generateWhatsAppUrl(
  phoneNumber: string,
  message: string
): string {
  // Clean phone number — remove spaces, dashes, and leading zeros
  const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

export function buildWhatsAppUrl(
  cart: CartWithItems,
  customer: CustomerInfo,
  settings: SiteSettingsMap
): string {
  const message = generateOrderMessage(cart, customer, settings);
  return generateWhatsAppUrl(settings.whatsappNumber, message);
}
