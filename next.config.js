/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apurba.com.bd",
      },
    ],
  },
};

module.exports = nextConfig;
