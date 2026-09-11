"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface ProductColorContextValue {
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
}

const ProductColorContext = createContext<ProductColorContextValue | null>(null);

export function ProductColorProvider({ children }: { children: ReactNode }) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const value = useMemo(() => ({ selectedColor, setSelectedColor }), [selectedColor]);
  return <ProductColorContext.Provider value={value}>{children}</ProductColorContext.Provider>;
}

export function useProductColor() {
  const context = useContext(ProductColorContext);
  if (!context) throw new Error("useProductColor must be used inside ProductColorProvider");
  return context;
}
