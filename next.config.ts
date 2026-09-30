import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  allowedDevOrigins: ["192.168.10.215", "192.168.137.1"],
};

export default nextConfig;
