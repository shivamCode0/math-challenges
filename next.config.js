const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/icon/:sprites/:seed.svg",
        destination: "https://avatars.dicebear.com/api/:sprites/:seed.svg",
      },
    ];
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      if (!dev) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        });
      }
    }

    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportTitle: `${isServer ? "Server" : "Client"} Bundle Size - Math Challenges`,
          openAnalyzer: true,
        })
      );
      config.plugins.push(new DuplicatePackageCheckerPlugin());
    }
    return config;
  },
};
