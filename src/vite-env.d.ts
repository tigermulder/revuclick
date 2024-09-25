/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_TIMEOUT: number
  readonly VITE_DEBUG_MODE: boolean
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}