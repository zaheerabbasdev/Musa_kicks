import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";

export const metadata: Metadata = { title: "Analytics — Admin" };

export default async function AdminAnalyticsPage() {
  const [orders, products, customers, lowStock] = await Promise.all([
    prisma.order.findMany({
      select: { total: true, status: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.user.count({ where: { role: "CUSTOMER", isActive: true } }),
    prisma.productVariant.count({ where: { stock: { gt: 0, lte: 5 } } }),
  ]);

  const completedOrders = orders.filter((order) =>
    ["DELIVERED", "SHIPPED"].includes(order.status)
  );
  const revenue = completedOrders.reduce((sum, order) => sum + Number(order.total), 0);
  const averageOrder = completedOrders.length ? revenue / completedOrders.length : 0;
  const monthlyRevenue = new Map<string, number>();

  for (const order of completedOrders) {
    const month = order.createdAt.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    monthlyRevenue.set(month, (monthlyRevenue.get(month) ?? 0) + Number(order.total));
  }

  const recentMonths = [...monthlyRevenue.entries()].slice(0, 6).reverse();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="mb-2">
        <h1 className="text-2xl font-display font-bold">Analytics</h1>
        <p style={{ color: "var(--muted-foreground)" }}>
          Track revenue, orders, customers, and inventory performance
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Revenue", `Rs. ${revenue.toLocaleString()}`],
          ["Completed Orders", completedOrders.length],
          ["Average Order", `Rs. ${Math.round(averageOrder).toLocaleString()}`],
          ["Active Products", products],
        ].map(([label, value]) => (
          <div key={String(label)} className="card p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-text-muted">{label}</p>
            <p className="text-2xl font-black mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="card p-6 lg:col-span-2">
          <h2 className="text-lg font-bold">Revenue by Month</h2>
          <p className="text-sm mt-1 text-text-muted">Completed and shipped orders</p>
          {recentMonths.length === 0 ? (
            <p className="py-12 text-center text-sm text-text-muted">No completed order revenue yet.</p>
          ) : (
            <div className="mt-8 space-y-5">
              {recentMonths.map(([month, amount]) => {
                const max = Math.max(...recentMonths.map(([, value]) => value), 1);
                return (
                  <div key={month}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{month}</span>
                      <strong>Rs. {Math.round(amount).toLocaleString()}</strong>
                    </div>
                    <div className="h-3 rounded-full bg-surface-2 overflow-hidden">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${(amount / max) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="card p-6 space-y-5">
          <h2 className="text-lg font-bold">Store Health</h2>
          <div className="flex justify-between border-b border-border pb-4">
            <span className="text-sm text-text-muted">Active customers</span>
            <strong>{customers}</strong>
          </div>
          <div className="flex justify-between border-b border-border pb-4">
            <span className="text-sm text-text-muted">Products listed</span>
            <strong>{products}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-text-muted">Low-stock variants</span>
            <strong className={lowStock > 0 ? "text-danger" : "text-success"}>{lowStock}</strong>
          </div>
        </section>
      </div>
    </div>
  );
}
