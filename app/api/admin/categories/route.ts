import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import slugify from "slugify";
import { categorySchema } from "@/lib/validations/product.schema";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const input = await request.json();
    const slug = slugify(String(input.name ?? ""), { lower: true, strict: true });
    const parsed = categorySchema.safeParse({
      ...input,
      slug,
      sortOrder: Number(input.sortOrder ?? 0),
      isActive: input.isActive ?? true,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "Invalid category data" },
        { status: 400 }
      );
    }

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { message: "A category with this name already exists." },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({
      data: { ...parsed.data, slug },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json({ message: "Failed to create category" }, { status: 500 });
  }
}
