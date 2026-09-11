import type { Metadata } from "next";
import { getSettings } from "@/lib/services/settings.service";
import { WishlistPageClient } from "@/components/wishlist/WishlistPageClient";

export const metadata: Metadata = {
  title: "My Wishlist",
  description: "View and manage your favorite products saved in your wishlist.",
};

export default async function WishlistPage() {
  const settings = await getSettings();
  const currencySymbol = settings.currencySymbol ?? "Rs.";

  return <WishlistPageClient currencySymbol={currencySymbol} />;
}
