import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const hostname = process.env.APP_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
const payloadEnabled = !!(process.env.DATABASE_URI && process.env.PAYLOAD_SECRET);
/** @type {import('next').NextConfig} */
const payloadConfig = !payloadEnabled ? {
  rewrites: () => ([{
    source: '/admin/:path*',
    destination: '/404',
  }])
} : {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...payloadConfig,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      ...(hostname ? [{
        protocol: 'https',
        hostname,
        pathname: '/api/media/**',
      }] : []),
      {
        protocol: 'https',
        hostname: 'placehold.co'
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

console.log(JSON.stringify(nextConfig, null, 2));

export default withPayload(withNextIntl(nextConfig));
