import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export const metadata: Metadata = {
  title: "My Addresses — Musa Kicks",
};

export default async function AddressesPage() {
  const user = await requireAuth("/account/addresses");
  const addresses = await prisma.address.findMany({
    where: { userId: user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">My Addresses</h2>
        <p className="text-sm text-text-muted mt-1">
          Saved delivery addresses for your Musa Kicks orders.
        </p>
      </div>

      {addresses.length === 0 ? (
        <section className="card p-8 text-center">
          <h3 className="text-lg font-bold">No saved addresses</h3>
          <p className="text-sm text-text-muted mt-2">
            Your delivery address will appear here after you place an order.
          </p>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <section key={address.id} className="card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-bold">{address.label}</h3>
                {address.isDefault && (
                  <span className="text-xs font-semibold text-accent">Default</span>
                )}
              </div>
              <address className="not-italic text-sm text-text-secondary leading-relaxed">
                <p className="font-semibold text-text">{address.recipientName}</p>
                <p>{address.phone}</p>
                <p className="mt-2">{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.province}
                  {address.postalCode ? ` ${address.postalCode}` : ""}
                </p>
                <p>{address.country}</p>
              </address>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
