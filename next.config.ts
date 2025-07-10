import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:[{
      hostname:'img.clerk.com'
    }]
  }
};

export default nextConfig;
