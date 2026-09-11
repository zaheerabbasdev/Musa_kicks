import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { getSettings } from "@/lib/services/settings.service";

export const metadata: Metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const sessionUser = await requireAuth("/account/profile");
  const [user, settings] = await Promise.all([prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      name: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  }), getSettings()]);

  if (!user) {
    throw new Error("Authenticated user could not be found.");
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">My Profile</h2>
        <p className="text-sm text-text-muted mt-1">
          Review the personal information connected to your {settings.brandName} account.
        </p>
      </div>

      <section className="card p-6">
        <dl className="divide-y divide-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-4 first:pt-0">
            <dt className="text-sm font-semibold text-text-muted">Full name</dt>
            <dd className="sm:col-span-2 text-sm font-medium">{user.name}</dd>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-4">
            <dt className="text-sm font-semibold text-text-muted">Email address</dt>
            <dd className="sm:col-span-2 text-sm font-medium">{user.email}</dd>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-4">
            <dt className="text-sm font-semibold text-text-muted">Phone number</dt>
            <dd className="sm:col-span-2 text-sm font-medium">{user.phone ?? "Not provided"}</dd>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-4 last:pb-0">
            <dt className="text-sm font-semibold text-text-muted">Member since</dt>
            <dd className="sm:col-span-2 text-sm font-medium">
              {user.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
