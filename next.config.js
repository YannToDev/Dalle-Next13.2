/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // permet de recevoir des photos de n'importe quel hote sans avoir à le spécifier
  images: {
    remotePatterns : [
      {
        protocol : "https",
        hostname: "**"
      }
    ],
  }
}

module.exports = nextConfig
