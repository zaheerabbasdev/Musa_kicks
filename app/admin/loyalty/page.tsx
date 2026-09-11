import type { Metadata } from "next";
import { prisma } from "@/lib/db/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Loyalty Program — Admin",
};

export default async function AdminLoyaltyPage() {
  const cycles = await prisma.loyaltyCycle.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
          rewards: { select: { id: true, status: true, title: true } },
        },
      },
    },
  });

  const totalCycles = cycles.length;
  const completedCycles = cycles.filter((c) => c.status === "COMPLETED").length;
  const activeCycles = cycles.filter((c) => c.status === "ACTIVE").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold">Loyalty Rewards Management</h1>
        <p style={{ color: "var(--muted-foreground)" }}>
          Monitor customer shoe purchase loyalty streaks, unlocks, and claim fulfillment
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card p-5">
          <p className="text-xs text-text-muted font-bold uppercase tracking-wider">
            Active Cycles
          </p>
          <p className="text-2xl font-black mt-2 text-accent">{activeCycles}</p>
        </div>

        <div className="card p-5">
          <p className="text-xs text-text-muted font-bold uppercase tracking-wider">
            Completed Cycles
          </p>
          <p className="text-2xl font-black mt-2 text-success">{completedCycles}</p>
        </div>

        <div className="card p-5">
          <p className="text-xs text-text-muted font-bold uppercase tracking-wider">
            Total Cycles Recorded
          </p>
          <p className="text-2xl font-black mt-2">{totalCycles}</p>
        </div>
      </div>

      {/* Cycles Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Cycle Progress</th>
                <th>Status</th>
                <th>Rewards Earned</th>
                <th>Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {cycles.map((c) => {
                const hasClaimed = c.user.rewards.some((r) => r.status === "CLAIMED");
                const hasAvailable = c.user.rewards.some((r) => r.status === "AVAILABLE");

                return (
                  <tr key={c.id} className="hover:bg-surface-2/50 transition-colors">
                    <td>
                      <p className="font-bold text-sm">{c.user.name || "Customer"}</p>
                      <p className="text-xs text-text-muted">{c.user.email}</p>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-surface-2 rounded-full h-2 overflow-hidden border border-border">
                          <div
                            className="bg-accent h-full rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                (c.purchaseCount / c.requiredCount) * 100
                              )}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold">
                          {c.purchaseCount} / {c.requiredCount}
                        </span>
                      </div>
                    </td>
                    <td>
                      {c.status === "COMPLETED" ? (
                        <span className="badge badge-success text-xs">Completed</span>
                      ) : (
                        <span className="badge badge-secondary text-xs">Active</span>
                      )}
                    </td>
                    <td>
                      {hasClaimed ? (
                        <span className="badge badge-success text-xs">Claimed</span>
                      ) : hasAvailable ? (
                        <span className="badge badge-warning text-xs">Available</span>
                      ) : (
                        <span className="text-xs text-text-muted">—</span>
                      )}
                    </td>
                    <td className="text-xs text-text-muted">
                      {new Date(c.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
