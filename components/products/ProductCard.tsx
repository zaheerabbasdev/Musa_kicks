"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { CloudinaryImage } from "@/components/cloudinary/CloudinaryImage";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { toast } from "react-toastify";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  image?: { publicId: string; imageUrl: string; altText?: string | null } | null;
  category?: { name: string; slug: string } | null;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  variants?: {
    size: string;
    color: string;
    colorHex?: string | null;
    stock: number;
  }[];
  currencySymbol?: string;
}

const namedColors: Record<string, string> = {
  black: "#000000",
  white: "#ffffff",
  blue: "#2563eb",
  red: "#dc2626",
  green: "#16a34a",
  yellow: "#facc15",
  orange: "#f97316",
  brown: "#92400e",
  beige: "#d6c2a1",
  gray: "#9ca3af",
  grey: "#9ca3af",
  purple: "#9333ea",
  pink: "#ec4899",
  navy: "#1e3a8a",
  maroon: "#7f1d1d",
};

function getSwatchColor(color: string, colorHex?: string | null) {
  if (colorHex) return colorHex;
  const normalizedColor = color.trim().toLowerCase();
  return namedColors[normalizedColor] ?? normalizedColor;
}

export function ProductCard({
  id,
  slug,
  name,
  price,
  compareAtPrice,
  image,
  category,
  isNew,
  isBestSeller,
  isFeatured,
  variants = [],
  currencySymbol = "Rs.",
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = useWishlistStore((state) => state.isInWishlist(id));
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);

  const discount =
    compareAtPrice && compareAtPrice > price
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
      : null;

  // Unique sizes and colors
  const sizes = [...new Set(variants.map((v) => v.size))].slice(0, 5);
  const colors = [
    ...new Map(variants.map((v) => [v.color, { color: v.color, hex: v.colorHex }])).values(),
  ].slice(0, 4);

  const inStock = variants.some((v) => v.stock > 0);

  return (
    <article
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-900/30 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] w-full shrink-0 bg-gradient-to-b from-neutral-50 via-neutral-100/50 to-neutral-100 overflow-hidden flex items-center justify-center">
        <Link href={`/product/${slug}`} aria-label={`View ${name}`} className="w-full h-full block">
          <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
            <CloudinaryImage
              publicId={image?.publicId}
              src={image?.imageUrl}
              alt={image?.altText ?? name}
              width={500}
              height={500}
              preset="card"
              fill
              objectFit="cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </Link>

        {/* Badges: Clean, non-overlapping horizontal badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 pointer-events-none">
          {discount && (
            <span className="px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white rounded-full shadow-sm">
              -{discount}%
            </span>
          )}
          {isNew && (
            <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-neutral-900 text-white rounded-full shadow-sm">
              NEW
            </span>
          )}
          {isBestSeller && !discount && (
            <span className="px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider bg-amber-400 text-neutral-950 rounded-full shadow-sm">
              POPULAR
            </span>
          )}
          {!inStock && (
            <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300 rounded-full shadow-sm">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Wishlist Button: Glassmorphic circle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            const nextWishlisted = !isWishlisted;
            toggleWishlist({
              id,
              slug,
              name,
              price,
              compareAtPrice: compareAtPrice ?? null,
              images: image ? [{
                publicId: image.publicId,
                imageUrl: image.imageUrl,
                altText: image.altText,
              }] : [],
              category: category ?? null,
              isNewArrival: Boolean(isNew),
              isBestSeller: Boolean(isBestSeller),
              isFeatured: Boolean(isFeatured),
              variants,
            });
            toast.success(
              nextWishlisted ? `${name} added to your wishlist.` : `${name} removed from your wishlist.`
            );
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white/60 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-neutral-700 hover:text-rose-600"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FontAwesomeIcon
            icon={isWishlisted ? faHeartSolid : faHeartOutline}
            className={`w-4 h-4 transition-colors ${isWishlisted ? "text-rose-600" : "text-neutral-500 hover:text-neutral-900"}`}
          />
        </button>

        {/* Quick View Button overlay */}
        <div
          className={`absolute inset-x-3 bottom-3 z-10 transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <Link
            href={`/product/${slug}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-neutral-950/95 text-white hover:bg-black backdrop-blur-md shadow-lg transition-all"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="w-3.5 h-3.5" />
            {inStock ? "Select Size & Buy" : "View Details"}
          </Link>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 pb-5 flex flex-col flex-1 justify-between bg-white min-h-[145px]">
        <div>
          {/* Category Tag */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                {category?.name ?? "Product"}
            </span>
            {/* Swatch dots */}
            {colors.length > 0 && (
              <div className="flex items-center gap-1">
                {colors.map(({ color, hex }) => (
                  <span
                    key={color}
                    title={color}
                    className="w-2.5 h-2.5 rounded-full border border-neutral-300 shadow-2xs"
                    style={{
                      background: getSwatchColor(color, hex),
                      borderColor: color.trim().toLowerCase() === "white" ? "#d1d5db" : undefined,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Name */}
          <Link href={`/product/${slug}`} className="block group-hover:text-neutral-950">
            <h3 className="font-bold text-sm sm:text-[15px] text-neutral-900 leading-snug tracking-tight mb-2 line-clamp-1">
              {name}
            </h3>
          </Link>

          {/* Available Sizes preview pills */}
          {sizes.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap mb-3">
              {sizes.map((size) => (
                <span
                  key={size}
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600 border border-neutral-200/60"
                >
                  {size}
                </span>
              ))}
              {variants.length > 5 && (
                <span className="text-[10px] text-neutral-400 font-medium">+{variants.length - 5}</span>
              )}
            </div>
          )}
        </div>

        {/* Pricing Row */}
        <div className="pt-3 mt-1 border-t border-neutral-100 flex items-center justify-between flex-wrap gap-x-2 gap-y-1.5 min-w-0">
          <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0.5 min-w-0">
            <span className="text-base font-black text-neutral-950 tracking-normal pl-0.5 whitespace-nowrap leading-tight">
              {currencySymbol} {price.toLocaleString()}
            </span>
            {compareAtPrice && compareAtPrice > price && (
              <span className="text-xs text-neutral-400 line-through font-medium whitespace-nowrap leading-tight">
                {currencySymbol} {compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>
          {discount && (
            <span className="text-[11px] font-extrabold leading-tight text-rose-600 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 inline-flex items-center">
              SAVE {discount}%
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
