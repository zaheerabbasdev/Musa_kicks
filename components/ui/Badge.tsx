import React from "react";

type BadgeVariant =
  | "new"
  | "best-seller"
  | "sale"
  | "success"
  | "warning"
  | "error"
  | "muted"
  | "primary"
  | "secondary";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClass: Record<BadgeVariant, string> = {
  "new":         "bg-neutral-900 text-white border border-neutral-700/50 shadow-sm",
  "best-seller": "bg-amber-500 text-black font-extrabold shadow-sm",
  "sale":        "bg-rose-600 text-white font-extrabold shadow-sm",
  "success":     "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "warning":     "bg-amber-50 text-amber-800 border border-amber-200",
  "error":       "bg-rose-50 text-rose-700 border border-rose-200",
  "muted":       "bg-neutral-100 text-neutral-600 border border-neutral-200",
  "primary":     "bg-neutral-900 text-white",
  "secondary":   "bg-neutral-800 text-white",
};

export function Badge({ variant = "muted", children, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs transition-colors ${variantClass[variant]} ${className}`}>
      {children}
    </span>
  );
}

// Order status badge with semantic color mapping
export function OrderStatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    PENDING:    "warning",
    CONFIRMED:  "primary",
    PROCESSING: "primary",
    SHIPPED:    "success",
    DELIVERED:  "success",
    CANCELLED:  "error",
    RETURNED:   "error",
  };
  const variant = map[status] ?? "muted";
  return <Badge variant={variant}>{status}</Badge>;
}

// Reward status badge
export function RewardStatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    LOCKED:    "muted",
    AVAILABLE: "success",
    CLAIMED:   "primary",
    EXPIRED:   "error",
  };
  const variant = map[status] ?? "muted";
  return <Badge variant={variant}>{status}</Badge>;
}
