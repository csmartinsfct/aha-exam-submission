/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: () => ({
        loader: "@svgr/webpack",
        options: {
          svgo: true,
        },
      }),
    });

    return config;
  },
};
