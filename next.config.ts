import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: [],
  },
  // Enable server-side rendering for D3 components
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: 'node-loader',
    })
    return config
  },
  // Silence Turbopack warning - webpack config is minimal and compatible
  turbopack: {},
}

export default nextConfig