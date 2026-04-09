"use client";

import { useEffect, useState } from "react";

import { JsonViewer } from "@/components/json-viewer";
import { KeyValueTable } from "@/components/key-value-table";
import { PageShell } from "@/components/page-shell";
import { RequestState } from "@/components/request-state";
import { SectionCard } from "@/components/section-card";
import { apiRequest } from "@/lib/api";
import { isRecord } from "@/lib/utils";

type DashboardState = {
  live: unknown;
  ready: unknown;
  connection: unknown;
  manager: unknown;
};

const initialState: DashboardState = {
  live: null,
  ready: null,
  connection: null,
  manager: null
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardState>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadDashboard() {
    setLoading(true);
    setError(null);

    try {
      const [live, ready, connection, manager] = await Promise.all([
        apiRequest("/health/live"),
        apiRequest("/health/ready"),
        apiRequest("/connection"),
        apiRequest("/manager")
      ]);

      setData({ live, ready, connection, manager });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  return (
    <PageShell
      title="Dashboard"
      description="Quick checks for backend health, connection status, and manager information."
    >
      <div className="flex justify-end">
        <button
          onClick={() => void loadDashboard()}
          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Refresh Dashboard
        </button>
      </div>

      <RequestState loading={loading} error={error} />

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Live Health" description="GET /health/live">
          <JsonViewer data={data.live} emptyMessage="No live health response yet." />
        </SectionCard>

        <SectionCard title="Ready Health" description="GET /health/ready">
          <JsonViewer data={data.ready} emptyMessage="No ready health response yet." />
        </SectionCard>

        <SectionCard title="Connection Info" description="GET /connection">
          {isRecord(data.connection) ? (
            <KeyValueTable data={data.connection} />
          ) : (
            <JsonViewer data={data.connection} emptyMessage="No connection response yet." />
          )}
        </SectionCard>

        <SectionCard title="Manager Info" description="GET /manager">
          {isRecord(data.manager) ? (
            <KeyValueTable data={data.manager} />
          ) : (
            <JsonViewer data={data.manager} emptyMessage="No manager response yet." />
          )}
        </SectionCard>
      </div>
    </PageShell>
  );
}
