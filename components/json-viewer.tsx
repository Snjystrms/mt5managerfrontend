type JsonViewerProps = {
  data: unknown;
  emptyMessage?: string;
};

export function JsonViewer({
  data,
  emptyMessage = "No response yet. Submit a request to see the result."
}: JsonViewerProps) {
  if (data === null || data === undefined || data === "") {
    return (
      <div className="rounded-xl border border-dashed border-border bg-canvas p-4 text-sm text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <pre className="overflow-x-auto rounded-xl bg-stone-950 p-4 text-sm leading-6 text-stone-100">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
