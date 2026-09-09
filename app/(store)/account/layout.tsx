import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingBag,
  faGift,
  faHeart,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "My Account",
};

const ACCOUNT_NAV = [
  { href: "/account", label: "Overview", icon: faUser },
  { href: "/account/orders", label: "My Orders", icon: faShoppingBag },
  { href: "/account/rewards", label: "Loyalty Rewards", icon: faGift },
  { href: "/wishlist", label: "Wishlist", icon: faHeart },
];

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth("/account");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/30 text-accent font-black text-xl flex items-center justify-center">
          {user.name ? user.name[0].toUpperCase() : "U"}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">{user.name ?? "Customer"}</h1>
          <p className="text-text-muted text-sm">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1">
          <nav className="card p-3 space-y-1">
            {ACCOUNT_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-surface-2 hover:text-accent text-text-secondary"
              >
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-text-muted" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="lg:col-span-3">{children}</main>
      </div>
    </div>
  );
}
