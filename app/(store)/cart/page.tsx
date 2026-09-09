import type { Metadata } from "next";
import { getSettings } from "@/lib/services/settings.service";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Your Cart",
};

export default async function CartPage() {
  const settings = await getSettings().catch(() => null);
  return (
    <div className="container-site py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-display font-bold mb-10">Shopping Cart</h1>
      <CartPageClient settings={settings ?? {
        brandName: "Musa Kicks",
        brandEmail: "hello@musakicks.com",
        brandPhone: "",
        brandAddress: "",
        whatsappNumber: "",
        whatsappOrderMessageTemplate: "",
        shippingFee: 200,
        freeShippingThreshold: 5000,
        loyaltyRequiredPurchases: 4,
        loyaltyRewardTitle: "Special Gift",
        loyaltyRewardDescription: "",
        currency: "PKR",
        currencySymbol: "Rs.",
        returnPeriodDays: 7,
      }} />
    </div>
  );
}
