type TextareaFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  helperText?: string;
};

export function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 6,
  helperText
}: TextareaFieldProps) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      <textarea
        name={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
      />
      {helperText ? <p className="text-xs text-muted">{helperText}</p> : null}
    </label>
  );
}
