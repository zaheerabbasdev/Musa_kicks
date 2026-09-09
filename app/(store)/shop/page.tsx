import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/lib/services/product.service";
import { getCategories } from "@/lib/services/category.service";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { SortDropdown } from "@/components/products/SortDropdown";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop All Shoes",
  description: "Browse our full collection of premium footwear including sneakers, casual, running, formal, boots, and slides.",
};

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest First" },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "popular",    label: "Most Popular" },
  { value: "featured",   label: "Featured" },
];

function buildQueryString(p: Record<string, unknown>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(p)) {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => query.append(key, String(v)));
      } else {
        query.set(key, String(value));
      }
    }
  }
  return query.toString();
}

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
    page?: string;
    minPrice?: string;
    maxPrice?: string;
    sizes?: string | string[];
    colors?: string | string[];
    inStock?: string;
  }>;
}

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1", 10);

  const sizes = typeof params.sizes === "string" ? [params.sizes] : params.sizes;
  const colors = typeof params.colors === "string" ? [params.colors] : params.colors;

  const [{ products, total, totalPages }, categories] = await Promise.all([
    getProducts({
      search: params.search,
      category: params.category,
      sort: params.sort as "newest" | "price_asc" | "price_desc" | "popular" | "featured" | undefined,
      page,
      minPrice: params.minPrice ? parseFloat(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : undefined,
      sizes,
      colors,
      inStock: params.inStock === "true",
    }).catch(() => ({ products: [], total: 0, totalPages: 0, page: 1, limit: 12 })),
    getCategories().catch(() => []),
  ]);

  const currentSort = params.sort ?? "newest";
  const currentCategory = params.category ?? "";
  const searchQuery = params.search ?? "";

  return (
    <div className="container-site py-10 md:py-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
          {currentCategory
            ? categories.find((c) => c.slug === currentCategory)?.name ?? "Shop"
            : searchQuery
            ? `Results for "${searchQuery}"`
            : "All Shoes"}
        </h1>
        <p style={{ color: "var(--muted-foreground)" }}>
          {total} {total === 1 ? "style" : "styles"} available
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sidebar Filters ──────────────────────────────────── */}
        <aside className="lg:w-64 shrink-0">
          <div className="card p-5 sticky top-[calc(var(--nav-height)+1rem)]">
            <div className="flex items-center gap-2 mb-5">
              <FontAwesomeIcon icon={faFilter} className="w-4 h-4" style={{ color: "var(--primary)" }} />
              <h2 className="font-semibold">Filters</h2>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--muted-foreground)" }}>
                Category
              </h3>
              <div className="flex flex-col gap-1">
                <Link
                  href="/shop"
                  className={`text-sm px-3 py-1.5 rounded-[var(--radius-md)] transition-colors ${!currentCategory ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "hover:bg-[var(--muted)]"}`}
                >
                  All
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}${params.sort ? `&sort=${params.sort}` : ""}`}
                    className={`text-sm px-3 py-1.5 rounded-[var(--radius-md)] transition-colors ${currentCategory === cat.slug ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "hover:bg-[var(--muted)]"}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--muted-foreground)" }}>
                Price Range
              </h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  defaultValue={params.minPrice}
                  name="minPrice"
                  className="input text-sm py-2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  defaultValue={params.maxPrice}
                  name="maxPrice"
                  className="input text-sm py-2"
                />
              </div>
            </div>

            {/* In stock toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={params.inStock === "true"}
                className="w-4 h-4 accent-[var(--primary)]"
              />
              <span className="text-sm">In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* ── Products ─────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Showing {products.length} of {total} products
            </p>
            <SortDropdown options={SORT_OPTIONS} currentSort={currentSort} />
          </div>

          {products.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">👟</p>
              <h3 className="text-xl font-display font-semibold mb-2">No products found</h3>
              <p style={{ color: "var(--muted-foreground)" }}>
                Try adjusting your search or filters
              </p>
              <Link href="/shop" className="btn btn-primary mt-6 inline-flex">
                Clear Filters
              </Link>
            </div>
          ) : (
            <ProductGrid products={products} columns={3} />
          )}
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
              {page > 1 && (
                <Link
                  href={`/shop?${buildQueryString({ ...params, page: page - 1 })}`}
                  className="btn btn-secondary btn-sm"
                >
                  Previous
                </Link>
              )}
              {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                const p = i + 1;
                return (
                  <Link
                    key={p}
                    href={`/shop?${buildQueryString({ ...params, page: p })}`}
                    className={`btn btn-sm ${p === page ? "btn-primary" : "btn-secondary"}`}
                  >
                    {p}
                  </Link>
                );
              })}
              {page < totalPages && (
                <Link
                  href={`/shop?${buildQueryString({ ...params, page: page + 1 })}`}
                  className="btn btn-secondary btn-sm"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
