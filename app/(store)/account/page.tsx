import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/session";
import { getCustomerOrders } from "@/lib/services/order.service";
import { getSettings } from "@/lib/services/settings.service";
import { OrderStatusBadge } from "@/components/ui/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Account Overview",
};

export default async function AccountPage() {
  const user = await requireAuth("/account");

  const [orders, settings] = await Promise.all([
    getCustomerOrders(user.id),
    getSettings(),
  ]);

  const currencySymbol = settings.currencySymbol ?? "Rs.";
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Recent Orders */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link
            href="/account/orders"
            className="text-sm font-semibold text-accent hover:underline flex items-center gap-1.5"
          >
            <span>View all</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-10">
            <FontAwesomeIcon icon={faShoppingBag} className="text-3xl text-text-muted mb-3" />
            <p className="text-text-muted text-sm">You haven't placed any orders yet.</p>
            <Link href="/shop" className="btn btn-primary btn-sm mt-4 inline-flex">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-sm">Order #{order.orderNumber}</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    • {order.items.length} {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      {currencySymbol} {Number(order.total).toLocaleString()}
                    </p>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
