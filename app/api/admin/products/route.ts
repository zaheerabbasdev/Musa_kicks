import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import slugify from "slugify";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

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
          create: (data.images || []).map((img: any, idx: number) => ({
            imageUrl: img.url || img.imageUrl,
            publicId: img.publicId || `prod-${idx}-${Date.now()}`,
            isPrimary: img.isPrimary ?? idx === 0,
            sortOrder: idx,
          })),
        },
        variants: {
          create: (data.variants || []).map((v: any) => ({
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
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
