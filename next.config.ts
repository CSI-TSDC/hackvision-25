import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/hackvision",
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/hackvision",
      },
    ];
  },
};

export default nextConfig;