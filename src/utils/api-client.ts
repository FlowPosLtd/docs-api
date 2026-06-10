import axios from "axios";

export const PRESET_URLS = [
  "https://api.flowpos.me/v1",
  "https://api.flowpos.co.uk/v1",
] as const;

const DEFAULT_BASE_URL = PRESET_URLS[0];

export function getStoredApiKey(): string {
  return localStorage.getItem("flowpos_api_key") || "";
}

export function getStoredBaseUrl(): string {
  const stored = localStorage.getItem("flowpos_base_url");
  if (stored && (PRESET_URLS as readonly string[]).includes(stored)) {
    return stored;
  }
  if (stored) localStorage.removeItem("flowpos_base_url");
  return DEFAULT_BASE_URL;
}

export const apiClient = axios.create({
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (!config.baseURL) {
    config.baseURL = getStoredBaseUrl().replace(/\/$/, "");
  }

  const key = getStoredApiKey();
  if (key && !config.headers["x-api-key"]) {
    config.headers["x-api-key"] = key;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = (error.response?.data as any)?.message || error.message;

      if (status === 401) {
        console.warn("[API] 401 Unauthorized check your API key.");
      } else if (status === 429) {
        console.warn("[API] 429 Too Many Requests slow down.");
      } else if (status && status >= 500) {
        console.error("[API] Server error:", message);
      }
    }
    return Promise.reject(error);
  },
);
