"use client";

import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  hideCloseButton?: boolean;
}

const sizeClass = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  hideCloseButton = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 overlay visible"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={`relative w-full ${sizeClass[size]} bg-[var(--card)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)] animate-scale-in max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        {(title || !hideCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold font-display">
                {title}
              </h2>
            )}
            {!hideCloseButton && (
              <button
                onClick={onClose}
                className="btn btn-ghost btn-icon ml-auto"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// Confirm Dialog
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "primary";
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  const btnClass =
    variant === "danger"
      ? "btn btn-primary !bg-[var(--error)] !border-[var(--error)]"
      : variant === "warning"
      ? "btn btn-primary !bg-[var(--warning)] !border-[var(--warning)]"
      : "btn btn-primary";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-[var(--muted-foreground)] mb-6">{description}</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onClose} className="btn btn-secondary" disabled={isLoading}>
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className={btnClass}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
