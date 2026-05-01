import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
images: {
  unoptimized: true,
  remotePatterns: [
    {
      protocol: "https",
      hostname: "exam-app.elevate-bootcamp.cloud",
    },
    {
      protocol: "https",
      hostname: "www.elevate-bootcamp.cloud",
    },
  ],
},
};

export default nextConfig;
