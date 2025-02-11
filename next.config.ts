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
      {
        protocol: "https",
        hostname: "newneek.co", //  newneek.co 추가
      },
      {
        protocol: "https",
        hostname: "d2phebdq64jyfk.cloudfront.net", //  cloudfront 이미지도 추가
      },
    ],
  },
};

export default nextConfig;
