/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['gsap'])
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = withTM(nextConfig)
