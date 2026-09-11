import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSettings } from "@/lib/services/settings.service";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings().catch(() => null);
  const storeName = settings?.brandName ?? "Store";

  return (
    <div className="min-h-screen flex flex-col justify-between pt-[var(--nav-height)]">
      <Navbar storeName={storeName} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer storeName={storeName} />
    </div>
  );
}
