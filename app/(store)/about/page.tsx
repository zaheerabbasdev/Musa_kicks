import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faTruckFast,
  faHandshake,
  faShieldHalved,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "About Us — Musa Kicks",
  description:
    "Learn about Musa Kicks — where premium sneaker culture meets street luxury craftsmanship.",
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="badge badge-accent uppercase tracking-widest text-xs mb-4">
          Our Story
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
          Crafting the Culture of <span className="gradient-text">Footwear</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          Musa Kicks was born from an obsession with authentic sneaker craftsmanship,
          uncompromising silhouettes, and modern street aesthetics.
        </p>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6 border-border/80 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl mb-4">
              <FontAwesomeIcon icon={faAward} />
            </div>
            <h3 className="font-bold text-lg mb-2">100% Authentic</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Every pair is verified for premium stitching, high-grade materials, and true-to-fit sizing.
            </p>
          </div>

          <div className="card p-6 border-border/80 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl mb-4">
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <h3 className="font-bold text-lg mb-2">Express Nationwide Delivery</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Fast, trackable shipping to every major city and district with safe packaging.
            </p>
          </div>

          <div className="card p-6 border-border/80 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl mb-4">
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            <h3 className="font-bold text-lg mb-2">Direct WhatsApp Service</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Talk directly to real human footwear specialists to check sizing or place custom requests.
            </p>
          </div>

          <div className="card p-6 border-border/80 hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl mb-4">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <h3 className="font-bold text-lg mb-2">Hassle-Free Exchanges</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Size not quite right? Easily exchange within 7 days for the ideal fit.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <div className="card p-10 md:p-16 border-accent/30 bg-gradient-to-br from-surface to-surface-2 relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4">
            Step Into Your Next Favorite Pair
          </h2>
          <p className="text-text-muted max-w-xl mx-auto mb-8">
            Explore our latest drops and elevated streetwear essentials.
          </p>
          <Link href="/shop" className="btn btn-primary btn-lg inline-flex items-center gap-2">
            <span>Explore Collection</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </section>
    </div>
  );
}
