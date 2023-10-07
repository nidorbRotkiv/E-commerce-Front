/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ecommerce-next-js.s3.amazonaws.com', 'lh5.googleusercontent.com', "lh3.googleusercontent.com"],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
