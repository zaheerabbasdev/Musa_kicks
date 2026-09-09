/**
 * Server-side session helpers
 */
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getSession() {
  return await auth();
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

export async function requireAuth(callbackUrl?: string) {
  const session = await getSession();
  if (!session?.user) {
    const url = callbackUrl ? `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/auth/login";
    redirect(url);
  }
  return session.user;
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }
  return session.user;
}

export function isAdmin(role?: string) {
  return role === "ADMIN";
}
