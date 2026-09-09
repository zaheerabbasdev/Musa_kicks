import { prisma } from "@/lib/db/prisma";

export async function getOrCreateCart(userId?: string, sessionId?: string) {
  if (userId) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: { include: { images: { where: { isPrimary: true }, take: 1 } } },
            variant: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: { include: { images: { where: { isPrimary: true }, take: 1 } } },
              variant: true,
            },
          },
        },
      });
    }
    return cart;
  }

  if (sessionId) {
    let cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: { include: { images: { where: { isPrimary: true }, take: 1 } } },
            variant: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { sessionId },
        include: {
          items: {
            include: {
              product: { include: { images: { where: { isPrimary: true }, take: 1 } } },
              variant: true,
            },
          },
        },
      });
    }
    return cart;
  }

  throw new Error("Either userId or sessionId is required");
}

export async function addToCart(
  cartId: string,
  productId: string,
  variantId: string,
  quantity: number
) {
  // Validate variant exists and has stock
  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
  });

  if (!variant) throw new Error("Product variant not found");
  if (variant.stock < quantity) throw new Error("Insufficient stock");

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_variantId: { cartId, variantId } },
  });

  if (existing) {
    const newQty = existing.quantity + quantity;
    if (variant.stock < newQty) throw new Error("Insufficient stock");
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: newQty },
      include: { product: true, variant: true },
    });
  }

  return prisma.cartItem.create({
    data: { cartId, productId, variantId, quantity },
    include: { product: true, variant: true },
  });
}

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
) {
  if (quantity <= 0) {
    return prisma.cartItem.delete({ where: { id: cartItemId } });
  }
  return prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });
}

export async function removeFromCart(cartItemId: string) {
  return prisma.cartItem.delete({ where: { id: cartItemId } });
}

export async function clearCart(cartId: string) {
  return prisma.cartItem.deleteMany({ where: { cartId } });
}

export function calculateCartTotals(
  items: { variant: { stock: number }; quantity: number; product: { price: unknown } }[],
  shippingFee: number
) {
  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.product.price);
    return sum + price * item.quantity;
  }, 0);

  const total = subtotal + shippingFee;
  return { subtotal, shippingFee, total };
}
