import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionCardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function SectionCard({ title, description, children, className }: SectionCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-panel p-5 shadow-panel", className)}>
      {(title || description) && (
        <div className="mb-4 space-y-1">
          {title ? <h2 className="text-lg font-semibold text-ink">{title}</h2> : null}
          {description ? <p className="text-sm text-muted">{description}</p> : null}
        </div>
      )}
      {children}
    </div>
  );
}
