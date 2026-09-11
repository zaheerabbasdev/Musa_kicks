import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { siteConfig } from "@/config/site";
import { auth } from "@/auth";
import { getSettings } from "@/lib/services/settings.service";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display-modern",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings().catch(() => null);
  const storeName = settings?.brandName ?? siteConfig.name;

  return {
    title: {
      template: `%s | ${storeName}`,
      default: `${storeName} — ${siteConfig.tagline}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      siteName: storeName,
      title: `${storeName} — ${siteConfig.tagline}`,
      description: siteConfig.description,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable}`}>
      <body className="antialiased selection:bg-neutral-900 selection:text-white">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
