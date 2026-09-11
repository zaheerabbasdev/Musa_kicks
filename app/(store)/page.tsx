import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faStar,
  faTruckFast,
  faAward,
  faFeatherPointed,
  faFire,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getFeaturedProducts, getNewArrivals, getBestSellers } from "@/lib/services/product.service";
import { getCategories } from "@/lib/services/category.service";
import { getSettings } from "@/lib/services/settings.service";
import { CloudinaryImage } from "@/components/cloudinary/CloudinaryImage";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { HeroCarousel } from "@/components/home/HeroCarousel";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings().catch(() => null);
  const storeName = settings?.brandName ?? "Store";
  return {
    title: storeName,
    description: "Thoughtfully selected products designed for people who live differently.",
  };
}

// High-resolution curated editorial category visuals
const CATEGORY_VISUALS: Record<string, string> = {
  default: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  casual:   "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
  running:  "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80",
  formal:   "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
  boots:    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
  slides:   "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80",
};

export default async function HomePage() {
  const [featured, newArrivals, bestSellers, categories, settings] = await Promise.all([
    getFeaturedProducts(8).catch(() => []),
    getNewArrivals(8).catch(() => []),
    getBestSellers(8).catch(() => []),
    getCategories().catch(() => []),
    getSettings().catch(() => null),
  ]);

  const currencySymbol = settings?.currencySymbol ?? "Rs.";

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <HeroCarousel />
      {/* ── SHOP BY CATEGORY ──────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-20 bg-white" aria-labelledby="categories-heading">
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                  EXPLORE COLLECTIONS
                </p>
                <h2 id="categories-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
                  Shop By Category
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-900 hover:text-orange-600 transition-colors group"
              >
                <span>View All Products</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.slice(0, 6).map((cat) => {
                const normalizedSlug = cat.slug.toLowerCase();
                const visualUrl = cat.imageUrl || CATEGORY_VISUALS[normalizedSlug] || CATEGORY_VISUALS.default;
                const count = (cat as { _count?: { products: number } })._count?.products;

                return (
                  <CategoryCard
                    key={cat.id}
                    id={cat.id}
                    name={cat.name}
                    slug={cat.slug}
                    imageUrl={visualUrl}
                    publicId={cat.publicId}
                    productCount={count}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED PRODUCTS ────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-20 bg-neutral-50/80 border-y border-neutral-200/60" aria-labelledby="featured-heading">
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                  HANDPICKED SELECTION
                </p>
                <h2 id="featured-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
                  Featured Products
                </h2>
              </div>
              <Link
                href="/shop?sort=featured"
                className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-900 hover:text-orange-600 transition-colors group"
              >
                <span>Browse All</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ProductGrid products={featured} currencySymbol={currencySymbol} />
          </div>
        </section>
      )}

      {/* ── NEW ARRIVALS ──────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-20 bg-white" aria-labelledby="new-arrivals-heading">
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                  FRESH DROPS
                </p>
                <h2 id="new-arrivals-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
                  New Arrivals
                </h2>
              </div>
              <Link
                href="/shop?sort=newest"
                className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-900 hover:text-orange-600 transition-colors group"
              >
                <span>View All New</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ProductGrid products={newArrivals} currencySymbol={currencySymbol} />
          </div>
        </section>
      )}

      {/* ── BEST SELLERS ──────────────────────────────────────── */}
      {bestSellers.length > 0 && (
        <section className="py-20 bg-neutral-50/80 border-t border-neutral-200/60" aria-labelledby="bestsellers-heading">
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                  MOST WANTED
                </p>
                <h2 id="bestsellers-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
                  Best Sellers
                </h2>
              </div>
              <Link
                href="/shop?sort=popular"
                className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-900 hover:text-orange-600 transition-colors group"
              >
                <span>View Popular</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ProductGrid products={bestSellers} currencySymbol={currencySymbol} />
          </div>
        </section>
      )}

      {/* ── WHY SHOP WITH US ─────────────────────────────────── */}
      <section className="py-20 bg-white" aria-labelledby="why-heading">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
              THE MUSA STANDARD
            </p>
            <h2 id="why-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
              Why {settings?.brandName ?? "Store"}?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: faAward,
                title: "Premium Materials",
                desc: "Full-grain leather and precision fabrics crafted for lasting luxury.",
                accent: "text-amber-500 bg-amber-500/10",
              },
              {
                icon: faFeatherPointed,
                title: "All-Day Comfort",
                desc: "Ergonomically tuned insoles designed for lightweight, continuous wear.",
                accent: "text-blue-500 bg-blue-500/10",
              },
              {
                icon: faFire,
                title: "Streetwear Edge",
                desc: "High-fashion silhouettes that turn heads wherever you step.",
                accent: "text-orange-500 bg-orange-500/10",
              },
              {
                icon: faTruckFast,
                title: "Fast Delivery",
                desc: "Prompt dispatch and careful insured transit straight to your doorstep.",
                accent: "text-emerald-500 bg-emerald-500/10",
              },
            ].map(({ icon, title, desc, accent }) => (
              <div
                key={title}
                className="flex flex-col items-start p-6 rounded-2xl bg-white border border-neutral-200/80 hover:border-neutral-900/40 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${accent} transition-transform group-hover:scale-110`}>
                  <FontAwesomeIcon icon={icon} className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-950 text-base mb-2">{title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ───────────────────────────────────────── */}
      <section
        className="py-24 bg-neutral-950 text-white relative overflow-hidden"
        aria-labelledby="brand-story-heading"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-30" />
        <div className="container-site relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400 mb-4">
              OUR ORIGIN
            </p>
            <h2
              id="brand-story-heading"
              className="flex flex-col gap-2 mb-8 text-center"
            >
              <span className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white block">
                Born from passion.
              </span>
              <span className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-400 block">
                Engineered on quality.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-justify leading-relaxed text-neutral-300 mb-6 mt-6!">
              {settings?.brandName ?? "Store"} was founded with a single mission: shopping should feel personal,
              dependable, and inspiring from discovery through delivery.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-300 mb-10">
              From practical essentials to standout finds, every product in our collection is curated to bring
              quality, character, and value to your everyday life.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center mt-6! gap-2.5 px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider bg-white text-neutral-950 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
            >
              <span>Read Our Full Story</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
