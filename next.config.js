/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development practices
  reactStrictMode: true,

  // Optimize images from these domains
  images: {
    domains: [],
    // Enable remote patterns if needed
    // remotePatterns: [],
  },

  // Production optimizations
  swcMinify: true, // Use SWC for minification (faster than Terser)

  // Enable edge runtime for API routes if needed
  // experimental: {
  //   runtime: 'edge',
  // },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
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
        ],
      },
    ];
  },

  // Powered by header
  poweredByHeader: false,
};

module.exports = nextConfig;
