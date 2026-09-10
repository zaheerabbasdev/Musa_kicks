import type { Metadata } from "next";
import Link from "next/link";
import { getAdminProducts } from "@/lib/services/product.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencil, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Products — Admin" };

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1", 10);
  const { products, total, totalPages } = await getAdminProducts(
    page, 20, params.search
  ).catch(() => ({ products: [], total: 0, totalPages: 0 }));

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Products</h1>
          <p style={{ color: "var(--muted-foreground)" }}>{total} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary gap-2">
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <form className="mb-6">
        <input
          name="search"
          type="search"
          defaultValue={params.search}
          placeholder="Search by name or SKU..."
          className="input max-w-sm"
        />
      </form>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-left">Product</th>
                <th className="text-left">SKU</th>
                <th className="text-left">Category</th>
                <th className="text-right">Price</th>
                <th className="text-right">Stock</th>
                <th className="text-center">Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16" style={{ color: "var(--muted-foreground)" }}>
                    <FontAwesomeIcon icon={faBoxOpen} className="w-8 h-8 mb-2 block mx-auto" />
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
                  const primaryImage = product.images[0];
                  return (
                    <tr key={product.id}>
                      <td className="text-left">
                        <div className="flex items-center gap-3">
                          {primaryImage ? (
                            <img
                              src={primaryImage.imageUrl}
                              alt={product.name}
                              className="w-10 h-10 rounded-[var(--radius-md)] object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--muted)] flex items-center justify-center">
                              <span className="text-lg">👟</span>
                            </div>
                          )}
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="text-left font-mono text-sm">{product.sku}</td>
                      <td className="text-left">{product.category.name}</td>
                      <td className="text-right font-medium">Rs. {Number(product.price).toLocaleString()}</td>
                      <td className="text-right font-semibold">
                        <span style={{ color: totalStock === 0 ? "var(--error)" : totalStock <= 5 ? "var(--warning)" : "inherit" }}>
                          {totalStock}
                        </span>
                      </td>
                      <td className="text-center">
                        <Badge variant={product.isActive ? "success" : "muted"}>
                          {product.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="btn btn-secondary btn-sm gap-1.5"
                          >
                            <FontAwesomeIcon icon={faPencil} className="w-3 h-3" />
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-[var(--border)]">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link href={`/admin/products?page=${page - 1}`} className="btn btn-secondary btn-sm">Previous</Link>
              )}
              {page < totalPages && (
                <Link href={`/admin/products?page=${page + 1}`} className="btn btn-secondary btn-sm">Next</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
