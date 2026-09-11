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
import { HeroCarousel } from "@/components/home/HeroCarousel";

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

            <p className="text-base sm:text-lg text-justify leading-relaxed text-neutral-300 max-w-2xl mx-auto mb-10 mt-6! ml-24!">
              Every qualifying order automatically advances your loyalty milestone streak. Complete 4 purchases
              to unlock exclusive pairs or limited-edition designer merchandise.
            </p>

            {/* Futuristic 4-Step Milestone Tracker */}
            <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md mb-10 mt-10!">
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
            <p className="text-base sm:text-lg text-justify leading-relaxed text-neutral-300 mb-6 mt-6!">
              Musa Kicks was founded with a single mission: footwear should never compromise between
              unapologetic streetwear aesthetics and uncompromising craftsmanship.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-neutral-300 mb-10">
              From limited drops to everyday classics, every pair in our collection is curated to give you
              distinction, comfort, and undeniable presence.
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
