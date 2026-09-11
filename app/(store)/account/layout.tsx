import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "My Account",
};

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth("/account");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/30 text-accent font-black text-xl flex items-center justify-center">
          {user.name ? user.name[0].toUpperCase() : "U"}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">{user.name ?? "Customer"}</h1>
          <p className="text-text-muted text-sm">{user.email}</p>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
}
