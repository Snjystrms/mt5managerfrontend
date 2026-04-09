"use client";

import { useState } from "react";

import { FormField } from "@/components/form-field";
import { JsonViewer } from "@/components/json-viewer";
import { PageShell } from "@/components/page-shell";
import { RequestState } from "@/components/request-state";
import { SectionCard } from "@/components/section-card";
import { SelectField } from "@/components/select-field";
import { apiRequest } from "@/lib/api";

export default function BalancePage() {
  const [login, setLogin] = useState("");
  const [amount, setAmount] = useState("");
  const [kind, setKind] = useState("deposit");
  const [comment, setComment] = useState("");
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitBalanceAdjustment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!login.trim()) {
      setError("Enter a login before posting a balance adjustment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apiRequest(`/accounts/${login.trim()}/balance`, {
        method: "POST",
        body: {
          amount: amount ? Number(amount) : undefined,
          kind,
          comment
        }
      });
      setResponse(result);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Failed to submit balance request."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      title="Balance"
      description="Post simple deposit, withdrawal, or credit adjustments to the backend for testing."
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Balance Adjustment" description="POST /accounts/{login}/balance">
          <form onSubmit={submitBalanceAdjustment} className="space-y-4">
            <FormField
              label="Login"
              name="login"
              value={login}
              onChange={setLogin}
              placeholder="123456"
            />
            <FormField
              label="Amount"
              name="amount"
              type="number"
              value={amount}
              onChange={setAmount}
              placeholder="100"
            />
            <SelectField
              label="Kind"
              name="kind"
              value={kind}
              onChange={setKind}
              options={[
                { label: "Deposit", value: "deposit" },
                { label: "Withdrawal", value: "withdrawal" },
                { label: "Credit", value: "credit" }
              ]}
            />
            <FormField
              label="Comment"
              name="comment"
              value={comment}
              onChange={setComment}
              placeholder="Manual test adjustment"
            />
            <button
              type="submit"
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Submit Balance Request
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Response">
          <div className="space-y-4">
            <RequestState loading={loading} error={error} />
            <JsonViewer data={response} emptyMessage="No balance response yet." />
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
