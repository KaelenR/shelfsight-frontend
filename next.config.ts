import type { NextConfig } from "next";
import path from "node:path";

// BACKEND_URL is a server-side-only env var used by the Next.js proxy.
// It should be set to the full backend origin in every deployment environment.
// It is NOT exposed to the browser (no NEXT_PUBLIC_ prefix).
// Example: BACKEND_URL=https://api.shelfsight.example.com
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  // Anchor Turbopack to this project so a stray package-lock.json in a
  // parent directory doesn't trick Next.js into picking the wrong workspace
  // root (which manifests as every route returning the not-found fallback).
  turbopack: {
    root: path.resolve("."),
  },
  serverActions: {
    bodySizeLimit: "50mb",
  },
  async rewrites() {
    return [
      {
        // Proxy /api/:path* → backend :path*
        // This keeps all API requests same-origin so HttpOnly cookies are
        // sent without needing SameSite=None or cross-origin CORS credentials.
        source: "/api/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
