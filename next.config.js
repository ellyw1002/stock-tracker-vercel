/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.exe$/i,
      use: 'raw-loader',
    },);

    return config;
  },
}

module.exports = nextConfig
