/**
 * Musa Kicks — Site Configuration
 *
 * Static site-wide metadata, navigation links, social links.
 * Dynamic settings (WhatsApp number, loyalty config) are stored
 * in SiteSettings table and fetched from the database.
 */

export const siteConfig = {
  name: "Musa Kicks",
  tagline: "Step Into Your Style",
  description:
    "Premium footwear designed for people who move differently. Explore our collection of sneakers, casual, running, formal, boots, and slides.",
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
    ],
    categories: [
      { label: "Sneakers", href: "/shop/sneakers", icon: "" },
      { label: "Casual", href: "/shop/casual", icon: "" },
      { label: "Running", href: "/shop/running", icon: "" },
      { label: "Formal", href: "/shop/formal", icon: "" },
      { label: "Boots", href: "/shop/boots", icon: "" },
      { label: "Slides", href: "/shop/slides", icon: "" },
    ],
    account: [
      { label: "My Orders", href: "/account/orders" },
      { label: "My Wishlist", href: "/wishlist" },
      { label: "My Rewards", href: "/account/rewards" },
      { label: "My Profile", href: "/account/profile" },
      { label: "My Addresses", href: "/account/addresses" },
    ],
  },

  footer: {
    shop: [
      { label: "All Shoes", href: "/shop" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Best Sellers", href: "/shop?sort=popular" },
      { label: "Sale", href: "/shop?sale=true" },
    ],
    help: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping Info", href: "/faq#shipping" },
      { label: "Returns", href: "/faq#returns" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Loyalty Program", href: "/account/rewards" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },

  loyalty: {
    defaultRequired: 4,
    defaultRewardTitle: "Special Musa Kicks Gift",
    defaultRewardDescription:
      "Congratulations! You've earned a special gift from Musa Kicks. Contact us on WhatsApp to claim your reward.",
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
