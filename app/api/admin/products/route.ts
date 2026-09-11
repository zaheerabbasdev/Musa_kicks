import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
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
    const compareAtPrice =
      data.compareAtPrice === null || data.compareAtPrice === undefined || data.compareAtPrice === ""
        ? null
        : Number(data.compareAtPrice);
    const variants = Array.isArray(data.variants) ? data.variants : [];
    const images = Array.isArray(data.images) ? data.images : [];
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const sku = typeof data.sku === "string" ? data.sku.trim().toUpperCase() : "";
    const categoryId = typeof data.categoryId === "string" ? data.categoryId.trim() : "";
    const description = typeof data.description === "string" ? data.description.trim() : "";

    if (!name || !sku || !categoryId || !description || !Number.isFinite(price) || price < 0) {
      return NextResponse.json({ message: "Name, SKU, category, description, and a valid price are required." }, { status: 400 });
    }

    if (compareAtPrice !== null && (!Number.isFinite(compareAtPrice) || compareAtPrice < 0)) {
      return NextResponse.json({ message: "Compare at price must be a valid positive number." }, { status: 400 });
    }

    if (images.length === 0 || images.some((image: { url?: string; imageUrl?: string }) => !(image.url || image.imageUrl))) {
      return NextResponse.json({ message: "At least one valid product image is required." }, { status: 400 });
    }

    if (
      variants.some(
        (variant: Partial<ProductVariantInput>) =>
          !variant.color?.trim() ||
          !variant.size?.trim() ||
          !Number.isInteger(Number(variant.stock)) ||
          Number(variant.stock) < 0 ||
          !variant.sku?.trim()
      )
    ) {
      return NextResponse.json(
        { message: "Each variant needs a color, size, stock amount, and unique SKU." },
        { status: 400 }
      );
    }

    const variantSkus = variants.map((variant: { sku?: string }) => variant.sku?.trim().toUpperCase()).filter(Boolean);
    if (new Set(variantSkus).size !== variantSkus.length) {
      return NextResponse.json({ message: "Each product variant must have a unique SKU." }, { status: 400 });
    }

    const [existingProduct, existingVariant] = await Promise.all([
      prisma.product.findUnique({ where: { sku }, select: { id: true } }),
      variantSkus.length
        ? prisma.productVariant.findFirst({
            where: { sku: { in: variantSkus } },
            select: { sku: true },
          })
        : null,
    ]);
    if (existingProduct) {
      return NextResponse.json(
        { message: `Product SKU "${sku}" is already in use. Please enter a unique SKU.` },
        { status: 409 }
      );
    }
    if (existingVariant) {
      return NextResponse.json(
        { message: `Variant SKU "${existingVariant.sku}" is already in use. Please enter a unique SKU.` },
        { status: 409 }
      );
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId }, select: { id: true } });
    if (!category) {
      return NextResponse.json({ message: "Please select an existing product category." }, { status: 400 });
    }

    const baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        sku,
        categoryId,
        price,
        compareAtPrice,
        shortDescription:
          typeof data.shortDescription === "string" ? data.shortDescription.trim() || null : null,
        description,
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
            sku: v.sku.trim().toUpperCase(),
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
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const target = Array.isArray(error.meta?.target) ? error.meta.target.join(", ") : String(error.meta?.target ?? "");
      const message = target.includes("products_sku") || target === "sku"
        ? "That product SKU is already in use. Please enter a unique SKU."
        : target.includes("ProductVariant") || target.includes("product_variants")
          ? "That variant SKU is already in use. Please enter a unique SKU."
          : "A SKU is already in use. Please enter unique product and variant SKUs.";
      return NextResponse.json(
        { message },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to create product" },
      { status: 500 }
    );
  }
}
