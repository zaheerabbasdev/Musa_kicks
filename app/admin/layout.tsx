import { requireAdmin } from "@/lib/auth/session";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";
import { getSettings } from "@/lib/services/settings.service";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const settings = await getSettings().catch(() => null);

  return <AdminLayoutClient storeName={settings?.brandName ?? "Store"}>{children}</AdminLayoutClient>;
}

