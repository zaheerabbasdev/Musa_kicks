import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { getSettings } from "@/lib/services/settings.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTruck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = {
  title: "Order Confirmation — Musa Kicks",
};

interface PageProps {
  searchParams: Promise<{ orderNumber?: string }>;
}

export default async function OrderConfirmationPage({ searchParams }: PageProps) {
  const { orderNumber } = await searchParams;

  if (!orderNumber) {
    notFound();
  }

  const [order, settings] = await Promise.all([
    prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
        address: true,
      },
    }),
    getSettings(),
  ]);

  if (!order) {
    notFound();
  }

  const currencySymbol = settings.currencySymbol ?? "Rs.";
  const whatsappNumber = settings.whatsappNumber ?? "+92300000000";

  const whatsappMessage = encodeURIComponent(
    `Hello Musa Kicks team! I placed order #${order.orderNumber} for total ${currencySymbol} ${Number(
      order.total
    ).toLocaleString()}. Please confirm my order dispatch.`
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center text-3xl mx-auto mb-4">
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
        <span className="badge badge-success uppercase tracking-wider text-xs mb-2">
          Order Placed
        </span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
          Thank You For Your Order!
        </h1>
        <p className="text-text-muted mt-2 text-sm sm:text-base">
          We've received your order and our team is preparing it for packaging.
        </p>
      </div>

      <div className="card p-6 sm:p-8 space-y-6">
        {/* Order Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-xs text-text-muted uppercase font-bold tracking-wider">
              Order Number
            </span>
            <p className="font-mono text-xl font-black text-accent mt-0.5">
              #{order.orderNumber}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-text-muted uppercase font-bold tracking-wider">
              Status
            </span>
            <p className="text-sm font-bold text-success capitalize">{order.status.toLowerCase()}</p>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Ordered Items ({order.items.length})
          </h2>
          <div className="divide-y divide-border/50">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-sm">
                <div>
                  <p className="font-bold">{item.productName}</p>
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
        </div>

        {/* Pricing breakdown */}
        <div className="pt-4 border-t border-border space-y-2 text-sm">
          <div className="flex justify-between text-text-muted">
            <span>Subtotal</span>
            <span>{currencySymbol} {Number(order.subtotal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>Shipping</span>
            <span>
              {Number(order.shippingFee) === 0
                ? "FREE"
                : `${currencySymbol} ${Number(order.shippingFee).toLocaleString()}`}
            </span>
          </div>
          <div className="flex justify-between font-black text-base pt-2 border-t border-border">
            <span>Total</span>
            <span className="text-accent">
              {currencySymbol} {Number(order.total).toLocaleString()}
            </span>
          </div>
        </div>

        {/* WhatsApp Notification action */}
        <div className="p-4 rounded-xl bg-surface-2 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center text-xl shrink-0">
              <FontAwesomeIcon icon={faWhatsapp} />
            </div>
            <div>
              <p className="font-bold text-sm">Track & Confirm on WhatsApp</p>
              <p className="text-xs text-text-muted">
                Receive live order updates directly on your WhatsApp
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm bg-[#25D366] text-white hover:bg-[#20bd5a] shrink-0"
          >
            Confirm on WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/shop" className="btn btn-secondary inline-flex items-center gap-2">
          <span>Continue Shopping</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
      </div>
    </div>
  );
}
