import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: unknown;
  compareAtPrice?: unknown;
  images: { publicId: string; imageUrl: string; altText?: string | null }[];
  category?: { name: string; slug: string } | null;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  variants: { size: string; color: string; colorHex?: string | null; stock: number }[];
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
  currencySymbol?: string;
  columns?: 2 | 3 | 4;
}

const colClass = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

export function ProductGrid({
  products,
  isLoading = false,
  skeletonCount = 8,
  currencySymbol = "Rs.",
  columns = 4,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className={`grid ${colClass[columns]} gap-4 md:gap-6`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${colClass[columns]} gap-4 md:gap-6`}>
      {products.map((product) => {
        const image = product.images[0];
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            name={product.name}
            price={Number(product.price)}
            compareAtPrice={product.compareAtPrice ? Number(product.compareAtPrice) : null}
            image={image ?? null}
            category={product.category}
            isNew={product.isNewArrival}
            isBestSeller={product.isBestSeller}
            isFeatured={product.isFeatured}
            variants={product.variants}
            currencySymbol={currencySymbol}
          />
        );
      })}
    </div>
  );
}
