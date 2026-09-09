/**
 * Site Settings Service
 * Settings are stored as key-value pairs in SiteSettings table.
 */
import { prisma } from "@/lib/db/prisma";
import type { SiteSettingsMap } from "@/types";

const DEFAULT_SETTINGS: SiteSettingsMap = {
  brandName: "Musa Kicks",
  brandEmail: "hello@musakicks.com",
  brandPhone: "+92300000000",
  brandAddress: "Islamabad, Pakistan",
  whatsappNumber: "+92300000000",
  whatsappOrderMessageTemplate: "Hello Musa Kicks,\n\nI would like to place an order.\n\n{orderDetails}\n\nThank you.",
  shippingFee: 200,
  freeShippingThreshold: 5000,
  loyaltyRequiredPurchases: 4,
  loyaltyRewardTitle: "Special Musa Kicks Gift",
  loyaltyRewardDescription: "Congratulations! You've earned a special gift from Musa Kicks. Contact us on WhatsApp to claim your reward.",
  currency: "PKR",
  currencySymbol: "Rs.",
  returnPeriodDays: 7,
};

export async function getSettings(): Promise<SiteSettingsMap> {
  const rows = await prisma.siteSettings.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return {
    ...DEFAULT_SETTINGS,
    brandName: map.brandName ?? DEFAULT_SETTINGS.brandName,
    brandEmail: map.brandEmail ?? DEFAULT_SETTINGS.brandEmail,
    brandPhone: map.brandPhone ?? DEFAULT_SETTINGS.brandPhone,
    brandAddress: map.brandAddress ?? DEFAULT_SETTINGS.brandAddress,
    whatsappNumber: map.whatsappNumber ?? DEFAULT_SETTINGS.whatsappNumber,
    whatsappOrderMessageTemplate: map.whatsappOrderMessageTemplate ?? DEFAULT_SETTINGS.whatsappOrderMessageTemplate,
    shippingFee: Number(map.shippingFee ?? DEFAULT_SETTINGS.shippingFee),
    freeShippingThreshold: Number(map.freeShippingThreshold ?? DEFAULT_SETTINGS.freeShippingThreshold),
    loyaltyRequiredPurchases: Number(map.loyaltyRequiredPurchases ?? DEFAULT_SETTINGS.loyaltyRequiredPurchases),
    loyaltyRewardTitle: map.loyaltyRewardTitle ?? DEFAULT_SETTINGS.loyaltyRewardTitle,
    loyaltyRewardDescription: map.loyaltyRewardDescription ?? DEFAULT_SETTINGS.loyaltyRewardDescription,
    loyaltyRewardExpirationDays: map.loyaltyRewardExpirationDays ? Number(map.loyaltyRewardExpirationDays) : undefined,
    currency: map.currency ?? DEFAULT_SETTINGS.currency,
    currencySymbol: map.currencySymbol ?? DEFAULT_SETTINGS.currencySymbol,
    returnPeriodDays: Number(map.returnPeriodDays ?? DEFAULT_SETTINGS.returnPeriodDays),
    socialInstagram: map.socialInstagram,
    socialFacebook: map.socialFacebook,
    socialTwitter: map.socialTwitter,
    logoUrl: map.logoUrl,
    logoPublicId: map.logoPublicId,
    faviconUrl: map.faviconUrl,
    faviconPublicId: map.faviconPublicId,
  };
}

export async function setSetting(key: string, value: string) {
  return prisma.siteSettings.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function setSettings(settings: Partial<Record<string, string>>) {
  const ops = Object.entries(settings).map(([key, value]) =>
    prisma.siteSettings.upsert({
      where: { key },
      update: { value: value! },
      create: { key, value: value! },
    })
  );
  return prisma.$transaction(ops);
}
