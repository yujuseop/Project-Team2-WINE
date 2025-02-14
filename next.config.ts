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
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "newneek.co",
      },
      {
        protocol: "https",
        hostname: "d2phebdq64jyfk.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.khan.co.kr",  // 추가된 이미지 호스트
        pathname: "/**",  // 모든 경로 허용
      },
      {
        protocol: "https",
        hostname: "newneek.co", //  newneek.co 추가
      },
      {
        protocol: "https",
        hostname: "d2phebdq64jyfk.cloudfront.net", //  cloudfront 이미지도 추가
      },
      {
        protocol: "https",
        hostname: "img.khan.co.kr", //wine21.speedgabia.com
      },
      {
        protocol: "https",
        hostname: "wine21.speedgabia.com",
      },
    ],
  },
};

export default nextConfig;
