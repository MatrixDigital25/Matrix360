/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  // Ensure trailing slashes are handled correctly on Vercel
  trailingSlash: false,
};

module.exports = nextConfig;
