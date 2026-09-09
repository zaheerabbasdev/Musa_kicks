import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faStar,
  faTruck,
  faShield,
  faGift,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getFeaturedProducts, getNewArrivals, getBestSellers } from "@/lib/services/product.service";
import { getCategories } from "@/lib/services/category.service";
import { getSettings } from "@/lib/services/settings.service";
import { siteConfig } from "@/config/site";
import { CloudinaryImage } from "@/components/cloudinary/CloudinaryImage";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
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
    <div className="flex flex-col">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative min-h-[85vh] flex items-center overflow-hidden"
        style={{ background: "var(--primary)" }}
        aria-label="Hero section"
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="container-site relative z-10 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{ background: "rgba(216,195,165,0.15)", color: "var(--soft-beige, #D8C3A5)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                New Season Collection
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-none tracking-tight mb-6"
                style={{ color: "var(--primary-foreground)" }}
              >
                STEP INTO
                <br />
                <span style={{ color: "var(--soft-beige, #D8C3A5)" }}>YOUR STYLE</span>
              </h1>

              <p
                className="text-lg md:text-xl leading-relaxed mb-8 max-w-md opacity-80"
                style={{ color: "var(--primary-foreground)" }}
              >
                Premium footwear designed for people who move differently.
                Every step tells your story.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/shop" className="btn btn-primary btn-xl" style={{ background: "var(--primary-foreground)", color: "var(--primary)", borderColor: "var(--primary-foreground)" }}>
                  Shop Collection
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </Link>
                <Link href="/shop?sort=newest" className="btn btn-xl" style={{ background: "transparent", color: "var(--primary-foreground)", borderColor: "rgba(255,255,255,0.3)" }}>
                  New Arrivals
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 mt-10 text-sm opacity-70" style={{ color: "var(--primary-foreground)" }}>
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faTruck} className="w-4 h-4" />
                  Free shipping on orders over {currencySymbol}5,000
                </div>
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faShield} className="w-4 h-4" />
                  7-day easy returns
                </div>
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center"
                style={{ background: "rgba(216,195,165,0.1)", border: "2px solid rgba(216,195,165,0.2)" }}
              >
                <div
                  className="text-9xl select-none"
                  aria-hidden="true"
                >
                  👟
                </div>
                {/* Floating badges */}
                <div
                  className="absolute top-4 right-0 px-4 py-2 rounded-full text-xs font-bold"
                  style={{ background: "var(--soft-beige, #D8C3A5)", color: "var(--primary)" }}
                >
                  Premium Quality
                </div>
                <div
                  className="absolute bottom-8 left-0 px-4 py-2 rounded-full text-xs font-bold"
                  style={{ background: "var(--primary-foreground)", color: "var(--primary)" }}
                >
                  Shop 4 → Get a Gift 🎁
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOP BY CATEGORY ──────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-16 md:py-20" aria-labelledby="categories-heading">
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                  Browse
                </p>
                <h2 id="categories-heading" className="text-3xl md:text-4xl font-display font-bold">
                  Shop By Category
                </h2>
              </div>
              <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all" style={{ color: "var(--primary)" }}>
                All Products <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/shop/${cat.slug}`}
                  className="group relative overflow-hidden rounded-[var(--radius-xl)] aspect-square flex flex-col items-center justify-end p-4 text-center transition-all hover:-translate-y-1"
                  style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
                >
                  {cat.imageUrl ? (
                    <CloudinaryImage
                      src={cat.imageUrl}
                      publicId={cat.publicId}
                      alt={cat.name}
                      width={300}
                      height={300}
                      fill
                      objectFit="cover"
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-5xl">
                      {siteConfig.nav.categories.find((c) => c.label === cat.name)?.icon ?? "👟"}
                    </div>
                  )}
                  <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-[var(--radius-lg)] px-3 py-1.5 w-full">
                    <span className="text-sm font-semibold">{cat.name}</span>
                    {(cat as { _count?: { products: number } })._count && (
                      <span className="block text-xs text-[var(--muted-foreground)]">
                        {(cat as { _count: { products: number } })._count.products} styles
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED SHOES ────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-16 md:py-20" style={{ background: "var(--muted)" }} aria-labelledby="featured-heading">
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                  Handpicked
                </p>
                <h2 id="featured-heading" className="text-3xl md:text-4xl font-display font-bold">
                  Featured Shoes
                </h2>
              </div>
              <Link href="/shop?sort=featured" className="hidden md:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all" style={{ color: "var(--primary)" }}>
                View All <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
              </Link>
            </div>
            <ProductGrid products={featured} currencySymbol={currencySymbol} />
          </div>
        </section>
      )}

      {/* ── LOYALTY BANNER ────────────────────────────────────── */}
      <section
        className="py-16 md:py-20 relative overflow-hidden"
        style={{ background: "var(--accent)" }}
        aria-labelledby="loyalty-heading"
      >
        <div className="container-site relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="text-5xl md:text-6xl mb-6"
              aria-hidden="true"
            >
              🎁
            </div>
            <h2
              id="loyalty-heading"
              className="text-3xl md:text-5xl font-display font-bold mb-4"
              style={{ color: "var(--accent-foreground)" }}
            >
              SHOP 4 TIMES.
              <br />
              GET A SPECIAL GIFT.
            </h2>
            <p
              className="text-lg mb-8 opacity-80"
              style={{ color: "var(--accent-foreground)" }}
            >
              Every qualifying purchase brings you closer to an exclusive reward.
              Shop, earn, and celebrate your style.
            </p>

            {/* Progress demo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all ${
                      n <= 3
                        ? "border-[var(--accent-foreground)] bg-[var(--accent-foreground)]"
                        : "border-[rgba(216,195,165,0.3)] opacity-50"
                    }`}
                    style={{
                      color: n <= 3 ? "var(--accent)" : "var(--accent-foreground)",
                    }}
                  >
                    {n <= 3 ? <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5" /> : n}
                  </div>
                  {n < 4 && (
                    <div
                      className="w-8 h-0.5"
                      style={{ background: n < 3 ? "var(--accent-foreground)" : "rgba(216,195,165,0.3)" }}
                    />
                  )}
                </div>
              ))}
              <div
                className="ml-3 w-10 h-10 rounded-full flex items-center justify-center border-2 opacity-50"
                style={{ borderColor: "rgba(216,195,165,0.4)", color: "var(--accent-foreground)" }}
              >
                <FontAwesomeIcon icon={faGift} className="w-5 h-5" />
              </div>
            </div>

            <Link href="/account/rewards" className="btn btn-xl" style={{ background: "var(--accent-foreground)", color: "var(--accent)", borderColor: "var(--accent-foreground)" }}>
              Learn More About Rewards
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ──────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-16 md:py-20" aria-labelledby="new-arrivals-heading">
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                  Fresh In
                </p>
                <h2 id="new-arrivals-heading" className="text-3xl md:text-4xl font-display font-bold">
                  New Arrivals
                </h2>
              </div>
              <Link href="/shop?sort=newest" className="hidden md:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all" style={{ color: "var(--primary)" }}>
                View All <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
              </Link>
            </div>
            <ProductGrid products={newArrivals} currencySymbol={currencySymbol} />
          </div>
        </section>
      )}

      {/* ── BEST SELLERS ──────────────────────────────────────── */}
      {bestSellers.length > 0 && (
        <section className="py-16 md:py-20" style={{ background: "var(--muted)" }} aria-labelledby="bestsellers-heading">
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
                  Community Favourites
                </p>
                <h2 id="bestsellers-heading" className="text-3xl md:text-4xl font-display font-bold">
                  Best Sellers
                </h2>
              </div>
              <Link href="/shop?sort=popular" className="hidden md:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all" style={{ color: "var(--primary)" }}>
                View All <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
              </Link>
            </div>
            <ProductGrid products={bestSellers} currencySymbol={currencySymbol} />
          </div>
        </section>
      )}

      {/* ── WHY MUSA KICKS ────────────────────────────────────── */}
      <section className="py-16 md:py-20" aria-labelledby="why-heading">
        <div className="container-site">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>
              Our Promise
            </p>
            <h2 id="why-heading" className="text-3xl md:text-4xl font-display font-bold">
              Why Musa Kicks?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: "⭐", title: "Premium Quality", desc: "Materials chosen for durability and style" },
              { icon: "🦶", title: "Comfortable Fit", desc: "Designed for all-day comfort" },
              { icon: "✨", title: "Stylish Design", desc: "Fashion-forward footwear for every occasion" },
              { icon: "🚚", title: "Reliable Delivery", desc: "Fast and safe delivery to your door" },
              { icon: "🎁", title: "Exclusive Rewards", desc: "Shop 4 times and earn a special gift" },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-6 rounded-[var(--radius-xl)] card hover:-translate-y-1 transition-transform"
              >
                <span className="text-4xl mb-4">{icon}</span>
                <h3 className="font-semibold font-display mb-2 text-base">{title}</h3>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ───────────────────────────────────────── */}
      <section
        className="py-16 md:py-24"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        aria-labelledby="brand-story-heading"
      >
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-widest font-medium mb-3 opacity-60">
              Our Story
            </p>
            <h2
              id="brand-story-heading"
              className="text-3xl md:text-5xl font-display font-bold mb-6"
            >
              Born from passion.<br />Built on quality.
            </h2>
            <p className="text-lg leading-relaxed mb-4 opacity-80">
              Musa Kicks started with a simple belief: great shoes shouldn&apos;t be
              a luxury reserved for a few. We set out to craft premium footwear
              that combines artisan quality with everyday wearability.
            </p>
            <p className="text-lg leading-relaxed mb-8 opacity-80">
              Every pair is carefully selected to bring you comfort, style,
              and confidence — whether you&apos;re on the street, at the gym, or
              stepping into a formal setting.
            </p>
            <Link
              href="/about"
              className="btn btn-xl"
              style={{ background: "var(--primary-foreground)", color: "var(--primary)", borderColor: "var(--primary-foreground)" }}
            >
              Read Our Story
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
