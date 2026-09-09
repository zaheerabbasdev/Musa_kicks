import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  redirect(`/shop?category=${category}`);
}
