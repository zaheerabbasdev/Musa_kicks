import Image from "next/image";
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

  let imageSrc: string;

  if (src && (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/"))) {
    imageSrc = src;
  } else if (publicId && isCloudinaryConfigured) {
    if (preset === "card") {
      imageSrc = productCardUrl(publicId);
    } else if (preset === "detail") {
      imageSrc = productDetailUrl(publicId);
    } else if (preset === "thumbnail") {
      imageSrc = productThumbnailUrl(publicId);
    } else {
      imageSrc = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
    }
  } else if (src) {
    imageSrc = src;
  } else {
    imageSrc = DEFAULT_FALLBACK;
  }

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={`${className}`}
        style={{ objectFit }}
        priority={priority}
        sizes={sizes}
        onError={(e) => {
          (e.target as HTMLImageElement).src = DEFAULT_FALLBACK;
        }}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={(e) => {
        (e.target as HTMLImageElement).src = DEFAULT_FALLBACK;
      }}
    />
  );
}
