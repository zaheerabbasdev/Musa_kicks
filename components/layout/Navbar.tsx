"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faSearch,
  faShoppingCart,
  faHeart,
  faUser,
  faChevronDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/store/cart.store";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { data: session } = useSession();
  const cartCount = useCartStore((s) => s.totalItems);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isAdminPage = pathname.startsWith("/admin");
  if (isAdminPage) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80"
            : "bg-white/90 backdrop-blur-sm border-b border-neutral-100"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container-site h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 shrink-0 group"
            aria-label="Musa Kicks Home"
          >
            <span className="text-2xl font-black tracking-tighter text-neutral-950">
              MUSA
            </span>
            <span className="text-2xl font-black tracking-tighter text-orange-600">
              KICKS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {siteConfig.nav.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-xs font-bold uppercase tracking-wider ${
                  pathname === item.href || pathname.startsWith(item.href + "?") ? "active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Categories dropdown */}
            <div className="relative group">
              <button
                className="nav-link text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                aria-haspopup="true"
              >
                Categories
                <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 transition-transform group-hover:rotate-180" />
              </button>
              <div
                className="absolute top-full left-0 mt-2 w-56 border border-neutral-200/90 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 z-50"
                style={{ backgroundColor: "#ffffff" }}
              >
                {siteConfig.nav.categories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
                  >
                    <span>{cat.label}</span>
                    <span className="text-neutral-400 text-xs">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="btn btn-ghost btn-icon"
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faSearch} className="w-4.5 h-4.5" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="btn btn-ghost btn-icon relative" aria-label="Wishlist">
              <FontAwesomeIcon icon={faHeart} className="w-4.5 h-4.5" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="btn btn-ghost btn-icon relative" aria-label={`Cart (${cartCount} items)`}>
              <FontAwesomeIcon icon={faShoppingCart} className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="btn btn-ghost btn-icon"
                  aria-label="Account menu"
                  aria-expanded={isUserMenuOpen}
                >
                  <FontAwesomeIcon icon={faUser} className="w-4.5 h-4.5" />
                </button>
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] z-50 py-2 animate-slide-down">
                      <div className="px-4 py-2 border-b border-[var(--border)] mb-1">
                        <p className="text-sm font-medium truncate">{session.user.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)] truncate">{session.user.email}</p>
                      </div>
                      {session.user.role === "ADMIN" && (
                        <Link href="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[var(--muted)] transition-colors">
                          Admin Dashboard
                        </Link>
                      )}
                      {siteConfig.nav.account.map((item) => (
                        <Link key={item.href} href={item.href} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-[var(--muted)] transition-colors">
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-[var(--border)] mt-1 pt-1">
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm w-full hover:bg-[var(--muted)] transition-colors text-left"
                          style={{ color: "var(--error)" }}
                        >
                          <FontAwesomeIcon icon={faRightFromBracket} className="w-3.5 h-3.5" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="hidden md:flex btn btn-primary btn-sm">
                Login
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-icon md:!hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-4/5 max-w-xs bg-[var(--card)] z-[150] transform transition-transform duration-300 shadow-[var(--shadow-xl)] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
            <span className="text-xl font-display font-bold" style={{ color: "var(--primary)" }}>
              MUSA KICKS
            </span>
            <button onClick={() => setIsMenuOpen(false)} className="btn btn-ghost btn-icon">
              <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
            {siteConfig.nav.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2.5 text-base font-medium rounded-[var(--radius-md)] hover:bg-[var(--muted)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <p className="text-xs font-semibold uppercase tracking-widest mt-4 mb-2 px-3" style={{ color: "var(--muted-foreground)" }}>
              Categories
            </p>
            {siteConfig.nav.categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex items-center gap-2 px-3 py-2.5 text-base rounded-[var(--radius-md)] hover:bg-[var(--muted)] transition-colors"
              >
                <span>{cat.icon}</span> {cat.label}
              </Link>
            ))}
          </nav>

          {/* Auth */}
          <div className="p-4 border-t border-[var(--border)]">
            {session?.user ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="btn btn-secondary w-full"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link href="/auth/login" className="btn btn-primary w-full justify-center">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[140] bg-neutral-950/75 backdrop-blur-sm md:hidden transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu backdrop"
        />
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4">
          <div
            className="absolute inset-0 overlay visible"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative w-full max-w-lg animate-slide-down">
            <form
              action="/shop"
              className="flex gap-2"
              onSubmit={() => setIsSearchOpen(false)}
            >
              <input
                autoFocus
                type="search"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shoes..."
                className="input text-base py-3 px-4 pr-12"
                aria-label="Search products"
              />
              <button type="submit" className="btn btn-primary px-5">
                <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="btn btn-ghost btn-icon"
              >
                <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: "var(--nav-height)" }} />
    </>
  );
}
