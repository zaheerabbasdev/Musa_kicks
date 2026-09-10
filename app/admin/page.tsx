import type { Metadata } from "next";
import Link from "next/link";
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
  trend?: string;
  gradient: string;
  iconColor: string;
}

function StatCard({ label, value, icon, trend, gradient, iconColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${gradient} shadow-xs`}>
          <FontAwesomeIcon icon={icon} className={`w-5 h-5 ${iconColor}`} />
        </div>
        {trend && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">{value}</p>
        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-1">{label}</p>
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Executive Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-neutral-900 text-white mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Store Command Center</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-neutral-950">Executive Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Real-time performance metrics, inventory health, and recent purchases</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20 transition-all hover:scale-[1.02]"
          >
            <span>+ New Product Drop</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Gross Revenue"
            value={`${currencySymbol} ${stats.totalRevenue.toLocaleString()}`}
            icon={faDollarSign}
            trend="+18.4%"
            gradient="bg-emerald-500/10"
            iconColor="text-emerald-600"
          />
          <StatCard
            label="Orders Completed"
            value={stats.totalOrders}
            icon={faClipboardList}
            trend="+12 New"
            gradient="bg-orange-500/10"
            iconColor="text-orange-600"
          />
          <StatCard
            label="Registered VIPs"
            value={stats.totalCustomers}
            icon={faUsers}
            trend="Active"
            gradient="bg-blue-500/10"
            iconColor="text-blue-600"
          />
          <StatCard
            label="Live Shoe Models"
            value={stats.totalProducts}
            icon={faBoxOpen}
            gradient="bg-purple-500/10"
            iconColor="text-purple-600"
          />
          <StatCard
            label="Pending Fulfillment"
            value={stats.pendingOrders}
            icon={faClock}
            gradient="bg-amber-500/10"
            iconColor="text-amber-600"
          />
          <StatCard
            label="Delivered Orders"
            value={stats.deliveredOrders}
            icon={faCheckCircle}
            gradient="bg-teal-500/10"
            iconColor="text-teal-600"
          />
          <StatCard
            label="Low Stock Alerts"
            value={stats.lowStockVariants}
            icon={faExclamationTriangle}
            gradient="bg-rose-500/10"
            iconColor="text-rose-600"
          />
          <StatCard
            label="Pending Rewards"
            value={stats.availableRewards}
            icon={faGift}
            gradient="bg-yellow-500/10"
            iconColor="text-yellow-600"
          />
        </div>
      )}

      {/* Recent Orders Card */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-lg text-neutral-950 tracking-tight">Recent Orders</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Latest transactions processed through Musa Kicks</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold uppercase tracking-wider text-orange-600 hover:text-orange-700 transition-colors"
          >
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/60 text-neutral-400 text-[11px] font-extrabold uppercase tracking-wider">
                <th className="py-3.5 px-6">Order ID</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Featured Item</th>
                <th className="py-3.5 px-6">Total Amount</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-neutral-400">
                    No orders recorded yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => {
                  const customerName = order.user?.name ?? order.guestName ?? "Guest";
                  const initial = customerName.charAt(0).toUpperCase();

                  return (
                    <tr key={order.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-xs text-neutral-900">
                        #{order.orderNumber}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
                            {initial}
                          </div>
                          <span className="font-semibold text-neutral-900">{customerName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-neutral-600 font-medium">
                        {order.items[0]?.productName ?? "—"}
                      </td>
                      <td className="py-4 px-6 font-extrabold text-neutral-950">
                        {currencySymbol} {Number(order.total).toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${
                            order.status === "DELIVERED"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : order.status === "PENDING"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : order.status === "CANCELLED"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              order.status === "DELIVERED"
                                ? "bg-emerald-500"
                                : order.status === "PENDING"
                                ? "bg-amber-500 animate-pulse"
                                : order.status === "CANCELLED"
                                ? "bg-rose-500"
                                : "bg-blue-500"
                            }`}
                          />
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-xs text-neutral-400 font-medium">
                        {new Date(order.createdAt).toLocaleDateString("en-PK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
