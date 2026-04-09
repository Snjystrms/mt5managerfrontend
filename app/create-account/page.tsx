"use client";

import { useMemo, useState } from "react";

import { FormField } from "@/components/form-field";
import { JsonViewer } from "@/components/json-viewer";
import { PageShell } from "@/components/page-shell";
import { RequestState } from "@/components/request-state";
import { SectionCard } from "@/components/section-card";
import { apiRequest } from "@/lib/api";
import { accountFields, initialAccountFormValues } from "@/lib/mt5-fields";

export default function CreateAccountPage() {
  const [formValues, setFormValues] = useState<Record<string, string>>(initialAccountFormValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<unknown>(null);

  const requiredFieldNames = useMemo(() => ["group", "first_name", "last_name"], []);

  function updateField(name: string, value: string) {
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = Object.fromEntries(
        Object.entries(formValues).filter(([, value]) => value.trim() !== "")
      );
      const result = await apiRequest("/accounts", {
        method: "POST",
        body: payload
      });
      setResponse(result);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      title="Create Account"
      description="Submit a lightweight account-creation payload to POST /accounts and inspect the backend response."
    >
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <SectionCard
          title="Account Form"
          description="Leave optional fields empty if you only want to test a smaller payload."
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              {accountFields.map((field) => (
                <div
                  key={field.name}
                  className={field.name === "comment" || field.name === "address" ? "md:col-span-2" : ""}
                >
                  <FormField
                    label={requiredFieldNames.includes(field.name) ? `${field.label} *` : field.label}
                    name={field.name}
                    value={formValues[field.name] ?? ""}
                    placeholder={field.placeholder}
                    type={field.type}
                    onChange={(value) => updateField(field.name, value)}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormValues(initialAccountFormValues);
                  setResponse(null);
                  setError(null);
                }}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
              >
                Reset Form
              </button>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Response" description="Formatted JSON result from POST /accounts.">
          <div className="space-y-4">
            <RequestState loading={loading} error={error} />
            <JsonViewer data={response} emptyMessage="Create an account to see the backend response." />
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
