import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/services/settings.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faTruckFast,
  faHandshake,
  faShieldHalved,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `About Us — ${settings.brandName}`,
    description: `Learn about ${settings.brandName} — a thoughtful destination for quality products and modern everyday living.`,
  };
}

export default async function AboutPage() {
  const settings = await getSettings();
  return (
    <div className="container-site py-12 md:py-10">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
        <span className="badge badge-accent uppercase tracking-widest text-xs mb-4">
          Our Story
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
          Curating the Culture of <span className="gradient-text">Everyday Living</span>
        </h1>
        <p className="mt-6! ml-22! max-w-2xl mx-auto text-center text-lg sm:text-xl text-neutral-600 leading-relaxed">
          {settings.brandName} was born from a belief that useful products can also be expressive,
          well-made, and enjoyable to bring into your everyday life.
        </p>
      </section>

      {/* Values Grid */}
      <section className="mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6 border-neutral-200 hover:border-neutral-900/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-xl mb-4">
              <FontAwesomeIcon icon={faAward} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-neutral-900">100% Authentic</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Every product is selected for dependable materials, thoughtful details, and lasting value.
            </p>
          </div>

          <div className="card p-6 border-neutral-200 hover:border-neutral-900/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-xl mb-4">
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-neutral-900">Express Nationwide Delivery</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Fast, trackable shipping to every major city and district with safe packaging.
            </p>
          </div>

          <div className="card p-6 border-neutral-200 hover:border-neutral-900/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-xl mb-4">
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-neutral-900">Direct WhatsApp Service</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Talk directly to real people for product questions, recommendations, or custom requests.
            </p>
          </div>

          <div className="card p-6 border-neutral-200 hover:border-neutral-900/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-xl mb-4">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-neutral-900">Hassle-Free Exchanges</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Changed your mind? Easily exchange eligible products within 7 days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center">
        <div className="card p-8 md:p-14 border border-neutral-200 bg-neutral-950 text-white rounded-3xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase mb-4 text-white">
              Find Your Next Favorite
            </h2>
            <p className="text-neutral-300 max-w-xl mx-auto mb-8! text-black! ml-22! text-base">
              Explore our latest drops and elevated streetwear essentials.
            </p>
            <Link href="/shop" className="btn btn-primary btn-lg inline-flex items-center gap-2">
              <span>Explore Collection</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
