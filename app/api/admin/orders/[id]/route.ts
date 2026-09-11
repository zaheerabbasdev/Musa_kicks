import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { advanceOrderStatus } from "@/lib/services/order.service";

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
    const updated = await advanceOrderStatus(id);

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update order status";
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
