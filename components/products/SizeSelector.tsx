"use client";

interface SizeSelectorProps {
  sizes: { size: string; stock: number }[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
}

export function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold">Size</span>
        {selectedSize && (
          <span className="text-sm text-[var(--muted-foreground)]">Selected: EU {selectedSize}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map(({ size, stock }) => {
          const isSelected = selectedSize === size;
          const isOutOfStock = stock === 0;
          return (
            <button
              key={size}
              onClick={() => !isOutOfStock && onSelect(size)}
              disabled={isOutOfStock}
              className={`relative w-12 h-12 rounded-[var(--radius-md)] text-sm font-medium border transition-all duration-150 ${
                isSelected
                  ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : isOutOfStock
                  ? "border-[var(--border)] text-[var(--muted-foreground)] opacity-40 cursor-not-allowed"
                  : "border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              }`}
              aria-label={`Size ${size}${isOutOfStock ? " - Out of stock" : ""}`}
              aria-pressed={isSelected}
            >
              {size}
              {isOutOfStock && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="absolute w-full h-px rotate-45"
                    style={{ background: "var(--border-strong)" }}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
