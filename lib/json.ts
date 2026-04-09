export function parseJsonInput(value: string, fallback: unknown) {
  if (!value.trim()) {
    return fallback;
  }

  return JSON.parse(value) as unknown;
}
