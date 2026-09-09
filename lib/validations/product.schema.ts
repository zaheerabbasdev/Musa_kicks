import { z } from "zod";

const variantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  colorHex: z.string().optional(),
  sku: z.string().min(1, "SKU is required"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
});

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  sku: z.string().min(1, "SKU is required").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().max(500).optional(),
  price: z.number().positive("Price must be greater than 0"),
  compareAtPrice: z.number().positive().optional().nullable(),
  categoryId: z.string().min(1, "Category is required"),
  isFeatured: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isActive: z.boolean().default(true),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

export const categorySchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
