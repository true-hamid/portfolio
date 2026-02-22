/// <reference types="vite/client" />

declare module '*.pdf' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
}

interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
}
