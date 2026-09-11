import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faEnvelope, faPhone, faGift } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Customers — Admin",
};

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { orders: true } },
      loyaltyCycles: {
        where: { status: "ACTIVE" },
        take: 1,
      },
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold">Customer Directory</h1>
        <p style={{ color: "var(--muted-foreground)" }}>
          {customers.length} registered customers with orders and loyalty status
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Orders</th>
                <th>Loyalty Progress</th>
                <th>Member Since</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => {
                const cycle = c.loyaltyCycles[0];
                return (
                  <tr key={c.id} className="hover:bg-surface-2/50 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs">
                          {c.name ? c.name[0].toUpperCase() : "C"}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{c.name || "Customer"}</p>
                          <p className="text-xs text-text-muted">ID: {c.id.substring(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-0.5 text-xs">
                        <p className="flex items-center gap-1.5 text-text-secondary">
                          <FontAwesomeIcon icon={faEnvelope} className="text-[10px] text-text-muted" />
                          <span>{c.email}</span>
                        </p>
                        {c.phone && (
                          <p className="flex items-center gap-1.5 text-text-muted">
                            <FontAwesomeIcon icon={faPhone} className="text-[10px]" />
                            <span>{c.phone}</span>
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="font-bold text-sm">{c._count.orders}</span>
                      <span className="text-xs text-text-muted ml-1">orders</span>
                    </td>
                    <td>
                      {cycle ? (
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-surface-2 rounded-full h-2 overflow-hidden border border-border">
                            <div
                              className="bg-accent h-full rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (cycle.purchaseCount / cycle.requiredCount) * 100
                                )}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs font-semibold">
                            {cycle.purchaseCount}/{cycle.requiredCount}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-text-muted">No cycle</span>
                      )}
                    </td>
                    <td className="text-xs text-text-muted">
                      {new Date(c.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
