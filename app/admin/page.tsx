import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faClipboardList,
  faUsers,
  faDollarSign,
  faExclamationTriangle,
  faClock,
  faCheckCircle,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const metadata: Metadata = { title: "Admin Dashboard" };

async function getDashboardStats() {
  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    pendingOrders,
    deliveredOrders,
    totalRevenue,
    lowStockVariants,
    availableRewards,
  ] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { in: ["DELIVERED", "SHIPPED"] } },
    }),
    prisma.productVariant.count({ where: { stock: { gt: 0, lte: 5 } } }),
    prisma.reward.count({ where: { status: "AVAILABLE" } }),
  ]);

  return {
    totalProducts,
    totalOrders,
    totalCustomers,
    pendingOrders,
    deliveredOrders,
    totalRevenue: Number(totalRevenue._sum.total ?? 0),
    lowStockVariants,
    availableRewards,
  };
}

async function getRecentOrders() {
  return prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true } },
      items: { select: { productName: true }, take: 1 },
    },
  });
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: IconDefinition;
  color: string;
  bgColor: string;
}

function StatCard({ label, value, icon, color, bgColor }: StatCardProps) {
  return (
    <div className="card p-6 flex items-start gap-4">
      <div className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0" style={{ background: bgColor }}>
        <FontAwesomeIcon icon={icon} className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold font-display">{value}</p>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>{label}</p>
      </div>
    </div>
  );
}

export default async function AdminDashboard() {
  const [stats, recentOrders] = await Promise.all([
    getDashboardStats().catch(() => null),
    getRecentOrders().catch(() => []),
  ]);

  const currencySymbol = "Rs.";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-display font-bold">Dashboard</h1>
        <p style={{ color: "var(--muted-foreground)" }}>Overview of your store performance</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Revenue" value={`${currencySymbol} ${stats.totalRevenue.toLocaleString()}`} icon={faDollarSign} color="#2D6A4F" bgColor="#D8F3DC" />
          <StatCard label="Total Orders" value={stats.totalOrders} icon={faClipboardList} color="var(--primary)" bgColor="var(--muted)" />
          <StatCard label="Total Customers" value={stats.totalCustomers} icon={faUsers} color="#1565C0" bgColor="#E3F2FD" />
          <StatCard label="Active Products" value={stats.totalProducts} icon={faBoxOpen} color="var(--secondary)" bgColor="var(--muted)" />
          <StatCard label="Pending Orders" value={stats.pendingOrders} icon={faClock} color="var(--warning)" bgColor="var(--warning-bg)" />
          <StatCard label="Delivered Orders" value={stats.deliveredOrders} icon={faCheckCircle} color="#2D6A4F" bgColor="#D8F3DC" />
          <StatCard label="Low Stock Variants" value={stats.lowStockVariants} icon={faExclamationTriangle} color="var(--error)" bgColor="var(--error-bg)" />
          <StatCard label="Unclaimed Rewards" value={stats.availableRewards} icon={faGift} color="var(--warning)" bgColor="var(--warning-bg)" />
        </div>
      )}

      {/* Recent Orders */}
      <div className="card">
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="font-semibold font-display text-lg">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8" style={{ color: "var(--muted-foreground)" }}>
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-sm">{order.orderNumber}</td>
                    <td>{order.user?.name ?? order.guestName ?? "Guest"}</td>
                    <td className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      {order.items[0]?.productName ?? "—"}
                    </td>
                    <td className="font-medium">{currencySymbol} {Number(order.total).toLocaleString()}</td>
                    <td>
                      <span
                        className="badge text-xs"
                        style={{
                          background: order.status === "DELIVERED" ? "#D8F3DC" : order.status === "PENDING" ? "var(--warning-bg)" : order.status === "CANCELLED" ? "var(--error-bg)" : "var(--muted)",
                          color: order.status === "DELIVERED" ? "#2D6A4F" : order.status === "PENDING" ? "var(--warning)" : order.status === "CANCELLED" ? "var(--error)" : "var(--foreground)",
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      {new Date(order.createdAt).toLocaleDateString("en-PK")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
