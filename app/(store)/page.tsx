import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faStar,
  faTruckFast,
  faGift,
  faCheckCircle,
  faAward,
  faFeatherPointed,
  faFire,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getFeaturedProducts, getNewArrivals, getBestSellers } from "@/lib/services/product.service";
import { getCategories } from "@/lib/services/category.service";
import { getSettings } from "@/lib/services/settings.service";
import { siteConfig } from "@/config/site";
import { CloudinaryImage } from "@/components/cloudinary/CloudinaryImage";
import { CategoryCard } from "@/components/categories/CategoryCard";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

// High-resolution curated editorial category visuals
const CATEGORY_VISUALS: Record<string, string> = {
  sneakers: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
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
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex items-center bg-neutral-950 text-white overflow-hidden"
        aria-label="Hero section"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-orange-600/15 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="container-site relative z-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Season Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-white/10 text-white border border-white/15 backdrop-blur-md mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>NEW DROP // 2026 EDITION</span>
              </div>

              {/* Main Headline */}
              <h1 className="flex flex-col gap-2 mb-6 font-extrabold tracking-tight">
                <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white block">
                  STEP INTO
                </span>
                <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-amber-300 bg-clip-text text-transparent block">
                  YOUR ICONIC STYLE.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl leading-relaxed text-neutral-300 max-w-xl mb-10">
                Artisan footwear crafted for those who define the culture. Engineered with
                uncompromising luxury materials and everyday street comfort.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider bg-white text-neutral-950 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5"
                >
                  Shop Collection
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </Link>
                <Link
                  href="/shop?sort=newest"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  New Arrivals
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faTruckFast} className="w-3.5 h-3.5" />
                  </div>
                  <span>Free shipping on orders over {currencySymbol}5,000</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faRotateLeft} className="w-3.5 h-3.5" />
                  </div>
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Right Sneaker Showcase */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              {/* Radial Glowing Aura */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-600/30 to-purple-600/15 blur-3xl" />
              </div>

              {/* High-Resolution Showcase Card */}
              <div className="relative z-10 w-full max-w-[420px] aspect-square rounded-3xl p-6 bg-gradient-to-b from-white/10 to-white/5 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center justify-center group">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Sneaker Visual with dynamic hover float */}
                  <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-rotate-3">
                    <CloudinaryImage
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=85"
                      alt="Musa Kicks Signature Drop"
                      width={600}
                      height={600}
                      fill
                      objectFit="contain"
                      priority
                      className="drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  {/* Top Floating Glass Pill */}
                  <div className="absolute top-2 right-2 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-black/60 text-white border border-white/20 backdrop-blur-md shadow-lg flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-amber-400" />
                    <span>Premium Artisan Craft</span>
                  </div>

                  {/* Bottom Floating Glass Card */}
                  <div className="absolute bottom-2 left-2 px-4 py-2.5 rounded-2xl bg-neutral-900/80 border border-white/15 backdrop-blur-md shadow-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-sm">
                      <FontAwesomeIcon icon={faGift} className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Loyalty Perk</p>
                      <p className="text-xs font-extrabold text-white">Shop 4 → Claim Special Gift</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <span>View All Shoes</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.slice(0, 6).map((cat) => {
                const normalizedSlug = cat.slug.toLowerCase();
                const visualUrl = cat.imageUrl || CATEGORY_VISUALS[normalizedSlug] || CATEGORY_VISUALS["sneakers"];
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

      {/* ── FEATURED SHOES ────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-20 bg-neutral-50/80 border-y border-neutral-200/60" aria-labelledby="featured-heading">
          <div className="container-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                  HANDPICKED SELECTION
                </p>
                <h2 id="featured-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
                  Featured Shoes
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

      {/* ── VIP LOYALTY BANNER ────────────────────────────────── */}
      <section
        className="py-20 bg-neutral-950 text-white relative overflow-hidden"
        aria-labelledby="loyalty-heading"
      >
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-transparent blur-[120px] pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* VIP Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-6">
              <FontAwesomeIcon icon={faAward} className="w-3.5 h-3.5" />
              <span>MUSA VIP REWARDS PROGRAM</span>
            </div>

            <h2
              id="loyalty-heading"
              className="flex flex-col gap-2.5 sm:gap-3 mb-6 text-center"
            >
              <span className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white block">
                SHOP 4 TIMES.
              </span>
              <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent block">
                CLAIM AN EXCLUSIVE COMPLIMENTARY GIFT.
              </span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-neutral-300 max-w-2xl mx-auto mb-10">
              Every qualifying order automatically advances your loyalty milestone streak. Complete 4 purchases
              to unlock exclusive pairs or limited-edition designer merchandise.
            </p>

            {/* Futuristic 4-Step Milestone Tracker */}
            <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md mb-10">
              <div className="flex items-center justify-between relative">
                {/* Connecting background bar */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-white/10 z-0" />
                <div className="absolute left-6 w-3/4 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-400 to-orange-500 z-0" />

                {[1, 2, 3].map((step) => (
                  <div key={step} className="relative z-10 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-neutral-950 font-black text-sm flex items-center justify-center shadow-lg shadow-amber-400/30">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-300 mt-2">
                      Order {step}
                    </span>
                  </div>
                ))}

                {/* Final Goal Step */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-neutral-950 font-black text-sm flex items-center justify-center shadow-xl shadow-orange-500/40 animate-pulse">
                    <FontAwesomeIcon icon={faGift} className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 mt-2">
                    Free Gift 🎁
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/account/rewards"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider bg-amber-400 text-neutral-950 hover:bg-amber-300 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-amber-400/20"
            >
              <span>Explore Rewards Program</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

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

      {/* ── WHY MUSA KICKS ────────────────────────────────────── */}
      <section className="py-20 bg-white" aria-labelledby="why-heading">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
              THE MUSA STANDARD
            </p>
            <h2 id="why-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-950">
              Why Musa Kicks?
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
              {
                icon: faGift,
                title: "VIP Loyalty",
                desc: "Shop 4 times and receive a special complimentary gift.",
                accent: "text-purple-500 bg-purple-500/10",
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
            <p className="text-base sm:text-lg leading-relaxed text-neutral-300 mb-6">
              Musa Kicks was founded with a single mission: footwear should never compromise between
              unapologetic streetwear aesthetics and uncompromising craftsmanship.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-300 mb-10">
              From limited drops to everyday classics, every pair in our collection is curated to give you
              distinction, comfort, and undeniable presence.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-wider bg-white text-neutral-950 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
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
