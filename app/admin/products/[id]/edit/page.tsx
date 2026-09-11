import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Edit Product — Admin",
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] },
        variants: { orderBy: [{ color: "asc" }, { size: "asc" }] },
      },
    }),
    prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  if (!product) notFound();

  const initialData = {
    id: product.id,
    name: product.name,
    sku: product.sku,
    categoryId: product.categoryId,
    price: Number(product.price),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    shortDescription: product.shortDescription,
    description: product.description,
    isFeatured: product.isFeatured,
    isNewArrival: product.isNewArrival,
    isBestSeller: product.isBestSeller,
    isActive: product.isActive,
    images: product.images.map((image) => ({
      id: image.id,
      url: image.imageUrl,
      publicId: image.publicId,
    })),
    variants: product.variants.map((variant) => ({
      color: variant.color,
      size: variant.size,
      stock: variant.stock,
      sku: variant.sku,
    })),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="btn btn-secondary btn-sm flex items-center gap-1.5">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          <span>Back to Products</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-xs text-text-muted mt-0.5">Update this footwear product</p>
        </div>
      </div>

      <ProductForm categories={categories} initialData={initialData} />
    </div>
  );
}
