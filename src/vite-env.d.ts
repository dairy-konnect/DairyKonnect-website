/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** When `"true"`, Get started role tiles navigate to portal pages instead of launching-soon. */
  readonly VITE_USE_PORTAL_LINKS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
