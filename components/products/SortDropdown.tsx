"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  options: SortOption[];
  currentSort: string;
}

function SortDropdownInner({ options, currentSort }: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faSort} className="w-4 h-4 text-[var(--muted-foreground)]" />
      <select
        className="input text-sm py-2 w-auto"
        value={currentSort}
        onChange={handleSortChange}
        aria-label="Sort products"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SortDropdown(props: SortDropdownProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faSort} className="w-4 h-4 text-[var(--muted-foreground)]" />
          <select className="input text-sm py-2 w-auto" defaultValue={props.currentSort} disabled>
            {props.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      }
    >
      <SortDropdownInner {...props} />
    </Suspense>
  );
}
