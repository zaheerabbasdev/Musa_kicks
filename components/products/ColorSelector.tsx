"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface ColorSelectorProps {
  colors: { color: string; colorHex?: string | null; stock: number }[];
  selectedColor: string | null;
  onSelect: (color: string) => void;
}

const namedColors: Record<string, string> = {
  black: "#000000",
  white: "#ffffff",
  blue: "#2563eb",
  red: "#dc2626",
  green: "#16a34a",
  yellow: "#facc15",
  orange: "#f97316",
  brown: "#92400e",
  beige: "#d6c2a1",
  gray: "#9ca3af",
  grey: "#9ca3af",
  purple: "#9333ea",
  pink: "#ec4899",
  navy: "#1e3a8a",
  maroon: "#7f1d1d",
};

function getColorValue(color: string, colorHex?: string | null) {
  if (colorHex) return colorHex;
  const normalizedColor = color.trim().toLowerCase();
  return namedColors[normalizedColor] ?? normalizedColor;
}

export function ColorSelector({ colors, selectedColor, onSelect }: ColorSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Color</span>
        {selectedColor && (
          <span className="text-sm text-[var(--muted-foreground)]">{selectedColor}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map(({ color, colorHex, stock }) => {
          const isSelected = selectedColor === color;
          const isOutOfStock = stock === 0;
          return (
            <button
              key={color}
              onClick={() => !isOutOfStock && onSelect(color)}
              disabled={isOutOfStock}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-150 ${
                isSelected
                  ? "border-[var(--primary)] scale-110"
                  : "border-transparent hover:border-[var(--border-strong)]"
              } ${isOutOfStock ? "opacity-40 cursor-not-allowed" : ""}`}
              style={{
                background: getColorValue(color, colorHex),
                borderColor: color.trim().toLowerCase() === "white" ? "#d1d5db" : undefined,
                boxShadow: isSelected ? "0 0 0 2px var(--background), 0 0 0 4px var(--primary)" : undefined,
              }}
              title={`${color}${isOutOfStock ? " (Out of stock)" : ""}`}
              aria-label={`${color}${isOutOfStock ? " - Out of stock" : ""}`}
              aria-pressed={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
}

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (qty: number) => void;
}

export function QuantitySelector({ value, min = 1, max = 99, onChange }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold mr-1">Qty</span>
      <div
        className="flex items-center border border-[var(--border)] rounded-[var(--radius-md)] overflow-hidden"
      >
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-10 h-10 flex items-center justify-center hover:bg-[var(--muted)] transition-colors disabled:opacity-40"
          aria-label="Decrease quantity"
        >
          <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
        </button>
        <span
          className="w-12 text-center text-sm font-medium border-x border-[var(--border)]"
          style={{ lineHeight: "2.5rem" }}
          aria-live="polite"
          aria-label={`Quantity: ${value}`}
        >
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-10 h-10 flex items-center justify-center hover:bg-[var(--muted)] transition-colors disabled:opacity-40"
          aria-label="Increase quantity"
        >
          <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
