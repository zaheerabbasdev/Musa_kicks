/**
 * Product Service — Server-Side DB Queries
 */
import { prisma } from "@/lib/db/prisma";
import type { ProductFilters } from "@/types";
import { Prisma } from "@prisma/client";

export async function getProducts(filters: ProductFilters = {}) {
  const {
    category,
    search,
    minPrice,
    maxPrice,
    sizes,
    colors,
    inStock,
    sort = "newest",
    page = 1,
    limit = 12,
  } = filters;

  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(category && {
      category: { slug: category },
    }),
    ...(search && {
      OR: [
        { name: { contains: search } },
        { description: { contains: search } },
        { sku: { contains: search } },
      ],
    }),
    ...(minPrice !== undefined && {
      price: { gte: minPrice },
    }),
    ...(maxPrice !== undefined && {
      price: { lte: maxPrice },
    }),
    ...(sizes && sizes.length > 0 && {
      variants: { some: { size: { in: sizes } } },
    }),
    ...(colors && colors.length > 0 && {
      variants: { some: { color: { in: colors } } },
    }),
    ...(inStock && {
      variants: { some: { stock: { gt: 0 } } },
    }),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "price_asc"   ? { price: "asc" } :
    sort === "price_desc"  ? { price: "desc" } :
    sort === "popular"     ? { isBestSeller: "desc" } :
    sort === "featured"    ? { isFeatured: "desc" } :
    sort === "oldest"      ? { createdAt: "asc" } :
                             { createdAt: "desc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        category: { select: { name: true, slug: true } },
        variants: {
          select: { size: true, color: true, colorHex: true, stock: true },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug, isActive: true },
    include: {
      images: { orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] },
      category: true,
      variants: { orderBy: [{ color: "asc" }, { size: "asc" }] },
    },
  });
}

export async function getFeaturedProducts(limit = 8) {
  return prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      category: { select: { name: true, slug: true } },
      variants: { select: { size: true, color: true, colorHex: true, stock: true } },
    },
  });
}

export async function getNewArrivals(limit = 8) {
  return prisma.product.findMany({
    where: { isActive: true, isNewArrival: true },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      category: { select: { name: true, slug: true } },
      variants: { select: { size: true, color: true, colorHex: true, stock: true } },
    },
  });
}

export async function getBestSellers(limit = 8) {
  return prisma.product.findMany({
    where: { isActive: true, isBestSeller: true },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      category: { select: { name: true, slug: true } },
      variants: { select: { size: true, color: true, colorHex: true, stock: true } },
    },
  });
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      categoryId,
      id: { not: productId },
    },
    take: limit,
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      category: { select: { name: true, slug: true } },
      variants: { select: { size: true, color: true, stock: true } },
    },
  });
}

export async function getAllProductSlugs() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return products.map((p) => p.slug);
}

// ── Admin queries ──────────────────────────────────────────

export async function getAdminProducts(page = 1, limit = 20, search?: string) {
  const where: Prisma.ProductWhereInput = search
    ? { OR: [{ name: { contains: search } }, { sku: { contains: search } }] }
    : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        category: { select: { name: true } },
        variants: { select: { stock: true } },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] },
      category: true,
      variants: { orderBy: [{ color: "asc" }, { size: "asc" }] },
    },
  });
}
