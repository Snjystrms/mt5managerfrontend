type RequestStateProps = {
  loading?: boolean;
  error?: string | null;
};

export function RequestState({ loading, error }: RequestStateProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-accent/20 bg-accentSoft p-3 text-sm text-accent">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-danger">
        {error}
      </div>
    );
  }

  return null;
}
