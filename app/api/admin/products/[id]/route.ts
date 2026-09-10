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
    const price = Number(data.price);
    const variants = Array.isArray(data.variants) ? data.variants : [];
    const images = Array.isArray(data.images) ? data.images : [];

    if (!data.name || !data.sku || !data.categoryId || !data.description || !Number.isFinite(price)) {
      return NextResponse.json({ message: "Name, SKU, category, description, and a valid price are required." }, { status: 400 });
    }

    if (images.length === 0 || images.some((image: { url?: string; imageUrl?: string }) => !(image.url || image.imageUrl))) {
      return NextResponse.json({ message: "At least one valid product image is required." }, { status: 400 });
    }

    const variantSkus = variants.map((variant: { sku?: string }) => variant.sku).filter(Boolean);
    if (new Set(variantSkus).size !== variantSkus.length) {
      return NextResponse.json({ message: "Each product variant must have a unique SKU." }, { status: 400 });
    }

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
            create: images.map((image: { url?: string; imageUrl?: string; publicId?: string }, index: number) => ({
              imageUrl: image.url ?? image.imageUrl ?? "",
              publicId: image.publicId ?? `prod-${id}-${index}`,
              isPrimary: index === 0,
              sortOrder: index,
            })),
          },
          variants: {
            create: variants.map((variant: { color: string; size: string; stock: number; sku: string }) => ({
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
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to update product" },
      { status: 500 }
    );
  }
}
