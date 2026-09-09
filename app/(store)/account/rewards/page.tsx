import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth/session";
import { getLoyaltySummary } from "@/lib/services/loyalty.service";
import { LoyaltyProgress } from "@/components/loyalty/LoyaltyProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faCheckCircle, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = {
  title: "Loyalty Rewards — Musa Kicks",
};

export default async function CustomerRewardsPage() {
  const user = await requireAuth("/account/rewards");
  const loyaltySummary = await getLoyaltySummary(user.id);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Musa Kicks Loyalty Program</h2>
        <p className="text-sm text-text-muted mt-1">
          Every eligible purchase brings you closer to exclusive brand rewards and gifts.
        </p>
      </div>

      <div>
        <LoyaltyProgress
          purchaseCount={loyaltySummary.purchaseCount}
          requiredCount={loyaltySummary.requiredCount}
        />
      </div>

      {/* Program rules */}
      <div className="card p-6 space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <FontAwesomeIcon icon={faQuestionCircle} className="text-accent" />
          <span>How It Works</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-surface-2 space-y-2">
            <span className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-sm">
              1
            </span>
            <h4 className="font-bold text-sm">Shop Kicks</h4>
            <p className="text-xs text-text-muted">
              Place orders directly through our website or WhatsApp catalog.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-2 space-y-2">
            <span className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-sm">
              2
            </span>
            <h4 className="font-bold text-sm">Deliver & Confirm</h4>
            <p className="text-xs text-text-muted">
              Each successfully delivered order advances your loyalty progress bar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-2 space-y-2">
            <span className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-sm">
              3
            </span>
            <h4 className="font-bold text-sm">Claim Gift</h4>
            <p className="text-xs text-text-muted">
              Reach 4 orders to unlock your special reward gift and start a new cycle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
