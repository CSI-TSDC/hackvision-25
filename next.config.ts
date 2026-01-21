import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  basePath: "/hackvision",      // Add this - handles routing
  assetPrefix: "/hackvision",   // Handles static assets
  trailingSlash: true,
};
export default nextConfig;