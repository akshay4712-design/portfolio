import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — stops your site being embedded in iframes
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop browsers guessing content types
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block XSS attacks in older browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Control how much referrer info is shared
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Force HTTPS for 1 year
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Restrict browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
