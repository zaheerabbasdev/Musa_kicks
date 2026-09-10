import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CloudinaryImage } from "@/components/cloudinary/CloudinaryImage";

interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  publicId?: string | null;
  productCount?: number;
}

export function CategoryCard({
  name,
  slug,
  imageUrl,
  publicId,
  productCount,
}: CategoryCardProps) {
  return (
    <Link
      href={`/shop/${slug}`}
      className="group relative overflow-hidden rounded-2xl aspect-[4/5] flex flex-col justify-end p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 border border-neutral-200/50 bg-neutral-900"
    >
      {/* Editorial Category Image Background */}
      {imageUrl && (
        <CloudinaryImage
          src={imageUrl}
          publicId={publicId}
          alt={name}
          width={400}
          height={500}
          fill
          objectFit="cover"
          className="transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}

      {/* Gradient Overlay for high contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent group-hover:from-neutral-950/95 transition-all" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end w-full">
        <span className="block text-base sm:text-lg font-extrabold uppercase tracking-tight text-white leading-tight group-hover:text-amber-300 transition-colors">
          {name}
        </span>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/15">
          <span className="text-xs text-neutral-300 font-medium">
            {typeof productCount === "number" ? `${productCount} styles` : "Explore"}
          </span>
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
