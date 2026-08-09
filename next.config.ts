import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["dudesco.com", "*.dudesco.com"],
    },
  },
};

export default nextConfig;
