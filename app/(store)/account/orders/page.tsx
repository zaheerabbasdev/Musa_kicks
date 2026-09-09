import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/session";
import { getCustomerOrders } from "@/lib/services/order.service";
import { getSettings } from "@/lib/services/settings.service";
import { OrderStatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "My Orders — Musa Kicks",
};

export default async function CustomerOrdersPage() {
  const user = await requireAuth("/account/orders");

  const [orders, settings] = await Promise.all([
    getCustomerOrders(user.id),
    getSettings(),
  ]);

  const currencySymbol = settings.currencySymbol ?? "Rs.";

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={faShoppingBag}
        title="No orders yet"
        description="You have not placed any orders with Musa Kicks yet. Start browsing our catalog!"
        action={
          <Link href="/shop" className="btn btn-primary">
            Shop Kicks
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Order Number
                </span>
                <p className="font-mono font-bold text-base mt-0.5">#{order.orderNumber}</p>
                <p className="text-xs text-text-muted mt-1">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <OrderStatusBadge status={order.status} />
                <div className="text-right">
                  <span className="text-xs text-text-muted block">Total Amount</span>
                  <span className="font-black text-lg">
                    {currencySymbol} {Number(order.total).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items list */}
            <div className="divide-y divide-border/50 py-2">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-sm">
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-xs text-text-muted">
                      {item.color ? `Color: ${item.color} • ` : ""}
                      {item.size ? `Size: EU ${item.size} • ` : ""}
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold">
                    {currencySymbol} {(Number(item.price) * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {order.address && (
              <div className="mt-4 pt-4 border-t border-border/50 text-xs text-text-muted">
                <span className="font-semibold text-text-primary">Shipping to: </span>
                {order.address.recipientName}, {order.address.line1},{" "}
                {order.address.city}, {order.address.phone}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
