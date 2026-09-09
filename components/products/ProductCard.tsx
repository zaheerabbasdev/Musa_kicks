"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { CloudinaryImage } from "@/components/cloudinary/CloudinaryImage";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/cart.store";

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

export function ProductCard({
  id,
  slug,
  name,
  price,
  compareAtPrice,
  image,
  isNew,
  isBestSeller,
  variants = [],
  currencySymbol = "Rs.",
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-[var(--muted)]">
        <Link href={`/product/${slug}`} aria-label={`View ${name}`}>
          <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
            <CloudinaryImage
              publicId={image?.publicId}
              src={image?.imageUrl}
              alt={image?.altText ?? name}
              width={400}
              height={400}
              preset="card"
              fill
              objectFit="cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && <Badge variant="new">New</Badge>}
          {isBestSeller && <Badge variant="best-seller">Best Seller</Badge>}
          {discount && <Badge variant="sale">-{discount}%</Badge>}
          {!inStock && <Badge variant="error">Sold Out</Badge>}
        </div>

        {/* Actions overlay */}
        <div
          className={`absolute top-2 right-2 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="w-8 h-8 rounded-full bg-white shadow-[var(--shadow-sm)] flex items-center justify-center hover:scale-110 transition-transform"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FontAwesomeIcon
              icon={isWishlisted ? faHeartSolid : faHeartOutline}
              className="w-3.5 h-3.5"
              style={{ color: isWishlisted ? "var(--error)" : "var(--muted-foreground)" }}
            />
          </button>

          {/* Quick view */}
          <Link
            href={`/product/${slug}`}
            className="w-8 h-8 rounded-full bg-white shadow-[var(--shadow-sm)] flex items-center justify-center hover:scale-110 transition-transform"
            aria-label={`Quick view ${name}`}
          >
            <FontAwesomeIcon
              icon={faEye}
              className="w-3.5 h-3.5"
              style={{ color: "var(--muted-foreground)" }}
            />
          </Link>
        </div>

        {/* Quick add overlay */}
        {inStock && (
          <div
            className={`absolute inset-x-0 bottom-0 transition-all duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            <Link
              href={`/product/${slug}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="w-3.5 h-3.5" />
              Select Size
            </Link>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-4">
        {/* Name */}
        <Link href={`/product/${slug}`}>
          <h3
            className="font-medium text-sm md:text-base leading-snug mb-1 hover:text-[var(--primary)] transition-colors line-clamp-2"
          >
            {name}
          </h3>
        </Link>

        {/* Sizes preview */}
        {sizes.length > 0 && (
          <div className="flex gap-1 flex-wrap mb-2">
            {sizes.map((size) => (
              <span
                key={size}
                className="text-[10px] px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--muted-foreground)]"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="flex gap-1 mb-2">
            {colors.map(({ color, hex }) => (
              <div
                key={color}
                title={color}
                className="w-4 h-4 rounded-full border border-[var(--border)]"
                style={{ background: hex ?? "#888" }}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="price-current text-sm md:text-base">
            {currencySymbol} {price.toLocaleString()}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="price-compare text-xs md:text-sm">
              {currencySymbol} {compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
