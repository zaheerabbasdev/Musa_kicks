"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faCheckCircle, faLock } from "@fortawesome/free-solid-svg-icons";

interface LoyaltyProgressProps {
  purchaseCount: number;
  requiredCount: number;
  showLabel?: boolean;
}

export function LoyaltyProgress({
  purchaseCount,
  requiredCount,
  showLabel = true,
}: LoyaltyProgressProps) {
  const isComplete = purchaseCount >= requiredCount;

  return (
    <div>
      {showLabel && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold">Loyalty Progress</span>
          <span className="text-sm text-[var(--muted-foreground)]">
            {Math.min(purchaseCount, requiredCount)} / {requiredCount} purchases
          </span>
        </div>
      )}

      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: requiredCount }).map((_, i) => {
          const filled = i < purchaseCount;
          return (
            <div key={i} className="flex items-center">
              <div
                className={`loyalty-dot ${filled ? "filled" : ""} ${isComplete ? "completed" : ""}`}
              />
              {i < requiredCount - 1 && (
                <div
                  className="flex-1 h-0.5 w-6 mx-0.5 transition-all duration-500"
                  style={{
                    background: filled && i < purchaseCount - 1
                      ? "var(--primary)"
                      : "var(--border)",
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Gift icon at end */}
        <div
          className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
            isComplete
              ? "bg-[#2D6A4F] text-white scale-110"
              : "bg-[var(--muted)] text-[var(--muted-foreground)]"
          }`}
        >
          <FontAwesomeIcon
            icon={isComplete ? faGift : faLock}
            className="w-4 h-4"
          />
        </div>
      </div>

      {isComplete && (
        <div
          className="mt-3 flex items-center gap-2 text-sm font-medium animate-slide-up"
          style={{ color: "#2D6A4F" }}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4" />
          Special Gift Unlocked! 🎁
        </div>
      )}

      {!isComplete && (
        <p className="text-xs text-[var(--muted-foreground)] mt-2">
          {requiredCount - Math.min(purchaseCount, requiredCount)} more purchase
          {requiredCount - purchaseCount !== 1 ? "s" : ""} to unlock your special gift
        </p>
      )}
    </div>
  );
}

interface RewardCardProps {
  title: string;
  description: string;
  status: "LOCKED" | "AVAILABLE" | "CLAIMED" | "EXPIRED";
  claimedAt?: Date | null;
  expiresAt?: Date | null;
  onClaim?: () => void;
  isClaiming?: boolean;
}

export function RewardCard({
  title,
  description,
  status,
  claimedAt,
  expiresAt,
  onClaim,
  isClaiming = false,
}: RewardCardProps) {
  const statusConfig = {
    LOCKED: { color: "var(--muted-foreground)", bg: "var(--muted)", label: "Locked" },
    AVAILABLE: { color: "#2D6A4F", bg: "#D8F3DC", label: "Available to Claim" },
    CLAIMED: { color: "var(--muted-foreground)", bg: "var(--muted)", label: "Claimed" },
    EXPIRED: { color: "var(--error)", bg: "var(--error-bg)", label: "Expired" },
  };

  const config = statusConfig[status];

  return (
    <div
      className="card p-5 flex flex-col gap-3"
      style={status === "AVAILABLE" ? { borderColor: "#2D6A4F" } : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: config.bg }}
        >
          <FontAwesomeIcon
            icon={faGift}
            className="w-5 h-5"
            style={{ color: config.color }}
          />
        </div>
        <span
          className="text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full"
          style={{ background: config.bg, color: config.color }}
        >
          {config.label}
        </span>
      </div>

      <div>
        <h4 className="font-semibold font-display mb-1">{title}</h4>
        <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
      </div>

      {expiresAt && status === "AVAILABLE" && (
        <p className="text-xs text-[var(--warning)]">
          Expires: {new Date(expiresAt).toLocaleDateString("en-PK")}
        </p>
      )}

      {claimedAt && (
        <p className="text-xs text-[var(--muted-foreground)]">
          Claimed on: {new Date(claimedAt).toLocaleDateString("en-PK")}
        </p>
      )}

      {status === "AVAILABLE" && onClaim && (
        <button
          onClick={onClaim}
          disabled={isClaiming}
          className="btn btn-primary btn-sm w-full justify-center mt-1"
          style={{ background: "#2D6A4F", borderColor: "#2D6A4F" }}
        >
          <FontAwesomeIcon icon={faGift} className="w-3.5 h-3.5" />
          {isClaiming ? "Claiming..." : "Claim Reward"}
        </button>
      )}
    </div>
  );
}
