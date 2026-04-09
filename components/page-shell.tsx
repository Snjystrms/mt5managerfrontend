import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
        <p className="max-w-3xl text-sm text-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}
