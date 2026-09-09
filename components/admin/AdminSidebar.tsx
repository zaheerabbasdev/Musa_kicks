"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faBoxOpen,
  faListUl,
  faClipboardList,
  faUsers,
  faGift,
  faChartLine,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface NavItem {
  label: string;
  href: string;
  icon: IconDefinition;
  exactMatch?: boolean;
}

const navItems: NavItem[] = [
  { label: "Dashboard",    href: "/admin",            icon: faGauge,         exactMatch: true },
  { label: "Products",     href: "/admin/products",   icon: faBoxOpen },
  { label: "Categories",   href: "/admin/categories", icon: faListUl },
  { label: "Orders",       href: "/admin/orders",     icon: faClipboardList },
  { label: "Customers",    href: "/admin/customers",  icon: faUsers },
  { label: "Loyalty",      href: "/admin/loyalty",    icon: faGift },
  { label: "Analytics",    href: "/admin/analytics",  icon: faChartLine },
  { label: "Settings",     href: "/admin/settings",   icon: faGear },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <Link href="/admin" className="block">
          <span className="text-xl font-display font-bold tracking-tight">
            MUSA KICKS
          </span>
          <span className="block text-xs opacity-60 mt-0.5 font-sans font-normal">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4" aria-label="Admin navigation">
        {navItems.map((item) => {
          const isActive = item.exactMatch
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${isActive ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={item.icon} className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <Link
          href="/"
          className="admin-nav-item text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>← View Store</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="admin-nav-item w-full text-left mt-1"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
