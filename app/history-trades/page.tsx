"use client";

import { useState } from "react";

import { DataTable } from "@/components/data-table";
import { FormField } from "@/components/form-field";
import { JsonViewer } from "@/components/json-viewer";
import { KeyValueTable } from "@/components/key-value-table";
import { PageShell } from "@/components/page-shell";
import { RequestState } from "@/components/request-state";
import { SectionCard } from "@/components/section-card";
import { apiRequest, buildQueryString } from "@/lib/api";
import { isRecord } from "@/lib/utils";

export default function HistoryTradesPage() {
  const [login, setLogin] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTrades() {
    if (!login.trim()) {
      setError("Enter a login before requesting history trades.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apiRequest(
        `/history/trades${buildQueryString({
          login,
          from_dt: fromDate,
          to_dt: toDate
        })}`
      );
      setResponse(result);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to fetch trades.");
    } finally {
      setLoading(false);
    }
  }

  const items =
    isRecord(response) && Array.isArray(response.items)
      ? response.items.filter(
          (item): item is Record<string, unknown> => typeof item === "object" && item !== null
        )
      : [];

  const summary =
    isRecord(response)
      ? {
          login: response.login,
          from_dt: response.from_dt,
          to_dt: response.to_dt,
          count: response.count
        }
      : null;

  return (
    <PageShell
      title="History Trades"
      description="Query GET /history/trades with login and optional date range filters."
    >
      <SectionCard title="Request" description="GET /history/trades">
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            label="Login"
            name="login"
            type="number"
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
            onClick={() => void fetchTrades()}
            className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Fetch Trades
          </button>
        </div>
        <div className="mt-4">
          <RequestState loading={loading} error={error} />
        </div>
      </SectionCard>

      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard title="Summary">
          <KeyValueTable data={summary} emptyMessage="No history summary yet." />
        </SectionCard>
        <SectionCard title="Items">
          <DataTable rows={items} emptyMessage="No trade items yet." />
        </SectionCard>
      </div>

      <SectionCard title="Raw Response">
        <JsonViewer data={response} emptyMessage="No history trades response yet." />
      </SectionCard>
    </PageShell>
  );
}
