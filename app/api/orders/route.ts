import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json();
    const { items, customerName, email, phone, address, notes } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "No items in order" }, { status: 400 });
    }

    // 1. Fetch site settings for shipping
    const settings = await prisma.siteSettings.findMany();
    const feeStr = settings.find((s) => s.key === "shipping_fee")?.value ?? "250";
    const thresholdStr =
      settings.find((s) => s.key === "free_shipping_threshold")?.value ?? "10000";

    const defaultShippingFee = parseFloat(feeStr) || 250;
    const freeShippingThreshold = parseFloat(thresholdStr) || 10000;

    // 2. Fetch products to calculate genuine subtotal
    const variantIds = items.map((i: any) => i.variantId);
    const variants = await prisma.productVariant.findMany({
      where: { id: { in: variantIds } },
      include: {
        product: {
          include: {
            images: { take: 1, orderBy: { sortOrder: "asc" } },
          },
        },
      },
    });

    const variantMap = new Map(variants.map((v) => [v.id, v]));

    let subtotal = 0;
    const orderItemsData: any[] = [];

    for (const item of items) {
      const variant = variantMap.get(item.variantId);
      if (!variant) {
        return NextResponse.json(
          { message: `Product variant ${item.variantId} not found` },
          { status: 404 }
        );
      }

      if (variant.stock < item.quantity) {
        return NextResponse.json(
          {
            message: `Insufficient stock for ${variant.product.name} (Size: ${variant.size}). Only ${variant.stock} available.`,
          },
          { status: 400 }
        );
      }

      const itemPrice = Number(variant.product.price);
      subtotal += itemPrice * item.quantity;

      orderItemsData.push({
        productId: variant.productId,
        variantId: variant.id,
        productName: variant.product.name,
        productSku: variant.sku,
        size: variant.size,
        color: variant.color,
        imageUrl: variant.product.images[0]?.imageUrl ?? null,
        price: itemPrice,
        quantity: item.quantity,
      });
    }

    const shippingFee = subtotal >= freeShippingThreshold ? 0 : defaultShippingFee;
    const total = subtotal + shippingFee;

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const orderNumber = `MK-${dateStr}-${nanoid(6).toUpperCase()}`;

    // 3. Database transaction: create address (if applicable), create order, decrement stock
    const result = await prisma.$transaction(async (tx) => {
      let addressId: string | undefined = undefined;

      if (address && session?.user?.id) {
        const createdAddress = await tx.address.create({
          data: {
            userId: session.user.id,
            recipientName: customerName || session.user.name || "Customer",
            phone: phone || "",
            line1: address.line1 || address,
            city: address.city || "Islamabad",
            province: address.province || "Federal",
          },
        });
        addressId = createdAddress.id;
      }

      const order = await tx.order.create({
        data: {
          orderNumber,
          userId: session?.user?.id ?? null,
          guestName: customerName ?? null,
          guestEmail: email ?? null,
          guestPhone: phone ?? null,
          addressId,
          subtotal,
          shippingFee,
          total,
          status: "PENDING",
          paymentStatus: "PENDING",
          notes: notes ?? null,
          items: {
            create: orderItemsData,
          },
        },
      });

      for (const item of items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return order;
    });

    return NextResponse.json({ success: true, orderNumber: result.orderNumber }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
