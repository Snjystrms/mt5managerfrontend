"use client";

import { useState } from "react";

import { DataTable } from "@/components/data-table";
import { FormField } from "@/components/form-field";
import { JsonViewer } from "@/components/json-viewer";
import { PageShell } from "@/components/page-shell";
import { RequestState } from "@/components/request-state";
import { SectionCard } from "@/components/section-card";
import { apiRequest, buildQueryString } from "@/lib/api";
import { isRecord } from "@/lib/utils";

function extractRows(data: unknown, key: string) {
  if (isRecord(data) && Array.isArray(data[key])) {
    return data[key].filter(
      (item): item is Record<string, unknown> => typeof item === "object" && item !== null
    );
  }

  if (Array.isArray(data)) {
    return data.filter(
      (item): item is Record<string, unknown> => typeof item === "object" && item !== null
    );
  }

  return [];
}

export default function HistoryPage() {
  const [login, setLogin] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [history, setHistory] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchHistory() {
    if (!login.trim()) {
      setError("Enter a login before requesting account history.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const query = buildQueryString({
        from_dt: fromDate,
        to_dt: toDate
      });
      const response = await apiRequest(`/accounts/${login.trim()}/history${query}`);
      setHistory(response);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to fetch history.");
    } finally {
      setLoading(false);
    }
  }

  const deals = extractRows(history, "deals");
  const tradeLog = extractRows(history, "trade_log");

  return (
    <PageShell
      title="History"
      description="Inspect account history within a date range and review deals or trade log output."
    >
      <SectionCard
        title="History Request"
        description="GET /accounts/{login}/history?from_dt=...&to_dt=..."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            label="Login"
            name="login"
            value={login}
            onChange={setLogin}
            placeholder="123456"
          />
          <FormField
            label="From"
            name="from_dt"
            type="datetime-local"
            value={fromDate}
            onChange={setFromDate}
          />
          <FormField
            label="To"
            name="to_dt"
            type="datetime-local"
            value={toDate}
            onChange={setToDate}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => void fetchHistory()}
            className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Fetch History
          </button>
        </div>
        <div className="mt-4">
          <RequestState loading={loading} error={error} />
        </div>
      </SectionCard>

      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard title="Deals">
          <DataTable rows={deals} emptyMessage="No deals available yet." />
        </SectionCard>

        <SectionCard title="Trade Log">
          <DataTable rows={tradeLog} emptyMessage="No trade log available yet." />
        </SectionCard>
      </div>

      <SectionCard title="Raw History Response">
        <JsonViewer data={history} emptyMessage="No history response loaded yet." />
      </SectionCard>
    </PageShell>
  );
}
