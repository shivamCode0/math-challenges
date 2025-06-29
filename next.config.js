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

  /**
   *
   * @param {import("webpack").Configuration} config
   * @param {Object} options
   * @param {boolean} options.dev
   * @param {import("webpack").default} options.webpack
   * @param {string} options.buildId
   * @returns
   */
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
      const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(new DuplicatePackageCheckerPlugin());
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportTitle: `${isServer ? "Server" : "Client"} Bundle Size - Math Challenges`,
          openAnalyzer: true,
          reportFilename: `./static/bundlereport/${isServer ? "server" : "client"}.html`,
        })
      );
    }

    return config;
  },
};
