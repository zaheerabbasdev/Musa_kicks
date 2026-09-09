import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { OrderStatusBadge } from "@/components/ui/Badge";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp as fabWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Prisma } from "@prisma/client";

export const metadata: Metadata = { title: "Orders — Admin" };

interface PageProps {
  searchParams: Promise<{ status?: string; page?: string; search?: string }>;
}

const ORDER_STATUSES = [
  "ALL", "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED",
];

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1", 10);
  const limit = 20;
  const status = params.status && params.status !== "ALL" ? params.status : undefined;

  const where: Prisma.OrderWhereInput = {
    ...(status && { status: status as Prisma.EnumOrderStatusFilter }),
    ...(params.search && {
      OR: [
        { orderNumber: { contains: params.search } },
        { guestName: { contains: params.search } },
        { user: { name: { contains: params.search } } },
      ],
    }),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
        items: { select: { productName: true }, take: 1 },
      },
    }).catch(() => []),
    prisma.order.count({ where }).catch(() => 0),
  ]);

  const totalPages = Math.ceil(total / limit);
  const currencySymbol = "Rs.";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold">Orders</h1>
        <p style={{ color: "var(--muted-foreground)" }}>{total} total orders</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-2">
        {ORDER_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              (params.status ?? "ALL") === s
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "bg-[var(--muted)] hover:bg-[var(--border)]"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {/* Search */}
      <form className="mb-6">
        <input name="search" defaultValue={params.search} placeholder="Search by order # or customer..." className="input max-w-sm" />
        {params.status && <input type="hidden" name="status" value={params.status} />}
      </form>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12" style={{ color: "var(--muted-foreground)" }}>
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-sm font-medium">{order.orderNumber}</td>
                    <td>{order.user?.name ?? order.guestName ?? "Guest"}</td>
                    <td className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      {order.items[0]?.productName ?? "—"}
                    </td>
                    <td className="font-medium">{currencySymbol} {Number(order.total).toLocaleString()}</td>
                    <td><OrderStatusBadge status={order.status} /></td>
                    <td>
                      <span className="text-xs font-medium" style={{
                        color: order.paymentStatus === "PAID" ? "var(--success)" : order.paymentStatus === "PENDING" ? "var(--warning)" : "var(--muted-foreground)"
                      }}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      {new Date(order.createdAt).toLocaleDateString("en-PK")}
                    </td>
                    <td>
                      <Link href={`/admin/orders/${order.id}`} className="btn btn-secondary btn-sm gap-1.5">
                        <FontAwesomeIcon icon={faEye} className="w-3 h-3" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-[var(--border)]">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              {page > 1 && <Link href={`/admin/orders?page=${page - 1}&status=${params.status ?? "ALL"}`} className="btn btn-secondary btn-sm">Previous</Link>}
              {page < totalPages && <Link href={`/admin/orders?page=${page + 1}&status=${params.status ?? "ALL"}`} className="btn btn-secondary btn-sm">Next</Link>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
