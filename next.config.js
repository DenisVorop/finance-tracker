/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiPath: process.env.API_PATH,
  },
}

module.exports = nextConfig
