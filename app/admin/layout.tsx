import { requireAdmin } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen" style={{ background: "var(--muted)" }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: "var(--admin-sidebar-width)" }}>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
