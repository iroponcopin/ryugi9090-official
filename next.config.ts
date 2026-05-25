import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ryugi9090-official',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: '/ryugi9090-official',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
};

export default nextConfig;
