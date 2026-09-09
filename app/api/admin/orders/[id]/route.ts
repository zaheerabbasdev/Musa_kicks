import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { updateOrderStatus } from "@/lib/services/order.service";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await request.json();

    const updated = await updateOrderStatus(id, status);

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update order status" },
      { status: 500 }
    );
  }
}
