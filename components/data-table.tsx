import { toTitleCase } from "@/lib/utils";

type DataTableProps = {
  rows: Record<string, unknown>[];
  emptyMessage?: string;
};

export function DataTable({ rows, emptyMessage = "No rows to display." }: DataTableProps) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted">{emptyMessage}</p>;
  }

  const columns = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((key) => set.add(key));
      return set;
    }, new Set<string>())
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead className="bg-canvas">
          <tr>
            {columns.map((column) => (
              <th key={column} className="whitespace-nowrap px-4 py-3 text-left font-medium text-ink">
                {toTitleCase(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-panel">
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column} className="max-w-sm px-4 py-3 align-top text-muted">
                  <span className="break-words">{formatTableCell(row[column])}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatTableCell(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}
