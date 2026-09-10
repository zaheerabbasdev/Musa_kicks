"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: CategoryOption[];
  initialData?: any;
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    sku: initialData?.sku ?? "",
    categoryId: initialData?.categoryId ?? categories[0]?.id ?? "",
    price: initialData?.price ? String(initialData.price) : "",
    compareAtPrice: initialData?.compareAtPrice ? String(initialData.compareAtPrice) : "",
    costPrice: initialData?.costPrice ? String(initialData.costPrice) : "",
    shortDescription: initialData?.shortDescription ?? "",
    description: initialData?.description ?? "",
    isFeatured: initialData?.isFeatured ?? false,
    isNewArrival: initialData?.isNewArrival ?? true,
    isBestSeller: initialData?.isBestSeller ?? false,
    isActive: initialData?.isActive ?? true,
  });

  const [uploadingImages, setUploadingImages] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>(
    initialData?.images?.map((img: any) => img.url) ?? []
  );

  const [variants, setVariants] = useState<
    Array<{ color: string; size: string; stock: number; sku: string }>
  >(
    initialData?.variants?.map((v: any) => ({
      color: v.color,
      size: v.size,
      stock: v.stock,
      sku: v.sku,
    })) ?? [
      { color: "Black", size: "42", stock: 10, sku: "" },
      { color: "Black", size: "43", stock: 10, sku: "" },
    ]
  );

  const addVariant = () => {
    setVariants([...variants, { color: "White", size: "42", stock: 10, sku: "" }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const addImages = async (files: FileList | null) => {
    if (!files?.length) return;

    setUploadingImages(true);
    setError(null);

    try {
      const uploadedImages: string[] = [];

      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          throw new Error("Only image files can be uploaded.");
        }

        const signatureResponse = await fetch("/api/cloudinary/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        if (!signatureResponse.ok) {
          throw new Error("Could not prepare the image upload.");
        }

        const signature = await signatureResponse.json();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", signature.apiKey);
        formData.append("timestamp", String(signature.timestamp));
        formData.append("signature", signature.signature);
        formData.append("folder", signature.folder);

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
          { method: "POST", body: formData }
        );

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload ${file.name}.`);
        }

        const uploaded = await uploadResponse.json();
        uploadedImages.push(uploaded.secure_url);
      }

      setImages((currentImages) => [...currentImages, ...uploadedImages]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload images.");
    } finally {
      setUploadingImages(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
        costPrice: formData.costPrice ? parseFloat(formData.costPrice) : null,
        images: images.map((url, i) => ({
          url,
          isPrimary: i === 0,
          sortOrder: i,
        })),
        variants: variants.map((v) => ({
          ...v,
          stock: Number(v.stock),
          sku: v.sku || `${formData.sku}-${v.color.substring(0, 2).toUpperCase()}-${v.size}`,
        })),
      };

      const res = await fetch(
        initialData ? `/api/admin/products/${initialData.id}` : "/api/admin/products",
        {
          method: initialData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {error && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm">
          {error}
        </div>
      )}

      {/* Main Info */}
      <div className="card p-6 space-y-4">
        <h2 className="text-lg font-bold">Product Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input w-full"
              placeholder="e.g. Air Max Pulse"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              SKU (Stock Keeping Unit) *
            </label>
            <input
              type="text"
              required
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
              className="input w-full uppercase"
              placeholder="e.g. MK-AMP-001"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              Category *
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="input w-full"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              Price (PKR) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="any"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="input w-full"
              placeholder="12500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">
              Compare at Price (PKR)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={formData.compareAtPrice}
              onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
              className="input w-full"
              placeholder="15000"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">
            Short Description
          </label>
          <input
            type="text"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className="input w-full"
            placeholder="Modern street sneaker with point-loaded Air cushioning"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2">
            Full Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input w-full py-2.5 resize-none"
            placeholder="Detailed shoe features, material, cushion technology, and styling notes..."
          />
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded"
            />
            <span>Active & Available</span>
          </label>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded"
            />
            <span>Featured on Home</span>
          </label>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isNewArrival}
              onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
              className="rounded"
            />
            <span>New Arrival Drop</span>
          </label>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isBestSeller}
              onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
              className="rounded"
            />
            <span>Best Seller</span>
          </label>
        </div>
      </div>

      {/* Images Section */}
      <div className="card p-6 space-y-4">
        <h2 className="text-lg font-bold">Product Images</h2>

        <div className="flex gap-2">
          <input
            ref={imageInputRef}
            id="product-image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addImages(e.target.files)}
            className="sr-only"
          />
          <label
            htmlFor="product-image-upload"
            className={`btn btn-secondary flex-1 cursor-pointer ${uploadingImages ? "pointer-events-none opacity-60" : ""}`}
          >
            {uploadingImages ? "Uploading..." : "Add Images"}
          </label>
        </div>
        <p className="text-xs text-text-muted">
          Select one or more local JPG, PNG, WebP, or AVIF images. The first image is used as the primary image.
        </p>

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative group rounded-xl overflow-hidden aspect-square border border-border bg-surface-2"
              >
                <img
                  src={url}
                  alt={`Product preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <span className="absolute top-2 left-2 badge badge-accent text-[10px]">
                    Primary
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-danger/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Variants (Size / Color / Stock) */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Sizes, Colors & Stock</h2>
            <p className="text-xs text-text-muted mt-0.5">
              Specify shoe sizes, colorways, and current warehouse inventory
            </p>
          </div>
          <button
            type="button"
            onClick={addVariant}
            className="btn btn-secondary btn-sm flex items-center gap-1.5"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xs" />
            <span>Add Variant</span>
          </button>
        </div>

        <div className="space-y-3">
          {variants.map((v, i) => (
            <div key={i} className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-surface-2">
              <div className="flex-1 min-w-[120px]">
                <input
                  type="text"
                  placeholder="Color (e.g. Black)"
                  value={v.color}
                  onChange={(e) => {
                    const next = [...variants];
                    next[i].color = e.target.value;
                    setVariants(next);
                  }}
                  className="input w-full text-xs"
                />
              </div>

              <div className="w-24">
                <input
                  type="text"
                  placeholder="Size (42)"
                  value={v.size}
                  onChange={(e) => {
                    const next = [...variants];
                    next[i].size = e.target.value;
                    setVariants(next);
                  }}
                  className="input w-full text-xs"
                />
              </div>

              <div className="w-24">
                <input
                  type="number"
                  min="0"
                  placeholder="Stock"
                  value={v.stock}
                  onChange={(e) => {
                    const next = [...variants];
                    next[i].stock = parseInt(e.target.value) || 0;
                    setVariants(next);
                  }}
                  className="input w-full text-xs"
                />
              </div>

              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(i)}
                  className="p-2 text-text-muted hover:text-danger transition-colors"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-sm" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-4">
        <Link href="/admin/products" className="btn btn-secondary">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
          <span>{loading ? "Saving..." : initialData ? "Update Product" : "Create Product"}</span>
        </button>
      </div>
    </form>
  );
}
