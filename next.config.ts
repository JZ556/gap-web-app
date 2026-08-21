import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // This project lives beneath a parent directory that has its own lockfile.
    // Pinning the root keeps Turbopack's module resolution and file watching
    // scoped to this application.
    root: process.cwd(),
  },
};

export default nextConfig;
