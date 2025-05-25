/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@woovi-playground/ui"],
  compiler: {
    relay: require("./relay.config"),
  },
};

module.exports = nextConfig;
