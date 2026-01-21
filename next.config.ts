import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/hackvision",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/hackvision",
  },
};

export default nextConfig;