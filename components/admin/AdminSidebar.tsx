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

interface AdminSidebarProps {
  onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps = {}) {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar shadow-2xl h-full">
      {/* Brand Header */}
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" className="block group">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-lg font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
              MUSA KICKS
            </span>
          </div>
          <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-1">
            EXECUTIVE CONSOLE
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close admin menu"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4 rotate-180" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1" aria-label="Admin navigation">
        <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
          Management
        </p>
        {navItems.map((item) => {
          const isActive = item.exactMatch
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-gradient-to-r from-orange-600/20 to-orange-600/5 text-white border-l-2 border-orange-500 shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`w-4 h-4 transition-colors ${isActive ? "text-orange-400" : "text-neutral-500"}`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions & Profile */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all text-left"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
