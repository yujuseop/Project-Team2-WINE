import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
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
