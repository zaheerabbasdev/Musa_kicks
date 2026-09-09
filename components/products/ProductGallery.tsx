"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { CloudinaryImage } from "@/components/cloudinary/CloudinaryImage";

interface GalleryImage {
  id: string;
  publicId: string;
  imageUrl: string;
  altText?: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sorted = [...images].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return a.sortOrder - b.sortOrder;
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const activeImage = sorted[activeIdx];

  const prev = () => setActiveIdx((i) => (i - 1 + sorted.length) % sorted.length);
  const next = () => setActiveIdx((i) => (i + 1) % sorted.length);

  if (!activeImage) {
    return (
      <div
        className="aspect-square rounded-[var(--radius-xl)] flex items-center justify-center"
        style={{ background: "var(--muted)" }}
      >
        <p style={{ color: "var(--muted-foreground)" }}>No image</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
      {/* Thumbnails — desktop left / mobile bottom */}
      {sorted.length > 1 && (
        <div className="flex lg:flex-col gap-2 order-2 lg:order-1 overflow-x-auto lg:overflow-y-auto lg:max-h-[520px]">
          {sorted.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIdx(idx)}
              className={`shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-[var(--radius-md)] overflow-hidden border-2 transition-all ${
                idx === activeIdx
                  ? "border-[var(--primary)]"
                  : "border-transparent hover:border-[var(--border-strong)]"
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <CloudinaryImage
                publicId={img.publicId}
                src={img.imageUrl}
                alt={img.altText ?? `${productName} view ${idx + 1}`}
                width={80}
                height={80}
                preset="thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative flex-1 order-1 lg:order-2">
        <div className="aspect-square rounded-[var(--radius-xl)] overflow-hidden bg-[var(--muted)] relative">
          <CloudinaryImage
            publicId={activeImage.publicId}
            src={activeImage.imageUrl}
            alt={activeImage.altText ?? productName}
            width={800}
            height={800}
            preset="detail"
            fill
            objectFit="cover"
            priority={activeIdx === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Navigation arrows */}
        {sorted.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-[var(--shadow-md)] flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Previous image"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-[var(--shadow-md)] flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Next image"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {sorted.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeIdx ? "w-5 bg-[var(--primary)]" : "w-1.5 bg-white/70"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
