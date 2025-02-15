import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.khan.co.kr", "wine21.speedgabia.com", 'k.kakaocdn.net'],
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
        hostname: "upload.wikimedia.org", // 외부 이미지 URL 허용
      },
      {
        protocol: "https",
        hostname: "newneek.co", // 오류 발생한 도메인 추가
      },
      {
        protocol: "https",
        hostname: "d2phebdq64jyfk.cloudfront.net", // 추가적으로 필요한 도메인
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Placeholder 이미지 도메인 추가
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
        hostname: "img.khan.co.kr",
      },
      {
        protocol: "https",
        hostname: "wine21.speedgabia.com",
      },
    ],
  },
  async redirects(){
    return [
      {
        source:"/auth/kakao/callback",
        destination:"/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
