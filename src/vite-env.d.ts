/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRACKING_ID: string;
  // Add other env variables as needed
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
