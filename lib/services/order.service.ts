/**
 * Order Service — Creates orders using Prisma transactions.
 * Stock validation → Order creation → Stock decrement
 * are all atomic.
 */
import { prisma } from "@/lib/db/prisma";
import { nanoid } from "nanoid";
import type { CartWithItems } from "@/types";
import type { OrderStatus } from "@prisma/client";

function generateOrderNumber(): string {
  const prefix = "MK";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = nanoid(6).toUpperCase();
  return `${prefix}-${date}-${random}`;
}

export type CreateOrderInput = {
  cart: CartWithItems;
  shippingFee: number;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  userId?: string;
  addressId?: string;
  notes?: string;
};

export async function createPendingOrder(input: CreateOrderInput) {
  const { cart, shippingFee, guestName, guestEmail, guestPhone, userId, addressId, notes } = input;

  if (cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const orderNumber = generateOrderNumber();

  return prisma.$transaction(async (tx) => {
    // 1. Validate all variants have sufficient stock
    for (const item of cart.items) {
      const variant = await tx.productVariant.findUnique({
        where: { id: item.variantId },
      });

      if (!variant) {
        throw new Error(`Variant not found for ${item.product.name}`);
      }

      if (variant.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for ${item.product.name} (${variant.size} / ${variant.color}). Available: ${variant.stock}`
        );
      }
    }

    // 2. Calculate server-side totals (never trust client prices)
    const productIds = cart.items.map((i) => i.productId);
    const products = await tx.product.findMany({
      where: { id: { in: productIds }, isActive: true },
      select: { id: true, price: true },
    });

    const priceMap = new Map(products.map((p) => [p.id, Number(p.price)]));

    const subtotal = cart.items.reduce((sum, item) => {
      const price = priceMap.get(item.productId) ?? 0;
      return sum + price * item.quantity;
    }, 0);

    const total = subtotal + shippingFee;

    // 3. Create the order
    const order = await tx.order.create({
      data: {
        orderNumber,
        userId,
        guestName,
        guestEmail,
        guestPhone,
        addressId,
        notes,
        status: "PENDING",
        paymentStatus: "PENDING",
        subtotal,
        shippingFee,
        total,
        whatsappSent: true,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            productName: item.product.name,
            productSku: item.variant.sku,
            size: item.variant.size,
            color: item.variant.color,
            imageUrl: item.product.images[0]?.imageUrl,
            price: priceMap.get(item.productId) ?? Number(item.product.price),
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    // 4. Decrement stock for each variant
    for (const item of cart.items) {
      await tx.productVariant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return order;
  });
}

export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
      address: true,
      user: { select: { name: true, email: true } },
    },
  });
}

export async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { items: true, address: true },
  });
}

export const getCustomerOrders = getUserOrders;

const NEXT_ORDER_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  PENDING: "CONFIRMED",
  CONFIRMED: "PROCESSING",
  PROCESSING: "SHIPPED",
  SHIPPED: "DELIVERED",
};

export async function advanceOrderStatus(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { status: true },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  const nextStatus = NEXT_ORDER_STATUS[order.status];
  if (!nextStatus) {
    throw new Error(`Order status cannot advance from ${order.status}`);
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status: nextStatus },
  });
}

export async function getAdminOrders(page = 1, limit = 20, status?: string) {
  const where = status ? { status: status as import("@prisma/client").OrderStatus } : {};
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        items: { select: { productName: true, quantity: true } },
      },
    }),
    prisma.order.count({ where }),
  ]);
  return { orders, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function updateOrderStatus(
  orderId: string,
  status: import("@prisma/client").OrderStatus
) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}
