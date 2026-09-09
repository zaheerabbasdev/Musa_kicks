import { prisma } from "@/lib/db/prisma";

export async function getCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: { where: { isActive: true } } } },
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug, isActive: true },
  });
}

export async function getAllCategorySlugs() {
  const cats = await prisma.category.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return cats.map((c) => c.slug);
}

export async function getAdminCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });
}
