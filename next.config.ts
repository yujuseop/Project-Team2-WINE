import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "search.pstatic.net",
      },
      {
        protocol: "https",
        hostname: "dbscthumb-phinf.pstatic.net",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org", // 외부 이미지 URL을 허용
      },
    ],
  },
};

export default nextConfig;
