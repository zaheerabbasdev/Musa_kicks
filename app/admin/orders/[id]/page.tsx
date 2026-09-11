import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { OrderStatusBadge } from "@/components/ui/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = { title: "Order Details — Admin" };

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      address: true,
      items: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!order) notFound();

  const customerName = order.user?.name ?? order.guestName ?? "Guest";
  const customerEmail = order.user?.email ?? order.guestEmail ?? "—";
  const customerPhone = order.user?.phone ?? order.guestPhone ?? "—";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="btn btn-secondary btn-sm flex items-center gap-1.5">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          <span>Back to Orders</span>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold">Order {order.orderNumber}</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Placed {new Date(order.createdAt).toLocaleString("en-PK")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="card p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Items</h2>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="divide-y divide-[var(--border)]">
            {order.items.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 rounded-lg object-cover bg-[var(--muted)]" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-[var(--muted)]" />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{item.productName}</p>
                    <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      {item.productSku} · {item.color} · Size {item.size} · Qty {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold whitespace-nowrap">
                  Rs. {(Number(item.price) * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-6 space-y-4">
          <h2 className="text-lg font-bold">Customer</h2>
          <div className="text-sm space-y-2">
            <p><strong>{customerName}</strong></p>
            <p style={{ color: "var(--muted-foreground)" }}>{customerEmail}</p>
            <p style={{ color: "var(--muted-foreground)" }}>{customerPhone}</p>
          </div>
          {order.address && (
            <>
              <h2 className="text-lg font-bold pt-3 border-t border-[var(--border)]">Delivery Address</h2>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                {order.address.recipientName}<br />
                {order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}<br />
                {order.address.city}, {order.address.province}<br />
                {order.address.phone}
              </p>
            </>
          )}
        </section>
      </div>

      <section className="card p-6 max-w-lg ml-auto space-y-3">
        <h2 className="text-lg font-bold">Payment Summary</h2>
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>Rs. {Number(order.subtotal).toLocaleString()}</span></div>
        <div className="flex justify-between text-sm"><span>Shipping</span><span>Rs. {Number(order.shippingFee).toLocaleString()}</span></div>
        <div className="flex justify-between border-t border-[var(--border)] pt-3 font-bold">
          <span>Total</span><span>Rs. {Number(order.total).toLocaleString()}</span>
        </div>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Payment: {order.paymentStatus}</p>
        {order.notes && <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Notes: {order.notes}</p>}
      </section>
    </div>
  );
}
