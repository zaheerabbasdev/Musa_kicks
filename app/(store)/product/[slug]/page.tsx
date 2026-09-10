import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/services/product.service";
import { getSettings } from "@/lib/services/settings.service";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { AddToCartSection } from "@/components/products/AddToCartSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faTruck, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) return { title: "Product Not Found" };

  const image = product.images.find((i) => i.isPrimary) ?? product.images[0];
  return {
    title: product.name,
    description: product.shortDescription ?? product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.shortDescription ?? product.description.substring(0, 160),
      images: image ? [{ url: image.imageUrl, alt: image.altText ?? product.name }] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const [product, settings] = await Promise.all([
    getProductBySlug(slug).catch(() => null),
    getSettings().catch(() => null),
  ]);

  if (!product) notFound();

  const currencySymbol = settings?.currencySymbol ?? "Rs.";
  const price = Number(product.price);
  const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : null;
  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  const related = await getRelatedProducts(product.id, product.categoryId, 4).catch(() => []);

  return (
    <div className="container-site py-10 md:py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
        <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[var(--primary)]">Shop</Link>
        <span>/</span>
        <Link href={`/shop/${product.category.slug}`} className="hover:text-[var(--primary)]">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium">{product.name}</span>
      </nav>

      {/* Main Product */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-24">
        {/* Gallery */}
        <div>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {product.isNewArrival && <Badge variant="new">New Arrival</Badge>}
            {product.isBestSeller && <Badge variant="best-seller">Best Seller</Badge>}
            {product.isFeatured && <Badge variant="muted">Featured</Badge>}
          </div>

          {/* Category */}
          <Link
            href={`/shop/${product.category.slug}`}
            className="text-sm font-medium uppercase tracking-widest hover:text-[var(--primary)] transition-colors"
            style={{ color: "var(--muted-foreground)" }}
          >
            {product.category.name}
          </Link>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight">
            {product.name}
          </h1>

          {/* SKU */}
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            SKU: {product.sku}
          </p>

          {/* Price */}
          <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1 min-w-0">
            <span className="text-3xl font-extrabold text-neutral-950 tracking-normal pl-0.5 whitespace-nowrap">
              {currencySymbol} {price.toLocaleString()}
            </span>
            {compareAtPrice && compareAtPrice > price && (
              <div className="flex items-center gap-2">
                <span className="text-lg text-neutral-400 line-through font-medium whitespace-nowrap">
                  {currencySymbol} {compareAtPrice.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                  SAVE {discount}%
                </span>
              </div>
            )}
          </div>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              {product.shortDescription}
            </p>
          )}

          {/* Divider */}
          <div className="divider" />

          {/* Add to cart section */}
          <AddToCartSection
            product={product}
            currencySymbol={currencySymbol}
            whatsappNumber={settings?.whatsappNumber ?? ""}
            brandName={settings?.brandName ?? "Musa Kicks"}
            shippingFee={settings?.shippingFee ?? 200}
            freeShippingThreshold={settings?.freeShippingThreshold ?? 5000}
          />

          {/* Shipping & Returns */}
          <div className="divider" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
              <FontAwesomeIcon icon={faTruck} className="w-4 h-4 shrink-0" style={{ color: "var(--primary)" }} />
              Free delivery on orders over {currencySymbol} {(settings?.freeShippingThreshold ?? 5000).toLocaleString()}
            </div>
            <div className="flex items-center gap-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
              <FontAwesomeIcon icon={faRotateLeft} className="w-4 h-4 shrink-0" style={{ color: "var(--primary)" }} />
              {settings?.returnPeriodDays ?? 7}-day easy returns
            </div>
            <div className="flex items-center gap-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
              <FontAwesomeIcon icon={faShield} className="w-4 h-4 shrink-0" style={{ color: "var(--primary)" }} />
              100% authentic guaranteed
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-16 md:mb-24">
        <h2 className="text-2xl font-display font-bold mb-6">Product Description</h2>
        <div
          className="prose max-w-none text-base leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
          dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, "<br />") }}
        />
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="pt-12 border-t border-neutral-200/80">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold">You May Also Like</h2>
            <Link href="/shop" className="text-sm font-bold text-neutral-900 hover:text-orange-600 transition-colors">
              Explore More →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
            {related.map((p) => {
              const img = p.images[0];
              return (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  slug={p.slug}
                  name={p.name}
                  price={Number(p.price)}
                  compareAtPrice={p.compareAtPrice ? Number(p.compareAtPrice) : null}
                  image={img ?? null}
                  category={p.category}
                  isNew={p.isNewArrival}
                  isBestSeller={p.isBestSeller}
                  isFeatured={p.isFeatured}
                  variants={p.variants}
                  currencySymbol={currencySymbol}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
