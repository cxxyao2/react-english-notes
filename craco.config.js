// const BundleAnalyzerPlugin =
//  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  // ...
  typescript: {
    enableTypeChecking: true /* (default value) */
  },
  webpack: {
    plugins: [new CompressionPlugin()]
  }
}
