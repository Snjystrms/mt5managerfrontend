"use client";

import { useState } from "react";

import { DataTable } from "@/components/data-table";
import { FormField } from "@/components/form-field";
import { JsonViewer } from "@/components/json-viewer";
import { KeyValueTable } from "@/components/key-value-table";
import { PageShell } from "@/components/page-shell";
import { RequestState } from "@/components/request-state";
import { SectionCard } from "@/components/section-card";
import { apiRequest } from "@/lib/api";
import { isRecord } from "@/lib/utils";

function normalizeRows(input: unknown): Record<string, unknown>[] {
  if (Array.isArray(input)) {
    return input.filter(
      (item): item is Record<string, unknown> => typeof item === "object" && item !== null
    );
  }

  if (input && typeof input === "object") {
    return [input as Record<string, unknown>];
  }

  return [];
}

export default function AccountDetailPage() {
  const [login, setLogin] = useState("");
  const [account, setAccount] = useState<unknown>(null);
  const [positions, setPositions] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAccountDetail() {
    if (!login.trim()) {
      setError("Enter a login before loading account details.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const trimmedLogin = login.trim();
      const [accountResponse, positionsResponse] = await Promise.all([
        apiRequest(`/accounts/${trimmedLogin}`),
        apiRequest(`/accounts/${trimmedLogin}/positions`)
      ]);
      setAccount(accountResponse);
      setPositions(positionsResponse);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Failed to fetch account detail."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      title="Account Detail"
      description="Load account information together with open positions for a specific login."
    >
      <SectionCard title="Lookup" description="GET /accounts/{login} and GET /accounts/{login}/positions">
        <div className="grid gap-4 md:grid-cols-[minmax(0,280px)_auto] md:items-end">
          <FormField
            label="Login"
            name="login"
            value={login}
            onChange={setLogin}
            placeholder="123456"
          />
          <button
            onClick={() => void fetchAccountDetail()}
            className="h-fit rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Fetch Account
          </button>
        </div>
        <div className="mt-4">
          <RequestState loading={loading} error={error} />
        </div>
      </SectionCard>

      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard title="Account Details">
          {isRecord(account) ? (
            <KeyValueTable data={account} emptyMessage="No account detail loaded yet." />
          ) : (
            <JsonViewer data={account} emptyMessage="No account detail loaded yet." />
          )}
        </SectionCard>

        <SectionCard title="Open Positions">
          <DataTable rows={normalizeRows(positions)} emptyMessage="No positions loaded yet." />
        </SectionCard>
      </div>
    </PageShell>
  );
}
