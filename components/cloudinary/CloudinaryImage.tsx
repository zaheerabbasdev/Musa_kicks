"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { productCardUrl, productDetailUrl, productThumbnailUrl } from "@/lib/cloudinary/transformations";

interface CloudinaryImageProps {
  publicId?: string | null;
  src?: string | null;          // fallback: full URL already transformed
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  preset?: "card" | "detail" | "thumbnail";
  sizes?: string;
  fill?: boolean;
  objectFit?: "cover" | "contain" | "fill";
}

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80";

export function CloudinaryImage({
  publicId,
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  preset,
  sizes,
  fill,
  objectFit = "cover",
}: CloudinaryImageProps) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const isCloudinaryConfigured = Boolean(cloudName && cloudName !== "placeholder");

  let initialSrc = DEFAULT_FALLBACK;
  if (src && (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/"))) {
    initialSrc = src;
  } else if (publicId && isCloudinaryConfigured) {
    if (preset === "card") {
      initialSrc = productCardUrl(publicId);
    } else if (preset === "detail") {
      initialSrc = productDetailUrl(publicId);
    } else if (preset === "thumbnail") {
      initialSrc = productThumbnailUrl(publicId);
    } else {
      initialSrc = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
    }
  } else if (src) {
    initialSrc = src;
  }

  const [imageSrc, setImageSrc] = useState(initialSrc);

  useEffect(() => {
    setImageSrc(initialSrc);
  }, [initialSrc]);

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt || "Footwear product"}
        fill
        className={className}
        style={{ objectFit }}
        priority={priority}
        sizes={sizes}
        unoptimized={true}
        onError={() => {
          if (imageSrc !== DEFAULT_FALLBACK) {
            setImageSrc(DEFAULT_FALLBACK);
          }
        }}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt || "Footwear product"}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      unoptimized={true}
      onError={() => {
        if (imageSrc !== DEFAULT_FALLBACK) {
          setImageSrc(DEFAULT_FALLBACK);
        }
      }}
    />
  );
}
