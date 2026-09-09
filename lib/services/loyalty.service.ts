/**
 * Loyalty Service
 * Manages loyalty cycles, purchase counting, and reward creation.
 * Only DELIVERED orders count toward loyalty.
 */
import { prisma } from "@/lib/db/prisma";
import { getSettings } from "./settings.service";

export async function getActiveLoyaltyCycle(userId: string) {
  return prisma.loyaltyCycle.findFirst({
    where: { userId, status: "ACTIVE" },
    include: { purchases: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getLoyaltySummary(userId: string) {
  const cycle = await getActiveLoyaltyCycle(userId);
  const rewards = await prisma.reward.findMany({
    where: { customerId: userId },
    orderBy: { createdAt: "desc" },
  });

  const settings = await getSettings();
  const required = settings.loyaltyRequiredPurchases ?? 4;

  return {
    currentCycle: cycle,
    purchaseCount: cycle?.purchaseCount ?? 0,
    requiredCount: cycle?.requiredCount ?? required,
    rewards,
    availableRewards: rewards.filter((r) => r.status === "AVAILABLE"),
  };
}

/**
 * Called when an order status becomes DELIVERED.
 * Increments loyalty count and creates a reward if threshold is reached.
 */
export async function processLoyaltyForDeliveredOrder(
  userId: string,
  orderId: string
) {
  const settings = await getSettings();
  const required = settings.loyaltyRequiredPurchases ?? 4;
  const rewardTitle = settings.loyaltyRewardTitle ?? "Special Musa Kicks Gift";
  const rewardDescription = settings.loyaltyRewardDescription ?? "You've earned a special gift!";
  const expirationDays = settings.loyaltyRewardExpirationDays;

  return prisma.$transaction(async (tx) => {
    // 1. Get or create active cycle
    let cycle = await tx.loyaltyCycle.findFirst({
      where: { userId, status: "ACTIVE" },
    });

    if (!cycle) {
      cycle = await tx.loyaltyCycle.create({
        data: { userId, purchaseCount: 0, requiredCount: required, status: "ACTIVE" },
      });
    }

    // 2. Check if this order was already counted
    const alreadyCounted = await tx.loyaltyPurchase.findUnique({
      where: { cycleId_orderId: { cycleId: cycle.id, orderId } },
    });

    if (alreadyCounted) return { cycle, rewardCreated: false };

    // 3. Add the purchase
    await tx.loyaltyPurchase.create({
      data: { cycleId: cycle.id, orderId },
    });

    const newCount = cycle.purchaseCount + 1;

    // 4. Update the cycle
    const updatedCycle = await tx.loyaltyCycle.update({
      where: { id: cycle.id },
      data: {
        purchaseCount: newCount,
        ...(newCount >= cycle.requiredCount && {
          status: "COMPLETED",
          completedAt: new Date(),
        }),
      },
    });

    // 5. Create reward if threshold reached
    let rewardCreated = false;
    if (newCount >= cycle.requiredCount) {
      const expiresAt = expirationDays
        ? new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000)
        : null;

      await tx.reward.create({
        data: {
          customerId: userId,
          title: rewardTitle,
          description: rewardDescription,
          status: "AVAILABLE",
          expiresAt,
        },
      });
      rewardCreated = true;
    }

    return { cycle: updatedCycle, rewardCreated };
  });
}

/**
 * Claim a reward. Creates a new loyalty cycle after claiming.
 * Prevents double-claiming.
 */
export async function claimReward(userId: string, rewardId: string) {
  return prisma.$transaction(async (tx) => {
    const reward = await tx.reward.findUnique({ where: { id: rewardId } });

    if (!reward) throw new Error("Reward not found");
    if (reward.customerId !== userId) throw new Error("Unauthorized");
    if (reward.status !== "AVAILABLE") throw new Error("Reward is not available");

    // Check expiry
    if (reward.expiresAt && reward.expiresAt < new Date()) {
      await tx.reward.update({ where: { id: rewardId }, data: { status: "EXPIRED" } });
      throw new Error("Reward has expired");
    }

    // Mark as claimed
    const updatedReward = await tx.reward.update({
      where: { id: rewardId },
      data: { status: "CLAIMED", claimedAt: new Date() },
    });

    // Start a new loyalty cycle for the user
    const settings = await getSettings();
    const required = settings.loyaltyRequiredPurchases ?? 4;

    await tx.loyaltyCycle.create({
      data: { userId, purchaseCount: 0, requiredCount: required, status: "ACTIVE" },
    });

    return updatedReward;
  });
}
