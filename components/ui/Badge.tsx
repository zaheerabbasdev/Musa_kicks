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
  "new":         "badge badge-new",
  "best-seller": "badge badge-best-seller",
  "sale":        "badge badge-sale",
  "success":     "badge badge-success",
  "warning":     "badge badge-warning",
  "error":       "badge badge-error",
  "muted":       "badge badge-muted",
  "primary":     "badge",
  "secondary":   "badge",
};

export function Badge({ variant = "muted", children, className = "" }: BadgeProps) {
  return (
    <span className={`${variantClass[variant]} ${className}`}>
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
