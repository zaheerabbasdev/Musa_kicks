import { requireAdmin } from "@/lib/auth/session";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

