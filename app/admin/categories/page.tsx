import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Footwear Categories</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Organize catalog into sneakers, running, casual, formal, boots, and slides
          </p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table w-full">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Products</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-surface-2/50 transition-colors">
                  <td className="font-bold">{cat.name}</td>
                  <td className="font-mono text-xs text-text-muted">{cat.slug}</td>
                  <td className="text-xs text-text-muted max-w-xs truncate">
                    {cat.description || "—"}
                  </td>
                  <td>
                    <span className="badge badge-secondary text-xs">
                      {cat._count.products} kicks
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge text-xs ${
                        cat.isActive ? "badge-success" : "badge-secondary"
                      }`}
                    >
                      {cat.isActive ? "Active" : "Inactive"}
                    </span>
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
