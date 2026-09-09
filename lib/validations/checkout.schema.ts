import { z } from "zod";

export const addressSchema = z.object({
  label: z.string().default("Home"),
  recipientName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number is required"),
  line1: z.string().min(5, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  postalCode: z.string().optional(),
  country: z.string().default("Pakistan"),
  isDefault: z.boolean().default(false),
});

export const checkoutSchema = z.object({
  guestName: z.string().min(2, "Name is required"),
  guestEmail: z.string().email("Valid email required").optional().or(z.literal("")),
  guestPhone: z.string().min(10, "Phone is required"),
  address: addressSchema,
  notes: z.string().max(500).optional(),
});

export type AddressInput = z.infer<typeof addressSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
