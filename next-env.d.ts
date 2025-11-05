/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Extend Next.js types for Cloudflare Pages adapter
declare module 'next' {
  export interface PageConfig {
    runtime?: 'nodejs' | 'edge' | 'experimental-edge';
  }
}
