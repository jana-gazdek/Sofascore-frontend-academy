import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [{ source: '/api/:path*', destination: 'https://academy-backend.sofascore.dev/:path*' }]
  },
};

export default nextConfig;
