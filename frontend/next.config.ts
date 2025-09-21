import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      } as const,
      {
        protocol: 'https' as const,
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
