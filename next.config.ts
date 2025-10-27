import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Allow images from self, data URIs, placeholder services and HTTPS sources
              "img-src 'self' data: https://placehold.co https: https://images.unsplash.com",
              // Allow scripts from self and necessary inline scripts
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              // Allow styles from self and inline styles needed for Next.js
              "style-src 'self' 'unsafe-inline'",
              // Allow API connections to your backend
              "connect-src 'self' http://localhost:3001",
              // Allow form submissions to your backend
              "form-action 'self' http://localhost:3001",
              // Font sources
              "font-src 'self' data:",
              // Media sources
              "media-src 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
