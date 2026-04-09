"use client";

import { useState } from "react";

import { FormField } from "@/components/form-field";
import { JsonViewer } from "@/components/json-viewer";
import { PageShell } from "@/components/page-shell";
import { RequestState } from "@/components/request-state";
import { SectionCard } from "@/components/section-card";
import { TextareaField } from "@/components/textarea-field";
import { apiRequest } from "@/lib/api";
import { parseJsonInput } from "@/lib/json";

export default function PatchUserPage() {
  const [login, setLogin] = useState("");
  const [updates, setUpdates] = useState('{\n  "additionalProp1": {}\n}');
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitPatch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!login.trim()) {
      setError("Enter a login before patching a user.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apiRequest(`/users/${login.trim()}`, {
        method: "PATCH",
        body: {
          updates: parseJsonInput(updates, {})
        }
      });
      setResponse(result);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to patch user.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      title="Patch User"
      description="Send a PATCH request to /users/{login} with the exact updated backend contract."
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <SectionCard title="Patch Payload" description="PATCH /users/{login}">
          <form onSubmit={submitPatch} className="space-y-4">
            <FormField
              label="Login"
              name="login"
              type="number"
              value={login}
              onChange={setLogin}
              placeholder="123456"
            />
            <TextareaField
              label="Updates JSON"
              name="updates"
              value={updates}
              onChange={setUpdates}
              helperText='Example: { "additionalProp1": {} }'
            />
            <button
              type="submit"
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Patch User
            </button>
          </form>
        </SectionCard>

        <SectionCard title="Response">
          <div className="space-y-4">
            <RequestState loading={loading} error={error} />
            <JsonViewer data={response} emptyMessage="No patch response yet." />
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
