"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CategoryFormProps {
  initialData?: {
    id: string;
    name: string;
    description: string | null;
    sortOrder: number;
    isActive: boolean;
  };
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [sortOrder, setSortOrder] = useState(String(initialData?.sortOrder ?? 0));
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        initialData ? `/api/admin/categories/${initialData.id}` : "/api/admin/categories",
        {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, sortOrder, isActive }),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save category");
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save category");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-6 max-w-2xl">
      {error && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="category-name" className="block text-sm font-semibold mb-2">
          Category name
        </label>
        <input
          id="category-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="input w-full"
              placeholder="e.g. Home Essentials"
          minLength={2}
          maxLength={100}
          required
        />
      </div>

      <div>
        <label htmlFor="category-description" className="block text-sm font-semibold mb-2">
          Description
        </label>
        <textarea
          id="category-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="input w-full min-h-28 resize-y"
              placeholder="Describe the products in this category"
        />
      </div>

      <div>
        <label htmlFor="category-sort-order" className="block text-sm font-semibold mb-2">
          Display order
        </label>
        <input
          id="category-sort-order"
          type="number"
          min="0"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          className="input w-full"
        />
      </div>

      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(event) => setIsActive(event.target.checked)}
          className="rounded"
        />
        <span>Active and visible in the catalog</span>
      </label>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Saving..." : initialData ? "Save Changes" : "Create Category"}
        </button>
        <Link href="/admin/categories" className="btn btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
}
