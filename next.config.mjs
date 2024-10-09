import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.APP_URL,
        pathname: '/api/media/**',
      },
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

export default withPayload(withNextIntl(nextConfig));
