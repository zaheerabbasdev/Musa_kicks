"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { SizeSelector } from "@/components/products/SizeSelector";
import { ColorSelector, QuantitySelector } from "@/components/products/ColorSelector";
import { useCartStore } from "@/store/cart.store";
import type { ProductWithImages } from "@/types";
import { toast } from "react-toastify";

interface AddToCartProps {
  product: ProductWithImages;
  currencySymbol: string;
  whatsappNumber: string;
  brandName: string;
  shippingFee: number;
  freeShippingThreshold: number;
}

export function AddToCartSection({
  product,
  currencySymbol,
  whatsappNumber,
  brandName,
  shippingFee,
  freeShippingThreshold,
}: AddToCartProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // Get unique colors
  const colors = [
    ...new Map(product.variants.map((v) => [v.color, { color: v.color, colorHex: v.colorHex }])).values(),
  ];

  // Get sizes for selected color (or all sizes if no color selected)
  const sizesForColor = product.variants
    .filter((v) => !selectedColor || v.color === selectedColor)
    .reduce((acc, v) => {
      const existing = acc.find((s) => s.size === v.size);
      if (existing) {
        existing.stock += v.stock;
      } else {
        acc.push({ size: v.size, stock: v.stock });
      }
      return acc;
    }, [] as { size: string; stock: number }[]);

  // Get the matched variant
  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const maxStock = selectedVariant?.stock ?? 1;
  const inStock = product.variants.some((v) => v.stock > 0);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor || !selectedVariant) {
      toast.error(!selectedColor ? "Please select a color" : "Please select a size");
      return;
    }
    if (selectedVariant.stock < quantity) {
      toast.error("Not enough stock available");
      return;
    }

    addItem({
      id: `${product.id}-${selectedVariant.id}`,
      productId: product.id,
      variantId: selectedVariant.id,
      productName: product.name,
      size: selectedSize,
      color: selectedColor,
      price: Number(product.price),
      quantity,
      imageUrl: product.images[0]?.imageUrl,
      slug: product.slug,
      stock: selectedVariant.stock,
    });

    setAddedFeedback(true);
    toast.success(`${product.name} added to your cart.`);
    setTimeout(() => setAddedFeedback(false), 2000);
    openCart();
  };

  const handleWhatsApp = () => {
    const price = Number(product.price);
    const total = price * quantity + shippingFee;
    const message = [
      `Hello ${brandName},`,
      "",
      "I'd like to order:",
      "",
      `Product: ${product.name}`,
      `Size: ${selectedSize ?? "—"}`,
      `Color: ${selectedColor ?? "—"}`,
      `Quantity: ${quantity}`,
      `Price: ${currencySymbol} ${(price * quantity).toLocaleString()}`,
      `Shipping: ${price * quantity >= freeShippingThreshold ? "Free" : `${currencySymbol} ${shippingFee.toLocaleString()}`}`,
      "",
      "Please confirm. Thank you! 🙏",
    ].join("\n");

    const phone = whatsappNumber.replace(/[\s\-\(\)]/g, "");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Color */}
      {colors.length > 0 && (
        <ColorSelector
          colors={colors.map((c) => ({
            ...c,
            stock: product.variants.filter((v) => v.color === c.color).reduce((s, v) => s + v.stock, 0),
          }))}
          selectedColor={selectedColor}
          onSelect={(c) => { setSelectedColor(c); setSelectedSize(null); }}
        />
      )}

      {/* Size */}
      {sizesForColor.length > 0 && (
        <SizeSelector
          sizes={sizesForColor}
          selectedSize={selectedSize}
          onSelect={setSelectedSize}
        />
      )}

      {/* Quantity */}
      {selectedVariant && (
        <div className="flex items-center gap-4">
          <QuantitySelector
            value={quantity}
            min={1}
            max={maxStock}
            onChange={setQuantity}
          />
          <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {maxStock} in stock
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="btn btn-primary btn-lg w-full justify-center"
          id="add-to-cart-btn"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />
          {addedFeedback ? "Added to Cart ✓" : inStock ? "Add to Cart" : "Out of Stock"}
        </button>

        <button
          onClick={handleWhatsApp}
          className="btn btn-whatsapp btn-lg w-full justify-center"
          id="whatsapp-direct-btn"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
          Order via WhatsApp
        </button>

        <button
          onClick={() => {
            const nextWishlisted = !isWishlisted;
            setIsWishlisted(nextWishlisted);
            toast.success(
              nextWishlisted ? "Added to your wishlist." : "Removed from your wishlist."
            );
          }}
          className="btn btn-secondary btn-lg w-full justify-center"
          id="wishlist-btn"
        >
          <FontAwesomeIcon icon={isWishlisted ? faHeartSolid : faHeartOutline} className="w-4 h-4" style={{ color: isWishlisted ? "var(--error)" : undefined }} />
          {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}
