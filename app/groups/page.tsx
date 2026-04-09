"use client";

import { useState } from "react";

import { DataTable } from "@/components/data-table";
import { FormField } from "@/components/form-field";
import { JsonViewer } from "@/components/json-viewer";
import { PageShell } from "@/components/page-shell";
import { RequestState } from "@/components/request-state";
import { SectionCard } from "@/components/section-card";
import { apiRequest, buildQueryString } from "@/lib/api";

type Row = Record<string, unknown>;

function normalizeRows(input: unknown): Row[] {
  if (Array.isArray(input)) {
    return input.filter((item): item is Row => typeof item === "object" && item !== null);
  }

  if (input && typeof input === "object") {
    return [input as Row];
  }

  return [];
}

export default function GroupsPage() {
  const [groupMask, setGroupMask] = useState("demo\\APEXADVANCEUSD");
  const [productMask, setProductMask] = useState("demo\\*");
  const [groups, setGroups] = useState<unknown>(null);
  const [accountProducts, setAccountProducts] = useState<unknown>(null);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);
  const [productsError, setProductsError] = useState<string | null>(null);

  async function fetchGroups() {
    setLoadingGroups(true);
    setGroupsError(null);

    try {
      const response = await apiRequest(`/groups${buildQueryString({ mask: groupMask })}`);
      setGroups(response);
    } catch (error) {
      setGroupsError(error instanceof Error ? error.message : "Failed to fetch groups.");
    } finally {
      setLoadingGroups(false);
    }
  }

  async function fetchAccountProducts() {
    setLoadingProducts(true);
    setProductsError(null);

    try {
      const response = await apiRequest(
        `/account-products${buildQueryString({ mask: productMask })}`
      );
      setAccountProducts(response);
    } catch (error) {
      setProductsError(
        error instanceof Error ? error.message : "Failed to fetch account products."
      );
    } finally {
      setLoadingProducts(false);
    }
  }

  return (
    <PageShell
      title="Groups / Account Products"
      description="Use masks to inspect groups and account-product mappings from the MT5 backend."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard
          title="Groups"
          description="Call GET /groups?mask=... with an exact or wildcard-style mask."
        >
          <div className="space-y-4">
            <FormField
              label="Mask"
              name="group_mask"
              value={groupMask}
              placeholder="demo\\APEXADVANCEUSD"
              onChange={setGroupMask}
            />
            <button
              onClick={() => void fetchGroups()}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Fetch Groups
            </button>
            <RequestState loading={loadingGroups} error={groupsError} />
            <DataTable rows={normalizeRows(groups)} emptyMessage="No groups loaded yet." />
            <JsonViewer data={groups} emptyMessage="Raw group response will appear here." />
          </div>
        </SectionCard>

        <SectionCard
          title="Account Products"
          description="Call GET /account-products?mask=... to inspect product configurations."
        >
          <div className="space-y-4">
            <FormField
              label="Mask"
              name="product_mask"
              value={productMask}
              placeholder="demo\\*"
              onChange={setProductMask}
            />
            <button
              onClick={() => void fetchAccountProducts()}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Fetch Account Products
            </button>
            <RequestState loading={loadingProducts} error={productsError} />
            <DataTable
              rows={normalizeRows(accountProducts)}
              emptyMessage="No account products loaded yet."
            />
            <JsonViewer
              data={accountProducts}
              emptyMessage="Raw account product response will appear here."
            />
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
