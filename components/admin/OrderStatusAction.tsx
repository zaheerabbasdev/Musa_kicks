"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED";

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  PENDING: "CONFIRMED",
  CONFIRMED: "PROCESSING",
  PROCESSING: "SHIPPED",
  SHIPPED: "DELIVERED",
};

interface OrderStatusActionProps {
  orderId: string;
  status: OrderStatus;
}

export function OrderStatusAction({ orderId, status }: OrderStatusActionProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const nextStatus = NEXT_STATUS[status];

  if (!nextStatus) return null;

  const handleAdvance = async () => {
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Failed to update order status");
      }

      router.refresh();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Failed to update order status");
      setIsUpdating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAdvance}
      disabled={isUpdating}
      className="btn btn-primary btn-sm gap-1.5"
      title={`Move order to ${nextStatus}`}
    >
      <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
      <span>{isUpdating ? "Updating..." : nextStatus}</span>
    </button>
  );
}
