import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    const product = await prisma.$transaction(async (transaction) => {
      await transaction.productImage.deleteMany({ where: { productId: id } });
      await transaction.productVariant.deleteMany({ where: { productId: id } });

      return transaction.product.update({
        where: { id },
        data: {
          name: data.name,
          sku: data.sku,
          categoryId: data.categoryId,
          price: data.price,
          compareAtPrice: data.compareAtPrice,
          shortDescription: data.shortDescription,
          description: data.description,
          isFeatured: data.isFeatured ?? false,
          isNewArrival: data.isNewArrival ?? false,
          isBestSeller: data.isBestSeller ?? false,
          isActive: data.isActive ?? true,
          images: {
            create: (data.images ?? []).map((image: { url?: string; imageUrl?: string; publicId?: string }, index: number) => ({
              imageUrl: image.url ?? image.imageUrl ?? "",
              publicId: image.publicId ?? `prod-${id}-${index}`,
              isPrimary: index === 0,
              sortOrder: index,
            })),
          },
          variants: {
            create: (data.variants ?? []).map((variant: { color: string; size: string; stock: number; sku: string }) => ({
              color: variant.color,
              size: variant.size,
              stock: variant.stock,
              sku: variant.sku,
            })),
          },
        },
        include: { images: true, variants: true },
      });
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}
