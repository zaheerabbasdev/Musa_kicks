import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "New Product — Admin",
};

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="btn btn-secondary btn-sm flex items-center gap-1.5"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          <span>Back to Products</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add New Shoe</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Add a new sneaker or footwear item to Musa Kicks catalog
          </p>
        </div>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
