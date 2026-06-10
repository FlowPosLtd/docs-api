import { useState } from "react";
import { getStoredApiKey, getStoredBaseUrl } from "../utils/api-client";

export function useApiConfig() {
  const [apiKey, setApiKey] = useState(() => getStoredApiKey());
  const [baseUrl, setBaseUrl] = useState(() => getStoredBaseUrl());

  const handleSaveConfig = (key: string, url: string) => {
    setApiKey(key);
    setBaseUrl(url);
    localStorage.setItem("flowpos_api_key", key);
    localStorage.setItem("flowpos_base_url", url);
  };

  return { apiKey, baseUrl, handleSaveConfig };
}
