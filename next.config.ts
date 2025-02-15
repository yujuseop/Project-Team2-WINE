import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.khan.co.kr", "wine21.speedgabia.com", 'k.kakaocdn.net'],
    remotePatterns: [
      { protocol: "https", hostname: "search.pstatic.net" },
      { protocol: "https", hostname: "dbscthumb-phinf.pstatic.net" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "newneek.co" },
      { protocol: "https", hostname: "d2phebdq64jyfk.cloudfront.net" },
      { protocol: "https", hostname: "via.placeholder.com", pathname: "/**" },
      { protocol: "https", hostname: "img.khan.co.kr", pathname: "/**" },
      { protocol: "https", hostname: "wine21.speedgabia.com", pathname: "/**" },
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
