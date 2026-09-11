import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const metadata: Metadata = {
  title: "Settings — Admin",
};

export default async function AdminSettingsPage() {
  const settingsRows = await prisma.siteSettings.findMany();
  const settingsMap: Record<string, string> = {};
  for (const s of settingsRows) {
    settingsMap[s.key] = s.value;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Store Configuration</h1>
        <p className="text-xs text-text-muted mt-0.5">
          Manage WhatsApp phone number, shipping costs, and store preferences
        </p>
      </div>

      <SettingsForm initialSettings={settingsMap} />
    </div>
  );
}
