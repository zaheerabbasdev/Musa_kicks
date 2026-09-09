import { z } from "zod";

export const siteSettingsSchema = z.object({
  // Brand
  brandName: z.string().min(1),
  brandEmail: z.string().email(),
  brandPhone: z.string(),
  brandAddress: z.string(),

  // Store
  currency: z.string().default("PKR"),
  currencySymbol: z.string().default("Rs."),
  shippingFee: z.number().min(0),
  freeShippingThreshold: z.number().min(0),
  returnPeriodDays: z.number().int().min(0),

  // WhatsApp
  whatsappNumber: z.string().min(10, "WhatsApp number required"),
  whatsappOrderMessageTemplate: z.string(),

  // Loyalty
  loyaltyRequiredPurchases: z.number().int().min(1).default(4),
  loyaltyRewardTitle: z.string(),
  loyaltyRewardDescription: z.string(),
  loyaltyRewardExpirationDays: z.number().int().min(0).optional(),

  // Social
  socialInstagram: z.string().url().optional().or(z.literal("")),
  socialFacebook: z.string().url().optional().or(z.literal("")),
  socialTwitter: z.string().url().optional().or(z.literal("")),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
