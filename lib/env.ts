const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? "";

export function getApiBaseUrl() {
  return apiBaseUrl.replace(/\/+$/, "");
}

export function hasApiBaseUrl() {
  return getApiBaseUrl().length > 0;
}
