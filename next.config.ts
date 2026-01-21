import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  basePath: "/hackvision",
  assetPrefix: "/hackvision",   // Handles static assets
  trailingSlash: true,
};
export default nextConfig;