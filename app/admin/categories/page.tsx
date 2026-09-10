import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencil } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Categories — Admin",
};

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Footwear Categories</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Organize catalog into sneakers, running, casual, formal, boots, and slides
          </p>
        </div>
        <Link href="/admin/categories/new" className="btn btn-primary gap-2">
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          Add Category
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-left">Category Name</th>
                <th className="text-left">Slug</th>
                <th className="text-left">Description</th>
                <th className="text-right">Products</th>
                <th className="text-center">Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="text-left font-bold text-neutral-900">{cat.name}</td>
                  <td className="text-left font-mono text-xs text-neutral-500">{cat.slug}</td>
                  <td className="text-left text-xs text-neutral-500 max-w-xs truncate">
                    {cat.description || "—"}
                  </td>
                  <td className="text-right">
                    <span className="badge badge-secondary text-xs">
                      {cat._count.products} kicks
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge text-xs ${
                        cat.isActive ? "badge-success" : "badge-secondary"
                      }`}
                    >
                      {cat.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-right">
                    <Link
                      href={`/admin/categories/${cat.id}/edit`}
                      className="btn btn-secondary btn-sm inline-flex items-center gap-1.5"
                    >
                      <FontAwesomeIcon icon={faPencil} className="text-xs" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
