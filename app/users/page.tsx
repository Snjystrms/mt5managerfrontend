"use client";

import { useState } from "react";

import { DataTable } from "@/components/data-table";
import { FormField } from "@/components/form-field";
import { JsonViewer } from "@/components/json-viewer";
import { PageShell } from "@/components/page-shell";
import { RequestState } from "@/components/request-state";
import { SectionCard } from "@/components/section-card";
import { apiRequest, buildQueryString } from "@/lib/api";

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

export default function UsersPage() {
  const [groupMask, setGroupMask] = useState("demo\\*");
  const [login, setLogin] = useState("");
  const [users, setUsers] = useState<unknown>(null);
  const [userDetail, setUserDetail] = useState<unknown>(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);

  async function fetchUsers() {
    setUsersLoading(true);
    setUsersError(null);

    try {
      const response = await apiRequest(`/users${buildQueryString({ group_mask: groupMask })}`);
      setUsers(response);
    } catch (error) {
      setUsersError(error instanceof Error ? error.message : "Failed to fetch users.");
    } finally {
      setUsersLoading(false);
    }
  }

  async function fetchUserByLogin() {
    if (!login.trim()) {
      setDetailError("Enter a login before requesting user details.");
      return;
    }

    setDetailLoading(true);
    setDetailError(null);

    try {
      const response = await apiRequest(`/users/${login.trim()}`);
      setUserDetail(response);
    } catch (error) {
      setDetailError(error instanceof Error ? error.message : "Failed to fetch user.");
    } finally {
      setDetailLoading(false);
    }
  }

  return (
    <PageShell
      title="Users"
      description="Search users by group mask or inspect an individual user by login."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard title="Users by Group" description="GET /users?group_mask=...">
          <div className="space-y-4">
            <FormField
              label="Group Mask"
              name="group_mask"
              value={groupMask}
              onChange={setGroupMask}
              placeholder="demo\\*"
            />
            <button
              onClick={() => void fetchUsers()}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Fetch Users
            </button>
            <RequestState loading={usersLoading} error={usersError} />
            <DataTable rows={normalizeRows(users)} emptyMessage="No users loaded yet." />
          </div>
        </SectionCard>

        <SectionCard title="User by Login" description="GET /users/{login}">
          <div className="space-y-4">
            <FormField
              label="Login"
              name="login"
              value={login}
              onChange={setLogin}
              placeholder="123456"
            />
            <button
              onClick={() => void fetchUserByLogin()}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Fetch User
            </button>
            <RequestState loading={detailLoading} error={detailError} />
            <JsonViewer data={userDetail} emptyMessage="No user detail loaded yet." />
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
