import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "search.pstatic.net" },
      { protocol: "https", hostname: "dbscthumb-phinf.pstatic.net" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "newneek.co" },
      { protocol: "https", hostname: "d2phebdq64jyfk.cloudfront.net" },
      { protocol: "https", hostname: "img.khan.co.kr", pathname: "/**" },
      { protocol: "https", hostname: "wine21.speedgabia.com", pathname: "/**" },
      { protocol: "https", hostname: "i.namu.wiki", pathname: "/**" },
      { protocol: "https", hostname: "mcgrocer.com", pathname: "/**" },
      { protocol: "https", hostname: "static.ebs.co.kr", pathname: "/**" },
      { protocol: "https", hostname: "cafe24.poxo.com", pathname: "/**" },
      { protocol: "https", hostname: "via.placeholder.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "cdn.sommeliertimes.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/auth/kakao/callback",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
