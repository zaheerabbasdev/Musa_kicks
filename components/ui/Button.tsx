"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "whatsapp";
type Size = "sm" | "md" | "lg" | "xl" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  icon?: IconDefinition;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  href?: string;
  as?: "button" | "a";
}

const variantClass: Record<Variant, string> = {
  primary:   "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost:     "btn btn-ghost",
  danger:    "btn btn-primary" + " !bg-[var(--error)] !border-[var(--error)] hover:!bg-red-700",
  whatsapp:  "btn btn-whatsapp",
};

const sizeClass: Record<Size, string> = {
  sm:   "btn-sm",
  md:   "",
  lg:   "btn-lg",
  xl:   "btn-xl",
  icon: "btn-icon",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = [
      variantClass[variant],
      sizeClass[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        {isLoading && <FontAwesomeIcon icon={faSpinner} spin className="w-4 h-4" />}
        {!isLoading && icon && iconPosition === "left" && (
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        )}
        {children && <span>{children}</span>}
        {!isLoading && icon && iconPosition === "right" && (
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        )}
      </>
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
