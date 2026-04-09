import { toTitleCase } from "@/lib/utils";

type KeyValueTableProps = {
  data: Record<string, unknown> | null | undefined;
  emptyMessage?: string;
};

export function KeyValueTable({
  data,
  emptyMessage = "No data available."
}: KeyValueTableProps) {
  if (!data || Object.keys(data).length === 0) {
    return <p className="text-sm text-muted">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="min-w-full divide-y divide-border text-sm">
        <tbody className="divide-y divide-border bg-panel">
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td className="w-1/3 bg-canvas px-4 py-3 font-medium text-ink">{toTitleCase(key)}</td>
              <td className="px-4 py-3 text-muted">
                <span className="break-words">{formatCellValue(value)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatCellValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}
