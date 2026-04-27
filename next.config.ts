import type { NextConfig } from "next";

// Content Security Policy
// Carefully allowlisted for: Next.js, Sanity, Google Analytics, Framer Motion
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https://cdn.sanity.io https://www.google-analytics.com https://www.googletagmanager.com;
  connect-src 'self' https://cdn.sanity.io https://phzu770t.api.sanity.io https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://api.resend.com;
  media-src 'self';
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\n/g, " ").trim();

const securityHeaders = [
  // Content Security Policy — controls what can be loaded
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
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
