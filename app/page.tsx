"use client";

import { useEffect, useState } from "react";

import { JsonViewer } from "@/components/json-viewer";
import { PageShell } from "@/components/page-shell";
import { RequestState } from "@/components/request-state";
import { SectionCard } from "@/components/section-card";
import { apiRequest } from "@/lib/api";

export default function DashboardPage() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadHealth() {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest("/health");
      setData(response);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to load health.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadHealth();
  }, []);

  return (
    <PageShell
      title="Health"
      description="Quick tester for the current GET /health endpoint exposed by the backend."
    >
      <div className="flex justify-end">
        <button
          onClick={() => void loadHealth()}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Refresh Health
        </button>
      </div>

      <RequestState loading={loading} error={error} />

      <SectionCard title="Health Response" description="GET /health">
        <JsonViewer data={data} emptyMessage="No health response yet." />
      </SectionCard>
    </PageShell>
  );
}
