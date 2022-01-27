/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string
  // 更多环境变量...
  readonly VITE_ENV_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}