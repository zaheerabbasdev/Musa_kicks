import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import slugify from "slugify";

interface ProductImageInput {
  url?: string;
  imageUrl?: string;
  publicId?: string;
  isPrimary?: boolean;
}

interface ProductVariantInput {
  color: string;
  size: string;
  stock: number;
  sku: string;
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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

    const baseSlug = slugify(data.name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        sku: data.sku,
        categoryId: data.categoryId,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        shortDescription: data.shortDescription,
        description: data.description,
        isFeatured: data.isFeatured ?? false,
        isNewArrival: data.isNewArrival ?? true,
        isBestSeller: data.isBestSeller ?? false,
        isActive: data.isActive ?? true,
        images: {
          create: images.map((img: ProductImageInput, idx: number) => ({
            imageUrl: img.url || img.imageUrl,
            publicId: img.publicId || `prod-${idx}-${Date.now()}`,
            isPrimary: img.isPrimary ?? idx === 0,
            sortOrder: idx,
          })),
        },
        variants: {
          create: variants.map((v: ProductVariantInput) => ({
            color: v.color,
            size: v.size,
            stock: v.stock,
            sku: v.sku,
          })),
        },
      },
      include: {
        images: true,
        variants: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to create product" },
      { status: 500 }
    );
  }
}
