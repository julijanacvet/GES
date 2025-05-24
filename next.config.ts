import type {NextConfig} from 'next';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { i18n } = require('./next-i18next.config.js'); // Removed for App Router compatibility

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // i18n, // Removed: This is for Pages Router i18n and conflicts with App Router [locale] setup.
          // next-i18next.config.js is still used directly by middleware and i18n.ts
};

export default nextConfig;