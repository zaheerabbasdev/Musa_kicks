import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { CategoryForm } from "@/components/admin/CategoryForm";

export const metadata: Metadata = {
  title: "Add Category — Admin",
};

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories" className="btn btn-secondary btn-sm flex items-center gap-1.5">
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          <span>Back to Categories</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add Category</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Create a category for the product catalog
          </p>
        </div>
      </div>

      <CategoryForm />
    </div>
  );
}
