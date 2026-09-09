import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { claimReward } from "@/lib/services/loyalty.service";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { rewardId } = await request.json();
  if (!rewardId) {
    return NextResponse.json({ error: "rewardId required" }, { status: 400 });
  }

  try {
    const reward = await claimReward(session.user.id, rewardId);
    return NextResponse.json({ success: true, reward });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to claim reward";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
