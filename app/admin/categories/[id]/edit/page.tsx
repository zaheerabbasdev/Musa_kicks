import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { CategoryForm } from "@/components/admin/CategoryForm";

export const metadata: Metadata = {
  title: "Edit Category — Admin",
};

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      sortOrder: true,
      isActive: true,
    },
  });

  if (!category) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories" className="btn btn-secondary btn-sm flex items-center gap-1.5">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          <span>Back to Categories</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Category</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Update this category&apos;s catalog settings
          </p>
        </div>
      </div>

      <CategoryForm initialData={category} />
    </div>
  );
}
