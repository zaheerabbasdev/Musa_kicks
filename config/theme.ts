/**
 * Musa Kicks — Centralized Theme Configuration
 *
 * This is the single source of truth for all brand colors.
 * Change values here to update the entire application.
 *
 * CSS variables are defined in app/globals.css and use these
 * values. Components consume CSS variables, not raw hex values.
 */

export const theme = {
  colors: {
    // ── Brand Palette ─────────────────────────────────────────
    // Espresso & Cream (primary)
    espressoBrown: "#2B1B17",
    warmTan: "#F4EBDD",

    // Mocha Luxe (accent)
    darkMocha: "#3A2923",
    softBeige: "#D8C3A5",

    // Sandstone Luxury (secondary)
    darkTaupe: "#4A4038",
    sandstone: "#D6C2A3",

    // ── Semantic Tokens ───────────────────────────────────────
    primary: "#2B1B17",
    primaryForeground: "#F4EBDD",

    secondary: "#4A4038",
    secondaryForeground: "#D6C2A3",

    accent: "#3A2923",
    accentForeground: "#D8C3A5",

    background: "#FAF7F4",
    foreground: "#1A0F0C",

    card: "#FFFFFF",
    cardForeground: "#1A0F0C",

    border: "#E8DDD5",
    muted: "#F5EFE9",
    mutedForeground: "#7A6A62",

    // ── Status Colors ─────────────────────────────────────────
    success: "#2D6A4F",
    successForeground: "#D8F3DC",
    warning: "#B5451B",
    warningForeground: "#FFF3E0",
    error: "#C62828",
    errorForeground: "#FFEBEE",

    // ── Badge Colors ──────────────────────────────────────────
    badgeNew: "#2B1B17",
    badgeBestSeller: "#B45309",
    badgeSale: "#C62828",
  },

  typography: {
    fontSans: "var(--font-geist-sans)",
    fontMono: "var(--font-geist-mono)",
    fontDisplay: "'Playfair Display', serif",
  },

  spacing: {
    navHeight: "72px",
    adminSidebarWidth: "260px",
  },

  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 3px rgba(43,27,23,0.08)",
    md: "0 4px 12px rgba(43,27,23,0.10)",
    lg: "0 8px 24px rgba(43,27,23,0.12)",
    xl: "0 16px 48px rgba(43,27,23,0.16)",
  },

  transitions: {
    fast: "150ms ease",
    base: "250ms ease",
    slow: "400ms ease",
  },
} as const;

export type Theme = typeof theme;
