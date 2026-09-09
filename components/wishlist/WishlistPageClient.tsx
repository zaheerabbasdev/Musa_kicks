"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useWishlistStore } from "@/store/wishlist.store";
import { ProductCard } from "@/components/products/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function WishlistPageClient({ currencySymbol }: { currencySymbol: string }) {
  const [mounted, setMounted] = useState(false);
  const { items, clearWishlist } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="h-10 bg-surface-2 rounded w-48 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-surface-2 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-border">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            My Wishlist
          </h1>
          <p className="text-text-muted mt-1 text-sm">
            {items.length} {items.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="btn btn-secondary btn-sm flex items-center gap-2 text-danger hover:bg-danger/10"
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={faHeart}
          title="Your wishlist is empty"
          description="Explore our latest drops and save items you want to pick up later."
          action={
            <Link href="/shop" className="btn btn-primary">
              Explore Kicks
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              slug={p.slug}
              name={p.name}
              price={Number(p.price)}
              compareAtPrice={p.compareAtPrice ? Number(p.compareAtPrice) : null}
              image={p.images?.[0] ? {
                publicId: p.images[0].publicId,
                imageUrl: p.images[0].imageUrl,
                altText: p.images[0].altText,
              } : null}
              category={p.category ? { name: p.category.name, slug: p.category.slug } : null}
              isNew={p.isNewArrival}
              isBestSeller={p.isBestSeller}
              isFeatured={p.isFeatured}
              currencySymbol={currencySymbol}
            />
          ))}
        </div>
      )}
    </div>
  );
}
