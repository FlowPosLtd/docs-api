/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PRODUCTION_URL?: string
  readonly VITE_API_STAGING_URL?: string
  readonly VITE_API_DEFAULT_ENV?: "production" | "staging"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
