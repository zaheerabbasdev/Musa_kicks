import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: IconDefinition;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon = faBoxOpen,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: "var(--muted)" }}
      >
        <FontAwesomeIcon
          icon={icon}
          className="w-7 h-7"
          style={{ color: "var(--muted-foreground)" }}
        />
      </div>
      <h3
        className="text-lg font-semibold font-display mb-2"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </h3>
      {description && (
        <p className="max-w-sm" style={{ color: "var(--muted-foreground)" }}>
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
