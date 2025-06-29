const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
// const withPWA = (a) => a;

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,

  pwa: {
    dest: "public",
    sw: "service-worker.js",
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
    disable: process.env.NODE_ENV === "development",
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
          "react-dom": "preact/compat", // Must be below test-utils
          "react/jsx-runtime": "preact/jsx-runtime",
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
});
