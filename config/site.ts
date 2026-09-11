/**
 * Musa Kicks — Site Configuration
 *
 * Static site-wide metadata, navigation links, social links.
 * Dynamic settings (such as the WhatsApp number) are stored
 * in SiteSettings table and fetched from the database.
 */

export const siteConfig = {
  name: "Musa Kicks",
  tagline: "Step Into Your Style",
  description:
    "Thoughtfully selected products designed to fit the way you live. Explore our latest collections, everyday essentials, and standout finds.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  brand: {
    logo: "/logo.svg",
    favicon: "/favicon.ico",
    email: "hello@musakicks.com",
    phone: "+92300000000",
    address: "Islamabad, Pakistan",
  },

  social: {
    instagram: "https://instagram.com/musakicks",
    facebook: "https://facebook.com/musakicks",
    twitter: "https://twitter.com/musakicks",
    whatsapp: "+92300000000", // Overridden by SiteSettings in DB
  },

  nav: {
    main: [
      { label: "Shop", href: "/shop" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Best Sellers", href: "/shop?sort=popular" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    categories: [
      { label: "New Collection", href: "/shop?sort=newest", icon: "" },
      { label: "Everyday Essentials", href: "/shop", icon: "" },
      { label: "Featured Finds", href: "/shop?sort=featured", icon: "" },
      { label: "Best Sellers", href: "/shop?sort=popular", icon: "" },
    ],
    account: [
      { label: "My Orders", href: "/account/orders" },
      { label: "My Wishlist", href: "/wishlist" },
      { label: "My Profile", href: "/account/profile" },
      { label: "My Addresses", href: "/account/addresses" },
    ],
  },

  footer: {
    shop: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Best Sellers", href: "/shop?sort=popular" },
      { label: "Sale", href: "/shop?sale=true" },
    ],
    help: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping Info", href: "/faq#shipping" },
      { label: "Refund and Return Policy", href: "/return-refund" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },

  currency: {
    code: "PKR",
    symbol: "Rs.",
    locale: "en-PK",
  },

  pagination: {
    defaultLimit: 12,
    adminLimit: 20,
  },

  cloudinary: {
    folders: {
      products: "musa-kicks/products",
      categories: "musa-kicks/categories",
      banners: "musa-kicks/banners",
      branding: "musa-kicks/branding",
      users: "musa-kicks/users",
    },
  },

  upload: {
    maxFileSizeMB: 10,
    allowedFormats: ["jpg", "jpeg", "png", "webp", "avif"] as const,
  },
} as const;

export type SiteConfig = typeof siteConfig;
