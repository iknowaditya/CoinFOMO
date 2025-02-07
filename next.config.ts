/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["your-image-domain.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Add any other required configuration
};

module.exports = nextConfig;
