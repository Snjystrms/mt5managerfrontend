"use client";

import { useMemo, useState } from "react";

import { FormField } from "@/components/form-field";
import { JsonViewer } from "@/components/json-viewer";
import { PageShell } from "@/components/page-shell";
import { RequestState } from "@/components/request-state";
import { SectionCard } from "@/components/section-card";
import { TextareaField } from "@/components/textarea-field";
import { apiRequest } from "@/lib/api";
import { parseJsonInput } from "@/lib/json";
import { accountFields, initialAccountFormValues } from "@/lib/mt5-fields";

export default function CreateAccountPage() {
  const [formValues, setFormValues] = useState<Record<string, string>>(initialAccountFormValues);
  const [extraFields, setExtraFields] = useState('{\n  "additionalProp1": {}\n}');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<unknown>(null);

  const requiredFieldNames = useMemo(
    () => ["group", "leverage", "first_name", "last_name", "main_password", "investor_password"],
    []
  );

  function updateField(name: string, value: string) {
    setFormValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        group: formValues.group,
        leverage: formValues.leverage ? Number(formValues.leverage) : 100,
        first_name: formValues.first_name,
        last_name: formValues.last_name,
        email: formValues.email,
        phone: formValues.phone,
        country: formValues.country,
        city: formValues.city,
        state: formValues.state,
        address: formValues.address,
        zip_code: formValues.zip_code,
        comment: formValues.comment,
        extra_fields: parseJsonInput(extraFields, {}),
        main_password: formValues.main_password,
        investor_password: formValues.investor_password
      };

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
      description="Submit the current POST /accounts payload expected by the backend and inspect the JSON response."
    >
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <SectionCard
          title="Account Form"
          description="Fields here match the updated create-account contract from your backend image."
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
              <div className="md:col-span-2">
                <TextareaField
                  label="Extra Fields JSON"
                  name="extra_fields"
                  value={extraFields}
                  onChange={setExtraFields}
                  helperText='Example: { "additionalProp1": {} }'
                />
              </div>
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
                  setExtraFields('{\n  "additionalProp1": {}\n}');
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
